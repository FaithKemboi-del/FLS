import { useEffect, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { firm } from "../firm";

export function Frame({ children }: { children: ReactNode }) {
  const { hash, pathname } = useLocation();

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
            <nav className="site-nav" aria-label="Primary">
              <Link className="text-link" to="/#practice">
                Practice
              </Link>
              <Link className="text-link" to="/#visit">
                Visit
              </Link>
              <NavLink className="btn btn-small" to="/book">
                Book consultation
              </NavLink>
            </nav>
          </header>
          <main id="content">{children}</main>
          <footer className="site-footer">
            <span>{firm.name}</span>
            <span>{firm.address}</span>
            <span>{firm.phone}</span>
          </footer>
        </div>
      </div>
    </div>
  );
}
