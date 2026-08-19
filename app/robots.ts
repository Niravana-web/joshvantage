import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    /* /go/* are campaign redirects, not pages — keep them out of the index so
       they never compete with the destination they point at. */
    rules: { userAgent: "*", allow: "/", disallow: ["/admin", "/api", "/go"] },
    sitemap: "https://joshvantage.com/sitemap.xml",
  };
}
