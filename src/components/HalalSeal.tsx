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
      {/* alone pulsante */}
      <motion.div
        className="absolute inset-2 rounded-full bg-saffron/25 blur-[70px]"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* disco scuro con bordo oro */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-ink-800/90 to-ink-900/95 ring-1 ring-tandoori/35 shadow-[inset_0_2px_60px_rgba(0,0,0,0.7)]" />

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
          <text className="fill-tandoori font-accent uppercase" style={{ fontSize: 11, letterSpacing: 4 }}>
            <textPath href={`#${pid}`} startOffset="0">
              ✦ 100% Halal ✦ Bombay Fry &amp; Grill ✦ Indian Fried Chicken ✦ Cotto Fresco ✦
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* galletto centrale */}
      <div className="absolute inset-[31%] overflow-hidden rounded-full bg-ink-900 ring-1 ring-tandoori/30 shadow-[inset_0_0_24px_rgba(0,0,0,0.7)]">
        <Image
          src="/logo-mark.png"
          alt="Galletto Bombay Fry & Grill"
          width={495}
          height={342}
          className="h-full w-full object-cover"
        />
      </div>

      {/* chip HALAL */}
      <div className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-mehndi px-4 py-1.5 text-cream shadow-xl ring-2 ring-cream/20">
        <HalalBadge className="h-4 w-4" />
        <span className="font-accent text-sm tracking-[0.2em]">HALAL</span>
      </div>
    </div>
  );
}
