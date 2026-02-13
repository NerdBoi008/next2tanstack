'use server';

export const createPost = async (title: string) => {
  return { ok: true, title };
};

export async function deletePost(id: string) {
  return { ok: true, id };
}
