import { Flame, Chili, Leaf } from "./Icons";

const items = [
  "100% HALAL CERTIFICATO",
  "COTTO FRESCO OGNI GIORNO",
  "11 SPEZIE TOSTATE",
  "MARINATO 24 ORE",
  "ZERO SURGELATI",
  "CROCCANTE & SUCCOSO",
];

export default function Marquee() {
  return (
    <div className="relative border-y border-cream/10 bg-ember py-4">
      <div className="mask-fade-x flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8">
          {[...items, ...items].map((t, i) => (
            <Token key={i} text={t} index={i} />
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8" aria-hidden>
          {[...items, ...items].map((t, i) => (
            <Token key={`b-${i}`} text={t} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Token({ text, index }: { text: string; index: number }) {
  const Icon = [Flame, Chili, Leaf][index % 3];
  return (
    <span className="flex items-center gap-8">
      <span className="flex items-center gap-3 font-display text-lg uppercase tracking-wider text-cream sm:text-2xl">
        <Icon className="h-5 w-5 text-tandoori sm:h-6 sm:w-6" />
        {text}
      </span>
      <span className="text-tandoori">✦</span>
    </span>
  );
}
