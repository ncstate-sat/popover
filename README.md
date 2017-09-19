# Popover Component for Angular

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

Wrap any component you want to display in a popover with an `<sat-popover>` component.

```html
<sat-popover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

Next, hook the popover to an anchor element.

```html
<button [satPopoverAnchorFor]="contactPopover">
  See Contact Details
</button>

<sat-popover #contactPopover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

By default, whenever the button is clicked, the `<app-contact-overview>` popover will appear
centered over the button. If you instead want the popover to appear below the anchor:

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

> Note: When the `xPosition` and `yPosition` are both `'center'`, `overlapAnchor` will have no
effect.

If you want to respond to events other than anchor clicks, you can disable the click handler
and implement your own:

```html
<button [satPopoverAnchorFor]="contactPopover" satDisableClick>
  See Details
</button>
```

```ts
@ViewChild(SatPopoverAnchor) anchor: SatPopoverAnchor;

openContactPopover(): void {
  this.anchor.openPopover();
}
```

## Styles

The `<sat-popover>` component only provides styles to affect its own transform origin. It is
the responsibility of the elements you project inside the popover to styles themselves. This
includes background color, box shadows, margin offsets, etc.


## Contributing

### Demo server

```
npm run start
```

### Build

Build the library into `dist/lib` and copy the library into `node_modules` for the demo app
to use.

```
npm run build && npm run copylib
```

### Watch

Rebuild the libary on any source changes and copy to `node_modules`.

```
npm run watch
```



