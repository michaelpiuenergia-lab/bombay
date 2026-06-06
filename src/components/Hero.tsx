"use client";

import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { HalalBadge } from "./Icons";
import { stats } from "@/lib/data";

/* ════════════════════════════════════════════════════════════════════════
   HERO — "SEI ARRIVATO DA BOMBAY"
   Stesso sfondo delle sezioni che piacciono (Atmosphere + glow morbidi).
   PIENA come HalalReel: identità del brand al centro (gallo + insegna +
   timbro HALAL) affiancata da DUE colonne di cibo ordinate. Niente vuoto,
   niente immagini sparse. Il logo è il re, l'Halal il cavallo di battaglia.
   ════════════════════════════════════════════════════════════════════════ */

const easeOut = [0.22, 1, 0.36, 1] as const;

const LEFT_FOOD = [
  { src: "/food/u4.jpg", alt: "Tandoori Crunch Burger" },
  { src: "/food/u8.jpg", alt: "Seekh Kebab alla brace" },
];
const RIGHT_FOOD = [
  { src: "/food/u5.jpg", alt: "Bombay Bucket di pollo fritto" },
  { src: "/food/u11.jpg", alt: "Masala Wings glassate" },
];
const MOBILE_FOOD = [
  { src: "/food/u5.jpg", alt: "Bombay Bucket" },
  { src: "/food/u4.jpg", alt: "Tandoori Crunch Burger" },
  { src: "/food/u11.jpg", alt: "Masala Wings" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 18 });
  const sy = useSpring(my, { stiffness: 50, damping: 18 });
  const signX = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const signY = useTransform(sy, [-0.5, 0.5], [-6, 6]);

  function onMove(e: React.MouseEvent) {
    if (reduce) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden py-24"
    >
      {/* ░░ AMBIENTE: identico alle sezioni che ami — Atmosphere + glow morbidi ░░ */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-indian/20 blur-[150px]" />
        <div className="absolute left-1/2 bottom-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-saffron/12 blur-[150px]" />
      </div>

      {/* tricolore */}
      <div className="absolute inset-x-0 top-0 z-30 grid h-1 grid-cols-3">
        <div className="bg-saffron" /><div className="bg-cream" /><div className="bg-mehndi" />
      </div>

      {/* patatine che levitano (al posto delle braci-pallini) */}
      <FloatingFries />

      <div className="container-bombay relative z-10 grid w-full items-center gap-6 lg:grid-cols-[0.8fr_1.15fr_0.8fr] lg:gap-8">
        {/* ── colonna cibo SINISTRA ── */}
        <div className="hidden flex-col gap-4 lg:flex">
          {LEFT_FOOD.map((f, i) => <FoodCard key={f.src} {...f} delay={0.5 + i * 0.12} />)}
        </div>

        {/* ── IDENTITÀ centrale ── */}
        <motion.div
          style={reduce ? undefined : { x: signX, y: signY }}
          className="flex flex-col items-center text-center text-cream"
        >
          <motion.span
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="inline-flex items-center gap-2 rounded-full border border-tandoori/30 bg-ink-800/60 px-4 py-1.5 font-accent text-sm tracking-[0.3em] text-tandoori backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mehndi opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mehndi" />
            </span>
            नमस्ते · SEI ARRIVATO DA BOMBAY
          </motion.span>

          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.5, rotate: -14 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 70, damping: 13, delay: 0.12 }}
            className="mt-5 w-[clamp(7rem,15vmin,10rem)]"
          >
            <Crest reduce={!!reduce} />
          </motion.div>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.28, ease: easeOut }}
            className="mt-4"
          >
            <h1 className="font-display uppercase leading-[0.82] tracking-tight">
              <span className="block text-6xl text-cream drop-shadow-[0_6px_40px_rgba(255,140,0,0.45)] sm:text-8xl">Bombay</span>
            </h1>
            <div className="mt-2 flex items-center justify-center gap-3 font-accent text-tandoori">
              <span className="h-px w-8 bg-tandoori/50" />
              <span className="text-2xl tracking-[0.32em]">FRY &amp; GRILL</span>
              <span className="h-px w-8 bg-tandoori/50" />
            </div>
            <div className="mt-1.5 font-accent text-xs tracking-[0.42em] text-cream/55">INDIAN FRIED CHICKEN</div>
          </motion.div>

          {/* HALAL — cavallo di battaglia */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 120, damping: 14 }}
            className="mt-5 inline-flex items-center gap-3 rounded-2xl border-2 border-mehndi/60 bg-mehndi/15 px-5 py-2.5 backdrop-blur-sm"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-mehndi text-cream ring-2 ring-cream/25">
              <HalalBadge className="h-6 w-6" />
            </span>
            <span className="text-left leading-tight">
              <span className="block font-display text-xl tracking-wide text-cream sm:text-2xl">100% HALAL</span>
              <span className="block font-accent text-[10px] tracking-[0.26em] text-cream/75 sm:text-[11px]">حلال · CARNE CERTIFICATA · FILIERA CONTROLLATA</span>
            </span>
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            className="mt-5 max-w-md text-base font-medium leading-relaxed text-cream/75"
          >
            Il pollo fritto <span className="font-bold text-gradient-gold">più speziato della città</span>:
            marinato 24 ore in 11 spezie tostate, fritto e grigliato al momento.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: easeOut }}
            className="mt-6 flex flex-wrap items-center justify-center gap-3"
          >
            <a href="#menu" className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gold-flare px-8 py-4 font-accent text-lg tracking-wider text-ink shadow-glow transition-transform duration-200 hover:scale-[1.03] active:scale-95">
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Ordina ora
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a href="#menu" className="inline-flex items-center gap-2 rounded-full border-2 border-cream/30 px-7 py-4 font-accent text-lg tracking-wider text-cream backdrop-blur-sm transition-colors duration-200 hover:border-cream hover:bg-cream hover:text-ink">
              Scopri il menu
            </a>
          </motion.div>

          {/* statistiche — riempiono e raccontano */}
          <motion.div
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.72 }}
            className="mt-7 grid w-full max-w-md grid-cols-2 gap-x-4 gap-y-4 border-t border-cream/12 pt-5 sm:grid-cols-4 sm:gap-3"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-tandoori">{s.value}</div>
                <div className="mt-1 text-[10px] font-semibold uppercase leading-tight tracking-wide text-cream/55">{s.label}</div>
              </div>
            ))}
          </motion.div>

          {/* cibo su mobile (la griglia che riempie quando le colonne sono nascoste) */}
          <div className="mt-8 grid w-full grid-cols-3 gap-3 lg:hidden">
            {MOBILE_FOOD.map((f, i) => <FoodCard key={f.src} {...f} delay={0.5 + i * 0.1} compact />)}
          </div>
        </motion.div>

        {/* ── colonna cibo DESTRA ── */}
        <div className="hidden flex-col gap-4 lg:flex">
          {RIGHT_FOOD.map((f, i) => <FoodCard key={f.src} {...f} delay={0.5 + i * 0.12} />)}
        </div>
      </div>

    </section>
  );
}

