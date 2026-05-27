---
title: Install Signalog in Vue & Nuxt
description: Vue 3, Nuxt 3, and Nuxt 2 install paths.
---

# Vue.js / Nuxt.js

## Vue 3 (plain)

Add to your `index.html` in the public folder, or load via the `mounted` lifecycle hook in `App.vue`.

### Option A — `index.html`

```html
<!-- index.html -->
<body>
  <div id="app"></div>
  <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
</body>
```

### Option B — `App.vue`

```vue
<!-- App.vue -->
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.signalog.co/widget.js'
  script.setAttribute('data-site-id', 'YOUR_SITE_ID')
  script.async = true
  document.body.appendChild(script)
})
</script>

<template>
  <RouterView />
</template>
```

## Nuxt 3

Add to `nuxt.config.ts` using the `app.head.script` option:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.signalog.co/widget.js',
          'data-site-id': 'YOUR_SITE_ID',
          defer: true,
          tagPosition: 'bodyClose',
        },
      ],
    },
  },
})
```

The `tagPosition: 'bodyClose'` ensures the script is injected right before `</body>` — same as a manual install.

## Nuxt 2

```js
// nuxt.config.js
export default {
  head: {
    script: [
      {
        src: 'https://cdn.signalog.co/widget.js',
        'data-site-id': 'YOUR_SITE_ID',
        defer: true,
        body: true,
      },
    ],
  },
}
```

## Nuxt with runtime config (env vars)

Recommended for production:

```ts
// nuxt.config.ts
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      signalogSiteId: process.env.NUXT_PUBLIC_SIGNALOG_SITE_ID,
    },
  },
  app: {
    head: {
      script: [
        {
          src: 'https://cdn.signalog.co/widget.js',
          'data-site-id': process.env.NUXT_PUBLIC_SIGNALOG_SITE_ID,
          defer: true,
          tagPosition: 'bodyClose',
        },
      ],
    },
  },
})
```

Then set `NUXT_PUBLIC_SIGNALOG_SITE_ID` in your `.env` file or hosting provider.

## Next steps

- **[Verify the install →](/install/verify)**
- **[Custom triggers in Vue →](/guide/triggers#vue)**
