import { firm } from "../firm";
import { formatLongDate } from "../schedule";

type ReceiptCardProps = {
  dateISO: string;
  time: string;
  phone: string;
  reference: string;
  onReset: () => void;
};

export function ReceiptCard({ dateISO, time, phone, reference, onReset }: ReceiptCardProps) {
  return (
    <article className="receipt" aria-label="Consultation receipt">
      <header className="receipt-head">
        <p className="receipt-kicker">Consultation receipt</p>
        <h2>{firm.name}</h2>
        <p>{firm.address}</p>
      </header>
      <dl className="receipt-rows">
        <div>
          <dt>Reference</dt>
          <dd>{reference}</dd>
        </div>
        <div>
          <dt>Date</dt>
          <dd>{formatLongDate(dateISO)}</dd>
        </div>
        <div>
          <dt>Time</dt>
          <dd>{time}</dd>
        </div>
        <div>
          <dt>Fee</dt>
          <dd>{firm.feeAmount}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{phone}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>Paid</dd>
        </div>
      </dl>
      <p className="receipt-note">{firm.feeNote}</p>
      <p className="receipt-note">Simulated confirmation. No charge was made.</p>
      <div className="receipt-actions no-print">
        <button type="button" className="btn" onClick={() => window.print()}>
          Print or save
        </button>
        <button type="button" className="text-button" onClick={onReset}>
          Start another booking
        </button>
      </div>
    </article>
  );
}
