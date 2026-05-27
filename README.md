# Signalog Docs

VitePress documentation site for [Signalog](https://signalog.co), deployed to Cloudflare Workers via GitHub Actions.

**Live:** `https://docs.signalog.co` (once the custom domain is wired up)

---

## Local development

```bash
npm install
npm run docs:dev
```

Visit `http://localhost:5173`. Edit any `.md` in `docs/` — the browser hot-reloads instantly.

To build and preview the exact production output:

```bash
npm run docs:build
npm run docs:preview   # serves docs/.vitepress/dist/ on :4173
```

---

## Deploy pipeline

Every push to `main` triggers the GitHub Actions workflow at [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):

1. Checks out the repo
2. Runs `npm run docs:build` (VitePress → `docs/.vitepress/dist/`)
3. Deploys with Wrangler to the `signalog-docs` Cloudflare Worker

Pull requests get a **preview deployment** via `wrangler versions upload`. The PR gets a comment with the preview URL.

### First-time GitHub setup

Add these two secrets to the repo (**Settings → Secrets and variables → Actions**):

| Secret name              | Where to get it |
| ------------------------ | --------------- |
| `CLOUDFLARE_API_TOKEN`   | [dash.cloudflare.com/profile/api-tokens](https://dash.cloudflare.com/profile/api-tokens) — use the "Edit Cloudflare Workers" template, scoped to the `signalog-docs` Worker |
| `CLOUDFLARE_ACCOUNT_ID`  | Cloudflare dashboard → right sidebar on the Workers overview page |

### First-time Cloudflare setup

The Worker must exist before the first deploy. Either:

**Option A — manual one-time deploy:**
```bash
npm install
npm run docs:build
npx wrangler deploy   # creates the Worker if it doesn't exist
```

**Option B — create via dashboard:**  
Cloudflare dashboard → **Workers & Pages** → **Create** → name it `signalog-docs` → skip the code editor → the first GitHub Actions run will overwrite it.

### Attach the custom domain

After the first deploy, uncomment these lines in [`wrangler.toml`](wrangler.toml) and replace the domain:

```toml
[[routes]]
pattern = "docs.signalog.co"
custom_domain = true
```

Then run `npx wrangler deploy` (or push to main). Cloudflare provisions the SSL cert automatically.

---

## Adding and editing content

### File layout

```
docs/
├── .vitepress/
│   ├── config.mts          ← site config (nav, sidebar, fonts, metadata)
│   └── theme/
│       ├── index.ts        ← theme entry; mounts PageActions on every doc
│       ├── PageActions.vue ← Copy page / Open in Claude / etc. dropdown
│       └── style.css       ← Signalog brand tokens + VitePress overrides
├── public/
│   ├── logo-light.svg
│   └── logo-dark.svg
├── index.md                ← home page (hero + features)
├── install/                ← /install/* — installation guides
│   ├── index.md
│   ├── cms/
│   ├── frameworks/
│   └── backend/
├── guide/                  ← /guide/* — usage guides
└── api/                    ← /api/* — API reference
```

### Adding a new page

1. Create a `.md` file in the relevant folder (e.g., `docs/install/flutter.md`).
2. Add a frontmatter block at the top:
   ```yaml
   ---
   title: Flutter
   description: Add Signalog to a Flutter web app.
   ---
   ```
3. Add the page to the sidebar in `docs/.vitepress/config.mts` under the matching `sidebar` section.

### Editing an existing page

Just edit the `.md` file. VitePress uses standard Markdown plus these extras:

**Custom containers:**
```md
::: tip
Helpful hint
:::

::: warning
Watch out
:::

::: danger
Breaking change
:::

::: details Click to expand
Hidden content
:::
```

**Code groups (tabbed):**
````md
::: code-group
```bash [npm]
npm install @signalog/widget
```
```bash [yarn]
yarn add @signalog/widget
```
:::
````

**Live code blocks with copy button** — just use fenced code blocks. Syntax highlighting is automatic.

---

## Versioning

The site uses **folder-based versioning**. The current release lives at the root (`/install/`, `/guide/`, `/api/`). Archived versions live in timestamped folders (`/v1.0/`).

### Archiving the current version

When you cut a new release (e.g., `v2.0`):

```bash
# 1. Copy all current content into a versioned folder
mkdir -p docs/v2.0
cp -r docs/install docs/guide docs/api docs/v2.0/

# 2. In docs/.vitepress/config.mts:
#    - Bump LATEST_VERSION to '2.0'
#    - Add { text: 'v1.0', link: '/v1.0/' } to the version dropdown in nav
#    - Add a '/v1.0/' sidebar block (copy the current v1.0 block as a template)
```

The archived version stays frozen at `/v1.0/...`. The root paths (`/guide/`, `/api/`) always point to the latest.

### Version dropdown

The version picker in the nav is configured in `config.mts`:

```typescript
// Change LATEST_VERSION and add older versions to the nav array:
const LATEST_VERSION = '2.0'

nav: [
  {
    text: `v${LATEST_VERSION}`,
    items: [
      { text: 'v2.0 (latest)', link: '/' },
      { text: 'v1.0', link: '/v1.0/' },
    ],
  },
]
```

---

## Page actions menu

Every doc page shows a **Copy page** dropdown at the top right:

| Item               | What it does                                               |
| ------------------ | ---------------------------------------------------------- |
| Copy page          | Fetches the source `.md` and copies it to the clipboard    |
| Edit on GitHub     | Opens the `.md` file for editing on GitHub                 |
| View as Markdown   | Opens the raw `.md` in the browser                         |
| Open in ChatGPT    | Sends the page URL to ChatGPT                              |
| Open in Claude     | Sends the page URL to Claude                               |

This works because the Vite build plugin in `config.mts` copies every source `.md` into the `dist/` directory, giving every rendered page a sibling raw-markdown URL (e.g., `/guide/getting-started.md`).

> **Note:** "Copy page" only works on the deployed site, not in `npm run docs:dev`. That's expected.

---

## Cloudflare Worker details

The Worker (`worker.js`) is intentionally minimal — it proxies 99% of requests straight to the `ASSETS` binding (the VitePress build output) and only adds:

- **Security headers** on every response: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`
- **Cache-Control**: 1 year immutable for `/assets/*.js|css|...`, 5 min / 1 hr for HTML pages

The `wrangler.toml` config:
- `not_found_handling = "404-page"` — serves `404.html` from the build on unknown routes
- `html_handling = "auto-trailing-slash"` — `/install/nextjs` maps to `nextjs.html` (works with VitePress `cleanUrls: true`)
- `observability.logs.enabled = true` — Worker logs appear in the Cloudflare dashboard

---

## Maintenance chores

### Dependency updates

```bash
npm update                 # minor/patch bumps
npx npm-check-updates -u   # show available major bumps (review before applying)
```

### Wrangler version

Wrangler is pinned in `package.json`. To upgrade:
```bash
npm install wrangler@latest --save-dev
```

### Node version

The Node version is pinned in `.nvmrc`. To change it, edit `.nvmrc` and update the `node-version-file` reference in the deploy workflow.

### Clearing the Cloudflare cache

The Worker sets long-cache headers for static assets. If you need to bust the cache after a re-deploy, either:
- Append a version query string during build (usually not needed — VitePress hashes asset filenames)
- Use the Cloudflare dashboard → **Workers & Pages** → `signalog-docs` → **Deployments** → **Purge cache**
