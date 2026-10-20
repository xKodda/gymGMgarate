"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Flame, Zap, MapPin, Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { useAudio } from "./AudioController";

export default function ScrollZoomHero({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const heroRef = useRef<HTMLDivElement>(null);

  // Motion Scroll Zoom implementation according to motion.dev/docs/react-scroll-animations
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  // Hero Zoom In from 1 to 1.35
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  // Parallax translation for text layers
  const textY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75, 1], [1, 0.8, 0]);
  // Floating badges parallax
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  // Dark overlay intensification
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [0.45, 0.75, 0.95]);

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
      className="relative h-[160vh] md:h-[180vh] w-full bg-[#0B0B0D] overflow-clip"
    >
      {/* Sticky container that locks in viewport while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Zoom Image Container */}
        <motion.div
          style={{ scale }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src="/images/hero_gym.jpg"
            alt="Sport GM Gym Puente Alto - Centro de Alto Rendimiento"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Dynamic dark gradient vignettes */}
          <motion.div
            style={{ opacity: overlayOpacity }}
            className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/60 to-[#0B0B0D]/80"
          />
          <div className="absolute inset-0 bg-radial-vignette opacity-70" />
        </motion.div>

        {/* Cyber Grid Lines Overlay */}
        <div className="absolute inset-0 bg-grid-cyber opacity-30 pointer-events-none" />

        {/* Floating Atmospheric Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#22D6F6]/15 rounded-full blur-[140px] pointer-events-none" />

        {/* Hero Foreground Content */}
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex flex-col items-center text-center pt-16 md:pt-20"
        >
          {/* Top Live Status Indicator */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-wrap items-center justify-center gap-3 mb-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111317]/90 border border-[#1C232B] backdrop-blur-md shadow-lg">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-semibold text-white tracking-wide">
                SEDE PUENTE ALTO • ABIERTO HOY
              </span>
              <span className="text-xs text-[#22D6F6] font-mono font-bold">
                06:00 - 23:00 HRS
              </span>
            </div>

            <div className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#22D6F6]/10 border border-[#22D6F6]/30 text-xs text-[#22D6F6] font-mono font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>AFORO DISPONIBLE: 58%</span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white leading-[0.92] mb-6 font-display max-w-5xl"
          >
            LA DISCIPLINA SE CONVIERTE EN{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#22D6F6] to-[#0fbddb] text-glow">
              PODER
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.25, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl text-[#B8C2CC] max-w-3xl leading-relaxed mb-8 md:mb-10 font-normal"
          >
            Centro de entrenamiento de alto calibre en Puente Alto. Musculación pesada, CrossFit, entrenamiento funcional y pases con acceso 100% digital.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12"
          >
            <button
              onClick={() => {
                playClick();
                onOpenCheckout("Plan Trimestral Pro", "$79.990");
              }}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_35px_rgba(34,214,246,0.5)] transition-all duration-300 hover:scale-105 cursor-pointer clip-badge"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Inscribirme Online</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={scrollToNext}
              onMouseEnter={playHover}
              className="w-full sm:w-auto px-7 py-4 rounded-xl bg-[#111317]/80 hover:bg-[#1C232B] text-white border border-[#1C232B] hover:border-[#22D6F6]/50 font-bold text-sm backdrop-blur-md flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Explorar Instalaciones & Clases</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Quick Stats Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-4xl w-full pt-6 border-t border-[#1C232B]/80 text-center"
          >
            <div className="p-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                +1,200
              </span>
              <span className="text-xs text-[#8E9CAE] uppercase tracking-wider font-medium">
                Socios Activos
              </span>
            </div>

            <div className="p-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                65+
              </span>
              <span className="text-xs text-[#8E9CAE] uppercase tracking-wider font-medium">
                Máquinas Hammer Strength
              </span>
            </div>

            <div className="p-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                30+
              </span>
              <span className="text-xs text-[#8E9CAE] uppercase tracking-wider font-medium">
                Clases Semanales
              </span>
            </div>

            <div className="p-2">
              <span className="block text-2xl sm:text-3xl font-black text-white font-mono">
                100%
              </span>
              <span className="text-xs text-[#8E9CAE] uppercase tracking-wider font-medium">
                Acceso Digital QR
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll Zoom Indicator at Bottom of Sticky Viewport */}
        <motion.div
          style={{ opacity: textOpacity }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#B8C2CC]">
            Desliza para entrar al gimnasio
          </span>
          <div className="w-5 h-8 rounded-full border-2 border-[#22D6F6]/60 flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="w-1.5 h-1.5 rounded-full bg-[#22D6F6]"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
