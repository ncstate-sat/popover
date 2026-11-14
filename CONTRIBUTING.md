# Contributing to Popover

Thanks for your interest in contributing! 🙌

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How to Contribute](#how-to-contribute)
- [Development Setup](#development-setup)
- [Releases](#releases)
- [Troubleshooting](#troubleshooting)

---

## 📜 Code of Conduct

Please read and follow our [Code of Conduct](CODE_OF_CONDUCT.md).

---

## 🛠️ How to Contribute

### 🐛 Bug Fixes & Features

1. Fork the repo
2. Create your feature/fix branch:
   `git checkout -b feat/add-awesome-feature` or `git checkout -b fix/typo-in-readme`
3. Commit your changes using [conventional commits](https://www.conventionalcommits.org/):
   `git commit -m 'feat: add amazing feature'` or `git fix: correct typo in docs`
4. **Add a changeset** (required for releases):
   ```bash
   npx changeset
   # Or comment `/changeset` in your PR and follow prompts
   ```
5. Push to the branch:

   `git push origin feat/add-awesome-feature`

6. Open a Pull Request

| ⚠️ PRs without a .changeset/\*.md file will not trigger a release.

🛠️ Development Setup

```bash
npm install
npm run dev       # starts local dev server (http://localhost:5173)
npm run build     # builds to dist/demo/
npm run test      # runs unit & e2e tests
npm run lint      # runs ESLint + Prettier
```

### All contributions should:

- Pass npm run test and npm run lint
- Follow conventional commits
- Include tests for new features

### 🚀 Releases

We use Changesets for versioning and GitHub Actions for publishing:

- Changesets combines the pending `.changeset/*.md` files into one semver bump (patch, minor, major) and a `CHANGELOG.md` entry
- Pushing the version tag runs the [Release workflow](.github/workflows/release.yml), which publishes to npm and creates the GitHub Release
- No npm token or OTP is needed locally; CI uses the `NPM_TOKEN` repository secret

### How to Publish a New Release

1. Make sure `master` is clean, up to date, and has at least one pending changeset

```bash
git checkout master
git pull origin master
ls .changeset/*.md   # besides README.md
```

2. Run the release script

```bash
npm run release
```

This script (`tools/release.ts`) will:

- Run `npx changeset version` → bumps `package.json`, updates `CHANGELOG.md`, deletes the used changesets
- Run lint, tests, and the library build
- Commit `chore(release): vX.Y.Z` and create an annotated tag `vX.Y.Z` (signed if your git config signs tags)
- Push `master`, then the tag. The tag push starts the Release workflow

It is safe to re-run after a partial failure: an existing release commit or tag is reused.

> 💡 Options:
>
> ```bash
> npm run release -- --dry-run    # version + checks only; revert with: git checkout -- .
> npm run release -- --skip-push  # commit + tag locally, push yourself
> ```

3. **Watch the automated pipeline**
   After pushing, two workflows run automatically:

   | Workflow                                                                                                                   | Trigger                                         | What Happens                                                                                                                                                         | Status Link                                                                                                  |
   | -------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
   | **[Deploy to GitHub Pages](https://github.com/ncstate-sat/popover/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22)** | `push` to `main` (includes `dist/demo` changes) | • Checks out code<br>• Installs Node.js & deps (`npm ci`)<br>• Builds project: `npm run build` → outputs `dist/demo/`<br>• Deploys `dist/demo/` to `gh-pages` branch | [✅ View runs](https://github.com/ncstate-sat/popover/actions?query=workflow%3A%22Deploy+to+GitHub+Pages%22) |
   | **[Release](https://github.com/ncstate-sat/popover/actions/workflows/release.yml)**                                        | `push` of Git tag matching `v*.*.*`             | • Checks the tag matches `package.json`<br>• Lint, test, `npm run build:prod`<br>• `npm publish ./dist/popover`<br>• Creates the GitHub Release from `CHANGELOG.md`  | [🔧 Config](.github/workflows/release.yml)                                                                   |

   🔍 **What to expect**:
   - You’ll see a **yellow “Deploy to GitHub Pages” run** in [Actions](https://github.com/ncstate-sat/popover/actions)
   - After ~1–2 minutes, it turns **green**
   - Your site is now live at:
     👉 **[https://ncstate-sat.github.io/popover/](https://ncstate-sat.github.io/popover/)**
   - The **Release** run publishes to npm and creates a **GitHub Release** at:
     👉 **[https://github.com/ncstate-sat/popover/releases](https://github.com/ncstate-sat/popover/releases)**
   - If it fails (e.g. npm hiccup), fix the cause and re-run it from Actions → Release → **Run workflow** with the tag. Steps that already succeeded are skipped.

4. **Verify the release**
   - `npm view @ncstate/sat-popover version` shows the new version
   - Open `https://ncstate-sat.github.io/popover/`
     → Confirm latest version appears (e.g., new demo components)
   - Open the GitHub Release for `vX.Y.Z`
     → Verify changelog is accurate and complete
   - Check the Git tag:
     🔗 [v1.2.3 tag on GitHub](https://github.com/ncstate-sat/popover/tree/v1.2.3)

---

### 🧠 Behind the Scenes

| Step                      | Tool                                                           | Responsibility                                                  |
| ------------------------- | -------------------------------------------------------------- | --------------------------------------------------------------- |
| ✅ Versioning & changelog | `npx changeset version` (via `tools/release.ts`)               | Reads `.changeset/*.md`, bumps versions, updates `CHANGELOG.md` |
| 🏗️ Build                  | `npm run build`                                                | Compiles source → static site in `dist/demo/`                   |
| 🚀 Deploy                 | [`deploy-gh-pages.yml`](.github/workflows/deploy-gh-pages.yml) | Pushes `dist/demo/` to `gh-pages` branch                        |
| 📦 Publish & release      | [`release.yml`](.github/workflows/release.yml)                 | Publishes `dist/popover` to npm, creates the GitHub Release     |

npm authentication uses the `NPM_TOKEN` repository secret (Settings → Secrets and variables → Actions): an npm [granular access token](https://docs.npmjs.com/creating-and-viewing-access-tokens) with read and write access to `@ncstate/sat-popover`. Tokens expire, so renew the secret before its expiry date or the Release workflow will fail at the publish step.

---

### 📝 How to Add a Changeset Entry (Contributor Guide)

When merging a PR that affects users, **add a changeset** — this tells Changesets _which version bump_ to use (`patch`, `minor`, or `major`).

#### Option 1: Via GitHub PR comment (recommended & simplest)

1. In the PR, comment: `/changeset`
2. GitHub Actions will reply with a message like:
   > ✅ Created changeset PR #123
   > ➜ Please edit the file `.changeset/your-prize-winning-bug-fix.md` to confirm the change type and details.
3. Edit the generated `.changeset/*.md` file:
   - Keep the message concise (e.g., `Fix typo in README`)
   - Ensure the version type is correct:
     ```md
     ---
     '@ncstate/popover': patch
     ---
     ```
     (`patch` = bug/docs, `minor` = new feature, `major` = breaking change)
4. Commit and push the `.changeset/*.md` file — it will be included in the next release.

✅ **No local setup needed** — works directly from GitHub.

---

#### Option 2: Locally with `npx changeset` (interactive prompts)

If you prefer a CLI workflow:

```bash
npx changeset
# Follow prompts:
# 1. Select packages (usually just '@ncstate/popover')
# 2. Choose version bump: patch / minor / major
# 3. Add a summary message
```

Option 3: Manually create .changeset/\*.md (advanced)
Use this if you want full control or want to automate changeset creation:

# Example: create a patch entry manually

echo "---
'@ncstate/popover': patch

---

Fix: Correct typo in popover positioning logic" > .changeset/fix-popover-typo.md
💡 Pro Tip: Keep filenames descriptive (e.g., fix-popover-typo.md, feat-add-animation.md) for easier changelog review.

⚠️ Important

- ✅ All PRs must include a .changeset/\_.md file to be included in a release
- ❌ PRs without changesets will pass CI but will not trigger npm run release
- 🔄 You can edit/update .changeset/\_.md files before merge (e.g., if you realize patch → minor)

> 💡 Tip: To test locally without committing, run:
> npm run build && npx serve dist/demo

### 🛑 Deprecated: Manual Deployment

| Old Command           | Why It’s Retired                                 |
| --------------------- | ------------------------------------------------ |
| `npm run gh-pages`    | Replaced by GitHub Actions — no longer needed    |
| `ngh --dir dist/demo` | Risk of version ↔ deployment mismatch            |
| `gh release create`   | `release-drafter.yml` handles this more reliably |

> 💡 Tip: If you need to test locally _without_ committing, run:
> `npm run build && npx serve dist/demo`

---

## 🧩 Troubleshooting

| Symptom                                              | Fix                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| ❌ `404` on `https://ncstate-sat.github.io/popover/` | Wait 2 mins — deploy still running; check [Actions](https://github.com/ncstate-sat/popover/actions) |
| ❌ Old version still showing                         | Hard refresh (`Cmd+Shift+R`), or check cache: `curl -I https://ncstate-sat.github.io/popover/`      |
| ❌ No GitHub Release draft appears                   | Ensure tag is named `v*` (e.g., `v1.2.3`) — `release-drafter.yml` only triggers on tag push         |
| 🤔 `.changeset` file missing?                        | Run `npx changeset` locally or use `/changeset` in PR comment                                       |

---

✅ **You’re done!** Your release is now:

- 🔒 Version-tracked via semver
- 📄 Changelog-documented
- 🌐 Automatically deployed
- 📦 Ready for users & contributors

For questions, open an issue or ask in the PR — we’re happy to help! 🙌
