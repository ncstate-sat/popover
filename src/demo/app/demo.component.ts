import { Component, HostBinding } from '@angular/core';
import { DemoActionAPIComponent } from './action-api/action-api.component';
import { DemoAnchorReuseComponent } from './anchor-reuse/anchor-reuse.component';
import { DemoFocusComponent } from './focus/focus.component';
import { DemoInteractiveCloseComponent } from './interactive-close/interactive-close.component';
import { DemoPositioningComponent } from './positioning/positioning.component';
import { DemoScrollStrategiesComponent } from './scroll-strategies/scroll-strategies.component';
import { DemoSelectTriggerComponent } from './select-trigger/select-trigger.component';
import { DemoSpeedDialComponent } from './speed-dial/speed-dial.component';
import { DemoTooltipComponent } from './tooltip/tooltip.component';
import { DemoTransitionsComponent } from './transitions/transitions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { environment } from '../environments/environment';

@Component({
  imports: [
    DemoActionAPIComponent,
    DemoAnchorReuseComponent,
    DemoFocusComponent,
    DemoInteractiveCloseComponent,
    DemoPositioningComponent,
    DemoScrollStrategiesComponent,
    DemoSelectTriggerComponent,
    DemoSpeedDialComponent,
    DemoTooltipComponent,
    DemoTransitionsComponent,
    MatButtonModule,
    MatToolbarModule
  ],
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
      <button mat-button title="Toggle between RTL and LTR" (click)="direction = direction === 'rtl' ? 'ltr' : 'rtl'">
        {{ direction.toUpperCase() }}
      </button>
    </mat-toolbar>

    @if (showContent) {
      <div [dir]="direction" class="page-content">
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
    }
  `
})
export class DemoRootComponent {
  direction = 'ltr';
  showContent = true;
  version = environment.version;
  @HostBinding('class.mat-app-background') background = true;
}
