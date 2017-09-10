# SatAttachedOverlay

## Usage

### Quickstart

Wrap any component you want to display in an overlay with `sat-attached-overlay`.

```html
<sat-attached-overlay>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-attached-overlay>
```

Next, hook the overlay to an anchor element.

```html
<button [satOverlayAnchorFor]="contactOverlay">
  See Details
</button>

<sat-attached-overlay #contactOverlay>
  <app-contact-overview [contact]="myContact"></app-contact-overview>
</sat-attached-overlay>
```

Now, whenever the button is clicked, the `<app-contact-overview>` overlay will appear over the
button. If you instead want the overlay to appear below the anchor:

```html
<sat-attached-overlay #contactOverlay yPosition="below">
  <!-- ... -->
</sat-attached-overlay>
```

You can use the following to position the overlay around the anchor:

| Input         | Type                            | Default  |
|---------------|---------------------------------|----------|
| xPosition     | 'before' \| 'center' \| 'after' | 'center' |
| yPosition     | 'above' \| 'center' \| 'below'  | 'center' |
| overlapAnchor | boolean                         | true     |

If you want to respond the events other than anchor clicks, you can disable the click handler
and implement your own:

```html
<button [satOverlayAnchorFor]="contactOverlay" satDisableClick>
  See Details
</button>
```

```ts
@ViewChild(SatOverlayAnchor) anchor: SatOverlayAnchor;

openContactOverlay(): void {
  this.anchor.openOverlay();
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
- Support other methods of building overlays
- Allow more configurability to the focus trap
