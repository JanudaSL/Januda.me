"use client";

import React, { useState, useEffect, useCallback, ReactElement } from 'react';
import { ChevronLeft, ChevronRight, Star, Plus, X, User, Building, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';

// Define interfaces for type safety
interface Testimonial {
  id: string | number;
  name: string;
  role: string;
  image: string;
  rating: number;
  text: string;
}

interface ApiRecommendation {
  id?: string | number;
  fullName: string;
  email: string;
  avatarUrl?: string;
  organization?: string;
  feedback: string;
}

interface LoggedInUser {
  name: string;
  email: string;
  avatarUrl: string;
}

interface GoogleCredentialResponse {
  credential: string;
}

interface GoogleUserData {
  name: string;
  email: string;
  picture: string;
}

// Google Sign-In configuration interfaces
interface GoogleSignInConfig {
  client_id: string;
  callback: (response: GoogleCredentialResponse) => void;
  auto_prompt?: boolean;
  cancel_on_tap_outside?: boolean;
  use_fedcm_for_prompt?: boolean;
  ux_mode?: string;
  context?: string;
}

interface GoogleButtonConfig {
  theme?: string;
  size?: string;
  text?: string;
  width?: string;
  logo_alignment?: string;
  shape?: string;
}

// Extend Window interface for Google Sign-In
declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: GoogleSignInConfig) => void;
          renderButton: (element: HTMLElement, config: GoogleButtonConfig) => void;
        };
      };
    };
    handleCredentialResponse?: (response: GoogleCredentialResponse) => void;
  }
}

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [showFeedbackForm, setShowFeedbackForm] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<LoggedInUser | null>(null);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [organization, setOrganization] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([
    {
      id: 1,
      name: "Achala Athukorala",
      role: "Research Engineer, SUTD",
      image: "https://ik.imagekit.io/9dtagplxz/WhatsApp%20Image%202025-09-19%20at%2022.50.30_6a4c9f03.jpg?updatedAt=1758302547543",
      rating: 4,
      text: "Working with Januda has been a truly rewarding experience. He consistently demonstrates exceptional technical expertise, dedication, and a proactive approach to every task. His ability to think critically and find innovative solutions to challenges sets him apart. Beyond his skills, Januda’s positive attitude, teamwork, and strong communication make him a valuable asset to any team or organization."
    },
    {
      id: 2,
      name: "Chathura Madushan",
      role: "University Of Moratuwa",
      image: "https://ik.imagekit.io/9dtagplxz/FB_IMG_17583057470533329.jpg?updatedAt=1758305850993",
      rating: 5,
      text: "Collaborating with Januda has always been inspiring. He brings together strong problem-solving skills, creativity, and a genuine passion for achieving excellence. His approachable nature and willingness to support others make him not just a reliable teammate, but also a motivating presence in any environment."
    },
    {
      id: 3,
      name: "Ranidu Rochitha Pradeeshan",
      role: "WEBEATS Admin, University Of Ruhuna",
      image: "https://ik.imagekit.io/9dtagplxz/rni.png?updatedAt=1758306591726",
      rating: 5,
      text: "Januda did an excellent job creating the WEBEATS website. His creativity, technical skills, and attention to detail made the site both functional and visually appealing. He handled the project with professionalism and dedication, ensuring every part was done to the highest standard. I highly recommend Januda for his outstanding work."
    },
    
  ]);

  const API_URL = "https://feedbk-1.onrender.com/api/recommendations";

  // Generate Gravatar URL
  const generateGravatarUrl = (email: string): string => {
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
      const char = email.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `https://www.gravatar.com/avatar/${Math.abs(hash)}?d=identicon&s=80`;
  };

  // Load recommendations from API
  const loadRecommendations = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data: ApiRecommendation[] = await response.json();
        const apiTestimonials: Testimonial[] = data.map((rec: ApiRecommendation) => ({
          id: `api-${rec.id || Math.random()}`,
          name: rec.fullName,
          role: rec.organization || "Valued Client",
          image: rec.avatarUrl || generateGravatarUrl(rec.email),
          rating: 5,
          text: rec.feedback
        }));
        
        setTestimonialsList(prev => {
          const existingIds = prev.map(t => t.id);
          const newTestimonials = apiTestimonials.filter(t => !existingIds.includes(t.id));
          return [...prev, ...newTestimonials];
        });
      }
    } catch (error) {
      console.error('Error loading recommendations:', error);
    }
  }, []);

  // Google Sign-In callback function
  const handleCredentialResponse = useCallback((response: GoogleCredentialResponse): void => {
    try {
      // Decode the Google JWT token
      const data: GoogleUserData = JSON.parse(atob(response.credential.split(".")[1]));
      
      const user: LoggedInUser = {
        name: data.name,
        email: data.email,
        avatarUrl: data.picture
      };
      
      setLoggedInUser(user);
    } catch (error) {
      console.error('Error parsing Google credential:', error);
      alert('Error signing in with Google. Please try again.');
    }
  }, []);

  // Load Google Sign-In script and initialize
  useEffect(() => {
    const loadGoogleScript = (): void => {
      // Check if script already exists
      if (document.querySelector('script[src*="accounts.google.com/gsi/client"]')) {
        initializeGoogle();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      
      script.onload = (): void => {
        initializeGoogle();
      };

      script.onerror = (): void => {
        console.log('Google Sign-In script failed to load');
      };

      document.head.appendChild(script);
    };

    const initializeGoogle = (): void => {
      // Make handleCredentialResponse globally available
      window.handleCredentialResponse = handleCredentialResponse;
      
      // Initialize Google Sign-In
      if (window.google && window.google.accounts) {
        try {
          const config: GoogleSignInConfig = {
            client_id: "1081185265333-j6872g780gpe983c0hi9ac3nt858ksmp.apps.googleusercontent.com",
            callback: handleCredentialResponse,
            auto_prompt: false,
            cancel_on_tap_outside: false,
            use_fedcm_for_prompt: false,
            ux_mode: 'popup',
            context: 'signin'
          };
          window.google.accounts.id.initialize(config);
        } catch (error) {
          console.log('Google Sign-In initialization error:', error);
        }
      }
    };

    loadGoogleScript();
    loadRecommendations();
  }, [loadRecommendations, handleCredentialResponse]);

  const nextSlide = useCallback((): void => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex >= testimonialsList.length ? 0 : nextIndex;
    });
  }, [testimonialsList.length]);

  const prevSlide = (): void => {
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex - 1;
      return prevIdx < 0 ? testimonialsList.length - 1 : prevIdx;
    });
  };

  // Auto-play logic with proper cleanup
  useEffect(() => {
    if (!isPaused && !showFeedbackForm) {
      const interval = setInterval(() => {
        nextSlide();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused, showFeedbackForm, nextSlide]);

  const handleMouseEnter = (): void => setIsPaused(true);
  const handleMouseLeave = (): void => setIsPaused(false);
  const handleTouchStart = (): void => setIsPaused(true);
  const handleTouchEnd = (): void => setIsPaused(false);

  const renderStars = (rating: number): ReactElement[] => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  // Handle "Your Feedback" button click
  const handleYourFeedbackClick = (): void => {
    setShowFeedbackForm(true);
    
    // Small delay to ensure modal is rendered, then render Google button
    setTimeout(() => {
      if (window.google && window.google.accounts && !loggedInUser) {
        const signInContainer = document.getElementById('google-signin-container');
        if (signInContainer) {
          signInContainer.innerHTML = '';
          
          try {
            const buttonConfig: GoogleButtonConfig = {
              theme: 'outline',
              size: 'large',
              text: 'signin_with',
              width: '320',
              logo_alignment: 'left',
              shape: 'rectangular'
            };
            window.google.accounts.id.renderButton(signInContainer, buttonConfig);
          } catch (error) {
            console.log('Error rendering Google button:', error);
          }
        }
      }
    }, 100);
  };

  // Submit feedback to API
  const handleSubmitFeedback = async (): Promise<void> => {
    if (!loggedInUser || !feedbackText.trim()) return;

    setIsSubmitting(true);
    
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json" 
        },
        body: JSON.stringify({
          fullName: loggedInUser.name,
          email: loggedInUser.email,
          avatarUrl: loggedInUser.avatarUrl,
          organization: organization || "Valued Client",
          feedback: feedbackText.trim()
        })
      });

      if (response.ok) {
        const newTestimonial: Testimonial = {
          id: `new-${Date.now()}`,
          name: loggedInUser.name,
          role: organization || "Valued Client",
          image: loggedInUser.avatarUrl,
          rating: 5,
          text: feedbackText.trim()
        };

        setTestimonialsList(prev => [...prev, newTestimonial]);
        
        setFeedbackText('');
        setOrganization('');
        setShowFeedbackForm(false);
        setLoggedInUser(null);
        
        alert('Thank you for your feedback! It has been submitted successfully.');
        
        setTimeout(() => {
          loadRecommendations();
        }, 1000);
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Error submitting feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseFeedback = (): void => {
    setShowFeedbackForm(false);
    setFeedbackText('');
    setOrganization('');
    setLoggedInUser(null);
  };

  // Image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, email?: string) => {
    const target = e.target as HTMLImageElement;
    if (email) {
      target.src = generateGravatarUrl(email);
    } else {
      // Fallback to a default avatar
      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(target.alt)}&background=10b981&color=ffffff&size=80`;
    }
  };

  // Determine if we should show one or two testimonials based on screen size
  const [itemsToShow, setItemsToShow] = useState(1);
  
  useEffect(() => {
    const updateItemsToShow = () => {
      if (window.innerWidth >= 1024) {
        setItemsToShow(2);
      } else if (window.innerWidth >= 768) {
        setItemsToShow(1);
      } else {
        setItemsToShow(1);
      }
    };
    
    updateItemsToShow();
    window.addEventListener('resize', updateItemsToShow);
    return () => window.removeEventListener('resize', updateItemsToShow);
  }, []);

  // Calculate visible testimonials
  const visibleTestimonials = [];
  for (let i = 0; i < itemsToShow; i++) {
    const index = (currentIndex + i) % testimonialsList.length;
    visibleTestimonials.push(testimonialsList[index]);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:py-12 sm:px-6 lg:py-16 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 sm:h-2 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left Section */}
            <div className="lg:w-1/3 flex flex-col justify-center">
              <p className="text-orange-500 font-semibold text-base sm:text-lg mb-3 sm:mb-4 tracking-wide">
                My Testimonials
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">
                What They&apos;re
                <br />
                Talking About
                <br />
                <span className="text-green-600">Januda</span>
              </h1>
              <p className="text-gray-600 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
                Authentic stories and endorsements from satisfied clients.
              </p>
           
                <button 
                  onClick={handleYourFeedbackClick}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2 w-full sm:w-fit"
                >
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Your Feedback</span>
                </button>
              </div>
            </div>

            {/* Right Section - Testimonials */}
            <div 
              className="lg:w-2/3 relative" 
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex flex-col sm:flex-row gap-6 overflow-hidden">
                {visibleTestimonials.map((testimonial, index) => (
                  <div
                    key={`${testimonial.id}-${index}`}
                    className="flex-1 bg-gray-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                  >
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-3 sm:border-4 border-green-200 mr-3 sm:mr-4 transition-transform duration-300 hover:scale-110 relative">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 640px) 56px, (max-width: 1024px) 64px, 80px"
                          onError={(e) => handleImageError(e, testimonial.name.includes('@') ? testimonial.name : undefined)}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                            {testimonial.name}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                          <Building className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                          <p>{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex mb-3 sm:mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                ))}
              </div>
              
              {/* Navigation Arrows - Only show on desktop */}
              <div className="hidden lg:flex justify-center mt-6 sm:mt-8 gap-4">
                <button
                  onClick={prevSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 hover:bg-green-500 text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-200 hover:bg-green-500 text-gray-600 hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
              
              {/* Pagination Dots - Always visible */}
              <div className="flex justify-center mt-6 gap-2">
                {testimonialsList.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      currentIndex === index
                        ? 'bg-green-500 scale-125 shadow-md'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Form Modal with Improved Design */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-md sm:max-w-lg transform transition-all duration-300 scale-100 border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="p-6 sm:p-8">
              {/* Header */}
              <div className="flex justify-between items-center mb-6 sm:mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Share Your Feedback</h2>
                </div>
                <button
                  onClick={handleCloseFeedback}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all duration-200 hover:scale-105"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                </button>
              </div>

              {!loggedInUser ? (
                <div className="text-center">
                  {/* Sign-in Instructions */}
                  <div className="mb-6 sm:mb-8">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Welcome!</h3>
                    <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed">
                      Please sign in with your Google account to share your valuable feedback with us.
                    </p>
                  </div>

                  {/* Google Sign-In Button Container */}
                  <div className="mb-6">
                    <div id="google-signin-container" className="flex justify-center"></div>
                  </div>

                  {/* Security Note */}
                  <div className="bg-blue-50 rounded-xl p-3 sm:p-4 border border-blue-200">
                    <div className="text-sm text-blue-700 flex items-center gap-2">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                      </div>
                      <span>We use Google Sign-In to ensure authentic feedback and protect your privacy.</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* User Profile Section */}
                  <div className="mb-6 sm:mb-8">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-green-200">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <div className="relative">
                          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-3 sm:border-4 border-white shadow-lg overflow-hidden relative">
                            <Image
                              src={loggedInUser.avatarUrl}
                              alt={loggedInUser.name}
                              fill
                              className="object-cover"
                              sizes="64px"
                              onError={(e) => handleImageError(e, loggedInUser.email)}
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                            <User className="w-2 h-2 sm:w-3 sm:h-3 text-white" />
                          </div>
                        </div>
                        <div className="ml-3 sm:ml-4 flex-1">
                          <h3 className="font-bold text-gray-900 text-base sm:text-lg">{loggedInUser.name}</h3>
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                            <p className="truncate">{loggedInUser.email}</p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white/80 backdrop-blur rounded-xl p-2 sm:p-3">
                        <p className="text-xs sm:text-sm text-green-700 font-medium">✓ Authenticated with Google</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4 sm:space-y-6">
                    {/* Full Name Field (Auto-filled) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2 text-green-600" />
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={loggedInUser.name}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed text-sm sm:text-base"
                      />
                    </div>

                    {/* Email Field (Auto-filled) */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2 text-green-600" />
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={loggedInUser.email}
                        readOnly
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-700 cursor-not-allowed text-sm sm:text-base"
                      />
                    </div>

                    {/* Organization Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        <Building className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2 text-green-600" />
                        Organization <span className="text-gray-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={organization}
                        onChange={(e) => setOrganization(e.target.value)}
                        placeholder="Your University, Company, or Institution"
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 hover:border-gray-400 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                    </div>

                    {/* Feedback Text Field */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2 sm:mb-3">
                        <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2 text-green-600" />
                        Your Feedback <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={feedbackText}
                        onChange={(e) => setFeedbackText(e.target.value)}
                        rows={4}
                        placeholder="Share your experience, thoughts, and suggestions about our service..."
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-400 text-gray-900 placeholder-gray-500 text-sm sm:text-base"
                      />
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-xs text-gray-500">Minimum 10 characters required</p>
                        <p className="text-xs text-gray-400">{feedbackText.length}/500</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                      <button
                        type="button"
                        onClick={handleCloseFeedback}
                        className="px-4 py-2.5 sm:px-6 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold text-sm sm:text-base"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSubmitFeedback}
                        disabled={!feedbackText.trim() || feedbackText.length < 10 || isSubmitting}
                        className="px-4 py-2.5 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 disabled:from-gray-300 disabled:to-gray-300 text-white rounded-xl transition-all duration-200 font-semibold disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 shadow-lg hover:shadow-xl disabled:shadow-none text-sm sm:text-base"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            <span>Submitting...</span>
                          </div>
                        ) : (
                          'Submit Feedback'
                        )}
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsCarousel;
