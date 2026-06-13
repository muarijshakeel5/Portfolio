"use client";

import { useEffect, useRef } from "react";
import { experienceData } from "@/data/experience";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Experience() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef(0);
  
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const contentBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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
          img.src = `/expframes/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
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
          pinSpacing: false,
        }
      });

      const INTRO_START = 0;
      const INTRO_DURATION = 10;

      const SCRUB_START = 10;
      const SCRUB_DURATION = 55;
      
      const OVERLAY_START = 65;
      const OVERLAY_DURATION = 15;

      const OUTRO_START = 80;
      const OUTRO_DURATION = 10;

      const HOLD_START = 90;
      const HOLD_DURATION = 10;

      // Simple Reveal Intro
      tl.fromTo(pinnedRef.current, 
        { opacity: 0 },
        { opacity: 1, ease: "power2.in", duration: INTRO_DURATION },
        INTRO_START
      );

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
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.4 },
        OVERLAY_START + (OVERLAY_DURATION * 0.1)
      );

      tl.fromTo(timelineRef.current, 
        { opacity: 0, x: -50 },
        { opacity: 1, x: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.5 },
        OVERLAY_START + (OVERLAY_DURATION * 0.3)
      );

      // Monitor Dive Outro
      tl.to(pinnedRef.current, {
        scale: reduceMotion ? 1 : 15,
        opacity: 0,
        transformOrigin: "50% 40%",
        ease: "power3.in",
        duration: OUTRO_DURATION
      }, OUTRO_START);

      // Hold Transparent State
      tl.to(pinnedRef.current, {
        opacity: 0,
        duration: HOLD_DURATION
      }, HOLD_START);

    }); // end matchMedia
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="experience" className="relative z-20 -mt-[200vh]" style={{ height: "600vh" }}>
      <div ref={pinnedRef} className="h-screen w-full relative flex items-center justify-center bg-background overflow-hidden">
        
        {/* CANVAS LAYER */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40 bg-black">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* EXPERIENCE OVERLAY LAYER */}
        <div ref={contentSectionRef} className="absolute inset-0 w-full h-full z-50 hidden flex-col items-center pointer-events-auto">
          <div ref={contentBgRef} className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-none opacity-0"></div>
          
          <div className="relative z-10 w-full max-w-4xl mx-auto px-margin-mobile md:px-margin-desktop h-full flex flex-col pt-24 pb-16 overflow-y-auto">
            
            {/* Section Header */}
            <div ref={headerRef} className="mb-16 text-center md:text-left opacity-0 shrink-0">
              <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest block mb-2">Chronology</span>
              <h1 className="font-display-lg text-5xl md:text-7xl text-primary leading-none">Experience</h1>
            </div>
            
            {/* Vertical Timeline */}
            <div ref={timelineRef} className="relative w-full border-l border-outline-variant/30 pl-8 md:pl-12 ml-4 md:ml-0 space-y-16 pb-16 opacity-0 shrink-0">
              {experienceData.map((item, index) => (
                <article 
                  key={index}
                  className="relative group"
                >
                  <div className={`absolute -left-[41px] md:-left-[57px] top-2 ${item.style.bullet}`}></div>
                  <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-4">
                    <h2 className={`font-headline-lg text-2xl md:text-3xl ${item.style.title}`}>{item.role}</h2>
                    <span className={`font-label-mono text-label-mono mt-2 md:mt-0 ${item.style.date}`}>{item.period}</span>
                  </div>
                  <div className={`p-6 md:p-8 ${item.style.card}`}>
                    <p className={`font-body-md text-body-md mb-6 ${item.style.descriptionText}`}>
                      {item.description}
                    </p>
                    <div className={`flex flex-wrap gap-3 ${item.style.skillsWrapper}`}>
                      {item.skills.map((skill, i) => (
                        <span key={i} className={`px-3 py-1 font-label-mono text-[10px] uppercase tracking-wider ${item.style.skillBadge}`}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
            
          </div>
        </div>

      </div>
    </section>
  );
}
