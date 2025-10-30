// src/pages/Home.tsx  (ou Home.jsx, se seu projeto não estiver em TS)
import React from "react";
import HeroHFT from "../components/HeroHFT";

/** 
 * Home no estilo "hero centralizado" mantendo seu conteúdo original.
 * - Fundo escuro com brilho radial
 * - Headline grande com destaque amarelo (glow sutil)
 * - Subtítulo com o seu texto
 * - Bullets com emojis (como você pediu)
 * - Seção "Por que usar nossos HFTs?"
 * Somente Tailwind; nenhuma lib extra.
 */

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="relative inline-block font-extrabold text-yellow-300"
      style={{
        textShadow:
          "0 0 8px rgba(250, 204, 21, .35), 0 0 22px rgba(250, 204, 21, .25)",
      }}
    >
      {children}
    </span>
  );
}

function Bullet({
  emoji,
  children,
}: {
  emoji: string;
  children: React.ReactNode;
}) {
  return (
    <li className="flex items-start gap-3 text-zinc-200/95">
      <span className="text-xl leading-6">{emoji}</span>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

export default function Home() {
  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#0b0c0f] text-zinc-200">
      {/* Glow de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,215,64,.08), rgba(0,0,0,0))",
        }}
      />

      <main className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1100px] flex-col items-center justify-center px-6 py-16 text-center">
        {/* Badge opcional (pode editar/ocultar) */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 px-4 py-2 text-[13px] font-medium text-yellow-300 backdrop-blur">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-yellow-400" />
          Estatística & Robôs – Transparência e Controle
        </div>

        {/* Headline com o seu título */}
        <h1 className="mx-auto mb-5 max-w-[980px] font-black leading-tight tracking-[-0.02em]
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
          OPERE POR <Highlight>ESTATÍSTICA PURA!</Highlight>
        </h1>

        {/* Subtítulo (mantendo seu texto) */}
        <p className="mx-auto mb-10 max-w-[900px] text-base sm:text-lg md:text-xl text-zinc-300/90">
          Deixe a tomada de decisão para os algoritmos, opere sem sentir medo
          ou culpa quando seus trades dão errado. Aqui você configura os
          parâmetros de acordo com o capital e dá o play nas automações.
        </p>

        {/* CTAs (opcionais) */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#vantagens"
            className="rounded-xl border border-yellow-400/40 bg-yellow-400/15 px-6 py-3 text-sm font-semibold text-yellow-300 shadow
                       transition hover:border-yellow-400/60 hover:bg-yellow-400/25"
          >
            Ver vantagens
          </a>
          <a
            href="#por-que-usar"
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-zinc-100 shadow
                       transition hover:border-white/20 hover:bg-white/10"
          >
            Por que usar nossos HFTs?
          </a>
        </div>

        {/* === SEU HERO COM CARROSSEL INTACTO === */}
      <HeroHFT />

        {/* Espaço entre blocos */}
        <div className="mt-10 h-2 w-44 rounded-full bg-yellow-400/30" />

        {/* Seção "Por que usar..." (mantendo seu texto) */}
        <section
          id="por-que-usar"
          className="mx-auto mt-12 max-w-[980px] text-left sm:text-center"
        >
          <h2 className="mb-4 text-2xl font-extrabold tracking-[-0.01em] text-zinc-100 sm:text-3xl">
            Por que usar nossos HFTs?
          </h2>
          <p className="text-base sm:text-lg text-zinc-300/90">
            Segurança nas Operações. Os Robôs possuem regras claras, não há
            dúvidas, eles não sentem medo, possuem uma rápida execução e
            rastreabilidade confiável. Você tem a Estatística e a
            Probabilidade Matemática completamente a seu favor, basta executar
            o plano com maestria.
          </p>
        </section>
      </main>


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
