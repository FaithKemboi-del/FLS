import { Link } from "react-router-dom";
import ContactStrip from "../components/ContactStrip.jsx";
import { firm, practices } from "../content.js";

export default function Home() {
  const [lead, ...rest] = firm.name.split(" ");
  const tail = rest.join(" ");

  return (
    <main id="main" className="page" tabIndex={-1}>
      <header className="opening">
        <div className="opening-copy">
          <div className="masthead">
            <h1 className="firm-name">
              <span className="line-1">{lead}</span>
              {tail ? (
                <>
                  {" "}
                  <span className="line-2">{tail}</span>
                </>
              ) : null}
            </h1>
            <p className="tagline">{firm.tagline}</p>
          </div>
          <Link className="button" to="/book">
            Book a consultation
          </Link>
        </div>
        <ContactStrip />
      </header>

      <div className="rest">
        <section className="section" id="practice" aria-labelledby="practice-heading">
          <p className="kicker">01</p>
          <h2 id="practice-heading">Areas of practice</h2>
          <ul className="practice-list">
            {practices.map((practice, index) => (
              <li key={practice.name} className="practice-item">
                <span className="practice-index">{String(index + 1).padStart(2, "0")}</span>
                <h3>{practice.name}</h3>
              </li>
            ))}
          </ul>
        </section>

        <p className="proof">
          {firm.years} years · {firm.locality}
        </p>

        <section className="section" id="booking" aria-labelledby="booking-heading">
          <div className="booking-invite">
            <div>
              <p className="kicker">02</p>
              <h2 id="booking-heading">Book a consultation</h2>
              <p className="quiet">
                {firm.hours.days}, {firm.hours.time}. {firm.hours.assumption}
              </p>
            </div>
            <Link className="button" to="/book">
              Book a consultation
            </Link>
          </div>
        </section>

        <section className="section" id="contact" aria-labelledby="contact-heading">
          <p className="kicker">03</p>
          <h2 id="contact-heading">Contact</h2>
          <ContactStrip />
        </section>

        <footer className="colophon">
          <p>{firm.name}</p>
        </footer>
      </div>
    </main>
  );
}
