import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SatPopover } from '@ncstate/sat-popover';

@Component({
  selector: 'demo-anchor-reuse',
  styleUrls: ['anchor-reuse.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Anchor Reuse</mat-card-title>
      <mat-card-content>
        Active Popover:
        <mat-radio-group [(ngModel)]="activePopover">
          <mat-radio-button value="a">A</mat-radio-button>
          <mat-radio-button value="b">B</mat-radio-button>
        </mat-radio-group>

        <br />

        <mat-slide-toggle [(ngModel)]="showAnchor">Show Anchor</mat-slide-toggle>

        <br />

        <button
          mat-button
          *ngIf="showAnchor"
          [satPopoverAnchor]="getActivePopover()"
          (click)="getActivePopover().toggle()"
        >
          Anchor
        </button>

        <sat-popover #a xAlign="after" hasBackdrop><div class="wrapper">A</div></sat-popover>
        <sat-popover #b xAlign="after" hasBackdrop><div class="wrapper">B</div></sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class AnchorReuseComponent implements AfterViewInit {
  @ViewChild('a') aPopover: SatPopover;
  @ViewChild('b') bPopover: SatPopover;

  activePopover = 'a';
  showAnchor = false;

  getActivePopover(): SatPopover {
    return this.activePopover === 'a' ? this.aPopover : this.bPopover;
  }

  ngAfterViewInit() {
    // Wait for SatPopover references before showing the button
    setTimeout(() => {
      this.showAnchor = true;
    });
  }
}
