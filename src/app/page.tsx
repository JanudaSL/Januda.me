"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const TeslaHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);

  // Sample slides data (can be localized with next-intl later)
  const slides = [
    {
      id: 1,
      title: "Crafting Innovative Software",
      subtitle: "Building modern web and mobile applications",
      bgImage: "/coverse.jpg",
    },
    {
      id: 2,
      title: "Exploring the World",
      subtitle: "Passionate about traveling and discovering new cultures",
      bgImage: "/cover1.png",
    },
    {
      id: 3,
      title: "IoT & Robotics Creations",
      subtitle: "Designing smart devices and building innovative robots",
      bgImage: "/rob.jpg",
    },
  ];

  // Auto-play with pause on hover
  useEffect(() => {
    if (isHovered) return; // pause when hovered
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isHovered, slides.length]);

  // Progress bar reset on slide change
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.width = "0%";
      progressRef.current.offsetHeight; // trigger reflow
      progressRef.current.style.transition = "width 5s linear";
      progressRef.current.style.width = "100%";
    }
  }, [currentSlide]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % slides.length);

  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const goToSlide = (index: number) => setCurrentSlide(index);

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${slide.bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Text Overlay */}
          <div className="flex flex-col items-center justify-center h-full text-white text-center px-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl mb-8 font-medium opacity-90">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentSlide
                ? "bg-white"
                : "bg-white/50 hover:bg-white/75"
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 z-20">
        <div
          ref={progressRef}
          className="h-full bg-white"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
};

export default TeslaHeader;
