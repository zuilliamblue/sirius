// src/components/Header.tsx
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  async function handleSignOut() {
    await signOut(auth);
    if (location.pathname !== "/login") navigate("/");
  }

  const firstName =
    user?.displayName?.split(" ")[0] ?? user?.email?.split("@")[0] ?? "";

  return (
    <header className="relative w-full">
      {/* camadas de fundo */}
      <div className="absolute inset-0 bg-black" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(180,140,40,0.25) 35%, rgba(255,215,128,0.28) 55%, rgba(180,140,40,0.25) 75%, rgba(0,0,0,0) 100%)",
        }}
      />

      <div className="relative z-10">
        {/* ===== Layout em COLUNA ===== */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col items-center gap-3 text-center">
          {/* Linha 1: logo + título (lado a lado) */}
          <div className="flex items-center gap-3">
            <img
              src="/brand/SIRIUS.png"
              alt="SIRIUS"
              className="h-10 w-10 object-contain"
              loading="eager"
            />
            <h1 className="text-lg md:text-xl font-semibold tracking-wide italic">
              SIRIUS – HFTs de Alta Performance
            </h1>
          </div>

          {/* Linha 2: Login | Cadastro (ou usuário), EMBAIXO do logo+título */}
          {!user ? (
            <nav className="text-sm">
              <Link
                to="/login"
                className="inline-block px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                Login&nbsp;|&nbsp;Cadastro
              </Link>
            </nav>
          ) : (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={firstName}
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center text-sm">
                    {firstName.slice(0, 1).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-white/90">{firstName}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm transition"
              >
                Sair
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
