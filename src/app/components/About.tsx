"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, Variants } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   DESIGN
   Luxury / Editorial / Resort-inspired typography
   Main type → Josefin Sans Light
   Labels   → Montserrat Medium
   Body     → Josefin Sans Light
───────────────────────────────────────────────────────────── */

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
};

const FOCUS_AREAS = [
  "Software Engineering",
  "Problem Solving",
  "Innovation",
  "Continuous Learning",
];

/* ─────────────────────────────────────────────────────────────
   Animation
───────────────────────────────────────────────────────────── */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function AboutJanuda() {
  const content = useScrollReveal(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500&family=Montserrat:wght@400;500;600&display=swap');

        /* ─────────────────────────────────────────────
           LUXURY TYPOGRAPHY
        ───────────────────────────────────────────── */

        .font-luxury {
          font-family: 'Josefin Sans', sans-serif;
        }

        .font-label {
          font-family: 'Montserrat', sans-serif;
        }

        /* Tags */
        .tag {
          border: 1px solid #E6E4DF;
          transition:
            border-color 0.25s ease,
            background 0.25s ease,
            transform 0.25s ease;
        }

        .tag:hover {
          border-color: #E8A33D;
          background: #FBF3E7;
          transform: translateY(-2px);
        }

        /* ─────────────────────────────────────────────
           PHOTO FADE
        ───────────────────────────────────────────── */

        .about-photo {
          -webkit-mask-image: none;
          mask-image: none;
        }

        @media (min-width: 1024px) {
          .about-photo {
            -webkit-mask-image: linear-gradient(
              to right,
              black 0%,
              black 58%,
              rgba(0,0,0,0.85) 66%,
              rgba(0,0,0,0.55) 76%,
              rgba(0,0,0,0.25) 88%,
              transparent 100%
            );

            mask-image: linear-gradient(
              to right,
              black 0%,
              black 58%,
              rgba(0,0,0,0.85) 66%,
              rgba(0,0,0,0.55) 76%,
              rgba(0,0,0,0.25) 88%,
              transparent 100%
            );

            -webkit-mask-repeat: no-repeat;
            mask-repeat: no-repeat;

            -webkit-mask-size: 100% 100%;
            mask-size: 100% 100%;
          }
        }

        /* ─────────────────────────────────────────────
           REDUCED MOTION
        ───────────────────────────────────────────── */

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          ABOUT SECTION
      ========================================================= */}

      <section className="w-full bg-[#FAFAF8]">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:min-h-[80vh]">

          {/* =====================================================
              IMAGE — LEFT
          ===================================================== */}

          <div
            className="
              order-1
              lg:order-1
              w-full
              h-[38vh]
              xs:h-[42vh]
              sm:h-[50vh]
              lg:h-auto
              relative
              overflow-hidden
            "
          >
            {/* Sharpen filter */}
            <svg
              width="0"
              height="0"
              style={{
                position: "absolute",
              }}
            >
              <filter id="sharpenAbout">
                <feConvolveMatrix
                  order="3"
                  kernelMatrix="0 -0.4 0 -0.4 2.6 -0.4 0 -0.4 0"
                  divisor="1"
                  edgeMode="duplicate"
                  preserveAlpha="true"
                />
              </filter>
            </svg>

            <motion.img
              src="/cvr2.jpg"
              alt="Januda J"
              className="about-photo w-full h-full object-cover"
              initial={{
                opacity: 0,
                scale: 1.18,
                filter: "blur(14px)",
              }}
              animate={{
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }}
              transition={{
                duration: 1.5,
                ease: [0.16, 1, 0.3, 1] as const,
              }}
              style={{
                objectPosition: "50% 15%",
                filter: "url(#sharpenAbout)",
              }}
            />

            {/* Image blend */}
            <div
              className="
                hidden
                lg:block
                pointer-events-none
                absolute
                inset-y-0
                right-0
                w-[42%]
              "
              style={{
                background:
                  "linear-gradient(to right, transparent 0%, rgba(250,250,248,0) 30%, rgba(250,250,248,0.5) 60%, #FAFAF8 100%)",
              }}
            />
          </div>

          {/* =====================================================
              CONTENT — RIGHT
          ===================================================== */}

          <div className="order-2 lg:order-2 flex items-center">
            <motion.div
              ref={content.ref}
              variants={containerVariants}
              initial="hidden"
              animate={content.visible ? "visible" : "hidden"}
              className="
                w-full
                px-5
                sm:px-12
                lg:px-16
                py-8
                sm:py-12
                lg:py-0
                max-w-xl
              "
            >

              {/* =================================================
                  EYEBROW
              ================================================= */}

              <motion.p
                variants={itemVariants}
                className="
                  font-label
                  text-[10px]
                  sm:text-xs
                  font-medium
                  tracking-[0.24em]
                  uppercase
                  text-[#6E8C6A]
                  mb-4
                "
              >
                ABOUT
              </motion.p>

              {/* =================================================
                  NAME
              ================================================= */}

              <motion.h1
                variants={itemVariants}
                className="
                  font-luxury
                  text-[42px]
                  xs:text-[48px]
                  sm:text-[60px]
                  lg:text-[72px]
                  font-light
                  tracking-[0.025em]
                  text-[#0E1116]
                  leading-[0.95]
                  mb-4
                "
              >
                Januda{" "}
                <span className="text-[#E8A33D]">
                  J
                </span>
              </motion.h1>

              {/* =================================================
                  TAGLINE
              ================================================= */}

              <motion.p
                variants={itemVariants}
                className="
                  font-luxury
                  text-sm
                  sm:text-base
                  lg:text-[17px]
                  text-[#6B7280]
                  font-light
                  tracking-[0.08em]
                  mb-7
                "
              >
                Software Engineer
                <span className="mx-2 text-[#B7B7B2]">
                  ·
                </span>
                Lifelong Learner
              </motion.p>

              {/* =================================================
                  DIVIDER
              ================================================= */}

              <motion.div
                variants={itemVariants}
                className="
                  h-px
                  bg-[#E6E4DF]
                  mb-7
                  sm:mb-8
                  origin-left
                "
              />

              {/* =================================================
                  DESCRIPTION
              ================================================= */}

              <motion.p
                variants={itemVariants}
                className="
                  font-luxury
                  text-[15px]
                  sm:text-[17px]
                  lg:text-[18px]
                  text-[#374151]
                  font-light
                  tracking-[0.025em]
                  leading-[1.75]
                  mb-7
                  sm:mb-8
                "
              >
                I'm a software engineer who loves building things
                that matter. Curious by nature, I'm always exploring
                new technologies, sharpening my skills, and pushing
                myself to grow — both as an engineer and a lifelong
                learner.
              </motion.p>

              {/* =================================================
                  QUOTE
              ================================================= */}

              <motion.p
                variants={itemVariants}
                className="
                  font-luxury
                  text-sm
                  sm:text-[15px]
                  text-[#6B7280]
                  font-light
                  italic
                  tracking-[0.025em]
                  leading-relaxed
                  mb-7
                  sm:mb-8
                "
              >
                "If we can change the way we see the world, we can
                change the world we see."
              </motion.p>

              {/* =================================================
                  FOCUS TAGS
              ================================================= */}

              <motion.div
                variants={itemVariants}
                className="
                  flex
                  flex-wrap
                  gap-2
                  mb-6
                  sm:mb-8
                "
              >
                {FOCUS_AREAS.map((f) => (
                  <span
                    key={f}
                    className="
                      tag
                      rounded-full
                      px-3
                      sm:px-3.5
                      py-1.5
                      font-label
                      text-[10px]
                      sm:text-xs
                      font-medium
                      tracking-[0.05em]
                      text-[#0E1116]
                    "
                  >
                    {f}
                  </span>
                ))}
              </motion.div>

              {/* =================================================
                  END
              ================================================= */}

              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2.5"
              />

            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}