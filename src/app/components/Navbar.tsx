'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Helper function to check if link is active
  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  // Helper function to get link classes
  const getLinkClasses = (path: string, isMobile: boolean = false) => {
    const baseClasses = isMobile
      ? "block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg relative"
      : "px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap relative rounded-lg";
    
    if (isActive(path)) {
      return `${baseClasses} text-blue-600 ${
        isMobile 
          ? "bg-blue-50 border-l-4 border-blue-600 shadow-sm" 
          : "bg-blue-50 after:absolute after:bottom-0 after:left-1/2 after:transform after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-blue-600 after:rounded-full"
      }`;
    }
    
    return `${baseClasses} text-gray-700 hover:text-blue-600 ${
      isMobile 
        ? "hover:bg-gray-50 hover:border-l-4 hover:border-gray-300" 
        : "hover:bg-gray-50"
    }`;
  };

  return (
    <nav className={`w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'shadow-md' : 'shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image
                  src="/januda.png"
                  alt="Januda Logo"
                  width={50}
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12 lg:w-24 lg:h-24 object-contain transition-transform duration-300 group-hover:scale-110"
                  priority
                  onError={(e) => {
                    // Fallback if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const fallback = document.createElement('div');
                    fallback.className = 'w-10 h-10 sm:w-12 sm:h-12 lg:w-24 lg:h-24 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg';
                    fallback.textContent = 'J';
                    target.parentNode?.appendChild(fallback);
                  }}
                />
                {/* Subtle glow effect */}
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-sm"></div>
              </div>
            </Link>
          </div>

          {/* Navigation Links - Desktop & Tablet */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 xl:space-x-4">
              <Link href="/" className={getLinkClasses('/')}>
                Home
              </Link>
              <Link href="/about" className={getLinkClasses('/about')}>
                About Me
              </Link>
              <Link href="/projects" className={getLinkClasses('/projects')}>
                Projects
              </Link>
              <Link href="/publications" className={getLinkClasses('/publications')}>
                Publications
              </Link>
              <Link href="/contact" className={getLinkClasses('/contact')}>
                Contact Me
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={toggleMobileMenu}
              className="relative inline-flex items-center justify-center p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Animated Hamburger/Close icon */}
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-3' : ''
                }`}></span>
                <span className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-3' : ''
                }`}></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`} 
        id="mobile-menu"
      >
        <div className="px-4 pt-2 pb-4 space-y-2 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-lg">
          <Link href="/" onClick={closeMobileMenu} className={getLinkClasses('/', true)}>
             Home
          </Link>
          <Link href="/about" onClick={closeMobileMenu} className={getLinkClasses('/about', true)}>
             About Me
          </Link>
          <Link href="/projects" onClick={closeMobileMenu} className={getLinkClasses('/projects', true)}>
             Projects
          </Link>
          <Link href="/publications" onClick={closeMobileMenu} className={getLinkClasses('/publications', true)}>
            Publications
          </Link>
          <Link href="/contact" onClick={closeMobileMenu} className={getLinkClasses('/contact', true)}>
             Contact Me
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;