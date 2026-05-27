---
title: Install Signalog on Ghost
description: Add Signalog to a Ghost blog via Code Injection or theme files.
---

# Ghost

## Method 1 — Code Injection (recommended)

1. Log in to your Ghost admin at `yourdomain.com/ghost`
2. Go to **Settings → Code Injection**
3. Paste the script in the **Site Footer** section
4. Click **Save**

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

This works on every theme, survives Ghost updates, and is the path Ghost officially recommends for third-party scripts.

## Method 2 — Theme `default.hbs`

If you have access to your theme files (custom theme):

1. Open `default.hbs` (or your theme's main template)
2. Find `</body>` and paste just above it
3. Upload the updated theme via **Settings → Design → Upload theme**

```handlebars
{{!-- In default.hbs --}}
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="YOUR_SITE_ID">
</script>

</body>
</html>
```

## Ghost Members

The widget runs alongside Ghost's Members system without conflict. If a logged-in member submits feedback, you can identify them by their email through your own Signalog [JavaScript API](/guide/javascript-api) integration.

## Next steps

- **[Verify the install →](/install/verify)**
