"use client";

import React, { useState, useEffect, useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  bgImage: string;
}

// Preload images immediately
const preloadImages = (slides: Slide[]): Promise<void[]> => {
  return Promise.all(
    slides.map((slide) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = slide.bgImage;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Continue even if image fails
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

// Preload images immediately when module loads
const imagePreloadPromise = preloadImages(slides);

const TeslaHeader = memo(() => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Fast image loading - use preloaded images
  useEffect(() => {
    imagePreloadPromise.then(() => {
      setImagesLoaded(true);
    });
  }, []);

  // Optimized navigation functions
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Auto-play with optimized timer - SAME FOR MOBILE AND DESKTOP
  useEffect(() => {
    if (isHovered || !imagesLoaded) return;

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isHovered, imagesLoaded]);

  // Progress bar animation - SAME FOR MOBILE AND DESKTOP
  useEffect(() => {
    if (!imagesLoaded || !progressRef.current) return;

    const progressBar = progressRef.current;
    
    // Reset progress bar
    progressBar.style.transition = 'none';
    progressBar.style.width = '0%';

    // Force reflow
    progressBar.getBoundingClientRect();

    // Start new animation
    progressBar.style.transition = 'width 5s linear';
    progressBar.style.width = '100%';

  }, [currentSlide, imagesLoaded]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Touch swipe for mobile - ADDITIONAL TO ARROWS
  const touchStartRef = useRef(0);
  const touchEndRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartRef.current || !touchEndRef.current) return;

    const diff = touchStartRef.current - touchEndRef.current;
    const minSwipeDistance = 30; // Smaller threshold for better responsiveness

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0) {
        nextSlide(); // Swipe left
      } else {
        prevSlide(); // Swipe right
      }
    }

    // Reset values
    touchStartRef.current = 0;
    touchEndRef.current = 0;
  };

  // Show immediate preview with first slide
  if (!imagesLoaded) {
    return (
      <div 
        className="relative w-full h-screen overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${slides[0].bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col items-center justify-center h-full text-white text-center px-4">
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
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Image carousel"
    >
      {/* Slides with optimized rendering */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
            aria-hidden={index !== currentSlide}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${slide.bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          >
            {/* Text Content - Responsive but same structure */}
            <div className="flex flex-col items-center justify-center h-full text-white text-center px-4 md:px-6">
              <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-3 md:mb-4 leading-tight px-2">
                {slide.title}
              </h1>
              <p className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 font-medium opacity-90 max-w-4xl px-4">
                {slide.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - ALWAYS VISIBLE ON MOBILE AND DESKTOP */}
      <button
        onClick={prevSlide}
        className="absolute left-2 xs:left-3 sm:left-4 md:left-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm 
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[40px] min-h-[40px] flex items-center justify-center"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-2 xs:right-3 sm:right-4 md:right-6 top-1/2 transform -translate-y-1/2 z-20 
                   bg-white/20 hover:bg-white/30 active:bg-white/40 backdrop-blur-sm 
                   rounded-full p-2 xs:p-2 sm:p-3 transition-all duration-200 
                   focus:outline-none focus:ring-2 focus:ring-white/50 active:scale-95
                   min-w-[40px] min-h-[40px] flex items-center justify-center"
        aria-label="Next slide"
      >
        <ChevronRight className="w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
      </button>

      {/* Slide Indicators - ALWAYS VISIBLE */}
      <div className="absolute bottom-20 xs:bottom-22 sm:bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2 xs:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "bg-white scale-110"
                : "bg-white/50 hover:bg-white/75 active:bg-white/90"
            }`}
            style={{
              width: index === currentSlide ? '16px' : '10px',
              height: '10px',
              borderRadius: '5px',
              minWidth: index === currentSlide ? '16px' : '10px',
            }}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide}
          />
        ))}
      </div>

      {/* Progress Bar - ALWAYS VISIBLE */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{ width: "0%" }}
          aria-hidden="true"
        />
      </div>

      {/* Accessibility Announcements */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {`Slide ${currentSlide + 1} of ${slides.length}: ${slides[currentSlide]?.title}`}
      </div>
    </section>
  );
});

TeslaHeader.displayName = "TeslaHeader";

export default TeslaHeader;
