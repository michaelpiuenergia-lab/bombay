"use client";

import { createContext, useContext, useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const Ctx = createContext<MotionValue<number> | null>(null);
function useP() {
  const p = useContext(Ctx);
  if (!p) throw new Error("FoodGallery context");
  return p;
}

const IMAGES = [
  { src: "/food/u5.jpg", alt: "Bombay Bucket di pollo fritto" },
  { src: "/food/u8.jpg", alt: "Kebab alla brace" },
  { src: "/food/u2.jpg", alt: "Burger croccante" },
  { src: "/food/u11.jpg", alt: "Masala Wings" },
  { src: "/food/u10.jpg", alt: "Masala Chips" },
];

export default function FoodGallery() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref });

  return (
    <Ctx.Provider value={scrollYProgress}>
      <section ref={ref} aria-label="Galleria del cibo" className="relative h-[280vh] w-full">
        <Scene />
      </section>
    </Ctx.Provider>
  );
}

function Cell({ className, src, alt }: { className: string; src: string; alt: string }) {
  const p = useP();
  const translate = useTransform(p, [0.1, 0.9], ["-30%", "0%"]);
  const scale = useTransform(p, [0, 0.9], [0.55, 1]);
  return (
    <motion.div
      style={{ translate, scale }}
      className={`relative overflow-hidden rounded-3xl border border-cream/15 shadow-card ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="h-full w-full object-cover" />
      <span className="absolute bottom-3 left-3 rounded-full bg-mehndi px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cream shadow-lg">
        ✓ Halal
      </span>
    </motion.div>
  );
}

function Scene() {
  const p = useP();
  const tOpacity = useTransform(p, [0, 0.4], [1, 0]);
  const tScale = useTransform(p, [0, 0.4], [1, 0.7]);

  return (
    <div className="sticky left-0 top-0 h-screen w-full overflow-hidden p-3 sm:p-5">
      <div
        className="grid h-full w-full grid-cols-8 grid-rows-[1fr_0.5fr_0.5fr_1fr] gap-3
        [&>*:nth-child(1)]:col-span-8 md:[&>*:nth-child(1)]:col-span-5 [&>*:nth-child(1)]:row-span-2 md:[&>*:nth-child(1)]:row-span-4 [&>*:nth-child(1)]:origin-top-right
        [&>*:nth-child(2)]:col-span-4 md:[&>*:nth-child(2)]:col-span-3 md:[&>*:nth-child(2)]:row-span-2 [&>*:nth-child(2)]:origin-top-left
        [&>*:nth-child(3)]:col-span-4 md:[&>*:nth-child(3)]:col-span-3 md:[&>*:nth-child(3)]:row-span-2 [&>*:nth-child(3)]:origin-bottom-left
        [&>*:nth-child(4)]:col-span-4 md:[&>*:nth-child(4)]:hidden
        [&>*:nth-child(5)]:col-span-4 md:[&>*:nth-child(5)]:hidden"
      >
        {IMAGES.map((im) => (
          <Cell key={im.src} src={im.src} alt={im.alt} className="" />
        ))}
      </div>

      <motion.div
        style={{ opacity: tOpacity, scale: tScale }}
        className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center text-center"
      >
        <span className="font-accent text-sm tracking-[0.35em] text-tandoori drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          हाँ, अब भूख लगी? · HAI GIÀ FAME?
        </span>
        <h2 className="mt-2 font-display text-6xl uppercase leading-[0.85] text-cream drop-shadow-[0_6px_24px_rgba(0,0,0,0.85)] sm:text-8xl">
          Guarda
          <br />
          <span className="text-gradient-ember">che roba</span>
        </h2>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink/60 px-4 py-1.5 font-accent text-sm tracking-widest text-cream backdrop-blur">
          ↓ scrolla per scoprire
        </span>
      </motion.div>
    </div>
  );
}
