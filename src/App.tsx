import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      <footer className="mt-auto border-t border-white/10 py-6 text-center text-white/60 text-sm">
        © {new Date().getFullYear()} Sirius HFT
      </footer>
    </div>
  );
}
