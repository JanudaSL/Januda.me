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
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-Width Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
         src="/pub.jpg"
          alt="Januda Projects Background"
          fill
          className="object-cover object-center"
          priority
          quality={90}
        />
      </div>

      {/* Split-Screen Gradient Overlay */}
      <div className="absolute inset-0 z-10">
        <div className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-white via-white/90 to-white/20 md:to-transparent"></div>
        <div className="absolute inset-0 bg-white/10 md:bg-transparent"></div>
      </div>

      {/* Animated Content */}
      <motion.div
        className="relative z-20 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          {/* Left Side - Text Content */}
          <motion.div
            className="flex flex-col justify-start pt-8 sm:pt-12 md:pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6"
            variants={itemFadeUp}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight"
              variants={itemFadeUp}
            >
               Blogs
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-md lg:max-w-lg mt-48"
              variants={itemFadeUp}
            >
              Explore my collection of insightful blogs tailored to inspire, inform, and match your interests.
            </motion.p>

            <motion.div className="pt-4" variants={itemFadeUp}>
              {/* Optional CTA Button */}
              {/* <button className="px-6 py-3 bg-cyan-500 text-white rounded-xl shadow hover:bg-cyan-600 transition">
                Explore Projects
              </button> */}
            </motion.div>
          </motion.div>

          {/* Right Side - Clear Background Image Area */}
          <div className="hidden md:block h-full">
            <div className="relative h-full min-h-screen">
              <div className="absolute top-16 right-8 xl:right-12"></div>
              <div className="absolute bottom-24 right-16 xl:right-20"></div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
