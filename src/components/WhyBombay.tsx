"use client";

import { motion } from "framer-motion";
import { features, type Accent } from "@/lib/data";
import { Reveal, SectionHeading } from "./Motion";
import { FeatureIcon, HalalBadge, Paisley } from "./Icons";

const CARD: Record<Accent, { bg: string; title: string; desc: string; icon: string }> = {
  indian: { bg: "bg-indian", title: "text-cream", desc: "text-cream/85", icon: "bg-cream/15 text-cream" },
  saffron: { bg: "bg-saffron", title: "text-ink", desc: "text-ink/80", icon: "bg-ink/10 text-ink" },
  tandoori: { bg: "bg-tandoori", title: "text-ink", desc: "text-ink/80", icon: "bg-ink/10 text-ink" },
  mehndi: { bg: "bg-mehndi", title: "text-cream", desc: "text-cream/85", icon: "bg-cream/15 text-cream" },
  // Su sezione chiara la card "cream" sparirebbe → diventa una card bianca pulita
  cream: { bg: "bg-white ring-1 ring-ink/10", title: "text-ink", desc: "text-ink/65", icon: "bg-saffron/15 text-saffron" },
};

export default function WhyBombay() {
  return (
    <section id="why" className="relative overflow-hidden bg-gradient-to-b from-cream to-[#FCE6C4] py-24 text-ink sm:py-32">
      {/* accento tricolore + texture: spezza il marrone con un break luminoso */}
      <div className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
        <div className="bg-saffron" /><div className="bg-tandoori" /><div className="bg-indian" />
      </div>
      <div className="ring-dots pointer-events-none absolute inset-0 opacity-[0.05]" />

      <div className="container-bombay relative">
        <SectionHeading
          tone="dark"
          kicker="PERCHÉ BOMBAY"
          title="Fast food, sì."
          highlight="Compromessi, mai."
          desc="Il gusto della tradizione indiana con la velocità dello street food. Questo è il nostro patto."
        />

        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {/* Big halal highlight */}
          <Reveal className="lg:row-span-2">
            <div className="grain relative flex h-full min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-mehndi p-8 shadow-[0_30px_60px_-30px_rgba(46,125,50,0.65)]">
              <Paisley className="absolute -right-10 -top-10 h-56 w-56 text-cream/10" />
              <HalalBadge className="h-16 w-16 text-cream" />
              <div>
                <div className="font-display text-6xl uppercase leading-none text-cream">100%</div>
                <div className="font-display text-3xl uppercase text-cream/90">Halal certificato</div>
                <p className="mt-3 max-w-xs text-cream/85">
                  Ogni grammo di carne proviene da filiere Halal certificate e controllate.
                  Nessuna eccezione, nessun dubbio.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Coloured feature cards */}
          {features.map((f, i) => {
            const c = CARD[f.color];
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className={`grain relative overflow-hidden rounded-3xl p-7 shadow-[0_26px_55px_-30px_rgba(74,10,10,0.5)] ${c.bg}`}
              >
                <Paisley className="pointer-events-none absolute -right-8 -bottom-8 h-36 w-36 opacity-10" />
                <span className={`relative grid h-14 w-14 place-items-center rounded-2xl ${c.icon}`}>
                  <FeatureIcon name={f.icon} className="h-7 w-7" />
                </span>
                <h3 className={`relative mt-5 font-display text-2xl uppercase ${c.title}`}>{f.title}</h3>
                <p className={`relative mt-2 text-sm leading-relaxed ${c.desc}`}>{f.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
