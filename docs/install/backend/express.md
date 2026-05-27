---
title: Install Signalog in Express.js / Node.js
description: Express serves HTML via template engines — install Signalog through your EJS, Pug, or Handlebars templates.
---

# Express.js / Node.js

Express serves HTML — add the script to your template engine or static HTML files.

## EJS templates

```html
<!-- views/layout.ejs -->
<!DOCTYPE html>
<html>
  <head>
    <title><%= title %></title>
  </head>
  <body>
    <%- body %>

    <script src="https://cdn.signalog.co/widget.js" data-site-id="<%= signalogSiteId %>"></script>
  </body>
</html>
```

Pass the Site ID from your route — or globally via `res.locals`:

```javascript
// app.js
const express = require('express')
const app = express()

app.set('view engine', 'ejs')

// Make Signalog site ID available to all views
app.use((req, res, next) => {
  res.locals.signalogSiteId = process.env.SIGNALOG_SITE_ID || 'YOUR_SITE_ID'
  next()
})

app.get('/', (req, res) => {
  res.render('index', { title: 'Home' })
})

app.listen(3000)
```

The middleware approach ensures every rendered view has access to `signalogSiteId` without per-route passing.

## Pug templates

```pug
//- views/layout.pug
html
  head
    title= title
  body
    block content

    script(
      src="https://cdn.signalog.co/widget.js"
      data-site-id=signalogSiteId
    )
```

## Handlebars (hbs)

```handlebars
{{! views/layouts/main.hbs }}

<html>
  <head><title>{{title}}</title></head>
  <body>
    {{{body}}}

    <script src='https://cdn.signalog.co/widget.js' data-site-id='{{signalogSiteId}}'>
    </script>
  </body>
</html>
```

## Static HTML served by Express

If Express only serves static files (`app.use(express.static('public'))`), just add the script tag to your HTML files like a [plain HTML install](/install/cms/html). The Express server itself doesn't need to know about Signalog.

## Fastify, Koa, Hapi

The pattern is identical — set a template-engine variable for the Site ID, render it into your layout. Refer to your framework's template documentation for the exact syntax.

## Next steps

- **[Verify the install →](/install/verify)**
