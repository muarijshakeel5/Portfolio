"use client";

import { useEffect, useRef } from "react";
import { skillsData } from "@/data/skills";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Skills() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef(0);
  
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const contentBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const rowsRef = useRef<HTMLDivElement>(null);

  // Preload Image Sequence (IntersectionObserver)
  useEffect(() => {
    if (!wrapperRef.current) return;
    
    const loadImages = () => {
      const images: HTMLImageElement[] = new Array(300);
      
      const loadImage = (i: number) => {
        return new Promise<void>((resolve) => {
          if (images[i - 1]) return resolve();
          const img = new window.Image();
          img.decoding = "async";
          if (i === 1) img.fetchPriority = "high";
          img.onload = () => {
            loadedFramesRef.current++;
            resolve();
          };
          img.onerror = () => resolve();
          img.src = `/tech-frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
          images[i - 1] = img;
        });
      };

      const loadProgressively = async () => {
        await loadImage(1);
        if (canvasRef.current) renderFrame(1);

        const wave2 = [];
        for (let i = 10; i <= 300; i += 10) wave2.push(loadImage(i));
        await Promise.all(wave2);

        const wave3 = [];
        for (let i = 2; i <= 300; i++) {
          if (i % 10 !== 0) wave3.push(loadImage(i));
        }
      };

      loadProgressively();
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

    let img = imagesRef.current[index - 1];
    if (!img || !img.complete) {
      let found = false;
      for (let i = index - 2; i >= 0; i--) {
        if (imagesRef.current[i] && imagesRef.current[i].complete) {
          img = imagesRef.current[i];
          found = true;
          break;
        }
      }
      if (!found) {
        for (let i = index; i < 300; i++) {
          if (imagesRef.current[i] && imagesRef.current[i].complete) {
            img = imagesRef.current[i];
            found = true;
            break;
          }
        }
      }
    }

    if (!img || !img.complete) {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }

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
      const OVERLAY_DURATION = 30; // 70-100% fades in the tech stack data

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

      tl.fromTo(rowsRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.5 },
        OVERLAY_START + (OVERLAY_DURATION * 0.3)
      );

    }); // end matchMedia
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="skills" className="relative overflow-hidden bg-background" style={{ height: "400vh" }}>
      <div ref={pinnedRef} className="h-screen w-full relative flex items-center justify-center">
        
        {/* CANVAS LAYER */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40 bg-black">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* TECH STACK OVERLAY LAYER */}
        <div ref={contentSectionRef} className="absolute inset-0 w-full h-full z-50 hidden items-center justify-center pointer-events-auto">
            <div ref={contentBgRef} className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-none opacity-0"></div>
            
            <div className="relative z-10 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col justify-center py-16 overflow-y-auto">
              
              <div ref={headerRef} className="mb-12 md:mb-16 pl-0 md:pl-24 opacity-0">
                <h1 className="font-unica text-5xl md:text-7xl text-primary uppercase">
                  Tech Stack
                </h1>
                <p className="font-label-mono text-label-mono text-outline mt-4 uppercase tracking-widest">
                  03 / 08 — Competencies
                </p>
              </div>
              
              <div ref={rowsRef} className="flex flex-col w-full md:pl-24 pr-0 md:pr-12 opacity-0">
                {skillsData.map((row, index) => (
                  <div 
                    key={row.category}
                    className="tech-row border-b border-outline-variant py-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-12 hover:border-primary transition-colors duration-300"
                  >
                    <div className="w-32 shrink-0">
                      <span className="font-label-mono text-label-mono text-outline">{row.category}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {row.skills.map(skill => (
                        <span key={skill} className="tech-pill border border-primary-fixed px-4 py-1.5 font-label-mono text-xs text-primary bg-transparent cursor-default transition-all duration-300 hover:bg-primary hover:text-surface-dim">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
        </div>

      </div>
    </section>
  );
}
