import type { Metadata } from "next";
import { Anton, Bebas_Neue, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bombay Fry & Grill — Indian Fried Chicken · 100% Halal",
  description:
    "Pollo fritto indiano croccante, speziato e cotto fresco ogni giorno. 100% Halal certificato. Tradizione e spezie dell'India in ogni morso.",
  keywords: [
    "pollo fritto indiano",
    "halal fast food",
    "fried chicken",
    "Bombay Fry & Grill",
    "cibo halal",
    "indian fast food",
  ],
  openGraph: {
    title: "Bombay Fry & Grill — Indian Fried Chicken · 100% Halal",
    description:
      "Pollo fritto indiano croccante e speziato. 100% Halal. Cotto fresco ogni giorno.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className="scroll-smooth">
      <body
        className={`${anton.variable} ${bebas.variable} ${jakarta.variable} font-body bg-ink text-cream antialiased selection:bg-saffron selection:text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
