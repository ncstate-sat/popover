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
      <button mat-button
          title="Toggle all content"
          (click)="showContent = !showContent">
        {{ showContent ? 'Hide' : 'Show' }} content
      </button>
      <button mat-button
          title="Toggle between RTL and LTR"
          (click)="direction = (direction == 'rtl' ? 'ltr' : 'rtl')">
        {{ direction.toUpperCase() }}
      </button>
    </mat-toolbar>

    <div *ngIf="showContent" [dir]="direction" class="page-content">
      <demo-positioning></demo-positioning>
      <demo-action-api></demo-action-api>
      <demo-scroll-strategies></demo-scroll-strategies>
      <demo-select-trigger></demo-select-trigger>
      <demo-focus></demo-focus>
      <demo-transitions></demo-transitions>
      <demo-tooltip></demo-tooltip>
      <demo-interactive-close></demo-interactive-close>
      <demo-anchor-reuse></demo-anchor-reuse>
      <demo-event-delegation></demo-event-delegation>
      <demo-speed-dial></demo-speed-dial>
    </div>
  `
})
export class DemoComponent {
  direction = 'ltr';
  showContent = true;
}
