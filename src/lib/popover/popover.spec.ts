import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SatPopoverModule } from './popover.module';
import { SatPopover } from './popover.component';


describe('Popover example', () => {
  let fixture: ComponentFixture<SimplePopoverTestComponent>;
  let comp:    SimplePopoverTestComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatPopoverModule],
      declarations: [SimplePopoverTestComponent]
    });

    fixture = TestBed.createComponent(SimplePopoverTestComponent);
    comp = fixture.componentInstance;
  });

  it('should exist', () => {
    fixture.detectChanges();
    expect(comp.popover).toBeTruthy();
  });

});


@Component({
  template: `
    <div [satPopoverAnchorFor]="p">Anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `
})
class SimplePopoverTestComponent {
  @ViewChild(SatPopover) popover: SatPopover;
}
