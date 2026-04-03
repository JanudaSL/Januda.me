import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://kjanuda.netlify.app/",
      lastModified: new Date(),
    },
    {
      url: "https://kjanuda.netlify.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://kjanuda.netlify.app/projects",
      lastModified: new Date(),
    },
    {
      url: "https://kjanuda.netlify.app/contact",
      lastModified: new Date(),
    },

    {
      url: "https://kjanuda.netlify.app/publications",
      lastModified: new Date(),
    },
  ];
}