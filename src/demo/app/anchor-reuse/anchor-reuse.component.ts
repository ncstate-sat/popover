import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { SatPopoverModule, SatPopoverComponent } from '../../../lib/public_api';

@Component({
  imports: [FormsModule, MatButtonModule, MatCardModule, MatRadioModule, MatSlideToggleModule, SatPopoverModule],
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

        @if (showAnchor) {
          <button mat-button [satPopoverAnchor]="getActivePopover()" (click)="getActivePopover().toggle()">
            Anchor
          </button>
        }

        <sat-popover #a xAlign="after" hasBackdrop><div class="wrapper">A</div></sat-popover>
        <sat-popover #b xAlign="after" hasBackdrop><div class="wrapper">B</div></sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class DemoAnchorReuseComponent implements AfterViewInit {
  @ViewChild('a') aPopover: SatPopoverComponent;
  @ViewChild('b') bPopover: SatPopoverComponent;

  activePopover = 'a';
  showAnchor = false;

  getActivePopover(): SatPopoverComponent {
    return this.activePopover === 'a' ? this.aPopover : this.bPopover;
  }

  ngAfterViewInit() {
    // Wait for SatPopover references before showing the button
    setTimeout(() => {
      this.showAnchor = true;
    });
  }
}
