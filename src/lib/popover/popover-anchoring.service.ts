import {
  ElementRef,
  Injectable,
  NgZone,
  OnDestroy,
  Optional,
  ViewContainerRef
} from '@angular/core';
import {
  ConnectionPositionPair,
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos,
} from '@angular/cdk/overlay';
import { Directionality, Direction} from '@angular/cdk/bidi';
import { ESCAPE } from '@angular/cdk/keycodes';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subscription, Subject } from 'rxjs';
import { takeUntil, take, filter, tap } from 'rxjs/operators';

import {
  SatPopover,
  SatPopoverHorizontalAlign,
  SatPopoverVerticalAlign,
  SatPopoverScrollStrategy,
} from './popover.component';
import { PopoverNotificationService, NotificationAction } from './notification.service';

/**
 * Configuration provided by the popover for the anchoring service
 * to build the correct overlay config.
 */
interface PopoverConfig {
  horizontalAlign: SatPopoverHorizontalAlign;
  verticalAlign: SatPopoverVerticalAlign;
  hasBackdrop: boolean;
  backdropClass: string;
  scrollStrategy: SatPopoverScrollStrategy;
  forceAlignment: boolean;
  lockAlignment: boolean;
}

@Injectable()
export class PopoverAnchoringService implements OnDestroy {

  /** Emits when the popover is opened. */
  popoverOpened = new Subject<void>();

  /** Emits when the popover is closed. */
  popoverClosed = new Subject<void>();

  /** Reference to the overlay containing the popover component. */
  _overlayRef: OverlayRef;

  /** Reference to the target popover. */
  private _popover: SatPopover;

  /** Reference to the view container for the popover template. */
  private _viewContainerRef: ViewContainerRef;

  /** Reference to the anchor element. */
  private _anchor: ElementRef;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Communications channel with the popover. */
  private _notifications: PopoverNotificationService;

  /** Single subscription to notifications service events. */
  private _notificationsSubscription: Subscription;

  /** Single subscription to position changes. */
  private _positionChangeSubscription: Subscription;

