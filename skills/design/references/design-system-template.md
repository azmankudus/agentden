# Design System Template

> Use this template when running `/design ui` to produce the complete TailwindCSS v4 design system specification.

## Step-by-Step Instructions

1. **Define the color palette** — brand colors, surface colors, semantic colors, using oklch.
2. **Set typography scale** — font families, size scale, line heights, font weights.
3. **Define spacing system** — consistent 4px base grid.
4. **Design border and shadow tokens** — radius scale, elevation shadows.
5. **Build component variants** — Button, Input, Card, Badge, etc. with all states.
6. **Define animation tokens** — transitions, keyframes, reduced-motion support.
7. **Document layout system** — breakpoints, grid patterns, responsive behavior.
8. **Create dark mode strategy** — token overrides, toggle mechanism.

## 1. Color Palette

### Brand Colors (Primary)

| Token | Hex Approx | oklch | Usage |
|---|---|---|---|
| `--color-primary-50` | `#f0f0ff` | `oklch(0.97 0.01 260)` | Lightest background tint |
| `--color-primary-100` | `#e0e0ff` | `oklch(0.93 0.03 260)` | Light background |
| `--color-primary-200` | `#c7c7ff` | `oklch(0.87 0.06 260)` | Borders, dividers |
| `--color-primary-300` | `#a3a3ff` | `oklch(0.78 0.10 260)` | Disabled fills |
| `--color-primary-400` | `#8080ff` | `oklch(0.70 0.14 260)` | Hover states |
| `--color-primary-500` | `#5c5cff` | `oklch(0.62 0.18 260)` | Default interactive |
| `--color-primary-600` | `#4040e0` | `oklch(0.54 0.20 260)` | **Primary CTA** |
| `--color-primary-700` | `#3333b3` | `oklch(0.47 0.18 260)` | Pressed/active |
| `--color-primary-800` | `#262680` | `oklch(0.40 0.14 260)` | Dark text on light bg |
| `--color-primary-900` | `#1a1a4d` | `oklch(0.34 0.10 260)` | Headings on light bg |
| `--color-primary-950` | `#0d0d26` | `oklch(0.26 0.06 260)` | Maximum contrast text |

### Surface Colors

| Token | Usage | Light Mode | Dark Mode |
|---|---|---|---|
| `--color-surface` | Page background | `oklch(1.00 0 0)` (white) | `oklch(0.15 0 0)` |
| `--color-surface-secondary` | Card backgrounds, sidebar | `oklch(0.97 0 0)` | `oklch(0.20 0 0)` |
| `--color-surface-elevated` | Modals, dropdowns, popovers | `oklch(1.00 0 0)` | `oklch(0.25 0 0)` |
| `--color-surface-sunken` | Wells, inset areas | `oklch(0.95 0 0)` | `oklch(0.12 0 0)` |

### Text Colors

| Token | Usage | Light Mode | Dark Mode |
|---|---|---|---|
| `--color-on-surface` | Primary text, headings | `oklch(0.15 0 0)` | `oklch(0.95 0 0)` |
| `--color-on-surface-secondary` | Body text, descriptions | `oklch(0.45 0 0)` | `oklch(0.70 0 0)` |
| `--color-on-surface-variant` | Placeholders, hints, disabled | `oklch(0.60 0 0)` | `oklch(0.50 0 0)` |
| `--color-on-primary` | Text on primary backgrounds | `oklch(1.00 0 0)` | `oklch(1.00 0 0)` |

### Semantic Colors

| Token | Usage | oklch Value |
|---|---|---|
| `--color-success` | Positive states, confirmations | `oklch(0.72 0.19 155)` |
| `--color-success-bg` | Success background tint | `oklch(0.95 0.05 155)` |
| `--color-warning` | Caution, pending states | `oklch(0.80 0.18 85)` |
| `--color-warning-bg` | Warning background tint | `oklch(0.95 0.05 85)` |
| `--color-error` | Errors, destructive actions | `oklch(0.63 0.24 25)` |
| `--color-error-bg` | Error background tint | `oklch(0.95 0.05 25)` |
| `--color-info` | Informational, neutral highlights | `oklch(0.68 0.16 240)` |
| `--color-info-bg` | Info background tint | `oklch(0.95 0.05 240)` |

## 2. Typography Scale

### Font Families

| Token | Font Stack | Usage |
|---|---|---|
| `--font-sans` | `"Inter", ui-sans-serif, system-ui, -apple-system, sans-serif` | Body text, UI |
| `--font-mono` | `"JetBrains Mono", ui-monospace, "Cascadia Code", monospace` | Code, data |

### Size Scale

