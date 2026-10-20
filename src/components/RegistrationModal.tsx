"use client";

import React, { useState, useEffect } from "react";
import { X, CheckCircle2, ShieldCheck, CreditCard, Download, ArrowRight, Sparkles, Smartphone, QrCode } from "lucide-react";
import confetti from "canvas-confetti";
import { useAudio } from "./AudioController";

export default function RegistrationModal({
  isOpen,
  onClose,
  initialPlan = "Plan Trimestral Pro",
  initialPrice = "$79.990",
}: {
  isOpen: boolean;
  onClose: () => void;
  initialPlan?: string;
  initialPrice?: string;
}) {
  const { playClick, playSuccess } = useAudio();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    name: "Cristian Valenzuela",
    email: "contacto@ejemplo.cl",
    phone: "+56 9 8765 4321",
    rut: "18.345.678-9",
    plan: initialPlan,
    price: initialPrice,
    paymentMethod: "webpay",
  });

  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      plan: initialPlan,
      price: initialPrice,
    }));
  }, [initialPlan, initialPrice]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmitStep1 = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStep(2);
  };

  const handleSimulatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      playSuccess();
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.5 },
          colors: ["#22D6F6", "#ffffff", "#0fbddb", "#161a22"],
        });
      } catch {}
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#111317] border border-[#22D6F6]/50 rounded-3xl max-w-xl w-full max-h-[95vh] overflow-y-auto p-6 md:p-8 relative shadow-[0_0_50px_rgba(34,214,246,0.2)]">
        {/* Close Button */}
        <button
          onClick={() => {
            playClick();
            onClose();
          }}
          className="absolute top-5 right-5 text-[#B8C2CC] hover:text-white p-2 rounded-full hover:bg-[#1C232B] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-[#22D6F6] flex items-center justify-center text-[#0B0B0D] font-black text-xs">
            GM
          </div>
          <div>
            <h3 className="font-black text-lg text-white uppercase tracking-wider font-display">
              SPORT GM GYM
            </h3>
            <span className="text-[10px] text-[#22D6F6] font-mono">
              SISTEMA DE INSCRIPCIÓN DIGITAL SEGURA
            </span>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? "bg-[#22D6F6] text-[#0B0B0D]" : "bg-[#1C232B] text-white"}`}>
              1
            </span>
            <span className={`text-xs ${step === 1 ? "text-white font-bold" : "text-[#B8C2CC]"}`}>Datos</span>
          </div>
          <div className="w-10 h-0.5 bg-[#1C232B]" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? "bg-[#22D6F6] text-[#0B0B0D]" : "bg-[#1C232B] text-white"}`}>
              2
            </span>
            <span className={`text-xs ${step === 2 ? "text-white font-bold" : "text-[#B8C2CC]"}`}>Pago</span>
          </div>
          <div className="w-10 h-0.5 bg-[#1C232B]" />
          <div className="flex items-center gap-2">
            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${step === 3 ? "bg-[#22D6F6] text-[#0B0B0D]" : "bg-[#1C232B] text-white"}`}>
              3
            </span>
            <span className={`text-xs ${step === 3 ? "text-white font-bold" : "text-[#B8C2CC]"}`}>Pase QR</span>
          </div>
        </div>

        {/* Selected Plan Summary Banner */}
        <div className="p-3 rounded-2xl bg-[#0B0B0D] border border-[#1C232B] flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] text-[#B8C2CC] uppercase font-mono">Plan Seleccionado:</span>
            <p className="text-sm font-bold text-white">{formData.plan}</p>
          </div>
          <span className="text-base font-black text-[#22D6F6] font-mono">{formData.price}</span>
        </div>

        {/* STEP 1: PERSONAL DATA */}
        {step === 1 && (
          <form onSubmit={handleSubmitStep1} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-[#B8C2CC] mb-1">
                Nombre Completo:
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-[#0B0B0D] border border-[#1C232B] focus:border-[#22D6F6] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-[#B8C2CC] mb-1">
                  Email (recibirás el pase aquí):
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-[#1C232B] focus:border-[#22D6F6] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#B8C2CC] mb-1">
                  Teléfono / WhatsApp:
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-[#0B0B0D] border border-[#1C232B] focus:border-[#22D6F6] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#B8C2CC] mb-1">
                RUT / Cédula de Identidad:
              </label>
              <input
                type="text"
                required
                value={formData.rut}
                onChange={(e) => setFormData({ ...formData, rut: e.target.value })}
                className="w-full bg-[#0B0B0D] border border-[#1C232B] focus:border-[#22D6F6] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(34,214,246,0.35)] cursor-pointer mt-2"
            >
              <span>Continuar al Pago Seguro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: PAYMENT METHOD */}
        {step === 2 && (
          <form onSubmit={handleSimulatePayment} className="space-y-4">
            <p className="text-xs text-[#B8C2CC] mb-3">
              Selecciona tu pasarela preferida (todas las transacciones están encriptadas con SSL 256-bit):
            </p>

            <div className="space-y-2.5">
              {[
                { id: "webpay", title: "Webpay Plus (Transbank)", desc: "Redcompra, Débito y Tarjetas de Crédito en cuotas" },
                { id: "mercadopago", title: "Mercado Pago", desc: "Saldo en cuenta, tarjetas bancarias o suscripción mensual automática" },
                { id: "transfer", title: "Transferencia Bancaria Instantánea", desc: "Confirmación en 2 minutos con comprobante digital" },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => setFormData({ ...formData, paymentMethod: m.id })}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    formData.paymentMethod === m.id
                      ? "bg-[#161a22] border-[#22D6F6] shadow-[0_0_15px_rgba(34,214,246,0.15)]"
                      : "bg-[#0B0B0D] border-[#1C232B] hover:border-[#22D6F6]/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <CreditCard className={`w-4 h-4 ${formData.paymentMethod === m.id ? "text-[#22D6F6]" : "text-[#B8C2CC]"}`} />
                    <div>
                      <p className="text-xs font-bold text-white">{m.title}</p>
                      <p className="text-[10px] text-[#B8C2CC]">{m.desc}</p>
                    </div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.paymentMethod === m.id ? "border-[#22D6F6] bg-[#22D6F6]" : "border-[#1C232B]"}`}>
                    {formData.paymentMethod === m.id && <div className="w-1.5 h-1.5 rounded-full bg-[#0B0B0D]" />}
                  </div>
                </div>
              ))}
            </div>

            {isProcessing ? (
              <div className="py-8 text-center space-y-3">
                <div className="w-10 h-10 mx-auto rounded-full border-2 border-[#22D6F6] border-t-transparent animate-spin" />
                <p className="text-xs font-semibold text-white">Procesando pago con {formData.paymentMethod.toUpperCase()}...</p>
                <p className="text-[10px] text-[#B8C2CC]">Generando credencial de acceso para {formData.name}...</p>
              </div>
            ) : (
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-1/3 py-3 text-xs font-bold text-[#B8C2CC] bg-[#0B0B0D] hover:text-white rounded-xl border border-[#1C232B]"
                >
                  Volver
                </button>
                <button
                  type="submit"
                  className="w-2/3 py-3.5 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,214,246,0.35)] cursor-pointer"
                >
                  <span>Pagar {formData.price}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </form>
        )}

        {/* STEP 3: SUCCESS & QR PASS GENERATION */}
        {step === 3 && (
          <div className="space-y-5 animate-in fade-in duration-300">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-6 h-6 flex-shrink-0" />
              <div>
                <p className="font-bold text-sm">¡Inscripción Exitosa en Sport GM Gym!</p>
                <p className="text-xs text-emerald-300/80">Tu pago fue procesado correctamente. Tu credencial ya tiene acceso a las instalaciones de Puente Alto.</p>
              </div>
            </div>

            {/* Generated QR Pass Preview */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#161a22] to-[#0b0b0d] border-2 border-[#22D6F6] text-center space-y-3">
              <div className="flex items-center justify-between text-xs font-mono text-[#B8C2CC] border-b border-[#1C232B] pb-2">
                <span>SPORT GM • PUENTE ALTO</span>
                <span className="text-emerald-400 font-bold">ESTADO: AUTORIZADO</span>
              </div>

              <div className="w-36 h-36 mx-auto bg-white rounded-2xl p-2.5 flex items-center justify-center shadow-lg">
                <div className="w-full h-full bg-[#0B0B0D] rounded-xl p-2 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-7 h-7 bg-[#22D6F6] rounded-sm" />
                    <div className="w-7 h-7 bg-[#22D6F6] rounded-sm" />
                  </div>
                  <div className="text-center font-mono text-[9px] text-[#22D6F6] font-bold">
                    ID: SGM-{Math.floor(100000 + Math.random() * 900000)}
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-7 h-7 bg-[#22D6F6] rounded-sm" />
                    <div className="w-5 h-5 bg-white rounded-sm" />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{formData.name}</h4>
                <p className="text-xs text-[#22D6F6] font-semibold">{formData.plan}</p>
                <p className="text-[11px] text-[#B8C2CC] mt-0.5">RUT: {formData.rut}</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  playClick();
                  alert("¡Credencial guardada en tu dispositivo! También te enviamos una copia a " + formData.email);
                }}
                className="flex-1 py-3 rounded-xl bg-[#22D6F6] hover:bg-[#0fbddb] text-[#0B0B0D] font-bold text-xs uppercase flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Descargar en Wallet</span>
              </button>
              <button
                onClick={() => {
                  playClick();
                  onClose();
                  setStep(1);
                }}
                className="flex-1 py-3 rounded-xl bg-[#1C232B] hover:bg-[#2a3440] text-white font-medium text-xs flex items-center justify-center cursor-pointer"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
