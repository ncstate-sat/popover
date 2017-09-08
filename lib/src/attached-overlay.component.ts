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
  exportAs: 'satAttachedOverlay',
  encapsulation: ViewEncapsulation.None,
  animations: [transformOverlay],
  styleUrls: ['./attached-overlay.component.scss'],
  template: `
    <ng-template>
      <div class="sat-attached-overlay"
        [ngClass]="classList"
        #focusTrapElement
        (keydown)="handleKeydown($event)"
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

  /** Position of the overlay on the y axis. */
  @Input()
  get yPosition() { return this._yPosition; }
  set yPosition(val: SatOverlayPositionY) {
    this._yPosition = val;
    this.setPositionClasses();
  }

  /** Whether the overlay should overlap its trigger. */
  @Input() overlapTrigger = true;

  /** Reference to template so it can be placed within a portal. */
  @ViewChild(TemplateRef) templateRef: TemplateRef<any>;

  /** Event emitted whenever the overlay is closed. */
  @Output() close = new EventEmitter<void>();

  /** Classes to be added to overlay for purpose of transform origins */
  classList: any = {};

  /** Reference to the element to build a focus trap around. */
  @ViewChild('focusTrapElement')
  private focusTrapElement: ElementRef;

  /** Reference to the element that was focused before opening. */
  private previouslyFocusedElement: HTMLElement;

  /** Reference to a focus trap around the overlay. */
  private focusTrap: FocusTrap;

  /** Private x position store overloaded by input setter/getter. */
  private _xPosition: SatOverlayPositionX = 'center';

  /** Private y position store overloaded by input setter/getter. */
  private _yPosition: SatOverlayPositionY = 'center';

  constructor(
    private focusTrapFactory: FocusTrapFactory,
    @Optional() @Inject(DOCUMENT) private document: any
  ) { }

  ngAfterViewInit() {
    this.setPositionClasses();
  }

  /** Publicly emit a close event. */
  emitCloseEvent(): void {
    this.close.emit();
  }

  /** Respond to key events. */
  handleKeydown(event: KeyboardEvent): void {
    if (event.keyCode === ESCAPE) {
      event.stopPropagation();
      this.emitCloseEvent();
    }
  }

  /** Callback for when overlay is finished animating in or out. */
  onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'showing') {
      this.trapFocus();
    } else if (event.toState === 'void') {
      this.restoreFocus();
    }
  }

  /** Apply positioning classes based on positioning inputs. */
  setPositionClasses(posX = this.xPosition, posY = this.yPosition) {
    this.classList['sat-overlay-before'] = posX === 'before';
    this.classList['sat-overlay-after']  = posX === 'after';

    this.classList['sat-overlay-above'] = posY === 'above';
    this.classList['sat-overlay-below'] = posY === 'below';

    this.classList['sat-overlay-center'] = posX === 'center' || posY === 'center';
  }

  /** Move the focus inside the focus trap and remember where to return later. */
  private trapFocus(): void {
    this.savePreviouslyFocusedElement();

    // There won't be a focus trap element if the close animation starts before open finishes
    if (!this.focusTrapElement) {
      return;
    }

    if (!this.focusTrap && this.focusTrapElement) {
      this.focusTrap = this.focusTrapFactory.create(this.focusTrapElement.nativeElement);
    }

    this.focusTrap.focusInitialElementWhenReady();
  }

  /** Restore focus to the element focused before overlay opened. Also destroy trap. */
  private restoreFocus(): void {

    const toFocus = this.previouslyFocusedElement;

    // Must check active element is focusable for IE sake
    if (toFocus && 'focus' in toFocus) {
      this.previouslyFocusedElement.focus();
    }

    this.previouslyFocusedElement = null;

    if (this.focusTrap) {
      this.focusTrap.destroy();
      this.focusTrap = undefined;
    }
  }

  /** Save a reference to the element focused before the overlay was opened. */
  private savePreviouslyFocusedElement(): void {
    if (this.document) {
      this.previouslyFocusedElement = this.document.activeElement as HTMLElement;
    }
  }
}
