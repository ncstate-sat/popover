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
