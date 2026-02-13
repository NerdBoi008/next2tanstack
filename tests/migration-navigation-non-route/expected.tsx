import { redirect, notFound } from "next/navigation";

export function guardUser(user?: { id: string }) {
  if (!user) {
    // TODO(tanstack-migrate): manual migration required for `notFound()` in non-route context.
    notFound();
  }
  // TODO(tanstack-migrate): manual migration required for `redirect()` in non-route context.
  redirect(`/users/${user.id}`);
}
