import { Component } from '@angular/core';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <mat-toolbar color="primary">
      SAT Popover Demo
    </mat-toolbar>

    <div class="page-content">
      <demo-positioning></demo-positioning>
      <demo-action-api></demo-action-api>
      <demo-select-trigger></demo-select-trigger>
      <demo-focus></demo-focus>
      <demo-transitions></demo-transitions>
    </div>
  `
})
export class DemoComponent { }
