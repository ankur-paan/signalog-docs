---
title: Custom Trigger Buttons
description: Open a specific Signalog panel when a user clicks any button — no JavaScript required, just a data-signalog attribute.
---

# Custom Trigger Buttons

Open a specific Signalog panel when a user clicks any button on your site. **No JavaScript required** — just add a `data-signalog` attribute.

## The four triggers

```html
<!-- Opens bug report panel -->
<button data-signalog="bug">Report a bug</button>

<!-- Opens feedback panel -->
<button data-signalog="feedback">Send feedback</button>

<!-- Opens feature request panel -->
<button data-signalog="feature">Request a feature</button>

<!-- Opens changelog / what's new panel -->
<button data-signalog="changelog">What's new</button>
```

| Attribute value           | Opens                              |
| ------------------------- | ---------------------------------- |
| `data-signalog="bug"`     | Bug report panel                   |
| `data-signalog="feedback"`| General feedback panel             |
| `data-signalog="feature"` | Feature request panel              |
| `data-signalog="changelog"`| Changelog ("what's new") panel    |

## Works on any HTML element

Not just `<button>` — any element with the attribute becomes a trigger:

```html
<!-- On a link -->
<a href="#" data-signalog="feedback">Give us feedback</a>

<!-- On a div -->
<div data-signalog="bug" style="cursor: pointer">Found something broken?</div>

<!-- On an icon button -->
<button data-signalog="changelog" aria-label="What's new">🔔</button>
```

## React / JSX

```tsx
function HelpMenu() {
  return (
    <>
      <button data-signalog="bug">Report a bug</button>
      <button data-signalog="feedback">Give feedback</button>
      <button data-signalog="feature">Request feature</button>
      <button data-signalog="changelog">What's new</button>
    </>
  )
}
```

::: tip React 19 and below
JSX passes `data-*` attributes through to the DOM unchanged. No special handling needed — Signalog will pick up the attribute and wire up the click handler.
:::

## Vue

```vue
<template>
  <button data-signalog="feedback">Send feedback</button>
  <button data-signalog="bug">Report bug</button>
</template>
```

## Svelte

```svelte
<button data-signalog="feature">Suggest a feature</button>
```

## Hiding the default FAB

If you only want triggers from your own buttons (no floating action button in the corner), hide it programmatically:

```javascript
// Once the script has loaded
window.SignalogPlugin.showTrigger.value = false
```

Or react-style, after mount:

```tsx
useEffect(() => {
  if (window.SignalogPlugin) {
    window.SignalogPlugin.showTrigger.value = false
  }
}, [])
```

See the **[JavaScript API](/guide/javascript-api)** for the full programmatic control surface.

## Next steps

- **[JavaScript API →](/guide/javascript-api)**
- **[TypeScript support →](/guide/typescript)**
