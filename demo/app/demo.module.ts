import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SatAttachedOverlayModule } from '@sat/attached-overlay';
import {
  MdToolbarModule,
  MdCardModule,
  MdButtonModule,
  MdSelectModule,
} from '@angular/material';

import { DemoComponent } from './demo.component';

@NgModule({
  exports: [
    MdToolbarModule,
    MdCardModule,
    MdButtonModule,
    MdSelectModule,
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
    SatAttachedOverlayModule,
  ],
  providers: [],
  bootstrap: [DemoComponent]
})
export class DemoModule { }


