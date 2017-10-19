# Popover Component for Angular

[StackBlitz Demo](https://stackblitz.com/edit/sat-popover-examples)

## Installation

SAT Popover has a peer dependency on the Angular CDK to leverage its overlay API.

```
npm install --save @sat/popover @angular/cdk
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
import { SatPopoverModule } from '@angular/material';

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

### Positioning

By default, the popover will appear centered over the button. If you instead want the popover
to appear below the anchor:

```html
<sat-popover #contactPopover yPosition="below" [overlapAnchor]="false">
  <!-- ... -->
</sat-popover>
```

You can use the following to position the popover around the anchor:

| Input         | Type                            | Default  |
|---------------|---------------------------------|----------|
| xPosition     | 'before' \| 'center' \| 'after' | 'center' |
| yPosition     | 'above' \| 'center' \| 'below'  | 'center' |
| overlapAnchor | boolean                         | true     |

> Note: When `xPosition` and `yPosition` are both `'center'`, `overlapAnchor` will have no
effect.

### Opening and closing

You are in full control of when the popover opens and closes. You can hook into any event or
trigger that fits your application's needs.

`SatPopover` has the following methods,

* `open`
* `close`
* `toggle`

`SatPopoverAnchor` has similar methods,

* `openPopover`
* `closePopover`
* `togglePopover`

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
the responsibility of the elements you project inside the popover to styles themselves. This
includes background color, box shadows, margin offsets, etc.
