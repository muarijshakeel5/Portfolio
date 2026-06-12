"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const ActiveSectionContext = createContext<{
  activeSection: string;
  setActiveSection: (section: string) => void;
}>({
  activeSection: "hero",
  setActiveSection: () => {},
});

export const ActiveSectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSection] = useState("hero");

  return (
    <ActiveSectionContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </ActiveSectionContext.Provider>
  );
};

export const useActiveSection = () => useContext(ActiveSectionContext);

export const useActiveSectionObserver = () => {
  const { setActiveSection } = useActiveSection();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll("section[id], div[id='about']");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [setActiveSection]);
};
