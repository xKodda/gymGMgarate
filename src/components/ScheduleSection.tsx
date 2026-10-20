"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, Users, Check, ArrowRight } from "lucide-react";
import { useAudio } from "./AudioController";

const scheduleData = [
  // Lunes
  { id: 1, day: "Lunes", time: "07:00 - 08:00", name: "Cross Training & WOD Matutino", type: "Cross Training", coach: "Coach Rodrigo", spots: 3, total: 16, room: "Box WOD" },
  { id: 2, day: "Lunes", time: "09:30 - 10:30", name: "Entrenamiento Funcional Élite", type: "Funcional", coach: "Coach Camila", spots: 5, total: 20, room: "Pista Césped" },
  { id: 3, day: "Lunes", time: "18:30 - 19:30", name: "Powerlifting & Cargas Máximas", type: "Fuerza Pura", coach: "Head Coach GM", spots: 1, total: 12, room: "Zona Pesada" },
  { id: 4, day: "Lunes", time: "20:00 - 21:00", name: "HIIT Metabólico con Trineos", type: "Metabólico", coach: "Coach Matías", spots: 7, total: 20, room: "Pista Césped" },

  // Martes
  { id: 5, day: "Martes", time: "07:30 - 08:30", name: "Movilidad Dinámica & Core Strength", type: "Funcional", coach: "Coach Camila", spots: 6, total: 15, room: "Sala Multiuso" },
  { id: 6, day: "Martes", time: "18:00 - 19:00", name: "Hipertrofia Guiada Biomecánica", type: "Fuerza Pura", coach: "Head Coach GM", spots: 4, total: 18, room: "Zona Pesada" },
  { id: 7, day: "Martes", time: "19:30 - 20:30", name: "Halterofilia & Técnica Olímpica", type: "Cross Training", coach: "Coach Rodrigo", spots: 2, total: 16, room: "Box WOD" },

  // Miércoles
  { id: 8, day: "Miércoles", time: "07:00 - 08:00", name: "Cross Training Conditioning", type: "Cross Training", coach: "Coach Rodrigo", spots: 4, total: 16, room: "Box WOD" },
  { id: 9, day: "Miércoles", time: "18:30 - 19:30", name: "Metabólico con Cuerdas y Trineos", type: "Metabólico", coach: "Coach Camila", spots: 3, total: 20, room: "Pista Césped" },
  { id: 10, day: "Miércoles", time: "20:00 - 21:00", name: "Boxeo Formativo & Resistencia", type: "Condición", coach: "Coach David", spots: 5, total: 14, room: "Ring & Sacos" },

  // Jueves
  { id: 11, day: "Jueves", time: "08:00 - 09:00", name: "Sentadilla & Cadena Posterior Pesada", type: "Fuerza Pura", coach: "Head Coach GM", spots: 5, total: 16, room: "Zona Pesada" },
  { id: 12, day: "Jueves", time: "19:00 - 20:00", name: "Team WOD Resistencia", type: "Cross Training", coach: "Coach Rodrigo", spots: 2, total: 18, room: "Box WOD" },

  // Viernes
  { id: 13, day: "Viernes", time: "07:00 - 08:00", name: "Hero WOD de Resistencia", type: "Cross Training", coach: "Coach Rodrigo", spots: 6, total: 16, room: "Box WOD" },
  { id: 14, day: "Viernes", time: "18:30 - 19:30", name: "Friday Heavy Barbell Club", type: "Fuerza Pura", coach: "Head Coach GM", spots: 3, total: 14, room: "Zona Pesada" },

  // Sábado
  { id: 15, day: "Sábado", time: "10:00 - 11:30", name: "Super Clase Abierta de Comunidad", type: "Comunidad", coach: "Staff Completo", spots: 8, total: 30, room: "Sede Completa" },
];

export default function ScheduleSection() {
  const { playClick, playSuccess, playHover } = useAudio();
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [reservedIds, setReservedIds] = useState<number[]>([]);

  const days = [
    { key: "Lunes", label: "LUN" },
    { key: "Martes", label: "MAR" },
    { key: "Miércoles", label: "MIÉ" },
    { key: "Jueves", label: "JUE" },
    { key: "Viernes", label: "VIE" },
    { key: "Sábado", label: "SÁB" },
  ];

  const filtered = scheduleData.filter((item) => item.day === selectedDay);

  const toggleReservation = (id: number) => {
    playClick();
    if (reservedIds.includes(id)) {
      setReservedIds(reservedIds.filter((item) => item !== id));
    } else {
      setReservedIds([...reservedIds, id]);
      playSuccess();
    }
  };

  return (
    <section id="horarios" className="py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">

        {/* Header: Contained & Clean */}
        <div className="max-w-3xl mb-12 md:mb-16">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight font-display mb-4"
          >
            GRILLA SEMANAL DE CLASES DIRIGIDAS
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#94A3B8] leading-relaxed"
          >
            Aforo controlado por sesión para asegurar espacio libre, racks disponibles y supervisión directa de tu coach.
          </motion.p>
        </div>

        {/* Minimalist Day Selector Tabs */}
        <div className="flex items-center gap-2 border-b border-[#1C232B] pb-4 mb-8 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {days.map((d) => {
            const isSelected = selectedDay === d.key;
            return (
              <button
                key={d.key}
                onClick={() => {
                  playClick();
                  setSelectedDay(d.key);
                }}
                onMouseEnter={playHover}
                className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider rounded-lg transition-all cursor-pointer ${isSelected
                    ? "bg-white text-[#0B0B0D]"
                    : "text-[#8E9CAE] hover:text-white hover:bg-[#111317]"
                  }`}
              >
                <span>{d.label}</span>
                <span className="hidden sm:inline font-normal lowercase ml-1">
                  ({d.key.toLowerCase()})
                </span>
              </button>
            );
          })}
        </div>

        {/* Editorial Timetable List (No bulky card grid) */}
        <div className="border-t border-[#1C232B]">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedDay}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="divide-y divide-[#1C232B]"
            >
              {filtered.map((item) => {
                const isReserved = reservedIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="py-4 md:py-5 flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                  >
                    {/* Left: Time & Class info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 min-w-0">
                      <span className="text-xs sm:text-sm font-mono font-bold text-white shrink-0">
                        {item.time}
                      </span>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-base font-bold text-white tracking-tight truncate">
                            {item.name}
                          </h3>
                          <span className="inline-flex text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-[#111317] border border-[#1C232B] text-[#94A3B8]">
                            {item.type}
                          </span>
                        </div>
                        <p className="text-xs text-[#8E9CAE] mt-0.5">
                          {item.coach} • {item.room}
                        </p>
                      </div>
                    </div>

                    {/* Right: Availability & Action */}
                    <div className="flex items-center justify-between md:justify-end gap-6 shrink-0">
                      <div className="text-left md:text-right">
                        <span className="block text-[11px] font-mono text-[#8E9CAE]">
                          Disponibilidad
                        </span>
                        <span className="text-xs font-mono font-semibold text-emerald-400">
                          {isReserved ? item.spots - 1 : item.spots} de {item.total} cupos
                        </span>
                      </div>

                      <button
                        onClick={() => toggleReservation(item.id)}
                        className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${isReserved
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-[#111317] hover:bg-white text-white hover:text-[#0B0B0D] border border-[#1C232B]"
                          }`}
                      >
                        {isReserved ? "Cupo Reservado" : "Reservar"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Minimal info note */}
        <div className="mt-8 text-xs font-mono text-[#64748B] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Sincronización en tiempo real con torniquetes y app oficial Sport GM.</span>
        </div>

      </div>
    </section>
  );
}
