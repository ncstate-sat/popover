# Contributing

## Build the library

```bash
npm run build
```

## Run the demo server

```bash
npm run demo
```

Open the server [here](http://localhost:4200)

## Testing

```bash
npm run test
npm run test:once
```

## Releases

- Check out a branch and edit package version and add changelog entry
- Run `npm install` again to update `package-lock.json`
- Open PR and merge into `master`
- Run `git checkout master && git pull origin master`
- Make sure everything is 👌
- Run this script via `npm run release`

  > Note: If you have 2FA configured for npm.js (and you should), run: `npm run release --otp=XXXXXX`

- Build and publish the demo app `npm run build:demo && npm run gh-pages`
- Update all the official StackBlitz demos
- Edit release on Github
