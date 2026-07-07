/* Sfondo globale: bianco caldo LUMINOSO con aloni oro/zafferano morbidi
   (da fast food, non da lounge notturno). Le sezioni mettono il colore
   pieno dove serve. */
export default function Atmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#FFF8EE]">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(110% 70% at 50% 0%, rgba(242,183,5,0.22), transparent 60%), radial-gradient(80% 55% at 85% 100%, rgba(255,140,0,0.12), transparent 65%)",
        }}
      />
      <div className="grain absolute inset-0 opacity-[0.04]" />
    </div>
  );
}
