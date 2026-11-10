import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services", "/about", "/contact"].map((path, index) => ({
    url: new URL(path, SITE_URL).toString(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
