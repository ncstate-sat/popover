import { Component } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
} from '@angular/animations';

@Component({
  selector: 'demo-speed-dial',
  styleUrls: ['./speed-dial.component.scss'],
  animations: [
    trigger('spinInOut', [
      state('in', style({transform: 'rotate(0)', opacity: '1'})),
      transition(':enter', [
        style({transform: 'rotate(-180deg)', opacity: '0'}),
        animate('150ms ease')
      ]),
      transition(':leave', [
        animate('150ms ease', style({transform: 'rotate(180deg)', opacity: '0'}))
      ]),
    ]),
    trigger('preventInitialAnimation', [
      transition(':enter', [
        query(':enter', [], {optional: true})
      ]),
    ]),
  ],
  template: `
    <!-- Fab -->
    <button mat-fab
        color="primary"
        [@preventInitialAnimation]
        [satPopoverAnchorFor]="dial"
        (click)="dial.toggle()">
      <mat-icon [@spinInOut]="'in'" *ngIf="dial.isOpen()">close</mat-icon>
      <mat-icon [@spinInOut]="'in'" *ngIf="!dial.isOpen()">edit</mat-icon>
    </button>

    <!-- Actions -->
    <sat-popover #dial verticalAlign="above">
      <div class="dial">
        <ng-container *ngFor="let a of actions">
          <button mat-mini-fab
              color="accent"
              [satPopoverAnchorFor]="tooltip"
              (mouseenter)="tooltip.open()"
              (mouseleave)="tooltip.close()"
              (click)="dial.close()">
            <mat-icon>{{a.icon}}</mat-icon>
          </button>

          <sat-popover #tooltip horizontalAlign="before">
            <div class="tooltip mat-body-1">
              {{a.name}}
            </div>
          </sat-popover>
        </ng-container>
      </div>
    </sat-popover>
  `
})
export class SpeedDialDemo {

  actions = [
    { name: 'Add attachment', icon: 'attachment' },
    { name: 'New folder', icon: 'folder' },
    { name: 'New shared folder', icon: 'folder_shared' },
  ];

}
