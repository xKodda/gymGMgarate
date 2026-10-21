"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MessageCircle, MapPin, Clock, Mail, Phone, ArrowUpRight, Sparkles, CheckCircle2 } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import { useAudio } from "./AudioController";

export default function Footer({
  onOpenCheckout,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
}) {
  const { playClick, playSuccess, playHover } = useAudio();
  const [emailSub, setEmailSub] = useState("");
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailSub) return;
    playSuccess();
    setSubSuccess(true);
    setTimeout(() => {
      setSubSuccess(false);
      setEmailSub("");
    }, 3500);
  };

  return (
    <footer id="contacto" className="bg-[#0B0B0D] border-t border-[#1C232B] pt-24 pb-12 px-4 md:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Production CTA Banner */}
        <div className="rounded-2xl bg-[#111317] border border-[#1C232B] p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <span className="text-xs font-mono text-[#8E9CAE] uppercase tracking-wider font-semibold">
              // SPORT GM GYM • PUENTE ALTO
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-white tracking-tight mt-1 mb-2 font-display">
              ¿LISTO PARA FORJAR TU MEJOR VERSIÓN?
            </h3>
            <p className="text-sm text-[#94A3B8] max-w-xl">
              Inscríbete hoy de forma 100% digital, obtén tu credencial QR y comienza a entrenar con la mejor maquinaria Hammer Strength de la zona sur.
            </p>
          </div>

          <button
            onClick={() => {
              playClick();
              onOpenCheckout("Plan Trimestral Pro", "$79.990");
            }}
            onMouseEnter={playHover}
            className="px-8 py-4 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-xs uppercase tracking-wider flex items-center gap-2 shadow-[0_0_25px_rgba(34,214,246,0.35)] transition-all hover:scale-105 cursor-pointer flex-shrink-0"
          >
            <span>Inscribirme Online Ahora</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Col 1: Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden border border-[#22D6F6]/40 shadow-[0_0_15px_rgba(34,214,246,0.25)] shrink-0 bg-[#111317] p-1 flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/logo.jpg"
                    alt="Sport GM Gym Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-xl font-black tracking-wider text-white font-display">
                SPORT <span className="text-[#22D6F6]">GM</span>
              </span>
            </div>
            <p className="text-xs text-[#B8C2CC] leading-relaxed">
              Centro de alto rendimiento, musculación y fuerza en Puente Alto. Forjando disciplina, salud y rendimiento con equipamiento de nivel élite.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/sportgmgym/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Sport GM Gym"
                className="w-10 h-10 rounded-xl bg-[#111317] border border-[#1C232B] flex items-center justify-center text-[#B8C2CC] hover:text-[#22D6F6] hover:border-[#22D6F6]/50 transition-all cursor-pointer"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/56900000000?text=Hola%20Sport%20GM%20Gym,%20quiero%20información%20de%20los%20planes"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp de Sport GM Gym"
                className="w-10 h-10 rounded-xl bg-[#111317] border border-[#1C232B] flex items-center justify-center text-[#B8C2CC] hover:text-emerald-400 hover:border-emerald-500/50 transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Ubicación & Horarios */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              SEDE & HORARIOS
            </h4>
            <div className="space-y-2 text-xs text-[#B8C2CC]">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#22D6F6] flex-shrink-0 mt-0.5" />
                <span>Puente Alto, Región Metropolitana, Chile (Sector Casas Viejas)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#22D6F6] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Lunes a Viernes:</p>
                  <p>06:00 a 23:00 hrs</p>
                  <p className="text-white font-medium mt-1">Sábados:</p>
                  <p>08:00 a 20:00 hrs</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 3: Navegación Rápida */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              EXPLORAR
            </h4>
            <ul className="space-y-2 text-xs text-[#B8C2CC]">
              <li>
                <a href="#disciplinas" className="hover:text-[#22D6F6] transition-colors">
                  Disciplinas & Programas
                </a>
              </li>
              <li>
                <a href="#instalaciones" className="hover:text-[#22D6F6] transition-colors">
                  Instalaciones & Maquinaria
                </a>
              </li>
              <li>
                <a href="#videoteca" className="hover:text-[#22D6F6] transition-colors">
                  Sport GM On-Demand
                </a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-[#22D6F6] transition-colors">
                  Grilla de Clases & Cupos
                </a>
              </li>
              <li>
                <a href="#calculadora" className="hover:text-[#22D6F6] transition-colors">
                  Calculadora de Macros & Rutina
                </a>
              </li>
              <li>
                <a href="#planes" className="hover:text-[#22D6F6] transition-colors">
                  Membresías & Pases 2026
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              EVENTOS & NOVEDADES
            </h4>
            <p className="text-xs text-[#B8C2CC]">
              Suscríbete para recibir noticias de nuevos talleres, retos de transformación y horarios especiales.
            </p>
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                placeholder="tu-correo@gmail.com"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                required
                className="w-full bg-[#111317] border border-[#1C232B] focus:border-[#22D6F6] rounded-xl px-3.5 py-3 sm:py-2.5 text-base sm:text-xs text-white focus:outline-none"
              />
              <button
                type="submit"
                className="w-full py-3 sm:py-2.5 bg-[#1C232B] hover:bg-[#22D6F6] text-white hover:text-[#0B0B0D] font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                {subSuccess ? "¡Suscrito con éxito!" : "Suscribirme"}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="pt-8 border-t border-[#1C232B] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#B8C2CC]">
          <p>© 2026 SPORT GM GYM Puente Alto. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 font-mono text-[11px]">
            <span className="w-2 h-2 rounded-full bg-[#22D6F6]"></span>
            <span>CENTRO DE ALTO RENDIMIENTO • PUENTE ALTO</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
