import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { firm, practiceAreas, practiceSlug } from "../firm";

export function PracticePage() {
  return (
    <div className="page">
      <PageMeta
        title={`Practice — ${firm.name}`}
        description="Regulatory compliance at Forthright Legal Services: licensing and permits, compliance reviews and audits, regulator correspondence, policies and training, and ongoing advisory."
      />
      <div className="page-head">
        <p className="section-index">01</p>
        <div>
          <h1>Practice</h1>
          {practiceAreas.map((area) => (
            <article key={area.title} id={practiceSlug(area.title)} className="practice-entry">
              <h2 className="practice-name">{area.title}</h2>
              <p className="summary">{area.summary}</p>
              <p className="years practice-years">
                <strong>{firm.years}</strong>
                <span>Years</span>
              </p>
              <ol className="cover-list">
                {area.covers.map((item, index) => (
                  <li key={item.title} id={practiceSlug(item.title)}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </article>
          ))}
          <Link className="btn page-book" to="/book">
            Book consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
