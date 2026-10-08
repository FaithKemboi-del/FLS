import { Link } from "react-router-dom";
import BookingFlow from "../components/BookingFlow.jsx";
import ContactStrip from "../components/ContactStrip.jsx";
import { firm } from "../content.js";

export default function Book() {
  return (
    <main id="main" className="page book" tabIndex={-1}>
      <header className="book-bar no-print">
        <Link className="wordmark" to="/">
          {firm.name}
        </Link>
        <Link className="text-link" to="/">
          Home
        </Link>
      </header>
      <BookingFlow />
      <div className="book-contact no-print">
        <ContactStrip />
      </div>
    </main>
  );
}
