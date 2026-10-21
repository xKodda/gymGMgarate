"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
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

function DisciplineCard({
  item,
  index,
  onHover,
}: {
  item: (typeof disciplines)[0];
  index: number;
  onHover: () => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  // SCROLL IMAGE SCALE: Zoom progresivo continuo vinculado al desplazamiento vertical
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // La imagen se contrae y asienta suavemente al centro del viewport
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.0, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-16, 16]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={onHover}
      className="group flex flex-col justify-between w-full"
    >
      {/* Visual Container with Continuous Scroll Zoom Parallax */}
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-[#111317] border border-[#1C232B] group-hover:border-[#384352] transition-colors duration-400 mb-4 sm:mb-5 shadow-lg">
        <motion.div
          style={{ scale: imageScale, y: imageY }}
          className="absolute inset-0 w-full h-full will-change-transform"
        >
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </motion.div>

        {/* Subtle dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-65 pointer-events-none" />

        {/* Corner Code Tag */}
        <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 inline-flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-[11px] sm:text-xs font-mono text-[#CBD5E1] z-10 pointer-events-none">
          <span className="text-white font-bold">{item.code}</span>
          <span className="text-[#64748B]">//</span>
          <span className="uppercase text-[10px] sm:text-[11px] font-medium">{item.category}</span>
        </div>
      </div>

      {/* Typography with Breathing Room */}
      <div>
        <h3 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight mb-2 group-hover:text-[#22D6F6] transition-colors">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

export default function DisciplinesSection({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();

  return (
    <section id="disciplinas" className="py-16 sm:py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 md:mb-20 gap-4 sm:gap-6">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight font-display mb-3 sm:mb-4"
            >
              METODOLOGÍAS DE ALTO RENDIMIENTO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-sm sm:text-base text-[#94A3B8] leading-relaxed"
            >
              Metodología contrastada, equipamiento de élite y periodización técnica adaptada a tus objetivos específicos en Puente Alto.
            </motion.p>
          </div>

          {/* Single subtle section link */}
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

        {/* Disciplines: Clean Responsive Grid (1 col on mobile, 2 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          {disciplines.map((item, index) => (
            <DisciplineCard
              key={item.id}
              item={item}
              index={index}
              onHover={playHover}
            />
          ))}
        </div>

        {/* Editorial Footnote Banner */}
        <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#1C232B] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-[#8E9CAE]">
          <p>
            * Todos los programas incluyen inducción biomecánica y evaluación antropométrica inicial sin costo adicional.
          </p>
          <button
            onClick={() => {
              playClick();
              onOpenCheckout("Plan Trimestral Pro", "$79.990");
            }}
            className="md:hidden inline-flex items-center gap-2 text-white font-semibold uppercase tracking-wider cursor-pointer hover:text-[#22D6F6] transition-colors"
          >
            <span>Ver membresías y pases</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#22D6F6]" />
          </button>
        </div>

      </div>
    </section>
  );
}
