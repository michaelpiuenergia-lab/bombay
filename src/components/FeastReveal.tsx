"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Embers from "./Embers";
import { Paisley } from "./Icons";

const shots: [string, string][] = [
  ["/shot-box.png", "Il box take-away"],
  ["/shot-cup.png", "Bibite fresche"],
  ["/shot-store.png", "Il locale"],
];

export default function FeastReveal() {
  return (
    <section aria-label="La festa Bombay" className="relative">
      <ContainerScroll
        titleComponent={
          <div className="pb-4">
            <span className="font-accent text-sm tracking-[0.3em] text-tandoori">
              UN MORSO E SEI A BOMBAY
            </span>
            <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] text-cream sm:text-6xl">
              Apparecchia <span className="text-gradient-ember">la festa</span>
            </h2>
          </div>
        }
      >
        <div className="relative grid h-full w-full place-items-center overflow-hidden">
          {/* fondali stratificati per profondità */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink-900 via-indian/40 to-ink-900" />
          <div className="absolute -top-24 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-saffron/40 blur-[110px]" />
          <div className="absolute bottom-[-6rem] left-1/2 h-[20rem] w-[36rem] -translate-x-1/2 rounded-full bg-indian/40 blur-[110px]" />
          <Paisley className="absolute -left-10 top-6 h-48 w-48 text-tandoori/10 animate-spin-slow" />
          <Paisley className="absolute -right-12 bottom-2 h-56 w-56 rotate-180 text-saffron/10 animate-spin-slow" />
          <div className="grain absolute inset-0" />
          <Embers />

          <div className="relative flex flex-col items-center px-5 text-center">
            <Image
              src="/logo-lockup.png"
              alt="Bombay Fry & Grill"
              width={710}
              height={662}
              priority
              className="w-52 rounded-3xl sm:w-80"
            />
            <p className="-mt-2 max-w-md text-sm text-cream/80 sm:text-base">
              Pollo fritto croccante, burger, grill alla brace e contorni.
              Tutto halal, tutto da condividere.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-2 sm:gap-4">
              {shots.map(([src, label], i) => (
                <motion.figure
                  key={src}
                  initial={{ opacity: 0, y: 24, rotate: i % 2 ? 3 : -3 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12, type: "spring", stiffness: 120, damping: 14 }}
                  whileHover={{ y: -6, rotate: 0 }}
                  className="overflow-hidden rounded-2xl border border-cream/15 shadow-card"
                >
                  <Image src={src} alt={label} width={367} height={222} className="h-24 w-28 object-cover sm:h-32 sm:w-44" />
                </motion.figure>
              ))}
            </div>
            <a
              href="#menu"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-ember px-8 py-3 font-accent text-lg tracking-wider text-cream shadow-glow-red transition-transform hover:scale-105 active:scale-95"
            >
              Vedi tutto il menu
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </div>
      </ContainerScroll>
    </section>
  );
}
