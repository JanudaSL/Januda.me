'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => (path === '/' ? pathname === '/' : pathname.startsWith(path));

  const getLinkClasses = (path: string, isMobile = false) => {
    const base = isMobile
      ? 'block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg relative'
      : 'px-3 xl:px-4 py-2 text-sm font-medium transition-all duration-300 whitespace-nowrap relative rounded-lg';
    if (isActive(path)) {
      return `${base} text-blue-600 ${
        isMobile
          ? 'bg-blue-50 border-l-4 border-blue-600 shadow-sm'
          : 'bg-blue-50 after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-6 after:h-0.5 after:bg-blue-600 after:rounded-full'
      }`;
    }
    return `${base} text-gray-700 hover:text-blue-600 ${
      isMobile ? 'hover:bg-gray-50 hover:border-l-4 hover:border-gray-300' : 'hover:bg-gray-50'
    }`;
  };

  return (
    <nav
      className={`w-full bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="group flex items-center justify-center">
              <div className="relative flex items-center justify-center">
                {/* Bigger on mobile */}
                <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] md:w-20 md:h-20 lg:w-24 lg:h-24">
                  <Image
                    src="/januda.png"
                    alt="Januda Logo"
                    fill
                    className="object-contain rounded-lg transition-transform duration-300 group-hover:scale-105"
                    priority
                    sizes="(max-width: 640px) 64px, (max-width: 1024px) 80px, 96px"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = document.createElement('div');
                      fallback.className =
                        'w-full h-full bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg';
                      fallback.textContent = 'J';
                      target.parentNode?.appendChild(fallback);
                    }}
                  />
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-blue-600/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-2 xl:space-x-4">
              <Link href="/" className={getLinkClasses('/')}>Home</Link>
              <Link href="/about" className={getLinkClasses('/about')}>About Me</Link>
              <Link href="/projects" className={getLinkClasses('/projects')}>Projects</Link>
              <Link href="/publications" className={getLinkClasses('/publications')}>Publications</Link>
              <Link href="/contact" className={getLinkClasses('/contact')}>Contact Me</Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'rotate-45 top-3' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-3 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-5 w-6 h-0.5 bg-current transition-all duration-300 ${
                    isMobileMenuOpen ? '-rotate-45 top-3' : ''
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        id="mobile-menu"
        className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
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
