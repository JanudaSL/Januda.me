"use client";

import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function JanudaProjectsCards() {
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiSuccess, setApiSuccess] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage, setProjectsPerPage] = useState(6);

  // Development flag - set to false to skip API call during development
  const ENABLE_API_FETCH = true;

  // Hardcoded fallback data
  const fallbackProjects = [
    {
      title: "Smart Greenhouse Management System",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "EcoGreen360 is a Smart Greenhouse Management System that Bridges the gap between the real greenhouse and its 3D digital twin.Physical sensors in the greenhouse (temperature, humidity, soil moisture, air quality) send data to an ESP32 microcontroller, which communicates with the Ballerina Backend. The backend processes this data and powers two main features.",
      badge: "Full-Stack",
      technologies: ["React.js", "Ballerina", "PostgreSQL", "MySql", "AWS S3", "Amzon DynoDB","MongoDB"],
      link: "https://axionixlab.vercel.app/"
    },
    {
      title: "Sentiment Analysis Natural Language Processing",
      titleUnderline: true,
      category: "AI/ML",
      description: "A machine learning and NLP-based project that classifies text into positive, negative, or neutral sentiments. It includes data preprocessing, model building (Logistic Regression, Naive Bayes, Decision Tree, Random Forest, SVM), evaluation using accuracy and F1 score, and deployment as a web application on Azure.",
      badge: "AI/ML",
      technologies: ["Python", "NLP libraries: NLTK / SpaCy", "Scikit-learn", "Logistic Regression, Naive Bayes, Decision Tree, Random Forest, SVM","Azure"],
      link: "https://github.com/kjanuda/analylist"
    },
    {
      title: "Smart Robot Car with ESP32-CAM",
      titleUnderline: true,
      category: "IoT & Embedded Systems",
      description: "A versatile IoT-enabled robot car powered by ESP32, featuring remote control, real-time monitoring, obstacle avoidance, and line tracking. This project integrates various sensors, motors, and wireless communication technologies to build an intelligent autonomous vehicle with seamless remote operation.",
      badge: "IoT Solution",
      technologies: ["React", "MySql", "C++", "WebSocket / HTTP server"],
      link: "https://kjanuda.github.io/ESP32-Robot-Car-/"
    },
    {
      title: "ESP32 Weather & Air Quality Monitoring System",
      titleUnderline: true,
      category: "IoT & Embedded Systems",
      description: "This project demonstrates a complete IoT weather and air quality monitoring system using ESP32 microcontroller with various sensors. The system collects environmental data in real-time, processes it, and presents it through a modern React.js dashboard, with data storage in a MySQL database accessed via PHP backend.",
      badge: "IoT & Embedded Systems",
      technologies: ["ReactJs", "PHP", "MYSql", "C++"],
      link: "https://kjanuda.github.io/ESP32-Weather-Air-Quality-/"
    },
    {
      title: "WeBeats Music campaign page",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "The WeBeats Website is a modern, responsive platform designed to represent the WeBeats music brand with 331K+ followers. Built with a clean and engaging user interface, it serves as a digital hub for showcasing campaigns, music projects, and community updates. The site integrates smooth navigation, interactive sections, and a visually appealing design to capture the creative spirit of WeBeats while providing fans with an immersive online experience.",
      badge: "Full-Stack",
      technologies: ["ReactJs", "Tailwind", "MYSql"],
      link: "https://webeatz.netlify.app/"
    },
    {
      title: "Waste-Management-System",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "EcoSort360 is an AI-powered waste management platform built with Next.js 14. It encourages users to report and manage waste through a reward-based system, turning eco-friendly actions into community-driven impact.The platform integrates Google's Gemini AI for waste verification, Web3Auth for secure login, and Drizzle ORM with Neon Database for efficient data handling. Users can earn rewards, track waste collection tasks in real time, and engage with an interactive leaderboard, making sustainability both impactful and engaging.In short: EcoSort360 is a full-stack, AI-driven, gamified waste management system that combines Next.js, AI, Web3Auth, and databases to promote greener communities.",
      badge: "Full-Stack",
      technologies: ["Next.js", "Typescript", "TailwindCSS", "Gemini AI","Web3Auth","Neon"],
      link: "https://github.com/kjanuda/waste-management-system.git"
    },
    {
      title: "MERN Stack Job Portal Web App",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "Job4U.com is a modern MERN stack job portal designed to streamline the job search and hiring process for both job seekers and employers. The platform features advanced job search filters, a responsive design, and a secure authentication system with email/password and Google sign-in. Employers can manage job postings through a dedicated dashboard, while job seekers can easily browse, filter, and apply for jobs.With MongoDB for scalable data storage and Firebase for authentication, Job4U.com provides a fast, reliable, and user-friendly platform to connect talent with opportunities.",
      badge: "Full-Stack",
      technologies: ["React.js", "NodeJs", "Express.js", "MongoDB"],
      link: "https://www.linkedin.com/feed/update/urn:li:activity:7249848198523985920/"
    },
    {
      title: "Event Registration and Attendance System",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "This Event Registration and Attendance System is a powerful solution for organizations seeking to streamline their event management processes. It leverages modern technologies and user-friendly interfaces to simplify event registration and attendance tracking.",
      badge: "Full-Stack",
      technologies: ["HTML", "MySql", "PHP", "Bootstrap"],
      link: "https://github.com/kjanuda/--EventRegistrationandSystem"
    },
    {
      title: "Clean Sri Lanka Web",
      titleUnderline: true,
      category: "FrontEnd Development",
      description: "The project showcases my skills in UX design, front-end development, and performance optimization. It features a fully responsive layout, smooth transitions, dynamic interactive elements, and fast performance, all powered by HTML5, CSS3, JavaScript, and modern frameworks like Bootstrap 5.",
      badge: "Front-End",
      technologies: ["HTML", "CSS3", "JavaScript", "Bootstrap5"],
      link: "https://github.com/kjanuda/Clean-Srilanka"
    },
    {
      title: "E-Commerce Platform",
      titleUnderline: true,
      category: "Full-Stack Web Development",
      description: "A modern e-commerce platform built with React and Node.js, featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard for inventory management.",
      badge: "Full-Stack",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API"],
      link: "#"
    },
    {
      title: "Social Media Dashboard",
      titleUnderline: true,
      category: "Frontend Development",
      description: "A responsive social media analytics dashboard that displays engagement metrics, follower growth, and content performance across multiple platforms with interactive charts and real-time updates.",
      badge: "Frontend",
      technologies: ["Vue.js", "Chart.js", "CSS3", "REST APIs"],
      link: "#"
    },
    {
      title: "Task Management App",
      titleUnderline: true,
      category: "Mobile Development",
      description: "A cross-platform mobile application for task and project management with features like team collaboration, file sharing, deadline tracking, and push notifications.",
      badge: "Mobile",
      technologies: ["React Native", "Firebase", "Redux", "Push Notifications"],
      link: "#"
    }
  ];

  // Calculate pagination values
  const totalProjects = allProjects.length;
  const totalPages = Math.ceil(totalProjects / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;
  const currentProjects = allProjects.slice(startIndex, endIndex);

  useEffect(() => {
    const fetchProjects = async () => {
      // If API is disabled for development, use fallback immediately
      if (!ENABLE_API_FETCH) {
        console.log('🔧 API fetch disabled for development, using fallback data');
        setAllProjects(fallbackProjects);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        setApiSuccess(false);
        
        // Add timeout to prevent hanging
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 50000); // 10 second timeout
        
        try {
          console.log('🌐 Attempting to fetch from API...');
          
          // First, try to fetch from API with better error handling
          const response = await fetch('https://projectme-oe47.onrender.com/api/projects', {
            signal: controller.signal,
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            mode: 'cors' // Explicitly set CORS mode
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`API responded with status: ${response.status}`);
          }
          
          const apiData = await response.json();
          
          // Check if API data exists and is valid
          if (apiData && Array.isArray(apiData) && apiData.length > 0) {
            // Use API data first, then append fallback
            console.log('✅ API data loaded successfully:', apiData.length, 'projects');
            setApiSuccess(true);
            setAllProjects([...apiData, ...fallbackProjects]);
          } else {
            console.log('⚠️ API returned empty or invalid data, using fallback');
            setAllProjects(fallbackProjects);
          }
          
        } catch (fetchError) {
          clearTimeout(timeoutId);
          
          // Handle specific error types
          if (fetchError.name === 'AbortError') {
            throw new Error('API request timed out after 10 seconds');
          } else if (fetchError.message.includes('Failed to fetch')) {
            throw new Error('Network error - unable to reach API (CORS or connectivity issue)');
          } else {
            throw fetchError;
          }
        }
        
      } catch (error) {
        console.error('❌ Error fetching projects:', error);
        setError(error.message);
        console.log('📦 Using fallback data instead');
        // Use fallback data on error
        setAllProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Reset to first page when projectsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [projectsPerPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePerPageChange = (e) => {
    setProjectsPerPage(parseInt(e.target.value));
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  if (loading) {
    return (
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading projects...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {error && (
          <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="text-yellow-600">⚠️</div>
              <div>
                <p className="text-yellow-800 font-medium mb-1">API Connection Issue</p>
                <p className="text-yellow-700 text-sm">
                  {error}
                </p>
                <p className="text-yellow-600 text-xs mt-2">
                  Displaying fallback projects. The API might be temporarily unavailable or experiencing CORS issues.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Pagination Controls - Top */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center gap-4">
            <label htmlFor="perPage" className="text-sm font-medium text-gray-700">
              Projects per page:
            </label>
            <select
              id="perPage"
              value={projectsPerPage}
              onChange={handlePerPageChange}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value={6}>6</option>
              <option value={9}>9</option>
              <option value={12}>12</option>
              <option value={18}>18</option>
              <option value={24}>24</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-700">
            {startIndex + 1} – {Math.min(endIndex, totalProjects)} of {totalProjects} projects
          </div>
        </div>
        
        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {currentProjects.map((project, index) => (
            <div 
              key={`${currentPage}-${index}`}
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
                  {project.technologies && project.technologies.map((tech, techIndex) => (
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
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Navigation */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-2">
              {generatePageNumbers().map((page, index) => (
                <React.Fragment key={index}>
                  {page === '...' ? (
                    <span className="px-2 py-1 text-gray-500">...</span>
                  ) : (
                    <button
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 rounded-lg border transition-colors ${
                        currentPage === page
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                    >
                      {page}
                    </button>
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

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
        </div>
      </div>
    </section>
  );
}