import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatPopoverModule } from '@sat/popover';
import {
  MatToolbarModule,
  MatCardModule,
  MatButtonModule,
  MatSelectModule,
  MatIconModule,
} from '@angular/material';

import { DemoComponent } from './demo.component';

@NgModule({
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
  ]
})
export class DemoMaterialModule { }

@NgModule({
  declarations: [
    DemoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    SatPopoverModule,
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }


