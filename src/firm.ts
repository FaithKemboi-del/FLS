export type PracticeCover = {
  title: string;
  text: string;
};

export type PracticeArea = {
  title: string;
  label: string;
  summary: string;
  covers: PracticeCover[];
};

/**
 * Add further practice areas to this list when they are known.
 * Home and the practice page both render this array.
 */
export const practiceAreas: PracticeArea[] = [
  {
    title: "Regulatory compliance",
    label: "Practice focus",
    summary:
      "The firm’s practice is regulatory compliance: the rules that govern how an organisation may operate.",
    covers: [
      {
        title: "Licensing and permits",
        text: "Applications, renewals, and the conditions that attach to a licence or permit.",
      },
      {
        title: "Compliance reviews and audits",
        text: "A review of how current practice sits against the rules that apply.",
      },
      {
        title: "Regulator correspondence",
        text: "Letters, responses, and filings with the body that oversees the activity.",
      },
      {
        title: "Policies and training",
        text: "Written policies, and training for the people who have to follow them.",
      },
      {
        title: "Ongoing advisory",
        text: "Counsel as the rules change, or as the organisation’s work changes.",
      },
    ],
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

export const feeSentence = `Consultation fee is ${firm.feeAmount}`;

export const hurlinghamMap = {
  title: "Map of Hurlingham, Nairobi",
  zoom: 15,
  xs: [19732, 19733, 19734],
  ys: [16500, 16501],
  link: "https://www.openstreetmap.org/#map=15/-1.292/36.795",
  credit: "https://www.openstreetmap.org/copyright",
} as const;

export const consultationSteps = [
  {
    title: "Choose a weekday slot",
    text: "Pick a Monday to Friday and an hour between 9:00 and 4:00pm.",
  },
  {
    title: "Confirm the fee",
    text: `${feeSentence}.`,
  },
  {
    title: "Pay",
    text: "Enter your phone number. A mobile-money request is sent to that number. Confirm the payment to complete the booking.",
  },
  {
    title: "Receive a receipt",
    text: "The receipt shows the firm, the date and time, the fee, your phone number, and a reference. Print it or save it.",
  },
] as const;

export const consultationFaq = [
  {
    question: "What is the fee?",
    answer: `${feeSentence}.`,
  },
  {
    question: "When can I come in?",
    answer: `${firm.contactHours}. The desk is closed on Saturday and Sunday.`,
  },
  {
    question: "How do I book?",
    answer:
      "Choose a weekday and a time on the booking page, confirm the fee, then enter the phone number for the payment request.",
  },
  {
    question: "How do payment and the receipt work?",
    answer:
      "A mobile-money request is sent to the number you enter. Confirming the payment completes the booking. The receipt shows the firm name, date, time, fee, phone number, and a reference. You can print or save it. Card numbers are not taken.",
  },
  {
    question: "How do I reschedule?",
    answer: `Contact the firm by phone or WhatsApp on ${firm.phone}.`,
  },
] as const;
