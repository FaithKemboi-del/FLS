import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { firm } from "./content.js";
import Book from "./pages/Book.jsx";
import Home from "./pages/Home.jsx";

function TitleManager() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title =
      pathname === "/book" ? `Book a consultation — ${firm.name}` : firm.name;
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <TitleManager />
      <a className="skip" href="#main">
        Skip to content
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book" element={<Book />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
