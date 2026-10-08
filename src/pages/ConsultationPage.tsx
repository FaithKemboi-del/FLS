import { Link } from "react-router-dom";
import { PageMeta } from "../components/PageMeta";
import { consultationFaq, feeSentence, firm } from "../firm";

export function ConsultationPage() {
  return (
    <div className="page">
      <PageMeta
        title={`Consultation — ${firm.name}`}
        description={`${feeSentence}. Book a weekday hour between ${firm.hours}. Confirm payment on your phone, then keep the receipt.`}
      />
      <div className="page-head">
        <p className="section-index">02</p>
        <div>
          <h1>Consultation</h1>
          <p className="fee-sentence">{feeSentence}</p>
          <p className="summary">{firm.contactHours}. Closed Saturday and Sunday.</p>
          <dl className="faq">
            {consultationFaq.map((item) => (
              <div key={item.question}>
                <dt>{item.question}</dt>
                <dd>{item.answer}</dd>
              </div>
            ))}
          </dl>
          <Link className="btn page-book" to="/book">
            Book consultation
          </Link>
        </div>
      </div>
    </div>
  );
}
