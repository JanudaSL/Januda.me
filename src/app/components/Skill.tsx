"use client";
import { useEffect, useState } from "react";
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

const Skills = () => {
  const [isMounted, setIsMounted] = useState(false);

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
    { icon: <SiNextdotjs />, label: "Next.js", color: "text-black" },
    { icon: <SiAngular />, label: "Angular", color: "text-[#DD0031]" },
    { icon: <SiTailwindcss />, label: "Tailwind CSS", color: "text-[#06B6D4]" },
    { icon: <SiSass />, label: "Sass", color: "text-[#CC6699]" },

    // Backend & Frameworks
    { icon: <SiNodedotjs />, label: "Node.js", color: "text-[#68A063]" },
    { icon: <SiExpress />, label: "Express", color: "text-black" },
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

  return (
    <>
      <style jsx>{`
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
      `}</style>

      <section
        id="skills"
        className="py-16 bg-white flex items-center justify-center min-h-screen"
      >
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-20">
          {/* Title Section */}
          <h2 className="text-4xl md:text-5xl tracking-wide font-extrabold text-center text-gray-900 mb-4">
            My Skills
          </h2>
          <p className="font-mono tracking-wide text-center text-gray-600 text-lg mb-2">
            Tools and technologies I work with to build amazing things.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-10 rounded-full"></div>

          {isMounted && (
            <>
              {/* Skills Row */}
              <div className="relative flex w-full mt-10 flex-col items-center justify-center overflow-hidden py-10">
                <div className="animate-scroll flex items-center space-x-12 sm:space-x-16 whitespace-nowrap">
                  {skills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 flex-shrink-0 skill-card hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <div
                        className={`text-5xl sm:text-6xl ${skill.color} drop-shadow-lg`}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-base sm:text-xl font-medium text-gray-800">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                  {skills.map((skill, index) => (
                    <div
                      key={`dup-${index}`}
                      className="flex items-center space-x-3 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <div
                        className={`text-5xl sm:text-6xl ${skill.color} drop-shadow-lg`}
                      >
                        {skill.icon}
                      </div>
                      <span className="text-base sm:text-xl font-medium text-gray-800">
                        {skill.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
              </div>

              {/* Tools Row (Opposite Direction) */}
              <div className="relative flex w-full mt-10 flex-col items-center justify-center overflow-hidden py-10">
                <div className="animate-scroll-reverse flex items-center space-x-12 sm:space-x-16 whitespace-nowrap">
                  {tools.map((tool, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <div className="text-5xl sm:text-6xl text-gray-800 drop-shadow-lg">
                        {tool.icon}
                      </div>
                      <span className="text-base sm:text-xl font-medium text-gray-800">
                        {tool.label}
                      </span>
                    </div>
                  ))}
                  {tools.map((tool, index) => (
                    <div
                      key={`dup-${index}`}
                      className="flex items-center space-x-3 flex-shrink-0 hover:scale-110 transition-transform duration-300 cursor-pointer"
                    >
                      <div className="text-5xl sm:text-6xl text-gray-800 drop-shadow-lg">
                        {tool.icon}
                      </div>
                      <span className="text-base sm:text-xl font-medium text-gray-800">
                        {tool.label}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-white via-white/80 to-transparent z-20"></div>
                <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-white via-white/80 to-transparent z-20"></div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Skills;
