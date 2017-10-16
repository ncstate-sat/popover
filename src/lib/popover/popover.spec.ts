import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { SatPopoverModule } from './popover.module';
import { SatPopover } from './popover.component';
import { getInvalidPopoverError } from './popover.errors';

describe('sample', () => {

  it('should work', () => {
    expect(true).toBe(true);
  });

  it('should return an Error', () => {
    const result = getInvalidPopoverError();
    expect(result instanceof Error).toBeTruthy();
  });

});

describe('TOH example', () => {

  let comp:    GenericTestComponent;
  let fixture: ComponentFixture<GenericTestComponent>;
  let de:      DebugElement;
  let el:      HTMLElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTestComponent]
    });

    fixture = TestBed.createComponent(GenericTestComponent);

    comp = fixture.componentInstance; // GenericTestComponent test instance

    // query for the title <h1> by CSS element selector
    de = fixture.debugElement.query(By.css('h1'));
    el = de.nativeElement;
  });

  it('should display original title', () => {
    fixture.detectChanges();
    expect(el.textContent).toContain(comp.title);
  });

  it('should display a different test title', () => {
    comp.title = 'Test Title';
    fixture.detectChanges();
    expect(el.textContent).toContain('Test Title');
  });

});


describe('Popover example', () => {
  let comp:    SimplePopoverTestComponent;
  let fixture: ComponentFixture<SimplePopoverTestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SatPopoverModule],
      declarations: [SimplePopoverTestComponent]
    });

    fixture = TestBed.createComponent(SimplePopoverTestComponent);
    comp = fixture.componentInstance; // SimplePopoverTestComponent test instance
  });

  it('should exist', () => {
    fixture.detectChanges();
    expect(comp.popover).toBeTruthy();
  });

});


@Component({
  template: `
    <h1>{{title}}</h1>
  `
})
class GenericTestComponent {
  title = 'Test Simple';
}

@Component({
  template: `
    <div [satPopoverAnchorFor]="p">Anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `
})
class SimplePopoverTestComponent {
  @ViewChild(SatPopover) popover: SatPopover;
}
