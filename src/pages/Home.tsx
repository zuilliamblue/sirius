// src/pages/Home.tsx
import React from "react";
import HeroHFT from "../components/HeroHFT";

export default function Home() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#0b0c0f] text-zinc-200">
      {/* Glow de fundo estilo “hero” */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,215,64,.08), rgba(0,0,0,0))",
        }}
      />

      <main className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1200px] flex-col items-stretch justify-start px-6 py-12">
        {/* HERO com o seu carrossel + bullets/título */}
        <HeroHFT />

        {/* divisória suave */}
        <div className="mx-auto mt-10 h-2 w-44 rounded-full bg-yellow-400/25" />

        {/* Seção “Por que usar nossos HFTs?” — mantendo nossa cópia */}
        <section id="por-que-usar" className="mx-auto mt-12 max-w-[980px] text-center">
          <h2 className="mb-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-zinc-100">
            Por que usar nossos HFTs?
          </h2>
          <p className="mx-auto max-w-[900px] text-base sm:text-lg text-zinc-300/90">
            Segurança nas Operações. Os Robôs possuem regras claras, não há
            dúvidas, eles não sentem medo, possuem uma rápida execução e
            rastreabilidade confiável. Você tem a Estatística e a Probabilidade
            Matemática completamente a seu favor, basta executar o plano com maestria.
          </p>
        </section>
      </main>

      {/* Rodapé curto (remova se já existir globalmente) */}
      <footer className="relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-10 pt-8 text-center text-[13px] text-zinc-400/80">
        © 2025 Sirius HFT — Ganhos passados não garantem ganhos futuros.
      </footer>

      {/* Fade no rodapé */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(11,12,15,1) 70%)",
        }}
      />
    </div>
  );
}
