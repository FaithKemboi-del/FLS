import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { firm, formatConsultationFee } from "../content.js";
import {
  WEEKDAY_LABELS,
  addMonths,
  buildMonthCells,
  dateKey,
  formatLongDate,
  isBookableDate,
  makeReference,
  monthLabel,
  nairobiToday,
  openSlots,
} from "../schedule.js";
import Receipt, { downloadReceipt } from "./Receipt.jsx";

const STEPS = [
  { id: "schedule", label: "Date" },
  { id: "phone", label: "Phone" },
  { id: "pay", label: "Payment" },
  { id: "receipt", label: "Receipt" },
];

function parsePhone(value) {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return { ok: false, message: "Enter a phone number." };
  if (!/^[0-9+().\-\s]+$/.test(trimmed)) {
    return { ok: false, message: "Use digits for the phone number." };
  }
  if (trimmed.replace(/\D/g, "").length < 4) {
    return { ok: false, message: "Enter a phone number." };
  }
  return { ok: true, value: trimmed };
}

export default function BookingFlow() {
  const today = nairobiToday();
  const [view, setView] = useState(() => ({
    year: today.year,
    monthIndex: today.monthIndex,
  }));
  const [step, setStep] = useState("schedule");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [scheduleNote, setScheduleNote] = useState("");
  const [receipt, setReceipt] = useState(null);
  const paying = useRef(false);
  const stepRef = useRef(step);

  const latest = addMonths(today.year, today.monthIndex, 5);
  const atFirstMonth = view.year === today.year && view.monthIndex === today.monthIndex;
  const atLastMonth = view.year === latest.year && view.monthIndex === latest.monthIndex;
  const slots = selectedDate ? openSlots(selectedDate, today) : [];
  const timeStillOpen = slots.some((slot) => slot.label === selectedTime);
  const selectionReady = Boolean(selectedDate && selectedTime && timeStillOpen);
  const stepIndex = STEPS.findIndex((item) => item.id === step);

  useEffect(() => {
    if (stepRef.current === step) return;
    stepRef.current = step;
    document.getElementById("step-title")?.focus();
  }, [step]);

  function shiftMonth(delta) {
    setView((current) => addMonths(current.year, current.monthIndex, delta));
  }

  function chooseDate(key) {
    setScheduleNote("");
    setSelectedDate(key);
    const nextSlots = openSlots(key, today);
    if (!nextSlots.some((slot) => slot.label === selectedTime)) {
      setSelectedTime("");
    }
  }

  function guardSelection() {
    if (!selectedDate || !selectedTime) return false;
    const stillOpen = openSlots(selectedDate, today).some((slot) => slot.label === selectedTime);
    if (stillOpen) return true;
    setSelectedTime("");
    setScheduleNote("That time is no longer open. Choose another.");
    setStep("schedule");
    return false;
  }

  function proceedToPhone() {
    if (!guardSelection()) return;
    setStep("phone");
  }

  function submitPhone(event) {
    event.preventDefault();
    const parsed = parsePhone(phone);
    if (!parsed.ok) {
      setPhoneError(parsed.message);
      return;
    }
    setPhone(parsed.value);
    setPhoneError("");
    if (!guardSelection()) return;
    setStep("pay");
  }

  function payNow() {
    if (paying.current || !guardSelection()) return;
    const parsed = parsePhone(phone);
    if (!parsed.ok) {
      setPhoneError(parsed.message);
      setStep("phone");
      return;
    }
    paying.current = true;
    setReceipt({
      reference: makeReference(selectedDate),
      dateLabel: formatLongDate(selectedDate),
      timeLabel: selectedTime,
      phone: parsed.value,
      feeLabel: formatConsultationFee(),
      status: "Paid",
    });
    setStep("receipt");
  }

  function bookAnother() {
    const fresh = nairobiToday();
    paying.current = false;
    setReceipt(null);
    setSelectedDate("");
    setSelectedTime("");
    setPhone("");
    setPhoneError("");
    setScheduleNote("");
    setView({ year: fresh.year, monthIndex: fresh.monthIndex });
    setStep("schedule");
  }

  const cells = buildMonthCells(view.year, view.monthIndex);

  return (
    <div className="booking-column">
      <div className="no-print">
        <h1>Book a consultation</h1>
        <p className="quiet book-intro">
          {firm.hours.days}, {firm.hours.time}. {firm.hours.assumption}
        </p>
        <ol className="steps" aria-label="Booking progress">
          {STEPS.map((item, index) => {
            const state = index < stepIndex ? "done" : index === stepIndex ? "current" : "upcoming";
            return (
              <li key={item.id} data-state={state} aria-current={state === "current" ? "step" : undefined}>
                <span className="step-index">{index + 1}</span>
                {item.label}
              </li>
            );
          })}
        </ol>
      </div>

      {step === "schedule" && (
        <section className="step-panel" aria-labelledby="step-title">
          <h2 id="step-title" tabIndex={-1}>
            Date and time
          </h2>
          <p className="help">Past dates are closed. Openings are on weekdays only.</p>
          {scheduleNote ? (
            <p className="error" role="alert">
              {scheduleNote}
            </p>
          ) : null}

          <div className="calendar">
            <div className="calendar-toolbar">
              <p className="month-label" aria-live="polite">
                {monthLabel(view.year, view.monthIndex)}
              </p>
              <div className="month-nav">
                <button
                  type="button"
                  className="nav-button"
                  onClick={() => shiftMonth(-1)}
                  disabled={atFirstMonth}
                  aria-label="Previous month"
                >
                  Previous
                </button>
                <button
                  type="button"
                  className="nav-button"
                  onClick={() => shiftMonth(1)}
                  disabled={atLastMonth}
                  aria-label="Next month"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="dow-row" aria-hidden="true">
              {WEEKDAY_LABELS.map((day) => (
                <span key={day.long}>{day.short}</span>
              ))}
            </div>
            <div className="day-grid" role="group" aria-label={monthLabel(view.year, view.monthIndex)}>
              {cells.map((day, index) => {
                if (!day) return <span key={`empty-${index}`} className="day-empty" />;
                const key = dateKey(view.year, view.monthIndex, day);
                const bookable = isBookableDate(view.year, view.monthIndex, day, today);
                const selected = key === selectedDate;
                if (!bookable) {
                  return (
                    <span key={key} className="day-closed" aria-hidden="true">
                      {day}
                    </span>
                  );
                }
                return (
                  <button
                    key={key}
                    type="button"
                    className={selected ? "day is-selected" : "day"}
                    aria-pressed={selected}
                    aria-label={formatLongDate(key)}
                    onClick={() => chooseDate(key)}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          {selectedDate ? (
            <div className="times">
              <h3>Available times</h3>
              <p className="help">{formatLongDate(selectedDate)}</p>
              {slots.length === 0 ? (
                <p className="help">No times left on this day.</p>
              ) : (
                <div className="slots" role="group" aria-label={`Times on ${formatLongDate(selectedDate)}`}>
                  {slots.map((slot) => {
                    const selected = slot.label === selectedTime;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        className={selected ? "slot is-selected" : "slot"}
                        aria-pressed={selected}
                        onClick={() => {
                          setScheduleNote("");
                          setSelectedTime(slot.label);
                        }}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <p className="help times-prompt">Select a date to see times.</p>
          )}

          {selectionReady ? (
            <div className="fee-panel">
              <p className="selection-line">
                {formatLongDate(selectedDate)} at {selectedTime}
              </p>
              <p className="fee-line" aria-live="polite">
                Consultation fee is {formatConsultationFee()}.
              </p>
              <button type="button" className="button" onClick={proceedToPhone}>
                Proceed
              </button>
            </div>
          ) : null}
        </section>
      )}

      {step === "phone" && (
        <section className="step-panel" aria-labelledby="step-title">
          <h2 id="step-title" tabIndex={-1}>
            Phone number
          </h2>
          <p className="help">
            {formatLongDate(selectedDate)} at {selectedTime}
          </p>
          <form onSubmit={submitPhone}>
            <div className="field">
              <label htmlFor="visitor-phone">Phone number</label>
              <input
                id="visitor-phone"
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                maxLength={32}
                value={phone}
                aria-invalid={phoneError ? "true" : "false"}
                aria-describedby={phoneError ? "phone-error" : "phone-hint"}
                onChange={(event) => {
                  setPhone(event.target.value);
                  if (phoneError) setPhoneError("");
                }}
                required
              />
              <p id="phone-hint" className="help">
                This number is printed on the receipt.
              </p>
              {phoneError ? (
                <p id="phone-error" className="error" role="alert">
                  {phoneError}
                </p>
              ) : null}
            </div>
            <div className="form-actions">
              <button type="submit" className="button">
                Continue to payment
              </button>
              <button type="button" className="text-button" onClick={() => setStep("schedule")}>
                Back
              </button>
            </div>
          </form>
        </section>
      )}

      {step === "pay" && (
        <section className="step-panel" aria-labelledby="step-title">
          <h2 id="step-title" tabIndex={-1}>
            Payment
          </h2>
          <p className="help">Confirm payment to hold this consultation.</p>
          <dl className="summary">
            <div>
              <dt>Date</dt>
              <dd>{formatLongDate(selectedDate)}</dd>
            </div>
            <div>
              <dt>Time</dt>
              <dd>{selectedTime}</dd>
            </div>
            <div>
              <dt>Phone number</dt>
              <dd>{phone}</dd>
            </div>
          </dl>
          <p className="fee-line">Consultation fee is {formatConsultationFee()}.</p>
          <p className="quiet">No card details are taken. Pay now marks this consultation as paid.</p>
          <div className="form-actions">
            <button type="button" className="button" onClick={payNow}>
              Pay now
            </button>
            <button type="button" className="text-button" onClick={() => setStep("phone")}>
              Back
            </button>
          </div>
        </section>
      )}

      {step === "receipt" && receipt ? (
        <>
          <Receipt receipt={receipt} />
          <div className="receipt-actions no-print">
            <button type="button" className="button" onClick={() => window.print()}>
              Print receipt
            </button>
            <button type="button" className="button-secondary" onClick={() => downloadReceipt(receipt)}>
              Download receipt
            </button>
          </div>
          <div className="trail no-print">
            <button type="button" className="text-button" onClick={bookAnother}>
              Book another consultation
            </button>
            <Link className="text-button" to="/">
              Back to home
            </Link>
          </div>
        </>
      ) : null}
    </div>
  );
}
