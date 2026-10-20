"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { PlaySquare, Play, Pause, Download, ShieldCheck, CheckCircle2, Sparkles, BookOpen } from "lucide-react";
import { useAudio } from "./AudioController";

const videoModules = [
  {
    title: "Rutina Hipertrofia: Espalda & Tracción Pesada",
    duration: "18:40",
    coach: "Head Coach Sport GM",
    level: "Avanzado",
    category: "Musculación",
    thumbnail: "/images/athlete_strength.jpg",
    desc: "Alineación biomecánica para jalón al pecho, remo con barra T y peso muerto rumano.",
  },
  {
    title: "Técnica Perfecta: Sentadilla Profunda y Posición de Barra",
    duration: "12:15",
    coach: "Especialista Biomecánica",
    level: "Todos los niveles",
    category: "Fuerza Pura",
    thumbnail: "/images/functional_training.jpg",
    desc: "Cómo colocar la barra alta vs baja, evitar el valgo de rodillas y transferir máxima fuerza.",
  },
  {
    title: "Circuito HIIT Quema Grasa y Potencia Metabólica",
    duration: "25:00",
    coach: "Coach de Cross Training",
    level: "Intermedio",
    category: "Acondicionamiento",
    thumbnail: "/images/coach_tech.jpg",
    desc: "Intervalos de alta intensidad para acelerar el metabolismo y quemar calorías post-entreno.",
  },
  {
    title: "Guía de Nutrición: Cálculo de Macros para Ganancia Limpia",
    duration: "15:20",
    coach: "Nutricionista Deportivo GM",
    level: "Teórico / Práctico",
    category: "Nutrición",
    thumbnail: "/images/community.jpg",
    desc: "Distribución de carbohidratos, grasas y proteínas según tu peso corporal y horas de entreno.",
  },
];

export default function PlatformPreview({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const [activeVideo, setActiveVideo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(55);

  return (
    <section id="videoteca" className="py-28 md:py-36 px-4 md:px-8 bg-[#111317] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: Contained Headline Size */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
          >
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>03 // ON-DEMAND & PLATAFORMA DIGITAL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display"
          >
            SPORT GM ON-DEMAND
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#94A3B8] leading-relaxed"
          >
            Entrena en la sede física y continúa progresando donde quieras. Videoteca de técnicas biomecánicas, rutinas estructuradas y pautas nutricionales disponibles en tu celular.
          </motion.p>
        </div>

        {/* Video Player Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-3xl bg-[#0B0B0D] border border-[#1C232B] p-6 md:p-8 shadow-2xl"
        >
          <div className="grid lg:grid-cols-12 gap-8">
            {/* Player */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#111317] border border-[#1C232B] shadow-xl group">
                <Image
                  src={videoModules[activeVideo].thumbnail}
                  alt={videoModules[activeVideo].title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 65vw"
                  className="object-cover"
                />

                {/* Dark overlay & Play button */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/30 transition-all flex items-center justify-center">
                  <button
                    onClick={() => {
                      playClick();
                      setIsPlaying(!isPlaying);
                    }}
                    className="w-16 h-16 rounded-full bg-[#22D6F6] text-[#0B0B0D] flex items-center justify-center shadow-[0_0_35px_rgba(34,214,246,0.6)] hover:scale-110 transition-transform cursor-pointer"
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 fill-current" />
                    ) : (
                      <Play className="w-6 h-6 fill-current ml-1" />
                    )}
                  </button>
                </div>

                {/* Scrubber HUD */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/95 to-transparent">
                  <div className="flex items-center justify-between text-xs text-white mb-2">
                    <span className="font-semibold">{videoModules[activeVideo].title}</span>
                    <span className="font-mono text-[#22D6F6]">
                      {isPlaying ? "Reproduciendo en 4K HD..." : videoModules[activeVideo].duration}
                    </span>
                  </div>
                  <div className="w-full bg-[#1C232B] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#22D6F6] h-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Video Info Bar */}
              <div className="p-4 rounded-xl bg-[#111317] border border-[#1C232B] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div>
                  <p className="text-white font-bold text-sm mb-1">{videoModules[activeVideo].title}</p>
                  <p className="text-[#B8C2CC]">{videoModules[activeVideo].desc}</p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      playClick();
                      alert("Descargando rutina en PDF vinculada a este video...");
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#0B0B0D] border border-[#1C232B] hover:border-[#22D6F6] text-[#22D6F6] text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Rutina PDF</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#B8C2CC] font-mono">
                  Módulos de la Plataforma
                </h3>
                <span className="text-[10px] text-[#22D6F6] font-mono font-bold">
                  4 de 24 Clases
                </span>
              </div>

              <div className="space-y-2.5">
                {videoModules.map((item, idx) => {
                  const isActive = activeVideo === idx;
                  return (
                    <div
                      key={idx}
                      onClick={() => {
                        playClick();
                        setActiveVideo(idx);
                        setIsPlaying(true);
                      }}
                      onMouseEnter={playHover}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isActive
                          ? "bg-[#161a22] border-[#22D6F6] shadow-[0_0_15px_rgba(34,214,246,0.2)]"
                          : "bg-[#111317] border-[#1C232B] hover:border-[#22D6F6]/40"
                      }`}
                    >
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-[#0B0B0D]">
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-3.5 h-3.5 text-[#22D6F6] fill-current" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className={`text-xs font-bold truncate ${isActive ? "text-[#22D6F6]" : "text-white"}`}>
                          {item.title}
                        </p>
                        <p className="text-[10px] text-[#B8C2CC] mt-0.5">
                          {item.duration} • {item.coach}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Member Platform Access Card */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#161a22] to-[#0B0B0D] border border-[#22D6F6]/40 mt-4">
                <span className="text-[10px] font-mono font-bold text-[#22D6F6] uppercase block mb-1">
                  Acceso Ilimitado
                </span>
                <p className="text-xs text-[#B8C2CC] mb-3">
                  Incluido automáticamente en los planes Trimestral Pro y Anual Black VIP.
                </p>
                <button
                  onClick={() => {
                    playClick();
                    onOpenCheckout("Plan Trimestral Pro", "$79.990");
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Obtener Acceso con mi Membresía
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
