import { ImageResponse } from "next/og";

export function og() {
  return new ImageResponse(<div>Hello</div>);
}
