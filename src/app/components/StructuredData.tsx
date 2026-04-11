"use client";

import Script from "next/script";

interface StructuredDataProps {
  post?: {
    title: string;
    content?: string;
    image?: string;
    profileImage?: string;
    slug: string;
    link?: string;
    author: string;
    publishedAt: string;
    updatedAt?: string;
  };
}

export default function StructuredData({ post }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://kjanuda.netlify.app/";

  const baseSchemas = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Januda J Kodithuwakku",
      url: siteUrl,
      jobTitle: "Software Engineer",
      sameAs: [
        "https://github.com/kjanuda",
        "https://www.linkedin.com/in/januda-kodithuwakku/",
      ],
      knowsAbout: [
        "IoT",
        "Artificial Intelligence",
        "Machine Learning",
        "React",
        "Node.js",
        "Full Stack Development",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Januda Website",
      url: siteUrl,
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}search?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ];

  const postSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.title,
        description: post.content?.replace(/<[^>]*>/g, "").slice(0, 150) || "",
        image: post.image || post.profileImage || "",
        url: `${siteUrl}/publications/${post.slug}`,
        sameAs: post.link,
        author: {
          "@type": "Person",
          name: post.author,
          url: `https://medium.com/@${post.author}`,
        },
        publisher: {
          "@type": "Organization",
          name: "Publications",
          url: siteUrl,
        },
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${siteUrl}/publications/${post.slug}`,
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
            { "@type": "ListItem", position: 2, name: "Publications", item: `${siteUrl}/publications` },
            { "@type": "ListItem", position: 3, name: post.title, item: `${siteUrl}/publications/${post.slug}` },
          ],
        },
      }
    : null;

  const schemas = postSchema ? [...baseSchemas, postSchema] : baseSchemas;

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
    />
  );
}