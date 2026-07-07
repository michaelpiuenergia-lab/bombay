"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeOut = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

export function Reveal({
  children,
  delay = 0,
  y = 36,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: easeOut, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  kicker,
  title,
  highlight,
  desc,
  center = true,
  tone = "light",
}: {
  kicker: string;
  title: string;
  highlight?: string;
  desc?: string;
  center?: boolean;
  tone?: "light" | "dark";
}) {
  // Il sito ora è tutto su fondi chiari: il titolo è SEMPRE ink.
  // I due tone cambiano solo l'accento del kicker: "dark" = rosso, "light" = oro pieno.
  const dark = tone === "dark";
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Reveal>
        <span
          className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-accent text-sm tracking-[0.25em] ${
            dark
              ? "border border-indian/30 bg-indian/10 text-indian"
              : "bg-tandoori text-ink shadow-warm"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${dark ? "bg-saffron" : "bg-indian"}`} />
          {kicker}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-5 font-display text-4xl uppercase leading-[0.95] text-ink sm:text-6xl">
          {title}{" "}
          {highlight && <span className="text-gradient-ember">{highlight}</span>}
        </h2>
      </Reveal>
      {desc && (
        <Reveal delay={0.16}>
          <p className="mt-5 text-base leading-relaxed text-ink/70 sm:text-lg">
            {desc}
          </p>
        </Reveal>
      )}
    </div>
  );
}

export function HeatDots({ level, className = "" }: { level: number; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-label={`Piccantezza ${level} su 4`}>
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i <= level ? "bg-saffron" : "bg-cream/20"
          }`}
        />
      ))}
    </span>
  );
}
