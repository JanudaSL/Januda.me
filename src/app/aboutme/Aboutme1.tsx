import React from 'react';

const OurDNA = () => {
  return (
    <section className="bg-gray-50 py-20 px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <h2 className="text-5xl lg:text-6xl font-bold text-cyan-500 tracking-tight">
              My DNA
            </h2>
            
            <p className="text-gray-600 text-xl lg:text-2xl leading-relaxed font-light">
             I am shaped by my values, the drive for innovation and excellence, and an Agile culture
            </p>
            
           
          </div>
          
          {/* Right Image Section */}
          <div className="relative">
            {/* Background Image */}
            <div 
              className="w-full h-96 lg:h-[500px] bg-cover bg-center bg-no-repeat rounded-2xl relative overflow-hidden"
              style={{ backgroundImage: "url('/image2.png')" }}
            >
              {/* Light overlay for better contrast */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
              
              {/* Decorative 3D Elements */}
              <div className="absolute inset-0">
                {/* Blue Cross */}
                <div className="absolute top-16 right-12 w-16 h-16">
                  <div className="w-full h-2 bg-cyan-400 absolute top-1/2 transform -translate-y-1/2 rounded-full shadow-lg"></div>
                  <div className="h-full w-2 bg-cyan-400 absolute left-1/2 transform -translate-x-1/2 rounded-full shadow-lg"></div>
                </div>
                
                {/* Diamond shapes */}
                <div className="absolute top-8 right-24 w-8 h-8 bg-gray-300 rotate-45 rounded shadow-md"></div>
                <div className="absolute bottom-24 right-8 w-10 h-10 bg-gray-400 rotate-45 rounded-lg shadow-lg"></div>
                
                {/* Blue geometric shapes */}
                <div className="absolute top-1/3 right-16 w-12 h-12 bg-cyan-400 rounded shadow-lg transform rotate-12"></div>
                <div className="absolute bottom-16 right-20 w-6 h-16 bg-cyan-500 rounded-full shadow-md"></div>
                
                {/* Circular elements */}
                <div className="absolute top-24 right-6 w-14 h-14 bg-cyan-300 rounded-full shadow-lg"></div>
                <div className="absolute bottom-32 right-32 w-8 h-8 bg-gray-500 rounded-full shadow-md"></div>
                
                {/* 3D Cylinder */}
                <div className="absolute top-1/2 right-10 w-4 h-20 bg-gray-600 rounded-full shadow-xl transform -translate-y-1/2"></div>
                
                {/* Star/Spiky shape */}
                <div className="absolute bottom-8 right-12">
                  <div className="w-12 h-12 relative">
                    <div className="absolute inset-0 bg-cyan-400 transform rotate-45 rounded shadow-lg"></div>
                    <div className="absolute inset-0 bg-cyan-500 transform rotate-90 rounded shadow-lg"></div>
                  </div>
                </div>
                
                {/* Additional small elements */}
                <div className="absolute top-32 right-32 w-6 h-6 bg-blue-400 rounded shadow-md transform rotate-45"></div>
                <div className="absolute top-48 right-6 w-8 h-4 bg-cyan-400 rounded-full shadow-md"></div>
              </div>
              
              {/* Red accent dot */}
              <div className="absolute top-1/3 left-8 w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurDNA;