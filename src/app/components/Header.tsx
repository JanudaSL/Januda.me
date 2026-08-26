"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  memo,
} from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
  display: "swap",
});

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgImage: string;
}

const SLIDE_DURATION = 2500;

const preloadImages = (slides: Slide[]): Promise<void[]> => {
  if (typeof window === "undefined") {
    return Promise.resolve([]);
  }

  return Promise.all(
    slides.map((slide) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = slide.bgImage;

        const timeout = setTimeout(() => resolve(), 2000);

        img.onload = () => {
          clearTimeout(timeout);
          resolve();
        };

        img.onerror = () => {
          clearTimeout(timeout);
          resolve();
        };
      });
    })
  );
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Crafting Innovative Software",
    subtitle: "Building modern web and mobile applications",
    bgImage: "/bioi.jpg",
  },
  {
    id: 2,
    title: "Exploring the World",
    subtitle:
      "Passionate about traveling and discovering new cultures",
    bgImage: "/cover1.webp",
  },
  {
    id: 3,
    title: "IoT & Robotics Creations",
    subtitle:
      "Designing smart devices and building innovative robots",
    bgImage: "/rob.webp",
  },
  {
    id: 4,
    title: "Innovation Through Competition",
    subtitle:
      "Creating real-world solutions by learning through competitive innovation.",
    bgImage: "/bal2.webp",
  },
];

