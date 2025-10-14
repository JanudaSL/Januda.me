"use client";

import React from "react";
import {
  Calendar,
  Code,
  Users,
  Building,
  Rocket,
  Briefcase,
  Award,
} from "lucide-react";

const ExperienceTimeline = () => {
  const experiences = [
    {
      id: 1,
      period: "2023 - Present",
      title: "Intern Software Engineer",
      company: "Company",
      description:
        "Contributed to multiple projects while developing strong skills in software development, teamwork, and creative problem-solving.",
      icon: <Code className="w-6 h-6" />,
      color: "cyan",
      category: "Professional",
      skills: ["Software Development", "Problem Solving", "Team Collaboration"],
    },
    {
      id: 2,
      period: "2023 - Present",
      title: "Slasscom Member",
      company: "SLASSCOM",
      description:
        "Active member of Sri Lanka Association of Software and Service Companies, contributing to the innovation ecosystem.",
      icon: <Building className="w-6 h-6" />,
      color: "emerald",
      category: "Professional",
    },
    {
      id: 3,
      period: "2024 - Present",
      title: "Community Member",
      company: "Generation ALPHA",
      description:
        "Engaged member supporting community-driven technology initiatives and events.",
      icon: <Users className="w-6 h-6" />,
      color: "violet",
      category: "Community",
    },
  ];

  const colorMap = {
    cyan: {
      from: "from-cyan-400",
      to: "to-blue-500",
      text: "text-cyan-300",
      glow: "shadow-cyan-500/30",
    },
    emerald: {
      from: "from-emerald-400",
      to: "to-teal-500",
      text: "text-emerald-300",
      glow: "shadow-emerald-500/30",
    },
    violet: {
      from: "from-violet-400",
      to: "to-purple-500",
      text: "text-violet-300",
      glow: "shadow-violet-500/30",
    },
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: "url(cr.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Overlay with dynamic gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/80 backdrop-blur-sm"></div>

      {/* Floating gradient orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-violet-500/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="relative z-10 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          {/* Header */}
          <div className="mb-20">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-40"></div>
                <Rocket className="relative w-12 h-12 text-cyan-400 animate-bounce" />
              </div>
            </div>
            <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
              <span className="text-white">My</span>{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 bg-clip-text text-transparent">
                Journey
              </span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300/90 max-w-2xl mx-auto">
              A timeline of growth, innovation, and purpose.
            </p>
          </div>

          {/* Experience Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {experiences.map((exp, i) => {
              const colors = colorMap[exp.color];
              return (
                <div
                  key={exp.id}
                  className={`relative bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-white/10 group`}
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  {/* Top Accent */}
                  <div
                    className={`h-1 bg-gradient-to-r ${colors.from} ${colors.to}`}
                  ></div>

                  <div className="p-8">
                    {/* Icon */}
                    <div className="flex justify-center mb-6">
                      <div
                        className={`relative w-16 h-16 rounded-full flex items-center justify-center border border-white/20 bg-white/10 ${colors.glow} transition-transform duration-500 group-hover:scale-110`}
                      >
                        <div className={colors.text}>{exp.icon}</div>
                      </div>
                    </div>

                    {/* Period */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white/80 text-xs font-semibold mb-4">
                      <Calendar className="w-3 h-3" />
                      {exp.period}
                    </div>

                    {/* Title & Company */}
                    <h3 className="text-2xl font-bold text-white mb-2 transition-all group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-white group-hover:bg-clip-text group-hover:text-transparent">
                      {exp.title}
                    </h3>
                    <div className="flex items-center justify-center gap-2 mb-4 text-slate-300/80">
                      <Briefcase className={`w-4 h-4 ${colors.text}`} />
                      {exp.company}
                    </div>

                    {/* Category */}
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-6 ${
                        exp.category === "Professional"
                          ? "bg-cyan-500/10 text-cyan-300 border border-cyan-500/30"
                          : "bg-violet-500/10 text-violet-300 border border-violet-500/30"
                      }`}
                    >
                      {exp.category}
                    </span>

                    {/* Description */}
                    <p className="text-white/70 text-sm leading-relaxed mb-6">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    {exp.skills && (
                      <div className="pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <Award className="w-4 h-4 text-white/60" />
                          <h4 className="text-xs uppercase tracking-wider text-white/70 font-semibold">
                            Expertise
                          </h4>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2">
                          {exp.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs rounded-lg bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 transition-all"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div className="mt-24">
            <div className="inline-block relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-violet-400 blur-2xl opacity-20 animate-pulse"></div>
              <div className="relative px-10 py-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-md">
                <p className="text-lg font-bold bg-gradient-to-r from-cyan-300 via-emerald-300 to-violet-300 bg-clip-text text-transparent mb-2">
                  ✨ Always Evolving
                </p>
                <p className="text-sm text-white/70">
                  Open to meaningful collaborations and new challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
