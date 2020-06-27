# Releases

1. Check out a branch and edit package version and add changelog entry
2. Run `npm install` again to update package-lock.json
3. Open PR and merge into `master`
4. `git checkout master && git pull origin master``
5. Make sure everything is 👌
6. Run this script via `npm run release`
7. Build and publish the demo app `npm run build:demo && npm run gh-pages`
8. Update all the official StackBlitz demos
9. Edit release on Github
