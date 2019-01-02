import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  ViewChild,
  ViewEncapsulation,
  TemplateRef,
  OnDestroy,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { DOCUMENT } from '@angular/common';
import { FocusTrap, FocusTrapFactory } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

import { transformPopover } from './popover.animations';
import {
  NotificationAction,
  PopoverNotification,
  PopoverNotificationService,
} from './notification.service';
import {
  getUnanchoredPopoverError,
  getInvalidHorizontalAlignError,
  getInvalidVerticalAlignError,
  getInvalidScrollStrategyError,
} from './popover.errors';
import {
  SatPopoverScrollStrategy,
  SatPopoverHorizontalAlign,
  SatPopoverVerticalAlign,
  VALID_SCROLL,
  VALID_HORIZ_ALIGN,
  VALID_VERT_ALIGN,
  SatPopoverOpenOptions,
} from './types';

// See http://cubic-bezier.com/#.25,.8,.25,1 for reference.
const DEFAULT_TRANSITION  = '200ms cubic-bezier(0.25, 0.8, 0.25, 1)';

@Component({
  selector: 'sat-popover',
  encapsulation: ViewEncapsulation.None,
  animations: [transformPopover],
  styleUrls: ['./popover.component.scss'],
  templateUrl: './popover.component.html',
})
export class SatPopover implements OnInit, OnDestroy {

