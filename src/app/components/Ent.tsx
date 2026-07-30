import React from "react";

// Logos - update paths if your files live in a different public subfolder
const partners = [
  { name: "Mobitel", src: "/mobitel.png" },
  { name: "Hutch Enterprise", src: "/Hutch1.png" },
  { name: "Dialog", src: "/dialog.png" },
  { name: "Airtel", src: "/airtel.svg" },
];

export default function TechPartnersMarquee() {
  // Duplicate the list so the scroll loop is seamless
  const loop = [...partners, ...partners];

  return (
    <section className="w-full bg-white py-10 md:py-14 overflow-hidden">
      <h2 className="text-center text-lg sm:text-xl md:text-2xl font-semibold text-gray-700 mb-8 md:mb-10 tracking-wide px-4">
        Technology Partnerships &amp; Developer Access
      </h2>

      <div className="relative w-full overflow-hidden">
        {/* fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-12 sm:w-20 md:w-24 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-12 sm:w-20 md:w-24 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex w-max animate-marquee">
          {loop.map((partner, i) => (
            <div key={partner.name + i} className="logo-item flex items-center justify-center shrink-0">
              <img
                src={partner.src}
                alt={partner.name}
                className="logo-img object-contain opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .logo-item {
          width: 120px;
          height: 60px;
          margin: 0 20px;
        }
        .logo-img {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }

        @media (min-width: 640px) {
          .logo-item { width: 140px; height: 65px; margin: 0 32px; }
        }

        @media (min-width: 1024px) {
          .logo-item { width: 160px; height: 70px; margin: 0 40px; }
        }

        @keyframes marquee-scroll {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee-scroll 20s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-marquee {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}