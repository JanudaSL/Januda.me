import React from 'react';
import { Calendar, Code, Users, Building, ArrowRight } from 'lucide-react';

const ExperienceTimeline = () => {
  const experiences = [
    {
      id: 1,
      period: "2023 - Present",
      title: "Intern Software Engineer",
      company: "Company",
      description: "During my tenure at the company, I gained valuable experience and contributed to various projects, enhancing my expertise in software development and problem-solving.",
      icon: <Code className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
      glowColor: "shadow-blue-100",
      category: "Professional"
    },
    {
      id: 2,
      period: "2023 - Present", 
      title: "Slasscom Member",
      company: "SLASSCOM",
      description: "Active member of Sri Lanka Association of Software and Service Companies, contributing to the local tech ecosystem.",
      icon: <Building className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-gradient-to-r from-green-500 to-emerald-600",
      borderColor: "border-green-200",
      glowColor: "shadow-green-100",
      category: "Professional"
    },
    {
      id: 3,
      period: "2024 - Present",
      title: "Community Member",
      company: "Generation ALPHA",
      description: "Engaged community member contributing to Generation ALPHA initiatives and programs.",
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      color: "bg-gradient-to-r from-purple-500 to-indigo-600",
      borderColor: "border-purple-200",
      glowColor: "shadow-purple-100",
      category: "Community"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-8 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-24">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full blur-lg opacity-20"></div>
            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-full shadow-xl border-2 border-gray-100 mb-6">
              <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Professional Journey
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Exploring innovation through technology and community engagement
          </p>
        </div>

        {/* Timeline - Centered Design */}
        <div className="relative max-w-4xl mx-auto">
          {/* Central Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-px top-0 bottom-0 w-1 bg-gradient-to-b from-blue-300 via-green-300 to-purple-300 opacity-60"></div>
          
          {/* Timeline items - Alternating positions */}
          <div className="space-y-16 sm:space-y-24">
            {experiences.map((experience, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={experience.id} className="relative">
                  {/* Central Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-20">
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 ${experience.color} rounded-full border-4 border-white shadow-xl flex items-center justify-center`}>
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Content Card - Alternating sides */}
                  <div className={`w-full sm:w-5/12 ${isLeft ? 'sm:mr-auto' : 'sm:ml-auto'} ${!isLeft ? 'sm:text-right' : ''}`}>
                    {/* Period Badge */}
                    <div className={`inline-flex items-center mb-4 ${!isLeft && 'sm:flex-row-reverse'}`}>
                      <span className="bg-white text-gray-700 px-4 py-2 rounded-full text-sm font-semibold border border-gray-200 shadow-sm">
                        {experience.period}
                      </span>
                      <ArrowRight className={`w-4 h-4 text-gray-400 mx-3 ${!isLeft && 'sm:rotate-180'}`} />
                    </div>
                    
                    {/* Main Card */}
                    <div className={`group relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${experience.borderColor} overflow-hidden`}>
                      {/* Gradient accent */}
                      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} w-1 h-full ${experience.color}`}></div>
                      
                      <div className="p-6 sm:p-8">
                        {/* Icon and Header */}
                        <div className={`flex items-start gap-4 mb-6 ${!isLeft && 'sm:flex-row-reverse sm:text-right'}`}>
                          <div className={`${experience.color} p-3 rounded-xl text-white shadow-lg ${experience.glowColor} flex-shrink-0`}>
                            {experience.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className={`flex items-center gap-3 mb-2 ${!isLeft && 'sm:justify-end'}`}>
                              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                {experience.title}
                              </h3>
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                experience.category === 'Professional' 
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                                  : 'bg-purple-50 text-purple-700 border border-purple-200'
                              }`}>
                                {experience.category}
                              </span>
                            </div>
                            <p className="text-lg font-semibold text-gray-600 mb-1">
                              {experience.company}
                            </p>
                          </div>
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 leading-relaxed text-base mb-6">
                          {experience.description}
                        </p>
                        
                        {/* Skills for main role */}
                        {experience.id === 1 && (
                          <div className={`pt-6 border-t border-gray-100 ${!isLeft && 'sm:text-right'}`}>
                            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
                              Key Expertise
                            </h4>
                            <div className={`flex flex-wrap gap-2 ${!isLeft && 'sm:justify-end'}`}>
                              {['Software Development', 'Problem Solving', 'Project Contribution'].map((skill) => (
                                <span key={skill} className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-800 font-medium border border-gray-200 hover:border-gray-300 transition-colors">
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Hover effect overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-transparent to-blue-50 opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-20 sm:mt-32">
          <div className="inline-block bg-white rounded-2xl shadow-lg px-8 py-6 border border-gray-100">
            <p className="text-gray-700 font-medium text-lg mb-2">
              🚀 Always Learning, Always Growing
            </p>
            <p className="text-gray-500 text-sm">
              Ready for new challenges and opportunities
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;