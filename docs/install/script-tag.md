---
title: The Script Tag
description: The single line of code that powers every Signalog install. Drop it before </body> and you're done.
---

# The Script Tag

Every Signalog installation — across every framework and CMS — comes down to this one line of HTML:

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

That's it. There is no SDK to install, no build step, and no JavaScript framework integration to learn.

## Where it goes

Place the script just before the closing `</body>` tag:

```html{8}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>My Website</title>
  </head>
  <body>
    <!-- ...your page content... -->
    <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
  </body>
</html>
```

::: warning Why not `<head>`?
Loading in `<head>` blocks rendering. Loading before `</body>` lets the page paint first — Signalog hydrates after, so your Core Web Vitals stay perfect.
:::

## What the attributes do

| Attribute      | Required | Description                                                  |
| -------------- | -------- | ------------------------------------------------------------ |
| `src`          | Yes      | Always `https://cdn.signalog.co/widget.js`.                  |
| `data-site-id` | Yes      | Your unique app identifier from the dashboard.               |
| `async`        | No       | The CDN already serves the script async — adding it is fine. |
| `defer`        | No       | Acceptable alternative to async if you need ordered scripts. |

## Browser support

Signalog runs on every browser released since 2020:

- **Chrome / Edge:** 88+
- **Firefox:** 86+
- **Safari:** 14+
- **iOS / Android:** all modern releases

Legacy browsers (IE 11, old Android WebView) silently skip the widget — your site continues to work normally.

## What loads

The single script tag pulls in **one** JavaScript bundle (~24 KB gzipped) and **one** CSS bundle (~3 KB gzipped). Both are served from Cloudflare edge nodes in 280+ cities, so first-byte latency averages **under 50 ms** worldwide.

## Next steps

- **[Get your Site ID →](/install/site-id)**
- **[Pick your platform →](/install/)**
- **[Verify the install →](/install/verify)**
