---
name: nextjs-to-tanstack-migration
description: Migrates a Next.js App Router project to TanStack Start. Use when
  the user asks to migrate from Next.js to TanStack or TanStack Start.
---

# Next.js -> TanStack Migration

Use this skill when the user wants deterministic, incremental migration from Next.js App Router to TanStack Start.

## When To Use This Skill

- The user asks to migrate a Next.js App Router codebase to TanStack Start.
- The user wants codemod-first migration with explicit manual TODO markers.
- The user wants selective migration toggles instead of one-shot rewrite.

## Run Procedure

1. Create a dedicated migration branch in the target app.
2. Run `npx codemod next2tanstack` in the target project root.
3. Optionally create `next-to-start.codemod.json` to control app/routes directory and migration toggles.
4. Review the diff and `// TODO(tanstack-migrate): ...` comments.
5. Run typecheck/tests and finish manual migration items.

Local repository commands:

- `pnpm run codemod:dry`
- `pnpm run codemod`
- `pnpm run test`
- `pnpm run check-types`

## Runtime Config Resolution

Config files discovered upward from the working file:

- `next-to-start.codemod.json`
- `.next-to-start.codemod.json`
- `next-to-start.codemodrc.json`

Supported config keys:

- `appDirectory` (default `app`)
- `routesDirectory`
- `enabledMigrations`
- `disabledMigrations`
- `migrations` (`Record<string, boolean>`, final override)

`routesDirectory` precedence:

1. Config `routesDirectory`
2. CLI/env override (`--routes-directory`, `CODEMOD_ROUTES_DIRECTORY`, `ROUTES_DIRECTORY`)
3. `vite.config.*` `routesDirectory` value (regex parse)
4. Fallback `routes`

## Enabled Migrations (exact IDs)

- `next-image`
- `next-link`
- `next-server-functions`
- `manual-migration-todos`
- `next-use-client`
- `route-file-structure`
- `route-groups`
- `api-routes`

Default behavior enables all IDs, then applies config toggles.

## Transform Coverage (what is actually automated)

- `next/image` import and JSX migration to `@unpic/react` (`next-image`).
- `next/image` prop mapping includes `fill/layout/loading/placeholder/blurDataURL/onLoadingComplete` handling and removes unsupported props like `quality`, `loader`, `loaderFile`, `unoptimized`.
- `next/link` import rewrite (`import Link from "next/link"` -> TanStack `Link`) and `href` conversion to `to/params/search/hash`; maps `scroll` -> `resetScroll`, `prefetch` -> `preload`.
- Server actions/functions with `"use server"` to `createServerFn({ method: "POST" })` with generated validators and handler signatures (`next-server-functions`).
- In client components, selected form and `onClick` usages of imported server action functions are rewritten to invocation patterns compatible with transformed server functions.
- Removal of top-level `"use client"` directives (`next-use-client`).
- Route file-structure conversion (`page/layout/loading/error/not-found/template/default`) and file moves from `app` to resolved routes directory when not dry-run (`route-file-structure`).
- Route group mapping (`(group)` -> `_group`) and dynamic segment mapping (`[id]` -> `$id`, catch-all -> `$`).
- API route conversion for `route.(ts|js|tsx|jsx)` exported HTTP method handlers into `createFileRoute(...){ server.handlers }` (`api-routes`).
- Import rewrites for selected `next/navigation` hooks in route migration (`useRouter`, `usePathname`, `useSearchParams`) toward TanStack router equivalents.

## What Requires Manual Work

- Context-sensitive runtime behavior that cannot be safely inferred.
- `next/cache` (`cache`, `cacheLife`, `cacheTag`, `revalidatePath`, `revalidateTag`) flagged with TODOs.
- `next/headers` (`cookies`, `headers`) flagged with TODOs outside migrated server-action contexts.
- `next/navigation` usages in non-route/client-sensitive contexts flagged with TODOs.
- Blocked `next/link` patterns (for example `useLinkStatus` and MDX component-map patterns).
- Metadata/SEO exports (`metadata`, `generateMetadata`, `viewport`, `sitemap`, `robots`) and `next/og` patterns are TODO-only.
- Middleware and edge runtime patterns are TODO-only.
- `next.config.*` semantic keys (`rewrites`, `redirects`, `i18n`, `basePath`, `trailingSlash`) are TODO-only.
- Parallel route folders (`@slot`) and selected private/group layout cases require manual handling.

## Important Safety/Skip Rules

- `next-link` skips whole-file migration when blocker patterns are detected.
- `route-file-structure` skips automatic conversion for private segments (`_foo`), parallel segments (`@slot`), and non-group-only layout/template inside route groups.
- Route file moving is skipped in dry-run; only content edits are returned.
- Non-dry-run file moves refuse overwriting conflicting existing target files.
- Root route normalization enforces `createRootRoute` in `__root.*`.
- Path assertion checks `createFileRoute("...")` against computed target route path and throws on mismatch.

## Transform Order

Transforms run in this order (when enabled):

1. `next-image`
2. `next-link`
3. `next-server-functions`
4. `manual-migration-todos`
5. `next-use-client`
6. `route-file-structure`
7. `route-groups`
8. `api-routes`

## Extension Workflow

1. Implement/update logic in `transforms/*.ts`.
2. Wire migration IDs and orchestration in `scripts/codemod.ts`.
3. Add/update fixtures in `tests/<case>/input.*`, `tests/<case>/expected.*`, and `tests/<case>/metrics.json` when relevant.
4. Run `pnpm run test` and `pnpm run check-types`.

## Metrics

The codemod records:

- `migration-impact`: `automated`, `manual`, `blocked`.
- `migration-time-estimate`: quarter-hour estimates for `saved` and `remaining`.
