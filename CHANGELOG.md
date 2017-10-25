# 1.0.0-beta.1 flopover-flunkey

### Breaking Changes
The npm package name has changed from `@sat/popover` to `@ncstate/sat-popover`. All class names
and directive selectors are the same.

```
npm uninstall @sat/popover
npm install --save @ncstate/sat-popover
```

```ts
import { SatPopoverModule } from '@ncstate/sat-popover';
```

### Features
* By default, the opening and closing animations of a popover are quick with a simple easing curve.
You can now modify these animation curves using `openTransition` and `closeTransition`.
* By default, when a popover is open and the user scrolls the container, the popover will reposition
itself to stay attached to its anchor. You can now adjust this behavior with `scrollStrategy`.
* RTL support. The popover will now position and animate itself in accordance with the document's
body direction.

### Fixes
* Pressing <kbd>esc</kbd> while focused inside a popover will now properly close the popover.
This was a regression introduced in the last release.
* Changing the position properties of a popover will now apply even if the popover has been opened
before.
* Recreation of the popover waits until it is closed so that the popover isn't disposed while open.

### Other
* An error will be thrown if you try to call the open/close/toggle methods on a popover with
no corresponding anchor.
* An error will be thrown if you try to pass an invalid `xPosition` or `yPosition`
* Refactor of the demo-app to better encapsulate each demo.
* Updated import statement in README (thanks to @julianobrasil)
* Added note to README about `cdkScrollable`


# 1.0.0-beta.0 binaural-bongo

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
