---
name: next2tanstack
description: Upgrade Next.js App Router apps to TanStack Start using the next2tanstack codemod. Use when asked to "upgrade/migrate Next to TanStack", "convert this Next app to TanStack Start", or run a deterministic migration first and then complete the remaining manual/AI migration steps.
---

# Migrate Next.js App Router App to TanStack Start

Run the deterministic codemod first, then finish the migration with focused AI edits.

## Usage

### 1. Create a migration branch

```bash
git checkout -b chore/next-to-tanstack-migration
```

### 2. Create the project config file

Before running the codemod, create `next-to-start.codemod.json` in your
project root.

IMPORTANT: This file should be created as-is with the same values/keys, only if not already present

```json
{
  "appDirectory": "app",
  "routesDirectory": "app"
}
```

### 3. Run codemod

```bash
npx codemod next2tanstack --no-interactive
```

Stop migration if this command fails.

### 4. Check TODOs in the project

Check for TODOs in the project and suggest users with TanStack equivalents.
