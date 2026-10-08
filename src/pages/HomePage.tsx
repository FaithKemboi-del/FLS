import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import {
  consultationSteps,
  feeSentence,
  firm,
  practiceAreas,
  practiceSlug,
} from "../firm";

export function HomePage() {
  return (
    <>
      <PageMeta
        title={firm.name}
        description={`${firm.name}. Global legal strategy, local precision. ${firm.address}. Regulatory compliance. Weekdays, ${firm.hours}.`}
      />
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
              <p className="place-hours">Weekdays, {firm.hours}</p>
            </div>
          </div>
        </div>
        <Link className="btn hero-book" to="/book">
          Book consultation
        </Link>
        <p className="fact-line">
          <span>Hurlingham, Nairobi</span>
          <span>{firm.years} years</span>
          <span>Regulatory compliance</span>
        </p>
      </section>

      <section className="section" id="practice">
        <p className="section-index">01</p>
        <div>
          <h2>Practice</h2>
          {practiceAreas.map((area) => (
            <article key={area.title} className="overview">
              <h3 className="practice-name">
                <Link to={`/practice#${practiceSlug(area.title)}`}>{area.title}</Link>
              </h3>
              <p className="summary">{area.summary}</p>
              <ul className="cover-index">
                {area.covers.map((item) => (
                  <li key={item.title}>
                    <Link to={`/practice#${practiceSlug(item.title)}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <p className="section-link">
            <Link className="text-link" to="/practice">
              The practice
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="how">
        <p className="section-index">02</p>
        <div>
          <h2>How a consultation works</h2>
          <p className="summary">{feeSentence}.</p>
          <ol className="work-steps">
            {consultationSteps.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <p className="section-link">
            <Link className="text-link" to="/consultation">
              Consultation details
            </Link>
          </p>
        </div>
      </section>

      <section className="section" id="hours">
        <p className="section-index">03</p>
        <div>
          <h2>Contact</h2>
          <p className="place-display">{firm.neighbourhood}</p>
          <dl className="spec">
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
          <p className="section-link">
            <Link className="text-link" to="/contact">
              Contact and map
            </Link>
          </p>
        </div>
      </section>

      <section className="section close-band" id="consult">
        <p className="section-index">04</p>
        <div>
          <h2>Book a consultation</h2>
          <p className="consult-line">Weekdays, {firm.hours}.</p>
          <Link className="btn" to="/book">
            Book consultation
          </Link>
        </div>
      </section>
    </>
  );
}
