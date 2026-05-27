---
title: Verifying Installation
description: Three ways to confirm Signalog is live on your site — visual, dashboard, and console.
---

# Verifying Installation

After installing, confirm the widget is loading correctly.

## Method 1 — Visual check

1. Visit your website in a normal browser tab
2. Look for the Signalog widget icon in the **bottom-right corner**
3. Click it — the feedback panel should open

If you see the icon, you're done. Submit a test feedback to make sure it lands in your dashboard.

## Method 2 — Dashboard verification

1. Go to **[app.signalog.co/dashboard/apps](https://app.signalog.co/dashboard/apps)**
2. Find your app in the list
3. The status indicator should show **Active** (green dot)
4. The **Last seen** timestamp should update within seconds of visiting your site

::: tip First-load delay
The dashboard polls every 30 seconds. If you just installed, give it up to a minute before assuming the install failed.
:::

## Method 3 — Browser console

Open browser DevTools (`F12` or `Cmd+Option+I`) and check the **Console** tab. You should see:

```
[Signalog] Widget initialized for site: site_abc123xyz456
```

You'll also see a successful network request to `https://cdn.signalog.co/widget.js` returning `200 OK` in the **Network** tab.

## Method 4 — Programmatic check

If you need to verify in code (e.g. inside a CI test):

```javascript
// On any page where the script has loaded
if (window.SignalogPlugin) {
  console.log('Signalog is installed ✓')
} else {
  console.error('Signalog is NOT installed')
}
```

The `SignalogPlugin` global object is added to `window` after `widget.js` finishes executing. If it's missing, the script failed to load — check the [Troubleshooting](/install/troubleshooting) page.

## What if nothing happens?

See **[Troubleshooting](/install/troubleshooting)** for:

- Widget not appearing
- Script loads but no icon visible
- Submissions failing
- Double widget appearing
- CSP / ad-blocker issues

Or email [hello@signalog.co](mailto:hello@signalog.co) — we respond within 24 hours.
