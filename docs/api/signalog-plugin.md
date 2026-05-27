---
title: SignalogPlugin Global Reference
description: Full reference for window.SignalogPlugin — methods, types, and reactive state.
---

# `SignalogPlugin` Global

Available as `window.SignalogPlugin` after the widget script finishes loading.

## Methods

### `openWidget(options?)`

Opens the widget. All options are optional.

```typescript
openWidget(options?: OpenWidgetOptions): void
```

#### `OpenWidgetOptions`

| Option     | Type                                                                  | Default     | Description                                                        |
| ---------- | --------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `mode`     | `'fab' \| 'window' \| 'drawer' \| 'modal' \| 'hidden'`                | `'window'`  | How the widget is displayed                                        |
| `position` | `'left' \| 'right'`                                                   | `'right'`   | Only valid when `mode: 'drawer'`                                   |
| `trigger`  | `'feedback' \| 'changeLogs' \| 'bugReport' \| 'featureRequest'`       | `undefined` | Open a specific panel directly. Without this, the main menu shows. |

#### Examples

```javascript
// Open as default (window mode)
SignalogPlugin.openWidget()

// Open as a centered modal
SignalogPlugin.openWidget({ mode: 'modal' })

// Open as a left-side drawer, directly to the feedback panel
SignalogPlugin.openWidget({
  mode: 'drawer',
  position: 'left',
  trigger: 'feedback',
})

// Open to the bug report panel
SignalogPlugin.openWidget({ trigger: 'bugReport' })
```

---

### `closeWidget()`

Closes the widget if it's open. No-op if already closed.

```typescript
closeWidget(): void
```

```javascript
SignalogPlugin.closeWidget()
```

---

### `toggleWidget()`

Toggles the widget — opens if closed, closes if open.

```typescript
toggleWidget(): void
```

```javascript
SignalogPlugin.toggleWidget()
```

If the widget is opened via toggle (no options), it opens in default `window` mode showing the main menu.

---

## Reactive state

### `showTrigger`

Controls the visibility of the default Floating Action Button (FAB) — the corner widget icon.

```typescript
showTrigger: { value: boolean }
```

#### Read current value

```javascript
const isVisible = SignalogPlugin.showTrigger.value
console.log(isVisible) // true or false
```

#### Hide the FAB

```javascript
SignalogPlugin.showTrigger.value = false
```

#### Show the FAB

```javascript
SignalogPlugin.showTrigger.value = true
```

::: tip Why is this `.value` instead of a setter?
`showTrigger` is a Vue 3 ref under the hood. Setting `.value` triggers reactivity inside the widget — the FAB animates in or out smoothly without a re-render flash.
:::

---

## Type signature (TypeScript)

```typescript
export type Mode = 'fab' | 'window' | 'drawer' | 'modal' | 'hidden'

export type DrawerPosition = 'left' | 'right'

export type WidgetTriggerKey =
  | 'feedback'
  | 'changeLogs'
  | 'bugReport'
  | 'featureRequest'
  | (string & {})

export type OpenWidgetOptionsBase = { trigger?: WidgetTriggerKey }

export type OpenWidgetOptions = OpenWidgetOptionsBase &
  (
    | { mode?: Exclude<Mode, 'drawer'> }
    | { mode: 'drawer'; position?: DrawerPosition }
  )

export interface SignalogPluginGlobal {
  openWidget: (options?: OpenWidgetOptions) => void
  closeWidget: () => void
  toggleWidget: () => void
  showTrigger: { value: boolean }
}

declare global {
  interface Window {
    SignalogPlugin: SignalogPluginGlobal
  }
}
```

See **[TypeScript Support](/guide/typescript)** for usage with React, Vue, and other frameworks.
