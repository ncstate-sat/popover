import { Component } from '@angular/core';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <mat-toolbar color="primary">
      SAT Popover Demo

      <button mat-button class="dir-select"
          (click)="toggleDirection()"
          title="Toggle between RTL and LTR">
        {{ direction.toUpperCase() }}
      </button>
    </mat-toolbar>


    <div class="page-content" [dir]="direction">
      <demo-positioning></demo-positioning>
      <demo-action-api></demo-action-api>
      <demo-scroll-strategies></demo-scroll-strategies>
      <demo-select-trigger></demo-select-trigger>
      <demo-focus></demo-focus>
      <demo-transitions></demo-transitions>
      <demo-tooltip></demo-tooltip>
    </div>
  `
})
export class DemoComponent {
  direction = 'rtl';

  toggleDirection() {
    this.direction = (this.direction === 'rtl' ? 'ltr' : 'rtl');
  }

}
