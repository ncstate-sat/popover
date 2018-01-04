import {
  ElementRef,
  Injectable,
  NgZone,
  OnDestroy,
  Optional,
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
import { Directionality, Direction} from '@angular/cdk/bidi';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import {
  SatPopover,
  SatPopoverHorizontalAlign,
  SatPopoverVerticalAlign,
  SatPopoverScrollStrategy,
} from './popover.component';

@Injectable()
export class PopoverAnchoringService implements OnDestroy {

  /** Reference to the overlay containing the popover component. */
  _overlayRef: OverlayRef;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _ngZone: NgZone,
    @Optional() private _dir: Directionality
  ) { }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  /** Create an overlay to be attached to the portal. */
  createOverlay(
    popover: SatPopover,
    viewContainerRef: ViewContainerRef,
    anchor: ElementRef
  ): OverlayRef {
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(popover._templateRef, viewContainerRef);
      const config = this._getOverlayConfig(popover, anchor);
      this._subscribeToPositionChanges(
        config.positionStrategy as ConnectedPositionStrategy,
        popover
      );
      this._overlayRef = this._overlay.create(config);
    }

    this._overlayRef.attach(this._portal);
    return this._overlayRef;
  }

  /** Gets the text direction of the containing app. */
  private _getDirection(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Create and return a config for creating the overlay. */
  private _getOverlayConfig(popover: SatPopover, anchor: ElementRef): OverlayConfig {
    const config = new OverlayConfig({
      positionStrategy: this._getPositionStrategy(popover, anchor),
      hasBackdrop: popover.hasBackdrop,
      backdropClass: popover.backdropClass || 'cdk-overlay-transparent-backdrop',
      scrollStrategy: this._getScrollStrategyInstance(popover.scrollStrategy),
      direction: this._getDirection(),
    });

    return config;
  }

  /**
   * Listen to changes in the position of the overlay and set the correct alignment classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private _subscribeToPositionChanges(
    position: ConnectedPositionStrategy,
    popover: SatPopover
  ): void {
    position.onPositionChange
      .pipe(takeUntil(this._onDestroy))
      .subscribe(change => {
        // Position changes may occur outside the Angular zone
        this._ngZone.run(() => {
          popover._setAlignmentClasses(
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
  private _getPositionStrategy(popover: SatPopover, anchor: ElementRef): ConnectedPositionStrategy {
    const horizontalTarget = popover.horizontalAlign;
    const verticalTarget = popover.verticalAlign;

    // Attach the overlay at the preferred position
    const {originX, overlayX} = getHorizontalConnectionPosPair(horizontalTarget);
    const {originY, overlayY} = getVerticalConnectionPosPair(verticalTarget);
    const strategy = this._overlay.position()
      .connectedTo(anchor, {originX, originY}, {overlayX, overlayY})
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
