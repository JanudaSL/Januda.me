"use client";
import React, { useState, useEffect, useRef } from 'react';

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

export default function AboutJanuda() {
  const [isLoaded, setIsLoaded] = useState(false);

  const heading  = useScrollReveal(0.1);
  const subtitle = useScrollReveal(0.1);
  const divider  = useScrollReveal(0.1);
  const avatar   = useScrollReveal(0.15);
  const vision   = useScrollReveal(0.15);

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1),
                      transform 0.8s cubic-bezier(0.22,1,0.36,1);
        }
        .reveal.from-left  { transform: translateX(-40px); }
        .reveal.from-right { transform: translateX(40px); }
        .reveal.scale-in   { transform: scale(0.88); }
        .reveal.visible    { opacity: 1; transform: translate(0) scale(1); }

        .delay-100 { transition-delay: 0.10s; }
        .delay-200 { transition-delay: 0.20s; }
        .delay-300 { transition-delay: 0.30s; }
        .delay-400 { transition-delay: 0.40s; }

        @keyframes spin-slow    { to { transform: rotate(360deg); } }
        @keyframes spin-reverse { to { transform: rotate(-360deg); } }
        @keyframes orbit {
          0%   { transform: rotate(0deg)   translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0%   { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          100% { transform: rotate(0deg)   translateX(50px) rotate(0deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-8px); }
        }
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 0px 0px rgba(163,230,53,0.0); }
          50%       { box-shadow: 0 0 18px 4px rgba(163,230,53,0.18); }
        }

        .spin-slow    { animation: spin-slow    20s linear infinite; }
        .spin-reverse { animation: spin-reverse 15s linear infinite; }
        .orbit-el     { animation: orbit        12s linear infinite; }
        .orbit-el-rev { animation: orbit-reverse 8s linear infinite; }
        .float-el     { animation: float 6s ease-in-out infinite; }
        .vision-card  { animation: glow-pulse 4s ease-in-out infinite; }

        .page-entry { transition: opacity 0.9s ease, transform 0.9s ease; }

        @media (max-width: 640px) {
          @keyframes orbit {
            0%   { transform: rotate(0deg)   translateX(45px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
          }
          @keyframes orbit-reverse {
            0%   { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
            100% { transform: rotate(0deg)   translateX(40px) rotate(0deg); }
          }
        }
      `}</style>

      <div
        className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/cvr2.jpg')" }}
      >
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

        {/* Content */}
        <div
          className={`page-entry relative z-10 min-h-screen px-3 sm:px-4 py-6 sm:py-8 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="w-full max-w-6xl mx-auto">

            {/* Heading */}
            <div className="mb-8 sm:mb-12">
              <div className="space-y-4 sm:space-y-6 text-left">
                <div className="space-y-3 sm:space-y-4">
                  <div ref={heading.ref} className={`reveal from-left delay-100 ${heading.visible ? 'visible' : ''}`}>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                      About{' '}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300">
                        Januda J
                      </span>
                    </h1>
                  </div>
                  <div ref={divider.ref} className={`reveal delay-200 ${divider.visible ? 'visible' : ''}`}>
                    <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full" />
                  </div>
                </div>

                <div ref={subtitle.ref} className={`reveal from-left delay-300 ${subtitle.visible ? 'visible' : ''}`}>
                  <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl">
                    Software Engineer | Lifelong learner
                  </p>
                </div>
              </div>
            </div>

            {/* Avatar */}
            <div
              ref={avatar.ref}
              className={`reveal scale-in delay-300 flex justify-center sm:justify-end mb-12 sm:mb-16 ${avatar.visible ? 'visible' : ''}`}
            >
              <div className="relative float-el">
                <div className="w-40 sm:w-44 md:w-48 h-40 sm:h-44 md:h-48 relative">
                  <div className="absolute inset-0 border-2 border-lime-400/40 rounded-full spin-slow" />
                  <div className="absolute inset-2 border border-emerald-400/30 rounded-full spin-reverse" />
                  <div className="absolute inset-4 border border-lime-300/20 rounded-full animate-pulse" />
                  <div className="absolute -top-2 right-1/4 w-3 h-3 bg-lime-400/60 rounded-full orbit-el" />
                  <div className="absolute top-1/4 -right-2 w-2 h-2 bg-emerald-400/80 rounded-full orbit-el-rev" />
                  <div className="absolute -top-1 right-1/3 w-1.5 h-1.5 bg-lime-300/70 rounded-full animate-bounce" />
                </div>
              </div>
            </div>

            {/* Vision card */}
            <div
              ref={vision.ref}
              className={`reveal from-right delay-400 flex justify-center sm:justify-end ${vision.visible ? 'visible' : ''}`}
            >
              <div className="relative max-w-sm sm:max-w-md w-full sm:w-auto">
                <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-lg sm:rounded-xl blur-sm" />
                <div className="vision-card relative bg-white/[0.08] backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border border-white/10 shadow-2xl">
                  <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                    <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
                    <h2 className="text-base sm:text-lg font-bold text-lime-400">My Vision</h2>
                  </div>
                  <p className="text-gray-200 leading-relaxed text-xs sm:text-sm font-light text-left">
                    I want to inspire student communities as much as possible with all my skills and
                    capabilities. I dream of seeing a purpose-driven student community globally instead
                    of everyone going with the flow. Because I believe that,{' '}
                    <span className="text-lime-300 font-medium italic">
                      &ldquo;If we can change the way we see the world, we can change the world we see.&rdquo;
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Decorative accents */}
        <div className="absolute top-6 sm:top-8 right-3 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 border-2 border-lime-400/20 rounded-full opacity-40 animate-pulse pointer-events-none" />
        <div className="absolute top-12 sm:top-16 right-6 sm:right-8 w-1 h-1 bg-lime-400/60 rounded-full animate-ping pointer-events-none" />
        <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border border-emerald-400/20 rounded-full opacity-30 pointer-events-none" />
        <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-lime-400/50 to-emerald-400/20 rounded-full pointer-events-none" />
        <div className="absolute top-1/3 left-1 sm:left-2 w-0.5 h-8 sm:h-12 bg-gradient-to-b from-lime-400/40 to-transparent rounded-full pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-1 h-1 border border-lime-400/30 rotate-45 opacity-50 pointer-events-none" />
        <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-lime-400/80 rounded-full animate-ping pointer-events-none" />
        <div className="absolute top-2/3 right-1/3 w-1 h-1 border border-emerald-400/40 rounded-full opacity-60 animate-pulse pointer-events-none" />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-lime-400/30 opacity-50 pointer-events-none" />
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-emerald-400/30 opacity-50 pointer-events-none" />
      </div>
    </>
  );
}