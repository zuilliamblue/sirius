// src/pages/Home.tsx
import React from "react";
import HeroHFT from "../components/HeroHFT";

/**
 * Shell da Home que:
 * - Mantém 100% da formatação do seu HeroHFT (sem text-center / sem cores herdadas).
 * - Adiciona apenas o fundo escuro com brilho radial por trás (-z-10).
 * - Mantém a seção “Por que usar nossos HFTs?” com o seu texto.
 */
export default function Home() {
  return (
    <div className="relative min-h-[100svh] bg-[#0b0c0f] isolation-auto">
      {/* Glow de fundo (atrás de tudo) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,215,64,.08), rgba(0,0,0,0))",
        }}
      />

      {/* === SEU HERO COM CARROSSEL INTACTO === */}
      <HeroHFT />

      {/* divisória suave */}
      <div className="mx-auto mt-10 h-2 w-44 rounded-full bg-yellow-400/25" />

      {/* “Por que usar nossos HFTs?” – mantendo seu texto/alinhamento sem forçar centro global */}
      <section
        id="por-que-usar"
        className="mx-auto mt-12 max-w-[1100px] px-6 py-2"
      >
      <h2 className="font-heading mb-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-zinc-100">
          Por que usar nossos HFTs?
        </h2>
        <p className="max-w-[900px] text-base sm:text-lg leading-relaxed text-zinc-300/90">
          Segurança nas Operações. Os Robôs possuem regras claras, não há
          dúvidas, eles não sentem medo, possuem uma rápida execução e
          rastreabilidade confiável. Você tem a Estatística e a Probabilidade
          Matemática completamente a seu favor, basta executar o plano com
          maestria.
        </p>
      </section>

      {/* Rodapé leve (remova se já existir globalmente) */}
      <footer className="mx-auto w-full max-w-[1100px] px-6 pb-10 pt-8 text-center text-[13px] text-zinc-400/80">
        © 2025 Sirius HFT — Ganhos passados não garantem ganhos futuros.
      </footer>
    </div>
  );
}
