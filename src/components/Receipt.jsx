import { firm } from "../content.js";

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function receiptRows(receipt) {
  return [
    ["Reference", receipt.reference],
    ["Date", receipt.dateLabel],
    ["Time", receipt.timeLabel],
    ["Phone number", receipt.phone],
    ["Fee", receipt.feeLabel],
    ["Status", receipt.status],
  ];
}

export function receiptDocumentHtml(receipt) {
  const rows = receiptRows(receipt)
    .map(
      ([label, value]) =>
        `<div class="row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`,
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Consultation receipt ${escapeHtml(receipt.reference)}</title>
  <style>
    :root { color-scheme: light; }
    body { margin: 0; background: #f3efe6; color: #161513; font-family: "Iowan Old Style", Palatino, Georgia, serif; }
    main { max-width: 40rem; margin: 0 auto; padding: 2.5rem 1.25rem 3rem; }
    article { background: #fbf9f4; border: 1px solid #17356a; padding: 2.25rem 1.75rem 2rem; }
    .name { margin: 0; font-size: 1.7rem; letter-spacing: -0.03em; line-height: 1.1; }
    .address { margin: 0.35rem 0 0; font-family: "Segoe UI", sans-serif; font-size: 0.95rem; }
    .rules { margin: 1.1rem 0 1.4rem; }
    .rules span { display: block; background: #17356a; }
    .rules span:first-child { height: 2px; margin-bottom: 3px; }
    .rules span:last-child { height: 1px; }
    h1 { margin: 0 0 1.25rem; font-size: 1.35rem; font-weight: 560; letter-spacing: -0.02em; }
    dl { margin: 0; }
    .row { display: grid; grid-template-columns: 10.5rem 1fr; gap: 0.75rem; }
    dt, dd { margin: 0; padding: 0.65rem 0; border-bottom: 1px solid rgba(23, 53, 106, 0.35); }
    dt { font-family: "Segoe UI", sans-serif; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; }
    dd { font-size: 1.05rem; overflow-wrap: anywhere; }
    .close { margin: 1.25rem 0 0; font-family: "Segoe UI", sans-serif; font-size: 0.92rem; }
    @media (max-width: 520px) {
      .row { grid-template-columns: 1fr; gap: 0.15rem; }
      dt { border-bottom: 0; padding-bottom: 0; }
    }
    @media print {
      body { background: white; }
      main { padding: 0; }
      article { border-color: #17356a; }
    }
  </style>
</head>
<body>
  <main>
    <article>
      <p class="name">${escapeHtml(firm.name)}</p>
      <p class="address">${escapeHtml(firm.address)}</p>
      <div class="rules" aria-hidden="true"><span></span><span></span></div>
      <h1>Consultation receipt</h1>
      <dl>${rows}</dl>
      <p class="close">This receipt confirms the consultation is paid.</p>
    </article>
  </main>
</body>
</html>`;
}

export function downloadReceipt(receipt) {
  const blob = new Blob([receiptDocumentHtml(receipt)], {
    type: "text/html;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `Forthright-consultation-${receipt.reference}.html`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function Receipt({ receipt }) {
  const rows = receiptRows(receipt);
  return (
    <article className="receipt-sheet" aria-labelledby="step-title">
      <p className="receipt-name">{firm.name}</p>
      <p className="receipt-address">{firm.address}</p>
      <div className="rule-double" aria-hidden="true">
        <span />
        <span />
      </div>
      <h2 id="step-title" tabIndex={-1}>
        Consultation receipt
      </h2>
      <dl className="receipt-rows">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd
              className={
                label === "Reference" ? "reference-value" : label === "Status" ? "status-paid" : undefined
              }
            >
              {value}
            </dd>
          </div>
        ))}
      </dl>
      <p className="receipt-close">This receipt confirms the consultation is paid.</p>
    </article>
  );
}
