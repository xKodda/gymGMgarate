"use client";

import React from "react";
import { X, User, Flame, Calendar, Dumbbell, PlayCircle, FileText, CheckCircle, Trophy, QrCode } from "lucide-react";
import { useAudio } from "./AudioController";

export default function StudentPortalModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { playClick } = useAudio();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111317] border border-[#22D6F6]/50 rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 md:p-8 relative shadow-[0_0_50px_rgba(34,214,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-[#B8C2CC] hover:text-white p-2.5 rounded-full hover:bg-[#1C232B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Portal Header */}
        <div className="flex items-center gap-3 mb-5 sm:mb-6 pb-4 border-b border-[#1C232B] pr-8">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#22D6F6] to-[#0d8ca3] flex items-center justify-center text-[#0B0B0D] font-black text-base sm:text-lg shrink-0">
            CV
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <h3 className="font-black text-sm sm:text-lg text-white font-display">
                HOLA, CRISTIAN VALENZUELA
              </h3>
              <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold font-mono">
                PLAN ACTIVO
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-[#B8C2CC] mt-0.5">
              Sport GM Gym • Sede Puente Alto • Pase Trimestral Pro
            </p>
          </div>
        </div>

        {/* Quick Stats Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-5 sm:mb-6">
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] text-center">
            <Flame className="w-4 h-4 text-[#22D6F6] mx-auto mb-1" />
            <span className="block text-[9px] sm:text-[10px] text-[#B8C2CC]">Racha</span>
            <span className="text-xs sm:text-sm font-black text-white font-mono">14 Días</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] text-center">
            <Trophy className="w-4 h-4 text-emerald-400 mx-auto mb-1" />
            <span className="block text-[9px] sm:text-[10px] text-[#B8C2CC]">PR Deadlift</span>
            <span className="text-xs sm:text-sm font-black text-emerald-400 font-mono">180 kg</span>
          </div>
          <div className="p-2.5 sm:p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] text-center">
            <Calendar className="w-4 h-4 text-purple-400 mx-auto mb-1" />
            <span className="block text-[9px] sm:text-[10px] text-[#B8C2CC]">Vencimiento</span>
            <span className="text-xs sm:text-sm font-black text-white font-mono">62 días</span>
          </div>
        </div>

        {/* Today's Workout Assigned by Coach */}
        <div className="mb-5 sm:mb-6 p-3.5 sm:p-4 rounded-2xl bg-[#0B0B0D] border border-[#1C232B]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#22D6F6] flex items-center gap-1.5">
              <Dumbbell className="w-4 h-4 shrink-0" />
              <span>Rutina: Torso & Cargas Progresivas</span>
            </span>
            <span className="text-[10px] text-[#8E9CAE] font-mono">Fase 2 // Semana 3</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { ex: "Press de Banca Plano con Barra", sets: "4 series x 6-8 reps (RPE 8)", done: true },
              { ex: "Remo con Barra T o Mancuernas Pesadas", sets: "4 series x 8-10 reps", done: true },
              { ex: "Press Militar en Rack de Potencia", sets: "3 series x 8 reps", done: false },
              { ex: "Fondos en Paralelas Lastrados", sets: "3 series al fallo", done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-[#111317] border border-[#1C232B]">
                <div className="flex items-center gap-2">
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${item.done ? "bg-emerald-500 text-white" : "border border-[#1C232B] text-[#B8C2CC]"}`}>
                    {item.done ? "✓" : i + 1}
                  </span>
                  <span className={item.done ? "line-through text-[#B8C2CC]" : "text-white font-medium"}>
                    {item.ex}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-[#22D6F6]">{item.sets}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <button
            onClick={() => {
              playClick();
              alert("Abriendo videoteca de técnicas...");
            }}
            className="p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] hover:border-[#22D6F6]/40 text-left transition-colors cursor-pointer flex items-center gap-2.5"
          >
            <PlayCircle className="w-5 h-5 text-[#22D6F6] flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Videoteca de Ejercicios</p>
              <p className="text-[10px] text-[#B8C2CC]">Tutoriales paso a paso</p>
            </div>
          </button>

          <button
            onClick={() => {
              playClick();
              alert("Descargando pauta nutricional PDF...");
            }}
            className="p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] hover:border-[#22D6F6]/40 text-left transition-colors cursor-pointer flex items-center gap-2.5"
          >
            <FileText className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-white">Mi Plan Nutricional</p>
              <p className="text-[10px] text-[#B8C2CC]">Descargar PDF de Macros</p>
            </div>
          </button>
        </div>

        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="w-full py-3 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
        >
          Cerrar Simulador de Alumno
        </button>
      </div>
    </div>
  );
}
