import React from 'react';

const IBMProductsHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - 3D Voxel Grid */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/Pub.jpg')`,
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
              Blogs
            </h1>
            
            {/* Description */}
            <p className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-lg">
             Explore my collection of insightful blogs tailored to inspire, inform, and match your interests.
            </p>
            
           
          </div>
        </div>
      </div>
      
      {/* Bottom Right Accent (Optional IBM Style Element) */}
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-600 rounded-full opacity-60" />
    </section>
  );
};

export default IBMProductsHero;