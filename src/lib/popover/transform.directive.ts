import { AnimationEvent, AnimationBuilder, AnimationPlayer, AnimationMetadata, animate, style } from '@angular/animations';

import { Directive, ElementRef, Input,  Output, EventEmitter } from '@angular/core';
import { SatPopover } from './popover.component';

@Directive({
  selector: '[transformSurface]'
})
export class TransformSurfaceDirective {

  @Input()
  set transformSurface(val: any) {
    console.log('transformSurface:', val);
  }

  @Output('tranformSurface.done') done = new EventEmitter();


  /** Animation player. */
  private _player: AnimationPlayer;

  constructor(
    private _elementRef: ElementRef,
    private _builder: AnimationBuilder,
    private _popover: SatPopover
  ) {
  }

  ngOnInit() {
    this._doEnterAnimation();
  }

  ngOnDestroy() {
    this._doLeaveAnimation();
  }

  _doEnterAnimation() {
    if (this._player) {
       this._player.destroy();
    }

    const factory = this._builder.build(this._getEnterAnimation());
    this._player = factory.create(this._elementRef.nativeElement);
    this._player.play();
    this._player.onDone(() => this.done.emit({ toState: 'visible' }));
  }

  _doLeaveAnimation() {
    if (this._player) {
      this._player.destroy();
    }

   const factory = this._builder.build(this._getLeaveAnimation());
   this._player = factory.create(this._elementRef.nativeElement);
   this._player.play();
   this._player.onDone(() => this.done.emit({ toState: 'void' }));
  }

  _getEnterAnimation() {
    const enterAnimation: AnimationMetadata[] = [
      style({opacity: 0, transform: 'scale(0.3)'}),
      animate(this._popover.openTransition,
        style({opacity: 1, transform: 'scale(1)'}))
    ];

    return enterAnimation;
  }

  _getLeaveAnimation() {
    const leaveAnimation: AnimationMetadata[] = [
      animate(this._popover.closeTransition,
        style({opacity: 0, transform: 'scale(0.5)'}))
    ];

    return leaveAnimation;
  }
}
