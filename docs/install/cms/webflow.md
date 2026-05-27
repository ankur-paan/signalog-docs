---
title: Install Signalog on Webflow
description: Add Signalog to a Webflow site via Custom Code — site-wide or per-page.
---

# Webflow

## Method 1 — Site-wide (all pages)

1. Open your Webflow project
2. Go to **Project Settings → Custom Code**
3. Paste the script in the **Footer Code** section
4. Click **Save Changes**
5. **Publish** your site (changes only go live after publish)

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

## Method 2 — Specific page only

1. Open the page in the Webflow Designer
2. Click the **Page Settings** icon (gear icon near the page name)
3. Scroll to **Custom Code → Before `</body>` tag**
4. Paste the script tag
5. Save and publish

## Note on Webflow interactions

The Signalog widget loads asynchronously and **does not interfere with Webflow's Interactions or Animations**. No additional configuration is required, and there are no conflicts with the IX2 engine.

## Webflow Editor mode

The widget will not appear when you're viewing your site through the Webflow Editor (the in-place editing tool). It only appears on the published site, which is the correct behavior — visitors see the widget, editors don't.

## Next steps

- **[Verify the install →](/install/verify)**
