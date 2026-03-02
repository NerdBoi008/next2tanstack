---
name: next2tanstack
description: Next.js App Router → TanStack Start migration pipeline using the next2tanstack codemod. Use when the user wants to migrate a Next.js app to TanStack Start, run the codemod, resolve leftover TODOs.
---

# Next.js → TanStack Start migration

## When to Use This Skill

Use this skill when:

- The project uses the **Next.js App Router**.
- The user wants to migrate from **Next.js** to **TanStack Start** (or TanStack Router).

Do **not** use this skill for:

- Next.js **Pages Router** only (no `app/` directory).
- Non-Next.js frameworks.
- Brand-new TanStack Start projects (no migration needed).

---

## How to Run in a Real Project

1. Confirm you are in the root of a Next.js project (has `app/`, `next.config.*`, `package.json` with `next` dependency).
2. Create a migration branch:

   ```bash
   git checkout -b chore/next-to-tanstack-migration
   ```

3. Run the codemod with a dry run first:

   ```bash
   npx codemod next2tanstack --dry-run --no-interactive
   ```

4. Show the user a summary of:
   - Files changed
   - `// TODO(tanstack-migrate): ...` comments
   - Any errors or skipped files

5. After approval, run the codemod for real:

   ```bash
   npx codemod next2tanstack --no-interactive
   ```

---

## Automated Scope

The codemod automatically handles:

- `next/image` → `@unpic/react` import + prop mapping.
- `next/link` → TanStack `Link` with `href` mapped to `to`, `params`, `search`, and `hash`.
- `"use server"` server functions → `createServerFn(...)`.
- Top-level `"use client"` removal when safe.
- Route entry conversion and moving route files from `app` to the resolved routes directory (non-dry-run).
- Route segment mapping:
  - `(group)` → `_group`
  - `[id]` → `$id`
  - Catch-all routes → `$`
- API `route.*` handlers → TanStack `server.handlers`.
- Selected `next/navigation` hook import/call rewrites during route migration.

---

## Manual Scope (TODOs)

The codemod will insert `// TODO(tanstack-migrate): ...` for manual work, including:

- `next/cache`, `next/headers`, and sensitive `next/navigation` usages.
- Blocked `next/link` usage patterns:
  - `useLinkStatus`
  - MDX component-map or custom link abstractions.
- Metadata/SEO exports and `next/og`.
- Middleware / edge runtime behavior.
- `next.config.*` keys:
  - `rewrites`, `redirects`, `i18n`, `basePath`, `trailingSlash`.
- Parallel routes (`@slot`) and certain private/group layout cases.

When these TODOs are present, explain to the user what is left to do and suggest concrete follow-up steps. Below are some of expected patterns that could occur, if user approves apply those changes.

---

## Safety Rules

When using this skill:

- Always start with `--dry-run` to prevent accidental overwrites.
- Ensure **route-path assertions** are valid:that could occur, 
  - `createFileRoute(...)` paths must match the moved file structure.
- The root target (`__root.*`) must use `createRootRoute`.

If any safety check fails, surface the error to the user and do not force-apply the codemod.

---

## Patterns

**Pattern:**

```ts
// BEFORE (Next.js)
export const metadata = { title: 'About', description: 'About page' }

export async function generateMetadata({ params }) {
  const post = await fetchPost(params.id)
  return { title: post.title, description: post.excerpt }
}

// AFTER (TanStack Start)
export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About' },
      { name: 'description', content: 'About page' },
    ],
  }),
})

// Dynamic (with loader data):
export const Route = createFileRoute('/posts/$id')({
  loader: async ({ params }) => fetchPost(params.id),
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData.title },
      { name: 'description', content: loaderData.excerpt },
      { property: 'og:title', content: loaderData.title },
    ],
  }),
})
```

Rules:

- Static `metadata` → `head()` returning `{ meta: [...] }`
- `generateMetadata` with params → `head: ({ loaderData }) => ...` (loader must fetch the data)
- `openGraph` fields → `{ property: 'og:*', content: ... }` entries in `meta` array

---

### useSelectedLayoutSegment() → useMatch()

**Pattern:**

```ts
// BEFORE (Next.js)
import { useSelectedLayoutSegment } from 'next/navigation'
const segment = useSelectedLayoutSegment()

// AFTER (TanStack Router)
import { useMatch, useRouterState } from '@tanstack/react-router'

// If checking a specific route:
const match = useMatch({ from: '/dashboard', shouldThrow: false })
const isActive = match !== undefined

// If you need the raw active segment string:
const routerState = useRouterState()
const segment = routerState.matches.at(-1)?.routeId
```

---

### useSelectedLayoutSegments() → useMatches()

**Pattern:**

```ts
// BEFORE (Next.js)
import { useSelectedLayoutSegments } from 'next/navigation'
const segments = useSelectedLayoutSegments()

// AFTER (TanStack Router)
import { useMatches } from '@tanstack/react-router'
const matches = useMatches()
const segments = matches.map((m) => m.routeId)
```

---

### useRouter() client usage → useNavigate() / useRouter()

**Pattern:**

```ts
// BEFORE
import { useRouter } from 'next/navigation'
const router = useRouter()
router.push('/dashboard')
router.replace('/login')
router.back()
router.refresh()

// AFTER
import { useNavigate, useRouter } from '@tanstack/react-router'

// For navigation:
const navigate = useNavigate()
navigate({ to: '/dashboard' })
navigate({ to: '/login', replace: true })

// For back():
const router = useRouter()
router.history.back()

// router.refresh() → no direct equivalent; use invalidate:
router.invalidate()
```

---

### cookies() outside server actions → getCookie() via h3

**Pattern:**

```ts
// BEFORE (Next.js)
import { cookies } from 'next/headers'
const token = cookies().get('auth-token')?.value

// AFTER (TanStack Start — inside createServerFn or loader)
import { getCookie } from 'vinxi/http'
// OR (newer TanStack Start versions):
import { getCookie } from '@tanstack/start/server'

const token = getCookie('auth-token')
```
