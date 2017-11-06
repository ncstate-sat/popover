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

        <div class="indicators">
          <div class="indicator"
              *ngFor="let indicator of callbackIndicators"
              [class.active]="indicator.active">
            {{ indicator.name }}
          </div>
        </div>

        <div class="anchor" [satPopoverAnchorFor]="p" (click)="p.toggle()"></div>
        <sat-popover #p xAlign="after" yAlign="below"
            [openTransition]="openTransition"
            [closeTransition]="closeTransition"
            (opened)="showCallback('opened')"
            (closed)="showCallback('closed')"
            (afterOpen)="showCallback('afterOpen')"
            (afterClose)="showCallback('afterClose')">
          <div class="popover mat-subtitle">Hello!</div>
        </sat-popover>
      </mat-card-content>
    </mat-card>
  `
})
export class TransitionsDemo {
  openTransition = '2000ms ease';
  closeTransition = '2000ms ease';

  callbackIndicators = [
    { name: 'opened', active: false },
    { name: 'closed', active: false },
    { name: 'afterOpen', active: false },
    { name: 'afterClose', active: false },
  ];

  showCallback(name) {
    const callback = this.callbackIndicators.find(i => i.name === name);

    // Flash the callback indicator
    callback.active = true;
    setTimeout(() => callback.active = false, 100);
  }
}
