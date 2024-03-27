import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@ncstate/sat-popover';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BidiModule } from '@angular/cdk/bidi';

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

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    BidiModule
  ]
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
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
    DemoTransitionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SatPopoverModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [DemoRootComponent]
})
export class DemoModule {}
