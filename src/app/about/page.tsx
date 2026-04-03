import type { Metadata } from "next";
import Aboutme from "./Aboutme";
import Aboutme1 from "./Aboutme1";
import Aboutjanuda from "./Aboutjanuda";

// ✅ SEO Metadata
export const metadata: Metadata = {
  title: "About Januda J Kodithuwakku",
  description:
    "Learn more about Januda J Kodithuwakku, a Software Engineer specializing in IoT, AI/ML, and full-stack development. Creator of Neura and Axentra systems.",
  keywords: [
    "Januda J Kodithuwakku",
    "About Januda",
    "Software Engineer Sri Lanka",
    "IoT Developer",
    "AI ML Developer",
    "Neura Project",
    "Axentra Project",
  ],
  openGraph: {
    title: "About Januda J Kodithuwakku",
    description: "IoT and AI/ML developer, creator of Neura and Axentra systems.",
    url: "https://kjanuda.netlify.app/about",
  },
};

export default function AboutMePage() {
  return (
    <section className="px-0 py-0">
      <Aboutme />
      <Aboutme1 />
      <Aboutjanuda />
    </section>
  );
}