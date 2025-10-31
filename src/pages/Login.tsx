// src/pages/Login.tsx
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import {
  auth,
  googleProvider,
  microsoftProvider,
  facebookProvider,
} from "../lib/firebase";

import {
  signInWithPopup,
  fetchSignInMethodsForEmail,
  linkWithCredential,
  linkWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 👉 Helper para enviar SEMPRE ao Dashboard
  const goToDashboard = () => navigate("/dashboard", { replace: true });

  // 👉 Se já estiver logado e cair no /login, manda pro dashboard
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) goToDashboard();
    });
    return () => unsub();
  }, []);

  // ———————————————————————————————————————————————————————————————
  // Tratador universal para "account-exists-with-different-credential"
  async function resolveAccountExists(
    err: any,
    from: "google" | "facebook" | "microsoft"
  ) {
    const email = err?.customData?.email as string | undefined;
    if (!email) throw err;

    // credencial "pendente" do provedor que falhou agora
    let pendingCred: any = null;
    if (from === "google") {
      pendingCred = GoogleAuthProvider.credentialFromError(err);
    } else if (from === "facebook") {
      pendingCred = FacebookAuthProvider.credentialFromError(err);
    } else {
      pendingCred = OAuthProvider.credentialFromError(err);
    }
    if (!pendingCred) throw err;

    // quais provedores já existem para esse e-mail?
    const methods = await fetchSignInMethodsForEmail(auth, email);

    // escolhe com qual provedor devemos logar primeiro
    let existing: "google.com" | "microsoft.com" | "facebook.com" | "password" | null =
      null;

    if (methods.includes("google.com")) existing = "google.com";
    else if (methods.includes("microsoft.com")) existing = "microsoft.com";
    else if (methods.includes("facebook.com")) existing = "facebook.com";
    else if (methods.includes("password")) existing = "password";

    if (!existing) {
      throw new Error(
        `Esta conta já existe com: ${methods.join(
          ", "
        )}. Faça login por esse provedor e tente novamente.`
      );
    }

    if (existing === "password") {
      // Se um dia você habilitar e-mail/senha, aqui você pode pedir a senha
      // e depois fazer: linkWithCredential(user, pendingCred)
      throw new Error(
        "Este e-mail já foi cadastrado com senha. Faça login por e-mail/senha e depois vincule o novo provedor nas configurações da conta."
      );
    }

    // 1) faz login com o provedor existente
    const result =
      existing === "google.com"
        ? await signInWithPopup(auth, googleProvider)
        : existing === "microsoft.com"
        ? await signInWithPopup(auth, microsoftProvider)
        : await signInWithPopup(auth, facebookProvider);

    // 2) vincula a credencial pendente (do provedor novo)
    await linkWithCredential(result.user, pendingCred);

    // pronto: usuário agora tem os dois provedores
    return result.user;
  }
  // ———————————————————————————————————————————————————————————————

  async function signInOrLink(
    provider: GoogleAuthProvider | FacebookAuthProvider | OAuthProvider,
    from: "google" | "facebook" | "microsoft",
    onSuccess: () => void,
    onError: (msg: string) => void,
    resolver: (err: any, from: "google" | "facebook" | "microsoft") => Promise<any>
  ) {
    try {
      // Se já existe usuário logado, vincula o novo provedor
      if (auth.currentUser) {
        await linkWithPopup(auth.currentUser, provider);
        onSuccess();
        return;
      }

      // Senão, fluxo normal de login por popup
      await signInWithPopup(auth, provider);
      onSuccess();
    } catch (err: any) {
      if (err?.code === "auth/account-exists-with-different-credential") {
        try {
          // Resolve automaticamente: loga com o provedor existente e linka o novo
          await resolver(err, from);
          onSuccess();
        } catch (e: any) {
          onError(e?.message ?? "Falha ao vincular conta.");
        }
        return;
      }

      // Mensagem amigável se o usuário fechou o popup
      if (err?.code === "auth/popup-closed-by-user") {
        onError("Janela fechada antes de concluir o login.");
      } else {
        onError(err?.message ?? "Falha ao autenticar.");
      }
    }
  }

  async function handleGoogle() {
    setLoading(true);
    setError(null);
    await signInOrLink(
      googleProvider,
      "google",
      goToDashboard, // 👉 sempre para /dashboard
      (msg) => setError(msg),
      resolveAccountExists
    );
    setLoading(false);
  }

  async function handleMicrosoft() {
    setLoading(true);
    setError(null);
    await signInOrLink(
      microsoftProvider,
      "microsoft",
      goToDashboard, // 👉 sempre para /dashboard
      (msg) => setError(msg),
      resolveAccountExists
    );
    setLoading(false);
  }

  async function handleFacebook() {
    setLoading(true);
    setError(null);
    await signInOrLink(
      facebookProvider,
      "facebook",
      goToDashboard, // 👉 sempre para /dashboard
      (msg) => setError(msg),
      resolveAccountExists
    );
    setLoading(false);
  }

  return (
    <main className="flex-1">
      <section className="max-w-md mx-auto px-4 py-10">
        <div className="rounded-2xl bg-black/50 border border-white/10 shadow-xl p-6">
          <h1 className="text-center text-2xl font-semibold text-white">
            Acessar sua conta
          </h1>
          <p className="text-center text-sm text-white/70 mt-1">
            Faça login para acessar seus backtests.
          </p>

          {error && (
            <div className="mt-4 rounded-lg border border-red-400/40 bg-red-500/10 text-red-200 text-sm p-3">
              {String(error)}
            </div>
          )}

          <div className="mt-6 grid gap-3">
            {/* Google */}
            <button
              type="button"
              onClick={handleGoogle}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-white text-black font-medium py-2.5 shadow hover:brightness-95 active:scale-[0.99] transition disabled:opacity-60"
            >
              {/* ícone Google */}
              <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
                <path
                  fill="#FFC107"
                  d="M43.611 20.083H42V20H24v8h11.303C33.657 31.66 29.223 35 24 35c-6.627 0-12-5.373-12-12S17.373 11 24 11c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.676 4.038 29.627 2 24 2 10.745 2 0 12.745 0 26s10.745 24 24 24 24-10.745 24-24c0-1.627-.167-3.217-.389-4.917z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.817C14.69 16.169 18.994 13 24 13c3.059 0 5.842 1.156 7.961 3.039l5.657-5.657C34.676 4.038 29.627 2 24 2 16.318 2 9.656 6.337 6.306 14.691z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 48c5.166 0 9.86-1.979 13.409-5.197l-6.191-5.238C29.195 39.471 26.73 40 24 40c-5.173 0-9.587-3.293-11.182-7.892l-6.6 5.086C9.52 43.661 16.23 48 24 48z"
                />
                <path
                  fill="#1976D2"
                  d="M43.611 20.083H42V20H24v8h11.303c-1.306 3.66-5.74 7-11.303 7-5.173 0-9.587-3.293-11.182-7.892l-6.6 5.086C9.52 43.661 16.23 48 24 48c7.732 0 14.5-4.184 18-10.5 2.083-3.611 3.611-8.277 3.611-13.5 0-1.627-.167-3.217-.389-4.917z"
                />
              </svg>
              Entrar com Google
            </button>

            {/* Microsoft */}
            <button
              type="button"
              onClick={handleMicrosoft}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-neutral-900 text-white font-medium py-2.5 border border-white/10 shadow hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
            >
              {/* ícone Microsoft */}
              <svg width="18" height="18" viewBox="0 0 23 23" aria-hidden="true">
                <path fill="#f25022" d="M1 1h10v10H1z" />
                <path fill="#00a4ef" d="M12 1h10v10H12z" />
                <path fill="#7fba00" d="M1 12h10v10H1z" />
                <path fill="#ffb900" d="M12 12h10v10H12z" />
              </svg>
              Entrar com Microsoft
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={handleFacebook}
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl bg-[#1877F2] text-white font-medium py-2.5 shadow hover:brightness-110 active:scale-[0.99] transition disabled:opacity-60"
            >
              {/* ícone Facebook */}
              <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.1 5.66 21.17 10.44 22v-7.02H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.62.77-1.62 1.56v1.87h2.76l-.44 2.91h-2.32V22C18.34 21.17 22 17.1 22 12.07z"
                />
              </svg>
              Entrar com Facebook
            </button>
          </div>

          <p className="mt-6 text-xs text-center text-white/50">
            Ao continuar, você concorda com nossos{" "}
            <Link to="/terms" className="underline hover:opacity-80">
              Termos
            </Link>{" "}
            e{" "}
            <Link to="/privacy" className="underline hover:opacity-80">
              Política de Privacidade
            </Link>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
