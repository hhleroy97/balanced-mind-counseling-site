import type { MetadataRoute } from "next";

import { buildRobots } from "@/lib/discovery";

export default function robots(): MetadataRoute.Robots {
  return buildRobots();
}
