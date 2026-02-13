export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { slug } = await params;
  const { page } = await searchParams;

  return (
    <main>
      <h1>{slug}</h1>
      <p>{page}</p>
    </main>
  );
}
