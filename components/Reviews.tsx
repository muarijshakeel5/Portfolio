"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "Their approach to interaction design transcends standard utility. It feels less like software and more like a physical installation. A truly rare perspective in today's digital landscape.",
    author: "Elena Rostova",
    role: "Chief Executive Officer",
    cardClass: "scale-95 md:scale-90 md:translate-y-[-20px] opacity-80 hover:opacity-100 hover:scale-100 hover:translate-y-[-24px] z-10 hover:z-30",
    delay: 0.1
  },
  {
    quote: "Technically rigorous and visually uncompromising. The architecture beneath the aesthetics is built with absolute precision. They operate at the intersection of engineering and pure brutalist art.",
    author: "Marcus Vance",
    role: "Chief Technology Officer",
    cardClass: "scale-100 z-20 hover:z-30",
    delay: 0.3
  },
  {
    quote: "We asked for a standard interface, and they delivered a cinematic experience. Every micro-interaction is purposeful. It entirely redefined how our users perceive our core product.",
    author: "Sarah Jenkins",
    role: "Lead Product Designer",
    cardClass: "scale-95 md:scale-90 md:translate-y-[20px] opacity-80 hover:opacity-100 hover:scale-100 hover:translate-y-[16px] z-10 hover:z-30",
    delay: 0.5
  }
];

export default function Reviews() {
  return (
    <section className="min-h-screen flex items-center justify-center border-t border-[#1e1e1e] relative" id="reviews">
      <div className="w-full max-w-container-max mx-auto px-gutter relative z-10 flex flex-col items-center justify-center py-16">
        {/* Section Header */}
        <div className="mb-12 font-label-mono text-label-mono text-outline-variant tracking-[0.2em] uppercase">
          [ 07 / TESTIMONIALS ]
        </div>
        
        {/* 3D Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 w-full">
          {testimonials.map((item, index) => (
            <motion.article 
              key={item.author}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: item.delay }}
              className={`bg-[#201f1f] border border-outline p-8 flex flex-col relative hard-shadow transition-all duration-300 ${item.cardClass}`}
            >
              <span 
                className="material-symbols-outlined absolute top-4 right-4 text-[#353434] opacity-50 select-none pointer-events-none" 
                style={{ fontSize: "80px", lineHeight: 1 }}
              >
                format_quote
              </span>
              <div className="flex-grow z-10 relative">
                <p className="font-body-md text-on-surface mb-8">
                  "{item.quote}"
                </p>
              </div>
              <div className="mt-auto border-t border-surface-variant pt-4 flex items-center justify-between z-10">
                <div>
                  <h3 className="font-ui-button text-ui-button text-primary uppercase">
                    {item.author}
                  </h3>
                  <p className="font-label-mono text-label-mono text-outline">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
