import { Component } from '@angular/core';

@Component({
  selector: 'demo-disable-close',
  styleUrls: ['./disable-close.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Focus Behavior</mat-card-title>
      <mat-card-content>
        <p>You must select one of the options in the popover.</p>
        <button (click)="p.open()" [satPopoverAnchorFor]="p">Open</button>
      </mat-card-content>
    </mat-card>

    <sat-popover #p hasBackdrop interactiveClose="false">
      <div class="options">
        <p class="mat-body-1">Please select one of the following:</p>
        <button mat-button (click)="p.close(true)">Agree</button>
        <button mat-button (click)="p.close(false)">Disagree</button>
      </div>
    </sat-popover>
  `
})
export class DisableCloseDemo {

}
