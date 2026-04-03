"use client";

import Script from "next/script";

export default function StructuredData() {
  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Januda J Kodithuwakku",
            url: "https://kjanuda.netlify.app/", // ⚠️ change this
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
            url: "https://kjanuda.netlify.app/", // ⚠️ change this
            potentialAction: {
              "@type": "SearchAction",
              target:
                "https://kjanuda.netlify.app/search?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]),
      }}
    />
  );
}