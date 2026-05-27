---
title: Install Signalog in plain PHP
description: Three patterns for installing Signalog in any PHP project — directly inline, shared footer, or environment-driven.
---

# PHP (Plain)

## Method 1 — Directly in HTML

```php
<!-- In any PHP file, before </body> -->
<?php
  $signalog_site_id = 'YOUR_SITE_ID';
?>

<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="<?php echo htmlspecialchars($signalog_site_id); ?>">
</script>
```

::: warning Always escape with `htmlspecialchars`
Even though the Site ID is a controlled value, escaping output is a habit worth keeping. It guards against XSS if the variable ever comes from user input.
:::

## Method 2 — Shared footer file

If you include a shared footer across pages:

```php
<?php
// includes/footer.php
$signalog_site_id = defined('SIGNALOG_SITE_ID') ? SIGNALOG_SITE_ID : '';
?>

<footer>
  <!-- your footer content -->
</footer>

<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="<?php echo htmlspecialchars($signalog_site_id); ?>">
</script>
```

Define the constant in your config file:

```php
<?php
// config.php
define('SIGNALOG_SITE_ID', 'site_abc123xyz456');
```

Include `config.php` from your bootstrap (`index.php` or equivalent) so the constant is available everywhere.

## Method 3 — Environment variable

For production deployments, read from the environment:

```php
<?php
// Load from environment
$signalog_site_id = getenv('SIGNALOG_SITE_ID') ?: '';
?>

<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="<?php echo htmlspecialchars($signalog_site_id); ?>">
</script>
```

Set in your hosting environment (Apache, Nginx FPM, Docker):

```bash
export SIGNALOG_SITE_ID=site_abc123xyz456
```

Or in Apache via `.htaccess`:

```apache
SetEnv SIGNALOG_SITE_ID site_abc123xyz456
```

## Next steps

- **[Verify the install →](/install/verify)**
