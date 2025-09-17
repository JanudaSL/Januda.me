"use client";

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const TestimonialsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Naleen Wijethunga",
      role: "Research Assistant at the Department of Agriculture",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 4,
      text: "By introducing AI-based innovations, AiGROW helps overcome labor shortages while increasing youth engagement in farming. Their technologies make agriculture more appealing and accessible to a new generation of farmers, fostering long-term sustainability in the sector."
    },
    {
      id: 2,
      name: "Buddhika Jeewantha",
      role: "From Polhena Estate",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "These systems conserve water and energy while offering climate sensors to monitor environmental changes. iGROW has revolutionized agriculture by enabling smarter, more efficient farming practices."
    },
    {
      id: 3,
      name: "Samantha Silva",
      role: "Tea Plantation Owner",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 5,
      text: "AiGROW's smart irrigation system has increased our tea yield by 35% while reducing water consumption. The AI predictions help us make better decisions about harvesting and pest control."
    },
    {
      id: 4,
      name: "Priya Mendis",
      role: "Organic Farm Consultant",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face&auto=format",
      rating: 4,
      text: "The environmental monitoring features are exceptional. We can track soil health, weather patterns, and crop growth in real-time. It's transformed how we approach sustainable farming."
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Linked list circular navigation
      const nextIndex = prevIndex + 1;
      return nextIndex >= testimonials.length - 1 ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      // Linked list circular navigation
      const prevIdx = prevIndex - 1;
      return prevIdx < 0 ? testimonials.length - 2 : prevIdx;
    });
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 4000); // Change every 4 seconds

      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
          
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Section */}
            <div className="lg:w-1/3 flex flex-col justify-center">
              <p className="text-orange-500 font-semibold text-lg mb-4 tracking-wide">
                Our Testimonials
              </p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-8">
                What They're
                <br />
                Talking About
                <br />
                <span className="text-green-600">Januda </span>
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Authentic stories and endorsements from satisfied clients.
              </p>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg w-fit">
                About Us
              </button>
            </div>

            {/* Right Section - Testimonials */}
            <div className="lg:w-2/3 relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <div className="flex gap-6 overflow-hidden">
                {testimonials.slice(currentIndex, currentIndex + 2).map((testimonial, index) => (
                  <div
                    key={testimonial.id}
                    className="flex-1 bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-green-200 mr-4 transition-transform duration-300 hover:scale-110">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-xl text-gray-900">
                          {testimonial.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows */}
              <div className="flex justify-center mt-8 gap-4">
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-green-500 text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 rounded-full bg-gray-200 hover:bg-green-500 text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
              
              {/* Pagination Dots */}
              <div className="flex justify-center mt-6 gap-2">
                {Array.from({ length: testimonials.length - 1 }, (_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-500 transform hover:scale-125 ${
                      currentIndex === index
                        ? 'bg-green-500 scale-125 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsCarousel;