import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SatPopoverModule } from '../../../lib/public_api';

@Component({
  imports: [FormsModule, MatButtonModule, MatIconModule, SatPopoverModule],
  selector: 'demo-speed-dial',
  styleUrls: ['./speed-dial.component.scss'],
  template: `
    <!-- Fab -->
    <button
      mat-fab
      satPopoverAnchor
      #dialAnchor="satPopoverAnchor"
      color="primary"
      (click)="dialPopover.toggle()"
    >
      @if (dialPopover.isOpen()) {
        <mat-icon animate.enter="spin-enter" animate.leave="spin-leave">close</mat-icon>
      } @else {
        <mat-icon animate.enter="spin-enter" animate.leave="spin-leave">edit</mat-icon>
      }
    </button>

    <!-- Actions -->
    <sat-popover #dialPopover [anchor]="dialAnchor" verticalAlign="above">
      <div class="dial">
        @for (action of actions; track action.name) {
          <button
            mat-mini-fab
            satPopoverAnchor
            #tooltipAnchor="satPopoverAnchor"
            color="accent"
            (mouseenter)="tooltip.open()"
            (mouseleave)="tooltip.close()"
            (click)="dialPopover.close()"
          >
            <mat-icon>{{ action.icon }}</mat-icon>
          </button>

          <sat-popover #tooltip [anchor]="tooltipAnchor" horizontalAlign="before">
            <div class="tooltip mat-body-1">
              {{ action.name }}
            </div>
          </sat-popover>
        }
      </div>
    </sat-popover>
  `
})
export class DemoSpeedDialComponent {
  actions = [
    { name: 'Add attachment', icon: 'attachment' },
    { name: 'New folder', icon: 'folder' },
    { name: 'New shared folder', icon: 'folder_shared' }
  ];
}
