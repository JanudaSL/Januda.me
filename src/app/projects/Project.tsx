import Image from 'next/image';

export default function JanudaProjectsHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Project.jpg"
          alt="Januda Projects Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Split-Screen Gradient Overlay */}
      <div className="absolute inset-0 z-10">
        {/* Left Half - White Gradient for Text Readability */}
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/90 to-white/20 md:to-transparent"></div>
        {/* Additional overlay for better text contrast on mobile */}
        <div className="absolute inset-0 bg-white/10 md:bg-transparent"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-20 w-full h-full">
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          
         {/* Left Side - Text Content */}
<div className="flex flex-col justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
  {/* Main Heading - Top-Left Corner */}
  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight">
    Projects
  </h1>

  {/* Description - Below heading, left-aligned */}
  <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-md lg:max-w-lg mt-48">
    Discover a range of innovative software projects designed to solve real-world challenges with precision
  </p>

  {/* Call to Action Button - Optional */}
  <div className="pt-4">
    {/* Example Button */}
    {/* <button className="px-6 py-3 bg-cyan-500 text-white rounded-xl shadow hover:bg-cyan-600 transition">
      Explore Projects
    </button> */}
  </div>
</div>

          
          {/* Right Side - Clear Background Image Area */}
          <div className="hidden md:block h-full">
            {/* This space intentionally left for background image to show through */}
            {/* Optional floating elements */}
            <div className="relative h-full min-h-screen">
              <div className="absolute top-16 right-8 xl:right-12">
                
              </div>
              
              <div className="absolute bottom-24 right-16 xl:right-20">
                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}