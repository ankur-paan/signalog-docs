---
title: Install Signalog in Ruby on Rails
description: Add Signalog to a Rails app via application.html.erb — with env, dotenv, or Rails credentials.
---

# Ruby on Rails

## Application layout

Add to `app/views/layouts/application.html.erb`:

```erb
<!-- app/views/layouts/application.html.erb -->
<!DOCTYPE html>
<html>
  <head>
    <title>My App</title>
    <%= csrf_meta_tags %>
    <%= csp_meta_tag %>
    <%= stylesheet_link_tag "application" %>
  </head>
  <body>
    <%= yield %>

    <%= javascript_include_tag "application", defer: true %>

    <%# Signalog widget %>
    <script
      src="https://cdn.signalog.co/widget.js"
      data-site-id="<%= ENV['SIGNALOG_SITE_ID'] %>">
    </script>
  </body>
</html>
```

## Set environment variable

```bash
# .env (using dotenv gem)
SIGNALOG_SITE_ID=site_abc123xyz456
```

Or in `config/application.rb`:

```ruby
# config/application.rb
config.signalog_site_id = ENV['SIGNALOG_SITE_ID']
```

## Rails credentials (recommended for production)

Use Rails' encrypted credentials so the Site ID lives in version control safely:

```bash
rails credentials:edit
```

```yaml
signalog:
  site_id: site_abc123xyz456
```

Then in your layout:

```erb
<script
  src="https://cdn.signalog.co/widget.js"
  data-site-id="<%= Rails.application.credentials.signalog[:site_id] %>">
</script>
```

The encrypted `config/credentials.yml.enc` file can be committed to git — the decryption key (`config/master.key`) is what you keep secret.

## Turbo / Hotwire

Rails 7+ uses Turbo for navigation by default. Signalog handles Turbo navigation automatically — the widget persists across page transitions without re-initializing.

## Next steps

- **[Verify the install →](/install/verify)**
