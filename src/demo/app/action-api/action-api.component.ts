import { Component } from '@angular/core';

@Component({
  selector: 'demo-action-api',
  styleUrls: ['./action-api.component.scss'],
  template: `
    <mat-card>
      <mat-card-title>Action API</mat-card-title>
      <mat-card-content>
        <div class="avatar" #a="satPopoverAnchor" [satPopoverAnchorFor]="p">W</div>
        <sat-popover #p xPosition="after">
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
        <button (click)="a.openPopover()">anchor#openPopover()</button>
        <button (click)="a.closePopover()">anchor#closePopover()</button>
        <button (click)="a.togglePopover()">anchor#togglePopover()</button>
      </mat-card-actions>
    </mat-card>
  `
})
export class ActionAPIDemo { }
