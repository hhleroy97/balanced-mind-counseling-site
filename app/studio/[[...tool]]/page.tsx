import { metadata, viewport } from "next-sanity/studio";

import { StudioWrapper } from "@/app/studio/[[...tool]]/studio-wrapper";

export { metadata, viewport };

export const dynamic = "force-static";

export default function StudioPage() {
  return <StudioWrapper />;
}
