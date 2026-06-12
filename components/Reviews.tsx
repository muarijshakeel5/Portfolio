"use client";

import { useEffect, useRef } from "react";
import { testimonials } from "@/data/testimonials";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const cardClasses = [
  "scale-95 md:scale-90 md:translate-y-[-20px] opacity-80 hover:opacity-100 hover:scale-100 hover:translate-y-[-24px] z-10 hover:z-30",
  "scale-100 z-20 hover:z-30",
  "scale-95 md:scale-90 md:translate-y-[20px] opacity-80 hover:opacity-100 hover:scale-100 hover:translate-y-[16px] z-10 hover:z-30",
];

export default function Reviews() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedFramesRef = useRef(0);
  
  const contentSectionRef = useRef<HTMLDivElement>(null);
  const contentBgRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
          img.src = `/testframes/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
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
      const OVERLAY_DURATION = 30; // 70-100% fades in the reviews data

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
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.4 },
        OVERLAY_START + (OVERLAY_DURATION * 0.1)
      );

      tl.fromTo(cardsRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, ease: "power2.out", duration: OVERLAY_DURATION * 0.5 },
        OVERLAY_START + (OVERLAY_DURATION * 0.3)
      );

    }); // end matchMedia
  }, { scope: wrapperRef });

  return (
    <section ref={wrapperRef} id="reviews" className="relative overflow-hidden bg-background" style={{ height: "400vh" }}>
      <div ref={pinnedRef} className="h-screen w-full relative flex items-center justify-center">
        
        {/* CANVAS LAYER */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-40 bg-black">
          <canvas 
            ref={canvasRef}
            className="w-full h-full object-cover"
          />
        </div>

        {/* REVIEWS OVERLAY LAYER */}
        <div ref={contentSectionRef} className="absolute inset-0 w-full h-full z-50 hidden flex-col items-center pointer-events-auto">
          <div ref={contentBgRef} className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-none opacity-0"></div>
          
          <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter h-full flex flex-col items-center justify-center py-16 overflow-y-auto">
            
            {/* Section Header */}
            <div ref={headerRef} className="mb-12 font-label-mono text-label-mono text-outline-variant tracking-[0.2em] uppercase opacity-0 shrink-0">
              [ 07 / TESTIMONIALS ]
            </div>
            
            {/* Desktop: 3D Grid / Mobile: Scroll-snap Carousel */}
            <div ref={cardsRef} className="
              flex md:grid md:grid-cols-3 gap-8 md:gap-12 w-full
              overflow-x-auto md:overflow-x-visible
              snap-x snap-mandatory md:snap-none
              -mx-gutter px-gutter md:mx-0 md:px-0
              hide-scrollbar opacity-0 shrink-0
            ">
              {testimonials.map((item, index) => (
                <article 
                  key={item.author}
                  className={`
                    bg-surface-container border border-outline p-8 flex flex-col relative hard-shadow transition-all duration-300
                    min-w-[85vw] md:min-w-0 snap-center
                    ${cardClasses[index] ?? ""}
                  `}
                >
                  <span 
                    className="material-symbols-outlined absolute top-4 right-4 text-surface-container-highest opacity-50 select-none pointer-events-none" 
                    style={{ fontSize: "80px", lineHeight: 1 }}
                    aria-hidden="true"
                  >
                    format_quote
                  </span>
                  <div className="flex-grow z-10 relative">
                    <p className="font-body-md text-on-surface mb-8">
                      &ldquo;{item.quote}&rdquo;
                    </p>
                  </div>
                  <div className="mt-auto border-t border-surface-variant pt-4 flex items-center justify-between z-10">
                    <div>
                      <h3 className="font-unica text-ui-button text-primary uppercase">
                        {item.author}
                      </h3>
                      <p className="font-label-mono text-label-mono text-outline">
                        {item.role}
                      </p>
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
