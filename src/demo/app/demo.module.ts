import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@sat/popover';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatNativeDateModule,
} from '@angular/material';

import { DemoComponent } from './demo.component';
import { PositioningDemo } from './positioning/positioning.component';
import { ActionAPIDemo } from './action-api/action-api.component';
import { ScrollStrategiesDemo } from './scroll-strategies/scroll-strategies.component';
import { SelectTriggerDemo } from './select-trigger/select-trigger.component';
import { FocusDemo } from './focus/focus.component';
import { TransitionsDemo } from './transitions/transitions.component';
import { TooltipDemo } from './tooltip/tooltip.component';

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
  ]
})
export class DemoMaterialModule { }

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
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SatPopoverModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }


