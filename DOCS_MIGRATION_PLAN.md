# Docs Migration Plan: Move docs from /Ibralogue to /docs

## Goal

Move the documentation site from `ibralogue.github.io/Ibralogue/` to `ibralogue.github.io/docs/` by deploying the docfx build output into the `ibralogue.github.io` landing page repo instead of using the `Ibralogue/Ibralogue` repo's own GitHub Pages.

## Context

- **Landing page repo:** `Ibralogue/ibralogue.github.io` — deploys to `ibralogue.github.io` via GitHub Actions
- **Library repo:** `Ibralogue/Ibralogue` — contains `Documentation~/` with docfx source files
- **Current docs URL:** `ibralogue.github.io/Ibralogue/` (served by GitHub Pages on the library repo)
- **Target docs URL:** `ibralogue.github.io/docs/`
- The landing page uses Vite, which copies everything in `public/` to `dist/` at build time untouched

## Prerequisites

Create a **fine-grained Personal Access Token** (PAT) with:
- **Repository access:** `Ibralogue/ibralogue.github.io` only
- **Permissions:** `contents: write`
- Store it as a secret named `DOCS_DEPLOY_TOKEN` in `Ibralogue/Ibralogue` repo settings (Settings > Secrets and variables > Actions)

---

## Changes in `Ibralogue/Ibralogue` (library repo)

### 1. Create `.github/workflows/deploy-docs.yml`

```yaml
name: Deploy Docs

on:
  push:
    branches: [dev]
    paths:
      - 'Documentation~/**'
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build docfx
        uses: nikeee/docfx-action@v1.0.0
        with:
          args: Documentation~/docfx.json

      - name: Push docs to landing page repo
        env:
          GH_TOKEN: ${{ secrets.DOCS_DEPLOY_TOKEN }}
        run: |
          git clone https://x-access-token:${GH_TOKEN}@github.com/Ibralogue/ibralogue.github.io.git landing
          rm -rf landing/public/docs
          cp -r _site landing/public/docs
          cd landing
          git config user.name "github-actions[bot]"
          git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
          git add public/docs
          git diff --staged --quiet && echo "No docs changes" && exit 0
          git commit -m "docs: update from Ibralogue/Ibralogue@${GITHUB_SHA::7}"
          git push
```

**What this does:**
- Triggers on pushes to `dev` that touch `Documentation~/` files, plus manual dispatch
- Builds the docfx site (outputs to `_site/` at repo root, per the `docfx.json` config `"dest": "../_site"`)
- Clones the landing page repo, replaces `public/docs/` with the fresh build, commits, pushes
- Skips the commit if nothing changed (`git diff --staged --quiet`)
- Uses GitHub's official bot identity for the commit author

### 2. Update `Documentation~/docfx.json`

Update the sitemap base URL:

```diff
  "sitemap": {
-   "baseUrl": "https://ibralogue.github.io/Ibralogue",
+   "baseUrl": "https://ibralogue.github.io/docs",
```

**Important:** Check if any other config or template files reference `/Ibralogue/` as a base path. The docfx default template uses relative paths for assets (`styles/`, `logo.svg`, etc.), so those should work without changes. But verify after the first build by opening the built HTML and checking that CSS/JS/images load correctly.

### 3. Disable GitHub Pages on `Ibralogue/Ibralogue`

After the first successful deployment to the landing page repo:

1. Go to `Ibralogue/Ibralogue` > Settings > Pages
2. Set Source to "None" (disable Pages)

This prevents the old `ibralogue.github.io/Ibralogue/` site from being served. The backwards-compat redirect (see below) handles anyone with old bookmarks.

---

## Changes in `Ibralogue/ibralogue.github.io` (landing page repo)

### 4. Update doc URLs in `src/constants.ts`

```diff
- const DOCS_BASE = 'https://ibralogue.github.io/Ibralogue'
+ const DOCS_BASE = 'https://ibralogue.github.io/docs'
```

All derived URLs (quickstart, manual pages, etc.) update automatically since they interpolate `DOCS_BASE`.

### 5. Add backwards-compat redirect

Create `public/Ibralogue/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta http-equiv="refresh" content="0;url=/docs/index.html" />
  <link rel="canonical" href="/docs/index.html" />
  <title>Redirecting...</title>
</head>
<body>
  <p>Docs have moved. Redirecting to <a href="/docs/index.html">/docs</a>...</p>
</body>
</html>
```

This catches `ibralogue.github.io/Ibralogue/` and redirects to `/docs/`. It does **not** cover deep links like `/Ibralogue/manual/choices.html` — those will 404. If preserving deep links matters, you'd need to create matching redirect files for each page, but that's probably not worth the effort since the old URLs haven't been widely distributed.

### 6. Add a comment in `.gitignore`

```
# public/docs/ is auto-populated by Ibralogue/Ibralogue CI — do not edit manually
```

Don't actually gitignore `public/docs/` since it needs to be committed. The comment just documents the intent for anyone reading the repo.

---

## Execution order

| Step | Repo | Action |
|------|------|--------|
| 1 | GitHub settings | Create PAT, store as `DOCS_DEPLOY_TOKEN` in `Ibralogue/Ibralogue` secrets |
| 2 | `Ibralogue/Ibralogue` | Add the `deploy-docs.yml` workflow |
| 3 | `Ibralogue/Ibralogue` | Update `docfx.json` sitemap base URL |
| 4 | `Ibralogue/Ibralogue` | Run the workflow manually via `workflow_dispatch` to populate `public/docs/` for the first time |
| 5 | `Ibralogue/ibralogue.github.io` | Verify `public/docs/` was committed by the bot |
| 6 | `Ibralogue/ibralogue.github.io` | Update `constants.ts` DOCS_BASE |
| 7 | `Ibralogue/ibralogue.github.io` | Add the backwards-compat redirect at `public/Ibralogue/index.html` |
| 8 | Verify | Open `ibralogue.github.io/docs/` and confirm docs load correctly (CSS, JS, images, search) |
| 9 | Verify | Open `ibralogue.github.io/Ibralogue/` and confirm it redirects to `/docs/` |
| 10 | `Ibralogue/Ibralogue` | Disable GitHub Pages in repo settings |

## Notes

- The docfx action (`nikeee/docfx-action@v1.0.0`) is a thin wrapper around the `docfx` CLI. If you prefer, you can install docfx manually via `dotnet tool install -g docfx` and run `docfx Documentation~/docfx.json` directly.
- The workflow triggers on the `dev` branch. If docs changes are merged to `main` instead, change the branch trigger accordingly.
- The `git diff --staged --quiet` check means no empty commits are created if a docs rebuild produces identical output.
- The commit author is `github-actions[bot]` which is GitHub's standard bot identity. It shows up cleanly in the commit history without needing a dedicated service account.
