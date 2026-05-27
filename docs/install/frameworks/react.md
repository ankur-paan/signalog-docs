---
title: Install Signalog in React (SPA)
description: Three install patterns for Create React App, Vite, or any React single-page app.
---

# React (SPA)

For React SPAs (Create React App, Vite, plain React), you have three install patterns. Method 1 is the simplest and almost always the right pick.

## Method 1 — `index.html` (simplest)

Add the script to `public/index.html`:

```html
<!-- public/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My App</title>
  </head>
  <body>
    <noscript>You need JavaScript to run this app.</noscript>
    <div id="root"></div>

    <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
  </body>
</html>
```

This loads Signalog independently of React. The widget appears immediately, doesn't wait for hydration, and survives client-side route changes without re-initializing.

## Method 2 — `useEffect` hook

Load the script programmatically inside your root component:

```tsx
// src/App.tsx
import { useEffect } from 'react'

function App() {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.signalog.co/widget.js'
    script.setAttribute('data-site-id', 'YOUR_SITE_ID')
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return <div className="App">{/* your app */}</div>
}

export default App
```

Use this if you want to **conditionally load** Signalog (e.g. only after auth, only on certain routes).

## Method 3 — Vite

For Vite projects, Method 1 (`index.html`) works out of the box. Vite serves `index.html` from the project root, so no plugin is needed.

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

Then add to `index.html` as in Method 1.

## React + environment variables

For Vite:

```bash
# .env
VITE_SIGNALOG_SITE_ID=site_abc123xyz456
```

```tsx
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'https://cdn.signalog.co/widget.js'
  script.setAttribute('data-site-id', import.meta.env.VITE_SIGNALOG_SITE_ID)
  script.async = true
  document.body.appendChild(script)
}, [])
```

For Create React App:

```bash
# .env
REACT_APP_SIGNALOG_SITE_ID=site_abc123xyz456
```

```tsx
script.setAttribute('data-site-id', process.env.REACT_APP_SIGNALOG_SITE_ID!)
```

## Next steps

- **[Verify the install →](/install/verify)**
- **[Programmatic API in React →](/guide/javascript-api)**
