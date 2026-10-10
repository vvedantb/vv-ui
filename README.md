# ui

Shared UI for vmem, vibot and Verve web. One token file, one primitive library, and two shell pieces.

| Package | What it is |
| --- | --- |
| `@vvedantb/tokens` | CSS tokens for Tailwind v4 web, plus `@vvedantb/tokens/native` JS colours, radii and spacing for React Native. |
| `@vvedantb/ui` | Shared React 19 primitives. vmem `packages/ui` is the baseline; leftover vibot and Verve files are included so the apps can share and unify them later. Source-exported. Colour, radius, shadow and font come from `@vvedantb/tokens`, not a second token file. Web only. |
| `@vvedantb/shell` | React 19 components with no router dependency: `SidebarHeader` and `PillTabs`. Only copy; they are not also in `@vvedantb/ui`. |
| `@vvedantb/native-ui` | React Native + Expo primitives (floating surfaces, forms, tab bar, settings chrome). Source-exported. Uses `@vvedantb/tokens/native`. |

All three packages are public npm packages under the `vvedantb` scope.

## Install

```sh
npm install @vvedantb/ui @vvedantb/tokens @vvedantb/shell
# Expo / React Native:
npm install @vvedantb/native-ui @vvedantb/tokens
```

For a local checkout of this repo:

```json
"dependencies": {
  "@vvedantb/tokens": "link:../ui/packages/tokens",
  "@vvedantb/ui": "link:../ui/packages/ui",
  "@vvedantb/shell": "link:../ui/packages/shell"
}
```

`@vvedantb/tokens` and `@vvedantb/ui` ship source and need no compile step. `@vvedantb/shell` publishes compiled `dist` (built on pack). After a path/git install of this repo, run `pnpm build` so Tailwind can scan the compiled shell.

`@vvedantb/ui` expects the vmem peer stack (React 19, Radix, CVA, cmdk, motion, sonner, clsx, tailwind-merge, Tabler icons) plus the leftover extras' peers (`radix-ui`, accordion/scroll-area/visually-hidden, vaul, embla, shiki, `ai`, streamdown, nanoid, use-stick-to-bottom). Install those in the app. Also install `@vvedantb/tokens` and import it; `@vvedantb/ui` does not copy tokens.

## Use in a Tailwind v4 app

In the app's main stylesheet:

```css
@import "tailwindcss";
@import "@vvedantb/tokens";
@source "../node_modules/@vvedantb/ui/src/**/*.{ts,tsx}";
@source "../node_modules/@vvedantb/shell/dist/**/*.js";
```

- `@vvedantb/tokens` does not import Tailwind itself, so import Tailwind first.
- Tailwind does not scan `node_modules`. The `@source` lines tell it to read the UI source and the compiled shell, so their classes are generated. Paths are relative to the stylesheet. Change them to match the app's layout.
- Dark mode uses the `.dark` class (the next-themes class strategy). `[data-theme="dark"]` also works.

### What the app must provide

`@vvedantb/ui` uses some classes that neither Tailwind nor `@vvedantb/tokens` defines. Without them the classes silently render nothing:

- `@import "shadow-plugin";` for `smooth-shadow-ring-*`, the edge and shadow of dialogs, sheets, menus, popovers, tooltips and toasts.
- `@plugin "tailwindcss-animate";` (or `tw-animate-css`) for `animate-in`/`fade-*`/`zoom-*`/`slide-in-*` on overlays. `animate-accordion-down`/`-up` also need `accordion-down`/`accordion-up` keyframes in the app.
- App-local CSS: `.glass-panel-strong` (dialog and toast fill), `.t-modal` with `.is-open`/`.is-closing` (dialog centring and transition), `.t-tabs`, `.t-tab` and `.t-tabs-pill` (tab layout and active state), `.t-clear*` (ClearInput dissolve layers), and `hit-target`.

### Font

