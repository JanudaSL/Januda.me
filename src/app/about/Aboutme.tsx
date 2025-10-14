"use client";

import React from "react";
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
      ease: [0.25, 0.1, 0.25, 1], // replaced string with cubic bezier array for type safety
    },
  },
};

const IBMProductsHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - 3D Voxel Grid */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/footer.png')`,
        }}
      />

      {/* Gradient Overlay - Left Side Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />

      {/* Content Container (animated) */}
      <motion.div
        className="relative z-10 flex items-center h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Main Heading */}
            <motion.h1
              className="text-5xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight"
              variants={itemFadeUp}
            >
              About Me
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-lg"
              variants={itemFadeUp}
            >
              Explore our wide range of quality products tailored to meet your every need
            </motion.p>

            {/* Optional CTA Button */}
            <motion.div className="mt-12" variants={itemFadeUp}>
              {/* keep button area empty as original requested */}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right Accent (Optional IBM Style Element) */}
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-600 rounded-full opacity-60" />
    </section>
  );
};

export default IBMProductsHero;