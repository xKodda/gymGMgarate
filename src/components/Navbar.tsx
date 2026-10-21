"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Volume2, VolumeX, Menu, X, ShieldCheck, ArrowUpRight, Flame } from "lucide-react";
import { useAudio } from "./AudioController";

export default function Navbar({
  onOpenCheckout,
  onOpenPortalDemo,
}: {
  onOpenCheckout: (plan: string, price: string) => void;
  onOpenPortalDemo: () => void;
}) {
  const { soundEnabled, toggleSound, playClick, playHover } = useAudio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Disciplinas", href: "#disciplinas" },
    { name: "Instalaciones", href: "#instalaciones" },
    { name: "On-Demand", href: "#videoteca" },
    { name: "Horarios", href: "#horarios" },
    { name: "Calculadora", href: "#calculadora" },
    { name: "Membresías", href: "#planes" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playClick();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="fixed top-3 sm:top-4 left-0 right-0 z-40 px-3 sm:px-4 md:px-8 transition-all duration-300">
        <div
          className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${scrolled
            ? "bg-[#111317]/95 backdrop-blur-xl border border-[#1C232B] shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)] py-2.5 sm:py-3 px-3.5 sm:px-5 md:px-7"
            : "bg-[#111317]/75 backdrop-blur-md border border-[#1C232B]/60 py-3 sm:py-4 px-3.5 sm:px-5 md:px-7"
            }`}
        >
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href="/"
              onClick={() => playClick()}
              className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer shrink-0"
            >
              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border border-[#22D6F6]/40 shadow-[0_0_20px_rgba(34,214,246,0.25)] transition-transform group-hover:scale-105 duration-300 shrink-0 bg-[#111317] p-1 flex items-center justify-center">
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src="/images/logo.jpg"
                    alt="Sport GM Gym Logo"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg md:text-xl font-black tracking-wider text-white font-display">
                    SPORT <span className="text-[#22D6F6]">GM</span>
                  </span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#22D6F6] animate-pulse"></span>
                </div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  onMouseEnter={playHover}
                  className="px-3 py-1.5 text-xs xl:text-sm font-medium text-[#B8C2CC] hover:text-[#22D6F6] hover:bg-[#1C232B]/50 rounded-lg transition-all"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3">

              {/* Inscribirme Online CTA (Responsive on mobile) */}
              <button
                onClick={() => {
                  playClick();
                  onOpenCheckout("Plan Trimestral Pro", "$79.990");
                }}
                className="relative group overflow-hidden px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#22D6F6] text-[#0B0B0D] font-extrabold text-xs sm:text-sm transition-all duration-300 hover:shadow-[0_0_25px_rgba(34,214,246,0.5)] hover:scale-[1.02] cursor-pointer flex items-center gap-1.5 shrink-0"
              >
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current shrink-0" />
                <span className="hidden sm:inline">Inscribirme Online</span>
                <span className="sm:hidden">Inscribirme</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0" />
              </button>

              {/* Mobile Menu Button (44px min tap area) */}
              <button
                onClick={() => {
                  playClick();
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                aria-label={mobileMenuOpen ? "Cerrar menú móvil" : "Abrir menú móvil"}
                className="lg:hidden p-2.5 rounded-xl bg-[#0B0B0D] border border-[#1C232B] text-[#B8C2CC] hover:text-white cursor-pointer shrink-0"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 pt-3 border-t border-[#1C232B] flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-3.5 py-3 text-sm font-semibold text-[#CBD5E1] hover:text-[#22D6F6] hover:bg-[#1C232B] rounded-xl transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#64748B]" />
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2 border-t border-[#1C232B]/60">
                <button
                  onClick={() => {
                    playClick();
                    setMobileMenuOpen(false);
                    onOpenPortalDemo();
                  }}
                  className="w-full py-3 px-4 text-xs font-bold text-center text-[#F5F7FA] bg-[#0B0B0D] border border-[#1C232B] hover:border-[#22D6F6]/50 rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-4 h-4 text-[#22D6F6]" />
                  <span>Acceso Socios & Credencial Digital</span>
                </button>

                {/* Sound Toggle inside mobile menu */}
                <button
                  onClick={() => {
                    toggleSound();
                  }}
                  className="w-full py-2.5 px-4 text-xs font-mono text-center text-[#8E9CAE] hover:text-white bg-[#0B0B0D]/50 border border-[#1C232B] rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {soundEnabled ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-[#22D6F6]" />
                      <span>Efectos de Sonido: Activados</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-3.5 h-3.5" />
                      <span>Efectos de Sonido: Silenciados</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}