The tokens set `font-sans` to Instrument Sans, with a `system-ui` fallback. To load it from Google Fonts, put this line *above* `@import "tailwindcss"`. CSS ignores `@import url(...)` when it comes after other rules, so the token file cannot include it.

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap");
```

Instrument Serif, Michroma and Inter are marketing fonts. They stay in each app and are not part of these packages.

### Components

```tsx
import { Button, Dialog, Input } from "@vvedantb/ui";
import { SidebarHeader, PillTabs } from "@vvedantb/shell";
```

- `SidebarHeader`: 44px (`h-11`) header row with a truncated title and an optional `trailing` slot. It has no close button, icons or navigation.
- `PillTabs`: controlled pill tabs, icon and label only. It has no counts or badges. Use it only where you want pill tabs. It does not replace each app's segmented controls. Arrow keys, Home and End move between tabs.

## What moved into `@vvedantb/ui`

**vmem baseline (plain names, not blended):** `_menu-classes`, `badge`, `breadcrumb`, `button`, `card`, `checkbox`, `collapsible`, `command`, `context-menu`, `dialog`, `dropdown-menu`, `hover-card`, `input`, `label`, `labeled-switch-row`, `modalTransition`, `popover`, `progress`, `select`, `separator`, `skeleton`, `sonner`, `sonner.css`, `spinner`, `switch`, `table`, `tabs`, `tabsSliding`, `textarea`, `time-picker`, `tooltip`, plus `cn` and motion presets.

**Leftovers from vibot and Verve (now shared here):** `accordion`, `clear-input`, `input-group`, `scroll-area`, `button-group`, `carousel`, `pagination`, `radix-select`, `search-input`, `surface-classes`, the whole `ai-elements` directory, `clearInputDissolve`, `kbd`, `sheet`, `visually-hidden`. Vibot's extra motion presets and `_menu-classes` sit beside the vmem files as `presets.vibot.ts` and `_menu-classes.vibot.ts`.

### Drift (both apps had a copy)

- `accordion`: vibot's file is the default (`accordion.tsx`); it uses the unified `radix-ui` package, a local chevron, and `data-slot` plus height animation. Verve's copy stays as `accordion.verve.tsx` (`@radix-ui/react-accordion`, Tabler chevron, `forwardRef`).
- `clear-input`: Verve's file is the default; it runs the dissolve animation via `clearInputDissolve`. Vibot's simpler clear button stays as `clear-input.vibot.tsx`.
- `input-group`: vibot's file is the default (`data-slot` variants, more addon/button sizes). Verve's `error` prop and `forwardRef` copy stays as `input-group.verve.tsx`.
- `scroll-area`: vibot's file is the default (`radix-ui`, `data-slot`, hover thumb). Verve's `@radix-ui/react-scroll-area` `forwardRef` copy stays as `scroll-area.verve.tsx`.

`radix-select` is exported as `RadixSelect*` so it does not clash with vmem `select`.

## What stays app-local

Navigation layout (icon rails, sidebars, sidebar and header size variables), page layouts, segmented controls, modal and tab CSS classes (including `--modal-close-dur` and similar), `glass-panel-*` / `smooth-shadow-ring-*` / `hit-target` utilities, marketing fonts, animations and editor styles.

## Develop

Needs Node 22 and pnpm.

```sh
pnpm install
pnpm build
```

`pnpm build` typechecks `@vvedantb/ui` (source export, no `dist`), compiles `@vvedantb/shell` to `packages/shell/dist`, and checks that the token CSS and native-ui entry files exist.

## Publish

No CI workflow. Publish from a logged-in npm machine (`NPM_CONFIG_USERCONFIG` if the token lives in a non-default rc):

```sh
pnpm --filter @vvedantb/tokens exec npm publish --access public
pnpm --filter @vvedantb/native-ui exec npm publish --access public
```

Version the package in its `package.json` first. `@vvedantb/tokens` `0.1.1` adds `@vvedantb/tokens/native` and must land before `@vvedantb/native-ui` `0.1.0`.
