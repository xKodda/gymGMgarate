"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Star, Trophy, Quote } from "lucide-react";
import { useAudio } from "./AudioController";

const testimonials = [
  {
    name: "Constanza Morales",
    role: "Socia Activa • Cross Training",
    comment: "La calidad de las barras y la zona de césped para trineos no tiene comparación en la zona sur. El ambiente de superación sin egos te motiva a entrenar fuerte todos los días.",
    rating: 5,
    tag: "+15 kg Sentadilla",
  },
  {
    name: "Nicolás Valenzuela",
    role: "Socio Plan Trimestral • Musculación",
    comment: "Entrenar con máquinas completas y suficiente peso libre sin tener que hacer largas filas cambió mi rutina. El ambiente es súper motivador y los profes siempre atentos a resolver dudas.",
    rating: 5,
    tag: "+8 kg Masa Muscular",
  },
  {
    name: "Felipe Soto",
    role: "Socio Plan Anual VIP • Hipertrofia",
    comment: "Tener la credencial digital en el teléfono y pasar por el torniquete sin filas es un 10 de 10. Las instalaciones están siempre impecables y la música acompaña cada serie pesada.",
    rating: 5,
    tag: "-12% Grasa Corporal",
  },
];

export default function CommunitySection() {
  const { playHover } = useAudio();

  return (
    <section className="py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Header & Visual */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-center mb-16 md:mb-20">

          {/* Left: Text & Rating */}
          <div className="lg:col-span-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display"
            >
              DONDE LA MOTIVACIÓN SE VUELVE HÁBITO
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base text-[#94A3B8] leading-relaxed mb-6"
            >
              No entrenas solo. En Sport GM formas parte de una comunidad apasionada en Puente Alto donde cada repetición y cada nuevo récord personal se celebran juntos.
            </motion.p>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <div className="text-xs text-[#94A3B8] font-mono">
                <strong className="text-white">4.9 / 5.0</strong> en valoraciones de socios activos
              </div>
            </div>
          </div>

          {/* Right: Community Photograph */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#1C232B] shadow-2xl group"
            >
              <Image
                src="/images/community.jpg"
                alt="Comunidad de atletas Sport GM Gym"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-60" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#0B0B0D]/85 backdrop-blur-md border border-[#1C232B] flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono text-[#8E9CAE] uppercase tracking-wider">
                    SESIONES COMUNITARIAS
                  </p>
                  <p className="text-sm font-bold text-white uppercase tracking-tight">
                    Desafíos Trimestrales y Récords Personales
                  </p>
                </div>
                <Trophy className="w-5 h-5 text-amber-400 shrink-0" />
              </div>
            </motion.div>
          </div>

        </div>

        {/* 3 Testimonials: Clean Minimalist Editorial Layout (No heavy cards) */}
        <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-[#1C232B]">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onMouseEnter={playHover}
              className="flex flex-col justify-between space-y-4"
            >
              <div>
                <span className="inline-block text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded bg-[#111317] border border-[#1C232B] text-[#CBD5E1] mb-3">
                  {t.tag}
                </span>

                <p className="text-sm text-[#CBD5E1] leading-relaxed italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C232B]/60">
                <p className="text-sm font-bold text-white uppercase tracking-tight">{t.name}</p>
                <p className="text-xs text-[#8E9CAE] font-mono">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
