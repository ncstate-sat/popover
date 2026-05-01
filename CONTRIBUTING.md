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

### Test Browser Setup
To run tests in Chromium on macOS, you can install it via Homebrew:

```bash
brew install --cask chromium
```

Since you are using Chromium instead of Google Chrome, you must set the `CHROME_BIN` environment variable so Karma can find the binary:

```bash
export CHROME_BIN=/Applications/Chromium.app/Contents/MacOS/Chromium
```

*Tip: Add the line above to your `.zshrc` or `.bash_profile` to make it permanent.*

**Troubleshooting "App is damaged" error:**
If macOS prevents Chromium from opening with a "damaged" error, it is likely due to Gatekeeper. Run the following command to remove the quarantine attribute:

```bash
sudo xattr -rd com.apple.quarantine /Applications/Chromium.app
```

### Running Tests
```bash
npm run test
npm run test:once
```

## Releases

Ensure that the GitHub Actions pipeline passes before merging your PR.

Once the PR is merged into `master`:
- Run `git checkout master && git pull origin master`
- Run the release script: `npm run release`
  > Note: If you have 2FA configured for npm.js (you should), run: `npm run release --otp=XXXXXX`
- Build and publish the demo app: `npm run build:demo && npm run gh-pages`
- Update all the official StackBlitz demos
- Edit the release on GitHub
