import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// Static routes for Ambulatory Care Hospital
const staticRoutes = [
  "",          // Homepage
  "/layanan",  // Services & Outpatient Clinics
  "/dokter",   // Doctor Schedule & Directory
  "/kontak",   // Contact & Facility Location
];

export default function sitemap(): MetadataRoute.Sitemap {
  return staticRoutes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
