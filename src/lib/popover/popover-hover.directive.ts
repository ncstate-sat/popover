import { AfterViewInit, Directive, HostListener, Input, OnDestroy } from '@angular/core';
import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { of, Subject } from 'rxjs';
import { delay, switchMap, takeUntil } from 'rxjs/operators';

import { SatPopoverAnchor } from './popover.component';

@Directive({
  selector: '[satPopoverHover]'
})
export class SatPopoverHoverDirective implements AfterViewInit, OnDestroy {
  /**
   * Amount of time to delay (ms) after hovering starts before
   * the popover opens. Defaults to 0ms.
   */
  @Input()
  get satPopoverHover() {
    return this._satPopoverHover;
  }
  set satPopoverHover(val: NumberInput) {
    this._satPopoverHover = coerceNumberProperty(val);
  }
  private _satPopoverHover = 0;

  /** Emits when the directive is destroyed. */
  private _onDestroy = new Subject<void>();

  /** Emits when the user's mouse enters the element. */
  private _onMouseEnter = new Subject<void>();

  /** Emits when the user's mouse leaves the element. */
  private _onMouseLeave = new Subject<void>();

  constructor(public anchor: SatPopoverAnchor) {}

  ngAfterViewInit() {
    // Whenever the user hovers this host element, delay the configured
    // amount of time and open the popover. Terminate if the mouse leaves
    // the host element before the delay is complete.
    this._onMouseEnter
      .pipe(
        switchMap(() => {
          return of(null).pipe(delay(this._satPopoverHover || 0), takeUntil(this._onMouseLeave));
        }),
        takeUntil(this._onDestroy)
      )
      .subscribe(() => this.anchor.popover.open());
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  @HostListener('mouseenter')
  showPopover() {
    this._onMouseEnter.next();
  }

  @HostListener('mouseleave')
  closePopover() {
    this._onMouseLeave.next();
    this.anchor.popover.close();
  }
}
