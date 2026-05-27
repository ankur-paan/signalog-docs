---
title: Install Signalog in Angular
description: Three approaches — index.html, angular.json scripts, or dynamic loading via Renderer2.
---

# Angular

## Method 1 — `index.html` (recommended)

Add to `src/index.html` before `</body>`:

```html
<!-- src/index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>My App</title>
    <base href="/" />
  </head>
  <body>
    <app-root></app-root>

    <script src="https://cdn.signalog.co/widget.js" data-site-id="YOUR_SITE_ID"></script>
  </body>
</html>
```

This is the simplest path and runs the script outside Angular's lifecycle — exactly what you want for a third-party widget.

## Method 2 — `angular.json` scripts

Add to the `scripts` array in `angular.json`. Note: this method treats it as a local script, so **Method 1 is preferred** for CDN scripts.

## Method 3 — `AppComponent`

Load dynamically in `app.component.ts` using Angular's `Renderer2` (SSR-safe):

```typescript
// app.component.ts
import { Component, OnInit, Renderer2, Inject } from '@angular/core'
import { DOCUMENT } from '@angular/common'

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
  ) {}

  ngOnInit() {
    const script = this.renderer.createElement('script')
    script.src = 'https://cdn.signalog.co/widget.js'
    script.setAttribute('data-site-id', 'YOUR_SITE_ID')
    script.async = true
    this.renderer.appendChild(this.document.body, script)
  }
}
```

Use this when you want conditional loading (e.g. only after auth resolves).

## Angular Universal (SSR)

The widget is client-only and shouldn't render on the server. Method 1 (script tag in `index.html`) is automatically skipped during SSR by the browser. If using Method 3, guard with `isPlatformBrowser`:

```typescript
import { isPlatformBrowser } from '@angular/common'
import { PLATFORM_ID, Inject } from '@angular/core'

constructor(@Inject(PLATFORM_ID) private platformId: object) {}

ngOnInit() {
  if (!isPlatformBrowser(this.platformId)) return
  // ...load script
}
```

## Next steps

- **[Verify the install →](/install/verify)**
