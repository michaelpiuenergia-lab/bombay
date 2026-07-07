import Image from "next/image";
import { HalalBadge } from "./Icons";
import SocialIcons from "./SocialIcons";
import { navLinks } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t-4 border-tandoori bg-gradient-to-b from-cream to-[#FAE3AE] pt-16 text-ink">
      <div className="container-bombay">
        {/* Giant wordmark + timbro circolare */}
        <div className="pointer-events-none relative select-none text-center">
          <span className="font-display text-[18vw] uppercase leading-none text-ink/[0.05]">
            Bombay
          </span>
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="absolute -inset-5 rounded-full bg-white/60 blur-2xl" />
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-2 ring-tandoori shadow-warm sm:h-36 sm:w-36">
              <Image
                src="/logo-badge.png"
                alt="Timbro Bombay Fry & Grill"
                width={204}
                height={208}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="-mt-[6vw] grid gap-10 pb-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gold-flare p-[1.5px]">
                <span className="grid h-full w-full place-items-center rounded-[0.65rem] bg-[#1d0707]">
                  <Image
                    src="/logo-mark.png"
                    alt="Logo Bombay Fry & Grill"
                    width={495}
                    height={342}
                    className="h-9 w-9 object-contain"
                  />
                </span>
              </span>
              <span className="leading-none">
                <span className="block font-display text-xl uppercase text-ink">Bombay</span>
                <span className="block font-accent text-[10px] tracking-[0.35em] text-indian">FRY &amp; GRILL</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink/65">
              Indian Fried Chicken. Croccante, speziato, 100% Halal. Cotto fresco
              ogni giorno con amore e 11 spezie.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border-2 border-mehndi/50 bg-white/70 px-4 py-2 text-mehndi">
              <HalalBadge className="h-5 w-5" />
              <span className="font-accent text-sm tracking-widest">HALAL CERTIFIED</span>
            </div>
            <SocialIcons className="mt-6" />
          </div>

          <FooterCol title="Menu" links={navLinks.map((l) => l.label)} />
          <FooterCol title="Azienda" links={["Chi siamo", "Lavora con noi", "Franchising", "Sostenibilità"]} />
          <FooterCol title="Contatti" links={["Assistenza", "Catering", "Instagram", "TikTok"]} />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 py-6 text-sm text-ink/60 sm:flex-row">
          <span>© 2026 Bombay Fry &amp; Grill. Tutti i diritti riservati.</span>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">Privacy</a>
            <a href="#" className="transition-colors hover:text-ink">Termini</a>
            <a href="#" className="transition-colors hover:text-ink">Cookie</a>
          </div>
        </div>

        {/* Firma Wowspace — presente in fondo a tutti i siti */}
        <div className="border-t border-ink/10 py-6 text-center">
          <a
            href="https://wowspaceweb.com"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex flex-col items-center gap-1"
          >
            <span className="font-accent text-sm tracking-[0.25em] text-ink/60 transition-colors group-hover:text-ink">
              REALIZZATO DA <span className="text-gradient-ember font-bold">WOWSPACE</span>
            </span>
            <span className="font-accent text-[10px] tracking-[0.4em] text-ink/40 transition-colors group-hover:text-indian">
              SITES · CRM · AI SYSTEMS
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-accent text-base tracking-[0.25em] text-indian">{title.toUpperCase()}</h4>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-sm text-ink/60 transition-colors hover:text-ink">
              {l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
