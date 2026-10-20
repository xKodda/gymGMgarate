"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CheckCircle, Flame, Filter } from "lucide-react";
import { useAudio } from "./AudioController";

const scheduleData = [
  // Lunes
  { id: 1, day: "Lunes", time: "07:00 - 08:00", name: "CrossFit & WOD Matutino", type: "crossfit", coach: "Coach Rodrigo", spots: 3, total: 16, room: "Box CrossFit" },
  { id: 2, day: "Lunes", time: "09:30 - 10:30", name: "Entrenamiento Funcional Élite", type: "funcional", coach: "Coach Camila", spots: 5, total: 20, room: "Pista Césped" },
  { id: 3, day: "Lunes", time: "18:30 - 19:30", name: "Powerlifting & Cargas Máximas", type: "fuerza", coach: "Coach GM", spots: 1, total: 12, room: "Zona Pesada" },
  { id: 4, day: "Lunes", time: "20:00 - 21:00", name: "HIIT Metabólico Quema Grasa", type: "funcional", coach: "Coach Matías", spots: 7, total: 20, room: "Pista Césped" },

  // Martes
  { id: 5, day: "Martes", time: "07:30 - 08:30", name: "Movilidad & Core Strength", type: "funcional", coach: "Coach Camila", spots: 6, total: 15, room: "Sala Multiuso" },
  { id: 6, day: "Martes", time: "18:00 - 19:00", name: "Hipertrofia Guiada Torso", type: "fuerza", coach: "Coach GM", spots: 4, total: 18, room: "Zona Pesada" },
  { id: 7, day: "Martes", time: "19:30 - 20:30", name: "CrossFit Gimnásticos & Halterofilia", type: "crossfit", coach: "Coach Rodrigo", spots: 2, total: 16, room: "Box CrossFit" },

  // Miércoles
  { id: 8, day: "Miércoles", time: "07:00 - 08:00", name: "CrossFit Conditioning", type: "crossfit", coach: "Coach Rodrigo", spots: 4, total: 16, room: "Box CrossFit" },
  { id: 9, day: "Miércoles", time: "18:30 - 19:30", name: "Funcional Metabólico con Trineos", type: "funcional", coach: "Coach Camila", spots: 3, total: 20, room: "Pista Césped" },
  { id: 10, day: "Miércoles", time: "20:00 - 21:00", name: "Boxeo Formativo & Resistencia", type: "boxeo", coach: "Coach David", spots: 5, total: 14, room: "Ring & Sacos" },

  // Jueves
  { id: 11, day: "Jueves", time: "08:00 - 09:00", name: "Piernas & Glúteos Fuerza", type: "fuerza", coach: "Coach GM", spots: 5, total: 16, room: "Zona Pesada" },
  { id: 12, day: "Jueves", time: "19:00 - 20:00", name: "CrossFit Team WOD", type: "crossfit", coach: "Coach Rodrigo", spots: 2, total: 18, room: "Box CrossFit" },

  // Viernes
  { id: 13, day: "Viernes", time: "07:00 - 08:00", name: "CrossFit Hero WOD", type: "crossfit", coach: "Coach Rodrigo", spots: 6, total: 16, room: "Box CrossFit" },
  { id: 14, day: "Viernes", time: "18:30 - 19:30", name: "Friday Heavy Lifting", type: "fuerza", coach: "Coach GM", spots: 3, total: 14, room: "Zona Pesada" },

  // Sábado
  { id: 15, day: "Sábado", time: "10:00 - 11:30", name: "Super Clase de Comunidad Sport GM", type: "crossfit", coach: "Staff Completo", spots: 8, total: 30, room: "Sede Completa" },
];

export default function ScheduleSection() {
  const { playClick, playSuccess } = useAudio();
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [selectedType, setSelectedType] = useState("todos");
  const [reservedIds, setReservedIds] = useState<number[]>([]);

  const days = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

  const filtered = scheduleData.filter((item) => {
    const matchDay = item.day === selectedDay;
    const matchType = selectedType === "todos" || item.type === selectedType;
    return matchDay && matchType;
  });

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
    <section id="horarios" className="py-28 md:py-36 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
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
            <span>04 // HORARIOS & CUPOS EN TIEMPO REAL</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display"
          >
            GRILLA SEMANAL DE CLASES
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base text-[#94A3B8] leading-relaxed"
          >
            Planifica tu semana. Como socio de Sport GM tienes acceso a reservar tus clases con aforo controlado para garantizar tu espacio y equipamiento.
          </motion.p>
        </div>

        {/* Days Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => {
                playClick();
                setSelectedDay(day);
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDay === day
                  ? "bg-[#22D6F6] text-[#0B0B0D] shadow-[0_0_15px_rgba(34,214,246,0.35)]"
                  : "bg-[#111317] text-[#B8C2CC] hover:text-white border border-[#1C232B]"
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Type Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 text-xs">
          {[
            { id: "todos", label: "Todas las Disciplinas" },
            { id: "crossfit", label: "Cross Training" },
            { id: "fuerza", label: "Fuerza & Musculación" },
            { id: "funcional", label: "Funcional" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => {
                playClick();
                setSelectedType(type.id);
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                selectedType === type.id
                  ? "bg-[#1C232B] text-[#22D6F6] border border-[#22D6F6]/40 font-semibold"
                  : "text-[#B8C2CC] hover:text-white"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Classes Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((item) => {
            const isReserved = reservedIds.includes(item.id);
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isReserved
                    ? "bg-[#161a22] border-[#22D6F6] shadow-[0_0_20px_rgba(34,214,246,0.2)]"
                    : "bg-[#111317] border-[#1C232B] hover:border-[#22D6F6]/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-[#22D6F6] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{item.time}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#0B0B0D] border border-[#1C232B] text-[#B8C2CC]">
                      {item.room}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-xs text-[#B8C2CC] mb-4">Instructor: {item.coach}</p>
                </div>

                <div className="pt-4 border-t border-[#1C232B] flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-[11px] text-[#B8C2CC]">Cupos Disponibles:</span>
                    <p className="font-mono font-bold text-emerald-400">
                      {isReserved ? item.spots - 1 : item.spots} de {item.total}
                    </p>
                  </div>

                  <button
                    onClick={() => toggleReservation(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isReserved
                        ? "bg-emerald-500 text-white shadow-md"
                        : "bg-[#0B0B0D] hover:bg-[#22D6F6] text-[#22D6F6] hover:text-[#0B0B0D] border border-[#22D6F6]/40"
                    }`}
                  >
                    {isReserved ? (
                      <>
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Cupo Reservado</span>
                      </>
                    ) : (
                      <span>Reservar Cupo</span>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
