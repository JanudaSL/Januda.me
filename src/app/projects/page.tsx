import type { Metadata } from "next";
import Project from "./Project";
import Project1 from "./Project1";
import Project2 from "./Project2";

// ---------------------------------------------
// SEO METADATA — Projects Page
// ---------------------------------------------
export const metadata: Metadata = {
  title: "Software Development Projects",
  description:
    "Explore software development projects by Januda J Kodithuwakku — full-stack web apps, IoT systems, and AI/ML solutions including Neura and Axentra, built to solve real-world engineering challenges.",
  keywords: [
    "Januda J Kodithuwakku projects",
    "software engineering portfolio",
    "IoT projects Sri Lanka",
    "AI ML projects",
    "Neura project",
    "Axentra project",
    "full stack developer projects",
    "React Next.js projects",
  ],

  alternates: {
    canonical: "/projects",
  },

  openGraph: {
    title: "Software Development Projects | Januda J Kodithuwakku",
    description:
      "Explore full-stack web apps, IoT systems, and AI/ML solutions built by Januda J Kodithuwakku, including Neura and Axentra.",
    url: "https://kjanuda.netlify.app/projects",
    siteName: "Januda Portfolio",
    images: [
      {
        url: "/Project.jpg",
        width: 1200,
        height: 630,
        alt: "Januda J Kodithuwakku — Software Development Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Software Development Projects | Januda J Kodithuwakku",
    description:
      "Explore full-stack web apps, IoT systems, and AI/ML solutions built by Januda J Kodithuwakku.",
    images: ["/Project.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  category: "technology",
};

// ---------------------------------------------
// JSON-LD — Page-specific structured data
// (Person/WebSite already handled in root StructuredData —
// this only adds CollectionPage + Breadcrumb for THIS page)
// ---------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": "https://kjanuda.netlify.app/projects#webpage",
      url: "https://kjanuda.netlify.app/projects",
      name: "Software Development Projects | Januda J Kodithuwakku",
      description:
        "Explore software development projects by Januda J Kodithuwakku — full-stack web apps, IoT systems, and AI/ML solutions including Neura and Axentra.",
      isPartOf: {
        "@id": "https://kjanuda.netlify.app/#website",
      },
      about: {
        "@id": "https://kjanuda.netlify.app/#person",
      },
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://kjanuda.netlify.app",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Projects",
          item: "https://kjanuda.netlify.app/projects",
        },
      ],
    },
  ],
};

// ---------------------------------------------
// PAGE
// ---------------------------------------------
export default function ProjectsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        className="min-h-screen px-0 py-0"
        itemScope
        itemType="https://schema.org/CollectionPage"
      >
        <h1 className="sr-only">
          Software Development Projects by Januda J Kodithuwakku
        </h1>

        <Project />
        <Project1 />
        <Project2 />
      </main>
    </>
  );
}