| Token | Size | Line Height | Usage |
|---|---|---|---|
| `--text-xs` | `0.75rem` (12px) | `1rem` (16px) | Captions, badges, timestamps |
| `--text-sm` | `0.875rem` (14px) | `1.25rem` (20px) | Table cells, labels, helper text |
| `--text-base` | `1rem` (16px) | `1.5rem` (24px) | Body text, default |
| `--text-lg` | `1.125rem` (18px) | `1.75rem` (28px) | Lead paragraphs |
| `--text-xl` | `1.25rem` (20px) | `1.75rem` (28px) | Section headings |
| `--text-2xl` | `1.5rem` (24px) | `2rem` (32px)` | Page titles |
| `--text-3xl` | `1.875rem` (30px) | `2.25rem` (36px) | Hero headings |
| `--text-4xl` | `2.25rem` (36px) | `2.5rem` (40px) | Display headings |

### Font Weights

| Weight | Value | Usage |
|---|---|---|
| `font-normal` | `400` | Body text |
| `font-medium` | `500` | Labels, table headers, button text |
| `font-semibold` | `600` | Headings, emphasis |
| `font-bold` | `700` | Strong emphasis, page titles |

## 3. Spacing System

Base unit: `0.25rem` (4px)

| Token | Value | Pixels | Usage |
|---|---|---|---|
| `space-0` | `0` | 0px | Reset |
| `space-0.5` | `0.125rem` | 2px | Tight gaps |
| `space-1` | `0.25rem` | 4px | Icon gaps, inline spacing |
| `space-1.5` | `0.375rem` | 6px | Tight component padding |
| `space-2` | `0.5rem` | 8px | Component internal padding |
| `space-3` | `0.75rem` | 12px | Component padding, small gaps |
| `space-4` | `1rem` | 16px | Standard padding, card internal |
| `space-5` | `1.25rem` | 20px | Section gaps |
| `space-6` | `1.5rem` | 24px | Large padding, section spacing |
| `space-8` | `2rem` | 32px | Page section gaps |
| `space-10` | `2.5rem` | 40px | Major section breaks |
| `space-12` | `3rem` | 48px | Page-level spacing |
| `space-16` | `4rem` | 64px | Hero section spacing |
| `space-20` | `5rem` | 80px | Major layout gaps |
| `space-24` | `6rem` | 96px | Maximum spacing |

## 4. Border & Shadow Tokens

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `0.25rem` (4px) | Small badges, tags |
| `--radius-md` | `0.375rem` (6px) | Buttons, inputs |
| `--radius-lg` | `0.5rem` (8px) | Cards, dialogs |
| `--radius-xl` | `0.75rem` (12px) | Large cards, modals |
| `--radius-2xl` | `1rem` (16px) | Feature cards |
| `--radius-full` | `9999px` | Avatars, pills |

### Border Widths

| Usage | Width | Color |
|---|---|---|
| Default border | `1px` | `--color-on-surface / 10%` |
| Focus ring | `2px` | `--color-primary-500` |
| Divider | `1px` | `--color-on-surface / 5%` |

### Elevation Shadows

| Token | Value | Usage |
|---|---|---|
| `--shadow-sm` | `0 1px 2px 0 oklch(0 0 0 / 0.05)` | Cards at rest |
| `--shadow-md` | `0 4px 6px -1px oklch(0 0 0 / 0.1)` | Elevated cards, dropdowns |
| `--shadow-lg` | `0 10px 15px -3px oklch(0 0 0 / 0.1)` | Modals, popovers |
| `--shadow-xl` | `0 20px 25px -5px oklch(0 0 0 / 0.1)` | Full-screen dialogs |
| `--shadow-focus` | `0 0 0 2px oklch(0.62 0.18 260 / 0.5)` | Focus ring shadow |

## 5. Component Variants

### Button

| Variant | Background | Text | Border | Hover | Focus Ring |
|---|---|---|---|---|---|
| **Primary** | `primary-600` | `surface` | none | `primary-700` | `primary-500` |
| **Secondary** | `surface-secondary` | `on-surface` | `on-surface/10` | `surface-elevated` | `primary-500` |
| **Ghost** | transparent | `on-surface-secondary` | none | `surface-secondary` | `primary-500` |
| **Destructive** | `error` | `surface` | none | `error/90` | `error` |
| **Outline** | transparent | `primary-600` | `primary-600` | `primary-50` | `primary-500` |

| Size | Padding | Font Size | Border Radius | Min Height |
|---|---|---|---|---|
| `sm` | `px-3 py-1.5` | `text-xs` | `rounded-md` | `28px` |
| `md` | `px-4 py-2` | `text-sm` | `rounded-lg` | `36px` |
| `lg` | `px-6 py-3` | `text-base` | `rounded-lg` | `44px` |

### Input

| State | Border | Background | Ring |
|---|---|---|---|
| **Default** | `on-surface/10` | `surface` | none |
| **Focus** | `primary-500` | `surface` | `2px primary-500/50` |
| **Error** | `error` | `surface` | `2px error/50` |
| **Disabled** | `on-surface/5` | `surface-secondary` | none |

### Badge

| Variant | Background | Text | Usage |
|---|---|---|---|
| **Default** | `on-surface/10` | `on-surface` | Neutral labels |
| **Primary** | `primary-100` | `primary-800` | Category, type |
| **Success** | `success-bg` | `success` | Active, completed |
| **Warning** | `warning-bg` | `warning` | Pending, caution |
| **Error** | `error-bg` | `error` | Failed, error |
| **Info** | `info-bg` | `info` | Informational |

## 6. Animation Tokens

### Transitions

| Property | Duration | Easing | Usage |
|---|---|---|---|
| Colors | `150ms` | `ease-out` | Hover states, toggles |
| Opacity | `200ms` | `ease-out` | Show/hide, fade |
| Transform | `200ms` | `ease-out` | Slide, scale |
| Layout | `300ms` | `ease-out` | Expand/collapse |

### Keyframes

| Name | Duration | Description |
|---|---|---|
| `fade-in` | `200ms` | Opacity 0 → 1 |
| `slide-up` | `300ms` | Opacity 0 → 1, translateY(8px) → 0 |
| `slide-down` | `300ms` | Opacity 0 → 1, translateY(-8px) → 0 |
| `scale-in` | `200ms` | Opacity 0 → 1, scale(0.95) → 1 |
| `spin` | `1000ms` | Rotate 0 → 360deg (loading indicators) |

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 7. Breakpoint System

| Breakpoint | Min Width | Layout | Sidebar | Grid Columns |
|---|---|---|---|---|
| `xs` | 475px | Single column | Hidden | 1 |
| `sm` | 640px | Single column | Hidden (hamburger) | 2 |
| `md` | 768px | Two column | Overlay (collapsible) | 2-3 |
| `lg` | 1024px | Full layout | Persistent (w-64) | 3-4 |
| `xl` | 1280px | Full + wide content | Persistent (w-64) | 4-6 |
| `2xl` | 1536px | Max-width (1536px) | Persistent (w-64) | 6-12 |

## 8. Dark Mode Strategy

### Approach

CSS custom properties defined in `@theme` are overridden in dark mode using
a `.dark` class on the `<html>` element. This enables runtime toggle while
still respecting `prefers-color-scheme` as the default.

### Toggle Implementation

```tsx
// src/stores/theme.ts
import { createSignal, createEffect, on } from "solid-js";

