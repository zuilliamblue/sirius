// src/components/Reveal.tsx
import { useEffect, useRef, useState } from "react";

type Props = {
  children: React.ReactNode;
  /** atraso em ms antes de animar quando entra na tela */
  delay?: number;
  /** duração da animação em ms */
  duration?: number;
  /** deslocamento Y inicial em px (ex.: 8 = “subida” suave) */
  y?: number;
  /** revelar só uma vez (true) ou animar toda vez que entrar (false) */
  once?: boolean;
  /** threshold do observer (0=qualquer pixel visível) */
  threshold?: number;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export default function Reveal({
  children,
  delay = 0,
  duration = 700,
  y = 8,
  once = true,
  threshold = 0.08,
  className = "",
  as = "div",
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // acessibilidade: se usuário prefere menos animação, mostra direto
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) io.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { threshold }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [once, threshold]);

  const Tag: any = as;

  return (
    <Tag
      ref={ref as any}
      className={className}
      style={{
        transitionProperty: "opacity, transform, filter",
        transitionDuration: `${duration}ms`,
        transitionTimingFunction: "ease-out",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${y}px)`,
        filter: visible ? "blur(0px)" : "blur(1px)",
      }}
    >
      {children}
    </Tag>
  );
}
