"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
// direction and dial parallax intensity down for touch devices.
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
  // subtle parallax: image drifts a little slower than the page scroll,
  // and gets a faint scale-in as it enters the viewport.
  // On mobile the drift is dialed way down — big translateY parallax on a
  // full-width stacked image reads as jank on touch scroll, not polish.
  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    isDesktop ? ["-6%", "6%"] : ["-2%", "2%"]
  );
  const imageScale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isDesktop ? [1.06, 1, 1.06] : [1.02, 1, 1.02]
  );

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Desktop: fades the LEFT edge into the content column (image now sits on
  // the right, content on the left — so the fade has to ease in from the
  // left side of the image instead of the right).
  // Mobile/tablet: fades the bottom edge into the content below (stacked layout).
  const desktopMask =
    "linear-gradient(to left, black 0%, black 38%, rgba(0,0,0,0.92) 48%, rgba(0,0,0,0.75) 58%, rgba(0,0,0,0.55) 68%, rgba(0,0,0,0.36) 78%, rgba(0,0,0,0.2) 88%, rgba(0,0,0,0.08) 95%, transparent 100%)";
  const mobileMask =
    "linear-gradient(to bottom, black 0%, black 58%, rgba(0,0,0,0.9) 68%, rgba(0,0,0,0.68) 78%, rgba(0,0,0,0.42) 87%, rgba(0,0,0,0.18) 94%, transparent 100%)";
  const portraitMask = isDesktop ? desktopMask : mobileMask;

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
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">
          {/* Content — skills + tools. Now the LEFT column on desktop (order-1),
              stacks BELOW the image on mobile (order-2) so the image still
              reads first on a phone-width layout. */}
          <div className="order-2 lg:order-1 flex items-center">
            <div
              ref={content.ref}
              className={`reveal ${content.visible ? "visible" : ""} w-full px-5 sm:px-12 lg:px-16 py-10 sm:py-12 lg:py-16`}
            >
              <p className="font-sans-brand text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase text-[#6E8C6A] mb-3 sm:mb-4">
                CAPABILITIES
              </p>

              <h2 className="font-display-brand text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#0E1116] leading-[0.95] mb-3 sm:mb-4">
                My <span className="text-[#E8A33D]">Skills</span>
              </h2>

              <p className="font-sans-brand text-sm sm:text-base lg:text-lg text-[#6B7280] font-normal mb-6 sm:mb-8">
                Tools and technologies I work with to build amazing things.
              </p>

              <div className="h-px bg-[#E6E4DF] mb-2" />

              {isMounted && (
                <>
                  {/* Skills Row */}
                  <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6">
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
                  </div>

                  <div className="h-px bg-[#E6E4DF] my-2" />

                  {/* Tools Row (Opposite Direction) */}
                  <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-6">
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
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Image — full bleed, now the RIGHT column on desktop (order-2)
              but still shows FIRST on mobile/tablet (order-1) since the
              layout stacks there.
              Desktop: right side stays fully sharp; only the LEFT edge eases
              into the content column via a multi-stop mask curve.
              Mobile/tablet: the layout stacks, so the fade stays on the
              bottom edge, easing the portrait into the content below it.
              A soft paper-colored gradient overlay sits on top for extra
              blend, and a gentle scroll parallax gives it depth (toned
              down on touch devices). */}
          <div className="order-1 lg:order-2 w-full aspect-[4/5] sm:aspect-[16/10] lg:aspect-auto lg:h-auto relative overflow-hidden bg-[#FAFAF8]">
            <motion.img
              src="/jpur.jpeg"
              alt="Januda J"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.15 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                objectPosition: "50% 20%",
                filter: "contrast(1.08) saturate(1.08) brightness(1.01)",
                y: imageY,
                scale: imageScale,
                WebkitMaskImage: portraitMask,
                maskImage: portraitMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
              }}
            />
            {/* Extra blend layer — catches any residual hard edge from the mask
                and melts it into the page background for a seamless finish.
                On desktop this now washes in from the LEFT side (toward the
                content column); on mobile/tablet it stays a bottom-side wash. */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] lg:inset-y-0 lg:left-0 lg:right-auto lg:bottom-auto lg:h-auto lg:w-[58%]"
              style={{
                background: isDesktop
                  ? "linear-gradient(to left, transparent 0%, rgba(250,250,248,0) 22%, rgba(250,250,248,0.12) 40%, rgba(250,250,248,0.32) 58%, rgba(250,250,248,0.58) 74%, rgba(250,250,248,0.82) 88%, #FAFAF8 100%)"
                  : "linear-gradient(to bottom, transparent 0%, rgba(250,250,248,0) 22%, rgba(250,250,248,0.12) 40%, rgba(250,250,248,0.32) 58%, rgba(250,250,248,0.58) 74%, rgba(250,250,248,0.82) 88%, #FAFAF8 100%)",
              }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;