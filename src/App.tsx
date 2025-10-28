// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
        {/* Topo */}
        <Header />

        {/* Conteúdo */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            {/* adicione outras rotas aqui quando precisar */}
          </Routes>
        </main>

        {/* Rodapé com aviso em itálico */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
