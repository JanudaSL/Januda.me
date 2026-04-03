import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";
import StructuredData from "./components/StructuredData";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Januda J Kodithuwakku | Software Engineer",
    template: "%s | Januda J Kodithuwakku",
  },
  description:
    "Januda J Kodithuwakku is a Software Engineer specializing in IoT, AI/ML, and full-stack development. Creator of Neura and Axentra systems.",

  keywords: [
    "Januda J Kodithuwakku",
    "Software Engineer Sri Lanka",
    "IoT Developer",
    "AI ML Developer",
    "React Developer",
    "Neura Project",
    "Axentra Project",
  ],

  authors: [{ name: "Januda J Kodithuwakku" }],
  creator: "Januda J Kodithuwakku",

  metadataBase: new URL("https://kjanuda.netlify.app"), // ✅ fixed

  openGraph: {
    title: "Januda J Kodithuwakku | Software Engineer",
    description:
      "Portfolio of Januda - IoT + AI/ML Developer.",
    url: "https://kjanuda.netlify.app",
    siteName: "Januda Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Januda J Kodithuwakku",
    description: "IoT + AI Developer Portfolio",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  other: {
    "google-adsense-account": "ca-pub-4481173940421216",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      
      {/* ✅ FIXED AdSense (NO warning now) */}
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4481173940421216"
          crossOrigin="anonymous"
        ></script>
      </head>

      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        
        {/* ✅ Structured Data (ONLY ONE place) */}
        <StructuredData />

        {/* UI */}
        <Navbar />
        {children}
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}