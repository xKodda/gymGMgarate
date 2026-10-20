"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, Trophy, Users, Heart, ArrowUpRight } from "lucide-react";
import { useAudio } from "./AudioController";

const testimonials = [
  {
    name: "Diego Valdés",
    role: "Socio desde 2024 • Powerlifting",
    comment: "Llevo más de 2 años entrenando en la zona sur y Sport GM está a otro nivel. Las barras olímpicas, los racks de potencia y la maquinaria Hammer Strength marcan la diferencia.",
    rating: 5,
    tag: "+45kg en Sentadilla",
  },
  {
    name: "Camila Navarro",
    role: "Socia Plan Trimestral • Cross Training",
    comment: "El ambiente es increíble, cero egos. Los coaches realmente corrigen tu técnica y la plataforma en el celular para ver las rutinas y reservar clases es súper rápida.",
    rating: 5,
    tag: "Superó su PR de Clean",
  },
  {
    name: "Felipe Soto",
    role: "Socio Plan Anual VIP • Hipertrofia",
    comment: "Tener la credencial digital en el teléfono y pasar por el torniquete sin esperar a nadie en recepción es un 10 de 10. Las instalaciones siempre impecables.",
    rating: 5,
    tag: "-12% Grasa Corporal",
  },
];

export default function CommunitySection() {
  const { playHover } = useAudio();

  return (
    <section className="py-28 md:py-36 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center mb-16 md:mb-20">
          {/* Left: Text & Rating */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4"
            >
              <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
              <span>06 // CULTURA Y COMUNIDAD SPORT GM</span>
            </motion.div>

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
                  <Star key={i} className="w-5 h-5 fill-current" />
                ))}
              </div>
              <div className="text-xs text-[#B8C2CC]">
                <strong className="text-white text-sm">4.9 / 5.0</strong> en valoraciones de atletas de la zona
              </div>
            </div>
          </div>

          {/* Right: Community Photograph with angled clip */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-video rounded-3xl overflow-hidden border border-[#1C232B] shadow-2xl group"
            >
              <Image
                src="/images/community.jpg"
                alt="Atletas celebrando PR en Sport GM Gym"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#111317]/90 backdrop-blur-md border border-[#1C232B] flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-white">Viernes de PRs & Desafíos</p>
                  <p className="text-xs text-[#22D6F6]">Sede Puente Alto</p>
                </div>
                <Trophy className="w-6 h-6 text-[#22D6F6]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* 3 Testimonials Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              onMouseEnter={playHover}
              className="p-6 rounded-3xl bg-[#111317] border border-[#1C232B] hover:border-[#22D6F6]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#22D6F6]/10 text-[#22D6F6] border border-[#22D6F6]/30">
                    {t.tag}
                  </span>
                </div>

                <p className="text-xs text-[#B8C2CC] leading-relaxed mb-6 italic">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#1C232B]">
                <h4 className="text-sm font-bold text-white">{t.name}</h4>
                <p className="text-[11px] text-[#B8C2CC]">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
