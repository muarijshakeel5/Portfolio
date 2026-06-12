"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const bootSequence = [
  "INITIALIZING YN-SYS KERNEL v2.0.26...",
  "LOADING CORE MODULES: [ OK ]",
  "MOUNTING VIRTUAL FILESYSTEM: [ OK ]",
  "ESTABLISHING SECURE CONNECTION...",
  "ACCESS GRANTED.",
  "",
  "Welcome to the terminal.",
  "Type 'help' to see available commands."
];

export default function Terminal() {
  const [output, setOutput] = useState<string>("");
  const indexRef = useRef(0);
  const charRef = useRef(0);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    const typeLine = () => {
      if (indexRef.current < bootSequence.length) {
        const currentLine = bootSequence[indexRef.current];
        if (charRef.current < currentLine.length) {
          setOutput(prev => prev + currentLine.charAt(charRef.current));
          charRef.current++;
          timeout = setTimeout(typeLine, 20 + Math.random() * 30);
        } else {
          setOutput(prev => prev + "\n");
          charRef.current = 0;
          indexRef.current++;
          timeout = setTimeout(typeLine, 200 + Math.random() * 300);
        }
      }
    };
    
    timeout = setTimeout(typeLine, 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center border-t border-[#1e1e1e] relative" id="terminal">
      <div className="w-full max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10 flex flex-col items-center justify-center h-full py-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="terminal-container w-full max-w-3xl bg-[#0d0d0d] flex flex-col h-[500px] md:h-[550px] min-h-[300px]"
        >
          {/* Terminal Header */}
          <div className="h-8 border-b border-[#1e1e1e] flex items-center px-4 space-x-2 bg-[#0d0d0d] shrink-0">
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
            <div className="flex-grow text-center font-label-mono text-label-mono text-outline">user@yn-sys:~</div>
          </div>
          {/* Terminal Body */}
          <div className="flex-grow p-6 overflow-y-auto font-label-mono text-label-mono text-primary whitespace-pre-wrap text-xs md:text-sm">
            {output}<span className="cursor-blink"></span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
