import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import "@/site/site.scss";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: { default: "BarberHub", template: "%s | BarberHub" },
  description: "Barbearia premium com agendamento online, clube de assinatura e painel do profissional.",
};

export const viewport: Viewport = { themeColor: "#0b0a09" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${serif.variable} ${bebas.variable}`}>
      <body>{children}</body>
    </html>
  );
}
