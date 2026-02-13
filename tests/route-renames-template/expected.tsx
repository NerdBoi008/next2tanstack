import { createFileRoute } from "@tanstack/react-router";
import { Boundary } from "#/ui/boundary";

export const Route = createFileRoute("/")({
  component: TemplateComponent,
  // Note: Template remounts on navigation, use key prop if needed
});

function TemplateComponent({ children }: { children: React.ReactNode }) {
  return <Boundary>{children}</Boundary>;
}