type Theme = "light" | "dark" | "system";

const [theme, setTheme] = createSignal<Theme>(
  (localStorage.getItem("theme") as Theme) ?? "system"
);

createEffect(on(theme, (t) => {
  const resolved = t === "system"
    ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    : t;

  document.documentElement.classList.toggle("dark", resolved === "dark");
  localStorage.setItem("theme", t);
}, { defer: true }));
```

### Token Override Pattern

```css
/* In src/app.css */
@custom-variant dark (&:where(.dark, .dark *));

@variant dark {
  :root {
    --color-surface: oklch(0.15 0 0);
    --color-surface-secondary: oklch(0.20 0 0);
    --color-surface-elevated: oklch(0.25 0 0);
    --color-surface-sunken: oklch(0.12 0 0);
    --color-on-surface: oklch(0.95 0 0);
    --color-on-surface-secondary: oklch(0.70 0 0);
    --color-on-surface-variant: oklch(0.50 0 0);
    --shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.2);
    --shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.3);
    --shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.3);
  }
}
```

## Design System Checklist

- [ ] Color palette defined with oklch values (50–950 scale)
- [ ] Surface and text colors defined for light and dark modes
- [ ] Semantic colors (success, warning, error, info) with background tints
- [ ] Typography scale with sizes, line heights, and font weights
- [ ] Spacing system on 4px base grid
- [ ] Border radius, width, and shadow tokens
- [ ] Button variants (primary, secondary, ghost, destructive, outline) with sizes
- [ ] Input states (default, focus, error, disabled)
- [ ] Badge variants for all semantic colors
- [ ] Animation tokens with reduced-motion fallback
- [ ] Breakpoint system with layout behavior per breakpoint
- [ ] Dark mode toggle mechanism and token overrides
- [ ] All tokens implemented in `@theme` directive in `src/app.css`
- [ ] Contrast ratios verified for WCAG AA compliance
