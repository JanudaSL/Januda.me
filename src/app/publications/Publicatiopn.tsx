"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      when: "beforeChildren",
    },
  },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export default function JanudaProjectsHero() {
  return (
    <section
      className="relative min-h-[100svh] flex items-center"
      style={{ isolation: "isolate" }}
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="sticky top-0 h-[100svh] w-full">
          <Image
            src="/pub.jpg"
            alt="Publications Background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          {/* Mobile: full-width strong overlay so text is always readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-white/70 md:hidden" />
          {/* Desktop: left-to-right fade */}
          <div className="absolute inset-0 hidden md:block bg-gradient-to-r from-white via-white/90 to-white/20" />
        </div>
      </div>

      {/* Animated Content */}
      <motion.div
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-[100svh]">

          {/* Left Side - Text Content */}
          <motion.div
            className="flex flex-col justify-center md:justify-start
                       pt-safe-top
                       pt-24 sm:pt-28 md:pt-32
                       pb-20 md:pb-0
                       px-5 sm:px-8 lg:px-10 xl:px-14
                       space-y-4 sm:space-y-5 md:space-y-6"
            variants={itemFadeUp}
          >
            <motion.h1
              className="
                text-[clamp(2.25rem,8vw,4.5rem)]
                font-bold text-gray-900 leading-[1.1]
                tracking-tight
              "
              variants={itemFadeUp}
            >
              Publications
            </motion.h1>

            <motion.p
              className="
                text-[clamp(1rem,2.5vw,1.375rem)]
                text-gray-600 leading-relaxed font-light
                max-w-[34ch] sm:max-w-[36ch] md:max-w-[32ch] lg:max-w-[36ch]
              "
              variants={itemFadeUp}
            >
              Explore my collection of insightful blogs tailored to inspire,
              inform, and match your interests.
            </motion.p>
          </motion.div>

          {/* Right Side — bg image shows through */}
          <div className="hidden md:block" />
        </div>
      </motion.div>

      {/* Scroll Indicator — larger touch target on mobile */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center justify-center w-11 h-11 sm:w-auto sm:h-auto"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}