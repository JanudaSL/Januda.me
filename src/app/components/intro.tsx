import { Instagram, Facebook, Linkedin } from 'lucide-react';

export default function ProfileHeroSection() {
  return (
    <div className="bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left side - Text content */}
        <div className="flex-1 max-w-3xl">
          <p className="text-gray-700 text-lg lg:text-xl leading-relaxed">
            I am driven by <span className="font-bold text-gray-900">new technologies</span>, Inspiring people and Motivating teams as a leader to achieve goals. I believe that, If we can{' '}
            <span className="font-bold text-gray-900">change the way we see the world</span>, we can{' '}
            <span className="font-bold text-gray-900">change the world we see</span>.
          </p>
          
          {/* Social Media Links */}
          <div className="mt-8">
            <div className="flex items-center gap-6">
              <span className="text-gray-600 font-medium">Follow Me on</span>
              <div className="h-px bg-gray-300 flex-1 max-w-20"></div>
              
              <div className="flex gap-3">
                <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                  <Instagram className="w-5 h-5 text-gray-700" />
                </button>
                <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                  <Facebook className="w-5 h-5 text-blue-600" />
                </button>
                <button className="p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200">
                  <Linkedin className="w-5 h-5 text-blue-700" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Experience badge */}
        <div className="flex-shrink-0">
          <div className="bg-gradient-to-br from-purple-600 to-purple-800 text-white p-8 rounded-2xl shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300">
            <div className="text-center">
              <div className="text-5xl font-bold mb-2">1</div>
              <div className="text-sm font-medium uppercase tracking-wide">
                YEARS OF<br />EXPERIENCE
              </div>
              <div className="mt-4 w-8 h-8 mx-auto">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-80">
                  <path d="M12 2L13.09 8.26L19 7L14.74 12L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12L5 7L10.91 8.26L12 2Z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}