import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://iiinternship.in";
  
  const routes = [
    "",
    "/about",
    "/contact",
    "/donate",
    "/faqs",
    "/immersion",
    "/internship",
    "/internship-policy",
    "/media",
    "/notice",
    "/other-policy",
    "/partners",
    "/privacy-policy",
    "/recruitment",
    "/refund-policy",
    "/success-story",
    "/terms-and-condition",
    "/verify",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}
