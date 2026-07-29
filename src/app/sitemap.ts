import type { MetadataRoute } from "next";
import { site } from "@/data/site";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      alternates: {
        languages: { en: `${site.url}/`, fr: `${site.url}/fr` },
      },
    },
    { url: `${site.url}/fr` },
    { url: `${site.url}/blog` },
    ...posts.map((p) => ({
      url: `${site.url}/blog/${p.slug}`,
      lastModified: p.date,
    })),
  ];
}