  /** Whether the popover is presently open. */
  private _popoverOpen = false;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _ngZone: NgZone,
    @Optional() private _dir: Directionality
  ) { }

  ngOnDestroy() {
    // Destroy popover before terminating subscriptions so that any resulting
    // detachments update 'closed state'
    this._destroyPopover();

    // Terminate subscriptions
    if (this._notificationsSubscription) {
      this._notificationsSubscription.unsubscribe();
    }
    if (this._positionChangeSubscription) {
      this._positionChangeSubscription.unsubscribe();
    }
    this._onDestroy.next();
    this._onDestroy.complete();

    this.popoverOpened.complete();
    this.popoverClosed.complete();
  }

  /** Anchor a popover instance to a view and connection element. */
  anchor(popover: SatPopover, viewContainerRef: ViewContainerRef, anchor: ElementRef): void {
    // Destroy any previous popovers
    this._destroyPopover();

    // Assign local refs
    this._popover = popover;
    this._viewContainerRef = viewContainerRef;
    this._anchor = anchor;

    // Provide notification service as a communication channel between popover and anchor.
    // Then subscribe to notifications to take appropriate actions.
    this._popover._notifications = this._notifications = new PopoverNotificationService();
    this._subscribeToNotifications();
  }

  /** Gets whether the popover is presently open. */
  isPopoverOpen(): boolean {
    return this._popoverOpen;
  }

  /** Toggles the popover between the open and closed states. */
  togglePopover(): void {
    return this._popoverOpen ? this.closePopover() : this.openPopover();
  }

  /** Opens the popover. */
  openPopover(): void {
    if (!this._popoverOpen) {
      this.createOverlay();
      this._subscribeToBackdrop();
      this._subscribeToEscape();
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

  /** Create an overlay to be attached to the portal. */
  createOverlay(): OverlayRef {
    // Create overlay if it doesn't yet exist
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(this._popover._templateRef, this._viewContainerRef);

      const popoverConfig = {
        horizontalAlign: this._popover.horizontalAlign,
        verticalAlign: this._popover.verticalAlign,
        hasBackdrop: this._popover.hasBackdrop,
        backdropClass: this._popover.backdropClass,
        scrollStrategy: this._popover.scrollStrategy,
        forceAlignment: this._popover.forceAlignment,
        lockAlignment: this._popover.lockAlignment,
      };

      const overlayConfig = this._getOverlayConfig(popoverConfig, this._anchor);

      this._subscribeToPositionChanges(
        overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy
      );

      this._overlayRef = this._overlay.create(overlayConfig);
    }

    // Actually open the popover
    this._overlayRef.attach(this._portal);
    return this._overlayRef;
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

  /**
   * Call appropriate anchor method when an event is dispatched through
   * the notification service.
   */
  private _subscribeToNotifications(): void {
    if (this._notificationsSubscription) {
      this._notificationsSubscription.unsubscribe();
    }

    this._notificationsSubscription = this._notifications.events()
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
        tap(() => this._popover.backdropClicked.emit()),
        filter(() => this._popover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
      )
      .subscribe(() => this.closePopover());
  }

  /** Close popover when escape keydown event occurs. */
  private _subscribeToEscape(): void {
    this._overlayRef
      .keydownEvents()
      .pipe(
        tap(event => this._popover.overlayKeydown.emit(event)),
        filter(event => event.keyCode === ESCAPE),
        filter(() => this._popover.interactiveClose),
        takeUntil(this.popoverClosed),
        takeUntil(this._onDestroy),
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
      this._popover._open = this._popoverOpen = true;

      this.popoverOpened.next();
      this._popover.opened.emit();
    }
  }

  /** Save the closed state of the popover and emit. */
  private _saveClosedState(value?: any): void {
    if (this._popoverOpen) {
      this._popover._open = this._popoverOpen = false;

      this.popoverClosed.next(value);
      this._popover.closed.emit(value);
    }
  }

  /** Gets the text direction of the containing app. */
  private _getDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Create and return a config for creating the overlay. */
  private _getOverlayConfig(config: PopoverConfig, anchor: ElementRef): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._getPositionStrategy(
        config.horizontalAlign,
        config.verticalAlign,
        config.forceAlignment,
        config.lockAlignment,
        anchor,
      ),
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass || 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._getScrollStrategyInstance(config.scrollStrategy),
      direction: this._getDirection(),
    });
  }

  /**
   * Listen to changes in the position of the overlay and set the correct alignment classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private _subscribeToPositionChanges(position: FlexibleConnectedPositionStrategy): void {
    if (this._positionChangeSubscription) {
      this._positionChangeSubscription.unsubscribe();
    }

    this._positionChangeSubscription = position.positionChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(change => {
        // Position changes may occur outside the Angular zone
        this._ngZone.run(() => {
          this._popover._setAlignmentClasses(
            getHorizontalPopoverAlignment(change.connectionPair.overlayX),
            getVerticalPopoverAlignment(change.connectionPair.overlayY),
          );
        });
      });
  }

  /** Map a scroll strategy string type to an instance of a scroll strategy. */
  private _getScrollStrategyInstance(strategy: SatPopoverScrollStrategy): ScrollStrategy {
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
  private _getPositionStrategy(
    horizontalTarget: SatPopoverHorizontalAlign,
    verticalTarget: SatPopoverVerticalAlign,
    forceAlignment: boolean,
    lockAlignment: boolean,
    anchor: ElementRef,
  ): FlexibleConnectedPositionStrategy {
    // Attach the overlay at the preferred position
    const targetPosition = getPosition(horizontalTarget, verticalTarget);
    const positions = [targetPosition];

    const strategy = this._overlay.position()
      .flexibleConnectedTo(anchor)
      .withFlexibleDimensions(false)
      .withPush(false)
      .withViewportMargin(0)
      .withLockedPosition(lockAlignment);

    // Unless the alignment is forced, add fallbacks based on the preferred positions
    if (!forceAlignment) {
      const fallbacks = this._getFallbacks(horizontalTarget, verticalTarget);
      positions.push(...fallbacks);
    }

    return strategy.withPositions(positions);
  }

  /** Get fallback positions based around target alignments. */
  private _getFallbacks(
    hTarget: SatPopoverHorizontalAlign,
    vTarget: SatPopoverVerticalAlign
  ): ConnectionPositionPair[] {
    // Determine if the target alignments overlap the anchor
    const horizontalOverlapAllowed = hTarget !== 'before' && hTarget !== 'after';
    const verticalOverlapAllowed = vTarget !== 'above' && vTarget !== 'below';

    // If a target alignment doesn't cover the anchor, don't let any of the fallback alignments
    // cover the anchor
    const possibleHorizontalAlignments: SatPopoverHorizontalAlign[] =
      horizontalOverlapAllowed ?
        ['before', 'start', 'center', 'end', 'after'] :
        ['before', 'after'];
    const possibleVerticalAlignments: SatPopoverVerticalAlign[] =
      verticalOverlapAllowed ?
        ['above', 'start', 'center', 'end', 'below'] :
        ['above', 'below'];

    // Create fallbacks for each allowed prioritized fallback alignment combo
    const fallbacks: ConnectionPositionPair[] = [];
    prioritizeAroundTarget(hTarget, possibleHorizontalAlignments).forEach(h => {
      prioritizeAroundTarget(vTarget, possibleVerticalAlignments).forEach(v => {
        fallbacks.push(getPosition(h, v));
      });
    });

    // Remove the first item since it will be the target alignment and isn't considered a fallback
    return fallbacks.slice(1, fallbacks.length);
  }

}

/** Helper function to get a cdk position pair from SatPopover alignments. */
function getPosition(
  h: SatPopoverHorizontalAlign,
  v: SatPopoverVerticalAlign,
): ConnectionPositionPair {
  const {originX, overlayX} = getHorizontalConnectionPosPair(h);
  const {originY, overlayY} = getVerticalConnectionPosPair(v);
  return new ConnectionPositionPair({originX, originY}, {overlayX, overlayY});
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
