"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 800),
      setTimeout(() => setStep(2), 2000),
      setTimeout(() => setStep(3), 3200),
      setTimeout(() => setStep(4), 4500),
      setTimeout(() => onComplete(), 5500),
    ];

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 5 && (
        <motion.div
          key="boot-sequence"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden font-mono text-cyan-400"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.1)_0%,transparent_60%)]" />
          
          <div className="relative z-10 w-full max-w-2xl px-6 text-sm sm:text-base flex flex-col gap-2">
            {step >= 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4 opacity-70">
                <span>[0.000000]</span>
                <span>system_boot: initializing kernel...</span>
              </motion.div>
            )}
            
            {step >= 1 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4 opacity-80">
                <span>[0.104231]</span>
                <span>loading core modules... OK</span>
              </motion.div>
            )}

            {step >= 2 && (
              <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex flex-col gap-1 mt-4">
                <span className="text-white font-bold tracking-[0.3em]">INITIALIZING HS LABS...</span>
                <div className="h-1 w-full bg-white/10 mt-2 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "0%" }} 
                    animate={{ width: "100%" }} 
                    transition={{ duration: 1.2, ease: "circInOut" }}
                    className="h-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  />
                </div>
              </motion.div>
            )}

            {step >= 3 && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="flex items-center gap-4 mt-6 text-cyan-300 font-bold"
              >
                <span>[OK]</span>
                <span className="animate-pulse">SYSTEM ONLINE. ENTERING DIGITAL UNIVERSE...</span>
              </motion.div>
            )}
          </div>

          {/* Glitch lines */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="w-full h-[2px] bg-cyan-400/50 absolute top-[20%] animate-[glitch_2s_infinite]" />
            <div className="w-full h-[1px] bg-cyan-400/30 absolute top-[60%] animate-[glitch_3s_infinite_reverse]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}