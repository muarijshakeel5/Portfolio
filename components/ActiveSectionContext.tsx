"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
}>({
  activeSection: "hero",
  setActiveSection: () => {},
});

const sections = [
  "hero",
  "about",
  "skills",
  "projects",
  "terminal",
  "experience",
  "reviews",
  "contact"
];

export const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = "hero";
      // Trigger update when section takes up the middle of viewport
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentSection = sectionId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on load to set initial state
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => useContext(ActiveSectionContext);
