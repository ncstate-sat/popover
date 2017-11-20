import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { SatPopoverFactory, SatPopoverRef } from '@ncstate/sat-popover';

@Component({
  selector: 'demo-factory-anchoring',
  styleUrls: ['./factory-anchoring.component.scss'],
  template: `
    <mat-card>
      <button>Open it</button>

      <br><br>

      <button #anchor>This is the anchor</button>
    </mat-card>
  `
})
export class FactoryAnchoringDemo implements AfterViewInit {

  @ViewChild('anchor') anchorEl: ElementRef;

  popoverRef: SatPopoverRef<FactoryDemoContent>;

  constructor(private popoverFactory: SatPopoverFactory) { }

  ngAfterViewInit() {
    this.popoverRef = this.popoverFactory.build(FactoryDemoContent, this.anchorEl, {});
  }

  toggle() {
    this.popoverRef.toggle();
  }

}

@Component({
  selector: 'factory-example-content',
  styles: [`
    :host {
      background: black;
      color: white;
      padding: 8px;
    }
  `],
  template: `
    Component instance
  `
})
export class FactoryDemoContent {

}
