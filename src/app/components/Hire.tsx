"use client"

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const TeamCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Updated slides data to match the team recruitment design
  const slides = [
    {
      id: 1,
      title: "Want to work together!",
      subtitle: "I'm available for Freelance Work.",
      buttonText: "Contact Me Via Fiverr ",
      bgImage: "/jk1.png"
    }
  ];

  // Preload images
  useEffect(() => {
    const loadImages = async () => {
      const loadPromises = slides.map((slide, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve();
          };
          img.onerror = () => {
            setImagesLoaded(prev => {
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

  // Auto-play functionality - only start after images are loaded
  useEffect(() => {
    if (imagesLoaded.some(loaded => loaded)) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);

      return () => clearInterval(timer);
    }
  }, [slides.length, imagesLoaded, slides]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Loading overlay */}
      {imagesLoaded.length === 0 && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-30">
          <div className="text-white text-xl">Loading...</div>
        </div>
      )}

      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image with darker overlay */}
            <div 
              className="relative w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${slide.bgImage})`
              }}
            >
                <br></br><br></br>
              {/* Content Overlay - Centered */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-6">
                <div className="max-w-5xl mx-auto">
                  {/* Main Title with yellow/green accent */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                    <span className="text-yellow-400">Want to work together!</span>
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-xl md:text-2xl lg:text-3xl mb-12 font-light opacity-90 max-w-3xl mx-auto">
                    {slide.subtitle}
                  </p>

                  {/* CTA Button */}
                  <button className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold text-lg tracking-widest hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
                    {slide.buttonText}
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 left-10 w-1 h-20 bg-yellow-400 hidden lg:block"></div>
              <div className="absolute bottom-1/4 right-10 w-1 h-20 bg-yellow-400 hidden lg:block"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if multiple slides */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-blur-sm rounded-full p-4 transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Slide Indicators - Only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-4">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 border-2 ${
                  index === currentSlide 
                    ? 'bg-yellow-400 border-yellow-400 scale-110' 
                    : 'bg-transparent border-white hover:border-yellow-400 hover:scale-105'
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      <button className="absolute top-6 right-6 md:hidden z-30 text-white hover:text-yellow-400 transition-colors">
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
          <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
          <div className="w-full h-0.5 bg-current transition-all duration-300"></div>
        </div>
      </button>

      {/* Progress Bar - Only show if multiple slides */}
      {slides.length > 1 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
          <div 
            className="h-full bg-yellow-400 transition-all duration-100 ease-linear"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`
            }}
          />
        </div>
      )}

      {/* Floating Social Proof */}
      
      
      
    </div>
  );
};

export default TeamCarousel;