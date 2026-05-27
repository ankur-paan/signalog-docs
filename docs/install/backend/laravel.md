---
title: Install Signalog in Laravel
description: Add Signalog to a Laravel application via Blade layouts and config.
---

# Laravel

## Method 1 — Blade layout (recommended)

Add to your main Blade layout file, typically `resources/views/layouts/app.blade.php`:

```blade
{{-- resources/views/layouts/app.blade.php --}}
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8">
    <title>{{ config('app.name') }}</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
  </head>
  <body>
    @yield('content')

    {{-- Signalog widget --}}
    <script
      src="https://cdn.signalog.co/widget.js"
      data-site-id="{{ config('services.signalog.site_id') }}">
    </script>
  </body>
</html>
```

## Store Site ID in config

Add to `config/services.php`:

```php
// config/services.php
return [
    // ... other services

    'signalog' => [
        'site_id' => env('SIGNALOG_SITE_ID'),
    ],
];
```

Add to your `.env` file:

```bash
SIGNALOG_SITE_ID=site_abc123xyz456
```

After editing `.env`, clear the config cache:

```bash
php artisan config:clear
```

## Method 2 — Direct in blade template

If you don't use a shared layout:

```blade
{{-- At the bottom of any blade file --}}
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="{{ env('SIGNALOG_SITE_ID') }}">
</script>
```

::: warning Don't use `env()` outside config files
Laravel best practice: read from `config('services.signalog.site_id')`, not `env()`, in templates. `env()` returns `null` when `php artisan config:cache` has been run. Method 1 above does this correctly.
:::

## Multi-tenancy

If you run multi-tenant Laravel and each tenant has their own Signalog account:

```php
// In a middleware or service provider
config(['services.signalog.site_id' => tenant('signalog_site_id')]);
```

The Blade layout will then read the correct Site ID per tenant request.

## Next steps

- **[Verify the install →](/install/verify)**
