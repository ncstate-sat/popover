import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/observable/of';

@Component({
  selector: 'demo-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Tooltip</mat-card-title>
      <mat-card-content>
        <div class="anchor"
            [satPopoverAnchorFor]="instant"
            (mouseenter)="instant.open()"
            (mouseleave)="instant.close()">
          Hover Me (instant)
        </div>

        <sat-popover #instant horizontalAlign="after">
          <div class="tooltip-wrapper mat-body-1">
            Multi-line <br>
            <span class="seagreen">Tooltip</span>
          </div>
        </sat-popover>

        <div class="anchor"
            [satPopoverAnchorFor]="delayed"
            (mouseenter)="enter.next()"
            (mouseleave)="leave.next()">
          Hover Me (1000ms delay)
        </div>

        <sat-popover #delayed horizontalAlign="after">
          <div class="tooltip-wrapper mat-body-1">
            A tooltip that's slow to open
          </div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class TooltipDemo implements AfterViewInit {
  @ViewChild('delayed') delayed: SatPopover;

  enter = new Subject<void>();
  leave = new Subject<void>();

  ngAfterViewInit() {
    this.enter
      .switchMap(() => Observable.of(null).delay(1000).takeUntil(this.leave))
      .subscribe(() => this.delayed.open());

    this.leave.subscribe(() => this.delayed.close());
  }
}
