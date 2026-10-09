import { useEffect, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { firm } from "../firm";

function itemClass({ isActive }: { isActive: boolean }) {
  return isActive ? "text-link is-active" : "text-link";
}

export function Frame({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (hash) {
      const target = document.querySelector(hash);
      if (target) {
        target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [hash, pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <div className="desk">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <div className="sheet">
        <p className="gutter" aria-hidden="true">
          Hurlingham · Nairobi
        </p>
        <div className="sheet-body">
          <header className="site-header">
            <Link className="wordmark" to="/">
              {firm.shortName}
              <span>Legal Services</span>
            </Link>
            <nav
              id="site-menu"
              className={menuOpen ? "site-nav is-open" : "site-nav"}
              aria-label="Primary"
            >
              <NavLink to="/" end className={itemClass}>
                Home
              </NavLink>
              <NavLink to="/practice" className={itemClass}>
                Practice
              </NavLink>
              <NavLink to="/consultation" className={itemClass}>
                Consultation
              </NavLink>
              <NavLink to="/contact" className={itemClass}>
                Contact
              </NavLink>
            </nav>
            <div className="header-tools">
              <a className="nav-phone" href={`tel:${firm.phone}`}>
                {firm.phone}
              </a>
              <NavLink className="btn btn-small" to="/book">
                Book consultation
              </NavLink>
              <button
                type="button"
                className="menu-toggle"
                aria-expanded={menuOpen}
                aria-controls="site-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                {menuOpen ? "Close" : "Menu"}
              </button>
            </div>
          </header>
          <main id="content">{children}</main>
          <footer className="site-footer">
            <div className="footer-grid">
              <div>
                <p className="footer-name">{firm.name}</p>
                <p className="footer-fact">
                  Hurlingham, Nairobi · {firm.years} years · Regulatory compliance
                </p>
              </div>
              <nav className="footer-links" aria-label="Footer">
                <Link to="/">Home</Link>
                <Link to="/practice">Practice</Link>
                <Link to="/consultation">Consultation</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/book">Book consultation</Link>
              </nav>
              <dl className="footer-spec">
                <div>
                  <dt>Address</dt>
                  <dd>{firm.address}</dd>
                </div>
                <div>
                  <dt>Hours</dt>
                  <dd>{firm.contactHours}</dd>
                </div>
                <div>
                  <dt>Phone</dt>
                  <dd>
                    <a href={`tel:${firm.phone}`}>{firm.phone}</a>
                  </dd>
                </div>
                <div>
                  <dt>WhatsApp</dt>
                  <dd>{firm.whatsapp}</dd>
                </div>
              </dl>
            </div>
            <p className="footer-copy">© {new Date().getFullYear()} {firm.name}</p>
          </footer>
        </div>
      </div>
    </div>
  );
}
