# To publish:
# 1. Check out a branch and edit package version and add changelog entry
# 2. Run `npm install` again to update package-lock.json
# 3. Open PR and merge into `master`
# 4. `git checkout master && git pull origin master``
# 5. Make sure everything is 👌
# 6. Run this script `bash scripts/publish.sh`

NC='\033[0m' # No Color
GREEN='\033[0;32m'

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

printf "\n${GREEN}Tagging with ${PACKAGE_VERSION}\n${NC}"

git tag v${PACKAGE_VERSION}
git push --tags

printf "\n${GREEN}Building\n${NC}"

npm run build && cd dist/lib

printf "\n${GREEN}Publishing\n${NC}"

npm publish
