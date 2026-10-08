import { firm } from "../firm";
import {
  WEEKDAY_LABELS,
  dayKind,
  formatLongDate,
  formatMonth,
  monthGrid,
  toISODate,
} from "../schedule";

type CalendarProps = {
  month: Date;
  now: Date;
  selectedISO: string | null;
  onSelect: (dateISO: string) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
};

export function Calendar({
  month,
  now,
  selectedISO,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
}: CalendarProps) {
  const cells = monthGrid(month.getFullYear(), month.getMonth());
  const label = formatMonth(month);

  return (
    <div className="calendar">
      <div className="calendar-bar">
        <h2 id="calendar-heading">{label}</h2>
        <div className="month-nav">
          <button type="button" onClick={onPrev} disabled={!canPrev}>
            Previous
          </button>
          <button type="button" onClick={onNext} disabled={!canNext}>
            Next
          </button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          {WEEKDAY_LABELS.map((name, index) => (
            <div key={name} className={index >= 5 ? "is-weekend" : undefined}>
              {name}
            </div>
          ))}
        </div>
        <div className="calendar-days">
          {cells.map((cell, index) => {
            if (!cell.date) {
              return <div key={`empty-${index}`} className="day day-empty" />;
            }
            const iso = toISODate(cell.date);
            const kind = dayKind(cell.date, now);
            const number = cell.date.getDate();
            const long = formatLongDate(iso);
            if (kind !== "open") {
              const note = kind === "closed" ? "Closed" : kind === "full" ? "Full" : "";
              return (
                <div key={iso} className={`day is-${kind}`}>
                  <span className="day-number">{number}</span>
                  {note ? <span className="day-note">{note}</span> : null}
                </div>
              );
            }
            const selected = iso === selectedISO;
            return (
              <button
                key={iso}
                type="button"
                className={selected ? "day is-open is-selected" : "day is-open"}
                aria-pressed={selected}
                aria-label={long}
                onClick={() => onSelect(iso)}
              >
                <span className="day-number">{number}</span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="calendar-key">
        <span>Weekdays {firm.hours}</span>
        <span>Saturday and Sunday closed</span>
      </p>
    </div>
  );
}
