const fs = require('fs');

const file = 'components/CinematicSequence.tsx';
const content = fs.readFileSync(file, 'utf8');

const regex = /\{\/\* SIGNATURE LOGO \*\/\}\s*<div className="absolute top-\[5%\][^>]*>\s*<svg[\s\S]*?<\/svg>\s*<\/div>/;

// Extract the d attributes from the existing paths
const pathsMatches = [...content.matchAll(/<motion\.path\s+d="([^"]+)"/g)];
const dStrings = pathsMatches.map(m => m[1]);

const containerVariants = `const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.5 }
  }
};`;

const pathVariants = `const pathVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { 
    pathLength: 1, 
    opacity: 1, 
    transition: { duration: 2.5, ease: [0.16, 1, 0.3, 1] } 
  }
};`;

const newPaths = dStrings.map(d => `              <motion.path 
                d="${d}" 
                fill="none" 
                stroke="#FFFFFF" 
                strokeWidth="1.2" 
                variants={pathVariants}
              />`).join('\n');

const newLogoBlock = `{/* SIGNATURE LOGO */}
          <div className="absolute top-[5%] md:top-[8%] lg:top-[10%] right-[5%] md:right-[8%] lg:right-[10%] pointer-events-none z-[100] flex items-center justify-center">
            <motion.svg 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              viewBox="0 0 1024 544" 
              className="w-[180px] md:w-[220px] lg:w-[260px] h-auto origin-center invert opacity-90" 
              preserveAspectRatio="xMidYMid meet"
            >
${newPaths}
            </motion.svg>
          </div>`;

let newContent = content.replace(regex, newLogoBlock);

// We need to insert containerVariants and pathVariants inside the CinematicSequence component.
// The component starts with `export default function CinematicSequence() {`
if (!newContent.includes('const containerVariants')) {
  newContent = newContent.replace(
    'export default function CinematicSequence() {',
    `export default function CinematicSequence() {\n  ${containerVariants.replace(/\n/g, '\n  ')}\n\n  ${pathVariants.replace(/\n/g, '\n  ')}\n`
  );
}

fs.writeFileSync(file, newContent);
console.log('Replaced successfully');
