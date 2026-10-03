# vv-ui

Shared UI for vmem, vibot and Verve web. It holds one set of design tokens and a few shell components, so product UI stays consistent across apps.

| Package | What it is |
| --- | --- |
| `@vv/tokens` | One CSS entry for Tailwind v4 apps: colour, radius, shadow, easing and font tokens, light and dark themes, and body defaults. |
| `@vv/shell` | React 19 components with no router dependency: `SidebarHeader` and `PillTabs`. |

Both packages are private. Do not publish them to npm.

## Install

Add the packages by path or git, not from npm.

```json
// app package.json, path install (local checkout)
"dependencies": {
  "@vv/tokens": "link:../vmem-ui/packages/tokens",
  "@vv/shell": "link:../vmem-ui/packages/shell"
}
```

The private GitHub repo is [vvedantb/vv-ui](https://github.com/vvedantb/vv-ui). In an app `package.json`:

```json
"@vv/tokens": "github:vvedantb/vv-ui#main&path:packages/tokens",
"@vv/shell": "github:vvedantb/vv-ui#main&path:packages/shell"
```

`@vv/tokens` is source CSS and needs no build. `@vv/shell`'s `dist` folder is not committed, so build that package after install (`pnpm build` in this repo) before Tailwind scans it.

## Use in a Tailwind v4 app

In the app's main stylesheet:

```css
@import "tailwindcss";
@import "@vv/tokens";
@source "../node_modules/@vv/shell/dist/**/*.js";
```

- `@vv/tokens` does not import Tailwind itself, so import Tailwind first.
- Tailwind does not scan `node_modules`. The `@source` line tells it to read the compiled shell components, so their classes are generated. The path is relative to the stylesheet. Change it to match the app's layout.
- Dark mode uses the `.dark` class (the next-themes class strategy). `[data-theme="dark"]` also works.

### Font

The tokens set `font-sans` to Instrument Sans, with a `system-ui` fallback. To load it from Google Fonts, put this line *above* `@import "tailwindcss"`. CSS ignores `@import url(...)` when it comes after other rules, so the token file cannot include it.

```css
@import url("https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap");
```

Instrument Serif, Michroma and Inter are marketing fonts. They stay in each app and are not part of these packages.

### Components

```tsx
import { SidebarHeader, PillTabs } from "@vv/shell";

<SidebarHeader title="Memories" trailing={<button type="button">New</button>} />

<PillTabs
  tabs={[
    { value: "all", label: "All", icon: <AllIcon /> },
    { value: "pinned", label: "Pinned" },
  ]}
  value={tab}
  onValueChange={setTab}
/>
```

- `SidebarHeader`: 44px (`h-11`) header row with a truncated title and an optional `trailing` slot. It has no close button, icons or navigation.
- `PillTabs`: controlled pill tabs, icon and label only. It has no counts or badges. Use it only where you want pill tabs. It does not replace each app's segmented controls. Arrow keys, Home and End move between tabs.

## What stays in each app

Navigation layout (icon rails, sidebars, sidebar and header size variables), page layouts, segmented controls, modal and tab CSS classes, marketing fonts, animations and editor styles.

## Develop

Needs Node 22 and pnpm.

```sh
pnpm install
pnpm build
```

`pnpm build` compiles `@vv/shell` to `packages/shell/dist` and checks that the token CSS file exists.
