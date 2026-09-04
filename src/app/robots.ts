import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/student/",
        "/instructor/",
        "/recruit/",
        "/immersion/",
      ],
    },
    sitemap: "https://iiinternship.in/sitemap.xml",
  };
}
