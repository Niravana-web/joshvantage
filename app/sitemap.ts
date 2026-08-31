import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/schema";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority,
  });
  return [
    page("/", 1),
    page("/launch", 0.9),
    page("/growth", 0.9),
    page("/academy", 0.9),
    page("/contact", 0.5),
    page("/privacy", 0.2),
    page("/terms", 0.2),
    page("/disclaimer", 0.2),
  ];
}
