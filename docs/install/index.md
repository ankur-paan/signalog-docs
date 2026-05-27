---
title: Install Signalog
description: Pick your platform. Every guide is a 30-second install — one script tag, no build step, no dependencies.
---

# Install Signalog

> **One script tag. Every platform. 30 seconds.**
>
> Add Signalog to any website or web app by pasting a single line of code.
> No configuration required. No build step. No dependencies.

## The Script Tag

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

Replace `YOUR_SITE_ID` with the Site ID from your app dashboard at
**[app.signalog.co/dashboard/apps](https://app.signalog.co/dashboard/apps)**.

::: tip Don't have a Site ID yet?
See [Get Your Site ID](/install/site-id) — it's a one-minute setup.
:::

---

## Pick your stack

### Static sites & CMS

<div class="install-grid">

- [Plain HTML](/install/cms/html) — Any static site
- [WordPress](/install/cms/wordpress) — Theme, plugin, or `functions.php`
- [Webflow](/install/cms/webflow) — Custom Code panel
- [Shopify](/install/cms/shopify) — `theme.liquid` injection
- [Ghost](/install/cms/ghost) — Code Injection
- [Joomla](/install/cms/joomla) — Template or module

</div>

### JavaScript frameworks

<div class="install-grid">

- [Next.js](/install/frameworks/nextjs) — App Router + Pages Router
- [React (SPA)](/install/frameworks/react) — Vite, CRA, or `useEffect`
- [Vue & Nuxt](/install/frameworks/vue-nuxt) — Vue 3 + Nuxt 2/3
- [Svelte & SvelteKit](/install/frameworks/svelte) — Layout or `app.html`
- [Angular](/install/frameworks/angular) — Three approaches
- [Astro](/install/frameworks/astro) — With `is:inline` directive
- [Remix](/install/frameworks/remix) — `root.tsx`

</div>

### Backend frameworks

<div class="install-grid">

- [Laravel](/install/backend/laravel) — Blade layout
- [Django](/install/backend/django) — Base template + context processor
- [Flask](/install/backend/flask) — Jinja2 + app context
- [PHP (Plain)](/install/backend/php) — Direct or shared footer
- [Strapi](/install/backend/strapi) — Frontend integration
- [Express & Node.js](/install/backend/express) — EJS, Pug, Handlebars
- [Ruby on Rails](/install/backend/rails) — `application.html.erb`

</div>

---

## After installing

Once the script is on your site:

1. **[Verify the installation](/install/verify)** — visual, dashboard, or console check
2. **[Add custom trigger buttons](/guide/triggers)** — `data-signalog="feedback"` on any element
3. **[Open the widget programmatically](/guide/javascript-api)** — `SignalogPlugin.openWidget()`

Stuck? See **[Troubleshooting](/install/troubleshooting)** or email [hello@signalog.co](mailto:hello@signalog.co).

<style>
.install-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 6px 32px;
  margin: 16px 0 28px;
}
.install-grid ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
