// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase";
import { useNavigate } from "react-router-dom";

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
        <div className="mb-8">
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-[-0.01em]">
            Olá{user?.displayName ? `, ${user.displayName.split(' ')[0]}` : ""}! 👋
          </h1>
          <p className="text-zinc-300/90">
            Bem-vindo ao seu painel. Aqui vamos concentrar acessos rápidos, materiais
            e suas funcionalidades dos HFTs.
          </p>
        </div>

        {/* Card principal: entrar no grupo do WhatsApp */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-lg">
          <h2 className="font-heading text-xl font-bold mb-3">Comunidade</h2>
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
              <path d="M19.11 17.39c-.26-.13-1.53-.76-1.77-.85-.24-.09-.41-.
