"use client";

import { SectionHeading } from "./Motion";

type Review = { name: string; text: string; city: string };

const reviews: Review[] = [
  { name: "Giulia R.", text: "Il pollo più croccante che abbia mai mangiato. Le Masala Wings danno dipendenza.", city: "Milano" },
  { name: "Karim B.", text: "Finalmente fast food halal serio e buonissimo. Il Bombay Bucket è leggendario.", city: "Torino" },
  { name: "Sara M.", text: "Il Tandoori Chicken Grill è di un altro pianeta. Affumicato e succoso.", city: "Bologna" },
  { name: "Luca P.", text: "Ho sfidato il livello Bhut Jolokia. Ho pianto. Tornerò domani.", city: "Roma" },
  { name: "Aisha K.", text: "Lassi al mango perfetto col piccante. Si sente che è tutto fresco.", city: "Milano" },
  { name: "Marco T.", text: "Qualità da ristorante a prezzo da street food. McDonald's chi?", city: "Torino" },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 stelle su 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} className="h-4 w-4 text-saffron" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 17.8 5.4 21.2 6.7 14.2 1.7 9.4l7-.9z" />
        </svg>
      ))}
    </div>
  );
}

function Card({ name, text, city }: Review) {
  return (
    <figure className="flex w-80 shrink-0 flex-col rounded-3xl bg-white p-6 ring-1 ring-ink/5 shadow-[0_24px_55px_-30px_rgba(74,10,10,0.45)]">
      <div className="flex items-center justify-between">
        <Stars />
        <span className="font-display text-4xl leading-none text-tandoori/40">”</span>
      </div>
      <blockquote className="mt-1 flex-1 text-[15px] italic leading-relaxed text-ink/75">{text}</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-ink/5 pt-4">
        <span className="grid h-10 w-10 place-items-center rounded-full bg-ember font-display text-lg text-cream">
          {name.charAt(0)}
        </span>
        <span className="text-sm">
          <span className="block font-semibold text-ink">{name}</span>
          <span className="block text-ink/55">{city}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Reviews() {
  const track = [...reviews, ...reviews];
  return (
    <section aria-label="Recensioni dei clienti" className="relative overflow-hidden bg-gradient-to-b from-[#FFF7EC] to-cream py-24 text-ink sm:py-32">
      {/* accento tricolore: break luminoso coerente con Menu e Perché Bombay */}
      <div className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-3">
        <div className="bg-saffron" /><div className="bg-tandoori" /><div className="bg-indian" />
      </div>

      <div className="container-bombay relative">
        <SectionHeading
          tone="dark"
          kicker="DICONO DI NOI"
          title="4,9 stelle e"
          highlight="fila alla porta"
          desc="Migliaia di clienti, un solo verdetto: il miglior pollo fritto halal in città."
        />
        {/* rating aggregato per credibilità */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-full border border-ink/10 bg-white px-5 py-2.5 shadow-sm">
            <Stars />
            <span className="text-sm font-semibold text-ink">4,9 / 5</span>
            <span className="h-4 w-px bg-ink/15" />
            <span className="text-sm text-ink/60">oltre 2.000 recensioni</span>
          </div>
        </div>
      </div>

      <div className="mask-fade-x relative mt-14 flex gap-4 overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-4">
          {track.map((r, i) => (
            <Card key={i} {...r} />
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee gap-4" aria-hidden>
          {track.map((r, i) => (
            <Card key={`b-${i}`} {...r} />
          ))}
        </div>
      </div>
    </section>
  );
}
