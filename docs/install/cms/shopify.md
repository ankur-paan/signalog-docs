---
title: Install Signalog on Shopify
description: Add Signalog to your Shopify storefront via theme.liquid or a theme app extension.
---

# Shopify

## Method 1 — Theme Editor

1. Log in to your Shopify admin
2. Go to **Online Store → Themes**
3. Click **Actions → Edit Code** on your active theme
4. Open **Layout → theme.liquid**
5. Find `</body>` and paste just above it

```liquid
<!-- In theme.liquid, just before </body> -->
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="YOUR_SITE_ID">
</script>

</body>
```

6. Click **Save**

## Method 2 — Shopify Theme App Extension (advanced)

For more control, create a [theme app extension](https://shopify.dev/docs/apps/online-store/theme-app-extensions). This is optional and only needed if you want to:

- Conditionally show the widget based on customer tag or page type
- Pass the Site ID as a theme setting
- Distribute Signalog through the Shopify App Store

## Shopify-specific notes

- **Storefront only.** The widget appears on all customer-facing pages. It does **not** appear in the Shopify admin.
- **Checkout pages.** On Shopify Plus, you can extend the widget to the checkout via Checkout UI Extensions. On non-Plus stores, the widget is hidden from `/checkouts/*` URLs automatically by Shopify (customer data on checkout is locked down).
- **Customer privacy.** Submissions through the widget are only visible to you in your Signalog dashboard. Shopify does not see them.

## Next steps

- **[Verify the install →](/install/verify)**
