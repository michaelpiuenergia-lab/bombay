"use client";

import { useId } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HalalBadge } from "./Icons";

/* Sigillo Halal: galletto centrale + anello di testo "100% HALAL · BOMBAY..."
   che gira. Riutilizzabile (hero + sezione reel). La dimensione la decide
   il contenitore tramite `className` (default ~20rem). */
export default function HalalSeal({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const pid = "halalring-" + useId().replace(/:/g, "");

  return (
    <div className={`relative mx-auto grid aspect-square place-items-center ${className ?? "w-full max-w-[20rem]"}`}>
      {/* alone pulsante — luce bianca calda, non bagliore notturno */}
      <motion.div
        className="absolute inset-2 rounded-full bg-white/40 blur-[70px]"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* disco bianco caldo con bordo oro — un timbro di qualità */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white to-cream ring-2 ring-tandoori shadow-warm" />

      {/* anello di testo HALAL che gira */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path id={pid} d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
          </defs>
          <text className="fill-indian font-accent uppercase" style={{ fontSize: 11, letterSpacing: 4 }}>
            <textPath href={`#${pid}`} startOffset="0">
              ✦ 100% Halal ✦ Bombay Fry &amp; Grill ✦ Indian Fried Chicken ✦ Cotto Fresco ✦
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* galletto centrale (l'artwork del logo vive su maroon: il cerchietto
          scuro resta come DETTAGLIO, non come sfondo) */}
      <div className="absolute inset-[31%] overflow-hidden rounded-full bg-ink-900 ring-2 ring-tandoori shadow-warm">
        <Image
          src="/logo-mark.png"
          alt="Galletto Bombay Fry & Grill"
          width={495}
          height={342}
          className="h-full w-full object-cover"
        />
      </div>

      {/* chip HALAL */}
      <div className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-mehndi px-4 py-1.5 text-cream shadow-warm ring-2 ring-white/80">
        <HalalBadge className="h-4 w-4" />
        <span className="font-accent text-sm tracking-[0.2em]">HALAL</span>
      </div>
    </div>
  );
}
