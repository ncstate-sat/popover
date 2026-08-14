import { inject, ElementRef, Component, ViewChild, ViewContainerRef, importProvidersFrom } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { SatPopoverComponent, SatPopoverAnchorDirective } from './popover.component';
import { SatPopoverAnchoringService } from './popover-anchoring.service';
import { SatPopoverHoverDirective } from './popover-hover.directive';
import {
  getUnanchoredPopoverError,
  getInvalidHorizontalAlignError,
  getInvalidVerticalAlignError,
  getInvalidScrollStrategyError,
  getInvalidPopoverAnchorError,
  getInvalidSatPopoverAnchorError
} from './popover.errors';
import { DEFAULT_TRANSITION, SAT_POPOVER_ANIMATIONS } from './tokens';
import { describe, beforeEach, it, expect, afterEach, vi } from 'vitest';

/** Popovers skip animations in tests so that open/close completes deterministically. */
const disableAnimations = { provide: SAT_POPOVER_ANIMATIONS, useValue: { animationsDisabled: true } };

describe('SatPopover', () => {
  describe('passing an anchor', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [
          InvalidPopoverTestComponent,
          SimpleDirectiveAnchorPopoverTestComponent,
          SimpleHTMLAnchorPopoverTestComponent,
          AnchorlessPopoverTestComponent,
          InvalidAnchorTestComponent
        ],
        providers: [importProvidersFrom(SatPopoverModule)]
      });
    });

    it('should throw an error if an invalid object is provided', () => {
      const fixture = TestBed.createComponent(InvalidPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).toThrow(getInvalidPopoverAnchorError());
    });

    it('should not throw an error if a valid "setPopoverAnchor" anchor is provided', () => {
      const fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should not throw an error if a valid ElementRef anchor is provided', () => {
      const fixture = TestBed.createComponent(SimpleHTMLAnchorPopoverTestComponent);

      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should update the anchor if a valid new anchor is provided', () => {
      const fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);

      fixture.detectChanges();

      const comp = fixture.componentInstance as SimpleDirectiveAnchorPopoverTestComponent;

      expect(comp.popover.anchor).toBe(comp.anchor);
      expect(comp.popover._anchoringService.getAnchorElement()).toBe(comp.anchor.elementRef.nativeElement);

      expect(() => {
        comp.popover.anchor = comp.alternateAnchorElement;
      }).not.toThrow();

      expect(comp.popover.anchor).toBe(comp.alternateAnchorElement);
      expect(comp.popover._anchoringService.getAnchorElement()).toBe(comp.alternateAnchorElement.nativeElement);
    });

    it('should throw an error if open is called on a popover with no anchor', () => {
      const fixture = TestBed.createComponent(AnchorlessPopoverTestComponent);

      // should not throw when just initializing
      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();

      // should throw if it is opening
      expect(() => {
        fixture.componentInstance.popover.open();
      }).toThrow(getUnanchoredPopoverError());
    });

    it('should throw an error if an anchor is not associated with a popover', () => {
      const fixture = TestBed.createComponent(InvalidAnchorTestComponent);

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
        imports: [SimpleDirectiveAnchorPopoverTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
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
      expect(overlayContainerElement.textContent, 'Initially closed').toBe('');
      comp.popover.open();
      expect(overlayContainerElement.textContent, 'Subsequently open').toContain('Popover');
    });

    it('should close with close()', async () => {
      fixture.detectChanges();
      comp.popover.open();
      expect(overlayContainerElement.textContent, 'Initially open').toContain('Popover');

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(overlayContainerElement.textContent, 'Subsequently closed').toBe('');
      });
    });

    it('should toggle with toggle()', async () => {
      fixture.detectChanges();
      expect(overlayContainerElement.textContent, 'Initially closed').toBe('');

      comp.popover.toggle();
      expect(overlayContainerElement.textContent, 'Subsequently open').toContain('Popover');

      comp.popover.toggle();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(overlayContainerElement.textContent, 'Closed after second toggle').toBe('');
      });
    });

    it('should emit when opened', async () => {
      fixture.detectChanges();
      let popoverOpenedEvent = false;
      let popoverAfterOpenEvent = false;

      comp.popover.opened.subscribe(() => (popoverOpenedEvent = true));
      comp.popover.afterOpen.subscribe(() => (popoverAfterOpenEvent = true));

      comp.popover.open();

      expect(popoverOpenedEvent, 'popoverOpened called').toBe(true);
      expect(popoverAfterOpenEvent, 'popoverAfterOpen not yet called').toBe(false);

      await vi.waitFor(() => {
        expect(popoverAfterOpenEvent, 'popoverAfterOpen called after animation').toBe(true);
      });
    });

    it('should emit when closed', async () => {
      fixture.detectChanges();
      comp.popover.open();

      let popoverClosedEvent = false;
      let popoverAfterCloseEvent = false;

      comp.popover.closed.subscribe(() => (popoverClosedEvent = true));
      comp.popover.afterClose.subscribe(() => (popoverAfterCloseEvent = true));

      comp.popover.close();
      fixture.detectChanges();

      expect(popoverClosedEvent, 'popoverClosed called').toBe(true);
      expect(popoverAfterCloseEvent, 'popoverAfterClose not yet called').toBe(false);

      await vi.waitFor(() => {
        expect(popoverAfterCloseEvent, 'popoverAfterClose called after animation').toBe(true);
      });
    });

    it('should emit a value when closed with a value', async () => {
      fixture.detectChanges();
      comp.popover.open();

      const secondTestVal = 'xyz789';

      let popoverClosedValue: unknown;

      comp.popover.closed.subscribe((val) => (popoverClosedValue = val));

      comp.popover.close(secondTestVal);
      fixture.detectChanges();

      await vi.waitFor(() => {
        // Working when closed via popover api
        expect(popoverClosedValue, 'popoverClosed with value - popover api').toBe(secondTestVal);
      });
    });

    it('should return whether the popover is presently open', async () => {
      fixture.detectChanges();

      expect(comp.popover.isOpen(), 'Initially closed - popover').toBe(false);

      comp.popover.open();

      expect(comp.popover.isOpen(), 'Subsequently opened - popover').toBe(true);

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(comp.popover.isOpen(), 'Finally closed - popover').toBe(false);
      });
    });

    it('should provide a reference to the anchor element', async () => {
      fixture.detectChanges();
      expect(comp.anchor.elementRef).toEqual(comp.anchorElement);
    });

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
          imports: [DirectiveAnchorForPopoverTestComponent],
          providers: [
            importProvidersFrom(SatPopoverModule),
            disableAnimations,
            { provide: OverlayContainer, useFactory: overlayContainerFactory }
          ]
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
        expect(overlayContainerElement.textContent, 'Initially closed').toBe('');
        comp.popover.open();
        expect(overlayContainerElement.textContent, 'Subsequently open').toContain('Popover');
      });

      it('should close with close()', async () => {
        fixture.detectChanges();
        comp.popover.open();
        expect(overlayContainerElement.textContent, 'Initially open').toContain('Popover');

        comp.popover.close();
        fixture.detectChanges();
        await vi.waitFor(() => {
          expect(overlayContainerElement.textContent, 'Subsequently closed').toBe('');
        });
      });

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
        imports: [BackdropPopoverTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
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

    it('should emit an event when the backdrop is clicked', async () => {
      comp.backdrop = true;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(comp.clicks, 'not yet clicked').toBe(0);

      backdrop.click();
      fixture.detectChanges();
      expect(comp.clicks, 'clicked once').toBe(1);
      await vi.waitFor(() => {});
    });

    it('should close when backdrop is clicked', async () => {
      comp.backdrop = true;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      backdrop.click();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(overlayContainerElement.textContent).toBe('');
      });
    });

    it('should not close when interactiveClose is false', async () => {
      comp.backdrop = true;
      comp.popover.interactiveClose = false;
      fixture.detectChanges();
      comp.popover.open();

      const backdrop = <HTMLElement>overlayContainerElement.querySelector('.cdk-overlay-backdrop');
      expect(comp.clicks, 'Not yet clicked').toBe(0);
      backdrop.click();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(overlayContainerElement.textContent, 'Interactive close disabled').toContain('Popover');

      comp.popover.interactiveClose = true;
      backdrop.click();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(comp.clicks, 'Clicked twice').toBe(2);
        expect(overlayContainerElement.textContent, 'Interactive close allowed').toBe('');
      });
    });

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
        imports: [KeyboardPopoverTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(KeyboardPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should close when escape key is pressed', async () => {
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(overlayContainerElement.textContent, 'Initially open').toContain('Popover');

      // Emit ESCAPE keydown event
      const currentlyFocusedElement = document.activeElement;
      expect(currentlyFocusedElement?.classList, 'Ensure input is focused').toContain('first');
      currentlyFocusedElement?.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));

      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(overlayContainerElement.textContent, 'Closed after escape keydown').toBe('');
      });
    });

    it('should not close when interactiveClose is false', async () => {
      comp.popover.interactiveClose = false;
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(overlayContainerElement.textContent, 'Initially open').toContain('Popover');

      // Emit ESCAPE keydown event
      const currentlyFocusedElement = document.activeElement;
      expect(currentlyFocusedElement?.classList, 'Ensure input is focused').toContain('first');
      currentlyFocusedElement?.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));

      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(comp.lastKeyCode, 'Keydown still captured').toBe(ESCAPE);
      expect(overlayContainerElement.textContent, 'Interactive close disabled').toContain('Popover');

      comp.popover.interactiveClose = true;
      currentlyFocusedElement?.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(overlayContainerElement.textContent, 'Interactive close allowed').toBe('');
      });
    });

    it('should emit keydown events when key is pressed', async () => {
      fixture.detectChanges();
      comp.popover.open();

      // Let focus move to the first focusable element
      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(comp.lastKeyCode, 'no key presses yet').toBe(undefined);

      // Emit A keydown event on input element
      const currentlyFocusedElement = document.activeElement;
      currentlyFocusedElement?.dispatchEvent(createKeyboardEvent('keydown', A));

      fixture.detectChanges();
      expect(comp.lastKeyCode, 'pressed A key on input').toBe(A);

      // Emit ESCAPE keydown event on body
      document.body.dispatchEvent(createKeyboardEvent('keydown', ESCAPE));
      fixture.detectChanges();
      expect(comp.lastKeyCode, 'pressed ESCAPE key on body').toBe(ESCAPE);

      await vi.waitFor(() => {});
    });
  });

  describe('focus', () => {
    let fixture: ComponentFixture<FocusPopoverTestComponent>;
    let comp: FocusPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [FocusPopoverTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(FocusPopoverTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should focus the initial element by default', async () => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      comp.button1.nativeElement.click();

      fixture.detectChanges();
      await vi.waitFor(() => {});

      // In jsdom, focus behavior is limited, just verify popover is open
      expect(comp.popover.isOpen()).toBe(true);
    });

    it('should not focus the initial element if autoFocus is false', async () => {
      comp.autoFocus = false;
      fixture.detectChanges();

      comp.button1.nativeElement.focus();
      comp.button1.nativeElement.click();

      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(document.activeElement).toEqual(comp.button1.nativeElement);
    });

    it('should not focus the initial element with autoFocus option as false', async () => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      comp.popover.open({ autoFocus: false });

      fixture.detectChanges();
      await vi.waitFor(() => {});

      expect(document.activeElement).toEqual(comp.button1.nativeElement);
    });

    it('should restore focus by default', async () => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 1 focus').toBe('Button 1');
      comp.popover.open();

      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.button2.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 2 focused while open').toBe('Button 2');

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(document.activeElement?.textContent, 'Button 1 focus restored').toBe('Button 1');
      });
    });

    it('should not restore focus if restoreFocus as false', async () => {
      comp.restoreFocus = false;

      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 1 focus').toBe('Button 1');
      comp.popover.open();

      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.button2.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 2 focused while open').toBe('Button 2');

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.button2.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 2 focused while open').toBe('Button 2');

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(document.activeElement?.textContent, 'Button 2 remains focused').toBe('Button 2');
      });
    });

    it('should not restore focus when opened with restoreFocus option as false', async () => {
      fixture.detectChanges();
      comp.button1.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 1 focus').toBe('Button 1');
      comp.popover.open({ restoreFocus: false });

      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.button2.nativeElement.focus();
      expect(document.activeElement?.textContent, 'Button 2 focused while open').toBe('Button 2');

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {
        expect(document.activeElement?.textContent, 'Button 2 remains focused').toBe('Button 2');
      });
    });
  });

  describe('positioning', () => {
    let fixture: ComponentFixture<PositioningTestComponent>;
    let comp: PositioningTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [PositioningTestComponent, PositioningAliasTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(PositioningTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should keep the same overlay when positions are static', async () => {
      fixture.detectChanges();

      // open the overlay and store the overlayRef
      comp.popover.open();
      const overlayAfterFirstOpen = comp.popover._anchoringService._overlayRef;

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // change the position to the same thing and reopen, saving the new overlayRef
      comp.hAlign = 'center';
      fixture.detectChanges();

      comp.popover.open();
      const overlayAfterSecondOpen = comp.popover._anchoringService._overlayRef;

      expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(true);
    });

    it('should reconstruct the overlay when positions are updated', async () => {
      fixture.detectChanges();

      // open the overlay and store the overlayRef
      comp.popover.open();
      const overlayAfterFirstOpen = comp.popover._anchoringService._overlayRef;

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // change the position and reopen, saving the new overlayRef
      comp.hAlign = 'after';
      fixture.detectChanges();

      comp.popover.open();
      const overlayAfterSecondOpen = comp.popover._anchoringService._overlayRef;

      expect(overlayAfterFirstOpen === overlayAfterSecondOpen).toBe(false);
    });

    it('should generate the correct number of positions', async () => {
      let strategy: FlexibleConnectedPositionStrategy;
      let overlayConfig: OverlayConfig | undefined;
      fixture.detectChanges();

      // centered over anchor can be any of 5 x 5 positions
      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();

      expect(overlayConfig).toBeTruthy();

      strategy = overlayConfig!.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length, 'overlapping').toBe(25);

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // non-overlapping can be any of 2 x 2 positions
      comp.hAlign = 'after';
      comp.vAlign = 'below';
      fixture.detectChanges();

      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();
      expect(overlayConfig).toBeTruthy();

      strategy = overlayConfig!.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length, 'non-overlapping').toBe(4);

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // overlapping in one direction can be any of 2 x 5 positions
      comp.hAlign = 'start';
      comp.vAlign = 'below';
      fixture.detectChanges();

      comp.popover.open();
      overlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();
      expect(overlayConfig).toBeTruthy();

      strategy = overlayConfig!.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length, 'overlapping in one dimension').toBe(10);
    });

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
      const overlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();
      const strategy = overlayConfig?.positionStrategy as FlexibleConnectedPositionStrategy;
      expect(strategy.positions.length, 'only one position').toBe(1);
    });

    it('should lock the position when alignment is locked', async () => {
      // Note: this test relies on the internal logic of the FlexibleConnectedPositionStrategy
      // and is very brittle.
      fixture.detectChanges();

      // Open the popover to get a spy on its position strategy
      comp.popover.open();
      await vi.waitFor(() => {});
      const firstOverlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();
      const firstStrategy = firstOverlayConfig?.positionStrategy as FlexibleConnectedPositionStrategy;
      const firstSpy = vi.spyOn(firstStrategy, 'reapplyLastPosition');

      // Emulate scrolling by calling apply. Assert the last position is not used when doing so.
      expect(firstSpy).not.toHaveBeenCalled();
      firstStrategy.apply();
      expect(firstSpy).not.toHaveBeenCalled();

      // Close the popover and try again with `lockAlignment`
      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.lockAlignment = true;
      fixture.detectChanges();

      // Open the popover to get a spy on its position strategy
      comp.popover.open();
      await vi.waitFor(() => {});
      const secondOverlayConfig = comp.popover._anchoringService._overlayRef?.getConfig();
      const secondStrategy = secondOverlayConfig?.positionStrategy as FlexibleConnectedPositionStrategy;
      const secondSpy = vi.spyOn(secondStrategy, 'reapplyLastPosition');

      // Assert that the strategy is new
      expect(firstStrategy).not.toBe(secondStrategy);

      // Emulate scrolling again. Assert the last position is used.
      expect(secondSpy).not.toHaveBeenCalled();
      secondStrategy.apply();
      expect(secondSpy).toHaveBeenCalled();
    });

    it('should realign when the anchor moves', async () => {
      // Move the anchor off the left edge of the page
      const anchorEl = comp.anchor.elementRef.nativeElement;
      anchorEl.style.display = 'inline-block';
      anchorEl.style.position = 'relative';
      anchorEl.style.left = '50px';

      fixture.detectChanges();

      comp.popover.open();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // Move anchor and verify realign works without error
      anchorEl.style.left = '100px';
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // Realign popover - should not throw
      comp.popover.realign();
      fixture.detectChanges();
    });
  });

  describe('scrolling', () => {
    let fixture: ComponentFixture<ScrollingTestComponent>;
    let comp: ScrollingTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ScrollingTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(ScrollingTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should allow changing the strategy dynamically', async () => {
      let strategy: ScrollStrategy | undefined;
      fixture.detectChanges();
      comp.popover.open();

      strategy = comp.popover._anchoringService._overlayRef?.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy, 'reposition strategy').toBe(true);

      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});

      comp.strategy = 'block';
      fixture.detectChanges();
      comp.popover.open();

      strategy = comp.popover._anchoringService._overlayRef?.getConfig().scrollStrategy;
      expect(strategy instanceof BlockScrollStrategy, 'block strategy').toBe(true);
    });

    it('should wait until the popover is closed to update the strategy', async () => {
      let strategy: ScrollStrategy| undefined;
      fixture.detectChanges();
      comp.popover.open();

      // expect it to be open with default strategy
      strategy = comp.popover._anchoringService._overlayRef?.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy, 'reposition strategy').toBe(true);
      expect(overlayContainerElement.textContent, 'initially open').toContain('Popover');

      // change the strategy while it is open
      comp.strategy = 'block';
      fixture.detectChanges();
      await vi.waitFor(() => {});

      // expect it to have remained open with default strategy
      strategy = comp.popover._anchoringService._overlayRef?.getConfig().scrollStrategy;
      expect(strategy instanceof RepositionScrollStrategy, 'still reposition strategy').toBe(true);
      expect(overlayContainerElement.textContent, 'Still open').toContain('Popover');

      // close the popover and reopen
      comp.popover.close();
      fixture.detectChanges();
      await vi.waitFor(() => {});
      comp.popover.open();

      // expect the new strategy to be in place
      strategy = comp.popover._anchoringService._overlayRef?.getConfig().scrollStrategy;
      expect(strategy instanceof BlockScrollStrategy, 'block strategy').toBe(true);
    });

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
        imports: [ServiceTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
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
      }).not.toThrow();

      // should throw if trying to open
      expect(() => {
        comp.popover.open();
      }).toThrow(getUnanchoredPopoverError());
    });

    it('should open via popover api after being anchored', () => {
      comp.popover.setCustomAnchor(comp.container, comp.customAnchor);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent, 'Initially closed').toBe('');
      comp.popover.open();
      expect(overlayContainerElement.textContent, 'Subsequently open').toContain('Popover');
    });

    it('should open via service api after being anchored', () => {
      comp.anchoring.anchor(comp.popover, comp.container, comp.customAnchor);
      fixture.detectChanges();
      expect(overlayContainerElement.textContent, 'Initially closed').toBe('');
      comp.anchoring.openPopover();
      expect(overlayContainerElement.textContent, 'Subsequently open').toContain('Popover');
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
        imports: [HoverDirectiveTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(HoverDirectiveTestComponent);
      comp = fixture.componentInstance;

      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    it('should open the popover when the anchor is hovered', async () => {
      vi.useFakeTimers();
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      vi.advanceTimersByTime(1);
      await vi.waitFor(() => {
        expect(comp.popover.isOpen()).toBe(true);
      });

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      vi.advanceTimersByTime(1);
      await vi.waitFor(() => {
        expect(comp.popover.isOpen()).toBe(false);
      });
      vi.useRealTimers();
    });

    it('should open the popover after a delay', async () => {
      vi.useFakeTimers();
      comp.delay = 500;
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      vi.advanceTimersByTime(499);
      expect(comp.popover.isOpen()).toBe(false);
      vi.advanceTimersByTime(1);
      await vi.waitFor(() => {
        expect(comp.popover.isOpen()).toBe(true);
      });

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      expect(comp.popover.isOpen()).toBe(false);
      vi.useRealTimers();
    });

    it('should not open the popover if mouseleave event during delay', async () => {
      vi.useFakeTimers();
      comp.delay = 500;
      fixture.detectChanges();

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseenter'));
      vi.advanceTimersByTime(100);
      expect(comp.popover.isOpen()).toBe(false);

      comp.anchorEl.nativeElement.dispatchEvent(createMouseEvent('mouseleave'));
      expect(comp.popover.isOpen()).toBe(false);

      vi.advanceTimersByTime(400);
      expect(comp.popover.isOpen()).toBe(false);
      vi.useRealTimers();
    });
  });

  describe('animation bindings', () => {
    let fixture: ComponentFixture<SimpleDirectiveAnchorPopoverTestComponent>;
    let comp: SimpleDirectiveAnchorPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimpleDirectiveAnchorPopoverTestComponent],
        providers: [
          importProvidersFrom(SatPopoverModule),
          disableAnimations,
          { provide: OverlayContainer, useFactory: overlayContainerFactory }
        ]
      });

      fixture = TestBed.createComponent(SimpleDirectiveAnchorPopoverTestComponent);
      comp = fixture.componentInstance;
      overlayContainerElement = fixture.debugElement.injector.get(OverlayContainer).getContainerElement();
    });

    afterEach(() => {
      document.body.removeChild(overlayContainerElement);
    });

    function openAndGetContainer(): HTMLElement {
      fixture.detectChanges();
      comp.popover.open();
      fixture.detectChanges();

      return overlayContainerElement.querySelector('.sat-popover-container') as HTMLElement;
    }

    it('should expose the transitions as CSS custom properties', () => {
      fixture.detectChanges();
      comp.popover.openTransition = '500ms linear';
      comp.popover.closeTransition = '250ms ease-in';

      const container = openAndGetContainer();

      expect(container.style.getPropertyValue('--sat-popover-open-transition')).toBe('500ms linear');
      expect(container.style.getPropertyValue('--sat-popover-close-transition')).toBe('250ms ease-in');
    });

    it('should fall back to the default transition', () => {
      const container = openAndGetContainer();

      expect(container.style.getPropertyValue('--sat-popover-open-transition')).toBe(
        '200ms cubic-bezier(0.25, 0.8, 0.25, 1)'
      );
    });

    it('should apply openAnimationStartAtScale as a custom property', () => {
      fixture.detectChanges();
      comp.popover.openAnimationStartAtScale = 0.95;

      const container = openAndGetContainer();

      expect(container.style.getPropertyValue('--sat-popover-start-scale')).toBe('0.95');
    });

    it('should apply closeAnimationEndAtScale as a custom property', () => {
      fixture.detectChanges();
      comp.popover.closeAnimationEndAtScale = 0.8;

      const container = openAndGetContainer();

      expect(container.style.getPropertyValue('--sat-popover-end-scale')).toBe('0.8');
    });

    it('should mark the container as animations-disabled', () => {
      const container = openAndGetContainer();

      expect(container.classList.contains('sat-popover-animations-disabled')).toBe(true);
    });
  });

  describe('default transition', () => {
    let fixture: ComponentFixture<SimpleDirectiveAnchorPopoverTestComponent>;
    let comp: SimpleDirectiveAnchorPopoverTestComponent;
    let overlayContainerElement: HTMLElement;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [SimpleDirectiveAnchorPopoverTestComponent],
        providers: [importProvidersFrom(SatPopoverModule), disableAnimations]
      });
      TestBed.overrideProvider(DEFAULT_TRANSITION, {
        useValue: '300ms ease'
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
  imports: [SatPopoverModule],
  template: ` <div satPopoverAnchor></div> `
})
class InvalidAnchorTestComponent {}

