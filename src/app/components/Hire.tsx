"use client";

import React, { useEffect, useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const TeamCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  const slides = useMemo(
    () => [
      {
        id: 1,
        title: "Want To Work Together",
        subtitle: "I'm available for Freelance Work.",
        buttonText: "Contact Me Via Upwork",
        bgImage: "/wso2.jpeg",
      },
    ],
    []
  );

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = slides.map((slide, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();

          img.onload = () => {
            setImagesLoaded((prev) => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });

            resolve();
          };

          img.onerror = () => {
            setImagesLoaded((prev) => {
              const newLoaded = [...prev];
              newLoaded[index] = false;
              return newLoaded;
            });

            resolve();
          };

          img.src = slide.bgImage;
        });
      });

      await Promise.all(loadPromises);
    };

    loadImages();
  }, [slides]);

  // Auto-play
  useEffect(() => {
    if (!imagesLoaded.some(Boolean) || slides.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => {
      window.clearInterval(timer);
    };
  }, [imagesLoaded, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + slides.length) % slides.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">

      {/* Loading */}
      {imagesLoaded.length === 0 && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
          <div className="text-xs font-light uppercase tracking-[0.35em] text-white/70">
            Loading
          </div>
        </div>
      )}

      {/* Carousel */}
      <div className="relative h-full w-full">

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >

            {/* FIXED BACKGROUND */}
            <div
              className="relative h-full w-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `
                  linear-gradient(
                    rgba(0, 0, 0, 0.58),
                    rgba(0, 0, 0, 0.58)
                  ),
                  url("${slide.bgImage}")
                `,
                backgroundAttachment: "fixed",
                backgroundPosition: "center center",
                backgroundSize: "cover",
              }}
            >

              {/* Main Content */}
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">

                <div className="mx-auto w-full max-w-5xl">

                  {/* Small Top Text */}
                  <div className="mb-5">
                    <span
                      className="
                        text-[10px]
                        font-normal
                        uppercase
                        tracking-[0.38em]
                        text-white/75
                        sm:text-xs
                      "
                    >
                      Freelance Services
                    </span>
                  </div>

                  {/* Main Heading */}
                  <h1
                    className="
                      mb-6
                      text-2xl
                      font-extralight
                      uppercase
                      leading-[1.4]
                      tracking-[0.18em]
                      text-white
                      sm:text-3xl
                      md:text-4xl
                      lg:text-5xl
                    "
                  >
                    {slide.title}
                  </h1>

                  {/* Decorative Line */}
                  <div className="mb-6 flex justify-center">
                    <div className="h-px w-12 bg-white/50 sm:w-16" />
                  </div>

                  {/* Subtitle */}
                  <p
                    className="
                      mx-auto
                      mb-9
                      max-w-2xl
                      text-sm
                      font-extralight
                      leading-relaxed
                      tracking-[0.08em]
                      text-white/85
                      sm:text-base
                      md:text-lg
                    "
                  >
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <a
                    href="https://www.upwork.com/freelancers/~01c898488a923ed2f7?mp_source=share"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      group
                      inline-flex
                      items-center
                      border
                      border-white/80
                      bg-transparent
                      px-7
                      py-3.5
                      text-[10px]
                      font-light
                      uppercase
                      tracking-[0.22em]
                      text-white
                      transition-all
                      duration-500
                      hover:bg-white
                      hover:text-black
                      sm:px-8
                      sm:py-4
                      sm:text-[11px]
                    "
                  >
                    <span>{slide.buttonText}</span>

                    <ArrowRight
                      className="
                        ml-4
                        h-4
                        w-4
                        transition-transform
                        duration-500
                        group-hover:translate-x-1.5
                      "
                    />
                  </a>

                </div>
              </div>

              {/* Left Decorative Line */}
              <div
                className="
                  absolute
                  left-8
                  top-1/2
                  hidden
                  -translate-y-1/2
                  lg:block
                  xl:left-12
                "
              >
                <div className="h-20 w-px bg-white/35" />
              </div>

              {/* Right Decorative Line */}
              <div
                className="
                  absolute
                  right-8
                  top-1/2
                  hidden
                  -translate-y-1/2
                  lg:block
                  xl:right-12
                "
              >
                <div className="h-20 w-px bg-white/35" />
              </div>

              {/* Bottom Text */}
              <div
                className="
                  absolute
                  bottom-9
                  left-1/2
                  hidden
                  -translate-x-1/2
                  md:block
                "
              >
                <span
                  className="
                    text-[9px]
                    font-light
                    uppercase
                    tracking-[0.42em]
                    text-white/45
                  "
                >
                  Let's Create Something Together
                </span>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="
              absolute
              left-5
              top-1/2
              z-20
              -translate-y-1/2
              p-3
              text-white/65
              transition-all
              duration-300
              hover:text-white
            "
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="
              absolute
              right-5
              top-1/2
              z-20
              -translate-y-1/2
              p-3
              text-white/65
              transition-all
              duration-300
              hover:text-white
            "
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Slide Indicators */}
      {slides.length > 1 && (
        <div
          className="
            absolute
            bottom-8
            left-1/2
            z-20
            -translate-x-1/2
          "
        >
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`
                  h-1.5
                  w-1.5
                  rounded-full
                  transition-all
                  duration-300
                  ${
                    index === currentSlide
                      ? "scale-125 bg-white"
                      : "bg-white/40 hover:bg-white/70"
                  }
                `}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <button
        aria-label="Menu"
        className="
          absolute
          right-6
          top-6
          z-30
          text-white/80
          transition-colors
          hover:text-white
          md:hidden
        "
      >
        <div className="flex h-6 w-6 flex-col justify-center space-y-1.5">
          <div className="h-px w-full bg-current" />
          <div className="h-px w-full bg-current" />
          <div className="h-px w-full bg-current" />
        </div>
      </button>

      {/* Progress Bar */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 z-20 h-px w-full bg-white/20">
          <div
            className="h-full bg-white/80 transition-all duration-500"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
            }}
          />
        </div>
      )}

    </div>
  );
};

export default TeamCarousel;