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
import { SelectTriggerDemo } from './select-trigger/select-trigger.component';
import { FocusDemo } from './focus/focus.component';

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
    SelectTriggerDemo,
    FocusDemo,
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