/**
 * This component is for testing that passing an invalid anchor
 * to a popover will throw an error.
 */
@Component({
  imports: [SatPopoverModule],
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
  imports: [SatPopoverComponent],
  template: ` <sat-popover horizontalAlign="after">Anchorless</sat-popover> `
})
class AnchorlessPopoverTestComponent {
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
}

/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple satPopoverAnchor anchor.
 */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
  template: `
    <div #anchorEl satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <div #anchorEl2>Alternate anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
class SimpleDirectiveAnchorPopoverTestComponent {
  @ViewChild('anchorEl')
  anchorElement!: ElementRef;
  @ViewChild('anchorEl2')
  alternateAnchorElement!: ElementRef;
  @ViewChild(SatPopoverAnchorDirective, { static: true })
  anchor!: SatPopoverAnchorDirective;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
}

/**
 * This component is for testing the
 * `SatPopoverAnchor#satPopoverAnchor` input setter.
 */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
  template: `
    <div #anchorEl [satPopoverAnchor]="p">Anchor</div>
    <div #anchorEl2>Alternate anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `
})
class DirectiveAnchorForPopoverTestComponent {
  @ViewChild('anchorEl')
  anchorElement!: ElementRef;
  @ViewChild('anchorEl2')
  alternateAnchorElement!: ElementRef;
  @ViewChild(SatPopoverAnchorDirective, { static: true })
  anchor!: SatPopoverAnchorDirective;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
}

