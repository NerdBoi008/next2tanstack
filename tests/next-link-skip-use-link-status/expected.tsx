import Link, { useLinkStatus } from "next/link";

export function Tabs() {
  const { pending } = useLinkStatus();
  return (
    <div data-pending={pending}>
      <Link href="/settings">Settings</Link>
    </div>
  );
}
