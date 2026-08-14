import { ANIMATION_MODULE_TYPE } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MediaMatcher } from '@angular/cdk/layout';
import { describe, beforeEach, afterEach, it, expect } from 'vitest';

import { popoverAnimationsDisabled, popoverAnimationsSupported } from './animations-disabled';
import { SAT_POPOVER_ANIMATIONS, DEFAULT_TRANSITION } from './tokens';

/** jsdom has no Web Animations API, so we fake it to reach the DI branches. */
type WithGetAnimations = { getAnimations?: () => Animation[] };

function fakePlatformSupport(): void {
  (document.documentElement as unknown as WithGetAnimations).getAnimations = () => [];
}

function removePlatformSupport(): void {
  delete (document.documentElement as unknown as WithGetAnimations).getAnimations;
}

function noReducedMotion() {
  return { provide: MediaMatcher, useValue: { matchMedia: () => ({ matches: false }) } };
}

describe('popover animation state', () => {
  beforeEach(() => {
    TestBed.resetTestingModule();
    fakePlatformSupport();
  });

  afterEach(() => {
    removePlatformSupport();
  });

  it('reports the platform as unsupported when getAnimations is missing', () => {
    removePlatformSupport();
    expect(popoverAnimationsSupported()).toBe(false);
  });

  it('reports the platform as supported when getAnimations exists', () => {
    expect(popoverAnimationsSupported()).toBe(true);
  });

  it('disables animations when the platform cannot animate', () => {
    removePlatformSupport();
    TestBed.configureTestingModule({ providers: [noReducedMotion()] });

    expect(TestBed.runInInjectionContext(() => popoverAnimationsDisabled())).toBe(true);
  });

  it('disables animations via SAT_POPOVER_ANIMATIONS', () => {
    TestBed.configureTestingModule({
      providers: [noReducedMotion(), { provide: SAT_POPOVER_ANIMATIONS, useValue: { animationsDisabled: true } }]
    });

    expect(TestBed.runInInjectionContext(() => popoverAnimationsDisabled())).toBe(true);
  });

  it('disables animations when ANIMATION_MODULE_TYPE is NoopAnimations', () => {
    TestBed.configureTestingModule({
      providers: [noReducedMotion(), { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }]
    });

    expect(TestBed.runInInjectionContext(() => popoverAnimationsDisabled())).toBe(true);
  });

  it('disables animations when the user prefers reduced motion', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: MediaMatcher, useValue: { matchMedia: () => ({ matches: true }) } }]
    });

    expect(TestBed.runInInjectionContext(() => popoverAnimationsDisabled())).toBe(true);
  });

  it('enables animations when nothing opts out', () => {
    TestBed.configureTestingModule({ providers: [noReducedMotion()] });

    expect(TestBed.runInInjectionContext(() => popoverAnimationsDisabled())).toBe(false);
  });

  it('provides a default transition without an explicit provider', () => {
    TestBed.configureTestingModule({});

    expect(TestBed.inject(DEFAULT_TRANSITION)).toBe('200ms cubic-bezier(0.25, 0.8, 0.25, 1)');
  });
});