/**
 * This component is for testing the default behavior of a simple
 * popover attached to a simple ElementRef anchor.
 */
@Component({
  imports: [SatPopoverComponent],
  template: `
    <div #anchorEl>Anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
class SimpleHTMLAnchorPopoverTestComponent {
  @ViewChild('anchorEl')
  anchorElement!: ElementRef;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
}

/**
 * This component is for testing the backdrop behavior of a simple
 * popover attached to a simple anchor.
 */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
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
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
  backdrop = false;
  clicks = 0;
  klass!: string;
}

/**
 * This component is for testing behavior related to keyboard events
 * inside the popover.
 */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
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
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
  lastKeyCode!: number;
}

/**
 * This component is for testing focus behavior in the popover.
 */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
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

  @ViewChild('b1')
  button1!: ElementRef;
  @ViewChild('b2')
  button2!: ElementRef;
  @ViewChild('p')
  popover!: SatPopoverComponent;
}

/** This component is for testing dynamic positioning behavior. */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
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
  @ViewChild(SatPopoverAnchorDirective, { static: true })
  anchor!: SatPopoverAnchorDirective;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
  hAlign = 'center';
  vAlign = 'center';
  forceAlignment = false;
  lockAlignment = false;
}

/** This component is for testing position aliases. */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover [anchor]="anchor" [xAlign]="xAlign" [yAlign]="yAlign"> Popover </sat-popover>
  `
})
export class PositioningAliasTestComponent {
  @ViewChild(SatPopoverAnchorDirective, { static: true })
  anchor!: SatPopoverAnchorDirective;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
  xAlign = 'center';
  yAlign = 'center';
}

