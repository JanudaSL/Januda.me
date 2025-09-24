import React from 'react';
import { ArrowRight } from 'lucide-react';

const IBMSupportSection = () => {
  const supportCards = [
    {
      title: "Technical Consultation",
      description: "Get expert advice on architecture, technology stack, and best practices for your projects.",
      href: "#"
    },
    {
      title: "Code Review & Documentation",
      description: "Professional code review services and comprehensive technical documentation.",
      href: "#"
    },
    {
      title: "Bug Fixes & Updates",
      description: "Fast and reliable bug fixes, performance optimization, and software updates for your applications.",
      href: "#"
    }
  ];

  return (
    <section className="bg-white py-16 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-4xl lg:text-5xl font-light text-gray-900 tracking-tight">
            Services
          </h2>
        </div>

        {/* Support Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCards.map((card, index) => (
            <a
              key={index}
              href={card.href}
              className="group block bg-gray-50 hover:bg-gray-100 transition-colors duration-200 p-8 h-full"
            >
              <div className="flex flex-col h-full">
                {/* Card Title */}
                <h3 className="text-xl font-medium text-gray-900 mb-6">
                  {card.title}
                </h3>
                
                {/* Card Description */}
                <p className="text-gray-700 leading-relaxed mb-8 flex-grow">
                  {card.description}
                </p>
                
                {/* Arrow Icon */}
                <div className="flex justify-start">
                  <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                    <ArrowRight 
                      size={24} 
                      className="transform group-hover:translate-x-1 transition-transform duration-200"
                    />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IBMSupportSection;