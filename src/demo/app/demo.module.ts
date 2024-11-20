import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { DemoActionAPIComponent } from './action-api/action-api.component';
import { DemoAnchorReuseComponent } from './anchor-reuse/anchor-reuse.component';
import { DemoFocusComponent } from './focus/focus.component';
import { DemoInteractiveCloseComponent } from './interactive-close/interactive-close.component';
import { DemoPositioningComponent } from './positioning/positioning.component';
import { DemoRootComponent } from './demo.component';
import { DemoScrollStrategiesComponent } from './scroll-strategies/scroll-strategies.component';
import { DemoSelectTriggerComponent } from './select-trigger/select-trigger.component';
import { DemoSpeedDialComponent } from './speed-dial/speed-dial.component';
import { DemoTooltipComponent } from './tooltip/tooltip.component';
import { DemoTransitionsComponent } from './transitions/transitions.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    DemoActionAPIComponent,
    DemoAnchorReuseComponent,
    DemoFocusComponent,
    DemoInteractiveCloseComponent,
    DemoPositioningComponent,
    DemoRootComponent,
    DemoScrollStrategiesComponent,
    DemoSelectTriggerComponent,
    DemoSpeedDialComponent,
    DemoTooltipComponent,
    DemoTransitionsComponent,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {}
