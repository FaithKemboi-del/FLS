// Faith will replace this placeholder consultation fee.
export const CONSULTATION_FEE_KES = 15000;

export function formatConsultationFee() {
  const amount = new Intl.NumberFormat("en-KE", {
    maximumFractionDigits: 0,
  }).format(CONSULTATION_FEE_KES);
  return `KES ${amount}`;
}

/** Confirmed firm facts. Edit this module when details change. */
export const firm = {
  name: "Forthright Legal Services",
  tagline: "Global legal strategy, local precision",
  address: "Hurlingham, Nairobi, Kenya",
  locality: "Hurlingham, Nairobi",
  phone: "0738",
  whatsapp: "0738",
  years: "10+",
  referencePrefix: "FLS",
  hours: {
    days: "Monday–Friday",
    // Shown as confirmed. Slots are hourly from openMinutes through closeMinutes.
    time: "9:00–4:00pm",
    openMinutes: 9 * 60,
    closeMinutes: 16 * 60,
    assumption: "Monday–Friday is assumed.",
  },
};

/** Add a confirmed practice to this list. The page lays out however many are here. */
export const practices = [{ name: "Regulatory compliance" }];
