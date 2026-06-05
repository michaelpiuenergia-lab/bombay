"use client";

import { motion } from "framer-motion";
import { HalalBadge } from "./Icons";

function Mandala({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth={2}>
      <circle cx="100" cy="100" r="18" />
      <circle cx="100" cy="100" r="40" />
      <circle cx="100" cy="100" r="64" />
      <circle cx="100" cy="100" r="88" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8;
        return (
          <g key={i}>
            <path
              d={`M100 100 L${100 + 88 * Math.cos(a)} ${100 + 88 * Math.sin(a)}`}
              opacity="0.5"
            />
            <circle cx={100 + 52 * Math.cos(a)} cy={100 + 52 * Math.sin(a)} r="7" />
            <circle cx={100 + 88 * Math.cos(a)} cy={100 + 88 * Math.sin(a)} r="4" />
          </g>
        );
      })}
    </svg>
  );
}

const phrases = [
  "नमस्ते",
  "BENVENUTI A BOMBAY",
  "स्वागत है",
  "100% HALAL",
  "حلال",
  "COTTO FRESCO OGNI GIORNO",
  "स्वाद भारत का",
  "IL SAPORE VERO DELL'INDIA",
];

export default function IndiaBand() {
  return (
    <section aria-label="Benvenuti — sapore dell'India" className="relative overflow-hidden">
      {/* tricolore accento */}
      <div className="grid h-1.5 w-full grid-cols-3">
        <div className="bg-saffron" />
        <div className="bg-cream" />
        <div className="bg-mehndi" />
      </div>

      <div className="relative bg-gradient-to-br from-saffron via-tandoori to-indian py-16 sm:py-20">
        {/* mandala decorativi */}
        <Mandala className="pointer-events-none absolute -left-16 -top-10 h-64 w-64 animate-spin-slow text-ink/15" />
        <Mandala className="pointer-events-none absolute -right-20 -bottom-16 h-80 w-80 animate-spin-slow text-ink/10" />

        <div className="container-bombay relative text-center text-ink">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full bg-ink/15 px-4 py-1.5 font-accent text-sm tracking-[0.3em]"
          >
            नमस्ते · NAMASTÉ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-4 max-w-3xl font-display text-4xl uppercase leading-[0.9] sm:text-6xl"
          >
            Un morso e sei
            <br />
            nel cuore dell&apos;India
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-4 max-w-xl text-base font-medium text-ink/75 sm:text-lg"
          >
            Spezie tostate, ricette di famiglia e il fuoco del tandoor. Street food
            indiano, croccante e <strong>100% Halal</strong>.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-7 inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-cream shadow-xl"
          >
            <HalalBadge className="h-7 w-7 text-mehndi" />
            <span className="text-left leading-tight">
              <span className="block font-accent text-base tracking-widest text-tandoori">
                HALAL CERTIFICATO
              </span>
              <span className="block text-xs text-cream/70">حلال · Filiera controllata</span>
            </span>
          </motion.div>
        </div>
      </div>

      {/* marquee frasi indiane su nastro scuro */}
      <div className="border-y border-tandoori/30 bg-ink py-3">
        <div className="mask-fade-x flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6">
            {[...phrases, ...phrases].map((p, i) => (
              <span key={i} className="flex items-center gap-6 font-display text-lg uppercase tracking-wider text-tandoori sm:text-xl">
                {p}
                <span className="text-saffron">✦</span>
              </span>
            ))}
          </div>
          <div className="flex shrink-0 animate-marquee items-center gap-6 pr-6" aria-hidden>
            {[...phrases, ...phrases].map((p, i) => (
              <span key={`b-${i}`} className="flex items-center gap-6 font-display text-lg uppercase tracking-wider text-tandoori sm:text-xl">
                {p}
                <span className="text-saffron">✦</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
