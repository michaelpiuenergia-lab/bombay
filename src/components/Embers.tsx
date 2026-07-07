"use client";

import { motion, useReducedMotion } from "framer-motion";

/* Da "braci nel buio" a CORIANDOLI CALDI: piccole schegge di festa
   (rosso, zafferano, verde mehndi, bianco) che salgono su sfondi
   chiari/oro. Niente bagliori notturni: solo colore pieno. */
const COLORS = ["#B71C1C", "#FF8C00", "#2E7D32", "#FFFFFF"];

// Deterministic particles (no Math.random — evita mismatch SSR/idratazione)
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 53) % 100,
  size: 3 + (i % 3) * 2,
  dur: 6 + (i % 6),
  delay: (i % 9) * 0.6,
  drift: (i % 2 ? 1 : -1) * (8 + (i % 5) * 6),
  color: COLORS[i % COLORS.length],
  rise: 240 + (i % 5) * 70,
  spin: (i % 2 ? 1 : -1) * (140 + (i % 4) * 60),
}));

export default function Embers() {
  const reduce = useReducedMotion();
  if (reduce) return null; // rispetta prefers-reduced-motion

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {PARTICLES.map((p, i) => (
        <motion.span
          key={i}
          className="absolute bottom-10 rounded-[2px]"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size * 1.8,
            background: p.color,
          }}
          initial={{ y: 0, opacity: 0, rotate: 0 }}
          animate={{ y: -p.rise, x: [0, p.drift, 0], rotate: p.spin, opacity: [0, 0.8, 0] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}
