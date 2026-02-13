import { cache, revalidatePath } from "next/cache";

// TODO(tanstack-migrate): manual migration required for `cache()`; map to TanStack Start/Query caching strategy.
const loadUser = cache(async (id: string) => ({ id }));

export async function mutateUser(id: string) {
  // TODO(tanstack-migrate): manual migration required for `revalidatePath()`; map to TanStack Start/Query caching strategy.
  revalidatePath(`/users/${id}`);
  return loadUser(id);
}
