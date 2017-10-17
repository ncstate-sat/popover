## Contributing

### Demo server

```
npm run demo-app
```

### Build

Build the library into `dist/lib` and copy the library into `node_modules` for the demo app
to use.

```
npm run build && npm run copylib
```

### Watching

```
npm run watch
```

### Testing

Run karma tests

> For now, ignore the warnings in between tests. They are a result of karma trying
to run tests on build output before styles and templates are inlined.

```
npm run test
```
