"use client";

import React, { useEffect, useState } from "react";

const DESIGN_VIDEO =
  "https://io.webcdn.surge.global/2024-11-05/Compatibilities+-+Homepage/H264/Desktop/Design-2xcompressedH264.mp4";
const DESIGN_VIDEO_MOBILE =
  "https://io.webcdn.surge.global/2024-11-05/Compatibilities+-+Homepage/H264/Mobile/Design-2x-MobilecompressedH264.mp4";

const MARKETING_VIDEO =
  "https://io.webcdn.surge.global/2024-11-05/Compatibilities+-+Homepage/H264/Desktop/Marketing-2xcompressedH264.mp4";
const MARKETING_VIDEO_MOBILE =
  "https://io.webcdn.surge.global/2024-11-05/Compatibilities+-+Homepage/H264/Mobile/Marketing-2x-MobilecompressedH264.mp4";

export default function CompatibilitiesPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const designSrc = isMobile ? DESIGN_VIDEO_MOBILE : DESIGN_VIDEO;
  const marketingSrc = isMobile ? MARKETING_VIDEO_MOBILE : MARKETING_VIDEO;

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row leading-none">
      {/* Design side */}
      <section className="relative w-full md:w-1/2 h-[60vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#FAFAF8]">
        <video
          key={designSrc}
          className="block h-full w-full object-contain"
          src={designSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Branding", "Creative Design", "Motion Design"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-400/70 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Product Design", "Web Design", "UI/UX Audits", "+ More"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-neutral-400/70 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm"
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* Marketing side */}
      <section className="relative w-full md:w-1/2 h-[60vh] md:h-screen flex items-center justify-center overflow-hidden bg-[#131120]">
        <video
          key={marketingSrc}
          className="block h-full w-full object-contain"
          src={marketingSrc}
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col gap-2 sm:gap-3">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Growth Strategy", "Lead Nurturing", "SEO"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800/70 border border-white/20 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {["Performance Marketing", "Go To Market", "+ More"].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-neutral-800/70 border border-white/20 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-white backdrop-blur-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}