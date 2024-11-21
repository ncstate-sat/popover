import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SatPopoverComponent, SatPopoverModule } from '../../../lib/public_api';
import { Subject, of } from 'rxjs';
import { switchMap, takeUntil, delay } from 'rxjs/operators';

@Component({
  imports: [CommonModule, MatCardModule, SatPopoverModule],
  selector: 'demo-tooltip',
  styleUrls: ['./tooltip.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Tooltip</mat-card-title>
      <mat-card-content>
        <!-- Basic tooltip -->
        <div
          satPopoverAnchor
          #instantAnchor="satPopoverAnchor"
          class="anchor"
          (mouseenter)="instantPopover.open()"
          (mouseleave)="instantPopover.close()"
        >
          Hover Me (instant)
        </div>
        <sat-popover #instantPopover [anchor]="instantAnchor" horizontalAlign="after">
          <div class="tooltip-wrapper mat-body-1">
            Multi-line <br />
            <span class="seagreen">Tooltip</span>
          </div>
        </sat-popover>

        <!-- Tooltip with delay -->
        <div
          satPopoverAnchor
          #delayedAnchor="satPopoverAnchor"
          class="anchor"
          (mouseenter)="mouseenter.next()"
          (mouseleave)="mouseleave.next()"
        >
          Hover Me (1000ms delay)
        </div>
        <sat-popover #poDelayed [anchor]="delayedAnchor" horizontalAlign="after">
          <div class="tooltip-wrapper mat-body-1"> A tooltip that's slow to open </div>
        </sat-popover>

        <!-- Tooltip using hover directive -->
        <div satPopoverAnchor #hoverAnchor="satPopoverAnchor" class="anchor">
          Hover
          <span class="hover-text" [satPopoverHover]="500">this text</span>
          for 500ms
        </div>
        <sat-popover [anchor]="hoverAnchor" horizontalAlign="after">
          <div class="tooltip-wrapper mat-body-1"> This tooltip uses the <code>SatPopoverHoverDirective</code> </div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class DemoTooltipComponent implements AfterViewInit {
  @ViewChild('poDelayed') delayed: SatPopoverComponent;

  mouseenter = new Subject<void>();
  mouseleave = new Subject<void>();

  ngAfterViewInit() {
    this.mouseenter
      .pipe(switchMap(() => of(null).pipe(delay(1000), takeUntil(this.mouseleave))))
      .subscribe(() => this.delayed.open());

    this.mouseleave.subscribe(() => this.delayed.close());
  }
}
