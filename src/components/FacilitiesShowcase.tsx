"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Dumbbell, Flame, Target, Trophy, ChevronRight } from "lucide-react";
import { useAudio } from "./AudioController";

const zones = [
  {
    id: 1,
    code: "01",
    title: "Musculación Biomecánica & Hipertrofia",
    tagline: "Plataformas Hammer Strength & Carga Calibrada",
    category: "Fuerza Pura",
    description:
      "Planta pesada diseñada para maximizar la tensión mecánica con seguridad biomecánica total. Racks de potencia oficiales Hammer Strength y barras olímpicas de competición.",
    narrative:
      "Estaciones orientadas para garantizar trayectoria articular natural y máxima sobrecarga progresiva sin fricción articular. Mancuernas continuas de uretano hasta 50 kg y poleas duales calibradas.",
    image: "/images/gym_facility_hammer.jpg",
    icon: Dumbbell,
    specs: [
      { label: "Maquinaria", value: "Hammer Strength Iso-Lateral" },
      { label: "Barras", value: "Eleiko & Rogue 20kg Calibradas" },
      { label: "Mancuernas", value: "Uretano hasta 50 kg" },
      { label: "Piso", value: "Caucho acústico 50mm" },
    ],
    highlight: "Espacio concebido para series pesadas, máxima estabilidad y cero congestión.",
  },
  {
    id: 2,
    code: "02",
    title: "Rendimiento Funcional & Pista de Césped",
    tagline: "25 Metros de Acondicionamiento Metabólico",
    category: "Potencia & Agilidad",
    description:
      "Zona abierta con 25 metros lineales de césped sintético de alta tracción para empuje de trineos lastrados, saltos y potencia neuromuscular.",
    narrative:
      "Diseñado para la transferencia atlética: aceleración, empuje explosivo y resistencia cardiovascular con remos de aire Concept2, SkiErg y cajones de competición.",
    image: "/images/functional_training.jpg",
    icon: Flame,
    specs: [
      { label: "Pista", value: "25m Césped Sintético Continuo" },
      { label: "Ergómetros", value: "Concept2 Rowers & SkiErg" },
      { label: "Tracción", value: "Trineos lastrados hasta 200 kg" },
      { label: "Dinámica", value: "Kettlebells de Competición" },
    ],
    highlight: "Desarrolla resistencia real y transfiere tu fuerza a movimientos de alto impacto.",
  },
  {
    id: 3,
    code: "03",
    title: "Laboratorio de Coaching & Biomecánica",
    tagline: "Análisis de Video y Periodización",
    category: "Tecnología Deportiva",
    description:
      "Diagnóstico antropométrico, calibración de cargas de trabajo y análisis por video de la técnica de levantamiento en sentadilla y peso muerto.",
    narrative:
      "Ciencia del entrenamiento aplicada a tu objetivo individual. Valoración técnica inicial con rangos óptimos de trabajo y biblioteca técnica en app.",
    image: "/images/coach_tech.jpg",
    icon: Target,
    specs: [
      { label: "Diagnóstico", value: "Bioimpedancia & Movilidad" },
      { label: "Análisis", value: "Trayectoria de barra por video" },
      { label: "Plan", value: "Periodización estructurada en app" },
      { label: "Coaching", value: "Head Coaches en sala permanente" },
    ],
    highlight: "Sin conjeturas ni rutinas genéricas. Progresión medida semana a semana.",
  },
  {
    id: 4,
    code: "04",
    title: "Box de Atletas & Comunidad",
    tagline: "Cultura de Superación sin Egos",
    category: "Cultura Sport GM",
    description:
      "El núcleo donde la motivación colectiva elimina cualquier excusa. Ambiente de respeto donde cada récord personal (PR) se celebra en equipo.",
    narrative:
      "Entrenas rodeado de deportistas comprometidos, con acústica calibrada JBL Pro, ventilación forzada y una atmósfera que exige tu mejor versión.",
    image: "/images/community.jpg",
    icon: Trophy,
    specs: [
      { label: "Pizarra", value: "Registro de Récords Personales" },
      { label: "Eventos", value: "Desafíos trimestrales de fuerza" },
      { label: "Confort", value: "Lockers y duchas de alta presión" },
      { label: "Aire", value: "Renovación forzada 100% exterior" },
    ],
    highlight: "La energía de la sala marca la diferencia entre abandonar o romper tu marca.",
  },
];