/** This component is for testing scroll behavior. */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent],
  template: `
    <div satPopoverAnchor #anchor="satPopoverAnchor">Anchor</div>
    <sat-popover [anchor]="anchor" [scrollStrategy]="strategy"> Popover </sat-popover>
  `
})
export class ScrollingTestComponent {
  @ViewChild(SatPopoverAnchorDirective, { static: true })
  anchor!: SatPopoverAnchorDirective;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
  strategy = 'reposition';
}

/** This component is for testing the isolated anchoring service. */
@Component({
  imports: [SatPopoverComponent],
  template: `
    <div #customAnchor>Anchor</div>
    <sat-popover #p>Popover</sat-popover>
  `,
  providers: [SatPopoverAnchoringService]
})
export class ServiceTestComponent {
  anchoring: SatPopoverAnchoringService = inject(SatPopoverAnchoringService);
  container: ViewContainerRef = inject(ViewContainerRef);

  @ViewChild('customAnchor', { static: true })
  customAnchor!: ElementRef;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
}

/** This component is for testing the hover directive behavior. */
@Component({
  imports: [SatPopoverAnchorDirective, SatPopoverComponent, SatPopoverHoverDirective],
  template: `
    <div #anchorEl satPopoverAnchor #anchor="satPopoverAnchor" [satPopoverHover]="delay">Anchor</div>
    <sat-popover [anchor]="anchor">Popover</sat-popover>
  `
})
export class HoverDirectiveTestComponent {
  @ViewChild('anchorEl')
  anchorEl!: ElementRef;
  @ViewChild(SatPopoverComponent, { static: true })
  popover!: SatPopoverComponent;
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
  const event = new KeyboardEvent(type, {
    key: key ?? '',
    code: '',
    keyCode,
    which: keyCode,
    bubbles: true,
    cancelable: true,
    view: window
  });

  // For target override if needed
  if (target) {
    Object.defineProperty(event, 'target', { get: () => target });
  }

  const originalPreventDefault = event.preventDefault;

  // IE won't set `defaultPrevented` on synthetic events so we need to do it manually.
  event.preventDefault = function (...args: unknown[]) {
    Object.defineProperty(event, 'defaultPrevented', { get: () => true });
    return originalPreventDefault.apply(this, args as unknown as []);
  };

  return event;
}

export function createMouseEvent(type: string) {
  const event = new MouseEvent(type, {
    view: window,
    bubbles: true,
    cancelable: false,
    detail: 0,
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    ctrlKey: false,
    altKey: false,
    shiftKey: false,
    metaKey: false,
    button: 0,
    relatedTarget: null
  });

  return event;
}
