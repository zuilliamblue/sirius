// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="min-h-screen bg-[#0a0b10] text-white flex flex-col">      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>

      {/* Rodapé com HFT + aviso em itálico (pequeno) */}
      <footer className="mt-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center">
          <div className="text-sm text-white/80 tracking-wide">© {new Date().getFullYear()} Sirius HFT</div>
          <p className="mt-1 text-[11px] italic text-white/50">
            Ganhos Passados não são Garantias de Ganhos Futuros, mas com as Estatísticas temos Grandes Chances de Ganhar !
          </p>
        </div>
      </footer>
    </div>
  );
}
