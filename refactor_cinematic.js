const fs = require('fs');

let content = fs.readFileSync('components/CinematicSequence.tsx', 'utf8');

// 1. Ref changes
content = content.replace(
  `  const heroTextStackRef = useRef<HTMLDivElement>(null);\n  const portraitZoomContainerRef = useRef<HTMLDivElement>(null);\n  const staticImageRef = useRef<HTMLDivElement>(null);\n  const parallaxLayerRef = useRef<HTMLDivElement>(null);`,
  `  const heroStageRef = useRef<HTMLDivElement>(null);\n  const heroTextStackRef = useRef<HTMLDivElement>(null);\n  const parallaxLayerRef = useRef<HTMLDivElement>(null);`
);

// 2. Preloader & renderFrame changes
content = content.replace(
  /for \(let i = 1; i <= 38; i\+\)/g,
  `for (let i = 1; i <= 111; i++)`
);
content = content.replace(
  /imagesRef\.current\.length < 38/g,
  `imagesRef.current.length < 111`
);
content = content.replace(
  `    if (canvasRatio > imgRatio) {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    }`,
  `    if (canvasRatio > imgRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }`
);

// 3. GSAP Timeline changes
content = content.replace(
  /    const tl = gsap\.timeline\(\{[\s\S]*?anticipatePin: 1,\n      \}\n    \}\);\n\n    const phase1Duration = 30; \/\/ 0-30%\n    const phase3Duration = 40; \/\/ 30-70%\n    const phase4Duration = 30; \/\/ 70-100%[\s\S]*?phase1Duration \+ phase3Duration \+ \(phase4Duration \* 0\.2\)\n    \);/,
  `    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sequenceWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Heavy luxury inertia dampening
        pin: pinnedContainerRef.current,
        anticipatePin: 1,
      }
    });

    const phase1Duration = 25; // 0-25%
    const phase2Duration = 5;  // 25-30%
    const phase3Duration = 45; // 30-75%
    const phase4Duration = 25; // 75-100%

    // Phase 1: Isolated Hero Departure (0 - 25%)
    tl.to(heroStageRef.current, { opacity: 0, ease: "power2.inOut", duration: phase1Duration }, 0);

    // Phase 2: About Canvas Activation (25 - 30%)
    tl.to(canvasRef.current, { opacity: 1, ease: "power2.inOut", duration: phase2Duration }, phase1Duration);

    // Phase 3: High-Density 111-Frame Scrubbing (30 - 75%)
    const frameTracker = { frame: 1 };
    tl.to(frameTracker, {
      frame: 111,
      ease: "none",
      duration: phase3Duration,
      onUpdate: () => {
        renderFrame(Math.floor(frameTracker.frame));
      }
    }, phase1Duration + phase2Duration);

    // Phase 4: About Metrics Cascade (75 - 100%)
    tl.set(aboutSectionRef.current, { display: "flex" }, phase1Duration + phase2Duration);
    
    tl.fromTo(aboutStatsRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: phase4Duration * 0.5 },
      phase1Duration + phase2Duration + phase3Duration
    );

    tl.fromTo(aboutContentRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, ease: "power2.out", duration: phase4Duration * 0.5 },
      phase1Duration + phase2Duration + phase3Duration + (phase4Duration * 0.2)
    );`
);

// 4. DOM Layout changes

// First, extract ABOUT SECTION REVEAL
const aboutSectionRegex = /          \{\/\* ABOUT SECTION REVEAL \*\/\}[\s\S]*?\{\/\* SIGNATURE LOGO \*\/\}/;
const aboutSectionMatch = content.match(aboutSectionRegex);
if (!aboutSectionMatch) throw new Error("Could not find about section");
const aboutSectionContent = aboutSectionMatch[0].replace('          {/* SIGNATURE LOGO */}', '').trimEnd();

// Remove ABOUT SECTION REVEAL from its current spot
content = content.replace(aboutSectionContent, '');

