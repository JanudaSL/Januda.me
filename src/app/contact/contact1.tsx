import React from 'react';
import { ExternalLink } from 'lucide-react';

const IBMContactInfo = () => {
  return (
    <section className="bg-gray-100 py-16 px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Corporate Address */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              {/* Building Icon */}
              <div className="w-16 h-16 flex items-center justify-center">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-gray-700"
                >
                  {/* Building outline */}
                  <rect x="16" y="12" width="32" height="40" />
                  <rect x="20" y="52" width="8" height="8" />
                  {/* Windows grid */}
                  <line x1="22" y1="18" x2="22" y2="18" strokeWidth="2" />
                  <line x1="26" y1="18" x2="26" y2="18" strokeWidth="2" />
                  <line x1="30" y1="18" x2="30" y2="18" strokeWidth="2" />
                  <line x1="34" y1="18" x2="34" y2="18" strokeWidth="2" />
                  <line x1="38" y1="18" x2="38" y2="18" strokeWidth="2" />
                  <line x1="42" y1="18" x2="42" y2="18" strokeWidth="2" />
                  
                  <line x1="22" y1="24" x2="22" y2="24" strokeWidth="2" />
                  <line x1="26" y1="24" x2="26" y2="24" strokeWidth="2" />
                  <line x1="30" y1="24" x2="30" y2="24" strokeWidth="2" />
                  <line x1="34" y1="24" x2="34" y2="24" strokeWidth="2" />
                  <line x1="38" y1="24" x2="38" y2="24" strokeWidth="2" />
                  <line x1="42" y1="24" x2="42" y2="24" strokeWidth="2" />
                  
                  <line x1="22" y1="30" x2="22" y2="30" strokeWidth="2" />
                  <line x1="26" y1="30" x2="26" y2="30" strokeWidth="2" />
                  <line x1="30" y1="30" x2="30" y2="30" strokeWidth="2" />
                  <line x1="34" y1="30" x2="34" y2="30" strokeWidth="2" />
                  <line x1="38" y1="30" x2="38" y2="30" strokeWidth="2" />
                  <line x1="42" y1="30" x2="42" y2="30" strokeWidth="2" />
                  
                  <line x1="22" y1="36" x2="22" y2="36" strokeWidth="2" />
                  <line x1="26" y1="36" x2="26" y2="36" strokeWidth="2" />
                  <line x1="30" y1="36" x2="30" y2="36" strokeWidth="2" />
                  <line x1="34" y1="36" x2="34" y2="36" strokeWidth="2" />
                  <line x1="38" y1="36" x2="38" y2="36" strokeWidth="2" />
                  <line x1="42" y1="36" x2="42" y2="36" strokeWidth="2" />
                  
                  <line x1="22" y1="42" x2="22" y2="42" strokeWidth="2" />
                  <line x1="26" y1="42" x2="26" y2="42" strokeWidth="2" />
                  <line x1="30" y1="42" x2="30" y2="42" strokeWidth="2" />
                  <line x1="34" y1="42" x2="34" y2="42" strokeWidth="2" />
                  <line x1="38" y1="42" x2="38" y2="42" strokeWidth="2" />
                  <line x1="42" y1="42" x2="42" y2="42" strokeWidth="2" />
                  {/* Top line */}
                  <line x1="16" y1="8" x2="48" y2="8" strokeWidth="2" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-4">Corporate address</h3>
                <div className="text-gray-700 space-y-1">
                  <p>36/3,Januda</p>
                  <p>Hakmana Road</p>
                  <p>Beliatta 82400</p>
                  <p>Hambantota District</p>
                  <p>Southern Province</p>
                  <p>SriLanka</p>
                </div>
              </div>
            </div>
          </div>

          {/* Phone Numbers */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              {/* Phone Icon */}
              <div className="w-16 h-16 flex items-center justify-center">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-gray-700"
                >
                  {/* Phone base */}
                  <rect x="20" y="16" width="24" height="32" rx="2" />
                  {/* Screen */}
                  <rect x="24" y="22" width="16" height="16" />
                  {/* Speaker */}
                  <line x1="28" y1="18" x2="36" y2="18" strokeWidth="2" strokeLinecap="round" />
                  {/* Home button */}
                  <circle cx="32" cy="44" r="2" />
                </svg>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-medium text-gray-900">Phone numbers</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-gray-900 font-medium">General:</p>
                    <p className="text-gray-700">Toll Free: +9477 300 7426</p>
                  </div>
                  
                  <div>
                    <p className="text-gray-900 font-medium">Mobile:</p>
                    <p className="text-gray-700">Toll Free: +9470 225 1237</p>
                  </div>
                  
                 
                 
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-6">
            <div className="flex flex-col items-start space-y-4">
              {/* Social Icon */}
              <div className="w-16 h-16 flex items-center justify-center">
                <svg 
                  width="64" 
                  height="64" 
                  viewBox="0 0 64 64" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="1.5"
                  className="text-gray-700"
                >
                  {/* Honey dipper handle */}
                  <path d="m32 12 8 8-8 8" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Honey dipper spiral */}
                  <circle cx="32" cy="36" r="8" />
                  <circle cx="32" cy="36" r="5" />
                  <circle cx="32" cy="36" r="2" />
                  {/* Drops */}
                  <circle cx="46" cy="18" r="2" fill="currentColor" />
                  <circle cx="50" cy="24" r="1.5" fill="currentColor" />
                  <circle cx="44" cy="26" r="1" fill="currentColor" />
                </svg>
              </div>
              
              <div>
                <h3 className="text-xl font-medium text-gray-900 mb-6">Follow IBM</h3>
                <div className="space-y-3">
                  <a 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>LinkedIn</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>X</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                  
                  <a 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Instagram</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Facebook</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>

                  <a 
                    href="#" 
                    className="flex items-center text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    <span>Medium</span>
                    <ExternalLink size={16} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default IBMContactInfo;