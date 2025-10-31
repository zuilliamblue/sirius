// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  // Protege a rota: se não estiver logado, manda para /login
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (!u) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  return (
    <div className="relative min-h-[100svh] w-full overflow-hidden bg-[#0b0c0f] text-zinc-200">
      {/* Glow leve no topo (coeso com a Home) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(1200px 600px at 50% 0%, rgba(255,215,64,.08), rgba(0,0,0,0))",
        }}
      />

      <main className="relative z-10 mx-auto max-w-[1100px] px-6 pt-10 pb-16">
        {/* Título/boas-vindas */}
        <Reveal as="div" delay={0}>
          <div className="mb-8">
            <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-[-0.01em]">
              Olá{user?.displayName ? `, ${user.displayName.split(" ")[0]}` : ""}! 🤖
            </h1>
            <p className="text-zinc-300/90">
              Obrigado por fazer parte da comunidade e dar um passo a mais rumo à sua consistência!
            </p>
          </div>
        </Reveal>

        {/* CARD 1 — Comunidade WhatsApp */}
        <Reveal as="section" delay={80} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
          <h2 className="font-heading text-xl font-bold mb-3">Comunidade Whats</h2>
          <p className="text-zinc-300/90 mb-5">
            Entre no nosso grupo para receber avisos, materiais e tirar dúvidas com a equipe.
          </p>

          <a
            href="https://chat.whatsapp.com/CNUTmPQdxvQH2Is96kErfb"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 rounded-full border border-green-500/40 bg-green-500/10 px-5 py-3 text-sm font-semibold text-green-400 shadow transition hover:bg-green-500/20 active:scale-[.98]"
          >
            {/* Ícone WhatsApp (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="h-5 w-5"
              aria-hidden="true"
              focusable="false"
              fill="currentColor"
            >
              <path d="M19.11 17.39c-.26-.13-1.53-.76-1.77-.85-.24-.09-.41-.13-.59.13-.18.26-.68.85-.83 1.02-.15.17-.31.19-.57.06-.26-.13-1.09-.4-2.08-1.27-.77-.69-1.28-1.53-1.43-1.79-.15-.26-.02-.4.11-.53.11-.11.26-.31.4-.46.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.46-.06-.13-.59-1.42-.81-1.95-.21-.51-.42-.44-.59-.45l-.5-.01c-.17 0-.46.07-.7.32-.24.26-.92.9-.92 2.2 0 1.29.95 2.54 1.09 2.71.13.17 1.87 2.85 4.54 3.99.64.28 1.13.45 1.52.57.64.2 1.23.17 1.69.1.52-.08 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.22-.06-.1-.24-.16-.5-.29z" />
              <path d="M16.01 3.2C9.81 3.2 4.77 8.24 4.77 14.44c0 2.01.54 3.98 1.56 5.71L5 28.8l8.83-1.31a11.18 11.18 0 0 0 2.18.22c6.2 0 11.24-5.04 11.24-11.24S22.21 3.2 16.01 3.2zm0 20.35c-1.86 0-3.61-.5-5.16-1.45l-.37-.22-5.24.78.87-5.12-.24-.39a9.38 9.38 0 0 1-1.41-4.87c0-5.18 4.22-9.4 9.4-9.4s9.4 4.22 9.4 9.4-4.22 9.4-9.4 9.4z" />
            </svg>
            Entrar no grupo do WhatsApp
          </a>
        </Reveal>

        {/* GRID de cards extras */}
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* CARD 2 — Meus Robôs */}
          <Reveal as="section" delay={120} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
            <h3 className="font-heading text-lg font-bold mb-2">Meus Robôs</h3>
            <p className="text-zinc-300/90 mb-5">Acessar minhas estatísticas</p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 active:scale-[.98]"
              title="Em breve"
            >
              Acessar agora
            </button>
          </Reveal>

          {/* CARD 3 — Conhecer todos os Robôs */}
          <Reveal as="section" delay={160} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
            <h3 className="font-heading text-lg font-bold mb-2">Conhecer todos os Robôs</h3>
            <p className="text-zinc-300/90 mb-5">
              Aqui você conhece nosso Pool com todas as configurações possíveis para o seu operacional ser imbatível
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 active:scale-[.98]"
              title="Clique e conheça"
            >
              Clique Aqui
            </a>
          </Reveal>

          {/* CARD 4 — Assinar na Nelogica */}
          <Reveal as="section" delay={200} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
            <h3 className="font-heading text-lg font-bold mb-2">Assinar na Nelogica</h3>
            <p className="text-zinc-300/90 mb-5">
              Escolha seus Robôs e o Plano direto no seu Profit.<br />
              <span className="text-zinc-400">Necessário Profit Pro e Módulo de Automação.</span>
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://nelogica.com.br/estrategias?id=19844"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 active:scale-[.98]"
              >
                Classic
              </a>
              <a
                href="https://nelogica.com.br/estrategias?id=19840"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 active:scale-[.98]"
              >
                Plus
              </a>
              <a
                href="https://www.nelogica.com.br/automacao-de-estrategias?id=modulo-automacoes"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-5 py-2.5 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-400/20 active:scale-[.98]"
              >
                Módulo de Automações
              </a>
            </div>
          </Reveal>

          {/* CARD 5 — Regras de Coloração Grátis */}
          <Reveal as="section" delay={240} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
            <h3 className="font-heading text-lg font-bold mb-2">Regras de Coloração Grátis</h3>
            <p className="text-zinc-300/90 mb-5">
              Adicione as regras de coloração ao seu gráfico para saber exatamente os pontos de entrada de cada Robô.
            </p>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-full border border-yellow-400/40 bg-yellow-400/10 px-5 py-2.5 text-sm font-semibold text-yellow-300 transition hover:bg-yellow-400/20 active:scale-[.98]"
              title="Em breve"
            >
              Baixe Aqui
            </button>
          </Reveal>
        </div>
      </main>
    </div>
  );
}
