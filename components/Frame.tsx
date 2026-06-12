"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useActiveSection } from "./ActiveSectionContext";
import { useIntro } from "@/context/IntroContext";

const links = [
  { name: "HERO", path: "#hero" },
  { name: "ABOUT", path: "#about" },
  { name: "SKILLS", path: "#skills" },
  { name: "PROJECTS", path: "#projects" },
  { name: "TERMINAL", path: "#terminal" },
  { name: "EXPERIENCE", path: "#experience" },
  { name: "REVIEWS", path: "#reviews" },
  { name: "CONTACT", path: "#contact" },
];

export default function Frame() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isEdgeHovered, setIsEdgeHovered] = useState(false);
  const { activeSection } = useActiveSection();
  const { hasPlayedIntro } = useIntro();
  const initialRef = useRef(hasPlayedIntro);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, Math.round(progress))));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Typewriter effect container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  // Individual letter variants
  const letterVariants = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* Frame Elements Container - Positioned relative to the viewport */}
      <div className="fixed inset-0 z-50 pointer-events-none p-4 md:p-[16px]">
        
        {/* Top-Left: Edge Hover Area & Nav Toggle */}
        <div 
          className="absolute top-4 md:top-[16px] left-4 md:left-[16px] bottom-4 md:bottom-[16px] w-[120px] pointer-events-auto flex flex-col items-start group"
          onMouseEnter={() => setIsEdgeHovered(true)}
          onMouseLeave={() => setIsEdgeHovered(false)}
        >
          {/* Menu Toggle Button */}
          <motion.div
            suppressHydrationWarning
            initial={initialRef.current ? false : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: initialRef.current ? 0 : 3.2, duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
          >
            <button
            onClick={() => setIsEdgeHovered(!isEdgeHovered)}
            className="text-primary hover:text-on-surface transition-colors focus:outline-none flex items-center justify-center cursor-pointer px-4 py-3 bg-background/50 backdrop-blur-md border border-outline-variant/30"
            aria-label="Toggle Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e5e5e5" strokeWidth="1" strokeLinecap="square">
              <motion.line 
                x1={isEdgeHovered ? 12 : 2} 
                y1={isEdgeHovered ? 2 : 7} 
                x2={isEdgeHovered ? 12 : 22} 
                y2={isEdgeHovered ? 22 : 7} 
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
              />
              <motion.line 
                x1={isEdgeHovered ? 12 : 6} 
                y1={isEdgeHovered ? 2 : 12} 
                x2={isEdgeHovered ? 12 : 18} 
                y2={isEdgeHovered ? 22 : 12} 
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
              />
              <motion.line 
                x1={isEdgeHovered ? 12 : 2} 
                y1={isEdgeHovered ? 2 : 17} 
                x2={isEdgeHovered ? 12 : 22} 
                y2={isEdgeHovered ? 22 : 17} 
                transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }} 
              />
            </svg>
          </button>
          </motion.div>

          {/* Typewriter Nav Links */}
          <div className="mt-8 ml-4 flex-1">
            <AnimatePresence>
              {isEdgeHovered && (
                <motion.div 
                  className="flex flex-col items-start space-y-4"
                  initial="hidden"
                  animate="show"
                  exit="exit"
                  variants={containerVariants}
                >
                  {links.map((link) => {
                    const isActive = activeSection === link.path.substring(1);
                    return (
                      <motion.a
                        key={link.name}
                        href={link.path}
                        className={`font-label-mono text-xs tracking-widest uppercase transition-colors flex items-center gap-3 py-1 ${
                          isActive ? "text-primary" : "text-outline hover:text-primary"
                        }`}
                        onClick={() => setIsEdgeHovered(false)}
                      >
                        <span className="flex">
                          {link.name.split("").map((char, index) => (
                            <motion.span key={index} variants={letterVariants}>
                              {char}
                            </motion.span>
                          ))}
                        </span>
                        {/* Active Indicator Dot */}
                        <div className="w-1.5 h-1.5 flex items-center justify-center">
                          {isActive && (
                            <motion.span 
                              layoutId="active-nav-dot"
                              className="w-1.5 h-1.5 rounded-full bg-primary inline-block"
                              transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                          )}
                        </div>
                      </motion.a>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom-Right: HUD */}
        <motion.div 
          suppressHydrationWarning
          className="absolute bottom-4 md:bottom-[16px] right-4 md:right-[16px] pointer-events-auto"
          initial={initialRef.current ? false : { opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: initialRef.current ? 0 : 3.4, duration: 1.0, ease: [0.25, 1, 0.5, 1] }}
        >
          <div className="font-label-mono text-xs tracking-widest text-on-surface-variant uppercase bg-background/50 backdrop-blur-md px-4 py-3 border border-outline-variant/30 flex gap-2 items-center">
            <span className="w-2 h-2 rounded-full bg-primary/50 animate-pulse" />
            Scroll: {scrollProgress.toString().padStart(2, '0')}%
          </div>
        </motion.div>

      </div>
    </>
  );
}
