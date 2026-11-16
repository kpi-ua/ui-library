# @kpi/ui

Shared shadcn-based UI primitives, Tailwind v4 theme, Exo 2 font, and better-auth helpers.

## Install

```sh
echo "@kpi:registry=https://npm.pkg.github.com" >> .npmrc
# authenticate with a GitHub token that has read:packages
pnpm add @kpi/ui
```

## Setup (any React app)

Global CSS (Tailwind v4):

```css
@import 'tailwindcss';
@import '@kpi/ui/styles.css';
@import '@kpi/ui/fonts.css'; /* Exo 2 via fontsource; skip in Next if using exo2Font */
@source '../node_modules/@kpi/ui/dist';
```

```tsx
import { Button } from '@kpi/ui';
```

## Next.js font

Add `transpilePackages: ['@kpi/ui']` to `next.config`, then:

```tsx
import { exo2Font } from '@kpi/ui/fonts/next';

<html className={exo2Font.variable}>
```

## Subpaths

| Import                | Content                                           |
| --------------------- | ------------------------------------------------- |
| `@kpi/ui`, `/ui`      | shadcn primitives (+ composed, currently empty)   |
| `@kpi/ui/hooks`       | shared hooks (empty)                              |
| `@kpi/ui/lib`         | `cn` and helpers                                  |
| `@kpi/ui/auth/server` | `createAuth` (better-auth, optional peer)         |
| `@kpi/ui/auth/client` | `createAppAuthClient`                             |
| `@kpi/ui/auth/next`   | route handler, middleware, `getServerSession`     |
| `@kpi/ui/fonts/next`  | `exo2Font` (needs `next`, shipped as source)      |
| `@kpi/ui/styles.css`  | theme tokens (no Tailwind import, no font files)  |
| `@kpi/ui/fonts.css`   | Exo 2 `@font-face` (latin + cyrillic, 400 to 700) |

## Development

```sh
pnpm storybook        # component workbench
pnpm build            # tsup + tsc declarations + css
pnpm changeset        # record a release note, then merge to main to publish
```

Add shadcn components with `pnpm dlx shadcn@latest add <name>`, then fix the generated `cn` import to `@/lib/utils` if needed and export it from `src/ui/primitives/index.ts`.
