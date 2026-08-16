import type { MetadataRoute } from "next";

const BASE = "https://joshvantage.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${BASE}${path}`,
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
