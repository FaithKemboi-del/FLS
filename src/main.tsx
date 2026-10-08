import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BookingProvider } from "./BookingProvider";
import App from "./App";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/schibsted-grotesk/wght.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookingProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </BookingProvider>
  </StrictMode>,
);
