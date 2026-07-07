"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import HalalSeal from "./HalalSeal";
import Embers from "./Embers";

/* Intro-gateway: il logo (sigillo) nel buio, le PORTE indiane chiuse.
   L'utente apre lui — scrollando o cliccando — e le porte si spalancano
   rivelando il sito. "Dall'India a Bombay." */

const r2 = (n: number) => Math.round(n * 100) / 100;

function Mandala({ className }: { className?: string }) {
  const spokes = Array.from({ length: 24 }).map((_, i) => {
    const a = (i * Math.PI) / 12;
    return {
      x: r2(100 + 96 * Math.cos(a)),
      y: r2(100 + 96 * Math.sin(a)),
      mx: r2(100 + 59 * Math.cos(a)),
      my: r2(100 + 59 * Math.sin(a)),
    };
  });
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth={1.2}>
      <circle cx="100" cy="100" r="22" />
      <circle cx="100" cy="100" r="46" />
      <circle cx="100" cy="100" r="72" />
      <circle cx="100" cy="100" r="96" />
      {spokes.map((p, i) => (
        <g key={i}>
          <path d={`M100 100 L${p.x} ${p.y}`} opacity="0.5" />
          <circle cx={p.mx} cy={p.my} r="5" />
          <circle cx={p.x} cy={p.y} r="3" />
        </g>
      ))}
    </svg>
  );
}

export default function Intro() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  const [opening, setOpening] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const entered = useRef(false);

  // Rileva il mobile: lì il sipario è semplificato (apertura automatica e più rapida).
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    setIsMobile(mq.matches);
    const onChange = () => setIsMobile(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const enter = useCallback(() => {
    if (entered.current) return;
    entered.current = true;
    setOpening(true);
    setTimeout(() => setShow(false), isMobile ? 800 : 1150);
  }, [isMobile]);

  // Blocca lo scroll SOLO finché l'intro è visibile, e lo ripristina sempre.
  useEffect(() => {
    document.body.style.overflow = show ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [show]);

  // Interazione (scroll/click/tasto) per entrare + fallback anti-blocco.
  useEffect(() => {
    if (reduce) {
      setShow(false);
      return;
    }
    const onWheel = () => enter();
    const onKey = () => enter();
    window.addEventListener("wheel", onWheel, { passive: true });
    window.addEventListener("touchmove", onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    // Mobile: dopo un breve splash il sipario si apre da solo. Desktop: fallback anti-blocco a 9s.
    const auto = setTimeout(() => enter(), isMobile ? 1400 : 9000);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchmove", onWheel);
      window.removeEventListener("keydown", onKey);
      clearTimeout(auto);
    };
  }, [reduce, enter, isMobile]);

  const doorEase = [0.76, 0, 0.24, 1] as const;
  const doorDur = isMobile ? 0.7 : 1.05;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          onClick={enter}
          className="fixed inset-0 z-[200] cursor-pointer select-none overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
        >
          {/* ANTA SINISTRA */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 overflow-hidden bg-gradient-to-b from-tandoori via-saffron to-[#D2540F]"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", willChange: "transform" }}
            initial={{ x: 0 }}
            animate={{ x: opening ? "-101%" : 0 }}
            transition={{ duration: doorDur, ease: doorEase }}
          >
            {/* mandala pesante solo da sm in su (su mobile fa flicker) */}
            <Mandala className="absolute -left-[35vh] top-1/2 hidden h-[150vh] w-[150vh] -translate-y-1/2 text-ink/[0.13] animate-spin-slow sm:block" />
            <div className="absolute inset-y-0 right-0 w-1.5 bg-ink/70 shadow-[0_0_24px_rgba(0,0,0,0.45)]" />
          </motion.div>

          {/* ANTA DESTRA */}
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 overflow-hidden bg-gradient-to-b from-tandoori via-saffron to-[#D2540F]"
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", willChange: "transform" }}
            initial={{ x: 0 }}
            animate={{ x: opening ? "101%" : 0 }}
            transition={{ duration: doorDur, ease: doorEase }}
          >
            <Mandala className="absolute -right-[35vh] top-1/2 hidden h-[150vh] w-[150vh] -translate-y-1/2 text-ink/[0.13] animate-spin-slow sm:block" />
            <div className="absolute inset-y-0 left-0 w-1.5 bg-ink/70 shadow-[0_0_24px_rgba(0,0,0,0.45)]" />
          </motion.div>

          {/* CONTENUTO CENTRALE: logo + testo + invito. Svanisce all'apertura. */}
          <motion.div
            className="absolute inset-0 grid place-items-center px-6 text-center"
            animate={{ opacity: opening ? 0 : 1, scale: opening ? 1.5 : 1 }}
            transition={{ duration: 0.7, ease: "easeIn" }}
          >
            {/* alone sfocato: pesante da ricompositare durante lo scale -> solo da sm in su (su mobile fa flicker) */}
            <div className="pointer-events-none absolute hidden h-[40rem] w-[40rem] rounded-full bg-white/25 blur-[130px] sm:block" />

            <motion.span
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="absolute top-[18%] hidden font-accent text-base tracking-[0.45em] text-ink/75 sm:block sm:text-lg"
            >
              नमस्ते · NAMASTÉ
            </motion.span>

            {/* gruppo logo + titolo: su mobile impilati e centrati insieme (composizione
                equilibrata); su desktop il titolo torna in basso assoluto. */}
            <div className="flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.2, opacity: 0, rotate: -25 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 80, damping: 14, delay: 0.15 }}
              >
                <HalalSeal className="w-52 sm:w-72" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: isMobile ? 0.35 : 0.5, duration: 0.6 }}
                className="mt-7 sm:mt-0 sm:absolute sm:bottom-[20%] sm:left-0 sm:right-0 sm:px-6"
              >
                <h2 className="font-display text-3xl uppercase leading-none text-ink sm:text-5xl">
                  Dall&apos;India <span className="text-indian">a Bombay</span>
                </h2>
              </motion.div>
            </div>

            {/* invito a entrare */}
            <motion.div
              animate={reduce ? undefined : { opacity: [0.5, 1, 0.5], y: [0, 4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-[9%] left-0 right-0 hidden font-accent text-xs tracking-[0.3em] text-ink/65 sm:block"
            >
              SCORRI O CLICCA PER ENTRARE ▸
            </motion.div>
          </motion.div>

          {/* le particelle spariscono appena parte l'apertura: meno layer da compositare = niente flicker */}
          {!opening && <Embers />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
