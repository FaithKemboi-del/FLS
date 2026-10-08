import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { firm } from "../firm";

export function NotFoundPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Page not found — ${firm.name}`}
        description={`This page is not on the ${firm.name} site.`}
      />
      <div className="page-head">
        <p className="section-index">404</p>
        <div>
          <h1>This page is not here.</h1>
          <p className="summary">The address does not match a page on this site.</p>
          <div className="page-actions">
            <Link className="btn" to="/">
              Home
            </Link>
            <Link className="text-link" to="/contact">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
