'use client';

import Image from 'next/image';

export default function AboutJanuda() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute top-0 right-0 w-72 h-72 sm:w-96 sm:h-96 lg:w-[32rem] lg:h-[32rem] bg-gradient-to-br from-blue-200 to-purple-200 rounded-full blur-3xl opacity-20 -z-10 animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-56 h-56 sm:w-80 sm:h-80 lg:w-96 lg:h-96 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20 -z-10 animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-80 sm:h-80 bg-blue-100 rounded-full blur-3xl opacity-10 -z-10"></div>
      
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-16 xl:gap-20 items-center">
          
          {/* Image Section - Enhanced */}
          <div className="relative w-full order-1 lg:order-1">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Decorative elements with improved sizing */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 lg:-top-6 lg:-left-6 w-32 h-32 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400 to-blue-200 rounded-3xl -z-10 opacity-60 transform rotate-6 blur-sm"></div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 lg:-bottom-6 lg:-right-6 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 lg:w-72 lg:h-72 bg-gradient-to-tl from-purple-400 to-blue-200 rounded-3xl -z-10 opacity-60 transform -rotate-6 blur-sm"></div>
              
              {/* Main image container with improved aspect ratios */}
              <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl ring-1 ring-gray-200/50 aspect-[3/4] sm:aspect-[4/5] lg:aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-50 group">
                <Image
                  src="/bal1.jpg"
                  alt="Januda - Software Engineer"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  priority
                  sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 45vw"
                />
                {/* Overlay gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating badge - improved positioning */}
              
            </div>
          </div>

          {/* Content Section - Enhanced */}
          <div className="space-y-5 sm:space-y-6 lg:space-y-8 order-2 lg:order-2">
            
            {/* Header with improved spacing */}
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2">
                <span className="text-blue-600 font-bold text-xs sm:text-sm uppercase tracking-wider bg-gradient-to-r from-blue-50 to-purple-50 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full border border-blue-200 shadow-sm">
                  💻 Software Engineer
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.1] tracking-tight">
                About{' '}
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent animate-gradient">
                  Januda
                </span>
              </h2>
              
              <div className="flex items-center gap-2">
                <div className="w-20 sm:w-24 md:w-28 h-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
              </div>
            </div>

            {/* Description with better typography */}
            <div className="space-y-4 sm:space-y-5">
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Januda is a <span className="font-bold text-gray-900 bg-yellow-50 px-2 py-0.5 rounded">passionate and aspiring software engineer</span> dedicated to building innovative and impactful digital solutions. With a strong foundation in full-stack development, cloud technologies, and IoT systems, he focuses on creating applications that blend functionality with user-friendly design.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                His portfolio spans <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">web applications, mobile apps, and IoT integrations</span> that address real-world challenges across education, safety, and automation.
              </p>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                Alongside his technical expertise, Januda brings commitment, adaptability, and a drive for continuous learning. Having completed industry-recognized certifications and practical projects, he is prepared to contribute meaningfully to modern software teams.
              </p>
            </div>

            {/* Stats Grid - NEW */}
            

            {/* CTA Button - NEW */}
            <div className="pt-2 sm:pt-4">
              
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </section>
  );
}