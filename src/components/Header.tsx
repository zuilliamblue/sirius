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
    // totalmente transparente, sem borda/gradiente/linha
    <header className="w-full bg-transparent">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex flex-col items-center gap-3 text-center">
          {/* logo + título */}
          <div className="flex items-center gap-3">
            <img
              src="/brand/SIRIUS.png"
              alt="SIRIUS"
              className="h-10 w-10 object-contain"
              loading="eager"
            />
            <h1 className="font-heading text-lg md:text-xl font-semibold tracking-wide italic text-white">
              SIRIUS — HFTs de Alta Performance
            </h1>
          </div>

          {/* login/cadastro ou usuário */}
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
      </div>
    </header>
  );
}
