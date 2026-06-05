export type Accent = "saffron" | "indian" | "mehndi" | "tandoori" | "cream";

export type CategoryId = "fried" | "burger" | "grill" | "sides" | "drinks";

export type Category = { id: CategoryId; label: string; accent: Accent };

export const categories: Category[] = [
  { id: "fried", label: "Fried Chicken", accent: "saffron" },
  { id: "burger", label: "Burger & Panini", accent: "indian" },
  { id: "grill", label: "Grill & Kebab", accent: "tandoori" },
  { id: "sides", label: "Contorni & Chips", accent: "mehndi" },
  { id: "drinks", label: "Bevande", accent: "cream" },
];

export type MenuItem = {
  id: string;
  name: string;
  tagline: string;
  price: string;
  heat: 1 | 2 | 3 | 4;
  cat: CategoryId;
  img?: string;
  badge?: string;
  veg?: boolean;
};

export const menu: MenuItem[] = [
  // FRIED CHICKEN
  { id: "bombay-bucket", cat: "fried", img: "/food/u5.jpg", name: "Bombay Bucket", tagline: "8 pezzi di pollo fritto nel mix di 11 spezie tostate. Croccante fuori, succoso dentro.", price: "€14,90", heat: 2, badge: "Best Seller" },
  { id: "masala-wings", cat: "fried", img: "/food/u11.jpg", name: "Masala Wings", tagline: "Alette glassate al chili-garlic con coriandolo fresco.", price: "€7,90", heat: 3 },
  { id: "saffron-strips", cat: "fried", img: "/food/u12.jpg", name: "Saffron Strips", tagline: "Straccetti impanati allo zafferano, dorati e leggeri.", price: "€6,90", heat: 1 },
  { id: "bhut-drumsticks", cat: "fried", img: "/food/u1.jpg", name: "Bhut Jolokia Drumsticks", tagline: "Cosce glassate al peperoncino fantasma. Per veri temerari.", price: "€9,50", heat: 4, badge: "Extreme" },

  // BURGER & PANINI
  { id: "tandoori-crunch", cat: "burger", img: "/food/u4.jpg", name: "Tandoori Crunch Burger", tagline: "Petto marinato 24h, lattuga croccante, salsa mint-yogurt.", price: "€8,50", heat: 3, badge: "Novità" },
  { id: "butter-burger", cat: "burger", img: "/food/u2.jpg", name: "Butter Chicken Burger", tagline: "Bocconcino croccante immerso nella nostra butter sauce cremosa.", price: "€8,90", heat: 1 },
  { id: "mumbai-zinger", cat: "burger", img: "/food/u3.jpg", name: "Mumbai Zinger", tagline: "Il panino piccante della casa: doppia panatura e salsa hot.", price: "€7,90", heat: 3 },
  { id: "paneer-sandwich", cat: "burger", img: "/food/u9.jpg", name: "Paneer Tikka Sandwich", tagline: "Paneer grigliato, chutney di menta e verdure. 100% veg.", price: "€7,50", heat: 2, veg: true },

  // GRILL & KEBAB
  { id: "tandoori-grill", cat: "grill", img: "/food/v2.jpg", name: "Tandoori Chicken Grill", tagline: "Mezzo pollo marinato e cotto nel tandoor. Affumicato e succoso.", price: "€11,90", heat: 2, badge: "Best Seller" },
  { id: "seekh-kebab", cat: "grill", img: "/food/u8.jpg", name: "Seekh Kebab", tagline: "Spiedini di manzo speziato grigliati sulla brace.", price: "€9,50", heat: 2 },
  { id: "malai-tikka", cat: "grill", img: "/food/u6.jpg", name: "Malai Tikka Skewers", tagline: "Spiedini di pollo cremosi allo yogurt e cardamomo.", price: "€9,90", heat: 1 },
  { id: "lamb-chops", cat: "grill", img: "/food/v4.jpg", name: "Lamb Chops Masala", tagline: "Costolette d'agnello marinate nel garam masala.", price: "€13,90", heat: 3 },

  // CONTORNI & CHIPS
  { id: "loaded-fries", cat: "sides", img: "/food/u10.jpg", name: "Loaded Masala Fries", tagline: "Chips con masala, formaggio fuso, pollo sfilacciato e jalapeño.", price: "€6,50", heat: 2, badge: "Da condividere" },
  { id: "masala-chips", cat: "sides", img: "/food/u10.jpg", name: "Masala Chips", tagline: "Patatine fritte spolverate col nostro masala segreto.", price: "€3,90", heat: 1, veg: true },
  { id: "onion-bhaji", cat: "sides", img: "/food/v3.jpg", name: "Onion Bhaji", tagline: "Frittelle di cipolla croccanti in pastella di ceci.", price: "€4,50", heat: 2, veg: true },
  { id: "samosa", cat: "sides", img: "/food/u7.jpg", name: "Samosa (2 pz)", tagline: "Fagottini ripieni di patate e piselli speziati.", price: "€4,20", heat: 2, veg: true },

  // BEVANDE
  { id: "mango-lassi", cat: "drinks", name: "Mango Lassi", tagline: "Frullato cremoso di yogurt e mango. Spegne il piccante.", price: "€3,50", heat: 1, veg: true, badge: "Cult" },
  { id: "masala-chai", cat: "drinks", img: "/food/v6.jpg", name: "Masala Chai", tagline: "Tè nero speziato con latte, cardamomo e zenzero.", price: "€2,50", heat: 1, veg: true },
  { id: "ginger-lemon", cat: "drinks", img: "/food/v8.jpg", name: "Limonata allo Zenzero", tagline: "Fresca, frizzante e leggermente piccante.", price: "€3,20", heat: 1, veg: true },
  { id: "soft-drinks", cat: "drinks", img: "/food/v7.jpg", name: "Bibite & Acqua", tagline: "Una selezione di bibite analcoliche fresche.", price: "€2,50", heat: 1, veg: true },
];

