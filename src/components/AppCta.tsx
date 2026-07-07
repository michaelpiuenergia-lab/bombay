"use client";

import { motion } from "framer-motion";
import { Reveal } from "./Motion";
import { Rooster, Paisley } from "./Icons";

const cities = ["Milano Centrale", "Milano Navigli", "Torino Porta Nuova", "Roma Termini", "Bologna"];

export default function AppCta() {
  return (
    <section id="locali" className="relative py-20 sm:py-28">
      <div className="container-bombay">
        <div className="grain relative overflow-hidden rounded-[2.5rem] bg-ember px-6 py-14 shadow-warm-red ring-4 ring-tandoori/60 sm:px-14 sm:py-20">
          <Paisley className="absolute -left-16 -top-10 h-72 w-72 text-cream/10" />
          <Paisley className="absolute -bottom-20 -right-10 h-80 w-80 rotate-180 text-cream/10" />

          <div className="relative grid items-center gap-12 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink/20 px-4 py-1.5 font-accent text-sm tracking-[0.25em] text-cream">
                  ORDINA · RITIRA · GUSTA
                </span>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-5 font-display text-5xl uppercase leading-[0.9] text-cream sm:text-7xl">
                  Salta la fila.
                  <br />
                  <span className="text-ink">Ordina dall&apos;app.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 max-w-md text-lg text-cream/85">
                  Accumula punti, sblocca extra croccanti e ritira senza attese.
                  Il primo Bombay Bucket è in regalo. 🐔
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex flex-wrap gap-3">
                  <StoreButton store="App Store" sub="Scarica su" />
                  <StoreButton store="Google Play" sub="Disponibile su" />
                </div>
              </Reveal>
            </div>

            {/* Phone-ish card */}
            <Reveal delay={0.2} className="mx-auto">
              <motion.div
                initial={{ rotate: 4 }}
                whileHover={{ rotate: 0, y: -6 }}
                transition={{ type: "spring", stiffness: 120, damping: 14 }}
                className="relative aspect-[9/16] w-56 rounded-[2rem] border-4 border-ink/80 bg-ink-900 p-4 shadow-2xl sm:w-64"
              >
                <div className="flex items-center justify-between">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-ember">
                    <Rooster className="h-5 w-5 text-cream" />
                  </span>
                  <span className="font-accent text-sm tracking-widest text-tandoori">BOMBAY</span>
                </div>
                <div className="mt-5 rounded-2xl bg-gradient-to-br from-tandoori/30 to-indian/30 p-4">
                  <div className="font-accent text-xs tracking-widest text-cream/70">IL TUO ORDINE</div>
                  <div className="mt-1 font-display text-2xl text-cream">Bombay Bucket</div>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="font-display text-xl text-tandoori">€14,90</span>
                    <span className="rounded-full bg-mehndi px-3 py-1 text-xs font-semibold text-cream">Pronto in 8&apos;</span>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.04, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-4 rounded-xl bg-ember py-3 text-center font-accent text-lg tracking-wider text-cream"
                >
                  Conferma ordine
                </motion.div>
              </motion.div>
            </Reveal>
          </div>

          {/* Locations */}
          <div className="relative mt-14 border-t border-ink/15 pt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-accent text-sm tracking-[0.25em] text-ink">CI TROVI A:</span>
              {cities.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-ink/15 px-4 py-1.5 text-sm font-semibold text-cream"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StoreButton({ store, sub }: { store: string; sub: string }) {
  return (
    <button className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-3 text-left text-cream transition-transform duration-200 hover:scale-105 active:scale-95">
      <svg className="h-7 w-7 text-tandoori" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-2 6 6 4-6 4V8Z" />
      </svg>
      <span>
        <span className="block text-[10px] uppercase tracking-wide text-cream/60">{sub}</span>
        <span className="block font-accent text-lg tracking-wide">{store}</span>
      </span>
    </button>
  );
}
