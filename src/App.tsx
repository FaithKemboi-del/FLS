import { Route, Routes } from "react-router-dom";
import { Frame } from "./components/Frame";
import { BookPage } from "./pages/BookPage";
import { ConsultationPage } from "./pages/ConsultationPage";
import { ContactPage } from "./pages/ContactPage";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { PracticePage } from "./pages/PracticePage";

export default function App() {
  return (
    <Frame>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/book" element={<BookPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Frame>
  );
}
