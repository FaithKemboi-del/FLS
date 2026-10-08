import { useEffect } from "react";
import { Link } from "react-router-dom";
import { firm, practiceAreas } from "../firm";

export function HomePage() {
  useEffect(() => {
    document.title = firm.name;
  }, []);

  return (
    <>
      <section className="hero">
        <p className="eyebrow">
          <span>{firm.name}</span>
          <span className="cobalt-rule" aria-hidden="true" />
          <span className="eyebrow-years">{firm.years} years</span>
        </p>
        <div className="hero-title-row">
          <h1>
            <span className="line">{firm.taglineLead}</span>
            <em className="line">{firm.taglineClose}</em>
          </h1>
          <div className="place-lockup">
            <span className="cobalt-tick" aria-hidden="true" />
            <div>
              <p className="place-name">{firm.neighbourhood}</p>
              <p>{firm.cityLine}</p>
              <p className="place-hours">Open {firm.hours}</p>
            </div>
          </div>
        </div>
        <Link className="btn hero-book" to="/book">
          Book consultation
        </Link>
      </section>

      <section className="section" id="practice">
        <p className="section-index">01</p>
        <div>
          <h2>Areas of practice</h2>
          <ul className="practice-list">
            {practiceAreas.map((area) => (
              <li key={area.title}>
                <article className="practice-row">
                  <div>
                    <h3>{area.title}</h3>
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
        </div>
      </section>

      <section className="section" id="visit">
        <p className="section-index">02</p>
        <div>
          <h2>Visit</h2>
          <p className="place-display">{firm.neighbourhood}</p>
          <dl className="spec">
            <div>
              <dt>Address</dt>
              <dd>{firm.address}</dd>
            </div>
            <div>
              <dt>Hours</dt>
              <dd>{firm.hours}</dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd>{firm.phone}</dd>
            </div>
            <div>
              <dt>WhatsApp</dt>
              <dd>{firm.whatsapp}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="section" id="consult">
        <p className="section-index">03</p>
        <div>
          <h2>Consultation</h2>
          <p className="consult-line">Weekdays, {firm.hours}.</p>
          <Link className="btn" to="/book">
            Book consultation
          </Link>
        </div>
      </section>
    </>
  );
}
