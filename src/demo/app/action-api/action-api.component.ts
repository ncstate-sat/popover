import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { SatPopoverModule } from '../../../lib/public_api';

@Component({
  imports: [MatCardModule, SatPopoverModule],
  selector: 'demo-action-api',
  styleUrls: ['./action-api.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Action API</mat-card-title>
      <mat-card-content>
        <div satPopoverAnchor #anchor="satPopoverAnchor" class="avatar">W</div>
        <sat-popover #p [anchor]="anchor" horizontalAlign="after" forceAlignment>
          <div class="info mat-caption">
            <div class="caret"></div>
            <div>Messages: 12</div>
            <div>Friends since: 12/21/2012</div>
          </div>
        </sat-popover>
      </mat-card-content>
      <mat-card-actions>
        <button (click)="p.open()">popover#open()</button>
        <button (click)="p.close()">popover#close()</button>
        <button (click)="p.toggle()">popover#toggle()</button>
        <button (click)="anchor.popover.open()">anchor#popover.open()</button>
        <button (click)="anchor.popover.close()">anchor#popover.close()</button>
        <button (click)="anchor.popover.toggle()">anchor#popover.toggle()</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class DemoActionAPIComponent {}
