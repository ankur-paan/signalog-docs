---
title: JavaScript API — Programmatic Triggers
description: Full programmatic control over the Signalog widget via the global SignalogPlugin object.
---

# JavaScript API (Programmatic Triggers)

If you need more control over how and when the widget opens, you can trigger it programmatically using the global `SignalogPlugin` object.

## Opening the Widget

Use `openWidget()` to open the widget. You can pass an options object to specify the **display mode**, **position**, and the **specific panel** to open.

### Display Modes

```javascript
// Open as a detached window (default)
SignalogPlugin.openWidget({ mode: 'window' })

// Open as a centered modal
SignalogPlugin.openWidget({ mode: 'modal' })

// Open as a side drawer (right is default)
SignalogPlugin.openWidget({ mode: 'drawer', position: 'right' })

// Open as a left-side drawer
SignalogPlugin.openWidget({ mode: 'drawer', position: 'left' })
```

| Mode      | Description                                       |
| --------- | ------------------------------------------------- |
| `window`  | Floating window in the bottom-right corner        |
| `modal`   | Centered modal with backdrop                      |
| `drawer`  | Side drawer (use `position: 'left'` or `'right'`) |
| `fab`     | Show the floating action button only              |
| `hidden`  | Hide the widget entirely                          |

### Direct Navigation

You can open a specific panel directly by passing the `trigger` option:

```javascript
// Opens the feedback panel
SignalogPlugin.openWidget({ trigger: 'feedback' })

// Opens the bug report panel
SignalogPlugin.openWidget({ trigger: 'bugReport' })

// Opens the feature request panel
SignalogPlugin.openWidget({ trigger: 'featureRequest' })

// Opens the changelog / what's new panel
SignalogPlugin.openWidget({ trigger: 'changeLogs' })
```

| Trigger key       | Opens panel       |
| ----------------- | ----------------- |
| `feedback`        | Feedback          |
| `bugReport`       | Bug report        |
| `featureRequest`  | Feature request   |
| `changeLogs`      | Changelog         |

### Combining mode and trigger

You can combine both:

```javascript
// Open the feedback panel as a centered modal
SignalogPlugin.openWidget({
  mode: 'modal',
  trigger: 'feedback',
})

// Open the changelog as a right-side drawer
SignalogPlugin.openWidget({
  mode: 'drawer',
  position: 'right',
  trigger: 'changeLogs',
})
```

## Closing and Toggling

```javascript
// Closes the widget
SignalogPlugin.closeWidget()

// Toggles the widget state (opens if closed, closes if open)
SignalogPlugin.toggleWidget()
```

## Floating Action Button (FAB) Visibility

Programmatically show or hide the default Floating Action Button trigger:

```javascript
// Hide the FAB (your buttons trigger the widget instead)
SignalogPlugin.showTrigger.value = false

// Show the FAB again
SignalogPlugin.showTrigger.value = true
```

::: tip Why `.value`?
`showTrigger` is a Vue 3 ref under the hood. Setting `.value` triggers reactivity inside the widget — the FAB animates in or out smoothly.
:::

## Practical patterns

### Show widget only after sign-up

```javascript
// On your sign-up success handler
window.SignalogPlugin?.openWidget({
  mode: 'modal',
  trigger: 'feedback',
})
```

### Open feedback when user spends >2 min on page

```javascript
setTimeout(() => {
  if (window.SignalogPlugin) {
    window.SignalogPlugin.openWidget({ trigger: 'feedback' })
  }
}, 120000)
```

### Trigger from a keyboard shortcut

```javascript
document.addEventListener('keydown', (e) => {
  // Cmd+/ or Ctrl+/ opens feedback
  if ((e.metaKey || e.ctrlKey) && e.key === '/') {
    e.preventDefault()
    window.SignalogPlugin?.toggleWidget()
  }
})
```

### Defer until widget is loaded

The script loads asynchronously, so `SignalogPlugin` may not exist yet on first interaction. Check before calling:

```javascript
function openSignalog(opts = {}) {
  if (window.SignalogPlugin) {
    window.SignalogPlugin.openWidget(opts)
  } else {
    // Retry once the script lands
    document.addEventListener('signalog:ready', () => {
      window.SignalogPlugin.openWidget(opts)
    }, { once: true })
  }
}
```

The widget dispatches a `signalog:ready` event on `document` once `SignalogPlugin` is available.

## Next steps

- **[TypeScript support →](/guide/typescript)**
- **[API reference →](/api/signalog-plugin)**
