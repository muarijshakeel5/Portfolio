"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function About() {
  return (
    <section className="min-h-screen flex items-center justify-center border-t border-surface-variant relative" id="about">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)", z: -100 }}
        whileInView={{ opacity: 0.5, scale: 0.98, filter: "blur(0)", z: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
        className="absolute inset-0 bg-surface-dim z-0 border border-surface-container-highest m-8"
      />
      
      <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 w-full py-16">
          {/* Left Stats */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            className="col-span-12 md:col-span-5 md:col-start-2 flex flex-col justify-center"
          >
            <div className="mb-12 flex items-center space-x-4">
              <div className="w-8 h-[1px] bg-primary"></div>
              <h2 className="font-unica text-label-mono text-primary tracking-widest uppercase">ABOUT — 02</h2>
            </div>
            <div className="space-y-8">
              <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">4+</span>
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Years Experience</span>
              </div>
              <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">30+</span>
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Projects Delivered</span>
              </div>
              <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">12+</span>
                <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Global Clients</span>
              </div>
            </div>
          </motion.div>
          {/* Right Content Card */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.19, 1, 0.22, 1], delay: 0.3 }}
            className="col-span-12 md:col-span-6 flex flex-col justify-center"
          >
            <div className="bg-surface-container-lowest p-8 md:p-12 border border-surface-tint relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-primary -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary translate-x-1/2 translate-y-1/2"></div>
              <div className="font-headline-lg text-2xl md:text-3xl text-on-background leading-relaxed mb-12 italic opacity-90">
                "A relentless pursuit of architectural elegance in code. I fuse brutalist aesthetics with hyper-performant engineering to construct digital environments that command attention and refuse to be ignored."
              </div>
              <div className="grid grid-cols-2 gap-4">
                <a href="/cv.pdf" download className="brutalist-border flex flex-col items-center justify-center p-6 bg-transparent text-primary hover:bg-primary hover:text-surface-dim font-ui-button text-ui-button uppercase tracking-wider group aspect-square">
                  <span className="material-symbols-outlined mb-4 text-2xl group-hover:-translate-y-1 transition-transform">download</span>
                  <span className="text-xs text-center">Download CV</span>
                </a>
                <a href="https://github.com/muarijshakeel" target="_blank" rel="noopener noreferrer" className="brutalist-border flex flex-col items-center justify-center p-6 bg-surface text-primary hover:bg-primary hover:text-surface-dim font-ui-button text-ui-button uppercase tracking-wider group aspect-square">
                  <span className="material-symbols-outlined mb-4 text-2xl group-hover:rotate-12 transition-transform">code</span>
                  <span className="text-xs text-center">View GitHub</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
