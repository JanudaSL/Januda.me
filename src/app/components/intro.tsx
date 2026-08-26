"use client";

import { motion } from "framer-motion";
import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function ProfileHeroSection() {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram className="w-[18px] h-[18px]" />,
      url: "https://www.instagram.com/januda_j_kodithuwakku_/",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-[18px] h-[18px]" />,
      url: "https://web.facebook.com/Januda.J.Kodithuwakku/",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-[18px] h-[18px]" />,
      url: "https://www.linkedin.com/in/januda-kodithuwakku/",
    },
  ];

  return (
    <section className="relative w-full bg-[#FAFAF8] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;500&family=Montserrat:wght@400;500;600&display=swap');

        .font-luxury {
          font-family: 'Josefin Sans', sans-serif;
        }

        .font-label {
          font-family: 'Montserrat', sans-serif;
        }

        .social-link {
          transition:
            color 0.3s ease,
            border-color 0.3s ease,
            background 0.3s ease,
            transform 0.3s ease;
        }

        .social-link:hover {
          color: #E8A33D;
          border-color: #E8A33D;
          background: #FBF3E7;
        }

        .watermark-image {
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 25%,
            black 70%,
            transparent 100%
          );

          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 25%,
            black 70%,
            transparent 100%
          );
        }
      `}</style>

      {/* =====================================================
          WATERMARK IMAGE
      ===================================================== */}

      <motion.img
        src="/abt.png"
        alt=""
        aria-hidden="true"
        initial={{
          opacity: 0,
          scale: 1.05,
        }}
        whileInView={{
          opacity: 0.10,
          scale: 1,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="
          watermark-image
          pointer-events-none
          absolute
          right-[-30px]
          sm:right-[-10px]
          lg:right-[30px]
          top-1/2
          -translate-y-1/2
          w-[240px]
          sm:w-[280px]
          lg:w-[320px]
          xl:w-[360px]
          h-auto
          object-contain
          grayscale
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="
          relative
          z-10
          max-w-6xl
          mx-auto
          px-5
          sm:px-8
          lg:px-12
          py-12
          sm:py-16
          lg:py-20
        "
      >
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-20">

          {/* =====================================================
              LEFT — TEXT CONTENT
          ===================================================== */}

          <div className="flex-1 max-w-3xl">

            {/* Small label */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="
                font-label
                text-[10px]
                sm:text-xs
                font-medium
                tracking-[0.24em]
                uppercase
                text-[#6E8C6A]
                mb-5
              "
            >
              PERSONAL PHILOSOPHY
            </motion.p>

            {/* Main paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                font-luxury
                font-light
                text-[#374151]
                text-[17px]
                sm:text-[19px]
                lg:text-[21px]
                leading-[1.75]
                tracking-[0.025em]
              "
            >
              I am driven by{" "}
              <span className="text-[#0E1116] font-normal">
                new technologies
              </span>
              , inspiring people and motivating teams as a leader to
              achieve goals. I believe that if we can{" "}
              <span className="text-[#0E1116] font-normal">
                change the way we see the world
              </span>
              , we can{" "}
              <span className="text-[#0E1116] font-normal">
                change the world we see
              </span>
              .
            </motion.p>

            {/* Divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.8,
                delay: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                origin-left
                h-px
                bg-[#E6E4DF]
                w-full
                mt-9
                mb-7
              "
            />

            {/* Social section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: 0.35,
              }}
              className="flex flex-col sm:flex-row sm:items-center gap-5"
            >
              {/* Label */}
              <div className="flex items-center gap-4">
                <span
                  className="
                    font-label
                    font-medium
                    uppercase
                    tracking-[0.22em]
                    text-[10px]
                    sm:text-xs
                    text-[#6B7280]
                    whitespace-nowrap
                  "
                >
                  Follow Me
                </span>

                <div className="hidden sm:block w-10 h-px bg-[#D8D6D1]" />
              </div>

              {/* Social icons */}
              <div className="flex gap-2.5">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.94,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="
                      social-link
                      w-10
                      h-10
                      flex
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#E0DED9]
                      text-[#6B7280]
                      bg-transparent
                    "
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}