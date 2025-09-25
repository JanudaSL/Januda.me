"use client";
import React, { useState, useEffect } from 'react';


export default function AboutJanuda() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('/cvr.png')"
      }}
    >
      {/* Mobile-optimized overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
      
      <div className={`relative z-10 min-h-screen px-3 sm:px-4 py-6 sm:py-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Header Section - Top Left */}
          <div className="mb-8 sm:mb-12">
            <div className="space-y-4 sm:space-y-6 text-left">
              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  About{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-300">
                    Januda J
                  </span>
                </h1>
                <div className="w-16 sm:w-20 md:w-24 h-1 sm:h-1.5 bg-gradient-to-r from-lime-400 to-emerald-400 rounded-full"></div>
              </div>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-200 font-light leading-relaxed max-w-2xl">
                Software Engineer | Student at University Of Colombo | Lifelong learner
              </p>
            </div>
          </div>

          {/* Profile Image - Right Side Up */}
          <div className="flex justify-center sm:justify-end mb-12 sm:mb-16">
            <div className="relative">
              <div className="w-40 sm:w-44 md:w-48 h-40 sm:h-44 md:h-48 relative">
                {/* Enhanced Animated border rings - Moving Right Side Up */}
                <div className="absolute inset-0 border-2 border-lime-400/40 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-1 sm:inset-2 border border-emerald-400/30 rounded-full animate-spin-reverse delay-75"></div>
                <div className="absolute inset-3 sm:inset-4 border border-lime-300/20 rounded-full animate-pulse delay-150"></div>
                
                {/* Orbiting Elements */}
                <div className="absolute -top-2 right-1/4 w-3 h-3 bg-lime-400/60 rounded-full animate-orbit"></div>
                <div className="absolute top-1/4 -right-2 w-2 h-2 bg-emerald-400/80 rounded-full animate-orbit-reverse"></div>
                <div className="absolute -top-1 right-1/3 w-1.5 h-1.5 bg-lime-300/70 rounded-full animate-bounce"></div>
              </div>
            </div>
          </div>

          {/* Vision Section - Right Side Bottom */}
          <div className="flex justify-center sm:justify-end">
            <div className="relative max-w-sm sm:max-w-md w-full sm:w-auto">
              <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-lime-400/20 to-emerald-400/20 rounded-lg sm:rounded-xl blur-sm"></div>
              <div className="relative bg-white/8 backdrop-blur-xl rounded-lg sm:rounded-xl p-4 sm:p-5 border border-white/10 shadow-2xl">
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></div>
                  <h2 className="text-base sm:text-lg font-bold text-lime-400">My Vision</h2>
                </div>
                <p className="text-gray-200 leading-relaxed text-xs sm:text-sm font-light text-left">
                  I want to inspire student communities as much as possible with all my skills and capabilities. 
                  I dream of seeing a purpose-driven student community globally instead of everyone going with the flow. 
                  Because I believe that, <span className="text-lime-300 font-medium italic">&ldquo;If we can change the way we see the world, we can change the world we see.&rdquo;</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile-optimized decorative elements */}
      <div className="absolute top-6 sm:top-8 right-3 sm:right-4 w-8 sm:w-12 h-8 sm:h-12 border-2 border-lime-400/20 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-12 sm:top-16 right-6 sm:right-8 w-1 h-1 bg-lime-400/60 rounded-full animate-ping"></div>
      
      <div className="absolute bottom-12 sm:bottom-16 left-3 sm:left-4 w-6 sm:w-8 h-6 sm:h-8 border border-emerald-400/20 rounded-full opacity-30"></div>
      <div className="absolute bottom-6 sm:bottom-8 left-4 sm:left-6 w-0.5 h-6 sm:h-8 bg-gradient-to-t from-lime-400/50 to-emerald-400/20 rounded-full"></div>
      
      {/* Floating particles - Enhanced for mobile */}
      <div className="absolute top-1/3 left-1 sm:left-2 w-0.5 h-8 sm:h-12 bg-gradient-to-b from-lime-400/40 to-transparent rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-1 h-1 border border-lime-400/30 rotate-45 opacity-50"></div>
      
      {/* Accent elements */}
      <div className="absolute top-1/2 left-1/3 w-0.5 h-0.5 bg-lime-400/80 rounded-full animate-ping"></div>
      <div className="absolute top-2/3 right-1/3 w-1 h-1 border border-emerald-400/40 rounded-full opacity-60 animate-pulse"></div>
      
      {/* Enhanced Mobile-specific corner accents */}
      <div className="absolute top-3 sm:top-4 left-3 sm:left-4 w-4 sm:w-6 h-4 sm:h-6 border-l-2 border-t-2 border-lime-400/30 opacity-50"></div>
      <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-4 sm:w-6 h-4 sm:h-6 border-r-2 border-b-2 border-emerald-400/30 opacity-50"></div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes orbit {
          0% { transform: rotate(0deg) translateX(60px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(60px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          0% { transform: rotate(360deg) translateX(50px) rotate(-360deg); }
          100% { transform: rotate(0deg) translateX(50px) rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .animate-orbit {
          animation: orbit 12s linear infinite;
        }
        .animate-orbit-reverse {
          animation: orbit-reverse 8s linear infinite;
        }
        @media (max-width: 640px) {
          @keyframes orbit {
            0% { transform: rotate(0deg) translateX(45px) rotate(0deg); }
            100% { transform: rotate(360deg) translateX(45px) rotate(-360deg); }
          }
          @keyframes orbit-reverse {
            0% { transform: rotate(360deg) translateX(40px) rotate(-360deg); }
            100% { transform: rotate(0deg) translateX(40px) rotate(0deg); }
          }
        }
      `}</style>
    </div>
  );
}