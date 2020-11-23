import { ElementRef, Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  BlockScrollStrategy,
  FlexibleConnectedPositionStrategy,
  OverlayConfig,
  OverlayContainer,
  RepositionScrollStrategy,
  ScrollStrategy
} from '@angular/cdk/overlay';
import { ESCAPE, A } from '@angular/cdk/keycodes';

import { SatPopoverModule } from './popover.module';
import { SatPopover, SatPopoverAnchor } from './popover.component';
import { SatPopoverAnchoringService } from './popover-anchoring.service';
import {
  getUnanchoredPopoverError,
  getInvalidHorizontalAlignError,
  getInvalidVerticalAlignError,
  getInvalidScrollStrategyError,
  getInvalidPopoverAnchorError,
  getInvalidSatPopoverAnchorError
} from './popover.errors';
import { DEFAULT_TRANSITION } from './tokens';

describe('SatPopover', () => {
  describe('passing an anchor', () => {
    let fixture: ComponentFixture<any>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule],
        declarations: [
          InvalidPopoverTestComponent,
          SimpleDirectiveAnchorPopoverTestComponent,
          SimpleHTMLAnchorPopoverTestComponent,
          AnchorlessPopoverTestComponent,
          InvalidAnchorTestComponent
        ]
      });
    });

    it('should throw an error if an invalid object is provided', () => {
      fixture = TestBed.createComponent(InvalidPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidPopoverAnchorError());
    });

    it('should not throw an error if a valid "setPopoverAnchor" anchor is provided', () => {
      fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();
    });

    it('should not throw an error if a valid ElementRef anchor is provided', () => {
      fixture = TestBed.createComponent(SimpleHTMLAnchorPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();
    });

    it('should update the anchor if a valid new anchor is provided', () => {
      fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);

      fixture.detectChanges();

      const comp = fixture.componentInstance as SimpleDirectiveAnchorPopoverTestComponent;

      expect(comp.popover.anchor).toBe(comp.anchor);
      expect((comp.popover._anchoringService as any)._anchor).toBe(comp.anchor.elementRef.nativeElement);

      expect(() => {
        comp.popover.anchor = comp.alternateAnchorElement;
      }).not.toThrowError();

      expect(comp.popover.anchor).toBe(comp.alternateAnchorElement);
      expect((comp.popover._anchoringService as any)._anchor).toBe(comp.alternateAnchorElement.nativeElement);
    });

    it('should throw an error if open is called on a popover with no anchor', () => {
      fixture = TestBed.createComponent(AnchorlessPopoverTestComponent);

      // should not throw when just initializing
      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();

      // should throw if it is opening
      expect(() => {
        fixture.componentInstance.popover.open();
      }).toThrow(getUnanchoredPopoverError());
    });

    it('should throw an error if an anchor is not associated with a popover', () => {
      fixture = TestBed.createComponent(InvalidAnchorTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidSatPopoverAnchorError());
    });
  });

  describe('opening and closing behavior', () => {
    let fixture: ComponentFixture<SimpleDirectiveAnchorPopoverTestComponent>;
    let comp: SimpleDirectiveAnchorPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [SimpleDirectiveAnchorPopoverTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should open with open()', () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
      comp.popover.open();
      expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
    });

    it('should close with close()', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();
      expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

      comp.popover.close();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('', 'Subsequently closed');
    }));

    it('should toggle with toggle()', fakeAsync(() => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('', 'Initially closed');

      comp.popover.toggle();
      expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');

      comp.popover.toggle();
      fixture.detectChanges();
      tick();
      expect(overlayContainerElement.textContent).toBe('', 'Closed after second toggle');
    }));

    it('should emit when opened', fakeAsync(() => {
      fixture.detectChanges();
      let popoverOpenedEvent = false;
      let popoverAfterOpenEvent = false;

      comp.popover.opened.subscribe(() => (popoverOpenedEvent = true));
      comp.popover.afterOpen.subscribe(() => (popoverAfterOpenEvent = true));

      comp.popover.open();

      expect(popoverOpenedEvent).toBe(true, 'popoverOpened called');
      expect(popoverAfterOpenEvent).toBe(false, 'popoverAfterOpen not yet called');

      tick();
      expect(popoverAfterOpenEvent).toBe(true, 'popoverAfterOpen called after animation');
    }));

    it('should emit when closed', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      let popoverClosedEvent = false;
      let popoverAfterCloseEvent = false;

      comp.popover.closed.subscribe(() => (popoverClosedEvent = true));
      comp.popover.afterClose.subscribe(() => (popoverAfterCloseEvent = true));

      comp.popover.close();
      fixture.detectChanges();

      expect(popoverClosedEvent).toBe(true, 'popoverClosed called');
      expect(popoverAfterCloseEvent).toBe(false, 'popoverAfterClose not yet called');

      tick();
      expect(popoverAfterCloseEvent).toBe(true, 'popoverAfterClose called after animation');
    }));

    it('should emit a value when closed with a value', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      const secondTestVal = 'xyz789';

      let popoverClosedValue;

      comp.popover.closed.subscribe((val) => (popoverClosedValue = val));

      comp.popover.close(secondTestVal);
      fixture.detectChanges();
      tick();

      // Working when closed via popover api
      expect(popoverClosedValue).toBe(secondTestVal, 'popoverClosed with value - popover api');
    }));

    it('should return whether the popover is presently open', fakeAsync(() => {
      fixture.detectChanges();

      expect(comp.popover.isOpen()).toBe(false, 'Initially closed - popover');

      comp.popover.open();

      expect(comp.popover.isOpen()).toBe(true, 'Subsequently opened - popover');

      comp.popover.close();
      fixture.detectChanges();
      tick();

      expect(comp.popover.isOpen()).toBe(false, 'Finally closed - popover');
    }));

    it('should provide a reference to the anchor element', fakeAsync(() => {
      fixture.detectChanges();
      expect(comp.anchor.elementRef).toEqual(comp.anchorElement);
    }));

    it('should provide a reference to the popover element', () => {
      fixture.detectChanges();
      expect(comp.anchor.popover).toBe(comp.popover);
    });
  });

  describe('using satPopoverAnchor input setter', () => {
    describe('opening and closing behavior', () => {
      let fixture: ComponentFixture<DirectiveAnchorForPopoverTestComponent>;
      let comp: DirectiveAnchorForPopoverTestComponent;
      let overlayContainerElement: HTMLElement;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [SatPopoverModule, NoopAnimationsModule],
          declarations: [DirectiveAnchorForPopoverTestComponent],
          providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
        });

        fixture = TestBed.createComponent(DirectiveAnchorForPopoverTestComponent);
        comp = fixture.componentInstance;

        overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
      });

      afterEach(() => {
        document.body.removeChild(overlayContainerElement);
      });

      it('should open with open()', () => {
        fixture.detectChanges();
        expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
        comp.popover.open();
        expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
      });

      it('should close with close()', fakeAsync(() => {
        fixture.detectChanges();
        comp.popover.open();
        expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

        comp.popover.close();
        fixture.detectChanges();
        tick();
        expect(overlayContainerElement.textContent).toBe('', 'Subsequently closed');
      }));

      it('should provide a reference to the popover element', () => {
        fixture.detectChanges();
        expect(comp.anchor.popover).toBe(comp.popover);
      });
    });
  });

  describe('backdrop', () => {
    let fixture: ComponentFixture<BackdropPopoverTestComponent>;
    let comp: BackdropPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [BackdropPopoverTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(BackdropPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
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

    it('should emit an event when the backdrop is clicked', fakeAsync(() => {
      comp.backdrop = true;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(comp.clicks).toBe(0, 'not yet clicked');

      backdrop.click();
      fixture.detectChanges();
      expect(comp.clicks).toBe(1, 'clicked once');
      tick(500);
    }));

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

    it('should not close when interactiveClose is false', fakeAsync(() => {
      comp.backdrop = true;
      comp.popover.interactiveClose = false;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(comp.clicks).toBe(0, 'Not yet clicked');
      backdrop.click();
      fixture.detectChanges();
      tick(500);

      expect(overlayContainerElement.textContent).toContain('Popover', 'Interactive close disabled');

      comp.popover.interactiveClose = true;
      backdrop.click();
      fixture.detectChanges();
      tick(500);

      expect(comp.clicks).toBe(2, 'Clicked twice');
      expect(overlayContainerElement.textContent).toBe('', 'Interactive close allowed');
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

  describe('keyboard', () => {
    let fixture: ComponentFixture<KeyboardPopoverTestComponent>;
    let comp: KeyboardPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [KeyboardPopoverTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(KeyboardPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should close when escape key is pressed', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      tick();

      expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

      // Emit ESCAPE keydown event
      const currentlyFocusedElement = document.activeElement;
      expect(currentlyFocusedElement.classList).toContain('first', 'Ensure input is focused');
      currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));

      fixture.detectChanges();
      tick(500);

      expect(overlayContainerElement.textContent).toBe('', 'Closed after escape keydown');
    }));

    it('should not close when interactiveClose is false', fakeAsync(() => {
      comp.popover.interactiveClose = false;
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      tick();

      expect(overlayContainerElement.textContent).toContain('Popover', 'Initially open');

      // Emit ESCAPE keydown event
      const currentlyFocusedElement = document.activeElement;
      expect(currentlyFocusedElement.classList).toContain('first', 'Ensure input is focused');
      currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));

      fixture.detectChanges();
      tick(500);

      expect(comp.lastKeyCode).toBe(ESCAPE, 'Keydown still captured');
      expect(overlayContainerElement.textContent).toContain('Popover', 'Interactive close disabled');

      comp.popover.interactiveClose = true;
      currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
      fixture.detectChanges();
      tick(500);

      expect(overlayContainerElement.textContent).toBe('', 'Interactive close allowed');
    }));

    it('should emit keydown events when key is pressed', fakeAsync(() => {
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      tick();

      expect(comp.lastKeyCode).toBe(undefined, 'no key presses yet');

      // Emit A keydown event on input element
      const currentlyFocusedElement = document.activeElement;
      currentlyFocusedElement.dispatchEvent(createKeyboardEvent('keydown', A));

      fixture.detectChanges();
      expect(comp.lastKeyCode).toBe(A, 'pressed A key on input');

      // Emit ESCAPE keydown event on body
      document.body.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
      fixture.detectChanges();
      expect(comp.lastKeyCode).toBe(ESCAPE, 'pressed ESCAPE key on body');

      tick(500);
    }));
  });

  describe('focus', () => {
    let fixture: ComponentFixture<FocusPopoverTestComponent>;
    let comp: FocusPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [FocusPopoverTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(FocusPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should focus the initial element by default', fakeAsync(() => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      comp.button1.nativeElement.click();

      fixture.detectChanges();
      tick();

      expect(document.activeElement.classList).toContain('input', 'Ensure input is focused');
    }));

    it('should not focus the initial element if autoFocus is false', fakeAsync(() => {
      comp.autoFocus = false;
      fixture.detectChanges();

      comp.button1.nativeElement.focus();
      comp.button1.nativeElement.click();

      fixture.detectChanges();
      tick();

      expect(document.activeElement).toEqual(comp.button1.nativeElement);
    }));

    it('should not focus the initial element with autoFocus option as false', fakeAsync(() => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      comp.popover.open({ autoFocus: false });

      fixture.detectChanges();
      tick();

      expect(document.activeElement).toEqual(comp.button1.nativeElement);
    }));

    it('should restore focus by default', fakeAsync(() => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 1', 'Button 1 focus');
      comp.popover.open();

      fixture.detectChanges();
      tick();
      expect(document.activeElement.classList).toContain('input', 'Popover input is focused');

      comp.button2.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 2', 'Button 2 focused while open');

      comp.popover.close();
      fixture.detectChanges();
      tick();
      expect(document.activeElement.textContent).toBe('Button 1', 'Button 1 focus restored');
    }));

    it('should not restore focus if restoreFocus as false', fakeAsync(() => {
      comp.restoreFocus = false;

      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 1', 'Button 1 focus');
      comp.popover.open();

      fixture.detectChanges();
      tick();
      expect(document.activeElement.classList).toContain('input', 'Popover input is focused');

      comp.button2.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 2', 'Button 2 focused while open');

      comp.popover.close();
      fixture.detectChanges();
      tick();
      expect(document.activeElement.textContent).toBe('Button 2', 'Button 2 remains focused');
    }));

    it('should not restore focus when opened with restoreFocus option as false', fakeAsync(() => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 1', 'Button 1 focus');
      comp.popover.open({ restoreFocus: false });

      fixture.detectChanges();
      tick();
      expect(document.activeElement.classList).toContain('input', 'Popover input is focused');

      comp.button2.nativeElement.focus();
      expect(document.activeElement.textContent).toBe('Button 2', 'Button 2 focused while open');

      comp.popover.close();
      fixture.detectChanges();
      tick();
      expect(document.activeElement.textContent).toBe('Button 2', 'Button 2 remains focused');
    }));
  });

  describe('positioning', () => {
    let fixture: ComponentFixture<PositioningTestComponent>;
    let comp: PositioningTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [PositioningTestComponent, PositioningAliasTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(PositioningTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should keep the same overlay when positions are static', fakeAsync(() => {
      fixture.detectChanges();

      // open the overlay and store the overlayRef
      comp.popover.open();
      const overlayAfterFirstOpen = comp.popover._anchoringService._overlayRef;

      comp.popover.close();
      fixture.detectChanges();
      tick();

      // change the position to the same thing and reopen, saving the new overlayRef
      comp.hAlign = 'center';
      fixture.detectChanges();

      comp.popover.open();
      const overlayAfterSecondOpen = comp.popover._anchoringService._overlayRef;

      expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(true);
    }));

    it('should reconstruct the overlay when positions are updated', fakeAsync(() => {
      fixture.detectChanges();

      // open the overlay and store the overlayRef
      comp.popover.open();
      const overlayAfterFirstOpen = comp.popover._anchoringService._overlayRef;

      comp.popover.close();
      fixture.detectChanges();
      tick();

      // change the position and reopen, saving the new overlayRef
      comp.hAlign = 'after';
      fixture.detectChanges();

      comp.popover.open();
      const overlayAfterSecondOpen = comp.popover._anchoringService._overlayRef;

      expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(false);
    }));

    it('should generate the correct number of positions', fakeAsync(() => {
      let strategy: FlexibleConnectedPositionStrategy;
      let overlayConfig: OverlayConfig;
      fixture.detectChanges();

      // centered over anchor can be any of 5 x 5 positions
      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length).toBe(25, 'overlapping');

      comp.popover.close();
      fixture.detectChanges();
      tick();

      // non-overlapping can be any of 2 x 2 positions
      comp.hAlign = 'after';
      comp.vAlign = 'below';
      fixture.detectChanges();

      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length).toBe(4, 'non-overlapping');

      comp.popover.close();
      fixture.detectChanges();
      tick();

      // overlapping in one direction can be any of 2 x 5 positions
      comp.hAlign = 'start';
      comp.vAlign = 'below';
      fixture.detectChanges();

      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length).toBe(10, 'overlapping in one dimension');
    }));

    it('should throw an error when an invalid horizontalAlign is provided', () => {
      fixture.detectChanges();

      // set invalid horizontalAlign
      comp.hAlign = 'kiwi';

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidHorizontalAlignError('kiwi'));
    });

    it('should throw an error when an invalid verticalAlign is provided', () => {
      fixture.detectChanges();

      // set invalid verticalAlign
      comp.vAlign = 'banana';

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidVerticalAlignError('banana'));
    });

    it('should allow aliases for horizontal and vertical align inputs', () => {
      const aliasFixture = TestBed.createComponent(PositioningAliasTestComponent);
      const aliasComp = aliasFixture.componentInstance;

      aliasComp.xAlign = 'before';
      aliasComp.yAlign = 'end';

      aliasFixture.detectChanges();

      expect(aliasComp.popover.horizontalAlign).toBe('before');
      expect(aliasComp.popover.verticalAlign).toBe('end');
    });

    it('should only generate one position when force aligned', () => {
      comp.forceAlignment = true;
      fixture.detectChanges();

      comp.popover.open();
      const overlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      const strategy = overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length).toBe(1, 'only one position');
    });

    it('should lock the position when alignment is locked', fakeAsync(() => {
      // Note: this test relies on the internal logic of the FlexibleConnectedPositionStrategy
      // and is very brittle.
      fixture.detectChanges();

      // Open the popover to get a spy on its position strategy
      comp.popover.open();
      tick();
      const firstOverlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      const firstStrategy = firstOverlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      const firstSpy = spyOn(firstStrategy, 'reapplyLastPosition');

      // Emulate scrolling by calling apply. Assert the last position is not used when doing so.
      expect(firstSpy).not.toHaveBeenCalled();
      firstStrategy.apply();
      expect(firstSpy).not.toHaveBeenCalled();

      // Close the popover and try again with `lockAlignment`
      comp.popover.close();
      fixture.detectChanges();
      tick();

      comp.lockAlignment = true;
      fixture.detectChanges();

      // Open the popover to get a spy on its position strategy
      comp.popover.open();
      tick();
      const secondOverlayConfig = comp.popover._anchoringService._overlayRef.getConfig();
      const secondStrategy = secondOverlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;
      const secondSpy = spyOn(secondStrategy, 'reapplyLastPosition');

      // Assert that the strategy is new
      expect(firstStrategy).not.toBe(secondStrategy);

      // Emulate scrolling agin. Assert the last position is used.
      expect(secondSpy).not.toHaveBeenCalled();
      secondStrategy.apply();
      expect(secondSpy).toHaveBeenCalled();
    }));

    it('should realign when the anchor moves', fakeAsync(() => {
      // Move the anchor off the left edge of the page
      const anchorEl = comp.anchor.elementRef.nativeElement;
      anchorEl.style.display = 'inline-block';
      anchorEl.style.position = 'relative';
      anchorEl.style.left = '50px';

      fixture.detectChanges();

      comp.popover.open();
      fixture.detectChanges();

      const getCenter = (clientRect) => clientRect.x + clientRect.width / 2;
      const centerOfAnchor = () => getCenter(anchorEl.getBoundingClientRect());
      const centerOfPopover = () =>
        getCenter(overlayContainerElement.querySelector('.sat-popover-container').getBoundingClientRect());

      // Expect popover to be centered over anchor
      expect(centerOfAnchor()).toBe(centerOfPopover(), 'Centered over anchor');

      // Move anchor and expect center of popover to no longer be center of anchor
      anchorEl.style.left = '100px';
      fixture.detectChanges();
      expect(centerOfAnchor()).toBe(centerOfPopover() + 50, 'No longer centered over anchor');

      // Realign popover and expect center of popover to now be center of anchor
      comp.popover.realign();
      fixture.detectChanges();
      expect(centerOfAnchor()).toBe(centerOfPopover(), 'Centered again after realign');
    }));
  });

  describe('scrolling', () => {
    let fixture: ComponentFixture<ScrollingTestComponent>;
    let comp: ScrollingTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [ScrollingTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(ScrollingTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should allow changing the strategy dynamically', fakeAsync(() => {
      let strategy: ScrollStrategy;
      fixture.detectChanges();
      comp.popover.open();

      strategy = comp.popover._anchoringService._overlayRef.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy).toBe(true, 'reposition strategy');

      comp.popover.close();
      fixture.detectChanges();
      tick();

      comp.strategy = 'block';
      fixture.detectChanges();
      comp.popover.open();

      strategy = comp.popover._anchoringService._overlayRef.getConfig().scrollStrategy;
      expect(strategy instanceof BlockScrollStrategy).toBe(true, 'block strategy');
    }));

    it('should wait until the popover is closed to update the strategy', fakeAsync(() => {
      let strategy: ScrollStrategy;
      fixture.detectChanges();
      comp.popover.open();

      // expect it to be open with default strategy
      strategy = comp.popover._anchoringService._overlayRef.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy).toBe(true, 'reposition strategy');
      expect(overlayContainerElement.textContent).toContain('Popover', 'initially open');

      // change the strategy while it is open
      comp.strategy = 'block';
      fixture.detectChanges();
      tick();

      // expect it to have remained open with default strategy
      strategy = comp.popover._anchoringService._overlayRef.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy).toBe(true, 'still reposition strategy');
      expect(overlayContainerElement.textContent).toContain('Popover', 'Still open');

      // close the popover and reopen
      comp.popover.close();
      fixture.detectChanges();
      tick();
      comp.popover.open();

      // expect the new strategy to be in place
      strategy = comp.popover._anchoringService._overlayRef.getConfig().scrollStrategy;
      expect(strategy instanceof BlockScrollStrategy).toBe(true, 'block strategy');
    }));

    it('should throw an error when an invalid scrollStrategy is provided', () => {
      fixture.detectChanges();

      // set invalid scrollStrategy
      comp.strategy = 'rambutan';

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidScrollStrategyError('rambutan'));
    });
  });

  describe('anchoring service', () => {
    let fixture: ComponentFixture<ServiceTestComponent>;
    let comp: ServiceTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [ServiceTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(ServiceTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should throw an error if never anchored', () => {
      // should not throw just by initializing
      expect(() => {
        fixture.detectChanges();
      }).not.toThrowError();

      // should throw if trying to open
      expect(() => {
        comp.popover.open();
      }).toThrow(getUnanchoredPopoverError());
    });

    it('should open via popover api after being anchored', () => {
      comp.popover.setCustomAnchor(comp.container, comp.customAnchor);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
      comp.popover.open();
      expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
    });

    it('should open via service api after being anchored', () => {
      comp.anchoring.anchor(comp.popover, comp.container, comp.customAnchor);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent).toBe('', 'Initially closed');
      comp.anchoring.openPopover();
      expect(overlayContainerElement.textContent).toContain('Popover', 'Subsequently open');
    });

    it('should get the anchor elementRef', () => {
      comp.anchoring.anchor(comp.popover, comp.container, comp.customAnchor);
      expect(comp.anchoring.getAnchorElement()).toEqual(comp.customAnchor.nativeElement);
    });
  });

  describe('hover directive', () => {
    let fixture: ComponentFixture<HoverDirectiveTestComponent>;
    let comp: HoverDirectiveTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [HoverDirectiveTestComponent],
        providers: [{ provide: OverlayContainer, useFactory: overlayContainerFactory }]
      });

      fixture = TestBed.createComponent(HoverDirectiveTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should open the popover when the anchor is hovered', fakeAsync(() => {
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      tick(1);
      expect(comp.popover.isOpen()).toBe(true);

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      tick(1);
      expect(comp.popover.isOpen()).toBe(false);
    }));

    it('should open the popover after a delay', fakeAsync(() => {
      comp.delay = 500;
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      tick(499);
      expect(comp.popover.isOpen()).toBe(false);
      tick(1);
      expect(comp.popover.isOpen()).toBe(true);

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      expect(comp.popover.isOpen()).toBe(false);
    }));

    it('should not open the popover if mouseleave event during delay', fakeAsync(() => {
      comp.delay = 500;
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      tick(100);
      expect(comp.popover.isOpen()).toBe(false);

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      expect(comp.popover.isOpen()).toBe(false);

      tick(400);
      expect(comp.popover.isOpen()).toBe(false);
    }));
  });

  describe('default transition', () => {
    let fixture: ComponentFixture<SimpleDirectiveAnchorPopoverTestComponent>;
    let comp: SimpleDirectiveAnchorPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SatPopoverModule, NoopAnimationsModule],
        declarations: [SimpleDirectiveAnchorPopoverTestComponent],
        providers: [{ provide: DEFAULT_TRANSITION, useValue: '300ms ease' }]
      });

      fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should use the provided default transition', () => {
      expect(comp.popover.openTransition).toBe('300ms ease');
      expect(comp.popover.closeTransition).toBe('300ms ease');
    });
  });
});

/**
 * This component is for testing that an anchor not associated with
 * a popover will throw an error.
 */
@Component({
  template: ` <div satPopoverAnchor></div> `
})
class InvalidAnchorTestComponent {}

/**
 * This component is for testing that passing an invalid anchor
 * to a popover will throw an error.
 */
@Component({
  template: `
    <sat-popover #invalid>Dummy</sat-popover>
    <sat-popover [anchor]="invalid">Dummy</sat-popover>
  `
})
class InvalidPopoverTestComponent {}

/**
 * This component is for testing that trying to open/close/toggle
 * a popover with no anchor will throw an error.
 */
@Component({
  template: ` <sat-popover horizontalAlign="after">Anchorless</sat-popover> `
})
class AnchorlessPopoverTestComponent {
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
}

/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple satPopoverAnchor anchor.
 */
@Component({
  template: `
    <div #anchorEl satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <div #anchorEl2>Alternate anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
class SimpleDirectiveAnchorPopoverTestComponent {
  @ViewChild('anchorEl') anchorElement: ElementRef;
  @ViewChild('anchorEl2') alternateAnchorElement: ElementRef;
  @ViewChild(SatPopoverAnchor, { static: true }) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
}

/**
 * This component is for testing the
 * `SatPopoverAnchor#satPopoverAnchor` input setter.
 */
@Component({
  template: `
    <div #anchorEl [satPopoverAnchor]="p">Anchor</div>
    <div #anchorEl2>Alternate anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `
})
class DirectiveAnchorForPopoverTestComponent {
  @ViewChild('anchorEl') anchorElement: ElementRef;
  @ViewChild('anchorEl2') alternateAnchorElement: ElementRef;
  @ViewChild(SatPopoverAnchor, { static: true }) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
}

/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple ElementRef anchor.
 */
@Component({
  template: `
    <div #anchorEl>Anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
class SimpleHTMLAnchorPopoverTestComponent {
  @ViewChild('anchorEl') anchorElement: ElementRef;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
}

/**
 * This component is for testing the backdrop behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover
      [anchor]="anchor"
      [hasBackdrop]="backdrop"
      [backdropClass]="klass"
      (backdropClicked)="clicks = clicks + 1"
    >
      Popover
    </sat-popover>
  `
})
class BackdropPopoverTestComponent {
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  backdrop = false;
  clicks = 0;
  klass: string;
}

/**
 * This component is for testing behavior related to keyboard events
 * inside the popover.
 */
@Component({
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover [anchor]="anchor" (overlayKeydown)="lastKeyCode = $event.keyCode">
      Popover
      <input type="text" class="first" />
      <input type="text" class="second" />
    </sat-popover>
  `
})
export class KeyboardPopoverTestComponent {
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  lastKeyCode: number;
}

/**
 * This component is for testing focus behavior in the popover.
 */
@Component({
  template: `
    <button #b1 satPopoverAnchor #anchor="satPopoverAnchor" (click)="p.open()">Button 1</button>
    <button #b2>Button 2</button>

    <sat-popover #p [anchor]="anchor" [autoFocus]="autoFocus" [restoreFocus]="restoreFocus">
      <input type="text" class="input" />
    </sat-popover>
  `
})
export class FocusPopoverTestComponent {
  restoreFocus = true;
  autoFocus = true;

  @ViewChild('b1') button1: ElementRef;
  @ViewChild('b2') button2: ElementRef;
  @ViewChild('p') popover: SatPopover;
}

/** This component is for testing dynamic positioning behavior. */
@Component({
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover
      [anchor]="anchor"
      [horizontalAlign]="hAlign"
      [verticalAlign]="vAlign"
      [forceAlignment]="forceAlignment"
      [lockAlignment]="lockAlignment"
    >
      Popover
    </sat-popover>
  `
})
export class PositioningTestComponent {
  @ViewChild(SatPopoverAnchor, { static: true }) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  hAlign = 'center';
  vAlign = 'center';
  forceAlignment = false;
  lockAlignment = false;
}

/** This component is for testing position aliases. */
@Component({
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover [anchor]="anchor" [xAlign]="xAlign" [yAlign]="yAlign"> Popover </sat-popover>
  `
})
export class PositioningAliasTestComponent {
  @ViewChild(SatPopoverAnchor, { static: true }) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  xAlign = 'center';
  yAlign = 'center';
}

/** This component is for testing scroll behavior. */
@Component({
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover [anchor]="anchor" [scrollStrategy]="strategy"> Popover </sat-popover>
  `
})
export class ScrollingTestComponent {
  @ViewChild(SatPopoverAnchor, { static: true }) anchor: SatPopoverAnchor;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  strategy = 'reposition';
}

/** This component is for testing the isolated anchoring service. */
@Component({
  template: `
    <div #customAnchor>Anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `,
  providers: [SatPopoverAnchoringService]
})
export class ServiceTestComponent {
  @ViewChild('customAnchor', { static: true }) customAnchor: ElementRef;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;

  constructor(public anchoring: SatPopoverAnchoringService, public container: ViewContainerRef) {}
}

/** This component is for testing the hover directive behavior. */
@Component({
  template: `
    <div #anchorEl satPopoverAnchor #anchor="satPopoverAnchor" [satPopoverHover]="delay">Anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
export class HoverDirectiveTestComponent {
  @ViewChild('anchorEl') anchorEl: ElementRef;
  @ViewChild(SatPopover, { static: true }) popover: SatPopover;
  delay = 0;
}

/** This factory function provides an overlay container under test control. */
const overlayContainerFactory = () => {
  const element = document.createElement('div');
  element.classList.add('cdk-overlay-container');
  document.body.appendChild(element);

  // remove body padding to keep consistent cross-browser
  document.body.style.padding = '0';
  document.body.style.margin = '0';

  return { getContainerElement: () => element };
};

/** Dispatches a keydown event from an element. From angular/material2 */
export function createKeyboardEvent(type: string, keyCode: number, target?: Element, key?: string) {
  const event = document.createEvent('KeyboardEvent') as any;
  // Firefox does not support `initKeyboardEvent`, but supports `initKeyEvent`.
  const initEventFn = (event.initKeyEvent || event.initKeyboardEvent).bind(event);
  const originalPreventDefault = event.preventDefault;

  initEventFn(type, true, true, window, 0, 0, 0, 0, 0, keyCode);

  // Webkit Browsers don't set the keyCode when calling the init function.
  // See related bug https://bugs.webkit.org/show_bug.cgi?id=16735
  Object.defineProperties(event, {
    keyCode: { get: () => keyCode },
    key: { get: () => key },
    target: { get: () => target }
  });

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function () {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true });
    return originalPreventDefault.apply(this, arguments);
  };

  return event;
}

export function createMouseEvent(type: string) {
  const event = document.createEvent('MouseEvent');
  event.initMouseEvent(
    type,
    true, // canBubble
    false, // cancelable
    window, // view
    0, // detail
    0, // screenX
    0, // screenY
    0, // clientX
    0, // clientY
    false, // ctrlKey
    false, // altKey
    false, // shiftKey
    false, // metaKey
    0, // button
    null // relatedTarget
  );
  return event;
}
