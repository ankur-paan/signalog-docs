---
title: Data Attributes Reference
description: Declarative HTML triggers — open any Signalog panel from any element with a single attribute.
---

# Data Attributes

Declarative trigger attributes for opening Signalog panels from any HTML element. No JavaScript required.

## `data-signalog`

The only attribute. Its value determines which panel to open on click.

```html
<button data-signalog="feedback">Send feedback</button>
```

### Allowed values

| Value         | Opens panel       | Use case                                     |
| ------------- | ----------------- | -------------------------------------------- |
| `"bug"`       | Bug report        | "Report a bug" / "Something broken?"         |
| `"feedback"`  | General feedback  | "Give feedback" / "Suggest improvements"     |
| `"feature"`   | Feature request   | "Request a feature" / "What would help you?" |
| `"changelog"` | Changelog         | "What's new" / "Recent updates"              |

### Element compatibility

Works on **any HTML element** — `<button>`, `<a>`, `<div>`, `<span>`, `<li>`, etc. The widget attaches a click listener on document level, so the attribute can be applied anywhere.

```html
<!-- Button -->
<button data-signalog="bug">Report bug</button>

<!-- Link -->
<a href="#feedback" data-signalog="feedback">Feedback</a>

<!-- Custom interactive element -->
<div role="button" tabindex="0" data-signalog="feature">
  Suggest a feature
</div>

<!-- Icon button -->
<button data-signalog="changelog" aria-label="What's new">
  <svg><!-- bell icon --></svg>
</button>
```

### With React / JSX

JSX passes `data-*` attributes through to the DOM verbatim. No special handling needed:

```tsx
<button data-signalog="feedback">Give feedback</button>
```

### Click behavior

When the element is clicked:

1. Signalog cancels the default action (`preventDefault()`)
2. The corresponding panel opens in `window` mode
3. The element's `:active` and focus styles still apply normally

::: warning Don't combine with `onClick` for the same trigger
If you put both `data-signalog="feedback"` and an `onClick` handler that calls `openWidget`, the widget will open and immediately re-open. Use one or the other.
:::

## Why declarative attributes?

You could open panels from JavaScript:

```javascript
button.addEventListener('click', () => {
  window.SignalogPlugin.openWidget({ trigger: 'feedback' })
})
```

But the declarative approach has three advantages:

1. **Server-rendered safe.** The attribute renders in HTML — no client-side JavaScript needed to wire it up.
2. **Survives hydration.** No race conditions where the button is clickable before the JS handler is attached.
3. **Smaller bundle.** Zero extra code in your app.

For dynamic cases (open on timer, open after auth, etc.), use the [JavaScript API](/guide/javascript-api) instead.
