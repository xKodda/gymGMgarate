"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Flame, ArrowRight } from "lucide-react";
import { useAudio } from "./AudioController";

export default function ScrollZoomHero({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const heroRef = useRef<HTMLDivElement>(null);

  // Smooth scroll zoom without sticky dead-zones
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Natural image zoom and subtle parallax depth on scroll
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const scrollToNext = () => {
    playClick();
    const elem = document.querySelector("#disciplinas");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#0B0B0D] overflow-hidden flex flex-col justify-center items-center pt-28 md:pt-36 pb-16 md:pb-20"
    >
      {/* Background Zoom Image Container - Natural scroll zoom without sticky lock */}
      <motion.div
        style={{ scale, y: imageY }}
        className="absolute inset-0 w-full h-full will-change-transform pointer-events-none"
      >
        <Image
          src="/images/hero_gym.jpg"
          alt="Sport GM Gym Puente Alto - Centro de Alto Rendimiento"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Natural contrast vignettes */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/50 to-[#0B0B0D]/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-60" />
      </motion.div>

      {/* Cyber Grid Lines Overlay */}
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />

      {/* Subtle Atmospheric Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#22D6F6]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col items-center text-center">
        
        {/* Main Headline (Clear clearance below navbar) */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[1.02] sm:leading-[0.94] mb-5 sm:mb-6 font-display max-w-5xl px-1 break-words"
        >
          LA DISCIPLINA SE CONVIERTE EN{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#22D6F6] to-[#0fbddb]">
            PODER
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-sm sm:text-lg md:text-xl text-[#94A3B8] max-w-3xl leading-relaxed mb-8 md:mb-10 font-normal px-2"
        >
          Centro de entrenamiento de alto calibre en Puente Alto. Musculación pesada, CrossFit, entrenamiento funcional y pases con acceso 100% digital.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto px-2 sm:px-0"
        >
          <button
            onClick={() => {
              playClick();
              onOpenCheckout("Plan Trimestral Pro", "$79.990");
            }}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(34,214,246,0.4)] transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            <Flame className="w-4 h-4 fill-current" />
            <span>Inscribirme Online</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={scrollToNext}
            onMouseEnter={playHover}
            className="w-full sm:w-auto px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl bg-[#111317]/80 hover:bg-[#1C232B] text-white border border-[#1C232B] hover:border-[#384352] font-bold text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <span>Explorar Instalaciones & Clases</span>
            <ArrowDown className="w-4 h-4 text-[#8E9CAE]" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}
