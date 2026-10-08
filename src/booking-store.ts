import { createContext, useContext } from "react";
import {
  fromISODate,
  isSlotAvailable,
  isTimeSlot,
  toISODate,
  type TimeSlot,
} from "./schedule";

export type Step = "schedule" | "phone" | "pay" | "receipt";

export type Selection = {
  dateISO: string;
  time: TimeSlot | null;
};

export type BookingState = {
  step: Step;
  selection: Selection | null;
  phone: string;
  reference: string | null;
};

export type BookingApi = BookingState & {
  now: Date;
  selectDate: (dateISO: string) => void;
  selectTime: (time: TimeSlot) => void;
  proceed: () => void;
  setPhone: (phone: string) => void;
  submitPhone: () => boolean;
  confirmPayment: () => void;
  back: () => void;
  reset: () => void;
};

export const BookingContext = createContext<BookingApi | null>(null);

export function useBooking(): BookingApi {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return value;
}

export const STORAGE_KEY = "fls-booking";

export const initialBooking: BookingState = {
  step: "schedule",
  selection: null,
  phone: "",
  reference: null,
};

export function displayPhone(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

export function isValidPhone(input: string): boolean {
  const compact = displayPhone(input).replace(/[\s-]/g, "");
  return /^\+?[0-9]{9,15}$/.test(compact);
}

export function makeReference(dateISO: string): string {
  const compact = dateISO.slice(2).replace(/-/g, "");
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let tail = "";
  for (const byte of bytes) tail += alphabet[byte % alphabet.length];
  return `FLS-${compact}-${tail}`;
}

function isStep(value: unknown): value is Step {
  return value === "schedule" || value === "phone" || value === "pay" || value === "receipt";
}

export function sanitizeBooking(value: unknown, now: Date): BookingState {
  if (!value || typeof value !== "object") return initialBooking;
  const raw = value as Partial<BookingState>;
  const phone = typeof raw.phone === "string" ? raw.phone : "";
  const reference = typeof raw.reference === "string" ? raw.reference : null;
  const step = isStep(raw.step) ? raw.step : "schedule";

  let selection: Selection | null = null;
  if (raw.selection && typeof raw.selection === "object") {
    const dateISO = raw.selection.dateISO;
    const time = raw.selection.time;
    if (typeof dateISO === "string" && /^\d{4}-\d{2}-\d{2}$/.test(dateISO)) {
      const date = fromISODate(dateISO);
      if (toISODate(date) === dateISO) {
        const slot = typeof time === "string" && isTimeSlot(time) ? time : null;
        if (!slot || isSlotAvailable(date, slot, now)) {
          selection = { dateISO, time: slot };
        }
      }
    }
  }

  if (!selection?.time) {
    return {
      step: "schedule",
      selection,
      phone,
      reference: null,
    };
  }

  if ((step === "pay" || step === "receipt") && !isValidPhone(phone)) {
    return { step: "phone", selection, phone, reference: null };
  }

  if (step === "receipt" && !reference) {
    return { step: "pay", selection, phone, reference: null };
  }

  return { step, selection, phone, reference };
}

export function loadBooking(now: Date): BookingState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return initialBooking;
    return sanitizeBooking(JSON.parse(raw) as unknown, now);
  } catch {
    return initialBooking;
  }
}
