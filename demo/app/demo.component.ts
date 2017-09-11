import { Component, ViewChild } from '@angular/core';
import { MdSelect, MdSelectChange } from '@angular/material';
import { SatPopoverAnchor } from '@sat/popover';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <md-toolbar color="primary">
      SAT Popover Demo
    </md-toolbar>

    <div class="page-content">

      <md-card>
        <md-card-title>Click the buttons</md-card-title>
        <md-card-content>
          <button md-raised-button [satPopoverAnchorFor]="popover1">Woo! ↘</button>
          <button md-raised-button [satPopoverAnchorFor]="popover2">Woo! ←</button>
          <button md-raised-button [satPopoverAnchorFor]="popover3">Woo! ·</button>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-title>Select "Fancy"</md-card-title>
        <md-card-content>
          <md-select
              #fancyAnchor="satPopoverAnchor"
              [satPopoverAnchorFor]="fancyPopover"
              satDisablePopoverToggle
              (change)="changeSelectValue($event)">
            <md-option value="boring">Boring</md-option>
            <md-option value="standard">Standard</md-option>
            <md-option value="fancy">Fancy</md-option>
          </md-select>
        </md-card-content>
      </md-card>

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
      <md-toolbar color="accent" class="mat-elevation-z2">Oh, nifty</md-toolbar>
    </sat-popover>

    <sat-popover #fancyPopover
        xPosition="center"
        yPosition="below">
      <div style="background: pink; padding: 32px; border-radius: 8px">Quite fancy indeed 🎩</div>
    </sat-popover>
  `
})
export class DemoComponent {

  @ViewChild('fancyAnchor') fancyAnchor: SatPopoverAnchor;

  changeSelectValue(event: MdSelectChange) {
    if (event.value === 'fancy') {
      this.fancyAnchor.openPopover();
    }
  }

}
