import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function JanudaProjectsCards() {
  const projects = [
    {
      title: "Enterprise Learning Management System",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "A comprehensive LMS built with Next.js and Node.js, featuring real-time collaboration, advanced analytics, and scalable architecture. Supports 10,000+ concurrent users with optimized performance.",
      badge: "Full-Stack",
      technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis"],
      link: "#"
    },
    {
      title: "Smart Home IoT Platform",
      titleUnderline: false,
      category: "IoT & Embedded Systems",
      description: "Real-time IoT monitoring platform connecting 50+ sensor types with cloud integration. Features automated alerts, predictive maintenance, and mobile control interface.",
      badge: "IoT Solution",
      technologies: ["React", "Firebase", "Arduino", "MQTT"],
      link: "#"
    },
    {
      title: "AI-Powered Task Automation",
      titleUnderline: false,
      category: "Cloud & Backend Systems",
      description: "Intelligent workflow automation platform using machine learning for task optimization. Deployed on AWS with microservices architecture and 99.9% uptime.",
      badge: "Cloud Native",
      technologies: ["Python", "AWS", "Docker", "TensorFlow"],
      link: "#"
    }
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 hover:border-gray-300 rounded-none p-8 hover:shadow-lg transition-all duration-300 ease-in-out min-h-[500px] flex flex-col"
            >
              {/* Category Badge */}
              <div className="mb-4">
                <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                  {project.category}
                </span>
              </div>

              {/* Title */}
              <h3 className={`text-2xl lg:text-3xl font-normal text-gray-900 mb-6 leading-tight ${
                project.titleUnderline ? 'border-b-2 border-blue-600 pb-2' : ''
              }`}>
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                {project.description}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Badge */}
              <div className="mb-8">
                <span className="inline-block bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {project.badge}
                </span>
              </div>

              {/* Arrow Link */}
              <div className="mt-auto">
                <a 
                  href={project.link}
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
                  aria-label={`Learn more about ${project.title}`}
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced bottom section with category showcase */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl lg:text-4xl font-normal text-gray-900 mb-6">
            Comprehensive Technical Expertise
          </h2>
          <p className="text-gray-700 text-lg max-w-3xl mx-auto mb-12">
            From full-stack web applications to IoT systems and cloud infrastructure, explore innovative solutions built with modern technologies and best practices.
          </p>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12 max-w-4xl mx-auto">
            {[
              "Full-Stack Web Development",
              "Frontend Development / UI Design", 
              "Mobile Applications",
              "IoT & Embedded Systems",
              "Cloud & Backend Systems",
              "Automation & Tools"
            ].map((category, index) => (
              <div 
                key={index}
                className="bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 p-4 rounded-lg transition-all duration-200 group cursor-pointer"
              >
                <p className="text-sm font-medium text-gray-700 group-hover:text-blue-700 text-center">
                  {category}
                </p>
              </div>
            ))}
          </div>

          <button className="inline-flex items-center px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200">
            <span>View Complete Portfolio</span>
            <ArrowRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
}