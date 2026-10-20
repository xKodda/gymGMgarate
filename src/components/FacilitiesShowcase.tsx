"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Dumbbell, Flame, Target, Trophy, ArrowRight, ChevronRight, Check } from "lucide-react";
import { useAudio } from "./AudioController";

const zones = [
  {
    id: 1,
    code: "01",
    title: "Musculación Biomecánica & Hipertrofia",
    tagline: "Maquinaria Hammer Strength & Plataformas de Potencia",
    category: "Fuerza Pura",
    description:
      "Diseñado para el entrenamiento de fuerza de alta exigencia biomecánica. Una planta pesada con racks de sentadilla Hammer Strength, plataformas olímpicas de tarima multicapa y barras calibradas de competición.",
    narrative:
      "Cada estación ha sido orientada para garantizar una trayectoria articular natural y máxima tensión mecánica sin sobrecargar articulaciones. Disponemos de mancuernas sólidas de uretano hasta 50 kg y poleas dobles ajustables con desmultiplicación exacta para un aislamiento muscular perfecto.",
    image: "/images/athlete_strength.jpg",
    icon: Dumbbell,
    specs: [
      { label: "Equipamiento", value: "Hammer Strength Iso-Lateral & Dual Pulley" },
      { label: "Carga Olímpica", value: "Barras Eleiko & Rogue 20kg calibradas" },
      { label: "Mancuernas", value: "Rango continuo de 2.5kg hasta 50kg" },
      { label: "Pavimento", value: "Caucho vulcanizado acústico de 50mm" },
    ],
    highlight: "Espacio concebido para series pesadas, máxima estabilidad y cero congestión en horas punta.",
  },
  {
    id: 2,
    code: "02",
    title: "Rendimiento Funcional & Pista de Césped",
    tagline: "25 Metros de Acondicionamiento Metabólico y Tracción",
    category: "Potencia & Agilidad",
    description:
      "Zona abierta de acondicionamiento metabólico con 25 metros lineales de césped sintético de alta densidad para empuje de trineos lastrados, saltos y trabajo neuromuscular.",
    narrative:
      "Un entorno dinámico pensado para el desarrollo integral del atleta: transferencia de fuerza al sprint, aceleración, desaceleración y capacidad cardiovascular con remos Concept2, SkiErg y cajones pliométricos.",
    image: "/images/functional_training.jpg",
    icon: Flame,
    specs: [
      { label: "Pista de Empuje", value: "25m lineales de césped sintético continuo" },
      { label: "Ergómetros", value: "Concept2 Rowers, SkiErg & Assault Bikes" },
      { label: "Lastre y Pesos", value: "Trineos de empuje, kettlebells hasta 36kg" },
      { label: "Dinámica", value: "Paredes de lanzamiento de balones medicinales" },
    ],
    highlight: "Desarrolla resistencia real y transfiere tu fuerza a movimientos atléticos de alto impacto.",
  },
  {
    id: 3,
    code: "03",
    title: "Laboratorio de Coaching & Evaluación Técnica",
    tagline: "Biomecánica, Análisis de Video y Periodización",
    category: "Tecnología Deportiva",
    description:
      "Área dedicada al diagnóstico antropométrico, calibración de cargas y análisis por video de la técnica de levantamiento en sentadilla, peso muerto y empujes.",
    narrative:
      "La ciencia del entrenamiento aplicada a tu objetivo individual. Cada socio recibe una valoración técnica inicial con determinación de rangos óptimos de trabajo y acceso a videoteca técnica en la app de Sport GM.",
    image: "/images/coach_tech.jpg",
    icon: Target,
    specs: [
      { label: "Diagnóstico", value: "Bioimpedancia segmentaria y movilidad" },
      { label: "Análisis Técnico", value: "Grabación y corrección de trayectoria de barra" },
      { label: "Programación", value: "Periodización estructurada por bloques en app" },
      { label: "Supervisión", value: "Head Coaches certificados en sala permanente" },
    ],
    highlight: "Sin conjeturas ni rutinas genéricas. Progresión medida semana a semana con respaldo técnico.",
  },
  {
    id: 4,
    code: "04",
    title: "Box de Atletas & Comunidad de Récords",
    tagline: "Cultura de Superación sin Egos ni Distracciones",
    category: "Cultura Sport GM",
    description:
      "El núcleo donde la motivación compartida elimina cualquier excusa. Un ambiente de compañerismo auténtico donde cada nuevo récord personal (PR) se celebra en equipo.",
    narrative:
      "En Sport GM no eres un número de membresía. Entrenas rodeado de deportistas comprometidos, con acústica calibrada JBL Pro, ventilación forzada y una atmósfera que exige tu mejor versión en cada repetición.",
    image: "/images/community.jpg",
    icon: Trophy,
    specs: [
      { label: "Pizarra de PRs", value: "Registro comunitario de marcas y progresos" },
      { label: "Eventos", value: "Desafíos trimestrales y testings de fuerza" },
      { label: "Confort", value: "Lockers digitales y duchas de alta presión" },
      { label: "Ambiente", value: "Sonido Hi-Fi y renovación constante de aire" },
    ],
    highlight: "La energía de la sala marca la diferencia entre abandonar o romper tu marca personal.",
  },
];

