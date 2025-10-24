"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgImage: string;
}

const preloadImages = (slides: Slide[]): Promise<void[]> => {
  if (typeof window === 'undefined') {
    return Promise.resolve([]);
  }
  
  return Promise.all(
    slides.map((slide) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = slide.bgImage;
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Crafting Innovative Software",
    subtitle: "Building modern web and mobile applications",
    bgImage: "/coverse.webp",
  },
  {
    id: 2,
    title: "Exploring the World",
    subtitle: "Passionate about traveling and discovering new cultures",
    bgImage: "/cover1.webp",
  },
  {
    id: 3,
    title: "IoT & Robotics Creations",
    subtitle: "Designing smart devices and building innovative robots",
    bgImage: "/rob.webp",
  },
  {
    id: 4,
    title: "Innovation Through Competition",
    subtitle: "Creating real-world solutions by learning through competitive innovation.",
    bgImage: "/bal2.webp",
  },
];

const TeslaHeader = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    preloadImages(slides).then(() => {
      setImagesLoaded(true);
    });
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isHovered || !imagesLoaded) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, imagesLoaded]);

  useEffect(() => {
    if (!imagesLoaded || !progressRef.current) return;

    const progressBar = progressRef.current;
    
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';
    progressBar.getBoundingClientRect();
    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '100%';

  }, [currentSlide, imagesLoaded]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const diff = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 50;

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    touchStartRef.current = 0;
    touchEndRef.current = 0;
    
    setTimeout(() => setIsHovered(false), 500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (!imagesLoaded) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${slides[0].bgImage})`,
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4 z-10">
          <h1 className="text-3xl md:text-6xl font-bold mb-4 leading-tight">
            {slides[0].title}
          </h1>
          <p className="text-lg md:text-2xl mb-8 font-medium opacity-90">
            {slides[0].subtitle}
          </p>
        </div>
      </div>
    );
  }

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-black group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Image carousel"
      role="region"
      aria-roledescription="carousel"
    >
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== currentSlide}
          >
            <div
              className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[2500ms] ease-out ${
                index === currentSlide ? 'scale-100' : 'scale-130'
              }`}
              style={{
                backgroundImage: `url(${slide.bgImage})`,
              }}
            />
            
            <div className="absolute inset-0 bg-black/70" />

            <div className="relative flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-6 z-10">
              <h1 
                className={`text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 leading-tight px-2 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: index === currentSlide ? '300ms' : '0ms'
                }}
              >
                {slide.title}
              </h1>
              <p 
                className={`text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 font-medium opacity-90 max-w-4xl px-4 transition-all duration-1000 ${
                  index === currentSlide ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: index === currentSlide ? '600ms' : '0ms'
                }}
              >
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-2 xs:left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/20 hover:bg-white/40 active:bg-white/50 backdrop-blur-md
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[44px] min-h-[44px] flex items-center justify-center
                   opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 xs:right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/20 hover:bg-white/40 active:bg-white/50 backdrop-blur-md
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[44px] min-h-[44px] flex items-center justify-center
                   opacity-0 hover:opacity-100 group-hover:opacity-100"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 xs:w-5 xs:h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
      </button>

      <div className="absolute bottom-20 xs:bottom-22 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 xs:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75 active:bg-white/90"
            }`}
            style={{
              width: index === currentSlide ? '20px' : '12px',
              height: '12px',
              borderRadius: '6px',
              minWidth: index === currentSlide ? '20px' : '12px',
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{ width: "0%" }}
          aria-hidden="true"
        />
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentSlide + 1} of ${slides.length}: ${slides[currentSlide]?.title}`}
      </div>
    </section>
  );
});

TeslaHeader.displayName = "TeslaHeader";

export default TeslaHeader;