const TeslaHeader = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [resumeSignal, setResumeSignal] = useState(0);
  const [zoomStarted, setZoomStarted] = useState(false);

  const progressRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const elapsedRef = useRef<number>(0);

  // ---------- preload ----------
  useEffect(() => {
    let mounted = true;

    const fallback = setTimeout(() => {
      if (mounted) setImagesLoaded(true);
    }, 2500);

    preloadImages(slides).then(() => {
      if (mounted) {
        clearTimeout(fallback);
        setImagesLoaded(true);
      }
    });

    return () => {
      mounted = false;
      clearTimeout(fallback);
    };
  }, []);

  // ---------- first zoom ----------
  useEffect(() => {
    if (!imagesLoaded) return;

    const id = requestAnimationFrame(() =>
      setZoomStarted(true)
    );

    return () => cancelAnimationFrame(id);
  }, [imagesLoaded]);

  // ---------- slide navigation ----------
  const goToSlide = useCallback(
    (index: number, resetElapsed = true) => {
      setCurrentSlide(index);

      if (resetElapsed) {
        elapsedRef.current = 0;
      }
    },
    []
  );

  const nextSlide = useCallback(() => {
    setCurrentSlide(
      (prev) => (prev + 1) % slides.length
    );

    elapsedRef.current = 0;
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + slides.length) % slides.length
    );

    elapsedRef.current = 0;
  }, []);

  const handleManualNav = useCallback(
    (action: () => void) => {
      action();
    },
    []
  );

  // ---------- rAF loop ----------
  useEffect(() => {
    if (!imagesLoaded) return;

    if (isPaused) {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      return;
    }

    startTimeRef.current =
      performance.now() - elapsedRef.current;

    const tick = (now: number) => {
      const elapsed =
        now - startTimeRef.current;

      elapsedRef.current = elapsed;

      const pct = Math.min(
        (elapsed / SLIDE_DURATION) * 100,
        100
      );

      if (progressRef.current) {
        progressRef.current.style.width = `${pct}%`;
      }

      if (elapsed >= SLIDE_DURATION) {
        elapsedRef.current = 0;

        setCurrentSlide(
          (prev) => (prev + 1) % slides.length
        );

        return;
      }

      rafRef.current =
        requestAnimationFrame(tick);
    };

    rafRef.current =
      requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(
          rafRef.current
        );
      }
    };
  }, [
    isPaused,
    imagesLoaded,
    currentSlide,
    resumeSignal,
  ]);

  // ---------- reset progress ----------
  useEffect(() => {
    if (!progressRef.current) return;

    if (elapsedRef.current === 0) {
      progressRef.current.style.transition =
        "none";

      progressRef.current.style.width =
        "0%";
    }
  }, [currentSlide]);

  // ---------- visibility ----------
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(
            rafRef.current
          );
        }
      } else {
        startTimeRef.current =
          performance.now() -
          elapsedRef.current;

        setResumeSignal(
          (s) => s + 1
        );
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibility
    );

    return () =>
      document.removeEventListener(
        "visibilitychange",
        handleVisibility
      );
  }, []);

  // ---------- touch swipe ----------
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (
    e: React.TouchEvent
  ) => {
    touchStartRef.current =
      e.touches[0].clientX;
  };

  const handleTouchMove = (
    e: React.TouchEvent
  ) => {
    touchEndRef.current =
      e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      touchStartRef.current &&
      touchEndRef.current
    ) {
      const diff =
        touchStartRef.current -
        touchEndRef.current;

      const minSwipeDistance = 50;

      if (
        Math.abs(diff) >
        minSwipeDistance
      ) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
    }

    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // ---------- keyboard ----------
  useEffect(() => {
    const handleKeyDown = (
      e: KeyboardEvent
    ) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (
        e.key === "ArrowRight"
      ) {
        nextSlide();
      } else if (e.key === " ") {
        e.preventDefault();
        setIsPaused(
          (p) => !p
        );
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
  }, [nextSlide, prevSlide]);

  // ---------- loading ----------
  if (!imagesLoaded) {
    return (
      <div
        className={`relative w-full h-screen h-dvh overflow-hidden bg-black ${josefin.className}`}
      >
        <div
          className="absolute inset-0 bg-cover bg-[center_20%]"
          style={{
            backgroundImage: `url(${slides[0].bgImage})`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/60" />

        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4 z-10">
          <span className="font-[300] uppercase tracking-[0.25em] text-[10px] md:text-xs text-white/70 mb-4">
            Portfolio
          </span>

          <h1 className="font-[200] text-2xl sm:text-3xl md:text-5xl tracking-[0.10em] md:tracking-[0.14em] mb-4 leading-tight text-white uppercase">
            {slides[0].title}
          </h1>

          <p className="font-[300] text-sm md:text-lg mb-8 font-light text-white/75 leading-relaxed tracking-[0.035em]">
            {slides[0].subtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className={`relative w-full h-screen h-dvh overflow-hidden bg-black group ${josefin.className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Image carousel"
      role="region"
      aria-roledescription="carousel"
    >
      {/* Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {slides.map(
          (slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            >
              <div
                className={`absolute inset-0 bg-cover bg-[center_20%] bg-no-repeat transition-transform ease-out will-change-transform ${
                  index ===
                    currentSlide &&
                  zoomStarted
                    ? "duration-[7000ms] scale-110"
                    : "duration-0 scale-100"
                }`}
                style={{
                  backgroundImage: `url(${slide.bgImage})`,
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/55" />
            </div>
          )
        )}
      </div>

      {/* Foreground Text */}
      <div className="relative z-10 w-full h-full">
        {slides.map(
          (slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-6 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }`}
              aria-hidden={
                index !== currentSlide
              }
            >
              {/* Slide Number */}
              <span
                className={`font-[300] uppercase tracking-[0.25em] md:tracking-[0.30em] text-[10px] md:text-xs text-white/60 mb-4 transition-all duration-1000 ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
                style={{
                  transitionDelay:
                    index ===
                    currentSlide
                      ? "150ms"
                      : "0ms",
                }}
              >
                {`0${index + 1} / 0${slides.length}`}
              </span>

              {/* Main Heading */}
              <h1
                className={`font-[200] text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.07em] xs:tracking-[0.08em] sm:tracking-[0.10em] md:tracking-[0.12em] mb-3 md:mb-4 leading-tight px-2 transition-all duration-1000 text-white ${
                  index === currentSlide
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay:
                    index ===
                    currentSlide
                      ? "300ms"
                      : "0ms",
                }}
              >
                {slide.title}
              </h1>

              {/* Subtitle */}
              <p
                className={`font-[300] text-sm xs:text-base sm:text-lg md:text-xl lg:text-xl xl:text-2xl mb-6 md:mb-8 text-white/75 leading-relaxed tracking-[0.025em] sm:tracking-[0.035em] max-w-4xl px-4 transition-all duration-1000 ${
                  index === currentSlide
                    ? "opacity-90 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay:
                    index ===
                    currentSlide
                      ? "600ms"
                      : "0ms",
                }}
              >
                {slide.subtitle}
              </p>
            </div>
          )
        )}
      </div>

      {/* Previous */}
      <button
        onClick={() =>
          handleManualNav(
            prevSlide
          )
        }
        className="absolute left-2 xs:left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/10 hover:bg-white/30 active:bg-white/40 backdrop-blur-md
                   border border-white/10 hover:border-white/30
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[44px] min-h-[44px] flex items-center justify-center
                   opacity-40 md:opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
      </button>

      {/* Next */}
      <button
        onClick={() =>
          handleManualNav(
            nextSlide
          )
        }
        className="absolute right-2 xs:right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/10 hover:bg-white/30 active:bg-white/40 backdrop-blur-md
                   border border-white/10 hover:border-white/30
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[44px] min-h-[44px] flex items-center justify-center
                   opacity-40 md:opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
      </button>

      {/* Pause / Play */}
      <button
        onClick={() =>
          setIsPaused(
            (p) => !p
          )
        }
        className="absolute bottom-6 left-4 md:left-6 z-20 flex items-center gap-2
                   bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10
                   rounded-full px-3 py-2 transition-all duration-200
                   focus:outline-none focus:ring-2 focus:ring-white/50"
        aria-label={
          isPaused
            ? "Play slideshow"
            : "Pause slideshow"
        }
      >
        {isPaused ? (
          <Play
            className="w-3.5 h-3.5 text-white"
            fill="currentColor"
          />
        ) : (
          <Pause
            className="w-3.5 h-3.5 text-white"
            fill="currentColor"
          />
        )}
      </button>

      {/* Dots */}
      <div className="absolute bottom-20 xs:bottom-22 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 xs:space-x-3 z-20">
        {slides.map(
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                goToSlide(index)
              }
              className={`transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-white hover:scale-125 ${
                index === currentSlide
                  ? "bg-white scale-110"
                  : "bg-white/40 hover:bg-white/70"
              }`}
              style={{
                width:
                  index ===
                  currentSlide
                    ? "22px"
                    : "10px",
                height: "10px",
                minWidth:
                  index ===
                  currentSlide
                    ? "22px"
                    : "10px",
              }}
              aria-label={`Go to slide ${
                index + 1
              }`}
              aria-current={
                index ===
                currentSlide
              }
            />
          )
        )}
      </div>

      {/* Progress */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/15 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{
            width: "0%",
            transition: isPaused
              ? "none"
              : "width 100ms linear",
          }}
          aria-hidden="true"
        />
      </div>

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {`Slide ${
          currentSlide + 1
        } of ${
          slides.length
        }: ${
          slides[currentSlide]?.title
        }`}
      </div>
    </section>
  );
});

TeslaHeader.displayName =
  "TeslaHeader";

export default TeslaHeader;