// Re-structure the top part of camera-layer
content = content.replace(
  `        <motion.div\n          id="camera-layer"\n          className="w-full h-full relative"\n          initial={hasPlayedIntro ? false : { scale: 6 }}\n          animate={{ scale: isDrawing ? 6 : 1 }}\n          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}\n        >\n          <div className="depth-lines"></div>\n\n          {/* GSAP PORTRAIT ZOOM LAYER */}\n          <div ref={portraitZoomContainerRef} className="absolute inset-0 w-full h-full will-change-transform z-10">\n            {/* STATIC IMAGE */}\n            <div ref={staticImageRef} className="absolute inset-0 w-full h-full">\n              <motion.div\n                className="w-full h-full relative hero-image-wrapper"\n                initial={hasPlayedIntro ? false : { filter: "blur(40px) brightness(0.4)" }}\n                animate={{ filter: "blur(0px) brightness(1)" }}\n                transition={{ delay: hasPlayedIntro ? 0 : 2.5, duration: 2.0, ease: [0.19, 1, 0.22, 1] }}\n              >\n                <Image\n                  alt="Cinematic portrait of a developer"\n                  className="hero-image"\n                  src="/img.png"\n                  fill\n                  priority\n                />\n              </motion.div>\n            </div>\n\n            {/* CANVAS ELEMENT */}\n            <div className="absolute inset-0 w-full h-full pointer-events-none">\n              <canvas \n                ref={canvasRef}\n                className="w-full h-full object-cover object-center hero-image opacity-0 will-change-transform"\n              />\n            </div>\n          </div>\n\n          {/* HERO TEXT STACK */}`,
  `        <motion.div
          id="camera-layer"
          className="w-full h-full relative z-60 will-change-transform"
          initial={hasPlayedIntro ? false : { scale: 6 }}
          animate={{ scale: isDrawing ? 6 : 1 }}
          transition={{ duration: 1.8, ease: [0.19, 1, 0.22, 1] }}
        >
          {/* CANVAS LAYER (Phase 2 Reveal, Phase 3 Scrub) */}
          <div className="absolute inset-0 w-full h-full pointer-events-none z-40">
            <canvas 
              ref={canvasRef}
              className="w-full h-full opacity-0 will-change-[opacity,transform]"
            />
          </div>

          {/* HERO ISOLATION STAGE (Phase 1 Fade Out) */}
          <div ref={heroStageRef} className="absolute inset-0 w-full h-full z-50 will-change-[opacity,transform]">
            <div className="depth-lines"></div>

            {/* STATIC IMAGE */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <motion.div
                className="w-full h-full relative hero-image-wrapper"
                initial={hasPlayedIntro ? false : { filter: "blur(40px) brightness(0.4)" }}
                animate={{ filter: "blur(0px) brightness(1)" }}
                transition={{ delay: hasPlayedIntro ? 0 : 2.5, duration: 2.0, ease: [0.19, 1, 0.22, 1] }}
              >
                <Image
                  alt="Cinematic portrait of a developer"
                  className="hero-image"
                  src="/img.png"
                  fill
                  priority
                />
              </motion.div>
            </div>

          {/* HERO TEXT STACK */}`
);

// Inject ABOUT SECTION REVEAL after SIGNATURE LOGO
const signatureLogoEndRegex = /          \{\/\* SIGNATURE LOGO \*\/\}[\s\S]*?<\/motion\.div>\n        <\/div>\n      <\/div>\n    <\/div>\n  \);\n\}/;
const signatureMatch = content.match(signatureLogoEndRegex);
if (!signatureMatch) throw new Error("Could not find signature logo end");

content = content.replace(
  signatureMatch[0],
  signatureMatch[0].replace(
    /            <\/motion\.svg>\n          <\/div>/,
    `            </motion.svg>\n          </div>\n\n          </div>\n\n\n` + aboutSectionContent + `\n`
  )
);

fs.writeFileSync('components/CinematicSequence.tsx', content);
console.log("Refactoring complete");
