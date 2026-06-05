"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { menu, categories, type MenuItem, type Accent, type CategoryId } from "@/lib/data";
import { SectionHeading, HeatDots } from "./Motion";

const A: Record<Accent, { solid: string; addHover: string }> = {
  saffron: { solid: "bg-saffron text-ink", addHover: "group-hover:bg-saffron group-hover:text-ink" },
  indian: { solid: "bg-indian text-cream", addHover: "group-hover:bg-indian group-hover:text-cream" },
  mehndi: { solid: "bg-mehndi text-cream", addHover: "group-hover:bg-mehndi group-hover:text-cream" },
  tandoori: { solid: "bg-tandoori text-ink", addHover: "group-hover:bg-tandoori group-hover:text-ink" },
  cream: { solid: "bg-indian text-cream", addHover: "group-hover:bg-indian group-hover:text-cream" },
};

export default function MenuSection() {
  const [cat, setCat] = useState<CategoryId>(categories[0].id);
  const items = menu.filter((m) => m.cat === cat);
  const activeCat = categories.find((c) => c.id === cat)!;

  return (
    <section id="menu" className="relative overflow-hidden bg-gradient-to-b from-cream to-[#FCE6C4] py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 ring-dots opacity-[0.05]" />
      <div className="grid h-1.5 w-full grid-cols-3 absolute top-0 inset-x-0">
        <div className="bg-saffron" /><div className="bg-tandoori" /><div className="bg-indian" />
      </div>

      <div className="container-bombay relative">
        <SectionHeading
          tone="dark"
          kicker="IL MENU"
          title="Scegli la tua"
          highlight="leggenda"
          desc="Fritto, grigliato, panini, contorni e bevande. Ogni piatto è 100% Halal e cotto al momento."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              aria-pressed={cat === c.id}
              className={`rounded-full px-5 py-2.5 font-accent text-base tracking-wider transition-all duration-200 ${
                cat === c.id
                  ? `${A[c.accent].solid} shadow-lg`
                  : "border border-ink/15 text-ink/65 hover:border-ink/40 hover:text-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {items.map((item, i) => (
              <Card key={item.id} item={item} accent={activeCat.accent} i={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function Card({ item, accent, i }: { item: MenuItem; accent: Accent; i: number }) {
  const a = A[accent];
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_24px_55px_-28px_rgba(0,0,0,0.5)] ring-1 ring-ink/5 transition-shadow hover:shadow-[0_30px_60px_-25px_rgba(183,28,28,0.45)]"
    >
      <div className="relative h-44 w-full overflow-hidden">
        {item.img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.img} alt={item.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        ) : (
          <div className="grid h-full w-full place-items-center bg-gradient-to-br from-tandoori via-saffron to-indian">
            <svg className="h-14 w-14 text-ink/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h10l-1 14a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2L7 4Z" /><path d="M7 9h10" /></svg>
          </div>
        )}

        {item.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 font-accent text-xs tracking-widest shadow-lg ${a.solid}`}>
            {item.badge}
          </span>
        )}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-ink/65 px-2.5 py-1.5 backdrop-blur-sm">
          <HeatDots level={item.heat} />
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-mehndi px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-cream shadow-lg">
          ✓ Halal
        </span>
        {item.veg && (
          <span className="absolute bottom-3 right-3 rounded-full bg-cream px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-mehndi shadow-lg">
            Veg
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-2xl uppercase leading-none text-ink">{item.name}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{item.tagline}</p>
        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl text-gradient-ember">{item.price}</span>
          <button
            aria-label={`Aggiungi ${item.name} all'ordine`}
            className={`inline-flex items-center gap-1.5 rounded-full bg-ink/5 px-4 py-2.5 text-sm font-semibold text-ink transition-colors ${a.addHover}`}
          >
            Aggiungi
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
