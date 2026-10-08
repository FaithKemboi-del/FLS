import { Navigate, Route, Routes } from "react-router-dom";
import { Frame } from "./components/Frame";
import { BookPage } from "./pages/BookPage";
import { HomePage } from "./pages/HomePage";

export default function App() {
  return (
    <Frame>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Frame>
  );
}
