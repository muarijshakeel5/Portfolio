"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "NEXUS RETAIL",
    description: "High-performance headless e-commerce architecture designed for ultra-fast global content delivery and brutalist aesthetics.",
    tags: ["Next.js", "Shopify Plus"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZpWk607CLwnSJoJBZltTjsVEh2WImGIFSIsUBWxNN_2tnTP0Y2T2jOhERvRQkO9jGFzq4pfOA4tUq6zQ-NaOYpopz6YNDIzyvQJO5HDHJdkJdYDPHMbSD4f3TB3B0rpa3cpQcCUWmtQfS46c61QQ5kCxXrS4OYpgXrUEDgqd4MKEy5CS6H8mXHBZ9-3JrSnXeSj19vUtefaLYnLpM9WZfyMORT6EVQqPtfku9AhbkfObIcs2w8bwwAMeH8ii8Qv_77CS0uXBvwuP1",
    animationClass: "tunnel-item-left",
  },
  {
    title: "SYNAPSE AI",
    description: "Predictive analytics engine featuring a real-time neural network visualization dashboard tailored for enterprise data streams.",
    tags: ["React", "PyTorch"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCFMD2DQUlO7lJIKOk-XP76EcHPIlf6xmDgyCHHWip2AchnjbOwPlrAO-vhS_ghnv2JSqy7QEQCejLfNXyWzIbxX2d0U8pWec2igezH-OqTIf7UBlVKim3hATLGQUKQ7CEOWfhnGrne13hL601-dgFNmj9-npmSO3cZto5SPJY6Nm1mpxtmZF7DOFQrRgvTFgSPvQh5XRc2s7dSO7igWRUAbaXiJfDq4O8v2yGYlbM6t3ab5dpYNJIBmtHbj_S929_linj6-01dDKV9",
    animationClass: "tunnel-item-center",
  },
  {
    title: "ECHO PROTOCOL",
    description: "End-to-end encrypted, low-latency communication lattice designed for secure, brutalist terminal environments.",
    tags: ["WebSockets", "Go"],
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFwX4s1EvczP94ilE5JKrhp9WJgAwprk3OPr4W-1fO6835eJOZJPU7-aWgfozoQX496INtiJKgBFlrMdwQv7JL6URr5Zeqc7RJXMr0m8btcNgomNuB_21vGdjzZdOidJMXF0WBTX2Lmwh3Y3fErRJTMdNN6h7J5DVu2IiYsIvDzjtw2YKXcdyQdbJRYOa6tVCVn8V_S-jhcl-w8Mw5VXhs8zhm7pplNdh4z7MQUZvxPPoXiIyPcxL-wrijPVHpenQK3-WCzG8B6L_V",
    animationClass: "tunnel-item-right",
  }
];

export default function Projects() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center border-t border-[#1e1e1e] perspective-container relative" id="projects">
      <div className="w-full max-w-container-max mx-auto h-full flex flex-col justify-center px-margin-mobile md:px-margin-desktop relative z-10 py-16">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, z: -50 }}
          animate={{ opacity: 1, z: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center md:text-left flex flex-col items-center md:items-start tunnel-item-center"
        >
          <p className="font-label-mono text-label-mono text-outline tracking-[0.2em] uppercase mb-4">Selected Works</p>
          <h1 className="font-headline-lg-mobile md:font-headline-lg text-primary tracking-tight">PROJECTS</h1>
        </motion.div>
        
        {/* 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-gutter">
          {projects.map((project, idx) => (
            <motion.article 
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.2 }}
              className={`bg-[#0e0e0e] border border-outline-variant flex flex-col group relative ${project.animationClass} shadow-[4px_4px_0px_#454742] hover:shadow-[2px_2px_0px_#f2f0ec] hover:border-surface-tint transition-all duration-300`}
            >
              <div className="w-full h-40 md:h-56 border-b border-outline-variant overflow-hidden relative">
                <Image 
                  alt={project.title} 
                  className="object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" 
                  src={project.img}
                  fill
                  unoptimized
                />
                <div className="absolute inset-0 bg-[#080808]/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="font-ui-button text-ui-button text-primary mb-2 text-lg">{project.title}</h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">{project.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="border border-outline px-2 py-1 font-label-mono text-[10px] uppercase text-outline">{tag}</span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Bottom Action */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 flex justify-center tunnel-item-center"
        >
          <Link href="#" className="font-ui-button text-ui-button text-primary border border-primary px-8 py-4 hover:bg-primary hover:text-background transition-colors duration-200 inline-flex items-center space-x-2">
            <span>VIEW ALL PROJECTS</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
