# Frontend Review Checklist — Extended

## TypeScript Compliance

### Strict Mode

All frontend projects must have `strict: true` in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### No `any` Types

```tsx
// ❌ FAIL: any type used
function processUser(user: any) {
  return user.name.toUpperCase();
}

// ✅ PASS: proper typing
interface User {
  name: string;
  email: string;
}

function processUser(user: User) {
  return user.name.toUpperCase();
}

// ✅ PASS: unknown with type narrowing
function handleError(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  return "An unknown error occurred";
}
```

### Type Assertions

```tsx
// ❌ FAIL: unnecessary assertion
const name = data as string;

// ✅ PASS: type guard
function isString(value: unknown): value is string {
  return typeof value === "string";
}

if (isString(data)) {
  const name = data; // TypeScript knows it's string
}
```

## SolidJS Reactivity Rules

### Rule 1: Never Destructure Props

```tsx
// ❌ FAIL: destructuring breaks reactivity
const MyComponent: Component<Props> = ({ name, age }) => {
  return <div>{name}</div>;
};

// ✅ PASS: access props directly
const MyComponent: Component<Props> = (props) => {
  return <div>{props.name}</div>;
};
```

### Rule 2: Call Signals as Functions

```tsx
// ❌ FAIL: signal used without calling
const [count, setCount] = createSignal(0);
return <div>{count}</div>; // renders the function reference

// ✅ PASS: signal called as function
return <div>{count()}</div>; // renders the current value
```

### Rule 3: Use createMemo for Derived State

```tsx
// ❌ FAIL: computation in render body
const [items, setItems] = createSignal<Item[]>([]);
const sorted = items().sort((a, b) => a.name.localeCompare(b.name));
// ^ This creates a new sorted array on every access

// ✅ PASS: memoized derivation
const sorted = createMemo(() =>
  [...items()].sort((a, b) => a.name.localeCompare(b.name))
);
```

### Rule 4: Use <For> for Lists

```tsx
// ❌ FAIL: .map() doesn't track individual items
{items().map((item) => <ItemCard item={item} />)}

// ✅ PASS: <For> with keyed access for fine-grained updates
<For each={items()}>
  {(item) => <ItemCard item={item} />}
</For>
```

### Rule 5: Use <Show> for Conditionals

```tsx
// ❌ FAIL: ternary chains in JSX
{isLoading() ? <Spinner /> : error() ? <Error /> : <Content />}

// ✅ PASS: nested <Show> components
<Show when={isLoading()}>
  <Spinner />
</Show>
<Show when={!isLoading() && error()}>
  <Error />
</Show>
<Show when={!isLoading() && !error()}>
  <Content />
</Show>
```

## TailwindCSS 4 Patterns

### CSS-First Configuration

```css
/* ❌ FAIL: v3 directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ✅ PASS: v4 import */
@import "tailwindcss";

@theme {
  --color-primary-50: oklch(0.97 0.02 260);
  --color-primary-600: oklch(0.48 0.20 260);
}
```

### Class Ordering (via prettier-plugin-tailwindcss)

```tsx
// ❌ FAIL: inconsistent class order
<div class="text-red-500 p-4 bg-white hover:bg-gray-50 rounded-lg">

// ✅ PASS: Prettier sorts classes automatically
<div class="rounded-lg bg-white p-4 text-red-500 hover:bg-gray-50">
```

## Accessibility Checks

### Images

```tsx
// ❌ FAIL: missing alt text
<img src="/logo.png" />

// ✅ PASS: meaningful alt text
<img src="/logo.png" alt="Company logo" />

// ✅ PASS: decorative image
<img src="/divider.png" alt="" role="presentation" />
```

### Forms

```tsx
// ❌ FAIL: label not associated
<input type="email" placeholder="Enter email" />

// ✅ PASS: label associated via htmlFor
<label for="email">Email</label>
<input id="email" type="email" />

// ✅ PASS: wrapped label
<label>
  Email
  <input type="email" />
</label>

// ✅ PASS: aria-label for icon-only fields
<input type="search" aria-label="Search products" />
```

### Buttons

```tsx
// ❌ FAIL: no accessible name
<button><Icon icon="lucide:x" /></button>

// ✅ PASS: aria-label
<button aria-label="Close dialog">
  <Icon icon="lucide:x" />
</button>
```

### Focus Management

```tsx
// ❌ FAIL: no focus management after modal opens
<Show when={showModal()}>
  <div class="modal">...</div>
</Show>

// ✅ PASS: auto-focus first interactive element
<Show when={showModal()}>
  <div class="modal" ref={(el) => {
    const first = el.querySelector("button, [href], input");
    first?.focus();
  }}>
    ...
  </div>
</Show>
```

## Import Order

Verify imports follow this order with blank lines between groups:

```tsx
// 1. SolidJS core
import { type Component, createSignal, For, Show, createMemo } from "solid-js";

// 2. @solidjs/*
import { Title, Meta } from "@solidjs/meta";
import { useParams } from "@solidjs/router";

// 3. @iconify-icon/*
import { Icon } from "@iconify-icon/solid";

// 4. Local modules
import { useCustomContext } from "~/context/CustomContext";
import { formatDate } from "~/lib/utils";

// 5. CSS imports last
import "./styles.css";
```
