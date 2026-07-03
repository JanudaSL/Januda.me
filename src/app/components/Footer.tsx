"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { FaLinkedinIn, FaMedium, FaXTwitter } from "react-icons/fa6";

// Constants
const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/publications', label: 'Publications' },
  { href: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  {
    name: 'LinkedIn',
    icon: <FaLinkedinIn />,
    url: 'https://www.linkedin.com/',
    ariaLabel: 'Visit our LinkedIn profile'
  },
  {
    name: 'Medium',
    icon: <FaMedium />,
    url: 'https://medium.com/',
    ariaLabel: 'Read our articles on Medium'
  },
  {
    name: 'X (Twitter)',
    icon: <FaXTwitter />,
    url: 'https://x.com/',
    ariaLabel: 'Follow us on X'
  }
];

const BOTTOM_LINKS = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Legal' },
  { href: '/contact', label: 'Contact' },
];

export default function AiGrowFooter() {
  const [email, setEmail] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState<'success' | 'error' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage('');
    setStatusType('');

    if (!email.trim()) {
      setStatusMessage('Please enter your email address.');
      setStatusType('error');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase() }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) {
        setStatusMessage(result.error || 'Subscription failed. Please try again.');
        setStatusType('error');
      } else {
        setStatusMessage(result.message || 'Subscribed successfully!');
        setStatusType('success');
        setEmail('');
      }
    } catch (error) {
      setStatusMessage('Unable to subscribe right now. Please try again later.');
      setStatusType('error');
      console.error('Subscription error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer
      className="relative bg-[#0B0B0D] overflow-hidden"
      role="contentinfo"
      aria-label="Website footer"
    >
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/foot.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />
      {/* Vignette + top-left glow overlay */}
      <div
        className="pointer-events-none absolute inset-0 bg-[#0B0B0D]/75"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 0% 0%, rgba(180,30,30,0.25), transparent 60%)'
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0B0B0D]/40 via-transparent to-[#0B0B0D]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 md:px-12">

        {/* Brand + tagline */}
        <div className="pt-16 sm:pt-20 pb-12 sm:pb-16 flex flex-col items-center text-center">
          <Image
            src="/januda.png"
            alt="AiGrow"
            width={200}
            height={64}
            className="object-contain brightness-0 invert h-32 sm:h-32 w-auto mb-6"
            priority={false}
          />
          <p className="font-mono text-[11px] sm:text-xs tracking-[0.35em] text-white/40 uppercase max-w-xl">
            Building the software that powers what's next
          </p>
        </div>

        {/* Nav + Social row */}
        <div className="border-t border-white/10 py-7 flex flex-col sm:flex-row items-center justify-between gap-6">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 sm:gap-x-8">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm sm:text-base text-white/60 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3" role="group" aria-label="Social media links">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.name}
                href={social.url}
                aria-label={social.ariaLabel}
                className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#0B0B0D]"
              >
                <span className="text-sm" aria-hidden="true">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter row */}
        <div className="border-t border-white/10 py-9 sm:py-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="md:pr-10 md:border-r md:border-white/10 shrink-0">
            <h3 className="text-white font-semibold text-base sm:text-lg mb-1">
              Stay in the loop
            </h3>
            <p className="text-sm text-white/50">
              Product news &amp; updates &mdash; straight to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleSubscribe}
            className="flex-1 flex flex-col sm:flex-row items-stretch gap-3 max-w-xl"
          >
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input
              id="footer-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 min-w-0 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[#E23B3B]/60 focus:border-[#E23B3B]/60 transition-colors"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="shrink-0 bg-[#E23B3B] hover:bg-[#CC2F2F] text-white text-xs font-bold uppercase tracking-[0.12em] rounded-full px-6 py-3 transition-colors focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-[#0B0B0D] disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {statusMessage && (
            <p className={`mt-3 text-sm ${statusType === 'success' ? 'text-emerald-300' : 'text-rose-300'}`}>
              {statusMessage}
            </p>
          )}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 py-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-white/40">
            © {new Date().getFullYear()} All rights reserved. 
            
          </p>

          <ul className="flex items-center gap-6">
            {BOTTOM_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}