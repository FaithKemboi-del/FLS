export type PracticeArea = {
  title: string;
  label: string;
};

/**
 * Add further practice areas to this list when they are known.
 * Home and the practice page both render this array.
 */
export const practiceAreas: PracticeArea[] = [
  {
    title: "Regulatory compliance",
    label: "Practice focus",
  },
];

export function practiceSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

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
  contactHours: "Monday–Friday 9:00–4:00pm",
  years: "10+",
  feeAmount: "KES 15,000",
} as const;
