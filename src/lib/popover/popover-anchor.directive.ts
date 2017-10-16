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
import {
  ConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayRef,
  OverlayConfig,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/switchMap';

import {
  SatPopover,
  SatPopoverPositionX,
  SatPopoverPositionY
} from './popover.component';
import { getInvalidPopoverError } from './popover.errors';

@Directive({
  selector: '[satPopoverAnchorFor]',
  exportAs: 'satPopoverAnchor'
})
export class SatPopoverAnchor implements OnInit, OnDestroy {

  /** References the popover instance. */
  @Input('satPopoverAnchorFor')
  get attachedPopover() { return this._attachedPopover; }
  set attachedPopover(value: SatPopover) {
    this._validateAttachedPopover(value);
    this._attachedPopover = value;
    this._attachedPopoverChange.next(this._attachedPopover);
  }
  private _attachedPopover: SatPopover;

  /** Emits when the popover is opened. */
  @Output() popoverOpened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() popoverClosed = new EventEmitter<any>();

  /** Gets whether the popover is presently open. */
  popoverOpen(): boolean {
    return this._popoverOpen;
  }

  /** Whether the popover is presently open. */
  private _popoverOpen = false;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Reference to the overlay containing the popover component. */
  private _overlayRef: OverlayRef;

  private _attachedPopoverChange = new Subject<SatPopover>();

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef
  ) {
    this._subscribeToPopoverInstanceChanges();
  }

  ngOnInit() {
    this._validateAttachedPopover(this.attachedPopover);
    this.attachedPopover.closed
      .takeUntil(this._onDestroy)
      .subscribe(() => this.closePopover());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.destroyPopover();
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

      // Save and emit
      this._popoverOpen = true;
      this.popoverOpened.emit();
    }
  }

  /** Closes the popover. */
  closePopover(value?: any): void {
    if (this._overlayRef) {
      this._overlayRef.detach();

      // Save and emit
      this._popoverOpen = false;
      value === undefined
        ? this.popoverClosed.emit()
        : this.popoverClosed.emit(value);
    }
  }

  /** Removes the popover from the DOM. */
  destroyPopover(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  /** Throws an error if the popover instance is not provided. */
  private _validateAttachedPopover(popover: SatPopover): void {
    if (!popover || !(popover instanceof SatPopover)) {
      throw getInvalidPopoverError();
    }
  }

  /**
   * Whenever a new popover is attached to this anchor, observe
   * its action subject to dispatch the appropriate action.
   */
  private _subscribeToPopoverInstanceChanges(): void {
    this._attachedPopoverChange
      .switchMap(popover => popover._takeAction)
      .takeUntil(this._onDestroy)
      .subscribe(action => {
        if (action === 'open') {
          this.openPopover();
        } else if (action === 'close') {
          this.closePopover();
        } else if (action === 'toggle') {
          this.togglePopover();
        }
      });
  }

  /** Emit close event when backdrop is clicked for as long as the overlay is open. */
  private _subscribeToBackdrop(): void {
    this._overlayRef
      .backdropClick()
      .takeUntil(this.popoverClosed)
      .takeUntil(this._onDestroy)
      .subscribe(() => this.attachedPopover._emitCloseEvent());
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
    const config = new OverlayConfig();
    config.positionStrategy = this._getPosition();
    config.hasBackdrop = this.attachedPopover.showBackdrop;
    config.backdropClass = this.attachedPopover.backdropClass || 'cdk-overlay-transparent-backdrop';
    config.scrollStrategy = this._overlay.scrollStrategies.reposition();

    return config;
  }

  /**
   * Listen to changes in the position of the overlay and set the correct classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private _subscribeToPositionChanges(position: ConnectedPositionStrategy): void {
    position.onPositionChange
      .takeUntil(this._onDestroy)
      .subscribe(change => {
        const posX = convertFromHorizontalPos(change.connectionPair.overlayX, true);
        const posY = convertFromVerticalPos(change.connectionPair.overlayY, true);
        this.attachedPopover._setPositionClasses(posX, posY);
      });
  }

  /** Create and return a position strategy based on config provided to the component instance. */
  private _getPosition(): ConnectedPositionStrategy {
    // Get config values from the popover
    const overlap = this.attachedPopover.overlapAnchor;

    const xPos = this.attachedPopover.xPosition;
    const yPos = this.attachedPopover.yPosition;

    // Convert position to value usable by strategy. Invert for the overlay so that 'above' means
    // the overlay is attached at the 'bottom'
    const overlayX = convertToHorizontalPos(xPos, true);
    const overlayY = convertToVerticalPos(yPos, true);

    // Invert for the trigger when overlapping. When it isn't supposed to overlap, use the original
    // translation so that 'above' means 'top'
    const originX = convertToHorizontalPos(xPos, overlap);
    const originY = convertToVerticalPos(yPos, overlap);

    // Generate a position strategy with iterative fallback solutions
    //       1 2 3
    //  ↖︎ => 4 5 6
    //       7 8 9
    return this._overlay.position()
      // Original Y position (1)
      .connectedTo(this._elementRef,
        {originX: originX, originY: originY},
        {overlayX: overlayX, overlayY: overlayY}
      )
      // (2)
      .withFallbackPosition(
        {originX: 'center', originY: originY},
        {overlayX: 'center', overlayY: overlayY}
      )
      // (3)
      .withFallbackPosition(
        {originX: reverseHorizontal(originX), originY: originY},
        {overlayX: reverseHorizontal(overlayX), overlayY: overlayY},
      )
      // Center Y position (4)
      .withFallbackPosition(
        {originX: originX, originY: 'center'},
        {overlayX: overlayX, overlayY: 'center'}
      )
      // (5)
      .withFallbackPosition(
        {originX: 'center', originY: 'center'},
        {overlayX: 'center', overlayY: 'center'}
      )
      // (6)
      .withFallbackPosition(
        {originX: reverseHorizontal(originX), originY: 'center'},
        {overlayX: reverseHorizontal(overlayX), overlayY: 'center'},
      )
      // Reverse Y position (7)
      .withFallbackPosition(
        {originX: originX, originY: reverseVertical(originY)},
        {overlayX: overlayX, overlayY: reverseVertical(overlayY)}
      )
      // (8)
      .withFallbackPosition(
        {originX: 'center', originY: reverseVertical(originY)},
        {overlayX: 'center', overlayY: reverseVertical(overlayY)}
      )
      // (9)
      .withFallbackPosition(
        {originX: reverseHorizontal(originX), originY: reverseVertical(originY)},
        {overlayX: reverseHorizontal(overlayX), overlayY: reverseVertical(overlayY)}
      );
  }

}

/** Helper to convert to correct horizontal position */
function convertToHorizontalPos(val: SatPopoverPositionX, invert?: boolean):
    HorizontalConnectionPos {
  switch (val) {
    case 'before':
      return invert ? 'end' : 'start';
    case 'center':
      return 'center';
    case 'after':
      return invert ? 'start' : 'end';
  }
}

/** Helper to convert from a horizontal position back to an overlay position  */
function convertFromHorizontalPos(val: HorizontalConnectionPos, invert?: boolean):
    SatPopoverPositionX {
  switch (val) {
    case 'start':
      return invert ? 'after' : 'before';
    case 'center':
      return 'center';
    case 'end':
      return invert ? 'before' : 'after';
  }
}

/** Helper to convert to correct vertical position */
function convertToVerticalPos(val: SatPopoverPositionY, invert?: boolean): VerticalConnectionPos {
  switch (val) {
    case 'above':
      return invert ? 'bottom' : 'top';
    case 'center':
      return 'center';
    case 'below':
      return invert ? 'top' : 'bottom';
  }
}

/** Helper to convert from a vertical position back to an overlay position */
function convertFromVerticalPos(val: VerticalConnectionPos, invert?: boolean): SatPopoverPositionY {
  switch (val) {
    case 'top':
      return invert ? 'below' : 'above';
    case 'center':
      return 'center';
    case 'bottom':
      return invert ? 'above' : 'below';
  }
}

/** Helper to reverse horizontal position */
function reverseHorizontal(val: HorizontalConnectionPos): HorizontalConnectionPos {
  switch (val) {
    case 'start':
      return 'end';
    case 'end':
      return 'start';
    default:
      return 'center';
  }
}

/** Helper to reverse vertical position */
function reverseVertical(val: VerticalConnectionPos): VerticalConnectionPos {
  switch (val) {
    case 'top':
      return 'bottom';
    case 'bottom':
      return 'top';
    default:
      return 'center';
  }
}
