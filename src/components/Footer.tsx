// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/10 bg-[#0a0c12]">
      {/* pattern pontilhado sutil ao fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[.06]"
        style={{
          backgroundImage:
            "radial-gradient(#ffffff 1px, rgba(0,0,0,0) 1.1px)",
          backgroundSize: "18px 18px",
          backgroundPosition: "center",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-8 text-center text-white">
        <div className="text-sm tracking-wide">Sirius HFT</div>
        <p className="mt-1 text-[11px] italic text-white/70">
          Ganhos passados não são garantias de ganhos futuros — mas com
          estatística e gestão, aumentamos as chances de vencer.
        </p>
      </div>
    </footer>
  );
}