/* Patatine VERE ritagliate dalla foto (hero-1.png), su trasparente. Levitano
   in lontananza a varie prospettive — al posto delle braci-"pallini".
   Deterministiche (no Math.random → no mismatch SSR). */
const FRY_SRC = ["/food/fry-a.png", "/food/fry-b.png"];
const FRY_PARTICLES = Array.from({ length: 9 }, (_, i) => ({
  src: FRY_SRC[i % 2],
  left: (i * 73 + 6) % 100,
  len: 16 + (i % 4) * 7, // 16..37 px (piccole/sottili → la morbidezza non si nota)
  rot: (i * 67) % 360, // patatine vere → ruotano naturali a ogni angolo
  spin: (i % 2 ? 1 : -1) * (24 + (i % 3) * 18),
  dur: 9 + (i % 5),
  delay: (i % 7) * 0.9,
  drift: (i % 2 ? 1 : -1) * (8 + (i % 4) * 7),
  rise: 200 + (i % 5) * 70,
}));

function FloatingFries() {
  const reduce = useReducedMotion();
  if (reduce) return null;
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {FRY_PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0"
          style={{ left: `${p.left}%` }}
          initial={{ y: 30, opacity: 0, rotate: p.rot }}
          animate={{ y: -p.rise, x: [0, p.drift, 0], rotate: p.rot + p.spin, opacity: [0, 0.55, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={p.src} alt="" style={{ height: p.len }} className="w-auto" />
        </motion.div>
      ))}
    </div>
  );
}

/* Card cibo INTERATTIVA: tilt 3D che segue dito/mouse + glare dorato (mobile-friendly). */
function FoodCard({ src, alt, delay = 0, compact = false }: { src: string; alt: string; delay?: number; compact?: boolean }) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [9, -9]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 150, damping: 15 });
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);
  const glare = useMotionTemplate`radial-gradient(150px circle at ${gx} ${gy}, rgba(255,201,90,0.5), transparent 60%)`;

  function onMove(e: React.PointerEvent) {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  }
  function onLeave() {
    px.set(0.5);
    py.set(0.5);
  }

  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: easeOut }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 700 }}
      className="group relative overflow-hidden rounded-3xl border border-cream/10 shadow-card [touch-action:pan-y] [transform-style:preserve-3d]"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full object-cover transition-transform duration-700 group-hover:scale-[1.06] ${compact ? "h-28" : "h-48 xl:h-56"}`}
      />
      {/* glare oro che segue il puntatore/dito */}
      {!reduce && (
        <motion.span aria-hidden className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
      )}
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink-900/90 to-transparent p-3 text-left">
        <span className="font-accent text-sm tracking-wide text-cream">{alt}</span>
      </figcaption>
    </motion.figure>
  );
}

/* ── medaglione: il gallo del logo, acceso, con anello di brand che gira ── */
function Crest({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative aspect-square w-full">
      <motion.div
        className="absolute inset-[-12%] rounded-full bg-saffron/30 blur-[34px]"
        animate={reduce ? undefined : { opacity: [0.55, 1, 0.55], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute inset-0 rounded-full bg-gold-flare p-[3px] shadow-glow">
        <div className="h-full w-full rounded-full bg-gradient-to-b from-ink-700 to-ink-900 ring-1 ring-black/40 shadow-[inset_0_2px_50px_rgba(0,0,0,0.7)]" />
      </div>
      <motion.div className="absolute inset-0" animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}>
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs><path id="hero-ring" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
          <text className="fill-tandoori font-accent uppercase" style={{ fontSize: 10.5, letterSpacing: 4 }}>
            <textPath href="#hero-ring" startOffset="0">✦ BOMBAY FRY &amp; GRILL ✦ INDIAN FRIED CHICKEN ✦ 100% HALAL ✦ COTTO FRESCO ✦</textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-[20%] overflow-hidden rounded-full bg-ink-900 ring-1 ring-tandoori/30 shadow-[inset_0_0_24px_rgba(0,0,0,0.7)]">
        <Image src="/logo-mark.png" alt="Bombay Fry & Grill — il gallo" width={495} height={342} priority className="h-full w-full object-cover" />
      </div>
    </div>
  );
}
