import { useEffect } from "react";
import { Link } from "react-router-dom";
import { firm } from "../firm";

export function ContactPage() {
  useEffect(() => {
    document.title = `Contact — ${firm.name}`;
  }, []);

  return (
    <div className="page">
      <div className="page-head">
        <p className="section-index">02</p>
        <div>
          <h1>Contact</h1>
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
          <Link className="btn page-book" to="/book">
            Book consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
