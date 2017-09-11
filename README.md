# Popover Component for Angular

## Usage

### Quickstart

Wrap any component you want to display in a popover with `sat-popover`.

```html
<sat-popover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

Next, hook the popover to an anchor element.

```html
<button [satPopoverAnchorFor]="contactPopover">
  See Details
</button>

<sat-popover #contactPopover>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-popover>
```

Now, whenever the button is clicked, the `<app-contact-overview>` popover will appear over the
button. If you instead want the popover to appear below the anchor:

```html
<sat-popover #contactPopover yPosition="below">
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

### Styling

TODO


## Development

### Building

```
npm build
```

### Watching

```
npm watch
```

### Demo server

```
npm start
```

## Other

Built with  [Angular CLI](https://github.com/angular/angular-cli) and
[ng-packagr](https://github.com/dherges/ng-packagr).


## TODO

- Tests 😏
- Directionality support
- Animation callbacks
- Disable escape/backdrop behavior and provide stream of events
- Make it easy to switch scroll strategies
- Review API consistency with Angular Material
- Stop patching globally Rx
- Support other methods of building popovers
- Allow more configurability to the focus trap
