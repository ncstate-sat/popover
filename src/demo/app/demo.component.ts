import { Component } from '@angular/core';

@Component({
  selector: 'sat-demo',
  styleUrls: ['./demo.component.scss'],
  host: { 'class': 'mat-app-background' },
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z2">
      <a class="repo-link mat-title" href="https://github.com/ncstate-sat/popover">
        @ncstate/sat-popover
      </a>
    </mat-toolbar>

    <div class="page-content">
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
export class DemoComponent { }
