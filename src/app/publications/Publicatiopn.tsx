"use client";

import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, when: "beforeChildren" } },
};

const itemFadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

export default function PublicationsHero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
        style={{ backgroundImage: "url('/pub.jpg')" }}
      />

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
              Publications
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl text-gray-700 leading-relaxed font-light max-w-md lg:max-w-lg md:mt-16 lg:mt-32 xl:mt-40"
              variants={itemFadeUp}
            >
              Explore my collection of insightful blogs tailored to inspire, inform, and match your interests
            </motion.p>
          </motion.div>

          <div className="order-2 hidden md:block" />
        </div>
      </motion.div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}