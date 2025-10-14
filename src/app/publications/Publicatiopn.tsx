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

export default function IBMProductsHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image - 3D Voxel Grid */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Pub.jpg" // Make sure this image exists in the "public" folder
          alt="IBM Blogs Background"
          fill
          style={{ objectFit: "cover", objectPosition: "center" }} // use style instead of className for fill images
          priority
          quality={90}
        />
      </div>

      {/* Gradient Overlay - Left Side Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-transparent" />

      {/* Animated Content */}
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
              Blogs
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-xl lg:text-2xl text-gray-700 leading-relaxed font-light max-w-lg"
              variants={itemFadeUp}
            >
              Explore my collection of insightful blogs tailored to inspire, inform, and match your interests.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Bottom Right Accent (Optional IBM Style Element) */}
      <div className="absolute bottom-8 right-8 w-4 h-4 bg-blue-600 rounded-full opacity-60" />
    </section>
  );
}
