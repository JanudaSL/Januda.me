"use client";

import React, { useState } from 'react';
import { Calendar, MapPin, ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Clock, ExternalLink } from 'lucide-react';

const IBMEventsBlog = () => {
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  const events = [
    {
      id: 1,
      title: "Transforming Healthcare IT: Key Insights from Becker's Annual Conference",
      eventName: "10th Annual Beckers IT Health Conference - Chicago",
      type: "Physical",
      location: "Chicago",
      date: "September 30, 2025",
      writeDate: "September 20, 2025",
      category: "healthcare",
      description: "Discover the latest healthcare IT innovations and digital transformation strategies that are reshaping patient care delivery and operational efficiency in modern healthcare systems.",
      imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.beckershospitalreview.com/healthcare-information-technology"
    },
    {
      id: 2,
      title: "AI Revolution in Data Science: What to Expect at COLLIDE 2025",
      eventName: "Data Science Connect's COLLIDE Data & AI Conference",
      type: "Physical",
      location: "Sandy Springs",
      date: "September 30, 2025",
      writeDate: "September 18, 2025",
      category: "data-science",
      description: "Join industry leaders as they explore cutting-edge AI applications, machine learning breakthroughs, and the future of data-driven decision making in enterprise environments.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.datascienceconnect.com/collide-conference"
    },
    {
      id: 3,
      title: "Mastering Data Management with watsonx.data: A Complete Integration Guide",
      eventName: "Data Management in the era of AI - Mastering watsonx.data integration",
      type: "Digital",
      location: "Online",
      date: "September 30, 2025",
      writeDate: "September 22, 2025",
      category: "ai",
      description: "Learn how to seamlessly integrate IBM's watsonx.data platform into your existing infrastructure and unlock the full potential of AI-driven data management solutions.",
      imageUrl: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/watsonx/data"
    },
    {
      id: 4,
      title: "Big Data Trends Shaping Paris Tech Scene in 2025",
      eventName: "Big Data and AI Paris 2025",
      type: "Physical",
      location: "Paris",
      date: "October 01, 2025",
      writeDate: "September 15, 2025",
      category: "big-data",
      description: "Explore the European perspective on big data analytics, AI implementation strategies, and how Parisian tech companies are leading innovation in data processing technologies.",
      imageUrl: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.bigdataparisconf.com"
    },
    {
      id: 5,
      title: "Building Autonomous AI Agents: Singapore's Tech Innovation Hub",
      eventName: "Agentic AI Bootcamp by IBM TechXchange",
      type: "Physical",
      location: "Singapore",
      date: "October 01, 2025",
      writeDate: "September 19, 2025",
      category: "ai",
      description: "Dive deep into agentic AI development with hands-on workshops covering autonomous agent architecture, decision-making algorithms, and real-world deployment strategies.",
      imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.ibm.com/events/techxchange"
    },
    {
      id: 6,
      title: "Biotechnology Meets Digital Innovation: European Perspectives",
      eventName: "BioTechX Europe 2025",
      type: "Physical",
      location: "Basel",
      date: "October 06, 2025",
      writeDate: "September 17, 2025",
      category: "biotech",
      description: "Witness the convergence of biotechnology and digital transformation as leading European researchers present breakthrough innovations in personalized medicine and biotech analytics.",
      imageUrl: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&h=250&fit=crop",
      moreInfoLink: "https://www.biotechxeurope.com"
    }
  ];

  const totalItems = 287;
  const totalPages = 24;

  const getTypeColor = (type) => {
    return type === 'Digital' 
      ? 'text-blue-600 bg-blue-50 border-blue-200' 
      : 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">IBM Events Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and innovations from IBM events worldwide
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {events.map((event) => (
            <article key={event.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
              {/* Event Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full border backdrop-blur-sm ${getTypeColor(event.type)}`}>
                    {event.type}
                  </span>
                </div>
              </div>

              <div className="p-6">
                {/* Write Date */}
                <div className="flex items-center text-gray-500 text-sm mb-3">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>Published {formatDate(event.writeDate)}</span>
                </div>

                {/* Blog Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {event.title}
                </h2>

                {/* Brief Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {event.description}
                </p>

                {/* Event Details */}
                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Event: {formatDate(event.date)}</span>
                  </div>
                </div>

                {/* More Information Link */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <a 
                    href={event.moreInfoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium group/link"
                  >
                    <span className="mr-2">More Information</span>
                    <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform duration-200" />
                  </a>
                  
                  <ArrowUpRight className="h-5 w-5 text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
          {/* Items Per Page */}
          <div className="flex items-center gap-4">
            <span className="text-gray-700 text-sm font-medium">Items per page:</span>
            <div className="relative">
              <select 
                value={itemsPerPage}
                onChange={(e) => setItemsPerPage(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value={12}>12</option>
                <option value={24}>24</option>
                <option value={48}>48</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-gray-600 text-sm">
              1–12 of {totalItems} articles
            </span>
          </div>

          {/* Page Navigation */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <select 
                value={currentPage}
                onChange={(e) => setCurrentPage(Number(e.target.value))}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {Array.from({ length: totalPages }, (_, i) => (
                  <option key={i + 1} value={i + 1}>Page {i + 1}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <span className="text-gray-600 text-sm">
              of {totalPages} pages
            </span>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600" />
              </button>
              <button 
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <ChevronRight className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IBMEventsBlog;