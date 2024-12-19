import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SatPopoverModule } from '../../../lib/public_api';

@Component({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    SatPopoverModule
  ],
  selector: 'demo-positioning',
  styleUrls: ['./positioning.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Positioning</mat-card-title>
      <mat-card-content>
        <div class="config">
          <mat-form-field>
            <mat-select [(ngModel)]="horizontalAlign" placeholder="horizontalAlign">
              <mat-option value="before">Before</mat-option>
              <mat-option value="start">Start</mat-option>
              <mat-option value="center">Center</mat-option>
              <mat-option value="end">End</mat-option>
              <mat-option value="after">After</mat-option>
              <mat-option value="octopus">Octopus</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <mat-select [(ngModel)]="verticalAlign" placeholder="verticalAlign">
              <mat-option value="above">Above</mat-option>
              <mat-option value="start">Start</mat-option>
              <mat-option value="center">Center</mat-option>
              <mat-option value="end">End</mat-option>
              <mat-option value="below">Below</mat-option>
              <mat-option value="aardvark">Aardvark</mat-option>
            </mat-select>
          </mat-form-field>

          <mat-form-field>
            <input matInput type="number" [(ngModel)]="margin" placeholder="anchor's margin-left (px)" />
          </mat-form-field>

          <mat-checkbox [(ngModel)]="forceAlignment"> forceAlignment </mat-checkbox>

          <mat-checkbox [(ngModel)]="lockAlignment"> lockAlignment </mat-checkbox>
        </div>

        <button
          mat-raised-button
          satPopoverAnchor
          #anchor="satPopoverAnchor"
          color="accent"
          [style.marginLeft]="margin + 'px'"
          (click)="p.toggle()"
        >
          CLICK TO TOGGLE
        </button>
      </mat-card-content>

      <sat-popover
        #p
        [anchor]="anchor"
        hasBackdrop
        [horizontalAlign]="horizontalAlign"
        [verticalAlign]="verticalAlign"
        [forceAlignment]="forceAlignment"
        [lockAlignment]="lockAlignment"
      >
        <div class="popover mat-body-2"> Nifty </div>
      </sat-popover>
    </mat-card>
  `
})
export class DemoPositioningComponent {
  horizontalAlign = 'after';
  verticalAlign = 'center';
  margin = 0;
  forceAlignment = false;
  lockAlignment = false;
}
