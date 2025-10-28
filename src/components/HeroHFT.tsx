// src/components/HeroHFT.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HeroHFT() {
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  // fecha com ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const inc = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const dec = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const reset = () => setZoom(1);

  return (
    <section className="relative overflow-hidden">
      {/* fundo/gradiente */}
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 0%, rgba(255,215,128,0.20) 0%, rgba(255,215,128,0.08) 30%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(18,26,46,1) 0%, rgba(12,17,34,1) 100%)",
          }}
        />
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
          style={{ background: "conic-gradient(from 45deg, #ffd780, #b68b2a, #ffd780)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 md:py-14">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Texto */}
          <div>
            {/* Título centralizado; “Estatística Pura” na linha de baixo */}
            <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-center md:text-left uppercase">
              OPERE POR
              <br />
              <span className="text-[#ffd780]">ESTATÍSTICA PURA!</span>
            </h2>

            {/* Parágrafo em itálico */}
            <p className="mt-3 text-white/70 max-w-xl italic mx-auto md:mx-0">
              Deixe a tomada de decisão para os algoritmos, opere sem sentir medo
              ou culpa quando seus trades dão errado. Aqui você configura os
              parâmetros de acordo com o capital e dá o play nas automações.
            </p>

            {/* Bullets */}
            <ul className="mt-6 space-y-3 text-white/85 max-w-xl mx-auto md:mx-0">
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Robôs 100% Automatizados;
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Ordens Oco, Gain e Stop do dia configurados;
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Estatísticas Reais e Transparência de Resultados;
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Sala ao Vivo Educacional (Aprenda a operar seus Robôs);
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Dezenas de Configurações para 1 único Robô de acordo com o seu capital;
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Regra de Coloração que indica exatamente os pontos de entrada dos robôs;
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 h-5 w-5 rounded-full bg-white/10 grid place-items-center text-sm">✓</span>
                Automação via Profit Pro da Nelógica: você vai ver os robôs operando em tempo real.
              </li>
            </ul>

            {/* CTA */}
            <div className="mt-7 flex gap-3 justify-center md:justify-start">
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

          {/* Imagem à direita + legenda centralizada */}
          <div className="relative">
            {/* legenda pequena centralizada */}
            <p className="text-xs text-white/60 mb-2 leading-relaxed text-center">
              São Dezenas de Robôs com Estatísticas Dia-a-Dia, Mês-a-Mês desde 2022 para você
              acompanhar e saber exatamente o quanto pode arriscar e o potencial de ganho de cada
              configuração. <span className="text-white/80 font-medium">Você no Controle Total!</span>
            </p>

            {/* Imagem clicável (abre lightbox) */}
            <button
              type="button"
              onClick={() => { setOpen(true); setZoom(1); }}
              className="block w-full text-left"
              aria-label="Ampliar imagem de backtests"
              title="Clique para ampliar"
            >
              <img
                src="/brand/backtest.png"
                alt="Backtest e resultados dos robôs HFT"
                className="rounded-2xl border border-white/10 shadow-xl w-full h-auto object-cover transition transform hover:scale-[1.01] cursor-zoom-in"
                loading="eager"
              />
            </button>

            <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-xl bg-[#ffd780]/20 blur-xl pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Lightbox / Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          {/* container para pan/zoom (scroll) */}
          <div
            className="absolute inset-0 m-4 md:m-8 lg:m-10 rounded-xl border border-white/10 bg-black/30 overflow-auto"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar na imagem
          >
            {/* barra superior com fechar */}
            <div className="sticky top-0 flex justify-end gap-2 p-2 bg-black/30">
              <button
                onClick={dec}
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                title="Diminuir zoom"
              >
                −
              </button>
              <button
                onClick={reset}
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                title="Resetar zoom"
              >
                100%
              </button>
              <button
                onClick={inc}
                className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                title="Aumentar zoom"
              >
                +
              </button>
              <button
                onClick={() => setOpen(false)}
                className="ml-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm"
                title="Fechar (Esc)"
              >
                ✕
              </button>
            </div>

            {/* imagem com zoom */}
            <div className="min-h-full w-full grid place-items-center p-3">
              <img
                src="/brand/backtest.png"
                alt="Backtest e resultados dos robôs HFT (ampliado)"
                className="max-w-[95vw] max-h-[90vh] object-contain select-none"
                style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
                draggable={false}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
