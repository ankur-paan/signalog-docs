---
title: Install Signalog in Django
description: Add Signalog to a Django app via base templates and a context processor.
---

# Django

## Method 1 — Base template

Add to your base template, typically `templates/base.html`:

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>{% block title %}My Site{% endblock %}</title>
    {% load static %}
  </head>
  <body>
    {% block content %}{% endblock %}

    <!-- Signalog widget -->
    <script src="https://cdn.signalog.co/widget.js" data-site-id="{{ SIGNALOG_SITE_ID }}"></script>
  </body>
</html>
```

## Pass Site ID via context processor

Create a context processor to make the Site ID available globally in every template:

```python
# myapp/context_processors.py
from django.conf import settings

def signalog(request):
    return {
        'SIGNALOG_SITE_ID': getattr(settings, 'SIGNALOG_SITE_ID', '')
    }
```

Register it in `settings.py`:

```python
# settings.py
import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'OPTIONS': {
            'context_processors': [
                # ... existing processors
                'myapp.context_processors.signalog',
            ],
        },
    },
]

# Add your Site ID
SIGNALOG_SITE_ID = os.environ.get('SIGNALOG_SITE_ID', '')
```

Then set it in your environment:

```bash
# .env or production environment
SIGNALOG_SITE_ID=site_abc123xyz456
```

## Method 2 — Direct in template

If you don't use a context processor:

```html
{% load static %}
<script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
```

This works for prototypes but doesn't survive `DEBUG=False` environments without hard-coding.

## Django + CSP

If you use [django-csp](https://django-csp.readthedocs.io/), add Signalog's CDN to your allowed sources:

```python
# settings.py
CSP_SCRIPT_SRC = ("'self'", "https://cdn.signalog.co")
CSP_CONNECT_SRC = ("'self'", "https://api.signalog.co")
```

## Next steps

- **[Verify the install →](/install/verify)**
