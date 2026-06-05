"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Paisley, HalalBadge } from "./Icons";
import Embers from "./Embers";
import { stats } from "@/lib/data";

const easeOut = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  const logoRotX = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const logoRotY = useTransform(sx, [-0.5, 0.5], [-10, 10]);
  const driftX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const driftY = useTransform(sy, [-0.5, 0.5], [-26, 26]);
  const driftX2 = useTransform(sx, [-0.5, 0.5], [22, -22]);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yText = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yLogo = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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
      className="grain relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-24"
    >
      {/* Bagliori caldi + luce cinematografica */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[6%] h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-saffron/30 blur-[120px]" />
        <div className="absolute right-[4%] top-1/4 h-[460px] w-[460px] rounded-full bg-indian/40 blur-[120px]" />
        <div className="absolute bottom-0 left-[12%] h-[400px] w-[500px] rounded-full bg-tandoori/22 blur-[130px]" />
        {/* vignettatura cinematografica: dà profondità e toglie il marrone "piatto" */}
        <div
          className="absolute inset-0"
          style={{ background: "radial-gradient(120% 95% at 50% 32%, transparent 42%, rgba(8,2,2,0.6) 100%)" }}
        />
      </div>

      {/* Base di fiamme / brace della griglia */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56">
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-indian/50 via-saffron/15 to-transparent" />
        <motion.div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ember/40 to-transparent mix-blend-screen"
          animate={reduce ? undefined : { opacity: [0.5, 0.85, 0.55, 0.9, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Scintille che salgono dalla brace */}
      <Embers />

      {/* Foto di cibo vero fluttuanti — protagoniste, non più chip minuscole */}
      <FloatingToken className="left-[1%] top-[14%]" delay={0} drift={driftX} drift2={driftY}>
        <FoodChip src="/food/u1.jpg" alt="Bhut Jolokia Drumsticks" rot="-7deg" size="lg" />
      </FloatingToken>
      <FloatingToken className="left-[6%] bottom-[14%]" delay={0.5} drift={driftX2} drift2={driftY}>
        <FoodChip src="/food/u11.jpg" alt="Masala Wings" rot="5deg" size="sm" />
      </FloatingToken>
      <FloatingToken className="right-[4%] top-[10%]" delay={0.9} drift={driftX2} drift2={driftY}>
        <FoodChip src="/food/u5.jpg" alt="Bombay Bucket" rot="6deg" size="md" />
      </FloatingToken>
      <FloatingToken className="right-[13%] bottom-[11%]" delay={1.4} drift={driftX} drift2={driftY}>
        <FoodChip src="/food/u8.jpg" alt="Kebab alla brace" rot="-5deg" size="md" />
      </FloatingToken>

      <div className="container-bombay grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        {/* Sinistra — copy */}
        <motion.div style={{ y: yText, opacity: fade }}>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut }}
            className="shimmer-border inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-tandoori"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mehndi opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-mehndi" />
            </span>
            100% Halal · Cotto fresco ogni giorno
          </motion.span>

          <h1 className="mt-6 font-display uppercase leading-[0.85] tracking-tight">
            <Line delay={0.05} className="block text-5xl text-cream/90 sm:text-6xl">
              Il pollo fritto
            </Line>
            <Line delay={0.15} className="block text-6xl sm:text-8xl">
              <span className="text-gradient-ember drop-shadow-[0_6px_34px_rgba(255,90,20,0.45)]">più speziato</span>
            </Line>
            <Line delay={0.25} className="block text-5xl text-cream/90 sm:text-6xl">
              della città
            </Line>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: easeOut }}
            className="mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg"
          >
            Marinato 24 ore in 11 spezie tostate dell&apos;India, fritto e grigliato al
            momento. <span className="text-cream">Bombay Fry &amp; Grill</span> — croccante
            fuori, succoso dentro.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#menu"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-ember px-8 py-4 font-accent text-lg tracking-wider text-cream shadow-glow-red transition-transform duration-200 hover:scale-[1.03] active:scale-95"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              Ordina ora
              <svg className="h-5 w-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
            <a
              href="#menu"
              className="inline-flex items-center gap-2 rounded-full border border-cream/20 px-7 py-4 font-accent text-lg tracking-wider text-cream/90 transition-colors duration-200 hover:border-tandoori hover:text-tandoori"
            >
              Scopri il menu
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-12 grid max-w-lg grid-cols-4 gap-4 border-t border-cream/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-3xl text-gradient-gold sm:text-4xl">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase leading-tight tracking-wide text-cream/60">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Destra — LOGO COMPLETO grande */}
        <motion.div
          style={{ y: yLogo }}
          className="relative mx-auto hidden w-full max-w-[560px] lg:block"
        >
          {/* alone di fuoco dietro al logo */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            <motion.div
              className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/30 blur-[100px]"
              animate={reduce ? undefined : { scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indian/25 blur-[90px]" />
          </div>

          {/* Piatto luminoso (charger plate) dietro l'emblema */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 -z-0 aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2">
            {/* disco scuro con bordo oro */}
            <div className="absolute inset-[6%] rounded-full bg-gradient-to-b from-ink-800/70 to-ink-900/85 ring-1 ring-tandoori/25 shadow-[inset_0_2px_40px_rgba(0,0,0,0.6)]" />
            {/* anello oro a tratteggio rotante */}
            <div
              className="ring-dots absolute inset-0 rounded-full text-tandoori opacity-70 animate-spin-slow"
              style={{
                WebkitMaskImage:
                  "radial-gradient(closest-side, transparent 70%, #000 72%, #000 80%, transparent 83%)",
                maskImage:
                  "radial-gradient(closest-side, transparent 70%, #000 72%, #000 80%, transparent 83%)",
              }}
            />
            {/* anello sottile interno */}
            <div className="absolute inset-[12%] rounded-full border border-tandoori/15" />
          </div>

          <Paisley className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 text-tandoori/10 animate-spin-slow" />

          <motion.div
            style={reduce ? undefined : { rotateX: logoRotX, rotateY: logoRotY }}
            className="perspective"
          >
            <motion.div
              animate={reduce ? undefined : { y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative mx-auto w-[84%]"
            >
              {/* Cornice oro brass: trasforma il PNG in un'insegna premium */}
              <div className="rounded-[2.3rem] bg-gold-flare p-[2px] shadow-[0_34px_90px_-22px_rgba(255,140,0,0.5)]">
                {/* riflesso specular in alto */}
                <span className="pointer-events-none absolute inset-x-6 top-0 h-1/3 rounded-t-[2.3rem] bg-gradient-to-b from-white/15 to-transparent" />
                <div className="rounded-[2.15rem] bg-[#1d0707] p-2.5 ring-1 ring-black/40">
                  <Image
                    src="/logo-lockup.png"
                    alt="Bombay Fry & Grill — Indian Fried Chicken — Halal"
                    width={710}
                    height={662}
                    priority
                    className="w-full rounded-[1.8rem]"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* cartellino prezzo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 200, damping: 12 }}
            className="absolute bottom-4 -left-2 z-10 rounded-2xl bg-ember px-5 py-3 shadow-glow-red"
          >
            <div className="font-accent text-xs tracking-widest text-cream/80">DA</div>
            <div className="font-display text-3xl leading-none text-cream">€6,90</div>
          </motion.div>

          {/* Sigillo Halal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: 16 }}
            animate={{ opacity: 1, scale: 1, rotate: 12 }}
            transition={{ delay: 1, type: "spring", stiffness: 200, damping: 12 }}
            className="absolute -top-1 right-1 z-10 grid h-20 w-20 place-items-center rounded-full bg-mehndi text-cream shadow-xl ring-2 ring-cream/30"
          >
            <div className="text-center leading-none">
              <HalalBadge className="mx-auto h-7 w-7" />
              <span className="mt-1 block font-accent text-[10px] tracking-[0.2em]">HALAL</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cream/50 sm:flex"
      >
        <span className="font-accent text-xs tracking-[0.3em]">SCORRI</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/25 p-1">
          <motion.span
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
            className="h-1.5 w-1.5 rounded-full bg-saffron"
          />
        </span>
      </motion.div>
    </section>
  );
}

function Line({ children, delay, className }: { children: React.ReactNode; delay: number; className?: string }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay, ease: easeOut }}
        className={className}
      >
        {children}
      </motion.span>
    </span>
  );
}

function FloatingToken({
  children,
  className,
  delay,
  drift,
  drift2,
}: {
  children: React.ReactNode;
  className?: string;
  delay: number;
  drift: MotionValue<number>;
  drift2: MotionValue<number>;
}) {
  return (
    <motion.div style={{ x: drift, y: drift2 }} className={`pointer-events-none absolute -z-0 ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 + delay, type: "spring", stiffness: 160, damping: 12 }}
        className="animate-float"
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

function FoodChip({
  src,
  alt,
  rot,
  size = "md",
}: {
  src: string;
  alt: string;
  rot: string;
  size?: "sm" | "md" | "lg";
}) {
  const dim =
    size === "lg"
      ? "h-32 w-32 sm:h-44 sm:w-44"
      : size === "sm"
        ? "h-24 w-24 sm:h-28 sm:w-28"
        : "h-28 w-28 sm:h-36 sm:w-36";
  return (
    <div
      style={{ transform: `rotate(${rot})` }}
      className={`${dim} overflow-hidden rounded-3xl border-2 border-tandoori/50 shadow-[0_28px_70px_-18px_rgba(255,140,0,0.5)] ring-1 ring-black/30`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
    </div>
  );
}
