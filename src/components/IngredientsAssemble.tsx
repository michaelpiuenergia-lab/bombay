"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { Chili, Leaf, Flame } from "./Icons";
import Embers from "./Embers";

/* Gli ingredienti partono sparpagliati nello spazio (con profondità 3D) e,
   scrollando, volano e si COMPONGONO in un anello attorno al piatto centrale.
   Ispirato all'estetica "all the ingredients are moving" (Kling). */

type Ing = {
  node: "img" | "chili" | "leaf" | "flame";
  src?: string;
  alt?: string;
  size: number; // px
  sx: number; // start x (px, da fuori schermo)
  sy: number; // start y
  sz: number; // start translateZ (profondità)
  srz: number; // start rotateZ
  sry: number; // start rotateY (tumble 3D)
  ring: number; // raggio finale nell'anello
};

const ING: Ing[] = [
  { node: "img", src: "/food/u1.jpg", alt: "Cosce di pollo", size: 128, sx: -560, sy: -260, sz: 460, srz: -42, sry: 40, ring: 212 },
  { node: "img", src: "/food/u11.jpg", alt: "Masala Wings", size: 116, sx: 580, sy: -210, sz: -380, srz: 38, sry: -38, ring: 202 },
  { node: "img", src: "/food/u10.jpg", alt: "Masala Fries", size: 120, sx: 620, sy: 200, sz: 320, srz: 30, sry: 34, ring: 216 },
  { node: "img", src: "/food/u8.jpg", alt: "Seekh Kebab", size: 116, sx: -600, sy: 240, sz: -320, srz: -28, sry: -30, ring: 206 },
  { node: "img", src: "/food/u12.jpg", alt: "Saffron Strips", size: 108, sx: -320, sy: 400, sz: 240, srz: 22, sry: 24, ring: 222 },
  { node: "chili", size: 66, sx: 360, sy: 420, sz: 520, srz: 70, sry: 50, ring: 236 },
  { node: "leaf", size: 66, sx: -460, sy: -400, sz: -220, srz: -60, sry: -44, ring: 246 },
  { node: "flame", size: 62, sx: 470, sy: -420, sz: 280, srz: 50, sry: 40, ring: 240 },
];

const SEG: [number, number] = [0, 0.62]; // l'assemblaggio si completa al 62% e poi resta fermo

export default function IngredientsAssemble() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const dishScale = useTransform(scrollYProgress, SEG, [0.8, 1]);
  const haloOpacity = useTransform(scrollYProgress, SEG, [0.35, 1]);
  const headY = useTransform(scrollYProgress, [0, 0.6], [0, -40]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  return (
    <section ref={ref} aria-label="Gli ingredienti si compongono" className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* fondale caldo */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <motion.div
            style={{ opacity: haloOpacity }}
            className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-saffron/25 blur-[120px]"
          />
          <div className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indian/25 blur-[100px]" />
        </div>

        {/* titolo */}
        <motion.div style={{ y: headY }} className="absolute inset-x-0 top-[9%] z-20 px-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-tandoori/30 bg-tandoori/10 px-4 py-1.5 font-accent text-sm tracking-[0.25em] text-tandoori">
            <span className="h-1.5 w-1.5 rounded-full bg-saffron" />
            11 SPEZIE · 1 MORSO
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] text-cream sm:text-6xl">
            Tutto si compone <span className="text-gradient-gold">sotto i tuoi occhi</span>
          </h2>
        </motion.div>

        {/* palco 3D: un punto al centro schermo con prospettiva */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2"
          style={{ perspective: 1100 }}
        >
          {/* piatto centrale */}
          <motion.div
            style={{ scale: reduce ? 1 : dishScale, marginLeft: -104, marginTop: -104 }}
            className="absolute left-0 top-0 h-52 w-52"
          >
            <div className="absolute -inset-6 rounded-full bg-ember/30 blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-tandoori/60 shadow-glow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/food/u5.jpg" alt="Bombay Bucket" className="h-full w-full object-cover" />
            </div>
          </motion.div>

          {/* ingredienti che volano e si compongono */}
          {ING.map((ing, i) => (
            <Token key={i} ing={ing} i={i} n={ING.length} p={scrollYProgress} reduce={!!reduce} />
          ))}
        </div>

        {/* hint scroll */}
        <motion.div
          style={{ opacity: hintOpacity }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center text-cream/60"
        >
          <span className="font-accent text-xs tracking-[0.3em]">SCORRI PER COMPORRE</span>
        </motion.div>

        <Embers />
      </div>
    </section>
  );
}

function Token({
  ing,
  i,
  n,
  p,
  reduce,
}: {
  ing: Ing;
  i: number;
  n: number;
  p: MotionValue<number>;
  reduce: boolean;
}) {
  const angle = ((-90 + (360 / n) * i) * Math.PI) / 180;
  const ex = Math.cos(angle) * ing.ring;
  const ey = Math.sin(angle) * ing.ring;

  const x = useTransform(p, SEG, [ing.sx, ex]);
  const y = useTransform(p, SEG, [ing.sy, ey]);
  const z = useTransform(p, SEG, [ing.sz, 0]);
  const rotateZ = useTransform(p, SEG, [ing.srz, 0]);
  const rotateY = useTransform(p, SEG, [ing.sry, 0]);
  const opacity = useTransform(p, [0, 0.12, 0.55, 1], [0, 1, 1, 1]);

  const base = {
    position: "absolute" as const,
    left: 0,
    top: 0,
    width: ing.size,
    height: ing.size,
    marginLeft: -ing.size / 2,
    marginTop: -ing.size / 2,
  };
  const style = reduce
    ? { ...base, transform: `translate(${ex}px, ${ey}px)` }
    : { ...base, x, y, z, rotateZ, rotateY, opacity };

  return (
    <motion.div style={style} className="will-change-transform">
      <Content ing={ing} />
    </motion.div>
  );
}

function Content({ ing }: { ing: Ing }) {
  if (ing.node === "img") {
    return (
      <div className="h-full w-full overflow-hidden rounded-2xl border-2 border-tandoori/50 shadow-[0_22px_55px_-14px_rgba(255,140,0,0.55)] ring-1 ring-black/30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={ing.src} alt={ing.alt ?? ""} className="h-full w-full object-cover" />
      </div>
    );
  }
  const map = {
    chili: { Icon: Chili, color: "text-saffron", ring: "ring-saffron/40" },
    leaf: { Icon: Leaf, color: "text-mehndi", ring: "ring-mehndi/40" },
    flame: { Icon: Flame, color: "text-tandoori", ring: "ring-tandoori/40" },
  } as const;
  const { Icon, color, ring } = map[ing.node];
  return (
    <span className={`grid h-full w-full place-items-center rounded-full bg-ink-800/85 shadow-glow ring-1 ${ring}`}>
      <Icon className={`h-1/2 w-1/2 ${color}`} />
    </span>
  );
}
