import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { BookingProvider } from "./BookingProvider";
import App from "./App";
import "@fontsource-variable/fraunces/opsz.css";
import "@fontsource-variable/fraunces/opsz-italic.css";
import "@fontsource-variable/schibsted-grotesk/wght.css";
import "./index.css";

const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BookingProvider>
      <BrowserRouter basename={basename === "" ? undefined : basename}>
        <App />
      </BrowserRouter>
    </BookingProvider>
  </StrictMode>,
);
