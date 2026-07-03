"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';

/* ── design tokens ──────────────────────────────────────────────
   ink       #0E1116  ground / grade
   paper     #E8E6E1  primary text
   muted     #A9B0BB  secondary text on photo
   amber     #E8A33D  identity / keyword accent
   sage      #8FB39C  strings, comments, "vision" voice
   dusty     #6E8CA0  object keys / structure

   Concept: editorial poster with FIXED background image.
   Motion layer (new): the photo breathes (slow Ken Burns drift) and
   drifts opposite scroll (parallax), the terminal card actually types
   its contents out character-by-character, the card tilts gently
   toward the cursor like a physical object catching light, and the
   status pill runs a live "uptime" readout instead of a static label.
   Every effect is disabled under prefers-reduced-motion.
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

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

/* plain-text source for the typing engine; colored JSX rendered once a line finishes */
const CODE_LINES = [
  {
    n: 1,
    plain: "const januda = {",
    colored: <>const <span className="text-[#E8A33D]">januda</span> = {'{'}</>,
  },
  {
    n: 2,
    plain: "  role: 'Software Engineer',",
    colored: <>&nbsp;&nbsp;role:&nbsp;&nbsp;&nbsp;<span className="text-[#6E8CA0]">'Software Engineer'</span>,</>,
  },
  {
    n: 3,
    plain: "  status: 'lifelong learner',",
    colored: <>&nbsp;&nbsp;status:&nbsp;<span className="text-[#6E8CA0]">'lifelong learner'</span>,</>,
  },
  {
    n: 4,
    plain: "  focus: ['mentoring', 'student communities'],",
    colored: <>&nbsp;&nbsp;focus:&nbsp;&nbsp;[<span className="text-[#6E8CA0]">'mentoring'</span>, <span className="text-[#6E8CA0]">'student communities'</span>],</>,
  },
  { n: 5, plain: "}", colored: <>{'}'}</> },
];

