import {
  Directive,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  OnDestroy,
  Optional,
  Output,
  ViewContainerRef
} from '@angular/core';
import {
  ConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayRef,
  OverlayConfig,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators/take';
import { switchMap } from 'rxjs/operators/switchMap';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { merge } from 'rxjs/observable/merge';

import {
  SatPopover,
  SatPopoverHorizontalAlign,
  SatPopoverVerticalAlign,
  SatPopoverScrollStrategy,
} from './popover.component';
import { NotificationAction, PopoverNotificationService } from './notification.service';
import { getInvalidPopoverError } from './popover.errors';

@Directive({
  selector: '[satPopoverAnchorFor]',
  exportAs: 'satPopoverAnchor',
  providers: [PopoverNotificationService],
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

  /** Reference to the overlay containing the popover component. */
  _overlayRef: OverlayRef;

  /** Whether the popover is presently open. */
  private _popoverOpen = false;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef,
    private _notifications: PopoverNotificationService,
    @Optional() private _dir: Directionality
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
      this._createOverlay();
      this._overlayRef.attach(this._portal);
      this._subscribeToBackdrop();
      this._subscribeToDetachments();
      this._saveOpenedState();
    }
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    if (this._overlayRef) {
      this._saveClosedState(value);
      this._overlayRef.detach();
    }
  }

  /** Gets the text direction of the containing app. */
  private _getDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Removes the popover from the DOM. Does NOT update open state. */
  private _destroyPopover(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  /**
   * Destroys the popover immediately if it is closed, or waits until it
   * has been closed to destroy it.
   */
  private _destroyPopoverOnceClosed(): void {
    if (this.isPopoverOpen() && this._overlayRef) {
      this._overlayRef.detachments().pipe(
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
    this._overlayRef
      .backdropClick()
      .pipe(
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => this.closePopover());
  }

  /** Set state back to closed when detached. */
  private _subscribeToDetachments(): void {
    this._overlayRef
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

  /** Create an overlay to be attached to the portal. */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(this.attachedPopover._templateRef, this._viewContainerRef);
      const config = this._getOverlayConfig();
      this._subscribeToPositionChanges(config.positionStrategy as ConnectedPositionStrategy);
      this._overlayRef = this._overlay.create(config);
    }
  }

  /** Create and return a config for creating the overlay. */
  private _getOverlayConfig(): OverlayConfig {
    const config = new OverlayConfig({
      positionStrategy: this._getPositionStrategy(),
      hasBackdrop: this.attachedPopover.hasBackdrop,
      backdropClass: this.attachedPopover.backdropClass || 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._getScrollStrategyInstance(this.attachedPopover.scrollStrategy),
      direction: this._getDirection(),
    });

    return config;
  }

  /**
   * Listen to changes in the position of the overlay and set the correct alignment classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private _subscribeToPositionChanges(position: ConnectedPositionStrategy): void {
    position.onPositionChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe(change => {
        this.attachedPopover._setAlignmentClasses(
          getHorizontalPopoverAlignment(change.connectionPair.overlayX),
          getVerticalPopoverAlignment(change.connectionPair.overlayY),
        );
      });
  }

  /** Map a scroll strategy string type to an instance of a scroll strategy. */
  private _getScrollStrategyInstance(strategy: SatPopoverScrollStrategy): ScrollStrategy {
    // TODO support 'close' on resolution of https://github.com/angular/material2/issues/7922
    switch (strategy) {
      case 'block':
        return this._overlay.scrollStrategies.block();
      case 'reposition':
        return this._overlay.scrollStrategies.reposition();
      case 'close':
        return this._overlay.scrollStrategies.close();
      case 'noop':
      default:
        return this._overlay.scrollStrategies.noop();
    }
  }

  /** Create and return a position strategy based on config provided to the component instance. */
  private _getPositionStrategy(): ConnectedPositionStrategy {
    const horizontalTarget = this.attachedPopover.horizontalAlign;
    const verticalTarget = this.attachedPopover.verticalAlign;

    // Attach the overlay at the preferred position
    const {originX, overlayX} = getHorizontalConnectionPosPair(horizontalTarget);
    const {originY, overlayY} = getVerticalConnectionPosPair(verticalTarget);
    const strategy = this._overlay.position()
      .connectedTo(this._elementRef, {originX, originY}, {overlayX, overlayY})
      .withDirection(this._getDirection());

    // Add fallbacks based on the preferred positions
    this._addFallbacks(strategy, horizontalTarget, verticalTarget);

    return strategy;
  }

  /** Add fallbacks to a given strategy based around target alignments. */
  private _addFallbacks(strategy: ConnectedPositionStrategy, hTarget: SatPopoverHorizontalAlign,
        vTarget: SatPopoverVerticalAlign): void {
    // Determine if the target alignments overlap the anchor
    const horizontalOverlapAllowed = hTarget !== 'before' && hTarget !== 'after';
    const verticalOverlapAllowed = vTarget !== 'above' && vTarget !== 'below';

    // If a target alignment doesn't cover the anchor, don't let any of the fallback alignments
    // cover the anchor
    const possibleHorizontalAlignments = horizontalOverlapAllowed ?
      ['before', 'start', 'center', 'end', 'after'] :
      ['before', 'after'];
    const possibleVerticalAlignments = verticalOverlapAllowed ?
      ['above', 'start', 'center', 'end', 'below'] :
      ['above', 'below'];

    // Create fallbacks for each allowed prioritized fallback alignment combo
    const fallbacks = [];
    prioritizeAroundTarget(hTarget, possibleHorizontalAlignments).forEach(h => {
      prioritizeAroundTarget(vTarget, possibleVerticalAlignments).forEach(v => {
        fallbacks.push({h, v});
      });
    });

    // Remove the first fallback since it will be the target alignment that is already applied
    fallbacks.slice(1, fallbacks.length)
      .forEach(({h, v}) => this._applyFallback(strategy, h, v));
  }

  /**
   * Convert a specific horizontal and vertical alignment into a fallback and apply it to
   * the strategy.
   */
  private _applyFallback(strategy, horizontalAlign, verticalAlign): void {
    const {originX, overlayX} = getHorizontalConnectionPosPair(horizontalAlign);
    const {originY, overlayY} = getVerticalConnectionPosPair(verticalAlign);
    strategy.withFallbackPosition({originX, originY}, {overlayX, overlayY});
  }

}

/** Helper function to convert alignment to origin/overlay position pair. */
function getHorizontalConnectionPosPair(h: SatPopoverHorizontalAlign):
    {originX: HorizontalConnectionPos, overlayX: HorizontalConnectionPos} {
  switch (h) {
    case 'before':
      return {originX: 'start', overlayX: 'end'};
    case 'start':
      return {originX: 'start', overlayX: 'start'};
    case 'end':
      return {originX: 'end', overlayX: 'end'};
    case 'after':
      return {originX: 'end', overlayX: 'start'};
    default:
      return {originX: 'center', overlayX: 'center'};
  }
}

/** Helper function to convert alignment to origin/overlay position pair. */
function getVerticalConnectionPosPair(v: SatPopoverVerticalAlign):
    {originY: VerticalConnectionPos, overlayY: VerticalConnectionPos} {
  switch (v) {
    case 'above':
      return {originY: 'top', overlayY: 'bottom'};
    case 'start':
      return {originY: 'top', overlayY: 'top'};
    case 'end':
      return {originY: 'bottom', overlayY: 'bottom'};
    case 'below':
      return {originY: 'bottom', overlayY: 'top'};
    default:
      return {originY: 'center', overlayY: 'center'};
  }
}

/** Helper function to convert an overlay connection position to equivalent popover alignment. */
function getHorizontalPopoverAlignment(h: HorizontalConnectionPos): SatPopoverHorizontalAlign {
  if (h === 'start') {
    return 'after';
  }

  if (h === 'end') {
    return 'before';
  }

  return 'center';
}

/** Helper function to convert an overlay connection position to equivalent popover alignment. */
function getVerticalPopoverAlignment(v: VerticalConnectionPos): SatPopoverVerticalAlign {
  if (v === 'top') {
    return 'below';
  }

  if (v === 'bottom') {
    return 'above';
  }

  return 'center';
}

/**
 * Helper function that takes an ordered array options and returns a reorderded
 * array around the target item. e.g.:
 *
 * target: 3; options: [1, 2, 3, 4, 5, 6, 7];
 *
 * return: [3, 4, 2, 5, 1, 6, 7]
 */
function prioritizeAroundTarget<T>(target: T, options: T[]): T[] {
  const targetIndex = options.indexOf(target);

  // Set the first item to be the target
  const reordered = [target];

  // Make left and right stacks where the highest priority item is last
  const left = options.slice(0, targetIndex);
  const right = options.slice(targetIndex + 1, options.length).reverse();

  // Alternate between stacks until one is empty
  while (left.length && right.length) {
    reordered.push(right.pop());
    reordered.push(left.pop());
  }

  // Flush out right side
  while (right.length) {
    reordered.push(right.pop());
  }

  // Flush out left side
  while (left.length) {
    reordered.push(left.pop());
  }

  return reordered;
}
