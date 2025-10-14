"use client";
import React from "react";
import { motion } from "framer-motion";

const IBMContactHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{
          backgroundImage: `url('/cont.jpeg')`,
        }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex items-center h-full">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-light text-white mb-8 tracking-tight leading-tight">
              Contact <span className="font-semibold text-blue-400"></span>
            </h1>

            {/* Description */}
            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed font-light max-w-lg mb-12">
              Find solutions to your questions about projects, development,
              support, and everything I create. Let’s collaborate and build
              something amazing together.
            </p>

            {/* CTA Button */}
            
          </motion.div>
        </div>
      </div>

      {/* IBM Accent Squares */}
      <div className="absolute bottom-8 right-8 flex space-x-2">
        <div className="w-3 h-3 bg-blue-600 transform rotate-45"></div>
        <div className="w-3 h-3 bg-blue-500 transform rotate-45 opacity-80"></div>
        <div className="w-3 h-3 bg-blue-400 transform rotate-45 opacity-60"></div>
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "22px 22px",
        }}
      />
    </section>
  );
};

export default IBMContactHero;
