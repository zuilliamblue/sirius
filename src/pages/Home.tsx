// src/pages/Home.tsx
import HeroHFT from "../components/HeroHFT";

export default function Home() {
  return (
    <div className="relative min-h-[100svh] bg-[#0b0c0f] isolate text-white">
      {/* Glow global no topo (não interfere no Hero) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,215,64,.10), rgba(0,0,0,0))",
        }}
      />

      {/* HERO com seu carrossel/título/bullets intactos */}
      <HeroHFT />

      {/* separador */}
      <div className="mx-auto mt-10 h-2 w-44 rounded-full bg-yellow-400/25" />

      {/* Seção com pattern pontilhado e tipografia no estilo */}
      <section id="por-que-usar" className="relative mx-auto mt-12 max-w-[1100px] px-6 py-10 rounded-2xl">
        {/* pattern pontilhado */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-2xl"
          style={{
            background:
              "radial-gradient(#ffffff 1px, rgba(0,0,0,0) 1.1px)",
            backgroundSize: "18px 18px",
            backgroundPosition: "center",
            opacity: 0.06,
          }}
        />
        {/* leve glow por trás da caixa */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-20 rounded-2xl"
          style={{
            boxShadow: "0 0 120px 0 rgba(255,215,128,.08) inset",
          }}
        />

        <h2 className="font-heading mb-3 text-2xl sm:text-3xl font-extrabold tracking-[-0.01em] text-zinc-50">
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
    </div>
  );
}
