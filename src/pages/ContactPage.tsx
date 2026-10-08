import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { firm, hurlinghamMap } from "../firm";

export function ContactPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Contact — ${firm.name}`}
        description={`${firm.name}, ${firm.address}. ${firm.contactHours}. Phone ${firm.phone}. WhatsApp ${firm.whatsapp}.`}
      />
      <div className="page-head">
        <p className="section-index">03</p>
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
          <figure className="map-block">
            <a href={hurlinghamMap.link} target="_blank" rel="noreferrer">
              <div className="osm-grid">
                {hurlinghamMap.ys.flatMap((y) =>
                  hurlinghamMap.xs.map((x) => (
                    <img
                      key={`${x}-${y}`}
                      alt={x === hurlinghamMap.xs[0] && y === hurlinghamMap.ys[0] ? hurlinghamMap.title : ""}
                      src={`https://tile.openstreetmap.org/${hurlinghamMap.zoom}/${x}/${y}.png`}
                    />
                  )),
                )}
              </div>
            </a>
            <figcaption>
              Hurlingham, Nairobi · Map data ©{" "}
              <a href={hurlinghamMap.credit} target="_blank" rel="noreferrer">
                OpenStreetMap
              </a>{" "}
              contributors
            </figcaption>
          </figure>
          <Link className="btn page-book" to="/book">
            Book consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
