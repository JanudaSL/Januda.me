import React from 'react';

export default function VegaInnovationsHeader() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-16">
        {/* Tagline */}
        <div className="text-center mb-16 max-w-4xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 leading-tight">
            "Powering An Extraordinary Future
          </h1>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-700 leading-tight mt-2">
            With Infinite Possibilities"
          </h2>
        </div>

        {/* Logo and Company Name */}
        <div className="flex flex-col items-center mb-16">
          {/* Company Logo */}
          <div className="mb-6 relative">
            <img 
              src="/jv.png" 
              alt="JANUDA Logo" 
              className="w-40 h-40 object-contain"
            />
          </div>

          {/* Company Name */}
          <div className="text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-600 tracking-widest mb-2">
              J  A  N  U  D  A
            </h3>
            <p className="text-sm md:text-base text-gray-500 tracking-[0.3em] font-light">
              INFINITE IMAGINATION
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-wrap items-center justify-center gap-8 md:gap-16 text-gray-600">
          <a 
            href="#" 
            className="text-lg md:text-xl font-light hover:text-gray-800 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-800 pb-1"
          >
            AXIONIX
          </a>
          <div className="w-px h-6 bg-gray-400"></div>
          <a 
            href="#" 
            className="text-lg md:text-xl font-light hover:text-gray-800 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-800 pb-1"
          >
            EcoGreen360
          </a>
          <div className="w-px h-6 bg-gray-400"></div>
          <a 
            href="#" 
            className="text-lg md:text-xl font-light hover:text-gray-800 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-800 pb-1"
          >
            CypherBots
          </a>
          <div className="w-px h-6 bg-gray-400"></div>
          <a 
            href="#" 
            className="text-lg md:text-xl font-light hover:text-gray-800 transition-colors duration-300 border-b-2 border-transparent hover:border-gray-800 pb-1"
          >
            Neura Studio
          </a>
        </nav>
      </div>

      {/* Decorative curved element */}
      <div className="absolute top-0 left-0 w-64 h-64 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 Q100,50 0,200 L0,0 Z"
            fill="currentColor"
            className="text-gray-300"
          />
        </svg>
      </div>
    </div>
  );
}