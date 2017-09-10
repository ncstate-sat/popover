import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
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
  OverlayState,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';

import {
  SatAttachedOverlayComponent,
  SatOverlayPositionX,
  SatOverlayPositionY
} from './attached-overlay.component';
import { getNoAttachedOverlayError } from './attached-overlay.errors';

@Directive({
  selector: '[satOverlayAnchorFor]',
  exportAs: 'satOverlayAnchor'
})
export class SatOverlayAnchor implements OnInit, OnDestroy {

  /** References the attached overlay instance. */
  @Input('satOverlayAnchorFor')
  get attachedOverlay() { return this._attachedOverlay; }
  set attachedOverlay(value: SatAttachedOverlayComponent) {
    this._validateAttachedOverlay(value);
    this._attachedOverlay = value;
  }
  private _attachedOverlay: SatAttachedOverlayComponent;

  /** Whether clicking the target element will automatically toggle the element. */
  @Input('satDisableClick') disableClick = false;

  /** Emits when the attached overlay is opened. */
  @Output() overlayOpened = new EventEmitter<void>();

  /** Emits when the attached overlay is closed. */
  @Output() overlayClosed = new EventEmitter<any>();

  /** Gets whether the overlay is presently open. */
  overlayOpen(): boolean {
    return this._overlayOpen;
  }

  /** Whether the attached overlay is presently open. */
  private _overlayOpen = false;

  /** Reference to a template portal where the overlay will be attached. */
  private _portal: TemplatePortal<any>;

  /** Reference to the overlay containing the attached overlay component. */
  private _overlayRef: OverlayRef;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private _overlay: Overlay,
    private _elementRef: ElementRef,
    private _viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this._validateAttachedOverlay(this.attachedOverlay);
    this.attachedOverlay.closed
      .takeUntil(this._onDestroy)
      .subscribe(() => this.closeOverlay());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
    this.destroyOverlay();
  }

  /** Toggles the attached overlay between the open and closed states. */
  toggleOverlay(): void {
    return this.overlayOpen ? this.closeOverlay() : this.openOverlay();
  }

  /** Opens the attached overlay. */
  openOverlay(): void {
    if (!this.overlayOpen) {
      this._createOverlay();
      this._overlayRef.attach(this._portal);
      this._subscribeToBackdrop();

      // Save and emit
      this._overlayOpen = true;
      this.overlayOpened.emit();
    }
  }

  /** Closes the attached overlay. */
  closeOverlay(value?: any): void {
    if (this._overlayRef) {
      this._overlayRef.detach();

      // Save and emit
      this._overlayOpen = false;
      value === undefined
        ? this.overlayClosed.emit()
        : this.overlayClosed.emit(value);
    }
  }

  /** Removes the attached overlay from the DOM. */
  destroyOverlay(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }
  }

  /** Toggle the attached overlay when host element is clicked. */
  @HostListener('click')
  private _anchorClicked(): void {
    if (!this.disableClick) {
      this.toggleOverlay();
    }
  }

  /** Throws an error if the attached overlay instance is not provided. */
  private _validateAttachedOverlay(overlay: SatAttachedOverlayComponent): void {
    if (!overlay || !(overlay instanceof SatAttachedOverlayComponent)) {
      throw getNoAttachedOverlayError();
    }
  }

  /** Emit close event when backdrop is clicked for as long as  the overlay is open. */
  private _subscribeToBackdrop(): void {
    this._overlayRef
      .backdropClick()
      .takeUntil(this.overlayClosed)
      .takeUntil(this._onDestroy)
      .subscribe(() => this.attachedOverlay.emitCloseEvent());
  }

  /** Create an overlay to be attached to the portal. */
  private _createOverlay(): void {
    if (!this._overlayRef) {
      this._portal = new TemplatePortal(this.attachedOverlay.templateRef, this._viewContainerRef);
      const config = this._getOverlayConfig();
      this._subscribeToPositionChanges(config.positionStrategy as ConnectedPositionStrategy);
      this._overlayRef = this._overlay.create(config);
    }
  }

  /** Create and return a config for creating the overlay. */
  private _getOverlayConfig(): OverlayState {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this._getPosition();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayState.scrollStrategy = this._overlay.scrollStrategies.reposition();

    return overlayState;
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
        this.attachedOverlay.setPositionClasses(posX, posY);
      });
  }

  /** Create and return a position strategy based on config provided to the component instance. */
  private _getPosition(): ConnectedPositionStrategy {
    // Get config values from the attached overlay
    const overlap = this.attachedOverlay.overlapAnchor;

    const xPos = this.attachedOverlay.xPosition;
    const yPos = this.attachedOverlay.yPosition;

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
function convertToHorizontalPos(val: SatOverlayPositionX, invert?: boolean):
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
    SatOverlayPositionX {
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
function convertToVerticalPos(val: SatOverlayPositionY, invert?: boolean): VerticalConnectionPos {
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
function convertFromVerticalPos(val: VerticalConnectionPos, invert?: boolean): SatOverlayPositionY {
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
