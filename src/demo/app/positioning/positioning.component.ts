import { Component } from '@angular/core';

@Component({
  selector: 'demo-positioning',
  styleUrls: ['./positioning.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Positioning</mat-card-title>
      <mat-card-content>

        <div class="config">
          <mat-form-field>
            <mat-select [(ngModel)]="xPos" placeholder="xPosition">
              <mat-option value="before">Before</mat-option>
              <mat-option value="center">Center</mat-option>
              <mat-option value="after">After</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-select [(ngModel)]="yPos" placeholder="yPosition">
              <mat-option value="above">Above</mat-option>
              <mat-option value="center">Center</mat-option>
              <mat-option value="below">Below</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-checkbox [(ngModel)]="overlap">Overlap Trigger</mat-checkbox>
        </div>

        <button mat-raised-button [satPopoverAnchorFor]="p" (click)="p.toggle()">
          CLICK TO TOGGLE
        </button>

      </mat-card-content>

      <sat-popover #p
          [xPosition]="xPos"
          [yPosition]="yPos"
          hasBackdrop
          [overlapAnchor]="overlap">
        <div class="popover">
          Nifty
        </div>
      </sat-popover>


    </mat-card>
  `
})
export class PositioningDemo {

  xPos = 'after';
  yPos = 'center';
  overlap = false;

}
