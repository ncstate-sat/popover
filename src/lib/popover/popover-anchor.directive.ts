import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Output,
  ViewContainerRef
} from '@angular/core';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs/Subject';
import { take } from 'rxjs/operators/take';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { filter } from 'rxjs/operators/filter';
import { tap } from 'rxjs/operators/tap';

import { SatPopover } from './popover.component';
import { NotificationAction, PopoverNotificationService } from './notification.service';
import { getInvalidPopoverError } from './popover.errors';
import { PopoverAnchoringService } from './popover-anchoring.service';

@Directive({
  selector: '[satPopoverAnchorFor]',
  exportAs: 'satPopoverAnchor',
  providers: [
    PopoverNotificationService,
    PopoverAnchoringService,
  ],
})
export class SatPopoverAnchor implements OnInit, OnDestroy {

  /** Reference to the popover instance. */
  @Input('satPopoverAnchorFor')
  get attachedPopover() { return this._attachedPopover; }
  set attachedPopover(value: SatPopover) {
    // ensure that value is a popover
    this._validateAttachedPopover(value);
    // store value and provide notification service as a communication
    // channel between popover and anchor
    this._attachedPopover = value;
    this._attachedPopover._notifications = this._notifications;
  }
  private _attachedPopover: SatPopover;

  /** Emits when the popover is opened. */
  @Output() popoverOpened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() popoverClosed = new EventEmitter<any>();

  /** Gets whether the popover is presently open. */
  isPopoverOpen(): boolean {
    return this._popoverOpen;
  }

  /** Whether the popover is presently open. */
  private _popoverOpen = false;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _notifications: PopoverNotificationService,
    public _anchoring: PopoverAnchoringService,
  ) { }

  ngOnInit() {
    this._subscribeToNotifications();
    this._validateAttachedPopover(this.attachedPopover);
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this._destroyPopover();
  }

  /** Toggles the popover between the open and closed states. */
  togglePopover(): void {
    return this._popoverOpen ? this.closePopover() : this.openPopover();
  }

  /** Opens the popover. */
  openPopover(): void {
    if (!this._popoverOpen) {
      this._anchoring.createOverlay(this.attachedPopover, this._viewContainerRef, this._elementRef);
      this._subscribeToBackdrop();
      this._subscribeToEscape();
      this._subscribeToDetachments();
      this._saveOpenedState();
    }
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    if (this._anchoring._overlayRef) {
      this._saveClosedState(value);
      this._anchoring._overlayRef.detach();
    }
  }

  /** Removes the popover from the DOM. Does NOT update open state. */
  private _destroyPopover(): void {
    if (this._anchoring._overlayRef) {
      this._anchoring._overlayRef.dispose();
      this._anchoring._overlayRef = null;
    }
  }

  /**
   * Destroys the popover immediately if it is closed, or waits until it
   * has been closed to destroy it.
   */
  private _destroyPopoverOnceClosed(): void {
    if (this.isPopoverOpen() && this._anchoring._overlayRef) {
      this._anchoring._overlayRef.detachments().pipe(
        take(1),
        takeUntil(this._onDestroy)
      ).subscribe(() => this._destroyPopover());
    } else {
      this._destroyPopover();
    }
  }

  /** Throws an error if the popover instance is not provided. */
  private _validateAttachedPopover(popover: SatPopover): void {
    if (!popover || !(popover instanceof SatPopover)) {
      throw getInvalidPopoverError();
    }
  }

  /**
   * Call appropriate anchor method when an event is dispatched through
   * the notification service.
   */
  private _subscribeToNotifications(): void {
    this._notifications.events()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(event => {
        switch (event.action) {
          case NotificationAction.OPEN:
            this.openPopover();
            break;
          case NotificationAction.CLOSE:
            this.closePopover(event.value);
            break;
          case NotificationAction.TOGGLE:
            this.togglePopover();
            break;
          case NotificationAction.REPOSITION:
            // TODO: When the overlay's position can be dynamically changed, do not destroy
          case NotificationAction.UPDATE_CONFIG:
            this._destroyPopoverOnceClosed();
            break;
        }
      });
  }

  /** Close popover when backdrop is clicked. */
  private _subscribeToBackdrop(): void {
    this._anchoring._overlayRef
      .backdropClick()
      .pipe(
        tap(() => this.attachedPopover.backdropClicked.emit()),
        filter(() => this.attachedPopover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
      )
      .subscribe(() => this.closePopover());
  }

  /** Close popover when escape keydown event occurs. */
  private _subscribeToEscape(): void {
    this._anchoring._overlayRef
      .keydownEvents()
      .pipe(
        tap(event => this.attachedPopover.overlayKeydown.emit(event)),
        filter(event => event.keyCode === ESCAPE),
        filter(() => this.attachedPopover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
      )
      .subscribe(() => this.closePopover());
  }

  /** Set state back to closed when detached. */
  private _subscribeToDetachments(): void {
    this._anchoring._overlayRef
      .detachments()
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => this._saveClosedState());
  }

  /** Save the opened state of the popover and emit. */
  private _saveOpenedState(): void {
    if (!this._popoverOpen) {
      this.attachedPopover._open = this._popoverOpen = true;

      this.popoverOpened.emit();
      this.attachedPopover.opened.emit();
    }
  }

  /** Save the closed state of the popover and emit. */
  private _saveClosedState(value?: any): void {
    if (this._popoverOpen) {
      this.attachedPopover._open = this._popoverOpen = false;

      this.popoverClosed.emit(value);
      this.attachedPopover.closed.emit(value);
    }
  }

}
