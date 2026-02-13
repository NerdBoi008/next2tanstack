// TODO(tanstack-migrate): metadata/SEO exports detected (`metadata`, `generateMetadata`, `viewport`, `sitemap`, `robots`, or `next/og`); migrate manually.
export const metadata = {
  title: "Users",
};

export async function generateMetadata() {
  return { description: "Users list" };
}
