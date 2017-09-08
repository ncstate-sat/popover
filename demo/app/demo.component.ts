import { Component, ViewChild } from '@angular/core';
import { MdSelect, MdSelectChange } from '@angular/material';
import { SatAttachedOverlayTrigger } from '@sat/attached-overlay';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <md-toolbar color="primary">
      SAT Attached Overlay Demo
    </md-toolbar>

    <div class="page-content">

      <md-card>
        <md-card-title>Click the buttons</md-card-title>
        <md-card-content>
          <button md-raised-button [satAttachedOverlayTriggerFor]="overlay1">Woo! ↘</button>
          <button md-raised-button [satAttachedOverlayTriggerFor]="overlay2">Woo! ←</button>
          <button md-raised-button [satAttachedOverlayTriggerFor]="overlay3">Woo! ·</button>
        </md-card-content>
      </md-card>

      <md-card>
        <md-card-title>Select "Fancy"</md-card-title>
        <md-card-content>
          <md-select
            #fancyTrigger="satTrigger"
            [satAttachedOverlayTriggerFor]="overlayFancy"
            [satToggleOnClick]="false"
            (change)="changeSelectValue($event)">
            <md-option value="boring">Boring</md-option>
            <md-option value="standard">Standard</md-option>
            <md-option value="fancy">Fancy</md-option>
          </md-select>
        </md-card-content>
      </md-card>

    </div>

    <sat-attached-overlay #overlay1
      xPosition="after"
      yPosition="below"
      [overlapTrigger]="false">
      <div style="background: white; padding: 48px">
        Oh, cool
      </div>
    </sat-attached-overlay>

    <sat-attached-overlay #overlay2
      xPosition="before"
      yPosition="center"
      [overlapTrigger]="false">
      <div style="background: white; padding: 48px">
        Oh, neat
      </div>
    </sat-attached-overlay>

    <sat-attached-overlay #overlay3
      xPosition="center"
      yPosition="center"
      [overlapTrigger]="false">
      <md-toolbar color="accent">Oh, nifty</md-toolbar>
    </sat-attached-overlay>

    <sat-attached-overlay #overlayFancy
      xPosition="center"
      yPosition="below">
      <div style="background: pink; color: white; padding: 32px">Quite fancy indeed 🎩</div>
    </sat-attached-overlay>
  `
})
export class DemoComponent {

  @ViewChild('fancyTrigger') fancyTrigger: SatAttachedOverlayTrigger;

  changeSelectValue(event: MdSelectChange) {
    if (event.value === 'fancy') {
      this.fancyTrigger.openAttachedOverlay();
    }
  }

}
