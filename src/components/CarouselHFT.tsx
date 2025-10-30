// src/components/CarouselHFT.tsx
import { useEffect, useRef, useState } from "react";

type Slide = { src: string; alt: string; caption: string };

const slides: Slide[] = [
  {
    src: "/brand/backtest.png",
    alt: "Backtests e estatísticas dos robôs HFT",
    caption:
      "São dezenas de robôs com estatísticas Dia-a-Dia e Mês-a-Mês desde 2022 para você acompanhar e saber exatamente o potencial de ganho de cada configuração.",
  },
  {
    src: "/brand/robo.png",
    alt: "Regras de coloração por robô",
    caption:
      "Regras de Coloração indicam os pontos de entrada e saída — visão clara e objetiva do operacional.",
  },
  {
    src: "/brand/operacao.png",
    alt: "Operações ao vivo na tela",
    caption:
      "Acompanhe os robôs operando ao vivo direto na sua tela e tenha controle total do seu capital.",
  },
];

export default function CarouselHFT() {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIdx((i) => (i === 0 ? slides.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === slides.length - 1 ? 0 : i + 1));
  const go = (i: number) => setIdx(i);

  // Teclado ← →
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe
  const onTouchStart = (e: React.TouchEvent) =>
    (touchStartX.current = e.touches[0].clientX);
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const delta = e.changedTouches[0].clientX - start;
    if (Math.abs(delta) > 40) (delta > 0 ? prev() : next());
    touchStartX.current = null;
  };

  // Lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const inc = () => setZoom((z) => Math.min(3, +(z + 0.25).toFixed(2)));
  const dec = () => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)));
  const reset = () => setZoom(1);

  return (
    <div className="w-full max-w-[720px] justify-self-center">
      {/* Legenda */}
      <p className="text-[11px] text-white/55 italic mb-2 leading-relaxed text-center">
        {slides[idx].caption}
      </p>

      {/* Área do slide */}
      <div
        className="relative rounded-2xl border border-white/10 shadow-xl overflow-hidden group"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* contador (overlay) */}
        <div className="pointer-events-none absolute right-2 bottom-2 rounded-md bg-black/50 px-2 py-0.5 text-[10px] text-white/70 tracking-wider">
          {idx + 1} / {slides.length}
        </div>

        {/* Imagem (click para ampliar) */}
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setZoom(1);
          }}
          className="block w-full text-left"
          aria-label="Ampliar imagem do slide"
          title="Clique para ampliar"
        >
          <img
            key={slides[idx].src}
            src={slides[idx].src}
            alt={slides[idx].alt}
            className="w-full h-auto"
            loading="eager"
          />
        </button>

        {/* Gradientes laterais (destaque setas) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition" />

        {/* Setas */}
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90"
          aria-label="Slide anterior"
          title="Anterior (←)"
        >
          ‹
        </button>
        <button
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

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute inset-0 m-4 md:m-8 lg:m-10 rounded-xl border border-white/10 bg-black/30 overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 flex justify-end gap-2 p-2 bg-black/30">
              <button onClick={dec} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                −
              </button>
              <button onClick={reset} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                100%
              </button>
              <button onClick={inc} className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                +
              </button>
              <button onClick={() => setOpen(false)} className="ml-2 px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-sm">
                ✕
              </button>
            </div>
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
    </div>
  );
}
