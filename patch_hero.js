const fs = require('fs');

const heroPath = '/Users/muarijshakeel/Downloads/Portfolio/components/Hero.tsx';
let content = fs.readFileSync(heroPath, 'utf8');

// 1. Add imports
const importsToAdd = `import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}
`;
if (!content.includes('import gsap from "gsap"')) {
    content = content.replace(/import { useIntro } from "@\/context\/IntroContext";\n/g, `import { useIntro } from "@/context/IntroContext";\n${importsToAdd}\n`);
}

// 2. Add refs inside component
const newRefs = `
  const wrapperRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const textStackRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const letterboxTopRef = useRef<HTMLDivElement>(null);
  const letterboxBottomRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const dataFragmentsRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const exitOverlayRef = useRef<HTMLDivElement>(null);
`;
content = content.replace(/const parallaxLayerRef = useRef<HTMLDivElement>\(null\);\n/g, `const parallaxLayerRef = useRef<HTMLDivElement>(null);\n${newRefs}`);

// 3. Add useGSAP hook before return statement
const useGsapBlock = `
  useGSAP(() => {
    if (!wrapperRef.current) return;

    gsap.set(portraitRef.current, { transformPerspective: 1200 });

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

    // PHASE 1 (0-30): Cinematic push in
    tl.to(portraitRef.current, {
      scale: 1.6,
      rotateX: 4,
      rotateY: -3,
      ease: "power2.inOut",
      duration: 30
    }, 0);
    tl.to(textStackRef.current, {
      opacity: 0,
      y: -40,
      ease: "power2.inOut",
      duration: 20
    }, 0);
    tl.to(signatureRef.current, {
      opacity: 0,
      scale: 0.85,
      y: -20,
      ease: "power2.inOut",
      duration: 20
    }, 0);
    tl.to(letterboxTopRef.current, {
      scaleY: 1,
      ease: "power2.inOut",
      duration: 30
    }, 0);
    tl.to(letterboxBottomRef.current, {
      scaleY: 1,
      ease: "power2.inOut",
      duration: 30
    }, 0);
    tl.to(vignetteRef.current, {
      opacity: 0.5,
      ease: "power2.inOut",
      duration: 30
    }, 0);

    // PHASE 2 (30-60): Depth immersion
    tl.to(portraitRef.current, {
      scale: 2.2,
      rotateX: 8,
      rotateY: -6,
      x: -30,
      filter: "blur(2px)",
      ease: "power2.inOut",
      duration: 30
    }, 30);
    tl.to(vignetteRef.current, {
      opacity: 0.65,
      ease: "power2.inOut",
      duration: 30
    }, 30);
    tl.to(dataFragmentsRef.current, {
      opacity: 1,
      y: -10,
      ease: "power2.out",
      duration: 20
    }, 40);

    // PHASE 3 (60-85): Peak immersion
    tl.to(portraitRef.current, {
      scale: 2.8,
      rotateX: 3,
      rotateY: 0,
      x: -50,
      filter: "blur(0px)",
      ease: "power2.inOut",
      duration: 25
    }, 60);
    tl.to(scanLineRef.current, {
      opacity: 1,
      top: "100%",
      ease: "none",
      duration: 25
    }, 60);

    // PHASE 4 (85-100): Exit dissolve
    tl.to(exitOverlayRef.current, {
      opacity: 1,
      ease: "power2.inOut",
      duration: 15
    }, 85);
    tl.to(letterboxTopRef.current, {
      scaleY: 0,
      ease: "power2.inOut",
      duration: 15
    }, 85);
    tl.to(letterboxBottomRef.current, {
      scaleY: 0,
      ease: "power2.inOut",
      duration: 15
    }, 85);
    tl.to(dataFragmentsRef.current, {
      opacity: 0,
      ease: "power2.inOut",
      duration: 15
    }, 85);

  }, { scope: wrapperRef });

`;
content = content.replace(/  return \(\n/, `${useGsapBlock}  return (\n`);

// 4. Update JSX section wrapper
content = content.replace(
  /<section className="min-h-screen relative overflow-hidden bg-background" id="hero" ref=\{containerRef\}>/,
  `<section ref={wrapperRef} id="hero" className="relative overflow-hidden bg-background" style={{ height: "300vh" }}>\n      <div ref={pinnedRef} className="sticky top-0 w-full h-screen overflow-hidden">`
);

// 5. Add portraitRef to motion.div#hero-img-container
content = content.replace(
  /<motion\.div\n          className="hero-image-wrapper"\n          id="hero-img-container"/,
  `<motion.div\n          ref={portraitRef}\n          className="hero-image-wrapper"\n          id="hero-img-container"`
);

// 6. Add textStackRef to the inner motion.div
content = content.replace(
  /<motion\.div\n            className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col items-start justify-center pt-20"/,
  `<motion.div\n            ref={textStackRef}\n            className="col-span-12 md:col-span-8 lg:col-span-7 flex flex-col items-start justify-center pt-20"`
);

// 7. Add signatureRef to the signature div
content = content.replace(
  /<div\n          className="absolute top-\[5%\] md:top-\[8%\] lg:top-\[10%\] right-\[5%\] md:right-\[8%\] lg:right-\[10%\] pointer-events-none z-30"\n        >/,
  `<div\n          ref={signatureRef}\n          className="absolute top-[5%] md:top-[8%] lg:top-[10%] right-[5%] md:right-[8%] lg:right-[10%] pointer-events-none z-30"\n        >`
);

// 8. Add overlay elements and close pinnedRef
const overlays = `

        {/* NEW OVERLAY ELEMENTS ADDED AFTER EXISTING CONTENT */}

        <div ref={letterboxTopRef}
          className="absolute top-0 left-0 w-full bg-black z-40 pointer-events-none will-change-transform"
          style={{ height: "80px", transformOrigin: "top", transform: "scaleY(0)" }}
        />

        <div ref={letterboxBottomRef}
          className="absolute bottom-0 left-0 w-full bg-black z-40 pointer-events-none will-change-transform"
          style={{ height: "80px", transformOrigin: "bottom", transform: "scaleY(0)" }}
        />

        <div ref={vignetteRef}
          className="absolute inset-0 z-30 pointer-events-none opacity-0 will-change-[opacity]"
          style={{ background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.9) 100%)" }}
        />

        <div ref={dataFragmentsRef}
          className="absolute bottom-24 left-8 md:left-16 z-45 pointer-events-none flex flex-col gap-2 opacity-0 will-change-transform">
          <span className="font-label-mono text-[10px] text-white/60 tracking-widest uppercase">
            LAT 31.5204° N
          </span>
          <span className="font-label-mono text-[10px] text-white/60 tracking-widest uppercase">
            LONG 74.3587° E
          </span>
          <span className="font-label-mono text-[10px] text-white/60 tracking-widest uppercase">
            ELEVATION 217M
          </span>
        </div>

        <div ref={scanLineRef}
          className="absolute left-0 w-full z-45 pointer-events-none opacity-0 will-change-transform"
          style={{ height: "1px", background: "rgba(255,255,255,0.15)", top: "0%" }}
        />

        <div ref={exitOverlayRef}
          className="absolute inset-0 bg-black z-50 pointer-events-none opacity-0 will-change-[opacity]"
        />

      </div>
`;
content = content.replace(
  /        <\/div>\n      <\/motion\.div>\n    <\/section>/,
  `        </div>\n      </motion.div>${overlays}\n    </section>`
);

fs.writeFileSync(heroPath, content);
console.log('Patch successfully applied to Hero.tsx.');
