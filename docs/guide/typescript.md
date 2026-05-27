---
title: TypeScript Support
description: Add type declarations for the global SignalogPlugin object — autocomplete and type checking in any TS project.
---

# TypeScript Support

If your project uses TypeScript, add these type declarations to get autocomplete and type checking for the global `SignalogPlugin` object.

## Add the declaration file

Create a `signalog.d.ts` file (or add to your existing `global.d.ts`) anywhere in your source directory:

```typescript
// signalog.d.ts
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
  /** Opens the Signalog widget with the given options. */
  openWidget: (options?: OpenWidgetOptions) => void

  /** Closes the Signalog widget. */
  closeWidget: () => void

  /** Toggles the Signalog widget state. */
  toggleWidget: () => void

  /** Controls the visibility of the default Floating Action Button (FAB). */
  showTrigger: {
    value: boolean
  }
}

declare global {
  interface Window {
    SignalogPlugin: SignalogPluginGlobal
  }
}
```

That's it. You now get:

- **Autocomplete** when typing `SignalogPlugin.`
- **Type errors** when passing the wrong `mode` or `trigger` value
- **IntelliSense docs** for every method

## Usage with type checking

```typescript
// ✅ OK
window.SignalogPlugin.openWidget({ mode: 'modal', trigger: 'feedback' })

// ✅ OK — drawer requires position
window.SignalogPlugin.openWidget({ mode: 'drawer', position: 'left' })

// ❌ Type error — 'invalid' is not a valid trigger
window.SignalogPlugin.openWidget({ trigger: 'invalid' })

// ❌ Type error — modal doesn't accept position
window.SignalogPlugin.openWidget({ mode: 'modal', position: 'left' })
```

## Safe access pattern

Since the widget loads asynchronously, `window.SignalogPlugin` is `undefined` until the script lands. Use optional chaining:

```typescript
window.SignalogPlugin?.openWidget({ trigger: 'feedback' })
```

Or guard with a runtime check:

```typescript
if (typeof window !== 'undefined' && window.SignalogPlugin) {
  window.SignalogPlugin.openWidget({ trigger: 'feedback' })
}
```

The `typeof window` check is important if your code runs during SSR (Next.js, Nuxt, Remix, SvelteKit, etc.).

## React hook pattern

A reusable hook for React projects:

```tsx
// useSignalog.ts
import { useCallback } from 'react'
import type { OpenWidgetOptions } from './signalog'

export function useSignalog() {
  const open = useCallback((options?: OpenWidgetOptions) => {
    window.SignalogPlugin?.openWidget(options)
  }, [])

  const close = useCallback(() => {
    window.SignalogPlugin?.closeWidget()
  }, [])

  const toggle = useCallback(() => {
    window.SignalogPlugin?.toggleWidget()
  }, [])

  return { open, close, toggle }
}
```

Usage:

```tsx
function HelpMenu() {
  const { open } = useSignalog()

  return (
    <button onClick={() => open({ mode: 'modal', trigger: 'feedback' })}>
      Give us feedback
    </button>
  )
}
```

## Vue composable

```typescript
// useSignalog.ts
import type { OpenWidgetOptions } from './signalog'

export function useSignalog() {
  const open = (options?: OpenWidgetOptions) =>
    window.SignalogPlugin?.openWidget(options)

  const close = () => window.SignalogPlugin?.closeWidget()
  const toggle = () => window.SignalogPlugin?.toggleWidget()

  return { open, close, toggle }
}
```

## Next steps

- **[Full API reference →](/api/signalog-plugin)**
