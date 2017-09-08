import {
  AfterViewInit,
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
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

import { SatAttachedOverlayComponent, SatOverlayPositionX, SatOverlayPositionY } from './attached-overlay.component';

// Override lint because this is a non-standard directive
/* tslint:disable:directive-class-suffix no-input-rename */

@Directive({
  selector: '[satAttachedOverlayTriggerFor]',
  exportAs: 'satTrigger'
})
export class SatAttachedOverlayTrigger implements AfterViewInit, OnDestroy {

  /** References the associated attached overlay instance. */
  @Input('satAttachedOverlayTriggerFor') attachedOverlay: SatAttachedOverlayComponent;

  /** Whether clicking the target element will automatically toggle the element. */
  @Input('satToggleOnClick') toggleOnClick = true;

  /** Event emitted when the attached overlay is opened. */
  @Output() onAttachedOverlayOpen = new EventEmitter<void>();

  /** Event emitted when the attached overlay is closed. */
  @Output() onAttachedOverlayClose = new EventEmitter<any>();

  /** Whether the attached overlay is presently open. */
  attachedOverlayOpen = false;

  /** Reference to a template portal where the overlay will be attached. */
  private portal: TemplatePortal<any>;

  /** Reference to the overlay containing the attached overlay component. */
  private overlayRef: OverlayRef;

  /** Emits when the component is destroyed. */
  private destroy = new Subject<void>();

  constructor(
    private overlay: Overlay,
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngAfterViewInit() {
    this.checkIsAttachedOverlay();
    this.attachedOverlay.close
      .takeUntil(this.destroy)
      .subscribe(() => this.closeAttachedOverlay());
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();

    this.destroyAttachedOverlay();
  }

  /** Toggle the attached overlay when element is clicked */
  @HostListener('click')
  triggerClicked(): void {
    if (this.toggleOnClick) {
      this.toggleAttachedOverlay();
    }
  }

  /** Toggles the attached overlay between the open and closed states. */
  toggleAttachedOverlay(): void {
    return this.attachedOverlayOpen ? this.closeAttachedOverlay() : this.openAttachedOverlay();
  }

  /** Opens the attached overlay. */
  openAttachedOverlay(): void {
    if (!this.attachedOverlayOpen) {
      this.createOverlay();
      this.overlayRef.attach(this.portal);
      this.subscribeToBackdrop();

      // Save and emit
      this.attachedOverlayOpen = true;
      this.onAttachedOverlayOpen.emit();
    }
  }

  /** Closes the attached overlay. */
  closeAttachedOverlay(value?: any): void {
    if (this.overlayRef) {
      this.overlayRef.detach();

      // Save and emit
      this.attachedOverlayOpen = false;
      value === undefined
        ? this.onAttachedOverlayClose.emit()
        : this.onAttachedOverlayClose.emit(value);
    }
  }

  /** Removes the attached overlay from the DOM. */
  destroyAttachedOverlay(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

  /** Throws an error if the attached overlay instance is not provided. */
  private checkIsAttachedOverlay(): void {
    if (!this.attachedOverlay) {
      throw new Error('satAttachedOverlayTriggerFor: must pass in a attached overlay instance');
    }
  }

  /** Emit close event when backdrop is clicked for as long as overlay is open. */
  private subscribeToBackdrop(): void {
    this.overlayRef
      .backdropClick()
      .takeUntil(this.onAttachedOverlayClose)
      .takeUntil(this.destroy)
      .subscribe(() => this.attachedOverlay.emitCloseEvent());
  }

  /** Create an overlay to be attached to the portal. */
  private createOverlay(): void {
    if (!this.overlayRef) {
      this.portal = new TemplatePortal(this.attachedOverlay.templateRef, this.viewContainerRef);
      const config = this.getOverlayConfig();
      this.subscribeToPositionChanges(config.positionStrategy as ConnectedPositionStrategy);
      this.overlayRef = this.overlay.create(config);
    }
  }

  /** Create and return a config for creating the overlay. */
  private getOverlayConfig(): OverlayState {
    const overlayState = new OverlayState();
    overlayState.positionStrategy = this.getPosition();
    overlayState.hasBackdrop = true;
    overlayState.backdropClass = 'cdk-overlay-transparent-backdrop';
    overlayState.scrollStrategy = this.overlay.scrollStrategies.reposition();

    return overlayState;
  }

  /**
   * Listen to changes in the position of the overlay and set the correct classes,
   * ensuring that the animation origin is correct, even with a fallback position.
   */
  private subscribeToPositionChanges(position: ConnectedPositionStrategy): void {
    position.onPositionChange
      .takeUntil(this.destroy)
      .subscribe(change => {
        const posX = convertFromHorizontalPos(change.connectionPair.overlayX, true);
        const posY = convertFromVerticalPos(change.connectionPair.overlayY, true);
        this.attachedOverlay.setPositionClasses(posX, posY);
      });
  }

  /** Create and return a position strategy based on config provided to the component instance. */
  private getPosition(): ConnectedPositionStrategy {
    // Get config values from the attached overlay
    const overlap = this.attachedOverlay.overlapTrigger;

    console.log('overlap', overlap);
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

    // Generate a position strategy with iterative fall back solutions
    //       1 2 3
    //  ↖︎ => 4 5 6
    //       7 8 9
    return this.overlay.position()
      // Original Y position (1)
      .connectedTo(this.elementRef,
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
function convertToHorizontalPos(val: SatOverlayPositionX, invert?: boolean): HorizontalConnectionPos {
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
function convertFromHorizontalPos(val: HorizontalConnectionPos, invert?: boolean): SatOverlayPositionX {
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
