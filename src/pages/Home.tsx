// src/pages/Home.tsx
import HeroHFT from "../components/HeroHFT";

export default function Home() {
  return (
    <main>
      <HeroHFT />
      {/* seção âncora "vantagens" (opcional, pode customizar depois) */}
      <section id="vantagens" className="max-w-7xl mx-auto px-4 py-10">
        <h3 className="text-xl font-semibold mb-3">Por que usar nossos HFTs?</h3>
        <p className="text-white/70">
          Segurança de regras claras, execução rápida e rastreabilidade completa.
          Em breve: backtests, relatórios salvos e comparador, tudo integrando sua
          conta.
        </p>
      </section>
    </main>
  );
}
