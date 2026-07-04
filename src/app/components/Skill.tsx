"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import {
  SiNextdotjs,
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiRedux,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiGit,
  SiFirebase,
  SiSass,
  SiOpenjdk, // Java
  SiPython, // Python
  SiHtml5,
  SiCss3,
  SiAngular,
  SiLaravel,
  SiPhp,
  SiSpringboot,

  SiIntellijidea,
  SiEclipseide,
  SiPycharm,

  SiYarn,
  SiNpm,

  SiGooglecloud,
  SiKubernetes,
  SiFigma,
  SiAdobe,
  SiSketch,
  SiPostman,
  SiInsomnia,
  SiSwagger,
  SiJira,
} from "react-icons/si";

import {
  FaGithub,
  FaGitlab,
  FaJenkins,
  FaSlack,
  FaTrello,

  FaDocker,
} from "react-icons/fa";

/* ── design tokens (matches the About section) ─────────────────
   ink    #0E1116  text
   paper  #FAFAF8  page background
   line   #E6E4DF  hairlines
   muted  #6B7280  secondary text
   amber  #E8A33D  identity / accent
   sage   #6E8C6A  eyebrow labels, status
------------------------------------------------------------------ */

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
}

// Tracks the lg breakpoint (1024px) so we can flip the portrait's fade
// direction and dial parallax intensity down for touch devices, and so
// we know when it's safe to skip mounting the video entirely.
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop;
}

