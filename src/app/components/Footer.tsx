"use client";

import React, { useState, useCallback } from 'react';

// Types
interface FormData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  message: string;
  interested: string;
}

interface FormErrors {
  [key: string]: string;
}

// Constants
// Constants
const INTERESTED_OPTIONS = [
  { value: '', label: 'Select your interest' },
  { value: 'Software-Development', label: 'Software Development' },
  { value: 'Project-Management', label: 'Project Management' },
  { value: 'System-Integration', label: 'System Integration' },
  { value: 'other', label: 'Other' }
];

const SOCIAL_LINKS = [
  { 
    name: 'Facebook', 
    icon: 'f', 
    url: '#', 
    bgColor: 'bg-blue-600 hover:bg-blue-700',
    ariaLabel: 'Visit our Facebook page'
  },
  { 
    name: 'Twitter', 
    icon: '@', 
    url: '#', 
    bgColor: 'bg-gray-800 hover:bg-gray-900',
    ariaLabel: 'Visit our Twitter page'
  },
  { 
    name: 'WhatsApp', 
    icon: 'W', 
    url: '#', 
    bgColor: 'bg-green-500 hover:bg-green-600',
    ariaLabel: 'Contact us on WhatsApp'
  }
];

const CONTACT_INFO = {
  address: {
    name: 'Januda',
    location: 'Hambantota, Sri Lanka'
  },
  phone: '+94773-007-426',
  email: 'Janudakodi@gmail.com'
};

// API Configuration
const API_CONFIG = {
  baseURL: 'https://conf-2db0.onrender.com',
  endpoints: {
    contacts: '/api/contacts'
  }
};

