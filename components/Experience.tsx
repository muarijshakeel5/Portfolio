"use client";

import { motion } from "framer-motion";

export default function Experience() {
  return (
    <section className="min-h-screen flex items-center justify-center border-t border-[#1e1e1e] relative" id="experience">
      <div className="w-full max-w-4xl mx-auto relative z-10 px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center py-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block mb-2">Chronology</span>
          <h1 className="font-display-lg text-5xl md:text-7xl text-primary leading-none">Experience</h1>
        </motion.div>
        
        {/* Vertical Timeline */}
        <div className="relative w-full border-l border-outline-variant/30 pl-8 md:pl-12 ml-4 md:ml-0 space-y-16 pb-16">
          {/* Entry 1 */}
          <motion.article 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative group"
          >
            <div className="absolute -left-[41px] md:-left-[57px] top-2 w-3 h-3 bg-primary rounded-full shadow-[2px_2px_0_0_#f2f0ec] group-hover:scale-125 transition-transform duration-300"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <h2 className="font-headline-lg text-2xl md:text-3xl text-primary">Senior Developer</h2>
              <span className="font-label-mono text-label-mono text-outline mt-2 md:mt-0">2023 — PRESENT</span>
            </div>
            <div className="p-6 md:p-8 bg-[#0e0e0e] border border-outline-variant/50 hover:border-surface-tint hover:-translate-y-1 hover:translate-x-1 hover:shadow-[4px_4px_0_0_#f2f0ec] transition-all duration-300">
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Architecting scalable web solutions and leading front-end teams for global enterprise clients. Focus on performance optimization, design system integration, and mentorship.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 border border-outline-variant font-label-mono text-[10px] text-surface-tint uppercase tracking-wider">React</span>
                <span className="px-3 py-1 border border-outline-variant font-label-mono text-[10px] text-surface-tint uppercase tracking-wider">TypeScript</span>
                <span className="px-3 py-1 border border-outline-variant font-label-mono text-[10px] text-surface-tint uppercase tracking-wider">WebGL</span>
              </div>
            </div>
          </motion.article>
          
          {/* Entry 2 */}
          <motion.article 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative group"
          >
            <div className="absolute -left-[41px] md:-left-[57px] top-2 w-3 h-3 border border-outline-variant bg-transparent rounded-full group-hover:border-primary transition-colors duration-300"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <h2 className="font-headline-lg text-2xl md:text-3xl text-on-surface">Creative Agency</h2>
              <span className="font-label-mono text-label-mono text-outline mt-2 md:mt-0">2021 — 2023</span>
            </div>
            <div className="p-6 md:p-8 bg-[#0e0e0e] border border-outline-variant/30 hover:border-surface-tint hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_#f2f0ec] transition-all duration-300">
              <p className="font-body-md text-body-md text-on-surface-variant mb-6">
                Developed award-winning interactive experiences. Collaborated closely with UI/UX designers to translate high-fidelity prototypes into robust, animated front-end applications.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="px-3 py-1 border border-outline-variant/50 font-label-mono text-[10px] text-outline uppercase tracking-wider">Vue.js</span>
                <span className="px-3 py-1 border border-outline-variant/50 font-label-mono text-[10px] text-outline uppercase tracking-wider">GSAP</span>
                <span className="px-3 py-1 border border-outline-variant/50 font-label-mono text-[10px] text-outline uppercase tracking-wider">Three.js</span>
              </div>
            </div>
          </motion.article>
          
          {/* Entry 3 */}
          <motion.article 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative group"
          >
            <div className="absolute -left-[41px] md:-left-[57px] top-2 w-3 h-3 border border-outline-variant/50 bg-transparent rounded-full group-hover:border-outline transition-colors duration-300"></div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
              <h2 className="font-headline-lg text-2xl md:text-3xl text-outline">Startup Innovator</h2>
              <span className="font-label-mono text-label-mono text-outline/50 mt-2 md:mt-0">2019 — 2021</span>
            </div>
            <div className="p-6 md:p-8 border border-outline-variant/20 hover:border-outline-variant/50 transition-colors duration-300">
              <p className="font-body-md text-body-md text-outline-variant mb-6">
                Founding engineering team member. Built the MVP from scratch, handling both front-end architecture and initial backend integrations to secure Series A funding.
              </p>
              <div className="flex flex-wrap gap-3 opacity-70">
                <span className="px-3 py-1 border border-outline-variant/30 font-label-mono text-[10px] text-outline uppercase tracking-wider">JavaScript</span>
                <span className="px-3 py-1 border border-outline-variant/30 font-label-mono text-[10px] text-outline uppercase tracking-wider">Node.js</span>
                <span className="px-3 py-1 border border-outline-variant/30 font-label-mono text-[10px] text-outline uppercase tracking-wider">SASS</span>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
