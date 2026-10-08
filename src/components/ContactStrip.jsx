import { firm } from "../content.js";

export default function ContactStrip() {
  return (
    <dl className="contact-strip">
      <div>
        <dt>Address</dt>
        <dd>{firm.address}</dd>
      </div>
      <div>
        <dt>Phone</dt>
        <dd>{firm.phone}</dd>
      </div>
      <div>
        <dt>WhatsApp</dt>
        <dd>{firm.whatsapp}</dd>
      </div>
      <div>
        <dt>Hours</dt>
        <dd>
          <span className="hours-days">{firm.hours.days}</span>
          <span className="hours-time">{firm.hours.time}</span>
          <span className="assumption">{firm.hours.assumption}</span>
        </dd>
      </div>
    </dl>
  );
}
