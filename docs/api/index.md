---
title: API Reference
description: Complete reference for the Signalog widget — global SignalogPlugin object, data attributes, and types.
---

# API Reference

The Signalog widget exposes two ways to interact with it from your code:

| Surface           | Use for…                                                            |
| ----------------- | ------------------------------------------------------------------- |
| `SignalogPlugin`  | Programmatic control from JavaScript (open, close, toggle, modes)   |
| `data-signalog`   | Declarative HTML triggers on any element — no JS required           |

## Quick links

- **[`SignalogPlugin` global →](/api/signalog-plugin)** — `openWidget()`, `closeWidget()`, `toggleWidget()`, `showTrigger`
- **[`data-signalog` attributes →](/api/data-attributes)** — `bug`, `feedback`, `feature`, `changelog`

## TypeScript users

See **[TypeScript Support](/guide/typescript)** for the full type declarations.

## Loading order

The script is async — `window.SignalogPlugin` becomes available **after** the script downloads and executes. Code that runs before then must guard:

```javascript
window.SignalogPlugin?.openWidget({ trigger: 'feedback' })
```

Or wait for the `signalog:ready` event:

```javascript
document.addEventListener('signalog:ready', () => {
  window.SignalogPlugin.openWidget({ trigger: 'feedback' })
}, { once: true })
```

## Events

| Event name        | Dispatched on  | When                                          |
| ----------------- | -------------- | --------------------------------------------- |
| `signalog:ready`  | `document`     | After the global `SignalogPlugin` is set up   |
| `signalog:open`   | `document`     | When the widget opens                         |
| `signalog:close`  | `document`     | When the widget closes                        |
| `signalog:submit` | `document`     | After a user submits feedback                 |

Listen with standard `addEventListener`:

```javascript
document.addEventListener('signalog:submit', (e) => {
  console.log('User submitted feedback:', e.detail)
})
```
