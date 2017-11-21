# Popover Component for Angular

[![npm version](https://badge.fury.io/js/%40ncstate%2Fsat-popover.svg)](https://badge.fury.io/js/%40ncstate%2Fsat-popover)
[![Build Status](https://travis-ci.org/ncstate-sat/popover.svg?branch=master)](https://travis-ci.org/ncstate-sat/popover)

[Demo](https://stackblitz.com/edit/sat-popover-examples) |
[StackBlitz Template](https://stackblitz.com/edit/sat-popover-issues) |
[Development App](https://ncstate-sat.github.io/popover/)

## Installation

`sat-popover` has a peer dependency on the Angular CDK to leverage its overlay API.

```
npm install --save @ncstate/sat-popover @angular/cdk
```

If you want the popover animations to work, you must include `BrowserAnimationsModule` in your app.

```ts
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [ BrowserAnimationsModule ],
  ...
})
export class AppModule { }
```

If you prefer to not have animations, you can include `NoopAnimationsModule`.

```ts
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [ NoopAnimationsModule ],
  ...
})
export class AppModule { }
```

Finally, import the `SatPopoverModule` to provide the necessary components and directives.

```ts
import { SatPopoverModule } from '@ncstate/sat-popover';

@NgModule({
  ...
  imports: [ SatPopoverModule ],
  ...
})
export class AppModule { }
```

## Usage

### Getting started

Wrap any component you want to display in a popover with an `<sat-popover>` component.

```html
<sat-popover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

Next, hook the popover to an anchor element.

```html
<button [satPopoverAnchorFor]="contactPopover" (click)="contactPopover.toggle()">
  See Contact Details
</button>

<sat-popover #contactPopover hasBackdrop>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

> Note: `hasBackdrop` is explained below

### Alignment

By default, the popover will appear centered over the anchor. If you instead want the popover
to appear below the anchor:

```html
<sat-popover #contactPopover verticalAlign="below">
  <!-- ... -->
</sat-popover>
```

You can use the following to align the popover around the anchor:

| Input             | Type                                                | Default  |
|-------------------|-----------------------------------------------------|----------|
| `horizontalAlign` | 'before' \| 'start' \| 'center' \| 'end' \| 'after' | 'center' |
| `verticalAlign`   | 'above'  \| 'start' \| 'center' \| 'end' \| 'below' | 'center' |

For convenience, you can also use `xAlign` and `yAlign` as shorthand for `horizontalAlign`
and `verticalAlign`, respectively.

### Opening and closing

You are in full control of when the popover opens and closes. You can hook into any event or
trigger that fits your application's needs.

#### `SatPopover` has the following methods and outputs

| Method | Description                                  |
|--------|----------------------------------------------|
| open   | Open the popover.                            |
| close  | Close the popover. Optionally takes a value. |
| toggle | Toggle the popover open or closed.           |
| isOpen | Get whether the popover is presently open.   |

| Output          | Description                                                       |
|-----------------|-------------------------------------------------------------------|
| opened          | Emits when the popover is opened.                                 |
| closed          | Emits when the popover is closed.                                 |
| afterOpen       | Emits when the popover has finished opening.                      |
| afterClose      | Emits when the popover has finished closing.                      |
| backdropClicked | Emits when the popover's backdrop (if enabled) is clicked.        |
| overlayKeydown  | Emits when a keydown event is targeted to this popover's overlay. |

#### `SatPopoverAnchor` has the following methods and outputs

| Method        | Description                                  |
|---------------|----------------------------------------------|
| openPopover   | Open the popover.                            |
| closePopover  | Close the popover. Optionally takes a value. |
| togglePopover | Toggle the popover open or closed.           |
| isPopoverOpen | Get whether the popover is presently open.   |

| Output        | Description                       |
|---------------|-----------------------------------|
| popoverOpened | Emits when the popover is opened. |
| popoverClosed | Emits when the popover is closed. |

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
keep in mind that a backdrop will block pointer events once it is open, immediately triggering
a `mouseleave` event.

### Scrolling

By default, when a popover is open and the user scrolls the container, the popover will reposition
itself to stay attached to its anchor. You can adjust this behavior with `scrollStrategy`.

```html
<sat-popover #importantPopover scrollStrategy="block">
  <!-- so important that the user must interact with it -->
</sat-popover>
```

| Strategy       | Description
|----------------|------------------------------------------------
| `'noop'`       | Don't update position.
| `'block'`      | Block page scrolling while open.
| `'reposition'` | Reposition the popover on scroll (default).
| `'close'`      | Close the popover on scroll.

> Note: if your popover fails to stay anchored with the `reposition` strategy, you may need to add
the [`cdkScrollable`](https://material.angular.io/cdk/scrolling/overview) directive to your
scrolling container. This will ensure scroll events are dispatched to the popover's positioning
service.

### Animations

By default, the opening and closing animations of a popover are quick with a simple easing curve.
You can modify these animation curves using `openTransition` and `closeTransition`.

```html
<!-- open slowly but close quickly -->
<sat-popover #mySlowPopover
    openTransition="1000ms ease-out"
    closeTransition="100ms ease-in">
  <!-- ... -->
</sat-popover>
```

## Styles

The `<sat-popover>` component only provides styles to affect its own transform origin. It is
the responsibility of the elements you project inside the popover to style themselves. This
includes background color, box shadows, margin offsets, etc.
