import React from 'react';

const AgilityLandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with custom image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer.png')" }}
      >
        {/* Stronger blue gradient overlay */}
        
      </div>
      
      {/* Alternative approach - if you want more blue, use this instead */}
      {/* 
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/footer.png')" }}
        ></div>
      </div>
      */}
      
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-20 h-20 border-2 border-white/30 rounded-full flex items-center justify-center">
        <div className="w-12 h-12 border border-white/40 rounded-full flex items-center justify-center">
          <div className="w-6 h-6 bg-white/20 rounded-full"></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 px-6 lg:px-12">
          <nav className="max-w-7xl mx-auto">
            {/* Add your navigation here if needed */}
          </nav>
        </header>
        
        {/* Hero Section */}
        <div className="flex-1 flex flex-col justify-center px-6 lg:px-12 py-20 pb-40">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl mx-auto text-center">
              {/* Main Headline */}
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-16 tracking-tight leading-tight">
                AGILITY IN THE FACE OF CHANGE
              </h1>
            </div>
          </div>
        </div>
        
        {/* Decorative wave elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <div className="absolute inset-0">
            <svg viewBox="0 0 1200 200" className="w-full h-full">
              <path 
                d="M0,100 C300,150 400,50 600,100 C800,150 900,50 1200,100 L1200,200 L0,200 Z" 
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Content Card - Positioned to overlap the blue background */}
      <div className="relative z-20 -mt-32 px-6 lg:px-12 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-2xl">
              {/* Description Paragraph */}
              <p className="text-gray-700 text-lg lg:text-xl leading-relaxed mb-12 font-light">
                Transforming ideas into impactful software is no small task. The world of technology, much like the foodservice industry, demands agility, problem-solving, and relentless innovation to create solutions that make a difference in people's lives. This philosophy shapes my identity as a software engineer and drives the way I approach every project.
              </p>
              
              {/* About Me Section */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold text-cyan-500 mb-8 tracking-tight">
                  My Story
                </h2>
                
                <p className="text-gray-700 text-lg leading-relaxed font-light mb-6">
                  I began my journey by experimenting, learning, and supporting others with their tech needs—building small applications, collaborating on projects, and enabling innovation. Over time, I discovered my passion lay not just in contributing, but in creating—designing products and solutions that solve real-world challenges. With this vision, I embraced my role as a builder and innovator, fully committing myself to software engineering.
                </p>
                
                <p className="text-gray-700 text-lg leading-relaxed font-light">
                  Along the way, I've learned to adapt quickly, overcome obstacles, and continuously evolve while keeping my curiosity and love for innovation alive. My journey is a reflection of a mindset: to fail fast, learn faster, and keep pushing boundaries in pursuit of meaningful impact.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Decorative wave elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
          <div className="absolute inset-0">
            <svg viewBox="0 0 1200 200" className="w-full h-full">
              <path 
                d="M0,100 C300,150 400,50 600,100 C800,150 900,50 1200,100 L1200,200 L0,200 Z" 
                fill="rgba(255,255,255,0.1)"
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Additional decorative elements */}
      <div className="absolute top-1/3 left-10 w-2 h-32 bg-white/20 rounded-full transform -rotate-12"></div>
      <div className="absolute bottom-1/3 right-20 w-1 h-24 bg-white/15 rounded-full transform rotate-45"></div>
      
      {/* Floating particles effect */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-2/3 left-3/4 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white/25 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default AgilityLandingPage;