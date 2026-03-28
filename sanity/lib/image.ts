import { createImageUrlBuilder } from "@sanity/image-url";

import { client } from "@/sanity/lib/client";

const builder = client ? createImageUrlBuilder(client) : null;

export function urlFor(source: unknown) {
  if (!builder || !source) {
    return null;
  }

  return builder.image(source);
}
