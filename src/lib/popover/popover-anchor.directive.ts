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
import { Subject, merge } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { SatPopover } from './popover.component';
import { getInvalidPopoverError } from './popover.errors';
import { SatPopoverAnchoringService } from './popover-anchoring.service';

@Directive({
  selector: '[satPopoverAnchorFor]',
  exportAs: 'satPopoverAnchor',
  providers: [SatPopoverAnchoringService],
})
export class SatPopoverAnchor implements OnInit, OnDestroy {

  /** Reference to the popover instance. */
  @Input('satPopoverAnchorFor')
  get attachedPopover() { return this._attachedPopover; }
  set attachedPopover(value: SatPopover) {
    this._validateAttachedPopover(value);
    this._attachedPopover = value;
    // Anchor the popover to the element ref
    this._anchoring.anchor(this.attachedPopover, this._viewContainerRef, this._elementRef);
  }
  private _attachedPopover: SatPopover;

  /** Emits when the popover is opened. */
  @Output() popoverOpened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() popoverClosed = new EventEmitter<any>();

  /** Gets whether the popover is presently open. */
  isPopoverOpen(): boolean {
    return this._anchoring.isPopoverOpen();
  }

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    public _anchoring: SatPopoverAnchoringService,
  ) { }

  ngOnInit() {
    // Re-emit open and close events
    const opened$ = this._anchoring.popoverOpened
      .pipe(tap(() => this.popoverOpened.emit()));
    const closed$ = this._anchoring.popoverClosed
      .pipe(tap(value => this.popoverClosed.emit(value)));
    merge(opened$, closed$).pipe(takeUntil(this._onDestroy)).subscribe();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Toggles the popover between the open and closed states. */
  togglePopover(): void {
    this._anchoring.togglePopover();
  }

  /** Opens the popover. */
  openPopover(): void {
    this._anchoring.openPopover();
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    this._anchoring.closePopover(value);
  }

  /** Throws an error if the popover instance is not provided. */
  private _validateAttachedPopover(popover: SatPopover): void {
    if (!popover || !(popover instanceof SatPopover)) {
      throw getInvalidPopoverError();
    }
  }

}
