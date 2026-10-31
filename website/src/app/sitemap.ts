import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://pmazimelutechnologies.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/services", "/about", "/contact"].map((path, index) => ({
    url: new URL(path, siteUrl).toString(),
    changeFrequency: "monthly",
    priority: index === 0 ? 1 : 0.8,
  }));
}
