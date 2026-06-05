"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Strato atmosferico globale: dà profondità e immersione a tutto il sito.
   Blob di colore che derivano lentamente + vignettatura + grana. */
export default function Atmosphere() {
  const reduce = useReducedMotion();

  const drift = (a: number[], b: number[], dur: number) =>
    reduce ? undefined : { x: a, y: b, transition: { duration: dur, repeat: Infinity, ease: "easeInOut" as const } };

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base brace/carbone: più profonda e meno marrone, vira al nero-maroon */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#240A08] via-[#160606] to-[#0F0404]" />

      <motion.div
        className="absolute -left-40 -top-20 h-[44rem] w-[44rem] rounded-full bg-indian/30 blur-[150px]"
        animate={drift([0, 90, 0], [0, 50, 0], 26)}
      />
      <motion.div
        className="absolute right-[-10rem] top-[12%] h-[42rem] w-[42rem] rounded-full bg-saffron/28 blur-[150px]"
        animate={drift([0, -70, 0], [0, 70, 0], 32)}
      />
      <motion.div
        className="absolute bottom-[-8rem] left-1/4 h-[40rem] w-[40rem] rounded-full bg-tandoori/22 blur-[160px]"
        animate={drift([0, 60, 0], [0, -50, 0], 30)}
      />
      {/* Accento freddo (verde mehndi, già brand): spezza il marrone uniforme */}
      <motion.div
        className="absolute right-[14%] bottom-[28%] h-[34rem] w-[34rem] rounded-full bg-mehndi/12 blur-[170px]"
        animate={drift([0, -50, 0], [0, -40, 0], 34)}
      />
      <motion.div
        className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-saffron/16 blur-[170px]"
        animate={drift([0, 40, 0], [0, 30, 0], 24)}
      />

      {/* vignettatura leggera */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(130% 110% at 50% 0%, transparent 55%, rgba(0,0,0,0.4) 100%)",
        }}
      />
      {/* grana */}
      <div className="grain absolute inset-0" />
    </div>
  );
}
