# @kpi-ua/ui

Shared shadcn-based UI primitives, Tailwind v4 theme, Exo 2 font, and better-auth helpers.

## Install

```sh
echo "@kpi-ua:registry=https://npm.pkg.github.com" >> .npmrc
# authenticate with a GitHub token that has read:packages
pnpm add @kpi-ua/ui
```

## Setup (any React app)

Global CSS (Tailwind v4):

```css
@import 'tailwindcss';
@import '@kpi-ua/ui/styles.css';
@import '@kpi-ua/ui/fonts.css'; /* Exo 2 via fontsource; skip in Next if using exo2Font */
@source '../node_modules/@kpi-ua/ui/dist';
```

```tsx
import { Button } from '@kpi-ua/ui';
```

## Next.js font

Add `transpilePackages: ['@kpi-ua/ui']` to `next.config`, then:

```tsx
import { exo2Font } from '@kpi-ua/ui/fonts/next';

<html className={exo2Font.variable}>
```

## Subpaths

| Import                   | Content                                           |
| ------------------------ | ------------------------------------------------- |
| `@kpi-ua/ui`, `/ui`      | shadcn primitives (+ composed, currently empty)   |
| `@kpi-ua/ui/hooks`       | shared hooks (empty)                              |
| `@kpi-ua/ui/lib`         | `cn` and helpers                                  |
| `@kpi-ua/ui/auth/server` | `createAuth` (better-auth, optional peer)         |
| `@kpi-ua/ui/auth/next`   | route handler, middleware, `getServerSession`     |
| `@kpi-ua/ui/fonts/next`  | `exo2Font` (needs `next`, shipped as source)      |
| `@kpi-ua/ui/styles.css`  | theme tokens (no Tailwind import, no font files)  |
| `@kpi-ua/ui/fonts.css`   | Exo 2 `@font-face` (latin + cyrillic, 400 to 700) |

## Development

```sh
pnpm storybook        # component workbench
pnpm build            # tsup + tsc declarations + css
pnpm changeset        # record a release note, then merge to main to publish
```

Add shadcn components with `pnpm dlx shadcn@latest add <name>`, then fix the generated `cn` import to `@/lib/utils` if needed and export it from `src/ui/primitives/index.ts`.
