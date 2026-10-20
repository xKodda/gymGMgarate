"use client";

import React, { useState } from "react";
import { Calculator, Flame, Dumbbell, Zap, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { useAudio } from "./AudioController";

export default function FitnessCalculator({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playSuccess, playHover } = useAudio();

  const [gender, setGender] = useState<"hombre" | "mujer">("hombre");
  const [goal, setGoal] = useState<"hipertrofia" | "definicion" | "fuerza" | "funcional">("hipertrofia");
  const [days, setDays] = useState<number>(4);
  const [experience, setExperience] = useState<"principiante" | "intermedio" | "avanzado">("intermedio");
  const [weight, setWeight] = useState<number>(75);

  const calculateRecommendation = () => {
    let calories = 0;
    let protein = Math.round(weight * 2.0);
    let planTitle = "Plan Trimestral Pro";
    let planPrice = "$79.990";
    let split = "Torso / Pierna (4 Días de Alta Frecuencia)";

    if (goal === "hipertrofia") {
      calories = Math.round(weight * 36 + days * 80);
      planTitle = "Plan Trimestral Pro";
      planPrice = "$79.990";
      split = days <= 3 ? "Full Body Funcional Hipertrofia" : "Push - Pull - Legs + Brazos";
    } else if (goal === "definicion") {
      calories = Math.round(weight * 28 + days * 50);
      protein = Math.round(weight * 2.2);
      planTitle = "Plan Trimestral Pro";
      planPrice = "$79.990";
      split = "Circuito Funcional Metabólico + Musculación Pesada";
    } else if (goal === "fuerza") {
      calories = Math.round(weight * 34 + days * 70);
      planTitle = "Plan Anual Black VIP";
      planPrice = "$269.990";
      split = "Periodización de Cargas (Sentadilla, Banca, Peso Muerto)";
    } else {
      calories = Math.round(weight * 30 + days * 60);
      planTitle = "Plan Mensual Sport";
      planPrice = "$29.990";
      split = "Cross Training + Movilidad y Core";
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
    <section id="calculadora" className="py-28 md:py-36 px-4 md:px-8 bg-[#111317] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: Contained Headline Size */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-3 text-xs font-mono uppercase tracking-[0.25em] text-[#8E9CAE] mb-4">
            <span className="w-2 h-2 rounded-full bg-[#8E9CAE]" />
            <span>05 // DIAGNÓSTICO INTERACTIVO & BIOMETRÍA</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display">
            CALCULADORA DE OBJETIVOS FITNESS
          </h2>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Ingresa tus parámetros y nuestro algoritmo calculará tu volumen de calorías estimado, proteína sugerida y el plan ideal de entrenamiento en Sport GM.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-[#0B0B0D] border border-[#1C232B] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl">
            {/* Gender Toggle */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B8C2CC] mb-2">
                1. Género
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
                    className={`py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      gender === g.id
                        ? "bg-[#22D6F6] text-[#0B0B0D] shadow-[0_0_15px_rgba(34,214,246,0.3)]"
                        : "bg-[#111317] text-[#B8C2CC] hover:text-white border border-[#1C232B]"
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goal Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B8C2CC] mb-2">
                2. Objetivo Principal
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { id: "hipertrofia", label: "Ganar Músculo", icon: Dumbbell },
                  { id: "definicion", label: "Quemar Grasa", icon: Flame },
                  { id: "fuerza", label: "Fuerza Pura", icon: Zap },
                  { id: "funcional", label: "Salud y Condición", icon: Heart },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        playClick();
                        setGoal(item.id as typeof goal);
                      }}
                      className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                        goal === item.id
                          ? "bg-[#161a22] border-[#22D6F6] text-white shadow-[0_0_12px_rgba(34,214,246,0.25)]"
                          : "bg-[#111317] border-[#1C232B] text-[#B8C2CC] hover:text-white"
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${goal === item.id ? "text-[#22D6F6]" : "text-[#B8C2CC]"}`} />
                      <span className="text-xs font-bold leading-tight">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Days per week Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#B8C2CC]">
                  3. Días de Entrenamiento Semanales
                </label>
                <span className="text-sm font-black text-[#22D6F6] font-mono">{days} Días / Semana</span>
              </div>
              <input
                type="range"
                min={2}
                max={6}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="w-full accent-[#22D6F6] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#B8C2CC] mt-1 font-mono">
                <span>2 Días</span>
                <span>4 Días</span>
                <span>6 Días</span>
              </div>
            </div>

            {/* Weight Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#B8C2CC]">
                  4. Peso Corporal Actual
                </label>
                <span className="text-sm font-black text-[#22D6F6] font-mono">{weight} kg</span>
              </div>
              <input
                type="range"
                min={45}
                max={130}
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full accent-[#22D6F6] cursor-pointer"
              />
            </div>

            {/* Experience level */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#B8C2CC] mb-2">
                5. Nivel de Experiencia
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "principiante", label: "Menos de 6 meses" },
                  { id: "intermedio", label: "6 meses a 2 años" },
                  { id: "avanzado", label: "Más de 2 años" },
                ].map((lvl) => (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      playClick();
                      setExperience(lvl.id as typeof experience);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-[11px] font-medium transition-all cursor-pointer ${
                      experience === lvl.id
                        ? "bg-[#22D6F6] text-[#0B0B0D] font-bold"
                        : "bg-[#111317] text-[#B8C2CC] border border-[#1C232B]"
                    }`}
                  >
                    {lvl.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results Display */}
          <div className="lg:col-span-5 bg-gradient-to-b from-[#161a22] to-[#0d0f13] border-2 border-[#22D6F6]/60 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#22D6F6]/15 text-[#22D6F6] text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>PLAN PERSONALIZADO SPORT GM</span>
            </div>

            <div>
              <h3 className="text-2xl font-black uppercase text-white font-display">
                Tu Estrategia de Éxito
              </h3>
              <p className="text-xs text-[#B8C2CC] mt-1">
                Optimizada para {gender === "hombre" ? "Hombre" : "Mujer"} con meta de {goal}.
              </p>
            </div>

            {/* Macros Output */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] text-center">
                <span className="block text-[11px] text-[#B8C2CC]">Calorías Sugeridas</span>
                <span className="text-2xl font-black text-[#22D6F6] font-mono">
                  {rec.calories} <span className="text-xs text-white">kcal</span>
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] text-center">
                <span className="block text-[11px] text-[#B8C2CC]">Proteína Diaria</span>
                <span className="text-2xl font-black text-white font-mono">
                  {rec.protein} <span className="text-xs text-[#22D6F6]">g</span>
                </span>
              </div>
            </div>

            {/* Split description */}
            <div className="p-4 rounded-2xl bg-[#0B0B0D] border border-[#1C232B]">
              <span className="block text-[11px] text-[#22D6F6] font-bold uppercase tracking-wider mb-1">
                Estructura de Rutina Recomendada
              </span>
              <p className="text-xs text-white font-semibold">
                {rec.split}
              </p>
            </div>

            {/* Recommended Membership */}
            <div className="p-4 rounded-2xl bg-[#111317] border border-[#22D6F6]/30">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-[#B8C2CC]">Membresía sugerida:</span>
                <span className="text-sm font-black text-[#22D6F6] font-mono">{rec.planPrice}</span>
              </div>
              <p className="text-sm font-bold text-white mb-3">{rec.planTitle}</p>
              <button
                onClick={() => {
                  playSuccess();
                  onOpenCheckout(rec.planTitle, rec.planPrice);
                }}
                className="w-full py-3 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,214,246,0.35)] cursor-pointer"
              >
                <span>Inscribirme con Este Plan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
