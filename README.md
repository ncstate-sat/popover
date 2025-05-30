# Popover Component for Angular

[![npm version](https://badge.fury.io/js/%40ncstate%2Fsat-popover.svg)](https://badge.fury.io/js/%40ncstate%2Fsat-popover)
[![Build Status](https://travis-ci.org/ncstate-sat/popover.svg?branch=master)](https://travis-ci.org/ncstate-sat/popover)

[Demo](https://stackblitz.com/edit/ncstate-sat-popover-examples) |
[StackBlitz Template](https://stackblitz.com/edit/ncstate-sat-popover-issues) |
[Development App](https://ncstate-sat.github.io/popover/)

## Installation

`sat-popover` has a peer dependency on the Angular CDK to leverage its overlay API.

```bash
npm install --save @ncstate/sat-popover @angular/cdk
```

```ts
import { AppRootComponent } from './app-root.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SatPopoverModule } from '@ncstate/sat-popover';

bootstrapApplication(AppRootComponent, {
  // AppConfig
  providers: [
    // If you want the popover animations to work, you must use `provideAnimations` or `provideAnimationsAsync`.
    provideAnimationsAsync(),

    // If your application requires animations on immediate load, use `provideAnimations` instead.
    // provideAnimations(),

    // If you prefer to not have animations, you can use `provideNoopAnimations`.
    // provideNoopAnimations(),

    importProvidersFrom(SatPopoverModule)
  ]
});
```

Finally, import the `SatPopoverModule` as needed to provide the necessary components and directives.

```ts
import { Component } from '@angular/core';
import { SatPopoverAnchorDirective, SatPopoverComponent } from '@ncstate/sat-popover';

@Component({
  imports: [ SatPopoverAnchorDirective, SatPopoverComponent ],
  selector: 'my-component',
  template: `
    <button [satPopoverAnchor]="myPopover"
      (mouseenter)="myPopover.open()"
      (mouseleave)="myPopover.close()">Hover me</button>
    <sat-popover #myPopover>Hello!</sat-popover>
  `
})
```

## Usage

### Getting started

Wrap any component you want to display in a popover with an `<sat-popover>` component.

```html
<sat-popover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

Next, apply the `satPopoverAnchor` directive to the element you wish to be the popover anchor and pass the `<sat-popover>` component as an argument to the `satPopoverAnchor` directive.

```html
<button [satPopoverAnchor]="popover" (click)="popover.toggle()"> See Contact Details </button>

<sat-popover #popover hasBackdrop>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

> Note: `hasBackdrop` is explained below

Alternatively, supply an anchor element to the popover.

```html
<button satPopoverAnchor #anchor="satPopoverAnchor" (click)="anchor.popover.toggle()"> See Contact Details </button>

<sat-popover [anchor]="anchor" hasBackdrop>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

### Alignment

By default, the popover will appear centered over the anchor. If you instead want the popover
to appear below the anchor:

```html
<sat-popover verticalAlign="below">
  <!-- ... -->
</sat-popover>
```

You can use the following to align the popover around the anchor:

| Input             | Type                                                | Default  |
| ----------------- | --------------------------------------------------- | -------- |
| `horizontalAlign` | 'before' \| 'start' \| 'center' \| 'end' \| 'after' | 'center' |
| `verticalAlign`   | 'above' \| 'start' \| 'center' \| 'end' \| 'below'  | 'center' |

For convenience, you can also use `xAlign` and `yAlign` as shorthand for `horizontalAlign`
and `verticalAlign`, respectively.

By default, if the popover cannot fully fit within the viewport, it will use a fallback
alignment. You can use `forceAlignment` to ensure that the popover always displays
with the alignment you've specified.

```html
<sat-popover verticalAlign="below" forceAlignment>
  <!-- This will always open below the anchor, even if it falls outside the viewport. -->
</sat-popover>
```

Also by default, as the user scrolls or changes the viewport size, the popover will attempt
to stay within the viewport by using a fallback position (provided `forceAlignment` is not
set). You can use `lockAlignment` to ensure the popover does not change its alignment once
opened.

```html
<sat-popover lockAlignment>
  <!-- This will open as normal, but not change alignment while open. -->
</sat-popover>
```

### Opening and closing

You are in full control of when the popover opens and closes. You can hook into any event or
trigger that fits your application's needs.

#### `SatPopover` has the following methods and outputs

| Method  | Description                                  |
| ------- | -------------------------------------------- |
| open    | Open the popover.                            |
| close   | Close the popover. Optionally takes a value. |
| toggle  | Toggle the popover open or closed.           |
| isOpen  | Get whether the popover is presently open.   |
| realign | Realign the popover to the anchor.           |

| Output          | Description                                                       |
| --------------- | ----------------------------------------------------------------- |
| opened          | Emits when the popover is opened.                                 |
| closed          | Emits when the popover is closed.                                 |
| afterOpen       | Emits when the popover has finished opening.                      |
| afterClose      | Emits when the popover has finished closing.                      |
| backdropClicked | Emits when the popover's backdrop (if enabled) is clicked.        |
| overlayKeydown  | Emits when a keydown event is targeted to this popover's overlay. |

#### `SatPopoverAnchor` has the following properties

| Property                  | Description                                       |
| ------------------------- | ------------------------------------------------- |
| popover                   | A handle to the associated popover.               |
| satPopoverAnchor (setter) | An `@Input()` for setting the associated popover. |
| elementRef                | The ElementRef for with the anchor.               |
| viewContainerRef          | The ViewContainerRef for the anchor.              |

### Focus behavior

By default, the popover will apply focus to the first tabbable element when opened and trap focus
within the popover until closed. If the popover does not contain any focusable elements, focus
will remain on the most recently focused element.

You can target a different element for initial focus using the `cdkFocusInitial` attribute.

To prevent focus from automatically moving into the popover, you can set the `autoFocus` property
to `false`.

```html
<sat-popover [autoFocus]="false">
  <!-- ... -->
</sat-popover>
```

Once the popover is closed, focus will return to the most recently focused element prior to
opening the popover. To disable this, you can set the `restoreFocus` property to `false`.

```html
<sat-popover [restoreFocus]="false">
  <!-- ... -->
</sat-popover>
```

Alternatively the `open` method supports an optional `SatPopoverOpenOptions`
object where `autoFocus` and `restoreFocus` options can be set while opening the popover. Note
that these options do no take precendence over the component inputs. For example, if `restoreFocus`
is set to `false` either in the open options or via the component input, focus will not be
restored.

```html
<button (click)="popover.open({ restoreFocus: false })"> Open </button>
```

### Backdrop

You can add a fullscreen backdrop that appears behind the popover when it is open. It prevents
interaction with the rest of the application and will automatically close the popover when
clicked. To add it to your popover, use `hasBackdrop`.

```html
<sat-popover #myBlockingPopover hasBackdrop>
  <!-- ... -->
</sat-popover>
```

If used, the default backdrop will be transparent. You can add any custom backdrop class with
`backdropClass`.

```html
<sat-popover #myBlockingPopover hasBackdrop backdropClass="app-fancy-backdrop">
  <!-- ... -->
</sat-popover>
```

> Note: if you plan on using `mouseenter` and `mouseleave` events to open and close your popover,
> keep in mind that a backdrop will block pointer events once it is open, immediately triggering
> a `mouseleave` event.

### Overlay panel

You can add custom css classes to the overlay panel that wraps the popover.

```html
<sat-popover panelClass="app-fancy-panel">
  <!-- ... -->
</sat-popover>
```

### Interactive closing

If your popover has a backdrop, it will automatically close when clicked. The popover will also
automatically close when <kbd>esc</kbd> is pressed. These two behaviors are wrapped in the
`interactiveClose` property, which defaults to `true`. Set `interactiveClose` to `false` to prevent
the popover from automatically closing on these user interactions.

```html
<sat-popover hasBackdrop [interactiveClose]="false">
  <!-- ... -->
</sat-popover>
```

If you wish to only disable the automatic <kbd>esc</kbd> behavior, you must disable all
interactive close options and then manually react to `backdropClicked` events.

```html
<sat-popover #p hasBackdrop [interactiveClose]="false" (backdropClicked)="p.close()">
  <!-- ... -->
</sat-popover>
```

### Scrolling

By default, when a popover is open and the user scrolls the container, the popover will reposition
itself to stay attached to its anchor. You can adjust this behavior with `scrollStrategy`.

```html
<sat-popover #importantPopover scrollStrategy="block">
  <!-- so important that the user must interact with it -->
</sat-popover>
```

| Strategy       | Description                                 |
| -------------- | ------------------------------------------- |
| `'noop'`       | Don't update position.                      |
| `'block'`      | Block page scrolling while open.            |
| `'reposition'` | Reposition the popover on scroll (default). |
| `'close'`      | Close the popover on scroll.                |

> Note: if your popover fails to stay anchored with the `reposition` strategy, you may need to add
> the [`cdkScrollable`](https://material.angular.io/cdk/scrolling/overview) directive to your
> scrolling container. This will ensure scroll events are dispatched to the popover's positioning
> service.

### Animations

By default, the opening and closing animations of a popover are quick with a simple easing curve.
You can modify these animation curves using `openTransition` and `closeTransition`.

```html
<!-- open slowly but close quickly -->
<sat-popover #mySlowPopover openTransition="1000ms ease-out" closeTransition="100ms ease-in">
  <!-- ... -->
</sat-popover>
```

You can also modify the default transition globally by adding a custom value to the
`DEFAULT_TRANSITION` provider.

```ts
import { SatPopoverModule, DEFAULT_TRANSITION } from '@ncstate/sat-popover';

@NgModule({
  ...
  imports: [ SatPopoverModule ],
  providers: [
    { provide: DEFAULT_TRANSITION, useValue: '300ms ease' }
  ]
  ...
})
export class AppModule { }
```

Additionally you can modify the scale values for the opening (`startAtScale`) and closing (`endAtScale`) animations.

```html
<!-- very subtle scale animation -->
<sat-popover #mySubtlePopover openAnimationStartAtScale="0.95" closeAnimationEndAtScale="0.95">
  <!-- ... -->
</sat-popover>
```

## Styles

The `<sat-popover>` component only provides styles to affect its own transform origin. It is
the responsibility of the elements you project inside the popover to style themselves. This
includes background color, box shadows, margin offsets, etc.

## Add-on behaviors

### Hover

The `SatPopoverHoverDirective` is available as a way to automatically add hover logic to your
anchor with an optional delay. The `SatPopoverHoverDirective` must be used in conjunction
with `SatPopoverAnchor`.

```html
<div satPopoverAnchor [satPopoverHover]="1000"> Hover to show tooltip after 1 second </div>
```

```html
<div satPopoverAnchor> Hover <span satPopoverHover>this text</span> to show tooltip immediately </div>
```
