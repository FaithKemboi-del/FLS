import { useEffect } from "react";
import { Link } from "react-router-dom";
import { firm, practiceAreas, practiceSlug } from "../firm";

export function PracticePage() {
  useEffect(() => {
    document.title = `Practice — ${firm.name}`;
  }, []);

  return (
    <div className="page">
      <div className="page-head">
        <p className="section-index">01</p>
        <div>
          <h1>Practice</h1>
          <ul className="practice-list">
            {practiceAreas.map((area) => (
              <li key={area.title} id={practiceSlug(area.title)} className="practice-entry">
                <article className="practice-row">
                  <div>
                    <h2 className="practice-name">{area.title}</h2>
                    <p className="practice-label">{area.label}</p>
                  </div>
                  <p className="years">
                    <strong>{firm.years}</strong>
                    <span>Years</span>
                  </p>
                </article>
              </li>
            ))}
          </ul>
          <Link className="btn page-book" to="/book">
            Book consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
