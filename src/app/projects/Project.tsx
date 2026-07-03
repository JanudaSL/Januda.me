"use client";

import { motion, Variants } from "framer-motion";
import { useState } from "react";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, when: "beforeChildren" } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

function VideoPanel({ className = "", maskSize = "55% 55%" }: { className?: string; maskSize?: string }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        maskImage: `radial-gradient(ellipse ${maskSize} at center, black 30%, transparent 90%)`,
        WebkitMaskImage: `radial-gradient(ellipse ${maskSize} at center, black 30%, transparent 90%)`,
      }}
    >
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/Project.jpg')" }} />
      <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-multiply">
        <video
          src="/sata.mp4"
          poster="/Project.jpg"
          loop
          autoPlay
          muted
          playsInline
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          className={`block object-cover w-full h-full min-h-full transition-opacity duration-700 ease-out ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ imageRendering: "crisp-edges" }}
        />
      </div>
    </div>
  );
}

export default function JanudaProjectsHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Fixed Background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('/Project.jpg')" }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b md:bg-gradient-to-r from-white via-white/90 md:via-white/85 to-white/60 md:to-white/40" />

      <motion.div
        className="relative z-10 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <motion.div
            className="order-1 flex flex-col justify-start pt-24 sm:pt-28 md:pt-24 lg:pt-32 xl:pt-40 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-4 sm:space-y-5 md:space-y-6"
            variants={itemFadeUp}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-gray-900 leading-tight"
              variants={itemFadeUp}
            >
              Projects
            </motion.h1>

            <motion.div className="md:hidden" variants={itemFadeUp}>
              <VideoPanel className="aspect-video max-w-md mx-auto" maskSize="65% 65%" />
            </motion.div>

            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light max-w-md lg:max-w-lg md:mt-16 lg:mt-32 xl:mt-40"
              variants={itemFadeUp}
            >
              Discover a range of innovative software projects designed to solve real-world challenges with precision
            </motion.p>
          </motion.div>

          <motion.div
            className="order-2 hidden md:flex items-center justify-center h-full px-6 lg:px-8 xl:px-12"
            variants={itemFadeUp}
          >
            <VideoPanel className="aspect-video max-w-md lg:max-w-lg xl:max-w-xl" />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
}