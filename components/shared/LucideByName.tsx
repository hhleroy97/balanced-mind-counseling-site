import { createElement } from "react";

import { getLucideIcon } from "@/lib/lucide-icons";

export function LucideByName({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  return createElement(getLucideIcon(name), { className });
}
