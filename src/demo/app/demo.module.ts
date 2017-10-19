import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
} from '@angular/material';

import { DemoComponent } from './demo.component';
import { PositioningDemo } from './positioning/positioning.component';
import { ActionAPIDemo } from './action-api/action-api.component';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
  ]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    DemoComponent,
    PositioningDemo,
    ActionAPIDemo,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SatPopoverModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }


