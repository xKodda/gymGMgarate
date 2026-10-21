"use client";

import React, { useState } from "react";
import { Check, Flame, Star, Shield, ArrowRight, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { useAudio } from "./AudioController";

export default function PricingSection({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playHover } = useAudio();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const plans = [
    {
      name: "Plan Mensual Sport",
      price: "$29.990",
      period: "por mes",
      highlight: false,
      badge: "Flexibilidad Total",
      description: "Ideal para comenzar a entrenar con la mejor energía y equipamiento completo en Sport GM.",
      features: [
        "Acceso libre a sala de musculación & peso libre",
        "Máquinas de musculación guiada & zona cardio",
        "Credencial digital con QR en tu celular",
        "Uso de camarines y casilleros",
        "Asesoría básica de inducción en sala",
      ],
      cta: "Elegir Plan Mensual",
    },
    {
      name: "Plan Trimestral Pro",
      price: "$79.990",
      period: "por 3 meses ($26.663/mes)",
      highlight: true,
      badge: "MÁS POPULAR • AHORRA 15%",
      description: "La opción preferida por nuestros socios para lograr constancia y resultados reales.",
      features: [
        "Todo lo incluido en el Plan Mensual",
        "Acceso a todas las clases grupales (Cross Training, Funcional)",
        "Acceso FULL a la Videoteca Online de Rutinas",
        "Evaluación inicial y plan de entrenamiento",
        "Reserva prioritaria de cupos en horas punta",
        "Sin costo de matrícula de inscripción",
      ],
      cta: "Elegir Plan Trimestral",
    },
    {
      name: "Plan Anual VIP Black",
      price: "$269.990",
      period: "por 12 meses ($22.499/mes)",
      highlight: false,
      badge: "2 MESES GRATIS • VIP TOTAL",
      description: "Compromiso total. El pase definitivo con beneficios exclusivos.",
      features: [
        "Acceso ilimitado total los 365 días del año",
        "Acceso a todas las clases, cursos y retos digitales",
        "4 Sesiones de Asesoría y Rutina Personalizada",
        "Polera técnica oficial SPORT GM de regalo",
        "Congelamiento de plan hasta 30 días por viaje o salud",
        "Pase de invitado: Trae a un amigo 1 vez al mes",
      ],
      cta: "Elegir Plan VIP Black",
    },
  ];

  const faqs = [
    {
      q: "¿Cómo funciona la inscripción online?",
      a: "Es 100% inmediata. Seleccionas tu plan, ingresas tus datos y pagas de forma segura con Webpay (débito/crédito) o Mercado Pago. En ese mismo instante la plataforma genera tu credencial digital con código QR con la cual pasas por el torniquete del gimnasio.",
    },
    {
      q: "¿Dónde está ubicado Sport GM Gym y cuáles son los horarios?",
      a: "Estamos ubicados en Puente Alto, Santiago (Sector Casas Viejas). Nuestro horario es de Lunes a Viernes de 06:00 a 23:00 hrs, y Sábados de 08:00 a 20:00 hrs.",
    },
    {
      q: "¿Puedo acceder a la videoteca y cursos si no puedo ir presencialmente?",
      a: "¡Sí! El ecosistema digital permite suscribirse al acceso exclusivo de videoteca y rutinas guiadas para personas que entrenan en casa o en otras regiones de Chile.",
    },
    {
      q: "¿Hay contratos con letra chica o cargos ocultos?",
      a: "Ninguno. En Sport GM no cobramos costos ocultos de mantención. El precio que ves en la pantalla es exactamente el que pagas.",
    },
  ];

  return (
    <section id="planes" className="py-28 md:py-36 px-4 md:px-8 bg-[#111317] relative border-t border-[#1C232B]">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header: Contained Headline Size */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-white tracking-tight mb-4 font-display">
            ELIGE TU NIVEL DE COMPROMISO
          </h2>

          <p className="text-base text-[#94A3B8] leading-relaxed">
            Inscripción digital instantánea sin filas ni trámites manuales. Selecciona tu plan y obtén tu credencial QR hoy mismo.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-stretch mb-20">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              onMouseEnter={playHover}
              className={`rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col justify-between transition-all duration-300 relative ${plan.highlight
                  ? "bg-[#141820] border-2 border-[#22D6F6] shadow-xl md:-translate-y-2"
                  : "bg-[#0B0B0D] border border-[#1C232B] hover:border-[#2D3748]"
                }`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] sm:text-[11px] font-mono font-bold px-2.5 sm:px-3 py-1 rounded-full ${plan.highlight
                      ? "bg-[#22D6F6] text-[#0B0B0D]"
                      : "bg-[#111317] text-[#8E9CAE] border border-[#1C232B]"
                    }`}
                >
                  {plan.badge}
                </span>
                {plan.highlight && <Star className="w-4 h-4 text-[#22D6F6] fill-current" />}
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold uppercase text-white mb-2">{plan.name}</h3>
                <p className="text-xs text-[#94A3B8] mb-5 sm:mb-6 leading-relaxed">{plan.description}</p>

                {/* Price */}
                <div className="mb-5 sm:mb-6 pb-5 sm:pb-6 border-b border-[#1C232B]">
                  <span className="text-3xl sm:text-4xl font-black text-white font-mono">{plan.price}</span>
                  <span className="block text-xs text-[#8E9CAE] mt-1 font-mono">{plan.period}</span>
                </div>

                {/* Features List */}
                <div className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-[#CBD5E1]">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${plan.highlight
                          ? "bg-[#22D6F6]/20 text-[#22D6F6]"
                          : "bg-[#1C232B] text-[#8E9CAE]"
                        }`}>
                        <Check className="w-2.5 h-2.5" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => {
                  playClick();
                  onOpenCheckout(plan.name, plan.price);
                }}
                className={`w-full py-3.5 sm:py-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${plan.highlight
                    ? "bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] shadow-[0_0_20px_rgba(34,214,246,0.35)] hover:scale-[1.01]"
                    : "bg-[#111317] hover:bg-[#1E232B] text-white border border-[#1C232B] hover:border-[#384352]"
                  }`}
              >
                <span>{plan.cta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black uppercase text-white font-display">
              PREGUNTAS FRECUENTES
            </h3>
            <p className="text-xs text-[#B8C2CC] mt-1">
              Todo lo que necesitas saber sobre tu membresía y acceso al gimnasio.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, fIdx) => {
              const isOpen = openFaq === fIdx;
              return (
                <div
                  key={fIdx}
                  className="rounded-2xl bg-[#0B0B0D] border border-[#1C232B] overflow-hidden transition-colors hover:border-[#22D6F6]/30"
                >
                  <button
                    onClick={() => {
                      playClick();
                      setOpenFaq(isOpen ? null : fIdx);
                    }}
                    className="w-full p-4 md:p-5 flex items-center justify-between text-left cursor-pointer"
                  >
                    <span className="text-sm font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-[#22D6F6] flex-shrink-0" />
                      <span>{faq.q}</span>
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#22D6F6]" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#B8C2CC]" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-[#B8C2CC] leading-relaxed border-t border-[#1C232B]/60 animate-in fade-in duration-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
