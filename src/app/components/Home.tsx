import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, HelpCircle, Globe, User } from 'lucide-react';

const TeslaHeader = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Sample slides data
  const slides = [
    {
      id: 1,
      title: "Secure the $7,500 Federal Tax Credit",
      subtitle: "Limited Inventory – Take Delivery by September 30",
      primaryBtn: "Order Model 3",
      secondaryBtn: "Order Model Y",
      bgImage: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: 2,
      title: "Experience Full Self-Driving",
      subtitle: "Advanced Autopilot Features Available Now",
      primaryBtn: "Learn More",
      secondaryBtn: "Schedule Test Drive",
      bgImage: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    },
    {
      id: 3,
      title: "Supercharger Network",
      subtitle: "40,000+ Global Superchargers",
      primaryBtn: "Find Charging",
      secondaryBtn: "Plan a Trip",
      bgImage: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Navigation */}
      <nav className="absolute top-0 left-0 right-0 z-30 bg-transparent">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Tesla Logo */}
          <div className="text-white font-bold text-2xl tracking-wider">
            TESLA
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex space-x-8 text-white font-medium">
            <a href="#" className="hover:opacity-75 transition-opacity">Vehicles</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Energy</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Charging</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Discover</a>
            <a href="#" className="hover:opacity-75 transition-opacity">Shop</a>
          </div>

          {/* Right Navigation */}
          <div className="flex items-center space-x-4 text-white">
            <HelpCircle className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity" />
            <Globe className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity" />
            <User className="w-6 h-6 cursor-pointer hover:opacity-75 transition-opacity" />
          </div>
        </div>
      </nav>

      {/* Carousel Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Background Image */}
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${slide.bgImage})`
              }}
            >
              {/* Content Overlay */}
              <div className="flex flex-col items-center justify-center h-full text-white text-center px-6">
                <div className="max-w-4xl mx-auto">
                  {/* Main Title */}
                  <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
                    {slide.title}
                  </h1>
                  
                  {/* Subtitle */}
                  <p className="text-lg md:text-xl lg:text-2xl mb-8 font-medium opacity-90">
                    {slide.subtitle}
                  </p>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 min-w-[180px]">
                      {slide.primaryBtn}
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-md transition-colors duration-300 min-w-[180px]">
                      {slide.secondaryBtn}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-3 transition-all duration-300"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-white' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button className="absolute top-6 right-6 md:hidden z-30 text-white">
        <div className="w-6 h-6 flex flex-col justify-center space-y-1">
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
          <div className="w-full h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white bg-opacity-20 z-20">
        <div 
          className="h-full bg-white transition-all duration-100 ease-linear"
          style={{
            width: `${((currentSlide + 1) / slides.length) * 100}%`
          }}
        />
      </div>
    </div>
  );
};

export default TeslaHeader;