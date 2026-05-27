---
title: Install Signalog on WordPress
description: Three install methods for WordPress — Theme Editor, a plugin, or functions.php. Works on WooCommerce too.
---

# WordPress

Three install methods, in order of recommendation.

## Method 1 — Theme Editor (recommended)

1. Log in to your WordPress admin at `yourdomain.com/wp-admin`
2. Go to **Appearance → Theme File Editor**
3. Select **footer.php** from the file list on the right
4. Find the closing `</body>` tag
5. Paste the script tag directly above it

```php
<!-- In footer.php, just before </body> -->
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="YOUR_SITE_ID">
</script>

</body>
</html>
```

6. Click **Update File**

::: warning Theme updates overwrite changes
If you update your theme, `footer.php` will be reset. Use a [child theme](https://developer.wordpress.org/themes/advanced-topics/child-themes/) or **Method 2** (plugin) to make the install update-proof.
:::

## Method 2 — WordPress plugin (easiest)

1. Install the **Insert Headers and Footers** plugin
   (Plugins → Add New → search *"Insert Headers and Footers"*)
2. Go to **Settings → Insert Headers and Footers**
3. Paste the script tag in the **Scripts in Footer** box
4. Click **Save**

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

This survives theme updates and works on any theme.

## Method 3 — functions.php

For developers — add to your theme's `functions.php` file:

```php
function signalog_widget() {
    ?>
    <script
      src="https://cdn.signalog.co/widget.js"
      data-site-id="YOUR_SITE_ID">
    </script>
    <?php
}
add_action('wp_footer', 'signalog_widget');
```

Use a child theme to keep this code through theme updates.

## WooCommerce note

All three methods work for WooCommerce stores. The widget appears on every storefront page including **product pages, cart, and checkout**.

If you want to *hide* the widget on checkout specifically, wrap the snippet with a conditional:

```php
function signalog_widget() {
    if (is_checkout()) return; // skip on checkout
    ?>
    <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
    <?php
}
add_action('wp_footer', 'signalog_widget');
```

## Next steps

- **[Verify the install →](/install/verify)**
- **[Troubleshooting →](/install/troubleshooting)**
