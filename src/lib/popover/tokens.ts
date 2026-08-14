import { InjectionToken } from '@angular/core';

/**
 * The transition used for a popover's open and close animations when the
 * component's `openTransition` / `closeTransition` inputs are not set.
 *
 * See http://cubic-bezier.com/#.25,.8,.25,1 for reference.
 */
export const DEFAULT_TRANSITION = new InjectionToken<string>('DefaultTransition', {
  providedIn: 'root',
  factory: () => '200ms cubic-bezier(0.25, 0.8, 0.25, 1)'
});

/** Configures how popovers animate. */
export interface SatPopoverAnimationsConfig {
  /** Whether to skip the popover's open and close animations entirely. */
  animationsDisabled?: boolean;
}

/**
 * Opts out of popover animations application-wide. Popovers also skip their
 * animations when the user prefers reduced motion, when `provideNoopAnimations`
 * is used, or when the platform cannot run animations at all.
 */
export const SAT_POPOVER_ANIMATIONS = new InjectionToken<SatPopoverAnimationsConfig>('SatPopoverAnimations');
