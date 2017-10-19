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

      <demo-positioning></demo-positioning>

      <!-- SELECT OPTION -->
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

        <sat-popover #fancyPopover
            xPosition="center"
            yPosition="below"
            hasBackdrop
            backdropClass="demo-background-rainbow">
          <div style="background: pink; padding: 32px; border-radius: 8px"
              class="mat-elevation-z4">
            Quite fancy indeed 🎩
          </div>
        </sat-popover>
      </mat-card>

      <!-- PROGRAMMATIC OPEN/CLOSE -->
      <mat-card>
        <mat-card-title>Open Programmatically</mat-card-title>
        <mat-card-content>
          <div style="margin: 48px; height: 16px; width: 16px; background: black"
              [satPopoverAnchorFor]="bluePopover">
          </div>
        </mat-card-content>
        <sat-popover #bluePopover>
          <div style="background: lightblue; padding: 16px">BLUE!</div>
        </sat-popover>
        <mat-card-actions>
          <button mat-button (click)="bluePopover.open()">Open</button>
          <button mat-button (click)="bluePopover.close()">Close</button>
          <button mat-button (click)="bluePopover.toggle()">Toggle</button>
        </mat-card-actions>
      </mat-card>

      <!-- FOCUS -->
      <mat-card>
        <mat-card-title>Focus Behavior</mat-card-title>
        <mat-card-content>
          <button mat-mini-fab [satPopoverAnchorFor]="editPopover" (click)="editPopover.open()">
            <mat-icon>create</mat-icon>
          </button>
        </mat-card-content>
        <sat-popover #editPopover hasBackdrop>
          <div style="background: white; padding: 16px; border: solid 1px black">
            <input type="text" placeholder="Input 1"> <br>
            <input type="text" placeholder="Input 2">
          </div>
        </sat-popover>
      </mat-card>

      <!-- CUSTOM TRANSITION -->
      <mat-card>
        <mat-card-title>Custom Transition</mat-card-title>
        <mat-card-content>
          <div style="margin: 48px; height: 16px; width: 16px; background: black"
              [satPopoverAnchorFor]="green">
          </div>
        </mat-card-content>
        <sat-popover #green
            hasBackdrop
            xPosition="after"
            openTransition="1000ms linear"
            closeTransition="2000ms linear">
          <div style="background: lightgreen; padding: 16px">GREEN!</div>
        </sat-popover>
        <mat-card-actions>
          <button mat-button (click)="green.toggle()">Toggle</button>
        </mat-card-actions>
      </mat-card>

    </div>
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
