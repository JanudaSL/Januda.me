"use client";
import React, { useEffect, useRef, useState } from 'react';

/* ── design tokens ──────────────────────────────────────────────
   ink    #0E1116  text on light / dark surfaces
   paper  #FAFAF8  page background
   line   #E6E4DF  hairlines
   muted  #6B7280  secondary text
   amber  #E8A33D  identity / accent
   sage   #6E8C6A  eyebrow labels, status

   Concept: simple, full-bleed two-column layout — no fixed background,
   no parallax, no typing engine. Photo runs edge-to-edge on one side
   at full width/height on desktop; content sits in a plain column on
   the other. One quiet scroll-reveal fade, nothing else moving.

   Layout: image on the LEFT, content on the RIGHT (desktop). Mobile
   still stacks image above content.
------------------------------------------------------------------ */

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

const FOCUS_AREAS = ['Mentoring', 'Student communities', 'Software engineering'];

export default function AboutJanuda() {
  const content = useScrollReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');

        .font-sans-brand { font-family: 'IBM Plex Sans', system-ui, sans-serif; }
        .font-display-brand { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }

        .tag {
          border: 1px solid #E6E4DF;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .tag:hover { border-color: #E8A33D; background: #FBF3E7; }

        /* Fade mask only makes sense when image and content sit side-by-side.
           On mobile the layout stacks, so the photo shows full and clean.
           Image now sits on the LEFT, content on the RIGHT, so the fade
           eases out toward the RIGHT edge (into the content column). */
        .about-photo {
          -webkit-mask-image: none;
          mask-image: none;
        }
        @media (min-width: 1024px) {
          .about-photo {
            -webkit-mask-image: linear-gradient(to right, black 0%, black 58%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.55) 76%, rgba(0,0,0,0.25) 88%, transparent 100%);
            mask-image: linear-gradient(to right, black 0%, black 58%, rgba(0,0,0,0.85) 66%, rgba(0,0,0,0.55) 76%, rgba(0,0,0,0.25) 88%, transparent 100%);
            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;
            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal { transition: none !important; opacity: 1 !important; transform: none !important; }
        }
      `}</style>

      {/* Full viewport width — no max-w wrapper, breaks out to the true edges of the screen */}
      <section className="w-full bg-[#FAFAF8] font-sans-brand">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-[70vh] lg:min-h-[80vh]">

          {/* Image — full bleed, edge to edge, full height of the row on desktop.
              On mobile the section stacks (image above content), so no fade mask —
              just a clean, sharp photo at a shorter, thumb-friendly height.
              Desktop: sits on the LEFT column now. */}
          <div className="order-1 lg:order-1 w-full h-[38vh] xs:h-[42vh] sm:h-[50vh] lg:h-auto relative overflow-hidden">
            {/* Hidden SVG filter: a real unsharp-mask style convolution,
                not just a contrast/saturate fake — sharpens actual edge detail. */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <filter id="sharpenAbout">
                <feConvolveMatrix
                  order="3"
                  kernelMatrix="0 -0.4 0 -0.4 2.6 -0.4 0 -0.4 0"
                  divisor="1"
                  edgeMode="duplicate"
                  preserveAlpha="true"
                />
              </filter>
            </svg>
            <img
              src="/cvr2.jpg"
              alt="Januda J"
              className="about-photo w-full h-full object-cover"
              style={{
                objectPosition: '50% 15%',
                filter: 'url(#sharpenAbout)',
              }}
            />
            {/* Extra blend layer — desktop only. Sits on the RIGHT edge of the
                image now, blending into the content column beside it. */}
            <div
              className="hidden lg:block pointer-events-none absolute inset-y-0 right-0 w-[42%]"
              style={{
                background:
                  'linear-gradient(to right, transparent 0%, rgba(250,250,248,0) 30%, rgba(250,250,248,0.5) 60%, #FAFAF8 100%)',
              }}
            />
          </div>

          {/* Content — plain column, generous padding, nothing floating on top of the photo.
              Desktop: sits on the RIGHT column now. */}
          <div className="order-2 lg:order-2 flex items-center">
            <div
              ref={content.ref}
              className={`reveal ${content.visible ? 'visible' : ''} w-full px-5 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-0 max-w-xl`}
            >
              <p className="font-sans-brand text-xs font-medium tracking-[0.2em] uppercase text-[#6E8C6A] mb-3 sm:mb-4">
                ABOUT
              </p>

              <h1 className="font-display-brand text-4xl xs:text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#0E1116] leading-[0.95] mb-3 sm:mb-4">
                Januda <span className="text-[#E8A33D]">J</span>
              </h1>

              <p className="font-sans-brand text-sm sm:text-lg text-[#6B7280] font-normal mb-6 sm:mb-8">
                Software Engineer &nbsp;·&nbsp; Lifelong Learner
              </p>

              <div className="h-px bg-[#E6E4DF] mb-6 sm:mb-8" />

              <p className="font-sans-brand text-sm sm:text-base text-[#374151] leading-relaxed mb-6 sm:mb-8">
                I want to inspire student communities as much as possible with all my
                skills and capabilities — a purpose-driven community, globally, instead
                of everyone going with the flow.
              </p>

              <p className="font-sans-brand text-sm text-[#6B7280] italic mb-6 sm:mb-8">
                "If we can change the way we see the world, we can change the world we see."
              </p>

              <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                {FOCUS_AREAS.map((f) => (
                  <span
                    key={f}
                    className="tag rounded-full px-3 sm:px-3.5 py-1.5 text-xs sm:text-sm font-medium text-[#0E1116]"
                  >
                    {f}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-[#6E8C6A] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6E8C6A]" />
                </span>
                <span className="font-sans-brand text-xs sm:text-sm text-[#6B7280]">
                  Building &amp; learning in public
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}