const Skills = () => {
  const [isMounted, setIsMounted] = useState(false);
  const content = useScrollReveal(0.1);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // subtle parallax: media drifts a little slower than the page scroll,
  // and gets a faint scale-in as it enters the viewport. Only relevant on
  // desktop now since the media block doesn't render at all below lg.
  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1.06, 1, 1.06]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Blocks right-click / context menu on the video only — a basic
  // deterrent against "Save video as...". Not bulletproof (DevTools /
  // Network tab can still reveal the src), but stops the casual path.
  const handleVideoContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    return false;
  };

  const skills = [
    // Core Programming Languages
    { icon: <SiJavascript />, label: "JavaScript", color: "text-[#F7DF1E]" },
    { icon: <SiTypescript />, label: "TypeScript", color: "text-[#3178C6]" },
    { icon: <SiOpenjdk />, label: "Java", color: "text-[#007396]" },
    { icon: <SiPython />, label: "Python", color: "text-[#3776AB]" },
    { icon: <SiPhp />, label: "PHP", color: "text-[#777BB4]" },

    // Frontend Technologies
    { icon: <SiHtml5 />, label: "HTML5", color: "text-[#E34F26]" },
    { icon: <SiCss3 />, label: "CSS3", color: "text-[#1572B6]" },
    { icon: <SiReact />, label: "React.js", color: "text-[#61DAFB]" },
    { icon: <SiNextdotjs />, label: "Next.js", color: "text-[#0E1116]" },
    { icon: <SiAngular />, label: "Angular", color: "text-[#DD0031]" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS", color: "text-[#06B6D4]" },
    { icon: <SiSass />, label: "Sass", color: "text-[#CC6699]" },

    // Backend & Frameworks
    { icon: <SiNodedotjs />, label: "Node.js", color: "text-[#68A063]" },
    { icon: <SiExpress />, label: "Express", color: "text-[#0E1116]" },
    { icon: <SiSpringboot />, label: "Spring Boot", color: "text-[#6DB33F]" },
    { icon: <SiLaravel />, label: "Laravel", color: "text-[#FF2D20]" },

    // State Management
    { icon: <SiRedux />, label: "Redux", color: "text-[#764ABC]" },

    // Databases
    { icon: <SiMysql />, label: "MySQL", color: "text-[#4479A1]" },
    { icon: <SiMongodb />, label: "MongoDB", color: "text-[#47A248]" },
    { icon: <SiPostgresql />, label: "PostgreSQL", color: "text-[#4169E1]" },

    // Tools & Services
    { icon: <SiDocker />, label: "Docker", color: "text-[#2496ED]" },
    { icon: <SiGit />, label: "Git", color: "text-[#F05032]" },
    { icon: <SiFirebase />, label: "Firebase", color: "text-[#FFCA28]" },
  ];

  const tools = [
    { label: "IntelliJ IDEA", icon: <SiIntellijidea /> },
    { label: "Eclipse", icon: <SiEclipseide /> },
    { label: "PyCharm", icon: <SiPycharm /> },

    { label: "Yarn", icon: <SiYarn /> },
    { label: "npm", icon: <SiNpm /> },
    { label: "pip", icon: <SiPython /> },

    { label: "Google Cloud", icon: <SiGooglecloud /> },
    { label: "Jenkins", icon: <FaJenkins /> },
    { label: "GitHub Actions", icon: <FaGithub /> },
    { label: "GitLab CI/CD", icon: <FaGitlab /> },
    { label: "Kubernetes", icon: <SiKubernetes /> },
    { label: "Docker Compose", icon: <FaDocker /> },
    { label: "Figma", icon: <SiFigma /> },
    { label: "Adobe XD", icon: <SiAdobe /> },
    { label: "Sketch", icon: <SiSketch /> },
    { label: "Postman", icon: <SiPostman /> },
    { label: "Insomnia", icon: <SiInsomnia /> },
    { label: "Swagger / OpenAPI", icon: <SiSwagger /> },
    { label: "Jira", icon: <SiJira /> },
    { label: "Trello", icon: <FaTrello /> },

    { label: "Slack", icon: <FaSlack /> },
  ];

  // Desktop-only mask now (mobile/tablet never render this block at all).
  // Fades the LEFT edge of the media into the content column with a dense
  // multi-stop curve so it overlaps smoothly with the blend overlay below
  // instead of leaving a visible seam.
  const desktopMask =
    "linear-gradient(to left, black 0%, black 30%, rgba(0,0,0,0.96) 40%, rgba(0,0,0,0.88) 50%, rgba(0,0,0,0.72) 60%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.4) 76%, rgba(0,0,0,0.26) 83%, rgba(0,0,0,0.14) 90%, rgba(0,0,0,0.05) 96%, transparent 100%)";

  // Staggered entrance: eyebrow → heading → subcopy → divider → rows each
  // ease in slightly after the one before, instead of the whole block
  // popping in at once.
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.12, delayChildren: 0.08 },
    },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 22 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <>
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=Inter:wght@300;400;500;600;700&display=swap");

        .font-sans-brand {
          font-family: "IBM Plex Sans", system-ui, sans-serif;
        }
        .font-display-brand {
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .reveal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }

        @keyframes scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 30s linear infinite;
        }
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .animate-scroll,
          .animate-scroll-reverse {
            animation: none !important;
          }
        }
      `}</style>

      {/* Full viewport width, no max-w wrapper — matches the About section's full bleed */}
      <section
        id="skills"
        ref={sectionRef}
        className="w-full bg-[#FAFAF8] font-sans-brand"
      >
        {/* Single column on mobile/tablet (media block is hidden entirely
            below lg, so there's no leftover grid track eating space) —
            two columns on desktop with content on the left, media on the
            right. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:min-h-screen">
          {/* Content — skills + tools. */}
          <div className="flex items-center">
            <motion.div
              ref={content.ref}
              variants={containerVariants}
              initial="hidden"
              animate={content.visible ? "visible" : "hidden"}
              className="w-full px-5 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-16"
            >
              <motion.p
                variants={itemVariants}
                className="font-sans-brand text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#6E8C6A] mb-3 sm:mb-4"
              >
                CAPABILITIES
              </motion.p>

              <motion.h2
                variants={itemVariants}
                className="font-display-brand text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#0E1116] leading-[0.95] mb-3 sm:mb-4"
              >
                My <span className="text-[#E8A33D]">Skills</span>
              </motion.h2>

              <motion.p
                variants={itemVariants}
                className="font-sans-brand text-sm sm:text-base lg:text-lg text-[#6B7280] font-normal mb-6 sm:mb-8"
              >
                Tools and technologies I work with to build amazing things.
              </motion.p>

              <motion.div
                variants={itemVariants}
                className="h-px bg-[#E6E4DF] mb-2 origin-left"
              />

              {isMounted && (
                <>
                  {/* Skills Row */}
                  <motion.div
                    variants={itemVariants}
                    className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6"
                  >
                    <div className="animate-scroll flex items-center space-x-8 sm:space-x-10 whitespace-nowrap">
                      {skills.map((skill, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2.5 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <div className={`text-3xl sm:text-4xl ${skill.color}`}>
                            {skill.icon}
                          </div>
                          <span className="font-sans-brand text-sm sm:text-base font-medium text-[#0E1116]">
                            {skill.label}
                          </span>
                        </div>
                      ))}
                      {skills.map((skill, index) => (
                        <div
                          key={`dup-${index}`}
                          className="flex items-center space-x-2.5 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <div className={`text-3xl sm:text-4xl ${skill.color}`}>
                            {skill.icon}
                          </div>
                          <span className="font-sans-brand text-sm sm:text-base font-medium text-[#0E1116]">
                            {skill.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent z-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent z-20" />
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="h-px bg-[#E6E4DF] my-2 origin-left"
                  />

                  {/* Tools Row (Opposite Direction) */}
                  <motion.div
                    variants={itemVariants}
                    className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6"
                  >
                    <div className="animate-scroll-reverse flex items-center space-x-8 sm:space-x-10 whitespace-nowrap">
                      {tools.map((tool, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2.5 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <div className="text-3xl sm:text-4xl text-[#6B7280]">
                            {tool.icon}
                          </div>
                          <span className="font-sans-brand text-sm sm:text-base font-medium text-[#0E1116]">
                            {tool.label}
                          </span>
                        </div>
                      ))}
                      {tools.map((tool, index) => (
                        <div
                          key={`dup-${index}`}
                          className="flex items-center space-x-2.5 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                        >
                          <div className="text-3xl sm:text-4xl text-[#6B7280]">
                            {tool.icon}
                          </div>
                          <span className="font-sans-brand text-sm sm:text-base font-medium text-[#0E1116]">
                            {tool.label}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent z-20" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#FAFAF8] via-[#FAFAF8]/80 to-transparent z-20" />
                  </motion.div>
                </>
              )}
            </motion.div>
          </div>

          {/* Media — DESKTOP ONLY. Completely hidden below the lg breakpoint
              (no reserved height, no aspect-ratio box, nothing) so mobile
              and tablet layouts have zero leftover space where the video
              used to be. On desktop it renders as before: video plays,
              right-click/save is disabled, left edge eases into the
              content column via mask + blend overlay. */}
          <div className="hidden lg:block lg:order-2 w-full h-auto relative overflow-hidden bg-[#FAFAF8]">
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.18, filter: "blur(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] as const }}
              style={{
                y: imageY,
                scale: imageScale,
                WebkitMaskImage: desktopMask,
                maskImage: desktopMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            >
              {isMounted && (
                <div
                  className="absolute inset-0"
                  onContextMenu={handleVideoContextMenu}
                >
                  <video
                    src="https://io.webcdn.surge.global/2024-11-05/Technology/H264/Cloud+ComputingcompressedH264.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls={false}
                    disablePictureInPicture
                    draggable={false}
                    
                    controlsList="nodownload noremoteplayback noplaybackrate"
                    onContextMenu={handleVideoContextMenu}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "150vw",
                      height: "150vh",
                      objectFit: "cover",
                      objectPosition: "50% 20%",
                      transform: "translate(-50%, -50%) rotate(-90deg)",
                      filter: "contrast(1.08) saturate(1.08) brightness(1.01)",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Invisible click-catcher on top of the video so any
                      click/right-click resolves against this div (which has
                      its own onContextMenu guard) instead of the <video>
                      element's native context menu. */}
                  <div
                    className="absolute inset-0"
                    onContextMenu={handleVideoContextMenu}
                    style={{ background: "transparent" }}
                  />
                </div>
              )}
            </motion.div>

            {/* Extra blend layer — melts the mask's edge into the page
                background, washing in from the LEFT toward the content
                column. Stops mirror the mask curve above so the two
                overlap smoothly with no visible seam. */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 right-auto h-auto w-[65%]"
              style={{
                background:
                  "linear-gradient(to left, transparent 0%, rgba(250,250,248,0) 18%, rgba(250,250,248,0.08) 30%, rgba(250,250,248,0.2) 42%, rgba(250,250,248,0.36) 54%, rgba(250,250,248,0.54) 65%, rgba(250,250,248,0.72) 75%, rgba(250,250,248,0.88) 85%, #FAFAF8 100%)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;