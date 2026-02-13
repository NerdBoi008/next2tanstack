import { redirect, notFound } from "next/navigation";

export function guardUser(user?: { id: string }) {
  if (!user) {
    notFound();
  }
  redirect(`/users/${user.id}`);
}
