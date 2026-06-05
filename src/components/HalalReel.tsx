"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { HalalBadge } from "./Icons";
import Embers from "./Embers";

/* Reel di cibo che scorre ai lati con un sigillo Halal che gira al centro (sticky).
   Effetto "sticky scroll gallery" in CSS puro — niente lenis, così non altera
   lo scroll globale né le animazioni scroll-driven già presenti. */

const LEFT = [
  { src: "/food/u4.jpg", alt: "Tandoori Crunch Burger" },
  { src: "/food/u10.jpg", alt: "Loaded Masala Fries" },
  { src: "/food/u1.jpg", alt: "Bhut Jolokia Drumsticks" },
  { src: "/food/u8.jpg", alt: "Seekh Kebab" },
  { src: "/food/u12.jpg", alt: "Saffron Strips" },
];

const RIGHT = [
  { src: "/food/u5.jpg", alt: "Bombay Bucket" },
  { src: "/food/u3.jpg", alt: "Mumbai Zinger" },
  { src: "/food/u11.jpg", alt: "Masala Wings" },
  { src: "/food/v2.jpg", alt: "Tandoori Chicken Grill" },
  { src: "/food/u9.jpg", alt: "Paneer Tikka Sandwich" },
];

function Pic({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="group overflow-hidden rounded-3xl border border-cream/10 shadow-card">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-80"
      />
    </figure>
  );
}

export default function HalalReel() {
  return (
    <section
      aria-label="Tutto fritto al momento, tutto Halal"
      className="relative py-16 sm:py-20"
    >
      {/* glow caldo di fondo */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-1/3 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-indian/20 blur-[150px]" />
        <div className="absolute left-1/2 bottom-0 h-[28rem] w-[40rem] -translate-x-1/2 rounded-full bg-saffron/12 blur-[150px]" />
      </div>

      {/* kicker */}
      <div className="container-bombay mb-10 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-tandoori/30 bg-tandoori/10 px-4 py-1.5 font-accent text-sm tracking-[0.25em] text-tandoori">
          <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
          FRITTO AL MOMENTO · 100% HALAL
        </span>
        <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-cream sm:text-5xl">
          Panini, fritto e patatine.{" "}
          <span className="text-gradient-gold">Scorri la fame.</span>
        </h2>
      </div>

      <div className="container-bombay">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* colonna sinistra — scorre */}
          <div className="hidden gap-4 md:col-span-4 md:grid">
            {LEFT.map((p) => (
              <Pic key={p.src} {...p} />
            ))}
          </div>

          {/* centro — sigillo Halal che gira (sticky su desktop) */}
          <div className="md:col-span-4">
            <div className="flex items-center justify-center py-8 md:sticky md:top-0 md:h-screen md:py-0">
              <HalalSeal />
            </div>
          </div>

          {/* colonna destra — scorre */}
          <div className="hidden gap-4 md:col-span-4 md:grid">
            {RIGHT.map((p) => (
              <Pic key={p.src} {...p} />
            ))}
          </div>

          {/* mobile: griglia semplice (niente sticky) */}
          <div className="grid grid-cols-2 gap-3 md:hidden">
            {[LEFT[0], RIGHT[0], LEFT[1], RIGHT[2]].map((p) => (
              <Pic key={p.src} {...p} />
            ))}
          </div>
        </div>
      </div>

      <Embers />
    </section>
  );
}

function HalalSeal() {
  const reduce = useReducedMotion();
  return (
    <div className="relative grid aspect-square w-[17rem] place-items-center sm:w-[22rem]">
      {/* alone pulsante */}
      <motion.div
        className="absolute inset-2 rounded-full bg-saffron/25 blur-[70px]"
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* disco scuro con bordo oro */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-ink-800/85 to-ink-900/95 ring-1 ring-tandoori/30 shadow-[inset_0_2px_60px_rgba(0,0,0,0.7)]" />

      {/* anello di testo HALAL che gira */}
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id="halal-ring"
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <text
            className="fill-tandoori font-accent uppercase"
            style={{ fontSize: 11, letterSpacing: 4 }}
          >
            <textPath href="#halal-ring" startOffset="0">
              ✦ 100% Halal ✦ Bombay Fry &amp; Grill ✦ Indian Fried Chicken ✦ Cotto Fresco ✦
            </textPath>
          </text>
        </svg>
      </motion.div>

      {/* logo (badge circolare) che gira lentamente */}
      <motion.div
        className="absolute inset-[20%] overflow-hidden rounded-full ring-1 ring-tandoori/25 shadow-[0_10px_40px_-10px_rgba(255,140,0,0.5)]"
        animate={reduce ? undefined : { rotate: -360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <Image
          src="/logo-badge.png"
          alt="Sigillo Bombay Fry & Grill"
          width={204}
          height={208}
          className="h-full w-full scale-[1.08] object-cover"
        />
      </motion.div>

      {/* chip HALAL fisso in basso */}
      <div className="absolute -bottom-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-2 rounded-full bg-mehndi px-4 py-1.5 text-cream shadow-xl ring-2 ring-cream/20">
        <HalalBadge className="h-4 w-4" />
        <span className="font-accent text-sm tracking-[0.2em]">HALAL</span>
      </div>
    </div>
  );
}
