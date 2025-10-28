// src/lib/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  setPersistence,
  browserLocalPersistence,
  OAuthProvider, 
} from "firebase/auth";
import { getAnalytics, isSupported } from "firebase/analytics";
import { FacebookAuthProvider } from "firebase/auth";

// === Seu config (do Console) ===
const firebaseConfig = {
  apiKey: "AIzaSyD6Y8-_kSBZEE_PGxyvCCrOHyJ8g1Xbfj4",
  authDomain: "sirius-348a0.firebaseapp.com",
  projectId: "sirius-348a0",
  storageBucket: "sirius-348a0.firebasestorage.app",
  messagingSenderId: "1023601252115",
  appId: "1:1023601252115:web:50cbc99b007ccf3b85ace6",
  measurementId: "G-DJ0V4BP4TV",
};

// Evita re-inicializar no HMR do Vite
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth (fica logado entre sessões)
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence);

// Provedor Google
export const googleProvider = new GoogleAuthProvider();
// googleProvider.setCustomParameters({ prompt: "select_account" }); // opcional


// 👉 Provider Microsoft (aceita ambos por padrão; se quiser só contas pessoais, use tenant: "consumers")
export const microsoftProvider = new OAuthProvider("microsoft.com");
// microsoftProvider.setCustomParameters({ tenant: "consumers" }); // opcional

export const facebookProvider = new FacebookAuthProvider(); 

// Analytics (só se suportado, para não quebrar no dev)
isSupported().then((ok) => {
  if (ok) getAnalytics(app);
});