function formatUptime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
  const s = Math.floor(totalSeconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export default function AboutJanuda() {
  const [booted, setBooted] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  const label = useScrollReveal(0.1);
  const dock  = useScrollReveal(0.1);

  // ── terminal typing engine ──────────────────────────────────
  const [typeLine, setTypeLine] = useState(0);
  const [typeChar, setTypeChar] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setBooted(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!dock.visible) return;

    if (reducedMotion) {
      setTypeLine(CODE_LINES.length);
      return;
    }

    let cancelled = false;
    let lineIdx = 0;
    let charIdx = 0;

    const step = () => {
      if (cancelled) return;
      if (lineIdx >= CODE_LINES.length) return;

      charIdx += 1;
      setTypeLine(lineIdx);
      setTypeChar(charIdx);

      if (charIdx >= CODE_LINES[lineIdx].plain.length) {
        lineIdx += 1;
        charIdx = 0;
        setTimeout(step, 240); // pause at line end, like a real return-key beat
      } else {
        setTimeout(step, 14 + Math.random() * 26); // organic keystroke cadence
      }
    };

    const kickoff = setTimeout(step, 320);
    return () => { cancelled = true; clearTimeout(kickoff); };
  }, [dock.visible, reducedMotion]);

  // ── live uptime readout in the status pill ──────────────────
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  // ── scroll parallax on the fixed background, contained to this section ──
  const wrapperRef = useRef<HTMLDivElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);
  const rafRef = useRef<number | null>(null);

  const updateParallax = useCallback(() => {
    if (!wrapperRef.current || !bgImgRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const vh = window.innerHeight || 1;
    // -1 (wrapper bottom at top of viewport) .. 1 (wrapper top at bottom of viewport)
    const progress = 1 - (rect.top + rect.height / 2) / (vh + rect.height / 2);
    const shift = progress * 36; // px of drift, kept inside the scaled-up headroom
    bgImgRef.current.style.transform = `translate3d(0, ${shift}px, 0) scale(1.12)`;
    rafRef.current = null;
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(updateParallax);
    };
    updateParallax();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [reducedMotion, updateParallax]);

  // ── gentle cursor tilt on the terminal dock ──────────────────
  const dockCardRef = useRef<HTMLDivElement>(null);

  const handleDockMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !dockCardRef.current) return;
    const rect = dockCardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;  // 0..1
    const py = (e.clientY - rect.top) / rect.height;  // 0..1
    const rotateY = (px - 0.5) * 4.5;   // deg
    const rotateX = (0.5 - py) * 3.5;   // deg
    dockCardRef.current.style.transform =
      `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(0)`;
  };

  const handleDockLeave = () => {
    if (!dockCardRef.current) return;
    dockCardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');

        .font-mono-brand { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-sans-brand { font-family: 'IBM Plex Sans', system-ui, sans-serif; }

        .reveal {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1),
                      transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.visible { opacity: 1; transform: translateY(0); }
        .delay-100 { transition-delay: .1s; }

        .page-entry { transition: opacity 0.9s ease, transform 0.9s ease; }

        @keyframes caret-blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
        .caret { display:inline-block; width:0.5em; height:1em; background:#E8A33D;
                 margin-left:2px; vertical-align:-0.15em; animation: caret-blink 0.85s step-end infinite; }

        @keyframes dot-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(143,179,150,0.5); }
                                50% { box-shadow: 0 0 0 6px rgba(143,179,150,0); } }
        .pulse-dot { animation: dot-pulse 2.2s ease-out infinite; }

        /* terminal card: subtle 3D tilt driven by JS, smoothed by a CSS transition
           that only kicks in on release (the mousemove writes transform directly
           for zero-lag tracking; this transition softens the return-to-rest) */
        .dock-card {
          transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
          transform-style: preserve-3d;
        }

        /* slow ambient breathing on the background photo — separate from the
           JS-driven scroll parallax, which also writes transform: the two are
           combined by letting the keyframe drive scale while JS drives translate
           via a wrapping element instead, so they never fight over the same prop */
        @keyframes kenburns {
          0%   { transform: scale(1.12) translate3d(0,0,0); }
          50%  { transform: scale(1.18) translate3d(-1%, -1%, 0); }
          100% { transform: scale(1.12) translate3d(0,0,0); }
        }
        .kenburns-wrap { animation: kenburns 26s ease-in-out infinite; }

        .code-row { opacity: 0; transform: translateX(-6px); transition: opacity .3s ease, transform .3s ease; }
        .code-row.shown { opacity: 1; transform: translateX(0); }

        .uptime-figure { font-variant-numeric: tabular-nums; }

        /* light duotone grade over the photo — tints it toward the palette
           without ever going flat/opaque black */
        .grade { background: linear-gradient(160deg, rgba(232,163,61,0.16), rgba(14,17,22,0.1) 45%, rgba(143,179,150,0.14));
                 mix-blend-mode: color; }

        /* vignette only at the far edges, center of the photo stays clean */
        .vignette { background: radial-gradient(120% 90% at 50% 40%, transparent 55%, rgba(10,12,16,0.55) 100%); }

        /* solid tint, NOT a backdrop-blur — a blurred panel over the photo
           was smudging his face wherever the dock happened to overlap it.
           A flat tint keeps text legible without blurring the photo underneath. */
        .frost { background: rgba(12,15,20,0.72); border: 1px solid rgba(255,255,255,0.08); }

        .pill-hover { transition: transform 0.25s ease, background 0.25s ease; }
        .pill-hover:hover { transform: translateY(-1px) scale(1.03); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .page-entry, .code-row, .dock-card, .pill-hover { transition: none !important; opacity: 1 !important; transform: none !important; }
          .caret, .pulse-dot, .kenburns-wrap { animation: none !important; }
        }

        /* ── FIXED BACKGROUND, CONTAINED TO THIS COMPONENT ONLY ── */

        .about-wrapper {
          isolation: isolate;
          position: relative;
          min-height: 100vh;
          overflow: hidden;
          background: #0E1116;

          /* THIS is what actually scopes the fixed background — not
             isolation. isolation only creates a new stacking context for
             z-index / blend-mode purposes; it does NOT contain
             position:fixed descendants. A transform (or filter /
             perspective / contain:paint|layout) on an ancestor creates a
             CSS "containing block", which makes any position:fixed child
             inside it behave like position:absolute relative to THIS box
             instead of the viewport. Without this line, .about-fixed-bg
             would stay pinned to the whole page and could show through /
             overlap other components while scrolling. */
          transform: translateZ(0);

          /* Belt-and-braces: also clips any paint that tries to escape
             this box's bounds. */
          contain: paint;
        }

        /* Fixed background container — now contained within .about-wrapper
           because of the transform above, not pinned to the viewport. */
        .about-fixed-bg {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }

        /* Content wrapper - sits above the fixed background */
        .about-content {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          pointer-events: none;
        }

        /* Make interactive elements clickable */
        .about-content * {
          pointer-events: auto;
        }
      `}</style>

      {/* Outer wrapper with isolation + transform - scopes the fixed background */}
      <div className="about-wrapper font-sans-brand" ref={wrapperRef}>

        {/* Fixed background image - contained to this wrapper only.
            Two nested layers: outer does the slow Ken Burns scale/drift via
            CSS keyframes, inner <img> gets its transform written by JS for
            scroll parallax — kept on separate elements so they never
            clobber each other's `transform`. */}
        <div className="about-fixed-bg">
          <div className="kenburns-wrap w-full h-full">
            <img
              ref={bgImgRef}
              src="/cvr2.jpg"
              alt="Januda J"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 15%', transform: 'scale(1.12)', willChange: 'transform' }}
            />
          </div>
          <div className="absolute inset-0 grade pointer-events-none" />
          <div className="absolute inset-0 vignette pointer-events-none" />
        </div>

        {/* Content overlaid on top of fixed background */}
        <div className="about-content">
          <div
            className={`page-entry relative z-10 min-h-screen flex flex-col justify-between px-4 sm:px-8 py-6 sm:py-10 ${
              booted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {/* Top label plate */}
            <div ref={label.ref} className={`reveal ${label.visible ? 'visible' : ''}`}>
              <div className="inline-block frost rounded-xl px-4 sm:px-5 py-3 sm:py-4 border border-white/10 shadow-xl">
                <p className="font-mono-brand text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#8FB39C] mb-1.5">
                  // about
                </p>
                <h1 className="font-mono-brand text-2xl sm:text-3xl md:text-4xl font-semibold text-[#E8E6E1] leading-tight">
                  Januda <span className="text-[#E8A33D]">J</span>
                </h1>
                <p className="font-sans-brand text-sm sm:text-base text-[#A9B0BB] font-light mt-1.5">
                  Software Engineer &nbsp;·&nbsp; Lifelong Learner
                </p>
              </div>
            </div>

            {/* Status pill — now a live uptime readout instead of a static label */}
            <div className="self-end -mt-2 sm:mt-0">
              <div className="pill-hover inline-flex items-center gap-2.5 frost border border-white/10 rounded-full pl-3 pr-4 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[#8FB39C]" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8FB39C]" />
                </span>
                <span className="font-mono-brand text-[11px] sm:text-xs text-[#E8E6E1]/80">
                  building &amp; learning in public
                  <span className="text-[#6E8CA0]"> · </span>
                  <span className="uptime-figure text-[#8FB39C]">{formatUptime(uptime)}</span>
                </span>
              </div>
            </div>

            {/* Bottom dock — about.ts + vision, frosted so the photo still shows through */}
            <div ref={dock.ref} className={`reveal delay-100 ${dock.visible ? 'visible' : ''} mt-6 sm:mt-8`}>
              <div
                ref={dockCardRef}
                onMouseMove={handleDockMove}
                onMouseLeave={handleDockLeave}
                className="dock-card max-w-3xl mx-auto lg:mx-0 frost rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
              >

                <div className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border-b border-white/10">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#6E8CA0]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E8A33D]/60" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#8FB39C]/60" />
                  <span className="font-mono-brand text-[11px] sm:text-xs text-[#A9B0BB] ml-2">about.ts</span>
                </div>

                <div className="px-4 sm:px-6 py-4 sm:py-5 font-mono-brand text-[12px] sm:text-sm leading-6 sm:leading-7">
                  {CODE_LINES.map((line, i) => {
                    const isDone = i < typeLine || (reducedMotion && dock.visible);
                    const isTyping = i === typeLine && !reducedMotion;
                    const isShown = isDone || isTyping;

                    return (
                      <div
                        key={line.n}
                        className={`code-row flex ${isShown ? 'shown' : ''}`}
                        style={{ transitionDelay: `${Math.min(i, 1) * 40}ms` }}
                      >
                        <span className="w-5 sm:w-6 shrink-0 text-right pr-3 text-[#6B7280] select-none">
                          {line.n}
                        </span>
                        <span className="text-[#E8E6E1] whitespace-pre-wrap break-words">
                          {isDone
                            ? line.colored
                            : isTyping
                              ? <>{line.plain.slice(0, typeChar)}<span className="caret" /></>
                              : '\u00A0'}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="px-4 sm:px-6 pb-5 sm:pb-6 pt-1 font-mono-brand text-[12px] sm:text-sm leading-6 sm:leading-7 border-t border-white/10 mt-1">
                  <p className="text-[#7C8F82] pt-3">/**</p>
                  <p className="text-[#8FB39C] italic">
                    {' * '}I want to inspire student communities as much as possible with all my
                    skills and capabilities &mdash; a purpose&#8209;driven community, globally,
                    instead of everyone going with the flow. Because
                  </p>
                  <p className="text-[#8FB39C] italic">
                    {' * '}&ldquo;If we can change the way we see the world, we can change the world we see.&rdquo;
                  </p>
                  <p className="text-[#7C8F82]">{' '}*/</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}