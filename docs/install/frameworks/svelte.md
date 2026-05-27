---
title: Install Signalog in Svelte & SvelteKit
description: SvelteKit app.html and layout approaches, plus plain Svelte via Vite.
---

# Svelte / SvelteKit

## SvelteKit (recommended)

Add to `src/app.html` just before the closing `</body>` tag:

```html
<!-- src/app.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>

    <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
  </body>
</html>
```

This runs the script for every page, including SSR-rendered routes, with no extra configuration.

## SvelteKit — layout approach

Or load it via your root layout `+layout.svelte` if you want more control:

```svelte
<!-- src/routes/+layout.svelte -->
<script>
  import { onMount } from 'svelte'

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.signalog.co/widget.js'
    script.setAttribute('data-site-id', 'YOUR_SITE_ID')
    script.async = true
    document.body.appendChild(script)
  })
</script>

<slot />
```

Use this if you want to conditionally load Signalog based on user state or route.

## Plain Svelte (Vite)

Same as [React Method 1](/install/frameworks/react#method-1-index-html-simplest) — add to `index.html` in your project root.

```html
<!-- index.html -->
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
  <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
</body>
```

## Environment variables in SvelteKit

```bash
# .env
PUBLIC_SIGNALOG_SITE_ID=site_abc123xyz456
```

In `app.html`:

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="%env.PUBLIC_SIGNALOG_SITE_ID%"></script>
```

Or in `+layout.svelte`:

```svelte
<script>
  import { PUBLIC_SIGNALOG_SITE_ID } from '$env/static/public'
  import { onMount } from 'svelte'

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.signalog.co/widget.js'
    script.setAttribute('data-site-id', PUBLIC_SIGNALOG_SITE_ID)
    document.body.appendChild(script)
  })
</script>
```

## Next steps

- **[Verify the install →](/install/verify)**
