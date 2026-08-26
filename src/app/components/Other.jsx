"use client";

import React from "react";

export default function VegaInnovationsHeader() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] flex flex-col overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500&family=Montserrat:wght@400;500;600&display=swap');

        .font-luxury {
          font-family: 'Josefin Sans', sans-serif;
        }

        .font-label {
          font-family: 'Montserrat', sans-serif;
        }

        .nav-link {
          position: relative;
          transition:
            color 0.3s ease,
            letter-spacing 0.3s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 0;
          height: 1px;
          background: #E8A33D;
          transition: width 0.3s ease;
        }

        .nav-link:hover {
          color: #0E1116;
          letter-spacing: 0.12em;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .logo-image {
          transition:
            transform 0.5s ease,
            filter 0.5s ease;
        }

        .logo-image:hover {
          transform: scale(1.04);
        }

        .brand-name {
          letter-spacing: 0.38em;
        }

        .tagline {
          letter-spacing: 0.055em;
        }

        @media (max-width: 640px) {
          .brand-name {
            letter-spacing: 0.28em;
          }
        }
      `}</style>

      {/* Main Content Container */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-5 sm:px-8 py-12 sm:py-16">

        {/* Tagline */}
        <div className="text-center mb-14 sm:mb-16 max-w-4xl">
          <h1
            className="
              font-luxury
              text-[32px]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-light
              text-[#374151]
              leading-[1.15]
              tracking-[0.025em]
            "
          >
            "Powering An Extraordinary Future
          </h1>

          <h2
            className="
              font-luxury
              text-[32px]
              sm:text-4xl
              md:text-5xl
              lg:text-6xl
              font-light
              text-[#374151]
              leading-[1.15]
              tracking-[0.025em]
              mt-2
            "
          >
            With Infinite Possibilities"
          </h2>
        </div>

        {/* Logo and Company Name */}
        <div className="flex flex-col items-center mb-14 sm:mb-16">

          {/* Company Logo */}
          <div className="mb-6 relative">
            <img
              src="/jv.png"
              alt="JANUDA Logo"
              className="
                logo-image
                w-32
                h-32
                sm:w-36
                sm:h-36
                md:w-40
                md:h-40
                object-contain
              "
            />
          </div>

          {/* Company Name */}
          <div className="text-center">

            <h3
              className="
                font-luxury
                brand-name
                text-2xl
                sm:text-3xl
                md:text-4xl
                font-light
                text-[#0E1116]
                mb-3
              "
            >
              J A N U D A
            </h3>

            <p
              className="
                font-label
                text-[9px]
                sm:text-sm
                md:text-base
                text-[#6B7280]
                tracking-[0.3em]
                font-medium
              "
            >
              INFINITE IMAGINATION
            </p>

          </div>
        </div>

        {/* Navigation Menu */}
        <nav
          className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-x-5
            gap-y-5
            sm:gap-x-8
            md:gap-x-12
            lg:gap-x-16
            text-[#6B7280]
          "
        >
          <a
            href="#"
            className="
              nav-link
              font-label
              text-[11px]
              sm:text-sm
              md:text-base
              font-medium
              tracking-[0.08em]
              pb-1
            "
          >
            AXIONIX
          </a>

          <div className="w-px h-5 sm:h-6 bg-[#D5D3CE]" />

          <a
            href="https://axionixx.netlify.app/"
            className="
              nav-link
              font-label
              text-[11px]
              sm:text-sm
              md:text-base
              font-medium
              tracking-[0.08em]
              pb-1
            "
          >
            EcoGreen360
          </a>

          <div className="w-px h-5 sm:h-6 bg-[#D5D3CE]" />

          <a
            href="https://axentrajk.netlify.app/"
            className="
              nav-link
              font-label
              text-[11px]
              sm:text-sm
              md:text-base
              font-medium
              tracking-[0.08em]
              pb-1
            "
          >
            Axentra
          </a>

          <div className="w-px h-5 sm:h-6 bg-[#D5D3CE]" />

          <a
            href="https://neurajk.netlify.app/"
            className="
              nav-link
              font-label
              text-[11px]
              sm:text-sm
              md:text-base
              font-medium
              tracking-[0.08em]
              pb-1
            "
          >
            Neura Studio
          </a>
        </nav>
      </div>

      {/* Decorative curved element */}
      <div
        className="
          absolute
          top-0
          left-0
          w-64
          h-64
          opacity-[0.08]
          pointer-events-none
        "
      >
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <path
            d="M0,0 Q100,50 0,200 L0,0 Z"
            fill="currentColor"
            className="text-[#6B7280]"
          />
        </svg>
      </div>

      {/* Subtle bottom decorative line */}
      <div
        className="
          absolute
          bottom-8
          left-1/2
          -translate-x-1/2
          w-16
          h-px
          bg-[#E6E4DF]
        "
      />
    </div>
  );
}