"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Smartphone, Play, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { useAudio } from "./AudioController";

const features = [
  {
    code: "01",
    title: "Videoteca Biomecánica HD",
    desc: "Demostraciones técnicas en alta definición con ángulos frontales y laterales para dominar la trayectoria perfecta en cada levantamiento.",
  },
  {
    code: "02",
    title: "Registro de Cargas & 1RM",
    desc: "Registra tus pesos reales, calcula tus porcentajes de intensidad y sigue tu sobrecarga progresiva semana a semana sin libretas de papel.",
  },
  {
    code: "03",
    title: "Nutrición & Hábitos",
    desc: "Pautas de macronutrientes adaptadas a tu nivel de actividad y horarios laborales, diseñadas por nutricionistas deportivos certificados.",
  },
];

export default function PlatformPreview({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="videoteca" className="py-24 md:py-32 px-4 md:px-8 bg-[#0E1014] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header: Contained & Architectural */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>03 // ECOSISTEMA DIGITAL & ON-DEMAND</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight font-display mb-4"
          >
            TU ENTRENAMIENTO DENTRO Y FUERA DE LA SEDE
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#94A3B8] leading-relaxed"
          >
            Accede a tu credencial QR de entrada, videoteca técnica y control de marcas desde cualquier dispositivo móvil con la plataforma oficial de Sport GM.
          </motion.p>
        </div>

        {/* Editorial Composition: Unique App Photography + Clean 3-Pillar Narrative */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left Column (7 cols): Unique Smartphone App Image with Subtle Video Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative aspect-[16/10] rounded-2xl overflow-hidden bg-[#111317] border border-[#1C232B] shadow-2xl group"
          >
            <Image
              src="/images/app_fitness_ondemand.jpg"
              alt="Plataforma Sport GM On-Demand en smartphone"
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 group-hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-70" />

            {/* Top Minimal Badge */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] text-xs font-mono text-white">
              <Smartphone className="w-3.5 h-3.5 text-[#8E9CAE]" />
              <span>APP SOCIOS GM • 100% INCLUIDA</span>
            </div>

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0B0D]/90 backdrop-blur-md border border-[#1C232B] flex items-center justify-between">
              <div>
                <p className="text-xs font-mono text-[#8E9CAE] uppercase tracking-wider">
                  MÓDULO ON-DEMAND ACTIVO
                </p>
                <p className="text-sm font-bold text-white uppercase tracking-tight">
                  Técnica de Levantamiento y Registro de Marcas
                </p>
              </div>
              <button
                onClick={() => {
                  playClick();
                  setIsPlaying(!isPlaying);
                }}
                className="w-10 h-10 rounded-xl bg-white text-[#0B0B0D] hover:bg-[#22D6F6] transition-colors flex items-center justify-center cursor-pointer shadow-md flex-shrink-0"
                aria-label="Ver demostración"
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Right Column (5 cols): 3 Elegant Pillars (No nested boxes) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="divide-y divide-[#1C232B]">
              {features.map((feat) => (
                <div key={feat.code} className="py-5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-mono font-bold text-[#8E9CAE]">
                      {feat.code} //
                    </span>
                    <h3 className="text-base font-bold uppercase text-white tracking-tight">
                      {feat.title}
                    </h3>
                  </div>
                  <p className="text-sm text-[#94A3B8] leading-relaxed pl-6">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="pt-6 border-t border-[#1C232B]">
              <button
                onClick={() => {
                  playClick();
                  onOpenCheckout("Plan Trimestral Pro", "$79.990");
                }}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-white hover:text-[#22D6F6] transition-colors cursor-pointer group"
              >
                <span>Acceder a la plataforma con tu membresía</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
