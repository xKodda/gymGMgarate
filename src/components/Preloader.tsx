"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Disable body scroll while preloader is active
    document.body.style.overflow = "hidden";

    // Progress counter animation from 0 to 100
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Accelerate towards the end
        const increment = prev < 70 ? Math.floor(Math.random() * 8) + 4 : Math.floor(Math.random() * 12) + 6;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        document.body.style.overflow = "";
        if (onComplete) onComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -25,
            filter: "blur(16px)",
            transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0B0B0D] px-4 selection:bg-transparent overflow-hidden"
        >
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-radial-vignette opacity-80 pointer-events-none" />

          {/* Background ambient glow */}
          <div className="absolute w-96 h-96 rounded-full bg-[#22D6F6]/5 blur-3xl pointer-events-none" />

          {/* Center Brand & Motivational Statement */}
          <div className="relative z-10 flex flex-col items-center text-center max-w-lg mx-auto">
            
            {/* Official Logo Container with Pulse */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border border-[#22D6F6]/30 shadow-[0_0_35px_rgba(34,214,246,0.2)] mb-6 sm:mb-8 bg-[#111317] p-2 flex items-center justify-center shrink-0"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/logo.jpg"
                  alt="Sport GM Gym Logo"
                  fill
                  priority
                  className="object-contain"
                />
              </div>

              {/* Glowing rim pulse */}
              <motion.div
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.2,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-2xl border border-[#22D6F6]/40 pointer-events-none"
              />
            </motion.div>

            {/* Motivational Title: Prohibido rendirse */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-2xl sm:text-4xl md:text-5xl font-black uppercase tracking-wide sm:tracking-wider text-white font-display mb-2 sm:mb-3 drop-shadow-sm px-2"
            >
              Prohibido rendirse
            </motion.h1>

            {/* Subtitle: respira hondo y sigue */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="text-sm sm:text-lg text-[#94A3B8] font-light italic tracking-wide mb-8 sm:mb-10 px-2"
            >
              Respira hondo y sigue
            </motion.p>

            {/* Minimalist Progress Meter */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="w-48 sm:w-64 flex flex-col items-center gap-3 px-2"
            >
              {/* Fine hairline progress track */}
              <div className="w-full h-[3px] bg-[#1C232B] rounded-full overflow-hidden">
                <motion.div
                  style={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-[#22D6F6] to-white transition-all duration-75 ease-out shadow-[0_0_12px_rgba(34,214,246,0.8)]"
                />
              </div>

              {/* Monospace Percentage */}
              <div className="flex items-center justify-between w-full text-[11px] font-mono text-[#8E9CAE]">
                <span>SPORT GM // CHILE</span>
                <span className="text-[#22D6F6] font-bold">{progress}%</span>
              </div>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
