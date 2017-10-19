import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
  Optional,
  Output,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DOCUMENT } from '@angular/platform-browser';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ESCAPE } from '@angular/cdk/keycodes';
import { Subject } from 'rxjs/Subject';

import { transformPopover } from './popover.animations';
import {
  NotificationAction,
  PopoverNotification,
  PopoverNotificationService,
} from './notification.service';
import {
  getUnanchoredPopoverError,
  getInvalidXPositionError,
  getInvalidYPositionError
} from './popover.errors';

export type SatPopoverPositionX = 'before' | 'center' | 'after';
export type SatPopoverPositionY = 'above'  | 'center' | 'below';

const VALID_POSX: SatPopoverPositionX[] = ['before', 'center', 'after'];
const VALID_POSY: SatPopoverPositionY[] = ['above', 'center', 'below'];

// See http://cubic-bezier.com/#.25,.8,.25,1 for reference.
const OPEN_TRANSITION  = '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';
const CLOSE_TRANSITION = OPEN_TRANSITION;

@Component({
  selector: 'sat-popover',
  encapsulation: ViewEncapsulation.None,
  animations: [transformPopover],
  styleUrls: ['./popover.component.scss'],
  templateUrl: './popover.component.html',
})
export class SatPopover implements AfterViewInit {

  /** Position of the popover on the x axis. */
  @Input()
  get xPosition() { return this._xPosition; }
  set xPosition(val: SatPopoverPositionX) {
    this._validateXPosition(val);
    if (this._xPosition !== val) {
      this._xPosition = val;
      this._setPositionClasses();
      this._dispatchNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _xPosition: SatPopoverPositionX = 'center';

  /** Position of the popover on the y axis. */
  @Input()
  get yPosition() { return this._yPosition; }
  set yPosition(val: SatPopoverPositionY) {
    this._validateYPosition(val);
    if (this._yPosition !== val) {
      this._yPosition = val;
      this._setPositionClasses();
      this._dispatchNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _yPosition: SatPopoverPositionY = 'center';

  /** Whether the popover should overlap its anchor. */
  @Input()
  get overlapAnchor() { return this._overlapAnchor; }
  set overlapAnchor(val: boolean) {
    const coerced = coerceBooleanProperty(val);
    if (this._overlapAnchor !== coerced) {
      this._overlapAnchor = coerced;
      this._dispatchNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _overlapAnchor = true;

  /** Whether the popover should have a backdrop (includes closing on click). */
  @Input()
  get hasBackdrop() { return this._hasBackdrop; }
  set hasBackdrop(val: boolean) {
    this._hasBackdrop = coerceBooleanProperty(val);
  }
  private _hasBackdrop = false;

  /** Custom transition to use while opening. */
  @Input() openTransition = OPEN_TRANSITION;

  /** Custom transition to use while closing. */
  @Input() closeTransition = CLOSE_TRANSITION;

  /** Optional backdrop class. */
  @Input() backdropClass = '';

  /** Emits when the popover is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() closed = new EventEmitter<any>();

  /** Reference to template so it can be placed within a portal. */
  @ViewChild(TemplateRef) _templateRef: TemplateRef<any>;

  /** Classes to be added to the popover for setting the correct transform origin. */
  _classList: any = {};

  /** Whether the popover is presently open. */
  _open = false;

  /** Instance of notification service. Will be undefined until attached to an anchor. */
  _notifications: PopoverNotificationService;

  /** Reference to the element to build a focus trap around. */
  @ViewChild('focusTrapElement')
  private _focusTrapElement: ElementRef;

  /** Reference to the element that was focused before opening. */
  private _previouslyFocusedElement: HTMLElement;

  /** Reference to a focus trap around the popover. */
  private _focusTrap: FocusTrap;

  constructor(
    private _focusTrapFactory: FocusTrapFactory,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) { }

  ngAfterViewInit() {
    this._setPositionClasses();
  }

  /** Open this popover. */
  open(): void {
    const notification = new PopoverNotification(NotificationAction.OPEN);
    this._dispatchNotification(notification);
  }

  /** Close this popover. */
  close(value?: any): void {
    const notification = new PopoverNotification(NotificationAction.CLOSE, value);
    this._dispatchNotification(notification);
  }

  /** Toggle this popover open or closed. */
  toggle(): void {
    const notification = new PopoverNotification(NotificationAction.TOGGLE);
    this._dispatchNotification(notification);
  }

  /** Gets whether the popover is presently open. */
  isOpen(): boolean {
    return this._open;
  }

  /** Respond to key events. */
  _handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
      this.close();
    }
  }

  /** Gets an animation config with customized (or default) transition values. */
  _getAnimation(): { value: any, params: any } {
    return {
      value: 'visible',
      params: { openTransition: this.openTransition, closeTransition: this.closeTransition }
    };
  }

  /** Callback for when the popover is finished animating in or out. */
  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'visible') {
      this._trapFocus();
    } else if (event.toState === 'void') {
      this._restoreFocus();
    }
  }

  /** Apply positioning classes based on positioning inputs. */
  _setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
    this._classList['sat-popover-before'] = posX === 'before';
    this._classList['sat-popover-after']  = posX === 'after';

    this._classList['sat-popover-above'] = posY === 'above';
    this._classList['sat-popover-below'] = posY === 'below';

    this._classList['sat-popover-center'] = posX === 'center' || posY === 'center';
  }

  /** Move the focus inside the focus trap and remember where to return later. */
  private _trapFocus(): void {
    this._savePreviouslyFocusedElement();

    // There won't be a focus trap element if the close animation starts before open finishes
    if (!this._focusTrapElement) {
      return;
    }

    if (!this._focusTrap && this._focusTrapElement) {
      this._focusTrap = this._focusTrapFactory.create(this._focusTrapElement.nativeElement);
    }

    this._focusTrap.focusInitialElementWhenReady();
  }

  /** Restore focus to the element focused before the popover opened. Also destroy trap. */
  private _restoreFocus(): void {
    const toFocus = this._previouslyFocusedElement;

    // Must check active element is focusable for IE sake
    if (toFocus && 'focus' in toFocus) {
      this._previouslyFocusedElement.focus();
    }

    this._previouslyFocusedElement = null;

    if (this._focusTrap) {
      this._focusTrap.destroy();
      this._focusTrap = undefined;
    }
  }

  /** Save a reference to the element focused before the popover was opened. */
  private _savePreviouslyFocusedElement(): void {
    if (this._document) {
      this._previouslyFocusedElement = this._document.activeElement as HTMLElement;
    }
  }

  /** Dispatch a notification to the notification service. */
  private _dispatchNotification(notification: PopoverNotification) {
    if (!this._notifications) {
      throw getUnanchoredPopoverError();
    }

    this._notifications.dispatch(notification);
  }

  /** Throws an error if the position is not a valid xPosition. */
  private _validateXPosition(pos: SatPopoverPositionX): void {
    if (VALID_POSX.indexOf(pos) === -1) {
      throw getInvalidXPositionError(pos);
    }
  }

  /** Throws an error if the position is not a valid yPosition. */
  private _validateYPosition(pos: SatPopoverPositionY): void {
    if (VALID_POSY.indexOf(pos) === -1) {
      throw getInvalidYPositionError(pos);
    }
  }
}
