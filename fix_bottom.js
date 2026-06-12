const fs = require('fs');

let content = fs.readFileSync('components/CinematicSequence.tsx', 'utf8');

const aboutSection = `
          </div> {/* close heroStageRef */}

          {/* ABOUT SECTION REVEAL */}
          <div 
            ref={aboutSectionRef}
            className="absolute inset-0 z-30 w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop hidden items-center"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-12 gap-y-16 w-full py-16 mt-20">
              <div 
                ref={aboutStatsRef}
                className="col-span-12 md:col-span-5 md:col-start-2 flex flex-col justify-center opacity-0 will-change-transform"
              >
                <div className="mb-12 flex items-center space-x-4">
                  <div className="w-8 h-[1px] bg-primary"></div>
                  <h2 className="font-label-mono text-label-mono text-primary tracking-widest uppercase">ABOUT — 02</h2>
                </div>
                <div className="space-y-8">
                  <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                    <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">4+</span>
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Years Experience</span>
                  </div>
                  <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                    <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">30+</span>
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Projects Delivered</span>
                  </div>
                  <div className="flex flex-col border-l border-surface-tint pl-6 hover:border-primary transition-colors duration-500 cursor-default">
                    <span className="font-display-lg text-4xl md:text-6xl text-on-background mb-2">12+</span>
                    <span className="font-label-mono text-label-mono text-outline uppercase tracking-widest">Global Clients</span>
                  </div>
                </div>
              </div>
              <div 
                ref={aboutContentRef}
                className="col-span-12 md:col-span-6 flex flex-col justify-center opacity-0 will-change-transform"
              >
                <div className="bg-[#0d0d0d]/80 backdrop-blur-md p-8 md:p-12 border border-surface-tint relative">
                  <div className="absolute top-0 left-0 w-2 h-2 bg-primary -translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-primary translate-x-1/2 translate-y-1/2"></div>
                  <div className="font-headline-lg text-2xl md:text-3xl text-on-background leading-relaxed mb-12 italic opacity-90">
                    "A relentless pursuit of architectural elegance in code. I fuse brutalist aesthetics with hyper-performant engineering to construct digital environments that command attention and refuse to be ignored."
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Link href="#" className="brutalist-border flex flex-col items-center justify-center p-6 bg-transparent text-primary hover:bg-primary hover:text-surface-dim font-ui-button text-ui-button uppercase tracking-wider group aspect-square">
                      <span className="material-symbols-outlined mb-4 text-2xl group-hover:-translate-y-1 transition-transform">download</span>
                      <span className="text-xs text-center">Download CV</span>
                    </Link>
                    <Link href="#" className="brutalist-border flex flex-col items-center justify-center p-6 bg-[#141313] text-primary hover:bg-primary hover:text-surface-dim font-ui-button text-ui-button uppercase tracking-wider group aspect-square">
                      <span className="material-symbols-outlined mb-4 text-2xl group-hover:rotate-12 transition-transform">code</span>
                      <span className="text-xs text-center">View GitHub</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
`;

content = content.replace(
  /<\/motion\.svg>\n          <\/div>\n        <\/motion\.div>/,
  `</motion.svg>\n          </div>\n${aboutSection}\n        </motion.div>`
);

fs.writeFileSync('components/CinematicSequence.tsx', content);
