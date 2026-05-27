---
title: Install Signalog on Joomla
description: Add Signalog to a Joomla site via the template editor or a Custom HTML module.
---

# Joomla

## Method 1 — Template editor

1. Log in to your Joomla admin
2. Go to **Extensions → Templates → Templates**
3. Click on your active template name
4. Click **index.php**
5. Find `</body>` and paste the script above it

```php
<!-- In index.php template, before </body> -->
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="YOUR_SITE_ID">
</script>

</body>
</html>
```

6. Click **Save & Close**

::: warning Template updates
If you update your template, this change will be overwritten. Use a template override (Joomla supports this natively) or **Method 2** (module) for update-proof installs.
:::

## Method 2 — Custom HTML module

1. Go to **Extensions → Modules → New**
2. Select **Custom HTML**
3. Paste the script in the content area
4. Set **Position** to a footer position (e.g. `footer` or `debug`)
5. Set **Status** to **Published**
6. Save

This survives template updates and lets you toggle the widget on/off from the module manager.

## Joomla 4 vs Joomla 3

Both methods work on Joomla 3.x and Joomla 4.x. The admin menu paths are identical.

## Next steps

- **[Verify the install →](/install/verify)**
