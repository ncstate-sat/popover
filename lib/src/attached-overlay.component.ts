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
import { ESCAPE } from '@angular/cdk/keycodes';

import { transformOverlay } from './attached-overlay.animations';

export type SatOverlayPositionX = 'before' | 'center' | 'after';
export type SatOverlayPositionY = 'above'  | 'center' | 'below';

@Component({
  selector: 'sat-attached-overlay',
  encapsulation: ViewEncapsulation.None,
  animations: [transformOverlay],
  styleUrls: ['./attached-overlay.component.scss'],
  template: `
    <ng-template>
      <div class="sat-attached-overlay-container"
        #focusTrapElement
        [ngClass]="_classList"
        (keydown)="_handleKeydown($event)"
        [@transformOverlay]="'showing'"
        (@transformOverlay.done)="onAnimationDone($event)">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class SatAttachedOverlayComponent implements AfterViewInit {

  /** Position of the overlay on the x axis. */
  @Input()
  get xPosition() { return this._xPosition; }
  set xPosition(val: SatOverlayPositionX) {
    this._xPosition = val;
    this.setPositionClasses();
  }
  private _xPosition: SatOverlayPositionX = 'center';

  /** Position of the overlay on the y axis. */
  @Input()
  get yPosition() { return this._yPosition; }
  set yPosition(val: SatOverlayPositionY) {
    this._yPosition = val;
    this.setPositionClasses();
  }
  private _yPosition: SatOverlayPositionY = 'center';

  /** Whether the overlay should overlap its anchor. */
  @Input() overlapAnchor = true;

  /** Reference to template so it can be placed within a portal. */
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  /** Emits when the overlay is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the overlay is closed. */
  @Output() closed = new EventEmitter<any>();

  /** Classes to be added to overlay for purpose of transform origins */
  _classList: any = {};

  /** Reference to the element to build a focus trap around. */
  @ViewChild('focusTrapElement')
  private _focusTrapElement: ElementRef;

  /** Reference to the element that was focused before opening. */
  private _previouslyFocusedElement: HTMLElement;

  /** Reference to a focus trap around the overlay. */
  private _focusTrap: FocusTrap;

  constructor(
    private _focusTrapFactory: FocusTrapFactory,
    @Optional() @Inject(DOCUMENT) private _document: any
  ) { }

  ngAfterViewInit() {
    this.setPositionClasses();
  }

  /** Publicly emit a close event. */
  emitCloseEvent(): void {
    this.closed.emit();
  }

  /** Respond to key events. */
  _handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
      this.emitCloseEvent();
    }
  }

  /** Callback for when overlay is finished animating in or out. */
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'showing') {
      this._trapFocus();
    } else if (event.toState === 'void') {
      this._restoreFocus();
    }
  }

  /** Apply positioning classes based on positioning inputs. */
  setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
    this._classList['sat-overlay-before'] = posX === 'before';
    this._classList['sat-overlay-after']  = posX === 'after';

    this._classList['sat-overlay-above'] = posY === 'above';
    this._classList['sat-overlay-below'] = posY === 'below';

    this._classList['sat-overlay-center'] = posX === 'center' || posY === 'center';
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

  /** Restore focus to the element focused before overlay opened. Also destroy trap. */
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

  /** Save a reference to the element focused before the overlay was opened. */
  private _savePreviouslyFocusedElement(): void {
    if (this._document) {
      this._previouslyFocusedElement = this._document.activeElement as HTMLElement;
    }
  }
}
