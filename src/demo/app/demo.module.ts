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

import { DemoComponent } from './demo.component';
import { PositioningDemo } from './positioning/positioning.component';
import { ActionAPIDemo } from './action-api/action-api.component';
import { ScrollStrategiesDemo } from './scroll-strategies/scroll-strategies.component';
import { SelectTriggerDemo } from './select-trigger/select-trigger.component';
import { FocusDemo } from './focus/focus.component';
import { TransitionsDemo } from './transitions/transitions.component';
import { TooltipDemo } from './tooltip/tooltip.component';
import { SpeedDialDemo } from './speed-dial/speed-dial.component';
import { InteractiveCloseDemo } from './interactive-close/interactive-close.component';
import { AnchorReuseComponent } from './anchor-reuse/anchor-reuse.component';

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
    DemoComponent,
    PositioningDemo,
    ActionAPIDemo,
    ScrollStrategiesDemo,
    SelectTriggerDemo,
    FocusDemo,
    TransitionsDemo,
    TooltipDemo,
    SpeedDialDemo,
    InteractiveCloseDemo,
    AnchorReuseComponent
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
  bootstrap: [DemoComponent]
})
export class DemoModule {}
