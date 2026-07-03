import type { Metadata } from "next";
import Contact from "./contact";
import Contact1 from "./contact1";
import Contact2 from "./contact2";
import ContactForm from "./ContactForm";

// ---------------------------------------------
// SEO METADATA — Contact Page
// ---------------------------------------------
export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Januda J Kodithuwakku — Software Engineer specializing in IoT, AI/ML, and full-stack development. Reach out for collaborations, project inquiries, or support.",
  keywords: [
    "contact Januda J Kodithuwakku",
    "hire software engineer Sri Lanka",
    "IoT developer contact",
    "AI ML developer contact",
    "full stack developer hire",
    "software collaboration inquiry",
  ],

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact | Januda J Kodithuwakku",
    description:
      "Get in touch for project inquiries, collaborations, or support. Software Engineer specializing in IoT, AI/ML, and full-stack development.",
    url: "https://kjanuda.netlify.app/contact",
    siteName: "Januda Portfolio",
    images: [
      {
        url: "/cont.jpeg",
        width: 1200,
        height: 630,
        alt: "Contact Januda J Kodithuwakku",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact | Januda J Kodithuwakku",
    description:
      "Get in touch for project inquiries, collaborations, or support.",
    images: ["/cont.jpeg"],
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
// (Person is already defined globally in root StructuredData —
// this only adds ContactPage + Breadcrumb, referencing it)
// ---------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://kjanuda.netlify.app/contact#webpage",
      url: "https://kjanuda.netlify.app/contact",
      name: "Contact | Januda J Kodithuwakku",
      description:
        "Get in touch with Januda J Kodithuwakku for project inquiries, collaborations, or support.",
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
          name: "Contact",
          item: "https://kjanuda.netlify.app/contact",
        },
      ],
    },
  ],
};

// ---------------------------------------------
// PAGE
// ---------------------------------------------
export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        className="min-h-screen px-0 py-0"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        <h1 className="sr-only">
          Contact Januda J Kodithuwakku — Software Engineer
        </h1>

        <Contact />
        <Contact2 />
        <ContactForm />
        <Contact1 />
      </main>
    </>
  );
}