// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Ajuste os caminhos das páginas conforme seu repo:
// se seus arquivos estão em src/pages/Home.tsx e src/pages/Login.tsx, mantenha assim:
import Home from "./pages/Home";
import Login from "./pages/Login";

// Se suas páginas estiverem em outro lugar (ex.: src/Home.tsx), troque os imports acima para:
// import Home from "./Home";
// import Login from "./Login";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-[#0a0f1e] text-white flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
