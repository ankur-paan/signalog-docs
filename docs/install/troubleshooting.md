---
title: Troubleshooting Signalog installation
description: Diagnose and fix common install issues — widget not appearing, submissions failing, CSP errors, and more.
---

# Troubleshooting

## Widget not appearing

### Check 1 — Script tag placement

The script must be placed before the closing `</body>` tag, **not** in `<head>`.

```html
<!-- ❌ Wrong — in <head> -->
<head>
  <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
</head>

<!-- ✅ Correct — before </body> -->
<body>
  ...
  <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
</body>
```

### Check 2 — Site ID is correct

Verify your Site ID at [app.signalog.co/dashboard/apps](https://app.signalog.co/dashboard/apps). It looks like `site_abc123xyz456`.

A wrong or unrecognized Site ID causes the widget to silently fail without rendering anything.

### Check 3 — Domain is allowed

Your website's domain must be in the **Allowed Domains** list for your app.

1. Go to [app.signalog.co/dashboard/apps](https://app.signalog.co/dashboard/apps)
2. Click the edit icon on your app
3. Check the **Allowed Domains** field
4. Add your domain (e.g. `mydomain.com` — without `https://`)

For local development, add `localhost:3000`, `localhost:5173`, etc., explicitly.

### Check 4 — Content Security Policy (CSP)

If your site uses a Content Security Policy, add Signalog to your allowed scripts and connect sources:

```
Content-Security-Policy:
  script-src 'self' https://cdn.signalog.co;
  connect-src 'self' https://api.signalog.co;
  style-src 'self' 'unsafe-inline' https://cdn.signalog.co;
```

::: tip CSP with Next.js / Vercel
On Next.js, configure CSP via the `headers()` function in `next.config.js`, or via `middleware.ts`. On Vercel, use the `vercel.json` `headers` array.
:::

---

## Widget appears but submissions fail

### Check 1 — CORS

Signalog's API accepts requests from any allowed domain. Verify your domain is in the Allowed Domains list (see above).

### Check 2 — Ad blocker

Some ad blockers block feedback widgets. Test in a private/incognito window without extensions.

Common offenders:
- **uBlock Origin** — usually fine, but custom filter lists can block
- **AdGuard** — has feedback widgets in some lists
- **Brave Shields** — can block based on heuristics

### Check 3 — Browser console errors

Open DevTools (`F12`) → **Console** and look for any red error messages. If you see one, copy it and contact [hello@signalog.co](mailto:hello@signalog.co).

---

## Script loads but no widget icon visible

The widget icon may be hidden by a CSS conflict on your site. Check for any global CSS that might be hiding it:

```css
/* These can hide the widget */
* {
  display: none;
}
body > * {
  visibility: hidden;
}
[id^='signalog'] {
  display: none !important;
}
```

The widget is rendered inside a Shadow DOM, so most page CSS won't leak in. But global selectors targeting `[id^='signalog']` or `iframe` will.

Contact [hello@signalog.co](mailto:hello@signalog.co) with your site URL and we will diagnose it.

---

## Double widget appearing

You may have added the script tag twice. Search your codebase for `cdn.signalog.co` and ensure it appears only once.

Common causes:
- Both `index.html` AND a `useEffect` hook
- A WordPress plugin AND a manual `functions.php` entry
- A shared layout AND a per-page custom code field

The widget is idempotent — calling it twice will result in two icons stacked on top of each other.

---

## Script breaks my site

The Signalog script loads asynchronously and should never break your site. If you experience issues:

1. Remove the script tag
2. Confirm your site works without it
3. Contact [hello@signalog.co](mailto:hello@signalog.co) with your platform and error details

We will resolve it within 24 hours.

---

## Submissions show as "Anonymous" instead of identified users

Signalog doesn't auto-identify users — by design, for privacy. To attach user metadata to submissions, use the [JavaScript API](/guide/javascript-api) to call `SignalogPlugin.identify({ email, name })` once your user logs in.

---

## Widget is slow to load

Signalog's CDN serves from 280+ edge locations and typically responds in <50ms. If you see slow loads:

- **Test in a fresh browser session** — caching of stale assets can give false readings
- **Check Cloudflare status** — [cloudflarestatus.com](https://www.cloudflarestatus.com/)
- **Check your network panel** — confirm `widget.js` is actually slow, not a different resource

---

## Still stuck?

- **Email:** [hello@signalog.co](mailto:hello@signalog.co)
- **Dashboard:** [app.signalog.co](https://app.signalog.co)
- **Twitter:** [@signalogco](https://twitter.com/signalogco)

We respond within 24 hours on all plans.
