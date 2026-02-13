import { createFileRoute, useRouter, notFound } from "@tanstack/react-router";

export const Route = createFileRoute('/')({
  component: Page,
});

function Page({ params }) {
  const router = useRouter();
  if (!params?.id) {
    notFound();
  }
  return <div>{params.id}</div>;
}
