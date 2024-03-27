import { Component, HostBinding } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'demo-root',
  styleUrls: ['./demo.component.scss'],
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z2">
      <a class="repo-link mat-title" href="https://github.com/ncstate-sat/popover">
        &#64;ncstate/sat-popover <span class="version mat-body-2">{{ version }}</span>
      </a>
      <button mat-button title="Toggle all content" (click)="showContent = !showContent">
        {{ showContent ? 'Hide' : 'Show' }} content
      </button>
      <button mat-button title="Toggle between RTL and LTR" (click)="direction = direction == 'rtl' ? 'ltr' : 'rtl'">
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
      <demo-speed-dial></demo-speed-dial>
    </div>
  `
})
export class DemoRootComponent {
  direction = 'ltr';
  showContent = true;
  version = environment.version;
  @HostBinding('class.mat-app-background') background = true;
}
