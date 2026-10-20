"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Dumbbell, Flame, Zap, Trophy, ArrowRight, ArrowUpRight } from "lucide-react";
import { useAudio } from "./AudioController";

const disciplines = [
  {
    id: "musculacion",
    code: "01",
    title: "Musculación & Biomecánica",
    category: "Fuerza & Hipertrofia",
    description: "Racks de potencia Hammer Strength, barras olímpicas calibradas y mancuernas sólidas hasta 50 kg para maximizar la tensión mecánica.",
    image: "/images/athlete_strength.jpg",
    icon: Dumbbell,
  },
  {
    id: "crossfit",
    code: "02",
    title: "Cross Training & WOD",
    category: "Resistencia Metabólica",
    description: "Levantamientos olímpicos de alta exigencia, resistencia cardiovascular y gimnásticos funcionales con programación escalable.",
    image: "/images/athlete_deadlift_female.jpg",
    icon: Flame,
  },
  {
    id: "funcional",
    code: "03",
    title: "Funcional & Pista de Césped",
    category: "Potencia & Agilidad",
    description: "25 metros de césped continuo para empuje de trineos lastrados, cuerdas pesadas y estabilidad que transfieren fuerza al movimiento real.",
    image: "/images/functional_training.jpg",
    icon: Zap,
  },
  {
    id: "comunidad",
    code: "04",
    title: "Comunidad & Desafíos",
    category: "Cultura de Élite",
    description: "Un ambiente sin egos ni distracciones. Entrena junto a atletas comprometidos, celebrando cada nuevo récord personal en equipo.",
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
    <section id="disciplinas" className="py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header: Minimalist & Restrained */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
              <span>01 // PROGRAMAS DE ENTRENAMIENTO</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight font-display mb-4"
            >
              METODOLOGÍAS DE ALTO RENDIMIENTO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-[#94A3B8] leading-relaxed"
            >
              Metodología contrastada, equipamiento de élite y periodización técnica adaptada a tus objetivos específicos en Puente Alto.
            </motion.p>
          </div>

          {/* Single subtle section link instead of 4 duplicate buttons */}
          <button
            onClick={() => {
              playClick();
              onOpenCheckout("Plan Trimestral Pro", "$79.990");
            }}
            onMouseEnter={playHover}
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-[#94A3B8] hover:text-white transition-colors cursor-pointer group pb-1 border-b border-[#2D3748] hover:border-white"
          >
            <span>Ver membresías y accesos</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Disciplines: Clean Editorial Composition (No heavy boxes, No duplicate buttons, No checklist noise) */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex md:grid md:grid-cols-2 overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-4 md:pb-0 gap-8 lg:gap-12 -mx-4 px-4 md:mx-0 md:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {disciplines.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={playHover}
                className="group flex flex-col justify-between min-w-[84vw] sm:min-w-[360px] md:min-w-0 snap-center shrink-0 md:shrink"
              >
                {/* Pure Photographic Focus with Minimal Film Tag */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#111317] border border-[#1C232B] group-hover:border-[#384352] transition-colors duration-400 mb-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-104"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-60" />

                  {/* Corner Code Tag */}
                  <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-[#0B0B0D]/80 backdrop-blur-md border border-[#1C232B] text-xs font-mono text-[#CBD5E1]">
                    <span className="text-white font-bold">{item.code}</span>
                    <span className="text-[#64748B]">//</span>
                    <span className="uppercase text-[11px]">{item.category}</span>
                  </div>
                </div>

                {/* Typography with Breathing Room (No bullet clutter) */}
                <div>
                  <h3 className="text-lg md:text-xl font-bold uppercase text-white tracking-tight mb-2 group-hover:text-white transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#94A3B8] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile Pagination Indicator Dots */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-6">
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

        {/* Editorial Footnote Banner: Unified Single CTA */}
        <div className="mt-14 pt-8 border-t border-[#1C232B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#8E9CAE]">
          <p>
            * Todos los programas incluyen inducción biomecánica y evaluación antropométrica inicial sin costo adicional.
          </p>
          <button
            onClick={() => {
              playClick();
              onOpenCheckout("Plan Trimestral Pro", "$79.990");
            }}
            className="md:hidden inline-flex items-center gap-2 text-white font-semibold uppercase tracking-wider cursor-pointer"
          >
            <span>Ver membresías</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
