import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SatPopoverModule } from '../../../lib/public_api';

@Component({
  imports: [FormsModule, MatCardModule, MatFormFieldModule, MatInputModule, SatPopoverModule],
  selector: 'demo-transitions',
  styleUrls: ['./transitions.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Custom Transitions</mat-card-title>
      <mat-card-content>
        <div class="controls">
          <mat-form-field>
            <input matInput type="text" [(ngModel)]="openTransition" />
          </mat-form-field>
          <mat-form-field>
            <input matInput type="text" [(ngModel)]="closeTransition" />
          </mat-form-field>
          <mat-form-field>
            <input matInput type="number" [(ngModel)]="startAtScale" />
            <mat-hint>Initial scale value for open animation.</mat-hint>
          </mat-form-field>
          <mat-form-field>
            <input matInput type="number" [(ngModel)]="endAtScale" />
            <mat-hint>End scale value for close animation.</mat-hint>
          </mat-form-field>
        </div>

        <div class="indicators">
          @for (indicator of callbackIndicators; track indicator.name) {
            <div class="indicator" [class.active]="indicator.active">
              {{ indicator.name }}
            </div>
          }
        </div>

        <div
          satPopoverAnchor
          #popoverAnchor="satPopoverAnchor"
          class="anchor"
          tabindex="0"
          (click)="p.toggle()"
          (keydown.enter)="p.toggle()"
        ></div>

        <sat-popover
          #p
          xAlign="after"
          yAlign="below"
          [anchor]="popoverAnchor"
          [openTransition]="openTransition"
          [closeTransition]="closeTransition"
          [openAnimationStartAtScale]="startAtScale"
          [closeAnimationEndAtScale]="endAtScale"
          (opened)="showCallback('opened')"
          (closed)="showCallback('closed')"
          (afterOpen)="showCallback('afterOpen')"
          (afterClose)="showCallback('afterClose')"
        >
          <div class="popover mat-subtitle">Hello!</div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class DemoTransitionsComponent {
  openTransition = '2000ms ease';
  closeTransition = '2000ms ease';
  startAtScale = 0.3;
  endAtScale = 0.5;

  callbackIndicators = [
    { name: 'opened', active: false },
    { name: 'closed', active: false },
    { name: 'afterOpen', active: false },
    { name: 'afterClose', active: false }
  ];

  showCallback(name) {
    const callback = this.callbackIndicators.find((i) => i.name === name);

    // Flash the callback indicator
    callback.active = true;
    setTimeout(() => (callback.active = false), 100);
  }
}
