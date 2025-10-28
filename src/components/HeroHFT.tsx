// src/components/HeroHFT.tsx
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

type Slide = {
  src: string;
  alt: string;
  caption: string;
};

export default function HeroHFT() {
  // Slides do carrossel (imagens na pasta /public/brand)
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

  // Navegação por teclado ← →
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Swipe simples em mobile
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
          {/* Texto (mantive como antes; sem os CTAs) */}
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
          </div>

          {/* Carrossel à direita */}
          <div className="relative select-none">
            {/* Legenda dinâmica centralizada */}
            <p className="text-xs text-white/60 mb-2 leading-relaxed text-center">
              {slides[idx].caption}
            </p>

            {/* Área do slide */}
            <div
              className="relative rounded-2xl border border-white/10 shadow-xl overflow-hidden group"
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Imagem atual */}
              <img
                key={slides[idx].src}
                src={slides[idx].src}
                alt={slides[idx].alt}
                className="w-full h-auto object-cover"
                loading="eager"
              />

              {/* Gradiente nas laterais para destaque das setas */}
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

              {/* Indicadores (bolinhas) */}
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
    </section>
  );
}
