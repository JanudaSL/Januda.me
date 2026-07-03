"use client";
import React from "react";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, when: "beforeChildren" } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const IBMContactHero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image - fixed on desktop, normal scroll on mobile */}
      <div
        className="absolute inset-0 z-0 bg-black bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: `url('/cont.jpeg')` }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b md:bg-gradient-to-r from-black/95 via-black/85 md:via-black/70 to-black/60 md:to-transparent" />

      {/* Content */}
      <motion.div
        className="relative z-10 w-full h-full"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
          <motion.div
            className="order-1 flex flex-col justify-start pt-24 sm:pt-28 md:pt-24 lg:pt-32 xl:pt-40 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 space-y-4 sm:space-y-5 md:space-y-6"
            variants={itemFadeUp}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-bold text-white leading-tight"
              variants={itemFadeUp}
            >
              Contact
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-gray-200 leading-relaxed font-light max-w-md lg:max-w-lg mt-50 sm:mt-6 md:mt-16 lg:mt-32 xl:mt-40"
              variants={itemFadeUp}
            >
              Find solutions to your questions about projects, development, support, and everything I create. Let's collaborate and build something amazing together
            </motion.p>
          </motion.div>

          <div className="order-2 hidden md:block" />
        </div>
      </motion.div>

      {/* IBM Accent Squares */}
      <div className="absolute bottom-8 right-8 flex space-x-2 z-10">
        <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
        <div className="w-3 h-3 bg-blue-500 transform rotate-45 opacity-80"></div>
        <div className="w-3 h-3 bg-blue-400 transform rotate-45 opacity-60"></div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-[1] opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />
    </section>
  );
};

export default IBMContactHero;