export default function FacilitiesShowcase() {
  const { playClick, playHover } = useAudio();
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRevealRef = useRef<HTMLDivElement>(null);

  // SCROLL IMAGE REVEAL: Segundo y último efecto protagonista
  // Vinculado al desplazamiento natural para un desvelado cinematográfico de apertura sin bloquear el scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 45%"],
  });

  // Dynamic aperture mask (clip-path inset reveal)
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(12% 8% 12% 8% round 28px)", "inset(0% 0% 0% 0% round 16px)"]
  );

  // Smooth counter-zoom: starts at 1.16 and settles at 1.0
  const imageZoom = useTransform(scrollYProgress, [0, 1], [1.16, 1.0]);

  // Subtle tonal contrast enhancement during reveal
  const imageBrightness = useTransform(scrollYProgress, [0, 1], [0.8, 1.0]);

  // Curtain veil fade out
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.55, 0.15, 0]);

  // Coordinated metadata entrance
  const metaY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);

  const activeZone = zones[activeTab];
  const Icon = activeZone.icon;

  return (
    <section
      ref={sectionRef}
      id="instalaciones"
      className="py-28 md:py-36 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: TITULAR INTERMEDIO GRANDE (Hierarchical Anchor #2) */}
        <div className="max-w-4xl mb-16 md:mb-24">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>02 // ZONAS & INFRAESTRUCTURA DE ÉLITE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.96] font-display mb-6"
          >
            ARQUITECTURA DE FUERZA Y PRECISIÓN BIOMECÁNICA
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed"
          >
            850 m² concebidos bajo estándares olímpicos en Puente Alto. Cada zona cuenta con iluminación focal de alto contraste, maquinaria oficial Hammer Strength y espacio calculado para entrenar con total libertad.
          </motion.p>
        </div>

        {/* Editorial Composition: SCROLL IMAGE REVEAL + Distributed Editorial Texts */}
        <div className="grid lg:grid-cols-12 gap-8 xl:gap-14 items-start">
          
          {/* Left Column (7 cols): The Scroll Image Reveal Container */}
          <div className="lg:col-span-7">
            
            {/* Outer viewport frame with dynamic Scroll-Driven Aperture / Clip Reveal */}
            <motion.div
              ref={imageRevealRef}
              style={{
                clipPath,
              }}
              className="relative rounded-2xl overflow-hidden bg-[#111317] border border-[#1C232B] shadow-2xl aspect-[4/3] sm:aspect-[16/11] will-change-[clip-path,transform]"
            >
              {/* Dynamic counter-zoom and contrast layer linked to scroll */}
              <motion.div
                style={{
                  scale: imageZoom,
                  filter: imageBrightness ? `brightness(${imageBrightness.get()})` : "none",
                }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeZone.image}
                      alt={activeZone.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 58vw"
                      className="object-cover"
                    />

                    {/* Natural photographic vignette with deep athletic contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/40 via-transparent to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Scroll Curtain Fade */}
              <motion.div
                style={{ opacity: curtainOpacity }}
                className="absolute inset-0 bg-[#0B0B0D] pointer-events-none"
              />

              {/* Top Meta Bar - Revealed smoothly as aperture opens */}
              <motion.div
                style={{ y: metaY, opacity: metaOpacity }}
                className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-xs font-mono font-medium text-white shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>ZONA {activeZone.code} / 04</span>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-xs font-mono uppercase tracking-wider text-[#94A3B8] shadow-lg">
                  <span>{activeZone.category}</span>
                </div>
              </motion.div>

              {/* Bottom Architectural Caption - Revealed in sync */}
              <motion.div
                style={{ y: metaY, opacity: metaOpacity }}
                className="absolute bottom-4 left-4 right-4 z-10 p-4 rounded-xl bg-[#0B0B0D]/90 backdrop-blur-md border border-[#1C232B] shadow-lg"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-[#8E9CAE] uppercase tracking-wider">
                      INSTALACIÓN OFICIAL SPORT GM
                    </p>
                    <p className="text-sm font-bold text-white uppercase tracking-tight">
                      {activeZone.tagline}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-mono text-[#8E9CAE]">
                    <span className="text-white font-bold">{activeZone.code}</span>
                    <span>/ 04</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Quick Thumbnail / Zone Pagination Bar */}
            <div className="grid grid-cols-4 gap-3 mt-4">
              {zones.map((zone, idx) => (
                <button
                  key={zone.id}
                  onClick={() => {
                    playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={playHover}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    activeTab === idx
                      ? "bg-[#161a22] border-white/40 shadow-md"
                      : "bg-[#0E1014] border-[#1C232B] hover:border-[#2D3748] opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="block text-xs font-mono font-bold text-white mb-0.5">
                    {zone.code}
                  </span>
                  <span className="block text-[11px] text-[#8E9CAE] truncate font-medium">
                    {zone.category}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column (5 cols): Distributed Editorial Texts & Technical Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            
            {/* Zone Selector Tabs with Discrete Hover Interactions */}
            <div className="space-y-2">
              {zones.map((zone, idx) => {
                const isCurrent = activeTab === idx;

                return (
                  <button
                    key={zone.id}
                    onClick={() => {
                      playClick();
                      setActiveTab(idx);
                    }}
                    onMouseEnter={playHover}
                    className={`w-full text-left p-4 rounded-xl transition-all cursor-pointer flex items-center justify-between border ${
                      isCurrent
                        ? "bg-[#14171E] border-[#2E3846] text-white"
                        : "bg-transparent border-transparent hover:bg-[#111317] hover:border-[#1C232B] text-[#8E9CAE]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-xs font-mono font-bold ${isCurrent ? "text-white" : "text-[#64748B]"}`}>
                        {zone.code}
                      </span>
                      <span className={`text-sm font-bold uppercase tracking-tight truncate ${isCurrent ? "text-white" : "text-[#8E9CAE]"}`}>
                        {zone.title}
                      </span>
                    </div>
                    <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-transform ${isCurrent ? "rotate-90 text-white" : "text-[#475569]"}`} />
                  </button>
                );
              })}
            </div>

            {/* Active Zone Editorial Detail Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeZone.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl bg-[#111317] border border-[#1C232B] p-6 sm:p-8 space-y-6"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4 text-white" />
                    <span className="text-xs font-mono uppercase tracking-wider text-[#8E9CAE]">
                      {activeZone.category}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black uppercase text-white tracking-tight mb-3">
                    {activeZone.title}
                  </h3>
                  <p className="text-sm text-[#B8C2CC] leading-relaxed mb-4">
                    {activeZone.description}
                  </p>
                  <p className="text-xs text-[#8E9CAE] leading-relaxed">
                    {activeZone.narrative}
                  </p>
                </div>

                {/* Technical Specs 2x2 Matrix */}
                <div className="pt-5 border-t border-[#1C232B]">
                  <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#64748B] mb-3">
                    FICHA TÉCNICA DE ZONA
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeZone.specs.map((item, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-[#0B0B0D] border border-[#1C232B]">
                        <span className="block text-[10px] font-mono text-[#8E9CAE] uppercase tracking-wider mb-0.5">
                          {item.label}
                        </span>
                        <span className="block text-xs font-semibold text-white leading-snug">
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Editorial Quote Callout */}
                <div className="p-3.5 rounded-xl bg-[#0E1014] border-l-2 border-white/60 text-xs text-[#94A3B8] italic">
                  "{activeZone.highlight}"
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

        {/* Bottom Architectural Metrics Strip with generous negative space */}
        <div className="mt-20 md:mt-28 pt-12 border-t border-[#1C232B] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
              850 M²
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Superficie Construida
            </span>
          </div>

          <div>
            <span className="block text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
              50 KG
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Mancuernas Máximas
            </span>
          </div>

          <div>
            <span className="block text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
              HAMMER & ELEIKO
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Equipamiento Oficial
            </span>
          </div>

          <div>
            <span className="block text-3xl md:text-4xl font-black text-white font-mono tracking-tight">
              100% QR
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Acceso Digital
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
