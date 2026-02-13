// TODO(tanstack-migrate): metadata/SEO exports detected (`metadata`, `generateMetadata`, `viewport`, `sitemap`, `robots`, or `next/og`); migrate manually.
import { ImageResponse } from "next/og";

export function og() {
  return new ImageResponse(<div>Hello</div>);
}
