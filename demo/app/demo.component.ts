import { Component, ViewChild } from '@angular/core';
import { MatSelect, MatSelectChange } from '@angular/material';
import { SatPopoverAnchor } from '@sat/popover';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <mat-toolbar color="primary">
      SAT Popover Demo
    </mat-toolbar>

    <div class="page-content">

      <mat-card>
        <mat-card-title>Click the buttons</mat-card-title>
        <mat-card-content>
          <button mat-raised-button [satPopoverAnchorFor]="popover1">Woo! ↘</button>
          <button mat-raised-button [satPopoverAnchorFor]="popover2">Woo! ←</button>
          <button mat-raised-button [satPopoverAnchorFor]="popover3">Woo! ·</button>
        </mat-card-content>
      </mat-card>

      <mat-card>
        <mat-card-title>Select "Fancy"</mat-card-title>
        <mat-card-content>
          <mat-form-field>
            <mat-select
                #fancyAnchor="satPopoverAnchor"
                [satPopoverAnchorFor]="fancyPopover"
                satDisablePopoverToggle
                (change)="changeSelectValue($event)">
              <mat-option value="boring">Boring</mat-option>
              <mat-option value="standard">Standard</mat-option>
              <mat-option value="fancy">Fancy</mat-option>
            </mat-select>
          </mat-form-field>
        </mat-card-content>
      </mat-card>

    </div>

    <sat-popover #popover1
        xPosition="after"
        yPosition="below"
        [overlapAnchor]="false">
      <div style="background: lightgray; padding: 48px">
        Oh, cool
      </div>
    </sat-popover>

    <sat-popover #popover2
        xPosition="before"
        yPosition="center"
        [overlapAnchor]="false">
      <div style="background: lightgray; padding: 48px" class="mat-elevation-z12">
        Oh, neat
      </div>
    </sat-popover>

    <sat-popover #popover3
        xPosition="center"
        yPosition="center"
        [overlapAnchor]="false">
      <mat-toolbar color="accent" class="mat-elevation-z2">Oh, nifty</mat-toolbar>
    </sat-popover>

    <sat-popover #fancyPopover
        xPosition="center"
        yPosition="below">
      <div style="background: pink; padding: 32px; border-radius: 8px"
          class="mat-elevation-z4">
        Quite fancy indeed 🎩
      </div>
    </sat-popover>
  `
})
export class DemoComponent {

  @ViewChild('fancyAnchor') fancyAnchor: SatPopoverAnchor;

  changeSelectValue(event: MatSelectChange) {
    if (event.value === 'fancy') {
      this.fancyAnchor.openPopover();
    }
  }

}
