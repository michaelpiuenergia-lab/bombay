"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { navLinks } from "@/lib/data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
    >
      <nav
        className={`container-bombay flex items-center justify-between rounded-2xl border px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "border-cream/10 bg-ink-800/80 shadow-card backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#top" className="group flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-flare p-[1.5px] shadow-[0_8px_24px_-8px_rgba(255,140,0,0.6)] transition-transform group-hover:scale-105">
            <span className="grid h-full w-full place-items-center rounded-[0.65rem] bg-[#1d0707]">
              <Image
                src="/logo-mark.png"
                alt="Logo Bombay Fry & Grill"
                width={495}
                height={342}
                priority
                className="h-9 w-9 object-contain"
              />
            </span>
          </span>
          <span className="leading-none">
            <span className="block font-display text-xl uppercase tracking-wide text-cream">
              Bombay
            </span>
            <span className="block font-accent text-[10px] tracking-[0.35em] text-tandoori">
              FRY &amp; GRILL
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-4 py-2.5 text-sm font-medium text-cream/80 transition-colors hover:bg-cream/5 hover:text-cream"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#menu"
            className="hidden rounded-full bg-tandoori px-6 py-2.5 font-accent text-base tracking-wider text-ink transition-transform duration-200 hover:scale-105 active:scale-95 sm:inline-block"
          >
            Ordina ora
          </a>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Apri menu"
            className="grid h-11 w-11 place-items-center rounded-xl border border-cream/15 text-cream lg:hidden"
          >
            <div className="space-y-1.5">
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 w-5 bg-current transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="container-bombay mt-2 overflow-hidden rounded-2xl border border-cream/10 bg-ink-800/95 p-3 backdrop-blur-xl lg:hidden"
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 font-accent text-xl tracking-wide text-cream/85 hover:bg-cream/5"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#menu"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-xl bg-ember px-4 py-3 text-center font-accent text-xl tracking-wide text-cream"
            >
              Ordina ora
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
