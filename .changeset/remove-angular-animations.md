---
'@ncstate/sat-popover': major
---

Remove the `@angular/animations` dependency

Popover open and close animations are now implemented with native CSS via Angular's `animate.enter`
and `animate.leave`. `@angular/animations` was imported at runtime but never declared as a peer
dependency, and Angular 21's `ng new` no longer installs it — so fresh Angular 21 applications could
not resolve the import. The animations DSL is also deprecated as of Angular 20.2 with intent to
remove in v23.

- **Breaking:** the `SatPopoverComponent.state` and `SatPopoverComponent.params` getters are removed.
  They existed only to feed the Angular animation trigger.
- **Breaking:** popovers now open from `openAnimationStartAtScale` (default `0.3`) rather than from
  `closeAnimationEndAtScale` (default `0.5`). The input was previously documented but had no effect.
- `provideAnimations()` / `provideAnimationsAsync()` are no longer required. Existing calls are
  harmless.
- Added the `SAT_POPOVER_ANIMATIONS` token for disabling animations application-wide. `prefers-reduced-motion`
  is now honored automatically.
- `DEFAULT_TRANSITION` has a default value, so importing the standalone `SatPopoverComponent` without
  `SatPopoverModule` no longer throws a `NullInjectorError`.
