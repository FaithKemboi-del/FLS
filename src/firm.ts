export type PracticeArea = {
  title: string;
  label: string;
};

/**
 * Known firm facts only.
 * Add further practice areas to this list when they are known.
 */
export const practiceAreas: PracticeArea[] = [
  {
    title: "Regulatory compliance",
    label: "Practice focus",
  },
];

export const firm = {
  name: "Forthright Legal Services",
  shortName: "Forthright",
  taglineLead: "Global legal strategy,",
  taglineClose: "local precision",
  neighbourhood: "Hurlingham",
  cityLine: "Nairobi, Kenya",
  address: "Hurlingham, Nairobi, Kenya",
  phone: "0738",
  whatsapp: "0738",
  hours: "9:00–4:00pm",
  years: "10+",
  feeSentence: "Consultation fee is KES 15,000",
  feeNote: "This amount is a sample, pending the firm’s figure.",
  feeAmount: "KES 15,000",
} as const;
