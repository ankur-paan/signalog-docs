---
title: Get Your Site ID
description: Sign up, create an app, copy the Site ID. One minute.
---

# Get Your Site ID

Every Signalog widget needs a Site ID. It's how the script knows which dashboard to deliver feedback to.

## Sign up

1. Visit **[app.signalog.co](https://app.signalog.co)**
2. Sign up with your email or Google account (free, no credit card)
3. Verify your email

## Create your first app

1. Go to **Dashboard → Apps**
2. Click **+ Add App**
3. Fill in:
   - **App name** — e.g. *"Acme Marketing Site"*
   - **Production domain** — e.g. *`acme.com`* (no `https://`, no trailing slash)
   - **Development domains** *(optional)* — e.g. `localhost:3000`, `acme.staging.com`
4. Click **Create**

## Copy the Site ID

After creating the app, you'll see a Site ID that looks like:

```
site_abc123xyz456
```

Click the copy icon next to it. That's the value you paste into `data-site-id`:

```html{1}
<script src="https://cdn.signalog.co/widget.js" data-site-id="site_abc123xyz456"></script>
```

::: tip Multiple environments
You can use the **same Site ID** for production, staging, and localhost. Just add each domain to the **Allowed Domains** field when creating the app. Signalog will accept requests from all of them but tag submissions with the originating domain.
:::

## Where to find it later

Forgot your Site ID? It's always visible in:

- **[app.signalog.co/dashboard/apps](https://app.signalog.co/dashboard/apps)** → click on your app
- The **"Install Signalog"** card at the top of your app dashboard (includes a copyable script tag)

## Rotating a Site ID

Site IDs cannot be rotated — they're permanent identifiers tied to your app. If you suspect leakage:

1. Add **Allowed Domains** to lock down the origins that can use the script
2. Or delete the app and create a new one (you'll lose historical feedback)

Signalog's API rejects requests from domains not in your allowed list, so a leaked Site ID by itself cannot be used to spam your dashboard.

## Next steps

- **[Install the script →](/install/)**
- **[Verify your install →](/install/verify)**