  /** Alignment of the popover on the horizontal axis. */
  @Input()
  get horizontalAlign() { return this._horizontalAlign; }
  set horizontalAlign(val: SatPopoverHorizontalAlign) {
    this._validateHorizontalAlign(val);
    if (this._horizontalAlign !== val) {
      this._horizontalAlign = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _horizontalAlign: SatPopoverHorizontalAlign = 'center';

  /** Alignment of the popover on the x axis. Alias for `horizontalAlign`. */
  @Input()
  get xAlign() { return this.horizontalAlign; }
  set xAlign(val: SatPopoverHorizontalAlign) { this.horizontalAlign = val; }

  /** Alignment of the popover on the vertical axis. */
  @Input()
  get verticalAlign() { return this._verticalAlign; }
  set verticalAlign(val: SatPopoverVerticalAlign) {
    this._validateVerticalAlign(val);
    if (this._verticalAlign !== val) {
      this._verticalAlign = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _verticalAlign: SatPopoverVerticalAlign = 'center';

  /** Alignment of the popover on the y axis. Alias for `verticalAlign`. */
  @Input()
  get yAlign() { return this.verticalAlign; }
  set yAlign(val: SatPopoverVerticalAlign) { this.verticalAlign = val; }

  /** Whether the popover always opens with the specified alignment. */
  @Input()
  get forceAlignment() { return this._forceAlignment; }
  set forceAlignment(val: boolean) {
    const coercedVal = coerceBooleanProperty(val);
    if (this._forceAlignment !== coercedVal) {
      this._forceAlignment = coercedVal;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _forceAlignment = false;

  /**
   * Whether the popover's alignment is locked after opening. This prevents the popover
   * from changing its alignement when scrolling or changing the size of the viewport.
   */
  @Input()
  get lockAlignment() { return this._lockAlignment; }
  set lockAlignment(val: boolean) {
    const coercedVal = coerceBooleanProperty(val);
    if (this._lockAlignment !== coercedVal) {
      this._lockAlignment = coerceBooleanProperty(val);
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.REPOSITION));
    }
  }
  private _lockAlignment = false;

  /** Whether the first focusable element should be focused on open. */
  @Input()
  get autoFocus() { return this._autoFocus; }
  set autoFocus(val: boolean) {
    this._autoFocus = coerceBooleanProperty(val);
  }
  private _autoFocus = true;

 /** Whether the popover should return focus to the previously focused element after closing. */
 @Input()
  get restoreFocus() { return this._restoreFocus && this._restoreFocusOverride; }
  set restoreFocus(val: boolean) {
    this._restoreFocus = coerceBooleanProperty(val);
  }
  private _restoreFocus = true;
  _restoreFocusOverride = true;

  /** How the popover should handle scrolling. */
  @Input()
  get scrollStrategy() { return this._scrollStrategy; }
  set scrollStrategy(val: SatPopoverScrollStrategy) {
    this._validateScrollStrategy(val);
    if (this._scrollStrategy !== val) {
      this._scrollStrategy = val;
      this._dispatchConfigNotification(new PopoverNotification(NotificationAction.UPDATE_CONFIG));
    }
  }
  private _scrollStrategy: SatPopoverScrollStrategy = 'reposition';

  /** Whether the popover should have a backdrop (includes closing on click). */
  @Input()
  get hasBackdrop() { return this._hasBackdrop; }
  set hasBackdrop(val: boolean) {
    this._hasBackdrop = coerceBooleanProperty(val);
  }
  private _hasBackdrop = false;

  /** Whether the popover should close when the user clicks the backdrop or presses ESC. */
  @Input()
  get interactiveClose() { return this._interactiveClose; }
  set interactiveClose(val: boolean) {
    this._interactiveClose = coerceBooleanProperty(val);
  }
  private _interactiveClose = true;

  /** Custom transition to use while opening. */
  @Input()
  get openTransition() { return this._openTransition; }
  set openTransition(val: string) {
    if (val) {
      this._openTransition = val;
    }
  }
  private _openTransition = DEFAULT_TRANSITION;

  /** Custom transition to use while closing. */
  @Input()
  get closeTransition() { return this._closeTransition; }
  set closeTransition(val: string) {
    if (val) {
      this._closeTransition = val;
    }
  }
  private _closeTransition = DEFAULT_TRANSITION;

  /** Optional backdrop class. */
  @Input() backdropClass = '';

  /** Emits when the popover is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() closed = new EventEmitter<any>();

  /** Emits when the popover has finished opening. */
  @Output() afterOpen = new EventEmitter<void>();

  /** Emits when the popover has finished closing. */
  @Output() afterClose = new EventEmitter<void>();

  /** Emits when the backdrop is clicked. */
  @Output() backdropClicked = new EventEmitter<void>();

  /** Emits when a keydown event is targeted to this popover's overlay. */
  @Output() overlayKeydown = new EventEmitter<KeyboardEvent>();

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

  ngOnInit() {
    this._setAlignmentClasses();
  }

  ngOnDestroy() {
    if (this._notifications) {
      this._notifications.dispose();
    }
  }

  /** Open this popover. */
  open(options: SatPopoverOpenOptions = {}): void {
    const notification = new PopoverNotification(NotificationAction.OPEN, options);
    this._dispatchActionNotification(notification);
  }

  /** Close this popover. */
  close(value?: any): void {
    const notification = new PopoverNotification(NotificationAction.CLOSE, value);
    this._dispatchActionNotification(notification);
  }

  /** Toggle this popover open or closed. */
  toggle(): void {
    const notification = new PopoverNotification(NotificationAction.TOGGLE);
    this._dispatchActionNotification(notification);
  }

  /** Realign the popover to the anchor. */
  realign(): void {
    const notification = new PopoverNotification(NotificationAction.REALIGN);
    this._dispatchActionNotification(notification);
  }

  /** Gets whether the popover is presently open. */
  isOpen(): boolean {
    return this._open;
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
      this.afterOpen.emit();
    } else if (event.toState === 'void') {
      this._restoreFocusAndDestroyTrap();
      this.afterClose.emit();
    }
  }

  /** Apply alignment classes based on alignment inputs. */
  _setAlignmentClasses(horizAlign = this.horizontalAlign, vertAlign = this.verticalAlign) {
    this._classList['sat-popover-before'] = horizAlign === 'before' || horizAlign === 'end';
    this._classList['sat-popover-after']  = horizAlign === 'after' || horizAlign === 'start';

    this._classList['sat-popover-above'] = vertAlign === 'above' || vertAlign === 'end';
    this._classList['sat-popover-below'] = vertAlign === 'below' || vertAlign === 'start';

    this._classList['sat-popover-center'] = horizAlign === 'center' || vertAlign === 'center';
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

    if (this.autoFocus) {
      this._focusTrap.focusInitialElementWhenReady();
    }
  }

  /** Restore focus to the element focused before the popover opened. Also destroy trap. */
  private _restoreFocusAndDestroyTrap(): void {
    const toFocus = this._previouslyFocusedElement;

    // Must check active element is focusable for IE sake
    if (toFocus && 'focus' in toFocus && this.restoreFocus) {
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

  /** Dispatch a notification to the notification service, if possible. */
  private _dispatchConfigNotification(notification: PopoverNotification) {
    if (this._notifications) {
      this._notifications.dispatch(notification);
    }
  }

  /** Dispatch a notification to the notification service and throw if unable to. */
  private _dispatchActionNotification(notification: PopoverNotification) {
    if (!this._notifications) {
      throw getUnanchoredPopoverError();
    }

    this._notifications.dispatch(notification);
  }

  /** Throws an error if the alignment is not a valid horizontalAlign. */
  private _validateHorizontalAlign(pos: SatPopoverHorizontalAlign): void {
    if (VALID_HORIZ_ALIGN.indexOf(pos) === -1) {
      throw getInvalidHorizontalAlignError(pos);
    }
  }

  /** Throws an error if the alignment is not a valid verticalAlign. */
  private _validateVerticalAlign(pos: SatPopoverVerticalAlign): void {
    if (VALID_VERT_ALIGN.indexOf(pos) === -1) {
      throw getInvalidVerticalAlignError(pos);
    }
  }

  /** Throws an error if the scroll strategy is not a valid strategy. */
  private _validateScrollStrategy(strategy: SatPopoverScrollStrategy): void {
    if (VALID_SCROLL.indexOf(strategy) === -1) {
      throw getInvalidScrollStrategyError(strategy);
    }
  }
}
