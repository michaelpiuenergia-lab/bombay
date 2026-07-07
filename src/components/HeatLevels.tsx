"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { heatLevels } from "@/lib/data";
import { SectionHeading } from "./Motion";
import { Flame } from "./Icons";

const levelColors = ["#2E7D32", "#F2B705", "#FF8C00", "#B71C1C"];
// Varianti più scure per il TESTO: l'oro/zafferano puro su crema non regge il contrasto
const levelTextColors = ["#2E7D32", "#A87F03", "#C2410C", "#B71C1C"];

export default function HeatLevels() {
  const [active, setActive] = useState(1);
  const current = heatLevels[active];
  const color = levelColors[active];
  const textColor = levelTextColors[active];

  return (
    <section id="heat" className="relative overflow-hidden pt-10 pb-24 sm:pt-14 sm:pb-32">
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-40 transition-colors duration-700"
        style={{ background: `radial-gradient(60% 60% at 50% 40%, ${color}33, transparent 70%)` }}
      />
      <div className="container-bombay">
        <SectionHeading
          kicker="HEAT LEVEL"
          title="Quanto la vuoi"
          highlight="piccante?"
          desc="Dal mango dolce al peperoncino fantasma. Scegli il tuo livello — se hai coraggio."
        />

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2">
          {/* Animated flame gauge */}
          <div className="relative mx-auto grid aspect-square w-full max-w-sm place-items-center">
            <div
              className="absolute inset-0 rounded-full blur-3xl transition-colors duration-700"
              style={{ background: `${color}55` }}
            />
            <motion.div
              key={`ring-${active}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute inset-6 rounded-full border-2"
              style={{ borderColor: `${color}66` }}
            />
            <div className="relative flex flex-col items-center">
              <div className="flex h-32 items-end gap-1">
                {[0, 1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: i <= active ? [1, 1.12, 1] : 1,
                      opacity: i <= active ? 1 : 0.25,
                    }}
                    transition={{ duration: 1, repeat: i <= active ? Infinity : 0, delay: i * 0.12 }}
                  >
                    <Flame
                      className="h-12 w-12 sm:h-16 sm:w-16"
                      style={{ color: i <= active ? color : "#E9D6B8" }}
                    />
                  </motion.div>
                ))}
              </div>
              <motion.div
                key={`scov-${active}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 font-display text-2xl"
                style={{ color: textColor }}
              >
                {current.scoville}
              </motion.div>
            </div>
          </div>

          {/* Selector + info */}
          <div>
            <div className="flex flex-col gap-3">
              {heatLevels.map((lvl, i) => (
                <button
                  key={lvl.level}
                  onClick={() => setActive(i)}
                  aria-pressed={active === i}
                  aria-label={`Livello ${lvl.level}: ${lvl.name}`}
                  className={`group flex items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-300 ${
                    active === i
                      ? "border-transparent bg-white shadow-warm"
                      : "border-ink/10 bg-white/40 hover:border-ink/25"
                  }`}
                  style={active === i ? { boxShadow: `inset 0 0 0 1.5px ${levelColors[i]}` } : undefined}
                >
                  <span
                    className="grid h-12 w-12 shrink-0 place-items-center rounded-xl font-display text-xl transition-colors"
                    style={{
                      background: active === i ? levelColors[i] : "rgba(26,6,6,0.05)",
                      color: active === i ? (i === 3 ? "#FFF3E0" : "#1A0606") : levelTextColors[i],
                    }}
                  >
                    {lvl.level}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-display text-xl uppercase text-ink">{lvl.name}</div>
                    <AnimatePresence mode="wait">
                      {active === i && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden text-sm text-ink/65"
                        >
                          {lvl.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    {[0, 1, 2, 3].map((d) => (
                      <span
                        key={d}
                        className="h-6 w-1.5 rounded-full"
                        style={{ background: d <= i ? levelColors[i] : "rgba(26,6,6,0.12)" }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
