import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Everything is public - search engines and AI crawlers are welcome. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
