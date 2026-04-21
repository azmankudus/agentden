# Frontend Conventions

## SolidJS Reactivity Rules

1. **Signals are the primitive**: Use `createSignal` for local component state.
2. **Never destructure props**: Access props with `props.x` — destructuring breaks reactivity.
3. **Use `createMemo` for derived state**: Don't compute values in the render body.
4. **Use `createEffect` for side effects**: Not for data fetching — use `createResource`.
5. **`createResource` for async data**: Combine with route data for SSR/SSG.
6. **Fine-grained updates**: SolidJS updates only what changes — don't fight it with immutable patterns.

### Signal Patterns

```tsx
// Correct: Access via getter
const [count, setCount] = createSignal(0);
const doubled = createMemo(() => count() * 2);

// Wrong: Destructuring props
const { name, age } = props; // BREAKS REACTIVITY

// Correct: Props access
const displayName = () => props.name;
```

### Reactive vs Non-Reactive

```tsx
// Reactive: runs when count() changes
createEffect(() => {
  console.log(count());
});

// Non-reactive: runs once
console.log(count());

// Reactive: re-runs on signal change
const sorted = createMemo(() =>
  [...items()].sort((a, b) => a.name.localeCompare(b.name))
);
```

## TypeScript Standards

- `strict: true` always enabled
- No `any` types — use `unknown` and type narrowing
- Interfaces for props, type aliases for unions/intersections
- Generic types for reusable components
- Explicit return types on exported functions
- Use `satisfies` for type checking without widening

### Type Patterns

```tsx
// Props interface
interface UserCardProps {
  user: User;
  variant?: "compact" | "full";
  onSelect?: (id: string) => void;
}

// Generic component
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => JSX.Element;
  keyFn: (item: T) => string;
}

function List<T>(props: ListProps<T>) {
  return (
    <For each={props.items} fallback={<p>No items</p>}>
      {(item) => props.renderItem(item)}
    </For>
  );
}

// Type narrowing with unknown
function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}
```

## TailwindCSS v4 Patterns

### Configuration (CSS-first)

```css
/* app.css — replaces tailwind.config.js */
@import "tailwindcss";

@theme {
  --color-primary-50: oklch(0.97 0.02 260);
  --color-primary-100: oklch(0.93 0.04 260);
  --color-primary-200: oklch(0.87 0.08 260);
  --color-primary-300: oklch(0.78 0.12 260);
  --color-primary-400: oklch(0.68 0.16 260);
  --color-primary-500: oklch(0.55 0.20 260);
  --color-primary-600: oklch(0.48 0.20 260);
  --color-primary-700: oklch(0.40 0.18 260);
  --color-primary-800: oklch(0.33 0.14 260);
  --color-primary-900: oklch(0.27 0.10 260);

  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --breakpoint-3xl: 120rem;
}
```

### Usage Patterns

```tsx
// Use oklch custom colors via Tailwind utilities
<div class="bg-primary-50 text-primary-700 border-primary-200">

// Responsive design
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

// Dark mode (class-based)
<div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white">

// Hover, focus, active states
<button class="bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:ring-primary-500 active:bg-primary-800">

// Transitions
<div class="transition-colors duration-200 ease-in-out">
```

### Anti-patterns

```css
/* Wrong: Old @tailwind directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Correct: v4 import */
@import "tailwindcss";
```

```tsx
/* Wrong: Inline styles */
<div style={{ backgroundColor: '#3b82f6', padding: '16px' }}>

/* Correct: Tailwind utilities */
<div class="bg-blue-500 p-4">
```

## Component Structure

```tsx
// Imports: solid-js → @solidjs/* → @iconify-icon/* → local
import { type Component, createSignal, For, Show } from "solid-js";
import { Title } from "@solidjs/meta";
import { Icon } from "@iconify-icon/solid";
import { useCustomContext } from "~/context";

// Types
interface ComponentProps {
  title: string;
  items: string[];
  onSelect?: (item: string) => void;
}

// Component
const ComponentName: Component<ComponentProps> = (props) => {
  const [selected, setSelected] = createSignal<string | null>(null);

  const handleSelect = (item: string) => {
    setSelected(item);
    props.onSelect?.(item);
  };

  return (
    <div class="space-y-2">
      <h2 class="text-lg font-semibold">{props.title}</h2>
      <For each={props.items}>
        {(item) => (
          <button
            class={`
              w-full rounded px-3 py-2 text-left text-sm transition-colors
              ${selected() === item
                ? "bg-primary-50 text-primary-700"
                : "hover:bg-gray-50 text-gray-700"
              }
            `}
            onClick={() => handleSelect(item)}
          >
            {item}
          </button>
        )}
      </For>
    </div>
  );
};

export { ComponentName };
```

## Import Order

1. SolidJS core (`solid-js`)
2. SolidStart / Solid Router / Solid Meta (`@solidjs/*`)
3. Iconify (`@iconify-icon/solid`)
4. Local modules (`~/components/*`, `~/lib/*`, `~/types/*`)
5. CSS imports last

## Iconify Usage

```tsx
import { Icon } from "@iconify-icon/solid";

// Lucide icons (preferred set)
<Icon icon="lucide:plus" />
<Icon icon="lucide:search" class="text-lg" />
<Icon icon="lucide:trash-2" class="text-red-500" />

// Common icon sets
// lucide:*     — General UI icons
// mdi:*        — Material Design icons
// heroicons:*  — Heroicons
// ph:*         — Phosphor icons
```
