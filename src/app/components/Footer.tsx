"use client";

import React, { useState } from 'react';

export default function AiGrowFooter() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    interested: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission here
  };

  return (
    <footer 
      className="relative bg-cover bg-center bg-no-repeat py-16 px-4 md:px-8"
      style={{
        backgroundImage: "url('./footer.png')"
      }}
    >
      {/* Background overlay for better text readability */}
      <div className="absolute inset-0 bg-white bg-opacity-90"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Left Section - Company Info */}
          <div className="space-y-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <img 
                src="/januda.png" 
                alt="Company Logo" 
                className="w-26 h-26 object-contain"
              />
            </div>
            
            {/* Description */}
            <p className="text-gray-700 text-sm leading-relaxed">
              Whether you have a question about My software solutions, need technical assistance, or simply want to explore how My services can support your business, feel free to reach out to Me!
            </p>
            
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm text-gray-700">
                  <p>Januda</p>
                  <p>Hambantota, Sri Lanka</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm text-gray-700">+94773-007-426</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span className="text-sm text-gray-700">Janudakodi@gmail.com</span>
              </div>
            </div>
          </div>
          
          {/* Middle Section - Contact Form */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <h3 className="text-xl font-semibold text-gray-700">I’m here to help you grow.</h3>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 bg-transparent focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 bg-transparent focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-500"
                />
              </div>
              
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 bg-transparent focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-500"
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="country"
                  placeholder="Country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 bg-transparent focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-500"
                />
                <select
                  name="interested"
                  value={formData.interested}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border-2 border-green-500 bg-transparent focus:outline-none text-gray-700 rounded"
                >
                  <option value="">Interested</option>
                  <option value="greenhouse-solutions">Greenhouse Solutions</option>
                  <option value="automation-systems">Automation Systems</option>
                  <option value="consultation">Consultation</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-0 py-2 border-0 border-b-2 border-gray-400 bg-transparent focus:border-green-500 focus:outline-none text-gray-700 placeholder-gray-500 resize-none"
              ></textarea>
              
              <button
                onClick={handleSubmit}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded transition-colors duration-300"
              >
                Submit
              </button>
            </div>
          </div>
          
          {/* Right Section - Map */}
          <div className="space-y-4">
            <div className="bg-gray-200 rounded-lg overflow-hidden h-80">
              {/* Placeholder for Google Maps */}
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center relative">
                <div className="text-center">
                  <div className="w-12 h-12 bg-red-500 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-6 h-6 bg-white rounded-full"></div>
                  </div>
                  <p className="text-gray-600 font-semibold">AiGrow</p>
                  <p className="text-xs text-gray-500">Colombo 10, Sri Lanka</p>
                </div>
                
                {/* Map controls */}
                <div className="absolute bottom-4 right-4 flex flex-col space-y-1">
                  <button className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <span className="text-lg">+</span>
                  </button>
                  <button className="w-8 h-8 bg-white shadow-md rounded flex items-center justify-center text-gray-600 hover:bg-gray-50">
                    <span className="text-lg">−</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Links & Privacy */}
            <div className="flex items-center space-x-6">
              <a href="#" className="text-blue-600 hover:text-blue-800 underline text-sm">
                Privacy Policy
              </a>
              
              {/* Social Icons */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:bg-blue-700">
                  <span className="text-lg">f</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white hover:bg-gray-900">
                  <span className="text-lg">@</span>
                </a>
                <a href="#" className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-600">
                  <span className="text-lg">W</span>
                </a>
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center">
              <p>Copyright © 2025 AiGrow | DESIGNED BY VEGA CORE</p>
              <p>SOFTWARE.</p>
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
}