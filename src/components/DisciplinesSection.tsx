"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Flame, Zap, Trophy, ArrowRight, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { useAudio } from "./AudioController";

const disciplines = [
  {
    id: "musculacion",
    title: "Musculación & Biomecánica",
    category: "Fuerza & Hipertrofia",
    description: "Zona pesada equipada con racks de potencia Hammer Strength, barras olímpicas calibradas y mancuernas de hasta 50 kg para construir masa muscular real.",
    highlights: ["Racks de Sentadilla & Plataformas", "Mancuernas de alta densidad", "Poleas ajustables biomecánicas", "Supervisión de entrenadores en sala"],
    image: "/images/athlete_strength.jpg",
    icon: Dumbbell,
  },
  {
    id: "crossfit",
    title: "Cross Training & WOD",
    category: "Resistencia Metabólica",
    description: "Entrenamientos diarios de alta intensidad que combinan levantamientos olímpicos, resistencia cardiovascular y movimientos gimnásticos funcionales.",
    highlights: ["Remos Concept2 & SkiErg", "Kettlebells de competición", "Cajones pliométricos y barras", "Programación escalable para todo nivel"],
    image: "/images/functional_training.jpg",
    icon: Flame,
  },
  {
    id: "funcional",
    title: "Funcional & Pista de Césped",
    category: "Agilidad & Potencia",
    description: "Pista de césped sintético para empuje de trineos, cuerdas de batalla y trabajo de estabilidad que optimizan tu rendimiento atlético diario.",
    highlights: ["Trineos de empuje lastrados", "Cuerdas de combate pesadas", "Entrenamiento de Core y estabilidad", "Mejora de postura y movilidad"],
    image: "/images/coach_tech.jpg",
    icon: Zap,
  },
  {
    id: "comunidad",
    title: "Comunidad & Desafíos",
    category: "Cultura de Élite",
    description: "En Sport GM el ambiente lo es todo. Entrenarás rodeado de personas decididas a superarse, con eventos de PRs y retos de transformación.",
    highlights: ["Pizarra de récords personales", "Desafíos trimestrales", "Ambiente sin egos ni distracciones", "Comunidad activa en Puente Alto"],
    image: "/images/community.jpg",
    icon: Trophy,
  },
];

export default function DisciplinesSection({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const [activeMobileIdx, setActiveMobileIdx] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.offsetWidth * 0.85;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx !== activeMobileIdx && newIdx >= 0 && newIdx < disciplines.length) {
      setActiveMobileIdx(newIdx);
    }
  };

  const scrollToCard = (idx: number) => {
    playClick();
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.offsetWidth * 0.85;
      scrollContainerRef.current.scrollTo({
        left: idx * cardWidth,
        behavior: "smooth",
      });
      setActiveMobileIdx(idx);
    }
  };

  return (
    <section id="disciplinas" className="py-28 md:py-36 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
              <span>01 // DISCIPLINAS Y PROGRAMAS DE ENTRENAMIENTO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight font-display mb-4"
            >
              METODOLOGÍAS DISEÑADAS PARA TU MÁXIMO RENDIMIENTO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-[#94A3B8] leading-relaxed"
            >
              Tanto si buscas levantar más peso, quemar grasa o mejorar tu condición atlética general, en Sport GM dispones de metodología contrastada y seguimiento continuo.
            </motion.p>
          </div>

          {/* Mobile swipe helper hint */}
          <div className="md:hidden flex items-center gap-2 text-xs font-mono text-[#8E9CAE]">
            <span>DESLIZA</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Responsive Layout: Horizontal Snap Gallery on Mobile & Refined Grid on Desktop */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-6 md:pb-0 gap-6 md:gap-8 lg:gap-10 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={playHover}
                className="group relative rounded-2xl overflow-hidden bg-[#111317] border border-[#1C232B] hover:border-[#2E3846] transition-all duration-400 shadow-xl flex flex-col justify-between min-w-[84vw] sm:min-w-[380px] md:min-w-0 snap-center shrink-0 md:shrink"
              >
                {/* Visual Area with Natural Lighting Contrast */}
                <div className="relative aspect-[16/10] overflow-hidden bg-[#0B0B0D]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle vignette without colored glow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111317] via-[#111317]/25 to-transparent" />

                  {/* Corner Badge */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-[#F5F7FA] text-xs font-mono font-medium">
                    <Icon className="w-3.5 h-3.5 text-[#94A3B8]" />
                    <span>{item.category}</span>
                  </div>
                </div>

                {/* Content Area with Generous Padding */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold uppercase text-white mb-2 tracking-tight group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div>
                    <div className="pt-4 border-t border-[#1C232B] space-y-2.5 mb-6">
                      {item.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-xs text-[#CBD5E1]">
                          <Check className="w-3.5 h-3.5 text-[#8E9CAE] flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => {
                        playClick();
                        onOpenCheckout("Plan Trimestral Pro", "$79.990");
                      }}
                      className="w-full py-3 rounded-xl bg-[#0B0B0D] hover:bg-[#1E232B] text-white border border-[#1C232B] hover:border-[#384352] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Inscribirme en esta disciplina</span>
                      <ArrowRight className="w-4 h-4 text-[#8E9CAE]" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-4">
          {disciplines.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollToCard(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeMobileIdx === idx ? "w-8 bg-white" : "w-2 bg-[#2D3748]"
              }`}
              aria-label={`Ver disciplina ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
