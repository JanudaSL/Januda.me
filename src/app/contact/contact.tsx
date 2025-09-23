import React from 'react';

const IBMProductsHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - 3D Voxel Grid */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/cont1.jpg')`,
        }}
      />
      
      {/* Gradient Overlay - Left Side Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />
      
      {/* Content Container */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              Contact Me
            </h1>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-lg">
              Explore our wide range of quality products tailored to meet your every need
            </p>
            
            {/* Optional CTA Button */}
            <div className="mt-12">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-none font-medium transition-colors duration-200 text-lg">
                Explore Products
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Right Accent (Optional IBM Style Element) */}
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-600 rounded-full opacity-60" />
    </section>
  );
};

export default IBMProductsHero;