export type Feature = {
  title: string;
  desc: string;
  icon: "spice" | "chicken" | "halal" | "flame" | "heart";
  color: Accent;
};

export const features: Feature[] = [
  { title: "Ispirato all'India", desc: "Ricette di famiglia e un blend di spezie tostate ogni mattina.", icon: "spice", color: "indian" },
  { title: "Fritto & Grigliato", desc: "Pollo fritto croccante e carni alla brace nel tandoor. Il meglio dei due mondi.", icon: "chicken", color: "saffron" },
  { title: "Cotto fresco", desc: "Niente surgelati pronti: cuociamo al momento, solo quando ordini.", icon: "flame", color: "tandoori" },
  { title: "Anche Veg", desc: "Paneer, samosa, bhaji e bevande: tante opzioni vegetariane.", icon: "heart", color: "cream" },
];

export type HeatLevel = { level: number; name: string; desc: string; scoville: string };

export const heatLevels: HeatLevel[] = [
  { level: 1, name: "Mango Mild", desc: "Dolce e profumato. Per chi ama il gusto senza il fuoco.", scoville: "0 — 1.000 SHU" },
  { level: 2, name: "Masala Medium", desc: "Il nostro equilibrio firma. Speziato, caldo, irresistibile.", scoville: "2.500 — 8.000 SHU" },
  { level: 3, name: "Tandoori Hot", desc: "Sale la temperatura. Chili rosso e pepe nero tostato.", scoville: "15.000 — 50.000 SHU" },
  { level: 4, name: "Bhut Jolokia", desc: "Peperoncino fantasma. Solo per veri temerari. Firma la liberatoria.", scoville: "800.000+ SHU" },
];

export const stats = [
  { value: "11", label: "Spezie tostate" },
  { value: "24h", label: "Marinatura" },
  { value: "100%", label: "Halal certificato" },
  { value: "0", label: "Surgelati" },
];

export const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Heat Level", href: "#heat" },
  { label: "Perché Bombay", href: "#why" },
  { label: "Locali", href: "#locali" },
];
