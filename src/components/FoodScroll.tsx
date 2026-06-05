"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* Showcase con CIBO VERO (foto), guidato dallo scroll (Framer Motion):
   - il piatto centrale cresce mentre scrolli
   - le PATATINE GIRANO
   - foto di contorno fluttuano per immersione
   UX: rispetta prefers-reduced-motion. */

const orbit = [
  { src: "/food/u2.jpg", cls: "left-[2%] top-[12%] h-28 w-28 sm:h-36 sm:w-36", rot: -8 },
  { src: "/food/u4.jpg", cls: "right-[3%] top-[8%] h-24 w-24 sm:h-32 sm:w-32", rot: 7 },
  { src: "/food/u11.jpg", cls: "left-[6%] bottom-[12%] h-24 w-24 sm:h-32 sm:w-32", rot: 6 },
  { src: "/food/u8.jpg", cls: "right-[5%] bottom-[10%] h-28 w-28 sm:h-36 sm:w-36", rot: -6 },
];

export default function FoodScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.72, 1.06, 0.92]);
  const rise = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const friesRot = useTransform(scrollYProgress, [0, 1], [0, 540]);

  return (
    <section
      ref={ref}
      aria-label="Il nostro cibo"
      className={reduce ? "relative" : "relative h-[170vh]"}
    >
      <div className="sticky top-0 flex min-h-screen items-center overflow-hidden py-16">
        {/* backdrop griglia calda */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-indian/30 blur-[140px]" />
          <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-indian/45 via-saffron/15 to-transparent" />
        </div>

        <div className="container-bombay relative">
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-tandoori/30 bg-tandoori/10 px-4 py-1.5 font-accent text-sm tracking-[0.25em] text-tandoori">
              <span className="h-1.5 w-1.5 animate-flicker rounded-full bg-saffron" />
              FRY &amp; GRILL · LIVE
            </span>
            <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] text-cream sm:text-6xl">
              Scrolla e <span className="text-gradient-ember">fai il pieno</span>
            </h2>
          </div>

          <div className="relative mx-auto h-[420px] max-w-4xl sm:h-[520px]">
            {/* foto di contorno fluttuanti */}
            {orbit.map((o, i) => (
              <motion.div
                key={o.src}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                animate={reduce ? undefined : { y: [0, i % 2 ? 14 : -14, 0] }}
                style={{ rotate: o.rot }}
                className={`absolute overflow-hidden rounded-3xl border border-cream/15 shadow-card ${o.cls}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={o.src} alt="Specialità Bombay" loading="lazy" className="h-full w-full object-cover" />
              </motion.div>
            ))}

            {/* piatto centrale che cresce */}
            <motion.div
              style={reduce ? undefined : { scale, y: rise }}
              className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative h-64 w-64 sm:h-80 sm:w-80">
                <div className="absolute -inset-6 rounded-full bg-saffron/30 blur-3xl" />
                <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-tandoori/40 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/food/u5.jpg" alt="Bombay Bucket di pollo fritto" className="h-full w-full object-cover" />
                </div>
                <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ember px-5 py-2 font-accent text-base tracking-widest text-cream shadow-glow-red">
                  BOMBAY BUCKET
                </span>
              </div>
            </motion.div>

            {/* PATATINE CHE GIRANO */}
            <motion.div
              style={reduce ? undefined : { rotate: friesRot }}
              animate={reduce ? undefined : { rotate: 360 }}
              transition={reduce ? undefined : { duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[6%] left-1/2 z-20 h-28 w-28 -translate-x-1/2 sm:h-36 sm:w-36"
            >
              <div className="h-full w-full overflow-hidden rounded-full border-4 border-saffron/60 shadow-glow">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/food/u10.jpg" alt="Masala Chips" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>

          <p className="mx-auto mt-10 max-w-md text-center text-cream/70">
            Cibo vero, cotto fresco e <span className="text-tandoori">100% Halal</span>. Niente trucchi.
          </p>
        </div>
      </div>
    </section>
  );
}
