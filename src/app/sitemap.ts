import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://abhijithc.online";
  const currentDate = new Date();

  // Core routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  // Extension helper: easily add future case-study/project slugs here
  // const projectSlugs = ["sunfocuz-dtm", "attendance-payroll", "prime-gate-erp"];
  // projectSlugs.forEach((slug) => {
  //   routes.push({
  //     url: `${baseUrl}/projects/${slug}`,
  //     lastModified: currentDate,
  //     changeFrequency: "monthly",
  //     priority: 0.8,
  //   });
  // });

  return routes;
}
