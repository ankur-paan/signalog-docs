---
title: Install Signalog in Flask
description: Add Signalog to a Flask app via Jinja2 base templates and an app context processor.
---

# Flask

## Method 1 — Base Jinja2 template

Add to your base template `templates/base.html`:

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{% block title %}My App{% endblock %}</title>
  </head>
  <body>
    {% block content %}{% endblock %}

    <script src="https://cdn.signalog.co/widget.js" data-site-id="{{ signalog_site_id }}"></script>
  </body>
</html>
```

## Pass Site ID via app context

```python
# app.py
from flask import Flask, render_template
import os

app = Flask(__name__)
app.config['SIGNALOG_SITE_ID'] = os.environ.get('SIGNALOG_SITE_ID', '')

@app.context_processor
def inject_signalog():
    return {'signalog_site_id': app.config['SIGNALOG_SITE_ID']}

@app.route('/')
def index():
    return render_template('index.html')
```

This injects `signalog_site_id` into every rendered template — no per-route code needed.

Set in your environment:

```bash
export SIGNALOG_SITE_ID=site_abc123xyz456
```

Or in `.env` with python-dotenv:

```bash
# .env
SIGNALOG_SITE_ID=site_abc123xyz456
```

```python
# app.py
from dotenv import load_dotenv
load_dotenv()
```

## Blueprints

If you use [Flask Blueprints](https://flask.palletsprojects.com/en/latest/blueprints/), the context processor on the main `app` object applies to all blueprints automatically. No per-blueprint configuration required.

## Next steps

- **[Verify the install →](/install/verify)**
