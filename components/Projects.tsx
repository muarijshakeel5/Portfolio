"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData as projects } from "@/data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Projects() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef(0);
  
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const contentBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  // Preload Image Sequence (IntersectionObserver)
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    const loadImages = () => {
      const images: HTMLImageElement[] = [];
      for (let i = 1; i <= 300; i++) {
        const img = new window.Image();
        img.onload = () => {
          loadedFramesRef.current++;
        };
        img.src = `/projectframes/ezgif-frame-${String(i).padStart(3, '0')}.png`;
        img.decode().catch(() => {});
        images.push(img);
      }
      imagesRef.current = images;
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadImages();
        observer.disconnect();
      }
    }, { rootMargin: "200px" });

    observer.observe(wrapperRef.current);
    
    return () => observer.disconnect();
  }, []);

  // Set canvas dimensions via ResizeObserver
  useEffect(() => {
    if (!canvasRef.current) return;
    let rafId: number;
    const resizeObserver = new ResizeObserver((entries) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        for (const entry of entries) {
          if (canvasRef.current) {
            canvasRef.current.width = entry.contentRect.width;
            canvasRef.current.height = entry.contentRect.height;
            renderFrame(1);
          }
        }
      });
    });
    resizeObserver.observe(canvasRef.current);
    return () => { resizeObserver.disconnect(); cancelAnimationFrame(rafId); };
     
  }, []);

  function renderFrame(index: number) {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (loadedFramesRef.current < 300) {
      // Draw loading bar
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const barWidth = canvas.width * 0.4;
      const barHeight = 4;
      const progress = loadedFramesRef.current / 300;
      ctx.fillStyle = "rgba(255,255,255,0.2)";
      ctx.fillRect((canvas.width - barWidth) / 2, canvas.height / 2 - barHeight / 2, barWidth, barHeight);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      ctx.fillRect((canvas.width - barWidth) / 2, canvas.height / 2 - barHeight / 2, barWidth * progress, barHeight);
      return;
    }

    if (imagesRef.current.length < 300) return;
    const img = imagesRef.current[index - 1];
    if (!img || !img.complete) return;

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  useGSAP(() => {
    if (!wrapperRef.current) return;

    const mm = gsap.matchMedia();

    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      noReduceMotion: "(prefers-reduced-motion: no-preference)"
    }, (context) => {
      const { reduceMotion } = context.conditions as { reduceMotion: boolean };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
          pin: pinnedRef.current,
          anticipatePin: 1,
        }
      });

      const SCRUB_START = 0;
      const SCRUB_DURATION = 70; // 0-70% scrubs the 300 frames
      
      const OVERLAY_START = 70;
      const OVERLAY_DURATION = 30; // 70-100% fades in the projects data

      if (!reduceMotion) {
        const frameTracker = { frame: 1 };
        tl.to(frameTracker, {
          frame: 300,
          ease: "none",
          duration: SCRUB_DURATION,
          onUpdate: () => {
            renderFrame(Math.floor(frameTracker.frame));
          }
        }, SCRUB_START);
      } else {
        tl.to(canvasRef.current, {
          onStart: () => renderFrame(300),
          duration: SCRUB_DURATION
        }, SCRUB_START);
      }

      // Overlay Cascade
      tl.set(contentSectionRef.current, { display: "flex" }, OVERLAY_START);
      
      tl.fromTo(contentBgRef.current,
        { opacity: 0 },
        { opacity: 1, ease: "power2.out", duration: OVERLAY_DURATION * 0.3 },
        OVERLAY_START
      );
      
      tl.fromTo(headerRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.4 },
        OVERLAY_START + (OVERLAY_DURATION * 0.1)
      );

      tl.fromTo(gridRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.5 },
        OVERLAY_START + (OVERLAY_DURATION * 0.3)
      );

      tl.fromTo(actionRef.current, 
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, ease: "power2.out", duration: OVERLAY_DURATION * 0.4 },
        OVERLAY_START + (OVERLAY_DURATION * 0.5)
      );

    }); // end matchMedia
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="projects" className="relative overflow-hidden bg-background" style={{ height: "400vh" }}>
      <div ref={pinnedRef} className="h-screen w-full relative flex items-center justify-center">
        
        {/* CANVAS LAYER */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40 bg-black">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* PROJECTS OVERLAY LAYER */}
        <div ref={contentSectionRef} className="absolute inset-0 w-full h-full z-50 hidden flex-col items-center pointer-events-auto">
          <div ref={contentBgRef} className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-none opacity-0"></div>
          
          <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col pt-24 pb-16 overflow-y-auto">
            
            {/* Section Header */}
            <div ref={headerRef} className="mb-12 text-center md:text-left flex flex-col items-center md:items-start opacity-0 shrink-0">
              <p className="font-label-mono text-label-mono text-outline tracking-[0.2em] uppercase mb-4">Selected Works</p>
              <h1 className="font-unica text-5xl md:text-7xl text-primary tracking-tight uppercase">PROJECTS</h1>
            </div>
            
            {/* 3-Column Grid */}
            <div ref={gridRef} className="perspective-container grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-gutter opacity-0 shrink-0">
              {projects.map((project, idx) => (
                <article 
                  key={project.title}
                  className={`bg-surface-container-lowest border border-outline-variant flex flex-col group relative ${project.animationClass} shadow-[4px_4px_0px_var(--color-outline-variant)] hover:shadow-[2px_2px_0px_var(--color-primary-fixed)] hover:border-surface-tint transition-all duration-300`}
                >
                  <div className="w-full h-40 md:h-56 border-b border-outline-variant overflow-hidden relative">
                    <Image 
                      alt={project.title} 
                      className="object-cover filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 scale-105 group-hover:scale-100" 
                      src={project.img}
                      fill
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h2 className="font-unica text-ui-button text-primary mb-2 text-lg">{project.title}</h2>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">{project.description}</p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="border border-outline px-2 py-1 font-label-mono text-[10px] uppercase text-outline">{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
            {/* Bottom Action */}
            <div ref={actionRef} className="mt-12 flex justify-center opacity-0 shrink-0 mb-12">
              <Link href="#" className="font-unica text-ui-button text-primary border border-primary px-8 py-4 hover:bg-primary hover:text-background transition-colors duration-200 inline-flex items-center space-x-2">
                <span>VIEW ALL PROJECTS</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </Link>
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
