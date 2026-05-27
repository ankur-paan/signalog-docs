---
title: Getting Started with Signalog
description: A 5-minute tour of Signalog — what it does, how to install it, and how to start collecting user feedback.
---

# Getting Started

Signalog is **one script tag** that adds four user-feedback channels to any website:

| Channel             | What it captures                                    |
| ------------------- | --------------------------------------------------- |
| 🐛 Bug Reports      | Users tell you what's broken — with screenshots     |
| 💬 Feedback         | General product feedback and praise                 |
| ✨ Feature Requests | What your users want next, with upvoting            |
| 📣 Changelog        | What you shipped — broadcast to your users          |

Everything routes to a single dashboard at [app.signalog.co](https://app.signalog.co).

## In 30 seconds

```html
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

That's the entire integration. Drop it before `</body>` and a floating action button (FAB) appears in the bottom-right of every page.

## What you'll learn

This guide walks through:

1. **[Install Signalog](/install/)** — pick your platform
2. **[Get your Site ID](/install/site-id)** — one-minute setup
3. **[Verify the install](/install/verify)** — confirm it's working
4. **[Custom triggers](/guide/triggers)** — open panels from your own buttons
5. **[JavaScript API](/guide/javascript-api)** — full programmatic control
6. **[TypeScript support](/guide/typescript)** — type-safe usage

## Architecture at a glance

```
Your site                  Signalog CDN                   Signalog Dashboard
┌────────────┐             ┌────────────┐                  ┌────────────┐
│            │  GET /js    │            │                  │            │
│  <script>  │────────────▶│ widget.js  │                  │            │
│            │             │ ~24kb gz   │                  │            │
│            │◀────────────│            │                  │            │
│            │             └────────────┘                  │            │
│            │                                             │            │
│  User      │             ┌────────────┐                  │            │
│  submits   │  POST /api  │            │                  │            │
│  feedback  │────────────▶│ api.       │─────────────────▶│ Inbox      │
│            │             │ signalog   │                  │            │
│            │             │ .co        │                  │            │
└────────────┘             └────────────┘                  └────────────┘
```

The widget JavaScript is served from `cdn.signalog.co` (Cloudflare edge). Submissions go to `api.signalog.co` (regional API). The dashboard at `app.signalog.co` is where you read, triage, and respond.

## Privacy & data

- **No tracking.** Signalog does not record sessions, set persistent cookies, or fingerprint users.
- **No analytics.** We don't tell you what pages users visit — only what they submit.
- **GDPR-compliant.** EU users see a consent prompt before submitting (configurable).
- **Your data is yours.** Export every submission via the dashboard or API. Delete on request.

## Pricing

Signalog is **free forever** for individuals and small teams (up to 1,000 submissions/month). See [signalog.co/pricing](https://signalog.co/pricing) for paid plans.

## Next step

**[Install Signalog →](/install/)**
