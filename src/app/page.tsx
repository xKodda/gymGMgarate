"use client";

import React, { useState } from "react";
import { AudioProvider } from "@/components/AudioController";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import ScrollZoomHero from "@/components/ScrollZoomHero";
import DisciplinesSection from "@/components/DisciplinesSection";
import FacilitiesShowcase from "@/components/FacilitiesShowcase";
import PlatformPreview from "@/components/PlatformPreview";
import ScheduleSection from "@/components/ScheduleSection";
import FitnessCalculator from "@/components/FitnessCalculator";
import CommunitySection from "@/components/CommunitySection";
import PricingSection from "@/components/PricingSection";
import Footer from "@/components/Footer";
import RegistrationModal from "@/components/RegistrationModal";
import StudentPortalModal from "@/components/StudentPortalModal";

export default function Home() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("Plan Trimestral Pro");
  const [selectedPrice, setSelectedPrice] = useState("$79.990");
  const [portalModalOpen, setPortalModalOpen] = useState(false);

  const handleOpenCheckout = (plan: string, price: string) => {
    setSelectedPlan(plan);
    setSelectedPrice(price);
    setCheckoutOpen(true);
  };

  return (
    <AudioProvider>
      <SmoothScroll>
        <main className="min-h-screen bg-[#0B0B0D] text-[#F5F7FA] selection:bg-[#22D6F6] selection:text-[#0B0B0D] relative overflow-x-hidden">
          {/* Top Floating Glassmorphic Navbar with Motion Scroll Progress Bar */}
          <Navbar
            onOpenCheckout={handleOpenCheckout}
            onOpenPortalDemo={() => setPortalModalOpen(true)}
          />

          {/* Scroll Zoom Hero (Motion / Framer Motion Scroll Zoom) */}
          <ScrollZoomHero onOpenCheckout={handleOpenCheckout} />

          {/* Disciplinas & Programas de Entrenamiento */}
          <DisciplinesSection onOpenCheckout={handleOpenCheckout} />

          {/* Instalaciones de Élite & Equipamiento Hammer Strength */}
          <FacilitiesShowcase />

          {/* Sport GM On-Demand: Videoteca & Rutinas Exclusivas para Socios */}
          <PlatformPreview onOpenCheckout={handleOpenCheckout} />

          {/* Horarios en Tiempo Real & Reserva de Cupos */}
          <ScheduleSection />

          {/* Calculadora Interactiva de Objetivos Fitness & Macros */}
          <FitnessCalculator onOpenCheckout={handleOpenCheckout} />

          {/* Comunidad, Testimonios & Valoraciones */}
          <CommunitySection />

          {/* Membresías & Pases Digitales 2026 */}
          <PricingSection onOpenCheckout={handleOpenCheckout} />

          {/* Footer Oficial */}
          <Footer onOpenCheckout={handleOpenCheckout} />

          {/* Modales de Interacción */}
          <RegistrationModal
            isOpen={checkoutOpen}
            onClose={() => setCheckoutOpen(false)}
            initialPlan={selectedPlan}
            initialPrice={selectedPrice}
          />

          <StudentPortalModal
            isOpen={portalModalOpen}
            onClose={() => setPortalModalOpen(false)}
          />
        </main>
      </SmoothScroll>
    </AudioProvider>
  );
}
