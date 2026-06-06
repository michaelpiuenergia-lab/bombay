/* Sfondo globale: deep CALDO con profondità (non nero piatto, non marrone
   slavato). Le sezioni mettono il colore dove serve. */
export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#1a0b08]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 80% at 50% 22%, rgba(170,60,22,0.35), transparent 60%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.05]" />
    </div>
  );
}
