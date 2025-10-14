import React from 'react';
import { Lightbulb, Target, Users, Zap } from 'lucide-react';

const OurApproach = () => {
  

  return (
    <section className="bg-gray-900 py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Dark Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('/Think.png')",
          filter: "brightness(0.3) contrast(1.2)"
        }}
      ></div>
      
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6">
            My <span className="text-cyan-400">Approach</span>
          </h2>
          <p className="text-gray-200 text-xl lg:text-2xl max-w-3xl mx-auto">
            Driven by innovation, excellence, and an agile culture that transforms ideas into reality
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          
         
        </div>
      </div>
    </section>
  );
};

export default OurApproach;