---
title: Install Signalog in Remix
description: Add Signalog to a Remix app via app/root.tsx.
---

# Remix

Add to your `app/root.tsx` file inside the `<body>` tag, after Remix's `<Scripts />` component:

```tsx
// app/root.tsx
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from '@remix-run/react'

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        {/* Signalog widget */}
        <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID" async />
      </body>
    </html>
  )
}
```

## Why after `<Scripts />`

Remix's `<Scripts />` component injects your bundled JS. Putting Signalog **after** it ensures:

1. Remix hydration finishes first (no race conditions)
2. Signalog loads in parallel without blocking your app

## Environment variables

Use Remix's loader pattern to pass the Site ID from server to client:

```tsx
// app/root.tsx
import { json, LoaderFunctionArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

export async function loader({ context }: LoaderFunctionArgs) {
  return json({
    ENV: {
      SIGNALOG_SITE_ID: process.env.SIGNALOG_SITE_ID,
    },
  })
}

export default function App() {
  const { ENV } = useLoaderData<typeof loader>()

  return (
    <html lang="en">
      <head>{/* ... */}</head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />

        <script
          src="https://cdn.signalog.co/widget.js"
          data-site-id={ENV.SIGNALOG_SITE_ID}
          async
        />
      </body>
    </html>
  )
}
```

## Next steps

- **[Verify the install →](/install/verify)**