export default function AiGrowFooter() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    message: '',
    interested: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    if (!formData.interested) {
      newErrors.interested = 'Please select your area of interest';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    return newErrors;
  }, [formData]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  }, [errors]);

  // API call function
  const submitToAPI = async (data: FormData): Promise<any> => {
    const url = `${API_CONFIG.baseURL}${API_CONFIG.endpoints.contacts}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        fullName: data.fullName.trim(),
        email: data.email.trim().toLowerCase(),
        phone: data.phone.trim(),
        country: data.country.trim(),
        message: data.message.trim(),
        interested: data.interested,
        submittedAt: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      let errorMsg = `HTTP error! status: ${response.status}`;
      
      try {
        const errorData = await response.json();
        errorMsg = errorData.message || errorData.error || errorMsg;
      } catch (parseError) {
        // If we can't parse the error response, use the default message
      }
      
      throw new Error(errorMsg);
    }

    return await response.json();
  };

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      console.log('Submitting form data:', formData);
      
      // Make actual API call
      const response = await submitToAPI(formData);
      
      console.log('API Response:', response);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        country: '',
        message: '',
        interested: ''
      });

      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      
      // Set specific error message
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm]);

  const InputField: React.FC<{
    type: string;
    name: keyof FormData;
    placeholder: string;
    className?: string;
    required?: boolean;
  }> = ({ type, name, placeholder, className = '', required = false }) => (
    <div className="relative">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={formData[name]}
        onChange={handleInputChange}
        required={required}
        aria-invalid={errors[name] ? 'true' : 'false'}
        aria-describedby={errors[name] ? `${name}-error` : undefined}
        className={`w-full px-0 py-2 border-0 border-b-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 transition-colors duration-200 ${
          errors[name] 
            ? 'border-red-400 focus:border-red-500' 
            : 'border-gray-400 focus:border-green-500'
        } ${className}`}
      />
      {errors[name] && (
        <span id={`${name}-error`} className="absolute -bottom-5 left-0 text-xs text-red-500" role="alert">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <footer 
      className="relative bg-cover bg-center bg-no-repeat py-16 px-4 md:px-8"
      style={{
        backgroundImage: "url('./footer.png')"
      }}
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-90" aria-hidden="true"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Left Section - Company Info */}
          <section className="space-y-8" aria-labelledby="company-info">
            <div className="flex items-center space-x-2">
              <img 
                src="/januda.png" 
                alt="AiGrow Company Logo" 
                className="w-26 h-26 object-contain"
                loading="lazy"
              />
            </div>
            
            <p className="text-gray-700 text-sm leading-relaxed">
              Whether you have a question about our software solutions, need technical assistance, 
              or simply want to explore how our services can support your business, feel free to reach out to us!
            </p>
            
            {/* Contact Info */}
            <address className="not-italic space-y-4">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div className="text-sm text-gray-700">
                  <p>{CONTACT_INFO.address.name}</p>
                  <p>{CONTACT_INFO.address.location}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a 
                  href={`tel:${CONTACT_INFO.phone}`}
                  className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                  aria-label={`Call us at ${CONTACT_INFO.phone}`}
                >
                  {CONTACT_INFO.phone}
                </a>
              </div>
              
              <div className="flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a 
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                  aria-label={`Email us at ${CONTACT_INFO.email}`}
                >
                  {CONTACT_INFO.email}
                </a>
              </div>
            </address>
          </section>
          
          {/* Right Section - Contact Form */}
          <section aria-labelledby="contact-form">
            <div className="text-center mb-6">
              <h2 id="contact-form" className="text-2xl font-bold text-gray-800 mb-2">Get in Touch</h2>
              <h3 className="text-xl font-semibold text-gray-700">I’m here to help you build and grow with technology.</h3>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
                  <strong>Success!</strong> Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
                  <strong>Error!</strong> {errorMessage || 'Something went wrong. Please try again.'}
                </div>
              )}

              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    type="text"
                    name="fullName"
                    placeholder="Full Name *"
                    required
                  />
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Email Address *"
                    required
                  />
                </div>
                
                <InputField
                  type="tel"
                  name="phone"
                  placeholder="Phone Number *"
                  required
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    type="text"
                    name="country"
                    placeholder="Country *"
                    required
                  />
                  
                  <div className="relative">
                    <select
                      name="interested"
                      value={formData.interested}
                      onChange={handleInputChange}
                      required
                      aria-invalid={errors.interested ? 'true' : 'false'}
                      aria-describedby={errors.interested ? 'interested-error' : undefined}
                      className={`w-full px-3 py-2 border-2 bg-transparent focus:outline-none text-gray-700 rounded transition-colors duration-200 ${
                        errors.interested 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-green-500 focus:border-green-600'
                      }`}
                    >
                      {INTERESTED_OPTIONS.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {errors.interested && (
                      <span id="interested-error" className="absolute -bottom-5 left-0 text-xs text-red-500" role="alert">
                        {errors.interested}
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="relative">
                  <textarea
                    name="message"
                    placeholder="Your Message *"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    required
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                    className={`w-full px-0 py-2 border-0 border-b-2 bg-transparent focus:outline-none text-gray-700 placeholder-gray-500 resize-none transition-colors duration-200 ${
                      errors.message 
                        ? 'border-red-400 focus:border-red-500' 
                        : 'border-gray-400 focus:border-green-500'
                    }`}
                  />
                  {errors.message && (
                    <span id="message-error" className="absolute -bottom-5 left-0 text-xs text-red-500" role="alert">
                      {errors.message}
                    </span>
                  )}
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                  aria-label={isSubmitting ? 'Submitting form...' : 'Submit contact form'}
                >
                  {isSubmitting ? (
                    <span className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                      </svg>
                      <span>Submitting...</span>
                    </span>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>
            </form>
          </section>
        </div>
        
        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            
            {/* Social Links & Privacy */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 underline text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
              >
                Privacy Policy
              </a>
              
              {/* Social Icons */}
              <div className="flex space-x-4" role="group" aria-label="Social media links">
                {SOCIAL_LINKS.map((social) => (
                  <a 
                    key={social.name}
                    href={social.url}
                    aria-label={social.ariaLabel}
                    className={`w-10 h-10 ${social.bgColor} rounded-full flex items-center justify-center text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white`}
                  >
                    <span className="text-lg font-bold" aria-hidden="true">{social.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Copyright */}
            <div className="text-sm text-gray-600 text-center">
              <p>Copyright © {new Date().getFullYear()} Januda | DESIGNED BY Januda.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}