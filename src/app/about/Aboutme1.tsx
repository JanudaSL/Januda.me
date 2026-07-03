'use client';

import Image from 'next/image';
import { Jost, IBM_Plex_Mono } from 'next/font/google';

const display = Jost({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const SPEC_ROWS = [
  { key: 'STACK', value: 'Full-stack · Cloud · IoT' },
  { key: 'BUILDS', value: 'Web / Mobile / Embedded' },
  { key: 'DOMAINS', value: 'Education · Safety · Automation' },
  { key: 'STATUS', value: 'Open to work', live: true },
];

export default function AboutJanuda() {
  return (
    <section className="relative bg-[#FAFAF6] py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">

      {/* Blueprint grid background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(#14213D 1px, transparent 1px), linear-gradient(90deg, #14213D 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* faint cross-hair marks at grid intersections, top-left quadrant only */}
        <div
          className="absolute inset-0 opacity-[0.06] hidden lg:block"
          style={{
            backgroundImage:
              'radial-gradient(circle, #2A5C8A 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto">

        {/* Section label — code-comment styled eyebrow */}
        <div className="flex items-center gap-3 mb-10 sm:mb-14">
          <span className={`${mono.className} text-[11px] sm:text-xs tracking-wider text-[#2A5C8A]`}>
            {'/* 01 — who i am */'}
          </span>
          <div className="flex-1 h-px bg-[#14213D]/10" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 xl:gap-28 items-start">

          {/* ── IMAGE / SCHEMATIC FRAME ── */}
          <div className="relative w-full order-1 lg:order-1">
            <div className="relative mx-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-none">

              {/* Corner brackets — viewfinder / schematic framing instead of a full border box */}
              <span className="absolute -top-3 -left-3 w-8 h-8 border-t-2 border-l-2 border-[#14213D] rounded-tl-md z-20" />
              <span className="absolute -top-3 -right-3 w-8 h-8 border-t-2 border-r-2 border-[#14213D] rounded-tr-md z-20" />
              <span className="absolute -bottom-3 -left-3 w-8 h-8 border-b-2 border-l-2 border-[#14213D] rounded-bl-md z-20" />
              <span className="absolute -bottom-3 -right-3 w-8 h-8 border-b-2 border-r-2 border-[#14213D] rounded-br-md z-20" />

              {/* Main image */}
              <div className="relative rounded-xl overflow-hidden ring-1 ring-[#14213D]/10 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-[#EFEEE8] group z-10">
                <Image
                  src="/bal1.jpg"
                  alt="Januda – Software Engineer"
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 45vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14213D]/35 via-transparent to-transparent" />

                {/* fine tick marks along the bottom edge, like a ruler / schematic scale */}
                <div className="absolute bottom-0 left-0 right-0 h-3 flex items-end opacity-70">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="flex-1 bg-white/70"
                      style={{ height: i % 4 === 0 ? '10px' : '5px', width: '1px' }}
                    />
                  ))}
                </div>

                <div className="absolute bottom-5 left-4 sm:bottom-6 sm:left-5">
                  <span className={`${mono.className} inline-block bg-white/95 text-[#14213D] text-[10px] sm:text-xs font-medium tracking-widest uppercase px-3 py-1.5 rounded-sm shadow-sm`}>
                    role:// software engineer
                  </span>
                </div>
              </div>

              {/* Spec chip — anchored to the image's own corner, never bleeds into the next column */}
              <div className="absolute -bottom-5 -right-4 sm:-bottom-6 sm:-right-6 z-20 bg-[#14213D] text-white rounded-lg px-4 py-3 sm:px-5 sm:py-4 shadow-lg">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="relative flex h-2 w-2">
                    <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FFB000]" />
                  </span>
                  <p className={`${mono.className} text-[10px] tracking-widest uppercase text-[#9FB3D6]`}>status</p>
                </div>
                <p className={`${mono.className} text-xs sm:text-sm font-medium whitespace-nowrap`}>open_to_work</p>
              </div>
            </div>
          </div>

          {/* ── CONTENT SECTION ── */}
          <div className="space-y-8 sm:space-y-10 order-2 lg:order-2 lg:pt-2">

            {/* Heading */}
            <div className="space-y-1">
              <p className={`${mono.className} text-xs sm:text-sm tracking-[0.2em] text-[#2A5C8A] uppercase`}>
                About
              </p>
              <h2
                className={`${display.className} text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-light text-[#14213D] leading-[1.05] tracking-tight`}
              >
                Januda
                <span className="motion-safe:animate-pulse text-[#FFB000]">_</span>
              </h2>
            </div>

            {/* Description paragraphs */}
            <div className={`${display.className} space-y-5 sm:space-y-6 max-w-xl`}>
              <p className="text-base sm:text-lg font-light text-[#3D3D3A] leading-relaxed">
                A{' '}
                <span className="font-normal text-[#14213D]">
                  passionate and aspiring software engineer
                </span>{' '}
                dedicated to building innovative and impactful digital solutions. With a strong foundation in full-stack development, cloud technologies, and IoT systems, he creates applications that blend functionality with user-friendly design.
              </p>

              <p className="text-base sm:text-lg font-light text-[#3D3D3A] leading-relaxed">
                His portfolio spans{' '}
                <span className="font-normal text-[#14213D]">
                  web applications, mobile apps, and IoT integrations
                </span>{' '}
                that address real-world challenges across education, safety, and automation.
              </p>

              <p className="text-base sm:text-lg font-light text-[#3D3D3A] leading-relaxed">
                Alongside his technical expertise, Januda brings commitment, adaptability, and a drive for continuous learning — prepared to contribute meaningfully to modern software teams.
              </p>
            </div>

            {/* Spec sheet — a datasheet-style table instead of generic pill tags */}
            <div className="max-w-xl border border-[#14213D]/15 rounded-lg overflow-hidden bg-white/60">
              <div className={`${mono.className} flex items-center justify-between px-4 py-2 bg-[#14213D]/[0.04] border-b border-[#14213D]/10 text-[10px] tracking-widest uppercase text-[#14213D]/60`}>
                <span>engineer_spec.json</span>
                <span>rev. 2026</span>
              </div>
              <dl>
                {SPEC_ROWS.map((row, i) => (
                  <div
                    key={row.key}
                    className={`flex items-center justify-between px-4 py-3 ${i !== SPEC_ROWS.length - 1 ? 'border-b border-[#14213D]/[0.07]' : ''}`}
                  >
                    <dt className={`${mono.className} text-[11px] sm:text-xs tracking-widest text-[#2A5C8A]`}>
                      {row.key}
                    </dt>
                    <dd className="flex items-center gap-2 text-sm text-[#14213D] font-medium text-right">
                      {row.live && (
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFB000] opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FFB000]" />
                        </span>
                      )}
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}