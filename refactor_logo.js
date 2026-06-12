const fs = require('fs');

const logoSvg = fs.readFileSync('public/logo.svg', 'utf8');
const paths = [...logoSvg.matchAll(/d="([^"]+)"/g)].map(m => m[1].replace(/\s+/g, ' '));

const pathComponents = paths.map((d, i) => `                  <motion.path 
                    d="${d.trim()}" 
                    fill="white" 
                    stroke="white" 
                    strokeWidth="1.2" 
                    initial={{ pathLength: 0, fillOpacity: 0 }} 
                    animate={{ pathLength: 1, fillOpacity: 1 }} 
                    transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }} 
                  />`).join('\n');

const replacement = `          <div className="absolute top-[5%] md:top-[8%] lg:top-[10%] right-[5%] md:right-[8%] lg:right-[10%] pointer-events-none z-[100] flex items-center justify-center">
            <svg 
              viewBox="0 0 1024 544" 
              className="w-[180px] md:w-[220px] lg:w-[260px] h-auto origin-center invert opacity-90" 
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <mask id="signature-mask">
${pathComponents}
                </mask>
              </defs>
              <image href="/logo.svg" width="1024" height="544" mask="url(#signature-mask)" />
            </svg>
          </div>`;

const cinematic = fs.readFileSync('components/CinematicSequence.tsx', 'utf8');

const regex = /\{\/\* SIGNATURE LOGO \*\/\}\s*<motion\.div[\s\S]*?<\/svg>\s*<\/motion\.div>/;
const newCinematic = cinematic.replace(regex, `{/* SIGNATURE LOGO */}\n${replacement}`);

fs.writeFileSync('components/CinematicSequence.tsx', newCinematic);
console.log('Done!');
