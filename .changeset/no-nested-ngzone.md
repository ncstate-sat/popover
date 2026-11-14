---
'@ncstate/sat-popover': patch
---

fix(popover): stop `SatPopoverModule` from providing `provideZoneChangeDetection()` (#364)

Importing `SatPopoverModule` into a standalone component (directly or through another standalone component) created a nested `NgZone`, so `NgZone.runOutsideAngular()` could still run inside the Angular zone and trigger change detection. The module no longer configures change detection; the application's bootstrap providers decide.

The popover now also marks itself for check when the overlay changes position, so alignment classes update in zoneless applications.

If your application relies on Zone.js, make sure `provideZoneChangeDetection()` is in your bootstrap providers rather than relying on the popover module to supply it.
