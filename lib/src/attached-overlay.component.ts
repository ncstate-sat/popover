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

import { transformPopover } from './attached-overlay.animations';

export type SatPopoverPositionX = 'before' | 'center' | 'after';
export type SatPopoverPositionY = 'above'  | 'center' | 'below';

@Component({
  selector: 'sat-attached-overlay',
  encapsulation: ViewEncapsulation.None,
  animations: [transformPopover],
  styleUrls: ['./attached-overlay.component.scss'],
  template: `
    <ng-template>
      <div class="sat-popover-container"
          #focusTrapElement
          [ngClass]="_classList"
          (keydown)="_handleKeydown($event)"
          [@transformPopover]="'showing'"
          (@transformPopover.done)="_onAnimationDone($event)">
        <ng-content></ng-content>
      </div>
    </ng-template>
  `
})
export class SatPopover implements AfterViewInit {

  /** Position of the popover on the x axis. */
  @Input()
  get xPosition() { return this._xPosition; }
  set xPosition(val: SatPopoverPositionX) {
    this._xPosition = val;
    this._setPositionClasses();
  }
  private _xPosition: SatPopoverPositionX = 'center';

  /** Position of the popover on the y axis. */
  @Input()
  get yPosition() { return this._yPosition; }
  set yPosition(val: SatPopoverPositionY) {
    this._yPosition = val;
    this._setPositionClasses();
  }
  private _yPosition: SatPopoverPositionY = 'center';

  /** Whether the popover should overlap its anchor. */
  @Input() overlapAnchor = true;

  /** Emits when the popover is opened. */
  @Output() opened = new EventEmitter<void>();

  /** Emits when the popover is closed. */
  @Output() closed = new EventEmitter<any>();

  /** Reference to template so it can be placed within a portal. */
  @ViewChild(TemplateRef) _templateRef: TemplateRef<any>;

  /** Classes to be added to the popover for setting the correct transform origin. */
  _classList: any = {};

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

  /** Callback for when the popover is finished animating in or out. */
  _onAnimationDone(event: AnimationEvent) {
    if (event.toState === 'showing') {
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
}
