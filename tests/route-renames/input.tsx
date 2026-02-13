import { useRouter, notFound } from "next/navigation";

export default function Page({ params }) {
  const router = useRouter();
  if (!params?.id) {
    notFound();
  }
  return <div>{params.id}</div>;
}
