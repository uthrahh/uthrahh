import type { MetadataRoute } from "next";
import { site } from "@/lib/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = site.domain || site.siteUrlFallback;

  return ["", "/work", "/privacy", "/terms"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
