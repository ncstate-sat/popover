import { Component } from '@angular/core';

@Component({
  selector: 'demo-transitions',
  styleUrls: ['./transitions.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Custom Transitions</mat-card-title>
      <mat-card-content>
        <div class="controls">
          <mat-form-field>
            <input matInput type="text" [(ngModel)]="openTransition">
          </mat-form-field>
          <mat-form-field>
            <input matInput type="text" [(ngModel)]="closeTransition">
          </mat-form-field>
        </div>
        <div class="anchor" [satPopoverAnchorFor]="p" (click)="p.toggle()"></div>
        <sat-popover #p xAlign="after" yAlign="below"
            [openTransition]="openTransition"
            [closeTransition]="closeTransition">
          <div class="popover mat-subtitle">Hello!</div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class TransitionsDemo {
  openTransition = '200ms ease';
  closeTransition = '200ms ease';
}
