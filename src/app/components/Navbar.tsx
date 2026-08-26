'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { Montserrat } from 'next/font/google';

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
});

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Scroll direction handling
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      setIsScrolled(currentScrollY > 10);

      // Always show navbar near the top
      if (currentScrollY < 80) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (currentScrollY > lastScrollY.current) {
        // Scrolling down
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) =>
    path === '/'
      ? pathname === '/'
      : pathname.startsWith(path);

  const getLinkClasses = (
    path: string,
    isMobile = false
  ) => {
    const base = isMobile
      ? `
        block
        px-4
        py-3
        text-[13px]
        sm:text-[14px]
        font-normal
        tracking-[0.05px]
        rounded-lg
        transition-all
        duration-300
      `
      : `
        relative
        px-1
        py-2
        text-[14px]
        xl:text-[15px]
        font-normal
        tracking-[0.05px]
        whitespace-nowrap
        transition-all
        duration-300
      `;

    if (isActive(path)) {
      return `
        ${base}
        text-white
        ${
          isMobile
            ? 'bg-white/10'
            : `
              after:absolute
              after:-bottom-1
              after:left-0
              after:w-full
              after:h-[1px]
              after:bg-white/80
            `
        }
      `;
    }

    return `
      ${base}
      text-white/80
      hover:text-white
      ${
        isMobile
          ? 'hover:bg-white/10'
          : ''
      }
    `;
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/publications', label: 'Publications' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <div
      className={`
        ${montserrat.className}
        w-full
        px-3
        sm:px-6
        lg:px-8
        pt-3
        sm:pt-4
        fixed
        top-0
        left-0
        z-50
        transition-transform
        duration-300
        ease-in-out
        ${
          isVisible
            ? 'translate-y-0'
            : '-translate-y-[calc(100%+1rem)]'
        }
      `}
    >
      <nav
        className={`
          max-w-7xl
          mx-auto
          rounded-2xl
          sm:rounded-full
          border
          border-white/10
          transition-all
          duration-300
          ${
            isScrolled
              ? 'bg-black/70 backdrop-blur-md shadow-lg'
              : 'bg-black/40 backdrop-blur-md'
          }
        `}
      >
        <div
          className="
            flex
            justify-between
            items-center
            h-14
            sm:h-16
            md:h-[72px]
            px-3
            sm:px-6
          "
        >
          {/* ================= LOGO ================= */}
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="group flex items-center"
              onClick={closeMobileMenu}
            >
              <div
                className="
                  relative
                  w-14
                  h-14
                  sm:w-20
                  sm:h-20
                  md:w-24
                  md:h-24
                "
              >
                <Image
                  src="/jnd.png"
                  alt="Logo"
                  fill
                  className="
                    object-contain
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                  priority
                  sizes="96px"
                />
              </div>
            </Link>
          </div>

          {/* ================= DESKTOP LINKS ================= */}
          <div
            className="
              hidden
              lg:flex
              items-center
              space-x-7
              xl:space-x-9
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={getLinkClasses(link.href)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/contact"
              className="
                bg-white
                hover:bg-gray-200
                text-gray-900
                text-[12px]
                xl:text-[13px]
                font-medium
                tracking-[1.3px]
                px-7
                py-3
                rounded-full
                transition-all
                duration-300
                whitespace-nowrap
              "
            >
              TALK TO ME
            </Link>
          </div>

          {/* ================= MOBILE BUTTON ================= */}
          <button
            onClick={toggleMobileMenu}
            className="
              lg:hidden
              p-2
              rounded-full
              text-gray-200
              hover:bg-white/10
              active:bg-white/20
              transition-all
              duration-200
            "
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={21} strokeWidth={1.7} />
            ) : (
              <Menu size={21} strokeWidth={1.7} />
            )}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          id="mobile-menu"
          className={`
            lg:hidden
            transition-all
            duration-500
            ease-in-out
            overflow-hidden
            ${
              isMobileMenuOpen
                ? 'max-h-[28rem] opacity-100'
                : 'max-h-0 opacity-0'
            }
          `}
        >
          <div
            className="
              px-3
              sm:px-4
              pb-4
              pt-2
              space-y-1
              border-t
              border-white/10
            "
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobileMenu}
                className={getLinkClasses(link.href, true)}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3">
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="
                  block
                  text-center
                  bg-white
                  hover:bg-gray-200
                  text-gray-900
                  text-[12px]
                  font-medium
                  tracking-[1.3px]
                  px-6
                  py-3
                  rounded-full
                  transition-all
                  duration-300
                "
              >
                TALK TO US
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;