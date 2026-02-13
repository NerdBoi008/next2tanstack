import { cache, revalidatePath } from "next/cache";

const loadUser = cache(async (id: string) => ({ id }));

export async function mutateUser(id: string) {
  revalidatePath(`/users/${id}`);
  return loadUser(id);
}
