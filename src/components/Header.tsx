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
    // Header transparente e enxuto
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-4 py-2">
        {/* grid 3 colunas: esquerda = login, centro = logo, direita vazia */}
        <div className="grid grid-cols-3 items-center">
          {/* ESQUERDA: Login/Cadastro (ou usuário logado) */}
          <div className="justify-self-start">
            {!user ? (
              <nav className="text-sm">
                <Link
                  to="/login"
                  className="inline-block px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
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
                    <div className="h-8 w-8 rounded-full bg-white/10 grid place-items-center text-sm text-white">
                      {firstName.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-white/90">{firstName}</span>
                </div>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-sm text-white transition"
                >
                  Sair
                </button>
              </div>
            )}
          </div>

          {/* CENTRO: apenas o logo (maior e centralizado) */}
          <div className="justify-self-center">
            <img
              src="/brand/SIRIUS.png"
              alt="Sirius"
              className="h-12 w-auto md:h-14 lg:h-16 object-contain"
              loading="eager"
            />
          </div>

          {/* DIREITA: espaço reservado (em branco) para manter o centro perfeito */}
          <div className="justify-self-end" />
        </div>
      </div>
    </header>
  );
}
