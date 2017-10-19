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
      <demo-action-api></demo-action-api>
      <demo-select-trigger></demo-select-trigger>

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


}
