---
title: Install Signalog in Next.js
description: App Router and Pages Router instructions, plus environment variable setup for the Site ID.
---

# Next.js

## App Router (Next.js 13+)

Add the script to your root layout file `app/layout.tsx` (or `app/layout.js`).

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}

        <Script
          src="https://cdn.signalog.co/widget.js"
          data-site-id="YOUR_SITE_ID"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
```

## Pages Router (Next.js 12 and below)

Add to `pages/_app.tsx` (or `pages/_app.js`):

```tsx
// pages/_app.tsx
import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      <Script
        src="https://cdn.signalog.co/widget.js"
        data-site-id="YOUR_SITE_ID"
        strategy="afterInteractive"
      />
    </>
  )
}
```

## Why `strategy="afterInteractive"`

Using `afterInteractive` ensures the Signalog widget loads after your page is interactive — so it never delays your page load or affects your Core Web Vitals score.

| Strategy            | When it loads                                  | Use when…                                  |
| ------------------- | ---------------------------------------------- | ------------------------------------------ |
| `beforeInteractive` | Before hydration                               | Critical first-party scripts (analytics)   |
| `afterInteractive`  | After hydration (default) ✓                    | **Signalog and most third-party widgets**  |
| `lazyOnload`        | During browser idle time                       | Non-essential, below-fold widgets          |

For Signalog, `afterInteractive` is the right pick — fast enough to be visible before scroll, late enough to never block paint.

## Environment variable (recommended)

Store your Site ID in an environment variable to keep it out of source control and to use different IDs per environment:

```bash
# .env.local
NEXT_PUBLIC_SIGNALOG_SITE_ID=site_abc123xyz456
```

```tsx
<Script
  src="https://cdn.signalog.co/widget.js"
  data-site-id={process.env.NEXT_PUBLIC_SIGNALOG_SITE_ID}
  strategy="afterInteractive"
/>
```

::: tip Why the `NEXT_PUBLIC_` prefix?
Next.js only exposes env vars prefixed with `NEXT_PUBLIC_` to client-side code. The Site ID is public information (it appears in the HTML anyway), so this is fine.
:::

## Vercel deployment

If you deploy to Vercel:

1. Go to your project → **Settings → Environment Variables**
2. Add `NEXT_PUBLIC_SIGNALOG_SITE_ID` with your value
3. Set the scope to **Production**, **Preview**, and **Development**
4. Redeploy

## App Router caveat: middleware & i18n

If you use [internationalization routing](https://nextjs.org/docs/app/building-your-application/routing/internationalization), the `app/layout.tsx` at the root applies to every locale automatically. You don't need to add the script per-locale.

## Next steps

- **[Verify the install →](/install/verify)**
- **[Custom triggers in React →](/guide/triggers#react-jsx)**
