// src/components/HeroHFT.tsx
import { Link } from "react-router-dom";

export default function HeroHFT() {
  return (
    <section className="relative overflow-hidden">
      {/* fundo/gradiente */}
      <div className="absolute inset-0 -z-10">
        <div className="h-full w-full"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 0%, rgba(255,215,128,0.20) 0%, rgba(255,215,128,0.08) 30%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(18,26,46,1) 0%, rgba(12,17,34,1) 100%)",
          }}
        />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
             style={{ background: "conic-gradient(from 45deg, #ffd780, #b68b2a, #ffd780)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight">
              Operar por <span className="text-[#ffd780]">Estatística Pura</span>,<br />
              sem emoção — com nossos <span className="italic">robôs HFT</span>.
            </h2>
            <p className="mt-3 text-white/70 max-w-xl">
              Deixe a tomada de decisão para o algoritmo e acompanhe métricas reais
              em tempo-real. Configure combinações, siga as regras de coloração e
              saiba exatamente onde cada robô entra e sai.
            </p>

            {/* Bullets */}
            <ul className="mt-6 space-y-3 text-white/85">
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Tira a emoção do trader: execução 100% sistemática.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Estatísticas reais e transparência de resultados.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Sala ao vivo e acompanhamento dos robôs.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Dezenas de combinações em um único robô.
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Regras de coloração: pontos de entrada/saída claros.
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-7 flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Começar agora
              </Link>
              <a
                href="#vantagens"
                className="px-5 py-2.5 rounded-xl border border-white/15 hover:border-white/30 transition"
              >
                Ver vantagens
              </a>
            </div>
          </div>

          {/* Mock/ilustração simples sem libs */}
          <div className="relative">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl">
              <div className="h-40 rounded-lg bg-white/5" />
              <div className="mt-4 grid grid-cols-3 gap-3">
                <div className="h-16 rounded-lg bg-white/5" />
                <div className="h-16 rounded-lg bg-white/5" />
                <div className="h-16 rounded-lg bg-white/5" />
              </div>
              <div className="mt-4 h-10 rounded-lg bg-white/5" />
            </div>
            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-xl bg-[#ffd780]/20 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
