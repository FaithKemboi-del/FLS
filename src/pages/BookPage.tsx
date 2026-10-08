import { useEffect, useState, type FormEvent } from "react";
import { isValidPhone, useBooking } from "../booking-store";
import { Calendar } from "../components/Calendar";
import { ReceiptCard } from "../components/ReceiptCard";
import { firm } from "../firm";
import {
  TIME_SLOTS,
  addMonths,
  formatLongDate,
  monthIndex,
  slotGroup,
  slotState,
  startOfMonth,
  fromISODate,
  type TimeSlot,
} from "../schedule";

const STEP_LABELS = [
  ["01", "Date"],
  ["02", "Number"],
  ["03", "Payment"],
  ["04", "Receipt"],
] as const;

export function BookPage() {
  const {
    step,
    selection,
    phone,
    reference,
    now,
    selectDate,
    selectTime,
    proceed,
    setPhone,
    submitPhone,
    confirmPayment,
    back,
    reset,
  } = useBooking();

  const [month, setMonth] = useState(() =>
    selection ? startOfMonth(fromISODate(selection.dateISO)) : startOfMonth(now),
  );
  const [phoneError, setPhoneError] = useState("");

  useEffect(() => {
    const titles: Record<typeof step, string> = {
      schedule: "Book a consultation",
      phone: "Your number",
      pay: "Payment",
      receipt: "Receipt",
    };
    document.title = `${titles[step]} — ${firm.name}`;
  }, [step]);

  const minMonth = monthIndex(startOfMonth(now));
  const maxMonth = minMonth + 2;
  const currentIndex = monthIndex(month);

  function onPhoneSubmit(event: FormEvent) {
    event.preventDefault();
    if (!isValidPhone(phone)) {
      setPhoneError("Enter a mobile number, at least 9 digits.");
      return;
    }
    setPhoneError("");
    submitPhone();
  }

  const selectedTime = selection?.time ?? null;
  const dateISO = selection?.dateISO ?? null;

  return (
    <div className="book">
      <ol className="steps">
        {STEP_LABELS.map(([number, label], index) => {
          const keys = ["schedule", "phone", "pay", "receipt"] as const;
          const current = keys[index] === step;
          return (
            <li key={label} className={current ? "is-current" : undefined} aria-current={current ? "step" : undefined}>
              <span>{number}</span>
              {label}
            </li>
          );
        })}
      </ol>

      {step === "schedule" ? (
        <div className="book-top">
          <h1>Book a consultation</h1>
          <p className="lede">Choose a weekday. Hours run {firm.hours}.</p>
          <Calendar
            month={month}
            now={now}
            selectedISO={dateISO}
            onSelect={selectDate}
            onPrev={() => setMonth((value) => addMonths(value, -1))}
            onNext={() => setMonth((value) => addMonths(value, 1))}
            canPrev={currentIndex > minMonth}
            canNext={currentIndex < maxMonth}
          />
          <section className="hours-panel" aria-label="Available times">
            {dateISO ? (
              <>
                <h2 className="hours-heading">{formatLongDate(dateISO)}</h2>
                {(["Morning", "Afternoon"] as const).map((group) => (
                  <div key={group} className="time-group">
                    <h3>{group}</h3>
                    <div className="times">
                      {TIME_SLOTS.filter((slot) => slotGroup(slot) === group).map((slot) => (
                        <TimeButton
                          key={slot}
                          slot={slot}
                          dateISO={dateISO}
                          now={now}
                          selected={selectedTime === slot}
                          onSelect={selectTime}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <p className="lede">Select a weekday to see the hours.</p>
            )}
          </section>
          {dateISO && selectedTime ? (
            <section className="fee-panel" aria-label="Consultation fee">
              <p className="selected-kicker">Selected</p>
              <p className="selected-when">
                {formatLongDate(dateISO)}
                <span>{selectedTime}</span>
              </p>
              <p className="fee-sentence">{firm.feeSentence}</p>
              <p className="fee-note">{firm.feeNote}</p>
              <button type="button" className="btn" onClick={proceed}>
                Proceed
              </button>
            </section>
          ) : null}
        </div>
      ) : null}

      {step === "phone" && dateISO && selectedTime ? (
        <form className="phone-form" onSubmit={onPhoneSubmit}>
          <button type="button" className="text-button back-button" onClick={back}>
            Back
          </button>
          <h1>Your mobile number</h1>
          <p className="lede">The payment request goes to this number.</p>
          <p className="selected-when compact">
            {formatLongDate(dateISO)}
            <span>{selectedTime}</span>
          </p>
          <label htmlFor="phone">Mobile number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            spellCheck={false}
            value={phone}
            aria-invalid={phoneError ? true : undefined}
            aria-describedby={phoneError ? "phone-error" : undefined}
            onChange={(event) => {
              setPhone(event.target.value);
              if (phoneError) setPhoneError("");
            }}
          />
          {phoneError ? (
            <p id="phone-error" className="field-error" role="alert">
              {phoneError}
            </p>
          ) : null}
          <button type="submit" className="btn">
            Send payment request
          </button>
        </form>
      ) : null}

      {step === "pay" && dateISO && selectedTime ? (
        <section className="pay-step" aria-label="Payment">
          <button type="button" className="text-button back-button" onClick={back}>
            Back
          </button>
          <div className="pay-slip">
            <p className="pay-kicker">
              <i aria-hidden="true" />
              Mobile money
            </p>
            <h1>A payment request was sent to {phone}.</h1>
            <p className="pay-amount">{firm.feeAmount}</p>
            <p className="pay-merchant">{firm.name}</p>
            <p className="pay-for">
              {formatLongDate(dateISO)} · {selectedTime}
            </p>
            <p className="fee-note">{firm.feeNote}</p>
            <p className="fee-note">Simulated prompt. Nothing is sent to a mobile network.</p>
            <button type="button" className="btn" onClick={confirmPayment}>
              Confirm payment
            </button>
          </div>
        </section>
      ) : null}

      {step === "receipt" && dateISO && selectedTime && reference ? (
        <ReceiptCard
          dateISO={dateISO}
          time={selectedTime}
          phone={phone}
          reference={reference}
          onReset={reset}
        />
      ) : null}
    </div>
  );
}

function TimeButton({
  slot,
  dateISO,
  now,
  selected,
  onSelect,
}: {
  slot: TimeSlot;
  dateISO: string;
  now: Date;
  selected: boolean;
  onSelect: (slot: TimeSlot) => void;
}) {
  const state = slotState(fromISODate(dateISO), slot, now);
  const note = selected
    ? "Selected"
    : state === "taken"
      ? "Taken"
      : state === "passed"
        ? "Passed"
        : "Open";
  return (
    <button
      type="button"
      className={selected ? "time is-selected" : "time"}
      disabled={state !== "open"}
      aria-pressed={selected}
      onClick={() => onSelect(slot)}
    >
      <span className="time-label">{slot}</span>
      <span className="time-state">{note}</span>
    </button>
  );
}
