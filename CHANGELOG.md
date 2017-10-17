# 1.0.0-beta.0

### Breaking Changes

* Anchors not longer default to toggling the popover on click. That means you are required to
manually open and close the popover as needed. This is done to prevent prescription of behavior
and to avoid potentially growing the number of "disable apis".
* That means `satDisableClick` has been removed.
* Backdrops are no longer included by default. For the same reason as click behavior, they are now
opt-in. Use `hasBackdrop` on a popover to specify that a backdrop should appear behind it when open.
* That means `disableBackdrop` has been removed.
* `popoverOpen()` on the anchor has been renamed to `isPopoverOpen()`

### Features

* `SatPopover` now has an `isOpen()` method.

### Fixes

* `opened` output of `SatPopover` works now.

### Other

* Tests have been added for the api facing portions. For now, positioning and fallback behavior
still relies on proper testing in the CDK.

# 1.0.0-alpha.3

### Features

* Allow popovers to be opened, closed, or toggled from the component itself, rather than just
the anchor.
* Backdrops can be disabled with the `disableBackdrop` property on the `sat-popover`.
* Backdrops can be customized using the `backdropClass` property on the `sat-popover`.

### Other

* Updates peer @angular/cdk dependency to 2.0.0-beta.12

# 1.0.0-alpha.2

### Fixes

* Inlines resources in the metadata files to enable AOT builds
* Adds more properties to the dist package.json for better display on npm


# 1.0.0-alpha.1

### Fixes

* Ships cdk/overlay component css - needed to properly position the popover
* Cleans up the README and moves a bunch of TODOs to Github's issue tracker
