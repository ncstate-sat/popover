# Contributing

## Build the library

Ensure you are using the correct Node.js version. This project uses `.node-version` to specify the required version. If you use [fnm](https://github.com/Schniz/fnm), you can run:

```bash
fnm use
```

Then install dependencies and build the library:

```bash
# Standard installation
npm install

# If you encounter peer dependency conflicts (ERESOLVE), use:
npm install --legacy-peer-deps

npm run build
```

## Run the demo server

```bash
npm run demo
```

Open the server [using this link to the localhost](http://localhost:4200)

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