export default function FacilitiesShowcase() {
  const { playClick, playHover } = useAudio();
  const [activeTab, setActiveTab] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);

  // SCROLL IMAGE REVEAL: Segundo y último efecto protagonista
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 85%", "center 45%"],
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(12% 8% 12% 8% round 24px)", "inset(0% 0% 0% 0% round 16px)"]
  );

  const imageZoom = useTransform(scrollYProgress, [0, 1], [1.14, 1.0]);
  const curtainOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [0.55, 0.15, 0]);
  const metaY = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 0.6, 1]);

  const activeZone = zones[activeTab];

  return (
    <section
      ref={sectionRef}
      id="instalaciones"
      className="py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: TITULAR INTERMEDIO GRANDE */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>02 // INFRAESTRUCTURA Y ZONAS</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-[0.96] font-display mb-6"
          >
            ARQUITECTURA DE FUERZA Y PRECISIÓN
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#94A3B8] max-w-2xl leading-relaxed"
          >
            850 m² concebidos bajo estándares de alto rendimiento en Puente Alto. Iluminación direccional, maquinaria oficial Hammer Strength y amplitud pensada para entrenar sin obstáculos.
          </motion.p>
        </div>

        {/* Editorial Composition: SCROLL IMAGE REVEAL + Integrated Editorial Index */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-start">
          
          {/* Left Column (7 cols): The Scroll Image Reveal Container */}
          <div className="lg:col-span-7">
            <motion.div
              style={{ clipPath }}
              className="relative rounded-2xl overflow-hidden bg-[#111317] border border-[#1C232B] shadow-2xl aspect-[4/3] sm:aspect-[16/11] will-change-[clip-path,transform]"
            >
              <motion.div
                style={{ scale: imageZoom }}
                className="absolute inset-0 w-full h-full will-change-transform"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeZone.id}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/20 to-transparent" />
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* Scroll Curtain Fade */}
              <motion.div
                style={{ opacity: curtainOpacity }}
                className="absolute inset-0 bg-[#0B0B0D] pointer-events-none"
              />

              {/* Minimal Top Meta Tag */}
              <motion.div
                style={{ y: metaY, opacity: metaOpacity }}
                className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-xs font-mono text-white pointer-events-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>ZONA {activeZone.code} // {activeZone.category}</span>
              </motion.div>

              {/* Minimal Bottom Tagline */}
              <motion.div
                style={{ y: metaY, opacity: metaOpacity }}
                className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0B0D]/90 backdrop-blur-md border border-[#1C232B] pointer-events-none"
              >
                <p className="text-xs font-mono text-[#8E9CAE] uppercase tracking-wider">
                  SPORT GM GYM • INSTALACIÓN OFICIAL
                </p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">
                  {activeZone.tagline}
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column (5 cols): Streamlined Editorial Index (No nested boxes) */}
          <div className="lg:col-span-5 flex flex-col justify-between divide-y divide-[#1C232B]">
            {zones.map((zone, idx) => {
              const isCurrent = activeTab === idx;

              return (
                <div
                  key={zone.id}
                  className={`py-5 transition-colors cursor-pointer ${
                    isCurrent ? "opacity-100" : "opacity-60 hover:opacity-100"
                  }`}
                  onClick={() => {
                    playClick();
                    setActiveTab(idx);
                  }}
                  onMouseEnter={playHover}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-mono font-bold ${isCurrent ? "text-white" : "text-[#64748B]"}`}>
                        {zone.code}
                      </span>
                      <h3 className={`text-base font-bold uppercase tracking-tight ${isCurrent ? "text-white" : "text-[#94A3B8]"}`}>
                        {zone.title}
                      </h3>
                    </div>
                    <ChevronRight className={`w-4 h-4 text-[#64748B] transition-transform ${isCurrent ? "rotate-90 text-white" : ""}`} />
                  </div>

                  {/* Expanded editorial details for active zone only */}
                  {isCurrent && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="pt-2 pl-7 space-y-4"
                    >
                      <p className="text-sm text-[#94A3B8] leading-relaxed">
                        {zone.narrative}
                      </p>

                      {/* 2x2 Clean Micro-Specs Matrix (No heavy box) */}
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        {zone.specs.map((item, i) => (
                          <div key={i} className="text-xs">
                            <span className="block text-[10px] font-mono text-[#64748B] uppercase tracking-wider">
                              {item.label}
                            </span>
                            <span className="text-white font-medium">
                              {item.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

        {/* Bottom Architectural Metrics Strip */}
        <div className="mt-16 pt-10 border-t border-[#1C232B] grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
              850 M²
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Superficie Construida
            </span>
          </div>

          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
              50 KG
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Mancuernas Máximas
            </span>
          </div>

          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
              HAMMER & ELEIKO
            </span>
            <span className="block text-xs font-mono uppercase tracking-wider text-[#8E9CAE] mt-1">
              Equipamiento Oficial
            </span>
          </div>

          <div>
            <span className="block text-2xl md:text-3xl font-bold text-white font-mono tracking-tight">
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
