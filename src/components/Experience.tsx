"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "./Motion";

const shots = [
  {
    src: "/shot-store.png",
    w: 326,
    h: 222,
    title: "Entra nel locale",
    desc: "Insegna che si accende, profumo di spezie nell'aria. Casa dal primo passo.",
    span: "lg:col-span-2",
  },
  {
    src: "/shot-box.png",
    w: 311,
    h: 222,
    title: "Packaging iconico",
    desc: "Take-away curato in ogni dettaglio, brandizzato e 100% riciclabile.",
    span: "",
  },
  {
    src: "/shot-cup.png",
    w: 367,
    h: 222,
    title: "Fino all'ultimo sorso",
    desc: "Lassi al mango, masala chai e bibite fresche per spegnere il fuoco.",
    span: "",
  },
];

export default function Experience() {
  return (
    <section id="esperienza" aria-label="L'esperienza Bombay" className="relative py-24 sm:py-32">
      <div className="container-bombay">
        <SectionHeading
          kicker="L'ESPERIENZA"
          title="Dal locale"
          highlight="al tuo tavolo"
          desc="Non solo cibo: un'esperienza che inizia dall'insegna e arriva fino al packaging tra le tue mani."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shots.map((s, i) => (
            <motion.figure
              key={s.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className={`group relative h-64 overflow-hidden rounded-3xl border border-cream/10 transition-colors duration-300 hover:border-tandoori/45 sm:h-72 ${s.span}`}
            >
              <Image
                src={s.src}
                alt={s.title}
                width={s.w}
                height={s.h}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-6">
                <span className="mb-3 block h-1 w-9 rounded-full bg-saffron transition-all duration-300 group-hover:w-14" />
                <h3 className="font-display text-2xl uppercase leading-none text-cream sm:text-3xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-cream/75">
                  {s.desc}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
