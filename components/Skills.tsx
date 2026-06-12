"use client";

import { motion } from "framer-motion";

const skillsData = [
  {
    category: "Frontend",
    skills: ["React", "Vue.js", "Tailwind CSS", "Three.js"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Python", "Go", "GraphQL"],
  },
  {
    category: "Database",
    skills: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    category: "Tools",
    skills: ["Figma", "Git", "Webpack"],
  },
];

export default function Skills() {
  return (
    <section className="min-h-screen flex flex-col justify-center border-t border-[#1e1e1e] relative" id="skills">
      <div className="tunnel-bg" id="skills-tunnel-bg"></div>
      
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col justify-center h-full py-16">
        <header className="mb-12 md:mb-16 pl-0 md:pl-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display-lg text-5xl md:text-7xl text-primary uppercase"
          >
            Tech Stack
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-label-mono text-label-mono text-outline mt-4 uppercase tracking-widest"
          >
            03 / 08 — Competencies
          </motion.p>
        </header>
        
        <div className="flex flex-col w-full md:pl-24 pr-0 md:pr-12">
          {skillsData.map((row, index) => (
            <motion.div 
              key={row.category}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="tech-row border-b border-outline-variant py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-12"
            >
              <div className="w-32 shrink-0">
                <span className="font-label-mono text-label-mono text-outline">{row.category}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {row.skills.map(skill => (
                  <span key={skill} className="tech-pill border border-[#f2f0ec] px-4 py-1.5 font-label-mono text-xs text-primary bg-transparent cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
