---
title: Install Signalog with Strapi
description: Strapi is a headless CMS — install Signalog on the frontend that consumes your Strapi API.
---

# Strapi (Frontend)

Strapi is a **headless CMS** — you install Signalog on the frontend that consumes your Strapi API, not on Strapi itself. The Strapi backend doesn't need any changes.

## Which frontend are you using?

### Next.js + Strapi

Follow the **[Next.js install guide](/install/frameworks/nextjs)** for your frontend.

### Nuxt.js + Strapi

Follow the **[Vue & Nuxt install guide](/install/frameworks/vue-nuxt)** for your frontend.

### React + Strapi

Follow the **[React (SPA) install guide](/install/frameworks/react)** for your frontend.

### SvelteKit + Strapi

Follow the **[Svelte & SvelteKit install guide](/install/frameworks/svelte)** for your frontend.

### Custom HTML frontend

```html
<!-- In your frontend HTML, before </body> -->
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

## Strapi admin panel

If you want Signalog on the **Strapi admin panel** (e.g. to collect feedback from your editors), you'd customize the admin via [Strapi's admin customization](https://docs.strapi.io/dev-docs/admin-panel-customization). This is unusual — most teams install Signalog only on the public-facing site.

## Next steps

- **[Verify the install →](/install/verify)**
