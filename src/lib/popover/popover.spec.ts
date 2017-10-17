import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';

import { SatPopoverModule } from './popover.module';
import { SatPopover } from './popover.component';
import { SatPopoverAnchor } from './popover-anchor.directive';
import { getInvalidPopoverError } from './popover.errors';


describe('SatPopover', () => {

  describe('passing to anchor', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule],
        declarations: [
          InvalidPopoverTestComponent,
          SimplePopoverTestComponent
        ]
      });

    });

    it('should throw an error if an invalid object is provided', () => {
      fixture = TestBed.createComponent(InvalidPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidPopoverError());
    });

    it('should not throw an error if a valid popover is provided', () => {
      fixture = TestBed.createComponent(SimplePopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();
    });

  });

  describe('opening and closing behavior', () => {
    let fixture: ComponentFixture<SimplePopoverTestComponent>;
    let comp:    SimplePopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SatPopoverModule,
          NoopAnimationsModule,
        ],
        declarations: [SimplePopoverTestComponent],
        providers: [
          {provide: OverlayContainer, useFactory: overlayContainerFactory}
        ]
      });

      fixture = TestBed.createComponent(SimplePopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
        .getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should open with open()', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      comp.popover.open();
      expect(overlayContainerElement.textContent).toContain('Popover');
    });

    it('should open with openPopover()', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');
      comp.anchor.openPopover();
      expect(overlayContainerElement.textContent).toContain('Popover');
    });

    it('should close with close()', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();
      expect(overlayContainerElement.textContent).toContain('Popover');

      comp.popover.close();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should close with closePopover()', fakeAsync(() => {
      fixture.detectChanges();
      comp.anchor.openPopover();
      expect(overlayContainerElement.textContent).toContain('Popover');

      comp.anchor.closePopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should toggle with toggle()', fakeAsync(() => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');

      comp.popover.toggle();
      expect(overlayContainerElement.textContent).toContain('Popover');

      comp.popover.toggle();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should toggle with togglePopover()', fakeAsync(() => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('');

      comp.anchor.togglePopover();
      expect(overlayContainerElement.textContent).toContain('Popover');

      comp.anchor.togglePopover();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should emit when opened', () => {
      fixture.detectChanges();
      let popoverOpenedEvent = false;
      let anchorOpenedEvent = false;

      comp.popover.opened.subscribe(() => popoverOpenedEvent = true);
      comp.anchor.popoverOpened.subscribe(() => anchorOpenedEvent = true);

      comp.popover.open();

      expect(popoverOpenedEvent).toBe(true);
      expect(anchorOpenedEvent).toBe(true);
    });

    it('should emit when closed', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      let popoverClosedEvent = false;
      let anchorClosedEvent = false;

      comp.popover.closed.subscribe(() => popoverClosedEvent = true);
      comp.anchor.popoverClosed.subscribe(() => anchorClosedEvent = true);

      comp.popover.close();
      fixture.detectChanges();
      tick();

      expect(popoverClosedEvent).toBe(true);
      expect(anchorClosedEvent).toBe(true);
    }));

    it('should emit a value when closed with a value', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      const firstTestVal = 'abc123';
      const secondTestVal = 'xyz789';

      let popoverClosedValue;
      let anchorClosedValue;

      comp.popover.closed.subscribe(val => popoverClosedValue = val);
      comp.anchor.popoverClosed.subscribe(val => anchorClosedValue = val);

      comp.anchor.closePopover(firstTestVal);
      fixture.detectChanges();
      tick();

      // Working when closed via anchor api
      expect(popoverClosedValue).toBe(firstTestVal);
      expect(anchorClosedValue).toBe(firstTestVal);

      comp.popover.open();
      fixture.detectChanges();

      comp.popover.close(secondTestVal);
      fixture.detectChanges();
      tick();

      // Working when closed via popover api (does not yet work)
      expect(popoverClosedValue).toBe(secondTestVal);
      expect(anchorClosedValue).toBe(secondTestVal);
    }));

    it('should return whether the popover is presently open', fakeAsync(() => {
      fixture.detectChanges();

      expect(comp.anchor.isPopoverOpen()).toBe(false);
      expect(comp.popover.isOpen()).toBe(false);

      comp.popover.open();

      expect(comp.anchor.isPopoverOpen()).toBe(true);
      expect(comp.popover.isOpen()).toBe(true);

      comp.popover.close();
      fixture.detectChanges();
      tick();

      expect(comp.anchor.isPopoverOpen()).toBe(false);
      expect(comp.popover.isOpen()).toBe(false);
    }));

  });

  describe('backdrop', () => {
    let fixture: ComponentFixture<BackdropPopoverTestComponent>;
    let comp:    BackdropPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          SatPopoverModule,
          NoopAnimationsModule,
        ],
        declarations: [BackdropPopoverTestComponent],
        providers: [
          {provide: OverlayContainer, useFactory: overlayContainerFactory}
        ]
      });

      fixture = TestBed.createComponent(BackdropPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer)
        .getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should have no backdrop by default', () => {
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).toBeFalsy();
    });

    it('should allow adding a transparent backdrop', () => {
      comp.backdrop = true;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should close when backdrop is clicked', fakeAsync(() => {
      comp.backdrop = true;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      backdrop.click();
      fixture.detectChanges();
      tick(500);

      expect(overlayContainerElement.textContent).toBe('');
    }));

    it('should allow a custom backdrop to be added', () => {
      comp.backdrop = true;
      comp.klass = 'test-custom-class';
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(backdrop.classList.contains('test-custom-class')).toBe(true);
    });

  });

});

/**
 * This component is for testing that passing an invalid popover
 * to an anchor will throw an error.
 */
@Component({
  template: `
    <div [satPopoverAnchorFor]="invalid">Anchor</div>
    <div #invalid>Dummy</div>
  `
})
class InvalidPopoverTestComponent { }


/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
  template: `
    <div [satPopoverAnchorFor]="p">Anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `
})
class SimplePopoverTestComponent {
  @ViewChild(SatPopoverAnchor) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover) popover: SatPopover;
}

/**
 * This component is for testing the backdrop behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
  template: `
    <div [satPopoverAnchorFor]="p">Anchor</div>
    <sat-popover #p [hasBackdrop]="backdrop" [backdropClass]="klass">
      Popover
    </sat-popover>
  `
})
class BackdropPopoverTestComponent {
  @ViewChild(SatPopover) popover: SatPopover;
  backdrop = false;
  klass: string;
}


/**
 * This factory function provides an overlay container under test
 * control.
 */
const overlayContainerFactory = () => {
  const element = document.createElement('div');
  element.classList.add('cdk-overlay-container');
  document.body.appendChild(element);

  // remove body padding to keep consistent cross-browser
  document.body.style.padding = '0';
  document.body.style.margin = '0';

  return { getContainerElement: () => element };
};
