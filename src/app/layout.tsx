import type { Metadata, Viewport } from "next";
import { Outfit, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0B0B0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "SPORT GM GYM | High Performance Center & Digital Ecosystem",
  description: "Centro de entrenamiento de alto rendimiento en Puente Alto. Membresías online, videoteca de entrenamientos, cursos, reserva de clases y plataforma digital de última generación.",
  keywords: ["gimnasio puente alto", "sport gm gym", "crossfit santiago", "musculacion chile", "fitness santiago"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${outfit.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
      suppressHydrationWarning
    >
      <body className="bg-[#0B0B0D] text-[#F5F7FA] font-sans antialiased selection:bg-[#22D6F6] selection:text-[#0B0B0D] overflow-x-hidden min-h-screen">
        {children}
      </body>
    </html>
  );
}
