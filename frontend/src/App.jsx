// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Rutas futuras (para que no rompa al navegar) */}
      <Route path="/catalog" element={<div className="container py-5">Catálogo</div>} />
      <Route path="/about" element={<div className="container py-5">Nosotros</div>} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
