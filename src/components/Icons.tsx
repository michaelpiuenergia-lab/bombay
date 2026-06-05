import type { SVGProps } from "react";

/* Bombay rooster mark — simplified line version of the brand icon */
export function Rooster(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M30 10c-3 2-4 5-3 9-5-1-9 2-10 7 3-1 6 0 7 2-4 2-6 6-6 11 4-3 8-3 12-1" />
      <path d="M27 14c4-3 9-2 12 2 3 4 3 9 1 14 3 1 5 3 6 6-4 1-8 0-11-2" />
      <path d="M22 53c2 3 6 5 11 5 9 0 16-7 16-16 0-6-3-11-8-14" />
      <circle cx="35" cy="24" r="1.6" fill="currentColor" stroke="none" />
      <path d="M44 26c3-1 6 0 8 2" />
    </svg>
  );
}

export function Chili(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 13c0 4 3 7 7 7 5 0 9-4 9-10 0-1-1-2-2-1-1 1-2 1-3 0" />
      <path d="M16 9c0-3 1-5 3-6" />
      <path d="M19 3c1 1 2 1 3 1" />
    </svg>
  );
}

export function Flame(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-4-1-6 1-9Z" />
    </svg>
  );
}

export function ChickenLeg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M14 4a5 5 0 0 1 5 5c0 3-2 5-5 5-1 2-3 4-6 4a4 4 0 1 1-1-7c0-3 2-5 5-5 0-3 1-5 2-7" />
      <path d="M6 18l-3 3M8 20l-2 2" />
    </svg>
  );
}

export function Leaf(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20 4C9 4 4 10 4 20c8 0 16-4 16-16Z" />
      <path d="M4 20C8 14 12 11 18 9" />
    </svg>
  );
}

export function Heart(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 20s-7-4.5-9.5-9C1 8 2.5 4.5 6 4.5c2 0 3.2 1.2 4 2.5.8-1.3 2-2.5 4-2.5 3.5 0 5 3.5 3.5 6.5C19 15.5 12 20 12 20Z" />
    </svg>
  );
}

/* Halal certified badge — stylized */
export function HalalBadge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2}
      strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="24" cy="24" r="20" />
      <path d="M14 28c0-4 2-7 5-7 2 0 3 1 3 3v4M22 28v-9M28 19c2 0 4 2 4 5s-2 4-4 4-3-1-3-3 2-3 4-3 3-1 3-3" />
    </svg>
  );
}

/* Decorative paisley / mandala motif */
export function Paisley(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth={1.4} {...props}>
      <path d="M50 8c20 0 30 14 30 30 0 24-22 38-40 44 8-14 6-26-2-32-10-8-10-22 2-28 8-4 8-10 2-14" />
      <circle cx="58" cy="34" r="6" />
      <circle cx="50" cy="58" r="3" />
      <path d="M30 70c-6 4-10 12-10 22M40 64c-2 6-2 14 0 22" />
    </svg>
  );
}

export function FeatureIcon({ name, ...props }: { name: string } & SVGProps<SVGSVGElement>) {
  switch (name) {
    case "spice":
      return <Chili {...props} />;
    case "chicken":
      return <ChickenLeg {...props} />;
    case "halal":
      return <HalalBadge {...props} />;
    case "flame":
      return <Flame {...props} />;
    case "heart":
      return <Heart {...props} />;
    default:
      return <Leaf {...props} />;
  }
}
