import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  BookingContext,
  displayPhone,
  initialBooking,
  isValidPhone,
  loadBooking,
  makeReference,
  STORAGE_KEY,
  type BookingApi,
  type BookingState,
} from "./booking-store";
import { fromISODate, isSlotAvailable, type TimeSlot } from "./schedule";

export function BookingProvider({ children }: { children: ReactNode }) {
  const now = useMemo(() => new Date(), []);
  const [state, setState] = useState<BookingState>(() => loadBooking(now));

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const api = useMemo<BookingApi>(() => {
    return {
      ...state,
      now,
      selectDate: (dateISO: string) => {
        setState((current) => ({
          ...current,
          step: "schedule",
          reference: null,
          selection: {
            dateISO,
            time: current.selection?.dateISO === dateISO ? current.selection.time : null,
          },
        }));
      },
      selectTime: (time: TimeSlot) => {
        setState((current) => {
          if (!current.selection) return current;
          if (!isSlotAvailable(fromISODate(current.selection.dateISO), time, now)) return current;
          return {
            ...current,
            step: "schedule",
            reference: null,
            selection: { dateISO: current.selection.dateISO, time },
          };
        });
      },
      proceed: () => {
        setState((current) => {
          if (!current.selection?.time) return current;
          if (!isSlotAvailable(fromISODate(current.selection.dateISO), current.selection.time, now)) {
            return { ...current, step: "schedule", selection: { ...current.selection, time: null } };
          }
          return { ...current, step: "phone" };
        });
      },
      setPhone: (phone: string) => {
        setState((current) => ({ ...current, phone }));
      },
      submitPhone: () => {
        if (!state.selection?.time || !isValidPhone(state.phone)) return false;
        const phone = displayPhone(state.phone);
        setState((current) => ({ ...current, phone, step: "pay" }));
        return true;
      },
      confirmPayment: () => {
        setState((current) => {
          if (!current.selection?.time || !isValidPhone(current.phone)) return current;
          if (!isSlotAvailable(fromISODate(current.selection.dateISO), current.selection.time, now)) {
            return {
              ...current,
              step: "schedule",
              selection: { ...current.selection, time: null },
              reference: null,
            };
          }
          return {
            ...current,
            step: "receipt",
            reference: current.reference ?? makeReference(current.selection.dateISO),
          };
        });
      },
      back: () => {
        setState((current) => {
          if (current.step === "phone") return { ...current, step: "schedule" };
          if (current.step === "pay") return { ...current, step: "phone" };
          return current;
        });
      },
      reset: () => {
        sessionStorage.removeItem(STORAGE_KEY);
        setState(initialBooking);
      },
    };
  }, [now, state]);

  return <BookingContext.Provider value={api}>{children}</BookingContext.Provider>;
}
