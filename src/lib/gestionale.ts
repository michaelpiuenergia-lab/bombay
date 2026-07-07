// Menu "vivo" dal gestionale (fonte di verità): il titolare gestisce i piatti
// da /admin/menu del gestionale e il sito li mostra in automatico via
// GET /api/public/menu. Questo modulo fa il fetch server-side (con cache ISR)
// e mappa il JSON del gestionale sui tipi del sito (MenuItem/CategoryId).
//
// REGOLA D'ORO: qualsiasi errore (rete, timeout, JSON inatteso, menu vuoto)
// ritorna `null` e il chiamante ricade sul menu hardcoded di src/lib/data.ts.
// Il sito non deve MAI rompersi né mostrare sezioni vuote.

import type { CategoryId, MenuItem } from "@/lib/data";

const GESTIONALE_URL = (
  process.env.NEXT_PUBLIC_GESTIONALE_URL ?? "https://www.bombayfryandgrill.it"
).replace(/\/$/, "");

const FETCH_TIMEOUT_MS = 8000;
const REVALIDATE_SECONDS = 300;

// Shape (parziale) di GET /api/public/menu del gestionale.
type GestionaleCategory = {
  id: string;
  name: string;
  sort_order: number;
};

type GestionaleProduct = {
  id: string;
  category_id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  available: boolean;
  sort_order: number;
};

// Le categorie del gestionale sono libere (le decide il titolare): le mappiamo
// sulle 5 sezioni fisse del sito per NOME, con keyword. I controlli più
// specifici vengono prima (es. "Patatine fritte" deve finire nei contorni,
// non nel fritto). Categoria non riconosciuta -> "sides", la sezione più neutra.
function sectionForCategoryName(name: string): CategoryId {
  const n = name.toLowerCase();
  if (/contorn|patat|chips|sides/.test(n)) return "sides";
  if (/bevand|drink|dolc|dessert/.test(n)) return "drinks";
  if (/burger|panin/.test(n)) return "burger";
  if (/grill|kebab/.test(n)) return "grill";
  if (/fritt|fried/.test(n)) return "fried";
  return "sides";
}

// 14.9 -> "€14,90" (stesso formato del menu hardcoded).
function formatPrice(price: number): string {
  return `€${price.toFixed(2).replace(".", ",")}`;
}

function isCategory(value: unknown): value is GestionaleCategory {
  const c = value as GestionaleCategory;
  return Boolean(c) && typeof c.id === "string" && typeof c.name === "string";
}

function isProduct(value: unknown): value is GestionaleProduct {
  const p = value as GestionaleProduct;
  return (
    Boolean(p) &&
    typeof p.id === "string" &&
    typeof p.category_id === "string" &&
    typeof p.name === "string" &&
    typeof p.price === "number" &&
    Number.isFinite(p.price)
  );
}

// Timeout via Promise.race e NON via AbortSignal: un signal custom fa saltare
// la Data Cache di Next (opt-out documentato), mentre qui vogliamo proprio
// `next: { revalidate }`. Se scade il timeout si ritorna null (fallback);
// l'eventuale fetch ancora in volo si risolve da sola senza effetti.
function fetchWithTimeout(url: string): Promise<Response | null> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<null>((resolve) => {
    timer = setTimeout(() => resolve(null), FETCH_TIMEOUT_MS);
  });
  const request = fetch(url, { next: { revalidate: REVALIDATE_SECONDS } })
    .catch(() => null);
  return Promise.race([request, timeout]).finally(() => clearTimeout(timer));
}

export async function fetchGestionaleMenu(): Promise<MenuItem[] | null> {
  try {
    const res = await fetchWithTimeout(`${GESTIONALE_URL}/api/public/menu`);
    if (!res || !res.ok) return null;

    const data: unknown = await res.json();
    const raw = data as { categories?: unknown; products?: unknown };
    if (!Array.isArray(raw.categories) || !Array.isArray(raw.products)) return null;

    const categories = raw.categories.filter(isCategory);
    const sectionByCategoryId = new Map<string, CategoryId>(
      categories.map((c) => [c.id, sectionForCategoryName(c.name)]),
    );
    const categoryOrder = new Map<string, number>(
      categories.map((c) => [c.id, typeof c.sort_order === "number" ? c.sort_order : 0]),
    );

    const items: MenuItem[] = raw.products
      .filter(isProduct)
      // Non disponibile (esaurito) o categoria sconosciuta: fuori dal sito.
      .filter((p) => p.available !== false && sectionByCategoryId.has(p.category_id))
      .sort(
        (a, b) =>
          (categoryOrder.get(a.category_id) ?? 0) - (categoryOrder.get(b.category_id) ?? 0) ||
          (a.sort_order ?? 0) - (b.sort_order ?? 0),
      )
      .map((p) => ({
        id: p.id,
        name: p.name,
        tagline: typeof p.description === "string" ? p.description : "",
        price: formatPrice(p.price),
        // Il gestionale non ha il concetto di piccantezza: default al minimo.
        heat: 1,
        cat: sectionByCategoryId.get(p.category_id) as CategoryId,
        img: typeof p.image_url === "string" && p.image_url ? p.image_url : undefined,
      }));

    return items.length > 0 ? items : null;
  } catch {
    // Rete giù o JSON malformato: si usa il fallback hardcoded.
    return null;
  }
}
