---
title: Install Signalog in Astro
description: Add Signalog to your Astro site via the global layout — with the critical is:inline directive.
---

# Astro

## Global layout

Add to your main layout component in `src/layouts/Layout.astro`:

```astro
---
// src/layouts/Layout.astro
export interface Props {
  title: string
}
const { title } = Astro.props
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{title}</title>
  </head>
  <body>
    <slot />

    <script
      is:inline
      src="https://cdn.signalog.co/widget.js"
      data-site-id="YOUR_SITE_ID">
    </script>
  </body>
</html>
```

::: warning Use `is:inline` — required
The `is:inline` directive prevents Astro from processing the script tag. Without it, Astro may bundle or transform the script, breaking the CDN URL.
:::

## Per-page install

If you only want the widget on certain pages, add the script to that page's frontmatter or layout instead of the global layout.

## Astro + environment variables

Astro uses Vite under the hood — env vars prefixed with `PUBLIC_` are exposed client-side:

```bash
# .env
PUBLIC_SIGNALOG_SITE_ID=site_abc123xyz456
```

```astro
---
const siteId = import.meta.env.PUBLIC_SIGNALOG_SITE_ID
---

<script
  is:inline
  src="https://cdn.signalog.co/widget.js"
  data-site-id={siteId}>
</script>
```

## Astro Islands

Signalog runs as a global widget, not as an Astro Island. You don't need to add `client:load` or any client directive — the `is:inline` script tag is sufficient.

## Next steps

- **[Verify the install →](/install/verify)**
