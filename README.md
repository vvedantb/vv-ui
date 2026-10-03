# vv-ui

Shared UI for vmem, vibot and Verve web. One token file, one primitive library (vmem's `@vmem/ui`), and two shell pieces.

| Package | What it is |
| --- | --- |
| `@vv/tokens` | One CSS entry for Tailwind v4 apps: colour, radius, shadow, easing and font tokens, light and dark themes, and body defaults. |
| `@vv/ui` | Shared React 19 primitives from vmem's `packages/ui` (Radix, CVA, Tailwind v4 classes). Source-exported. Colour, radius, shadow and font come from `@vv/tokens`, not a second token file. |
| `@vv/shell` | React 19 components with no router dependency: `SidebarHeader` and `PillTabs`. Only copy; they are not also in `@vv/ui`. |

All three packages are private. Do not publish them to npm.

## Install

Add the packages by path or git, not from npm.

```json
// app package.json, path install (local checkout)
"dependencies": {
  "@vv/tokens": "link:../vv-ui/packages/tokens",
  "@vv/ui": "link:../vv-ui/packages/ui",
  "@vv/shell": "link:../vv-ui/packages/shell"
}
```

The private GitHub repo is [vvedantb/vv-ui](https://github.com/vvedantb/vv-ui). In an app `package.json`:

```json
"@vv/tokens": "github:vvedantb/vv-ui#main&path:packages/tokens",
"@vv/ui": "github:vvedantb/vv-ui#main&path:packages/ui",
"@vv/shell": "github:vvedantb/vv-ui#main&path:packages/shell"
```

`@vv/tokens` and `@vv/ui` are source and need no compile step. `@vv/shell`'s `dist` folder is not committed, so build that package after install (`pnpm build` in this repo) before Tailwind scans it.

`@vv/ui` expects the same peer stack as vmem's library (React 19, Radix, CVA, cmdk, motion, sonner, clsx, tailwind-merge, Tabler icons). Install those in the app. Also install `@vv/tokens` and import it; `@vv/ui` does not copy tokens.

## Use in a Tailwind v4 app

In the app's main stylesheet:

```css
@import "tailwindcss";
@import "@vv/tokens";
@source "../node_modules/@vv/ui/src/**/*.{ts,tsx}";
@source "../node_modules/@vv/shell/dist/**/*.js";
```

- `@vv/tokens` does not import Tailwind itself, so import Tailwind first.
- Tailwind does not scan `node_modules`. The `@source` lines tell it to read the UI source and the compiled shell, so their classes are generated. Paths are relative to the stylesheet. Change them to match the app's layout.
- Dark mode uses the `.dark` class (the next-themes class strategy). `[data-theme="dark"]` also works.

### Font

The tokens set `font-sans` to Instrument Sans, with a `system-ui` fallback. To load it from Google Fonts, put this line *above* `@import "tailwindcss"`. CSS ignores `@import url(...)` when it comes after other rules, so the token file cannot include it.

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap");
```

Instrument Serif, Michroma and Inter are marketing fonts. They stay in each app and are not part of these packages.

### Components

```tsx
import { Button, Dialog, Input } from "@vv/ui";
import { SidebarHeader, PillTabs } from "@vv/shell";
```

- `SidebarHeader`: 44px (`h-11`) header row with a truncated title and an optional `trailing` slot. It has no close button, icons or navigation.
- `PillTabs`: controlled pill tabs, icon and label only. It has no counts or badges. Use it only where you want pill tabs. It does not replace each app's segmented controls. Arrow keys, Home and End move between tabs.

## What moved into `@vv/ui`

Taken from vmem `packages/ui` (not a blend with vibot or Verve). Implementations in the other two apps differ; this package is vmem's source.

`_menu-classes`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `input`, `label`, `labeled-switch-row`, `modalTransition`, `popover`, `progress`, `select`, `separator`, `skeleton`, `sonner`, `sonner.css`, `spinner`, `switch`, `table`, `tabs`, `tabsSliding`, `textarea`, `time-picker`, `tooltip`, plus `cn` and motion presets.

## What stays app-local

**Not in vmem, so not in `@vv/ui`:**

- vibot and Verve: `accordion`, `clear-input`, `input-group`, `scroll-area`
- vibot only: `button-group`, `carousel`, `pagination`, `radix-select`, `search-input`, `surface-classes`, and `src/ai-elements`
- Verve only: `clearInputDissolve`, `kbd`, `sheet`, `visually-hidden`

**Also stays in each app:** navigation layout (icon rails, sidebars, sidebar and header size variables), page layouts, segmented controls, modal and tab CSS classes (including `--modal-close-dur` and similar), `glass-panel-*` / `smooth-shadow-ring-*` / `hit-target` utilities, marketing fonts, animations and editor styles.

## Develop

Needs Node 22 and pnpm.

```sh
pnpm install
pnpm build
```

`pnpm build` typechecks `@vv/ui` (source export, no `dist`), compiles `@vv/shell` to `packages/shell/dist`, and checks that the token CSS file exists.
