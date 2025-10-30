// src/components/HeroHFT.tsx
import { useEffect, useRef, useState } from "react";

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export default function HeroHFT() {
  // Slides (imagens em /public/brand)
  const slides: Slide[] = [
    {
      src: "/brand/backtest.png",
      alt: "Backtests e estatísticas dos robôs HFT",
      caption:
        "São Dezenas de Robôs com Estatísticas Dia-a-Dia, Mês-a-Mês desde 2022 para você acompanhar e saber exatamente o quanto pode arriscar e o potencial de ganho de cada configuração. Você no Controle Total!",
    },
    {
      src: "/brand/robo.png",
      alt: "Regras de coloração por robô",
      caption:
        "Regras de Coloração para cada tipo de Robô, assim você consegue saber exatamente onde ele deve entrar na compra e na venda.",
    },
    {
      src: "/brand/operacao.png",
      alt: "Operações ao vivo na tela",
      caption:
        "Acompanhe os robôs operando ao vivo direto na sua tela, saiba exatamente o que eles estão fazendo e tenha total controle sobre o seu capital.",
    },
  ];

  const [idx, setIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));
  const go = (i: number) => setIdx(i);

  // Navegar com ← →
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe mobile
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    const start = touchStartX.current;
    if (start == null) return;
    const end = e.changedTouches[0].clientX;
    const delta = end - start;
    if (Math.abs(delta) > 40) (delta > 0 ? prev() : next());
    touchStartX.current = null;
  }

  // Lightbox
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const inc = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const dec = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const reset = () => setZoom(1);
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* fundo/gradiente */}
      <div className="absolute inset-0 -z-10">
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(1200px 600px at 20% 0%, rgba(255,215,128,0.20) 0%, rgba(255,215,128,0.08) 30%, rgba(0,0,0,0) 70%), linear-gradient(180deg, rgba(11,12,17,1) 0%, rgba(8,9,13,1) 100%)",
          }}
        />
        <div
          className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-25"
          style={{ background: "conic-gradient(from 45deg, #ffd780, #b68b2a, #ffd780)" }}
        />
      </div>

<div className="max-w-7xl mx-auto px-4 py-10 md:py-14 min-h-[86svh] flex items-center">
<div className="grid md:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Texto */}
          <div>
            {/* Título centralizado; “Estatística Pura” na linha de baixo */}
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-[-0.02em] text-center md:text-left uppercase">
              OPERE POR
              <br />
          <span
            className="text-[#ffd780]"
            style={{
              textShadow:
                "0 0 8px rgba(255,215,128,.35), 0 0 22px rgba(255,215,128,.25)",
            }}
>
            ESTATÍSTICA PURA!
          </span>
            </h2>

            {/* Parágrafo em itálico */}
            <p className="mt-3 text-white/70 max-w-xl italic mx-auto md:mx-0">
              Deixe a tomada de decisão para os algoritmos, opere sem sentir medo
              ou culpa quando seus trades dão errado. Aqui você configura os
              parâmetros de acordo com o capital e dá o play nas automações.
            </p>

            {/* Bullets com EMOJIS */}
            <ul className="mt-6 space-y-3 text-white/85 max-w-xl mx-auto md:mx-0">
              <li className="flex gap-3">
                <span className="select-none">🤖</span>
                Robôs 100% Automatizados;
              </li>
              <li className="flex gap-3">
                <span className="select-none">🎯</span>
                Ordens OCO, Gain e Stop do dia configurados;
              </li>
              <li className="flex gap-3">
                <span className="select-none">📊</span>
                Estatísticas Reais e Transparência de Resultados;
              </li>
              <li className="flex gap-3">
                <span className="select-none">🎥</span>
                Sala ao Vivo Educacional (Aprenda a operar seus Robôs);
              </li>
              <li className="flex gap-3">
                <span className="select-none">🧩</span>
                Dezenas de Configurações para 1 único Robô de acordo com o seu capital;
              </li>
              <li className="flex gap-3">
                <span className="select-none">🎨</span>
                Regra de Coloração que indica exatamente os pontos de entrada dos robôs;
              </li>
              <li className="flex gap-3">
                <span className="select-none">🖥️</span>
                Automação via Profit Pro da Nelógica: você vai ver os robôs operando em tempo real.
              </li>
            </ul>
          </div>

          {/* Carrossel à direita (clicável para ampliar) */}
          <div className="relative select-none">
            {/* legenda dinâmica centralizada */}
            <p className="text-xs text-white/60 mb-2 leading-relaxed text-center">
              {slides[idx].caption}
            </p>

            {/* Área do slide */}
            <div
              className="relative rounded-2xl border border-white/10 shadow-xl overflow-hidden group"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Imagem atual (CLICÁVEL) */}
              <button
                type="button"
                onClick={() => { setOpen(true); setZoom(1); }}
                className="block w-full text-left"
                aria-label="Ampliar imagem do slide"
                title="Clique para ampliar"
              >
                <img
                  key={slides[idx].src}
                  src={slides[idx].src}
                  alt={slides[idx].alt}
                  className="w-full h-auto object-cover transition transform hover:scale-[1.01] cursor-zoom-in"
                  loading="eager"
                />
              </button>

              {/* Gradientes laterais para destacar as setas */}
              <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

              {/* Setas */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90"
                aria-label="Slide anterior"
                title="Anterior (←)"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90"
                aria-label="Próximo slide"
                title="Próximo (→)"
              >
                ›
              </button>

              {/* Indicadores */}
              <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === idx ? "w-6 bg-white" : "w-2.5 bg-white/50 hover:bg-white/70"
                    }`}
                    aria-label={`Ir para o slide ${i + 1}`}
                    title={`Slide ${i + 1} de ${slides.length}`}
                  />
                ))}
              </div>
            </div>

            {/* contador opcional */}
            <div className="mt-2 text-center text-[10px] text-white/40">
              {idx + 1} / {slides.length}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Modal para ampliar a IMAGEM DO SLIDE ATUAL */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0 m-4 md:m-8 lg:m-10 rounded-xl border border-white/10 bg-black/30 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* barra superior */}
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

            {/* imagem atual com zoom */}
            <div className="min-h-full w-full grid place-items-center p-3">
              <img
                src={slides[idx].src}
                alt={`${slides[idx].alt} (ampliado)`}
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
