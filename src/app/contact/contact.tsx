import React from 'react';

const IBMContactHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cont1.jpg')`,
        }}
      />
      
      {/* Dark Gradient Overlay - Left Side */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight">
              Contact Januda
            </h1>
         
            {/* Description */}
            <p className="text-lg lg:text-xl text-white/90 leading-relaxed font-light max-w-lg mb-12">
             Find solutions to your questions about projects, development, support, and everything I create.
            </p>
            
            {/* CTA Button - IBM Style */}
            
            
          </div>
        </div>
      </div>
      
      {/* IBM Brand Accent */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
        <div className="w-3 h-3 bg-blue-500 transform rotate-45 opacity-80"></div>
        <div className="w-3 h-3 bg-blue-400 transform rotate-45 opacity-60"></div>
      </div>
      
      {/* Optional: Subtle grid pattern overlay for tech feel */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}
      />
    </section>
  );
};

export default IBMContactHero;