"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calculator, Dumbbell, Flame, Zap, Heart, ArrowRight, Check } from "lucide-react";
import { useAudio } from "./AudioController";

export default function FitnessCalculator({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playSuccess } = useAudio();

  const [gender, setGender] = useState<"hombre" | "mujer">("hombre");
  const [goal, setGoal] = useState<"hipertrofia" | "definicion" | "fuerza" | "funcional">("hipertrofia");
  const [days, setDays] = useState(4);
  const [weight, setWeight] = useState(75);
  const [experience, setExperience] = useState<"principiante" | "intermedio" | "avanzado">("intermedio");

  const calculateRecommendation = () => {
    let calories = 2000;
    let protein = 140;
    let planTitle = "Plan Trimestral Pro";
    let planPrice = "$79.990";
    let split = "Torso / Pierna (4 días)";

    if (gender === "hombre") {
      calories = Math.round(weight * 24 * 1.4);
    } else {
      calories = Math.round(weight * 22 * 1.35);
    }

    if (goal === "hipertrofia") {
      calories += 300;
      protein = Math.round(weight * 2.0);
      planTitle = "Plan Semestral Élite";
      planPrice = "$149.990";
      split = "Frecuencia 2: Push / Pull / Legs o Torso / Pierna";
    } else if (goal === "definicion") {
      calories -= 350;
      protein = Math.round(weight * 2.2);
      planTitle = "Plan Trimestral Pro";
      planPrice = "$79.990";
      split = "Circuito de Fuerza + 20 min Acondicionamiento Metabólico";
    } else if (goal === "fuerza") {
      calories += 400;
      protein = Math.round(weight * 1.9);
      planTitle = "Plan Anual VIP All-Access";
      planPrice = "$269.990";
      split = "Powerlifting / Levantamientos Pesados 3-5 repeticiones";
    } else {
      protein = Math.round(weight * 1.7);
      planTitle = "Plan Mensual Flex";
      planPrice = "$29.990";
      split = "Entrenamiento Funcional, Movilidad y Pista de Césped";
    }

    return {
      calories,
      protein,
      planTitle,
      planPrice,
      split,
    };
  };

  const rec = calculateRecommendation();

  return (
    <section id="calculadora" className="py-24 md:py-32 px-4 md:px-8 bg-[#0B0B0D] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header: Contained & Architectural */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>05 // DIAGNÓSTICO INTERACTIVO & BIOMETRÍA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display">
            CALCULADORA DE OBJETIVOS FITNESS
          </h2>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Ingresa tus parámetros para estimar tu volumen de calorías, proteína diaria y la periodización recomendada en Sport GM.
          </p>
        </div>

        {/* Minimalist 2-Column Split (No heavy double-nested boxes) */}
        <div className="grid lg:grid-cols-12 gap-10 xl:gap-14 items-start">
          
          {/* Controls Form (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* 1. Género */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8E9CAE] mb-2.5">
                01. Género
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { id: "hombre", label: "Hombre" },
                  { id: "mujer", label: "Mujer" },
                ].map((g) => (
                  <button
                    key={g.id}
                    onClick={() => {
                      playClick();
                      setGender(g.id as typeof gender);
                    }}
                    className={`py-2.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer border ${
                      gender === g.id
                        ? "bg-white text-[#0B0B0D] border-white"
                        : "bg-[#111317] text-[#8E9CAE] border-[#1C232B] hover:text-white"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Objetivo Principal */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8E9CAE] mb-2.5">
                02. Objetivo de Entrenamiento
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "hipertrofia", label: "Ganar Músculo", icon: Dumbbell },
                  { id: "definicion", label: "Quemar Grasa", icon: Flame },
                  { id: "fuerza", label: "Fuerza Pura", icon: Zap },
                  { id: "funcional", label: "Condición Física", icon: Heart },
                ].map((item) => {
                  const isSel = goal === item.id;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playClick();
                        setGoal(item.id as typeof goal);
                      }}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        isSel
                          ? "bg-[#181C24] border-white/60 text-white"
                          : "bg-[#111317] border-[#1C232B] text-[#8E9CAE] hover:text-white hover:border-[#2D3748]"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-white" />
                      <span className="text-xs font-semibold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Días de Entrenamiento */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E9CAE]">
                  03. Días de Entrenamiento Semanales
                </label>
                <span className="text-sm font-bold text-white font-mono">{days} Días / Semana</span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-white cursor-pointer h-1.5 bg-[#1C232B] rounded-lg"
              />
            </div>

            {/* 4. Peso Corporal */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#8E9CAE]">
                  04. Peso Corporal Actual
                </label>
                <span className="text-sm font-bold text-white font-mono">{weight} kg</span>
              </div>
              <input
                type="range"
                min={45}
                max={130}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-white cursor-pointer h-1.5 bg-[#1C232B] rounded-lg"
              />
            </div>

            {/* 5. Nivel de Experiencia */}
            <div>
              <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#8E9CAE] mb-2.5">
                05. Nivel de Experiencia
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "principiante", label: "< 6 meses" },
                  { id: "intermedio", label: "6 meses a 2 años" },
                  { id: "avanzado", label: "> 2 años" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      playClick();
                      setExperience(lvl.id as typeof experience);
                    }}
                    className={`py-2 px-1 text-center rounded-lg text-xs font-mono transition-all cursor-pointer border ${
                      experience === lvl.id
                        ? "bg-white text-[#0B0B0D] border-white font-bold"
                        : "bg-[#111317] text-[#8E9CAE] border-[#1C232B] hover:text-white"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* Results Display (5 cols) - Minimal & Typographic */}
          <div className="lg:col-span-5 rounded-2xl bg-[#111317] border border-[#1C232B] p-6 md:p-8 space-y-6">
            <div className="border-b border-[#1C232B] pb-4">
              <span className="text-xs font-mono uppercase tracking-wider text-[#8E9CAE]">
                // RESULTADO ESTIMADO
              </span>
              <h3 className="text-xl font-bold uppercase text-white tracking-tight mt-1">
                Estrategia Sugerida
              </h3>
            </div>

            {/* Macros Metrics */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-mono text-[#8E9CAE] mb-1">Calorías Sugeridas</span>
                <span className="text-3xl font-black text-white font-mono tracking-tight">
                  {rec.calories} <span className="text-xs text-[#8E9CAE] font-normal">kcal</span>
                </span>
              </div>
              <div>
                <span className="block text-xs font-mono text-[#8E9CAE] mb-1">Proteína Diaria</span>
                <span className="text-3xl font-black text-white font-mono tracking-tight">
                  {rec.protein} <span className="text-xs text-[#8E9CAE] font-normal">g</span>
                </span>
              </div>
            </div>

            {/* Split description */}
            <div className="pt-4 border-t border-[#1C232B]">
              <span className="block text-xs font-mono text-[#8E9CAE] uppercase tracking-wider mb-1">
                Distribución de Rutina
              </span>
              <p className="text-sm text-white font-medium">
                {rec.split}
              </p>
            </div>

            {/* Recommended Membership CTA */}
            <div className="pt-4 border-t border-[#1C232B] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="block text-xs text-[#8E9CAE]">Membresía sugerida:</span>
                <span className="text-sm font-bold text-white">{rec.planTitle}</span>
                <span className="block text-xs font-mono text-[#8E9CAE]">{rec.planPrice}</span>
              </div>
              <button
                onClick={() => {
                  playSuccess();
                  onOpenCheckout(rec.planTitle, rec.planPrice);
                }}
                className="px-5 py-2.5 rounded-xl bg-white hover:bg-[#22D6F6] text-[#0B0B0D] font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shrink-0"
              >
                <span>Ver Plan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
