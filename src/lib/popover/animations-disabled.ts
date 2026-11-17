import { MediaMatcher } from '@angular/cdk/layout';
import { ANIMATION_MODULE_TYPE, inject } from '@angular/core';

import { SAT_POPOVER_ANIMATIONS } from './tokens';

/**
 * Whether the platform can run animations that Angular's `animate.enter` and
 * `animate.leave` will observe.
 *
 * This mirrors Angular's own internal check. Without `Element.getAnimations` —
 * which is the case in jsdom and during server-side rendering — Angular registers
 * neither hook, so nothing will ever report an animation as finished and the
 * popover must complete its open/close work itself.
 */
export function popoverAnimationsSupported(): boolean {
  return typeof document !== 'undefined' && typeof document.documentElement?.getAnimations === 'function';
}

/**
 * Whether the popover should skip its open and close animations.
 *
 * Must be called within an injection context.
 */
export function popoverAnimationsDisabled(): boolean {
  if (!popoverAnimationsSupported()) {
    return true;
  }

  if (inject(SAT_POPOVER_ANIMATIONS, { optional: true })?.animationsDisabled) {
    return true;
  }

  if (inject(ANIMATION_MODULE_TYPE, { optional: true }) === 'NoopAnimations') {
    return true;
  }

  return inject(MediaMatcher).matchMedia('(prefers-reduced-motion)').matches;
}
