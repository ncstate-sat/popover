<!-- markdownlint-disable -->

# CHANGELOG

## 15.0.0 stuff-gruff

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ~20 or higher.
- Some of the highlights:
  - Stabilizing APIs such as effect, linkedSignal, toSignal, incremental hydration, route-level render mode config and promoting zoneless to developer preview
  - Improved debugging with Angular DevTools and partnering with Chrome for custom Angular reporting directly in Chrome DevTools
  - Polishing developer experience with style guide updates, type checking and language service support for host bindings, support for untagged template literal expressions in templates, template hot module replacement by default, and more.
  - Advancements in GenAI development with llms.txt and angular.dev guides and videos for building Generative AI applications
  - Launching a request for comments for an official mascot for Angular

### Notes

Recommended reading:

- [Announcing Angular v20](https://blog.angular.dev/announcing-angular-v20-b5c9c06cf301)
- [Angular 19-20 Update Guide](https://angular.dev/update-guide?v=19.0-20.0&l=2)

## 14.5.0 doubt-drought

### Breaking Changes

- None

### Notes

- Updated dependencies to resolve moderate build chain vulnerabilities.

## 14.4.0 car-czar

### Breaking Changes

- None

### Notes

- Updated dependencies to resolve moderate build chain vulnerabilities.
- node to 20.17.0
- npm to 11.3.0

## 14.3.0 pale-pale

### Breaking Changes

- None

### Notes

- Updated dependencies to resolve moderate build chain vulnerabilities.

## 14.2.0 overdue-overdo

### Breaking Changes

- None

### Notes

- Updated dependencies to resolve moderate build chain vulnerabilities.

## 14.1.0 need-knead

### Breaking Changes

- None

## 14.0.0 hoarse-horse

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ~19 or higher.
- Angular 19 has made `standalone` components the default, which significantly affects how SatPopover is loaded.

### Notes

Recommended reading:

- [Angular 19 Introduction](https://blog.angular.dev/meet-angular-v19-7b29dfd05b84)
- [Angular 18-19 Update Guide](https://angular.dev/update-guide?v=18.0-19.0&l=1)

**_Bootstrapping has changed!_**

If you want the popover animations to work, you must use `provideAnimations` in your `AppConfig`;
or, if you prefer to not have animations, you can use `provideNoopAnimations` in your `AppConfig`.

```ts
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  // AppConfig
  providers: [
    provideAnimations()
    /* provideNoopAnimations() /* Use if you want to disable animations */
  ]
});
```

Alteranatively, if you still use `bootstrapModule`, you can continue to import `BrowserAnimationsModule` in this manner.

```ts
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  ...
  imports: [
    BrowserAnimationsModule, // Use if you want to enable animations
    /* NoopAnimationsModule  /* Use if you want to disable animations */
  ],
  ...
})
export class AppModule { }
```

**Can I still use modules to import SatPopover?**

Yes. SatPopoverModule can still be imported, although you may still have to import `SatPopoverComponent`,
`SatPopoverAnchorDirective`, or `SatPopoverHoverDirective` as necessary.

```ts
// my-component.module.ts
import { SatPopoverModule } from '@ncstate/sat-popover';

@NgModule({
  ...
  imports: [
    SatPopoverModule,
  ],
  exports: [
    MyComponent
  ],
  ...
})
export class MyComponentModule { }

// my-component.component.ts
import { Component, ViewChild } from '@angular/core';
import { SatPopoverAnchorDirective, SatPopoverComponent } from '@ncstate/sat-popover';

@Component({
  standalone: false,
  selector: 'my-component',
  template: '<button [satPopoverAnchor]="p" (click)="p.toggle()">Click me</button> <sat-popover #p>Hello!</sat-popover>'
})
export class MyComponent {}
```

## 13.1.0 their-there

### Breaking Changes

- None

### Notes

- Peer dependencies of @angular/{\*\*} are now set to ~18.2 or higher
- Addresses some vulnerabilities in dependencies used by Angular's build system.

## 13.0.2 submarine-plumbing

### Breaking Changes

- None

### Notes

- Correcting the npm account for the latest release

## 13.0.1 plain-plane

### Breaking Changes

- None

### Notes

- Peer dependencies of @angular/{\*\*} are now set to ~18.0

## 12.0.1 mellow-hello

### Breaking Changes

- None

### Notes

- @angular/cdk and @angular/material are updated from 17.3.1 to 17.3.2

## 12.0.0 peirz-peers

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ~17.3
- Peer dependencies are re-established in the published `package.json`
  - Constraints are adjusted from patch versions to major versions.

## 11.0.0 jimny-cricket

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^17.1.2
- Any reference to `SatPopover` must be changed to `SatPopoverComponent`.
  This complies with the [Angular style guide](https://angular.io/guide/styleguide#style-02-03).
- tslint is removed in favor of eslint.
- ivy build options are removed and no longer supported, as they are the default.

## 10.3.2 thrice-asnice

- Updated other packages

## 10.3.1 bibbidy-bobbidy

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^16.2.6

## 10.3.0 wobbly-bobbly

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^16.2.4
- `ngcc` removed from `postinstall` hook, as it is no longer required.

## 10.2.2 freaky-deaky

Tagging got screwed up. 10.2.2 is good.

## 10.2.1 silly-vanilly

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^15.1.1.

## 10.1.0 rhyme-thyme

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^15.0.4.

## 10.0.0 holder-boulder

### Breaking Changes

- Peer dependencies of @angular/{\*\*} are now set to ^14.0.4.

## 9.0.1 webpack-schmwebpack

### Fixes

- Webpack issues introduced in v9.0.0

## 9.0.0 funky-monkey

### Breaking Changes (aka Features)

- Peer dependencies of @angular/{\*\*} are now set to ^13.3.6.

## 8.0.1 stinky-skink

### Breaking Changes (aka Features)

- Specifically excluding suppport for IE 9-11

### Fixes

- Transition firing for afterClose now fires after close ;)

## 8.0.0 fowl-owl

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^11.0.0`.

### Fixes

- Transitions not firing after first time bug was killed

## 7.1.0 parakeet-bigfeet

### Features

- Added panelClass option
- Added injection token for default transition
- Added ability to customizable scale values for animation
- General cleanup, and added git hook/package script for linting

### Fixes

- Demo build wasn't building

## 7.0.0 matzah-pasta

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^11.0.0`.

## 6.0.0 whatza-pizza

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^10.0.*`.

## 5.0.0 schmock-frock

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^9.0.4`.

## 4.0.0 quarrel-squirrel

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^8.0.0`.
- Dynamic Anchors are now available. See README for more information on this breaking change.
- No significant changes from v3.3.0, just bumping version via `semver` protocol.

## 3.3.0 vigorous-tigress (obsoleted with v4.0.0)

### Breaking Changes (aka Features)

- Peer dependencies of `@angular/{core,common,cdk}` are now set to `^8.0.0`.
- Dynamic Anchors are now available. See README for more information on this breaking change.

## 3.2.0 yttrium-atrium

### Features

- You can now use the [`SatPopoverHoverDirective`](https://github.com/ncstate-sat/popover/blob/master/README.md#hover)
  which provides built in hover and delay mechanics (thank you @Abrissirba!). Add the directive
  to any child element of the anchor and supply an optional delay.

## 3.1.0 cactus-malpractice

### Features

- Focus restoration can now be disabled via the [`restoreFocus`](https://github.com/ncstate-sat/popover/blob/master/README.md#focus-behavior)
  property.
- The popover/anchor now have `realign`/`realignPopover` methods to realign the popover to
  the anchor in case the anchor's size or position changes.
- The anchor now has a `getElement` method for getting the anchor's `elementRef`.
- The `open` and `openPopover` methods now support an optional `SatPopoverOpenOptions` object where
  `autoFocus` and `restoreFocus` options can be set while opening the popover. Note that these
  options do no take precendence over the component inputs. For example, if `restoreFocus`
  is set to `false` either in the open options or via the component input, focus will not be restored.

## 3.0.0 reliance-compliance

### Breaking Changes

Peer dependencies of `@angular/{core,common,cdk}` are now set to `^7.0.0`.

### Other

- Build library before tagging release

## 2.1.1 daybreak-cheesecake

### Other

- Copy README to published package so it shows up on npm
- Add current version number to the demo/development app

## 2.1.0 refactor-benefactor

### Features

- `SatPopoverAnchoringService` is now exposed as part of the public api. This allows you to
  build your own directives and services to anchor popovers to any element. An easier-to-use
  service is forthcoming.

### Other

- Internally use the `@angular/cli` for the build/test toolchain. This thankfully gets rid of
  a bunch of the hokey build scripts and will ease future development. There should be no
  change from the end-user's perspective.

## 2.0.0 linchpin-luncheon

### Breaking Changes

Peer dependencies of `@angular/{core,common,cdk}` are now set to `^6.0.0`.

### Fixes

- RxJS and CDK rollup globals have been fixed for ng 6 update (thank you @aitboudad!)

### Other

- Internally use the FlexibleConnectedPositionStrategy for connected positioning. This uses the
  same logic as the ConnectedPositionStrategy did previously, so it should not break or change
  any behavior.

## 2.0.0-beta.0 unanimous-uniform

### Breaking Changes

Peer dependencies of `@angular/{core,common,cdk}` are now set to `>=6.0.0-rc.0 <7.0.0`. These will be
updated to `^6.0.0` in the popover's `2.0.0` release.

## 1.0.0 popover-panda

The API seems pretty stable, so 1.0.0 it is!

### Features

- By default, the popover will spin through a couple fallback alignments when the specified one
  does not fit within the viewport. This can be troublesome if your popover requires some cardinal
  relationship with your anchor (e.g. tooltip caret). You can now use `forceAlignment` to ensure
  the alignment you've chosen is the one used.
- By default, when the user scrolls (or changes the viewport size), the popover will continue
  to use the fallbacks to remain within the viewport. This is potentially distracting, so you can
  now use `lockAlignment` to ensure the popover maintains the same alignment as long as it is open.
  It will be recalculated the next time the popover is opened.

## 1.0.0-beta.5 cryptographic-cereal

### Features

- Autofocus behavior can be disabled via [`autoFocus`](https://github.com/ncstate-sat/popover/blob/master/README.md#focus-behavior).
- Interactive closing actions (i.e. backdrop clicks and escape key) can now be disabled via [`interactiveClose`](https://github.com/ncstate-sat/popover/blob/master/README.md#interactive-closing). You can still use the `(backdropClicked)` and `(overlayKeydown)` outputs to catch those events.

### Fixes

- Popover directionality now works with `dir` set on elements other than `<body>`.

### Other

- In preparation of support for popovers being anchored and opened via a service, the overlay
  logic has been refactored out of the anchor directive and into another service. This should have
  no impact on the usage of the popover.

## 1.0.0-beta.4 rezoned-rhombus

### Breaking Changes

Peer dependency of `@angular/cdk` is now set to `^5.0.0`.

## 1.0.0-beta.3 karmic-kismet

### Breaking Changes

Peer dependency of `@angular/cdk` is now set to `^5.0.0-rc.1`.

### Features

- The popover now has `backdropClicked` and `overlayKeydown` outputs.

### Fixes

- The last release had a regression where the transform origin wouldn't update when the position
  changed. This would cause the popover to sometimes animate to or from the wrong direction.

### Other

- Check the new [speed dial demo](https://ncstate-sat.github.io/popover)
- Using the test runner is way less obnoxious
- Build script is somewhat simplified by not required extra tsconfigs
- The popover is now closed with the overlay keydown stream instead of a keydown handler in the
  template. This means that even popovers without focusable elements can be closed with
  <kbd>esc</kbd>. Try it on a tooltip.
- Rudimentary Travis tests are in place with some sweet new badges in the README

## 1.0.0-beta.2 deserting-descartes

### Breaking Changes

The biggest change this release is how positioning the popover works. You can now align
popovers at the `start` or `end` of the anchor, on either or both axes. This removes the need to
have an `overlapAnchor` option. Further, to better describe the intention of the positioning
parameters, `xPosition` has been renamed to `horizontalAlign` and `yPosition` has been renamed to
`verticalAlign`.

We hope these two changes will make it easier to depict a mental model of the expected behavior.
It also gives you 8 more possible positions!

This table should give you an idea of how to migrate:

| Previously                                | Currently                 |
| ----------------------------------------- | ------------------------- |
| `xPosition="before" overlapAnchor="true"` | `horizontalAlign="end"`   |
| `xPosition="after" overlapAnchor="false"` | `horizontalAlign="after"` |
| `yPosition="below" overlapAnchor="true"`  | `verticalAlign="start"`   |
| `yPosition="above" overlapAnchor="false"` | `verticalAlign="above"`   |

For convenience, aliases have also been provided

| Input             | Alias    |
| ----------------- | -------- |
| `horizontalAlign` | `xAlign` |
| `verticalAlign`   | `yAlign` |

The following have also been renamed:

- `SatPopoverPositionX` -> `SatPopoverHorizontalAlign`
- `SatPopoverPositionY` -> `SatPopoverVerticalAlign`

### Features

- Add `start` and `end` options to `horizontalAlign` and `verticalAlign`.
- Use better fallback strategy that originates from target alignment
- The popover now has `afterOpen` and `afterClose` outputs that emit when the animation is complete
- The popover now has a `'close'` scroll strategy. It will close itself whenever the parent
  container is scrolled.

### Fixes

- Switch to rxjs lettable operators to avoid polluting user's global Rx prototype
- Allow user to declare popover eariler in a template than the anchor

### Other

- Fix typo in readme
- Publish demo app at https://ncstate-sat.github.io/popover/
- Add stacblitz starter to readme and issue template
- Rename 'position' to 'align' and 'x/y' to 'horizontal/vertical'
- Support cdk @ 5.0.0-rc0 and Angular 5

## 1.0.0-beta.1 flopover-facsimile

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

- By default, the opening and closing animations of a popover are quick with a simple easing curve.
  You can now modify these animation curves using `openTransition` and `closeTransition`.
- By default, when a popover is open and the user scrolls the container, the popover will reposition
  itself to stay attached to its anchor. You can now adjust this behavior with `scrollStrategy`.
- RTL support. The popover will now position and animate itself in accordance with the document's
  body direction.

### Fixes

- Pressing <kbd>esc</kbd> while focused inside a popover will now properly close the popover.
  This was a regression introduced in the last release.
- Changing the position properties of a popover will now apply even if the popover has been opened
  before.
- Recreation of the popover waits until it is closed so that the popover isn't disposed while open.

### Other

- An error will be thrown if you try to call the open/close/toggle methods on a popover with
  no corresponding anchor.
- An error will be thrown if you try to pass an invalid `xPosition` or `yPosition`
- Refactor of the demo-app to better encapsulate each demo.
- Updated import statement in README (thanks to @julianobrasil)
- Added note to README about `cdkScrollable`

## 1.0.0-beta.0 binaural-bongo

### Breaking Changes

- Anchors not longer default to toggling the popover on click. That means you are required to
  manually open and close the popover as needed. This is done to prevent prescription of behavior
  and to avoid potentially growing the number of "disable apis".
- That means `satDisableClick` has been removed.
- Backdrops are no longer included by default. For the same reason as click behavior, they are now
  opt-in. Use `hasBackdrop` on a popover to specify that a backdrop should appear behind it when open.
- That means `disableBackdrop` has been removed.
- `popoverOpen()` on the anchor has been renamed to `isPopoverOpen()`

### Features

- `SatPopover` now has an `isOpen()` method.

### Fixes

- `opened` output of `SatPopover` works now.

### Other

- Tests have been added for the api facing portions. For now, positioning and fallback behavior
  still relies on proper testing in the CDK.

## 1.0.0-alpha.3

### Features

- Allow popovers to be opened, closed, or toggled from the component itself, rather than just
  the anchor.
- Backdrops can be disabled with the `disableBackdrop` property on the `sat-popover`.
- Backdrops can be customized using the `backdropClass` property on the `sat-popover`.

### Other

- Updates peer @angular/cdk dependency to 2.0.0-beta.12

## 1.0.0-alpha.2

### Fixes

- Inlines resources in the metadata files to enable AOT builds
- Adds more properties to the dist package.json for better display on npm

## 1.0.0-alpha.1

### Fixes

- Ships cdk/overlay component css - needed to properly position the popover
- Cleans up the README and moves a bunch of TODOs to Github's issue tracker
<!-- markdownlint-enable -->
