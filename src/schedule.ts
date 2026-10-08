export const TIME_SLOTS = [
  "9:00",
  "10:00",
  "11:00",
  "12:00",
  "1:00",
  "2:00",
  "3:00",
] as const;

export type TimeSlot = (typeof TIME_SLOTS)[number];

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;

export type SlotState = "open" | "taken" | "passed";
export type DayKind = "open" | "closed" | "past" | "full";

export function isTimeSlot(value: string): value is TimeSlot {
  return (TIME_SLOTS as readonly string[]).includes(value);
}

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function fromISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, count: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + count, 1);
}

export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 0 || day === 6;
}

export function slotHour(slot: TimeSlot): number {
  const hour = Number(slot.split(":")[0]);
  return hour <= 3 ? hour + 12 : hour;
}

/** Standing diary holds, stable by day-of-month, so a few hours read as already taken. */
function isHeld(date: Date, slot: TimeSlot): boolean {
  const day = date.getDate();
  if (slot === "11:00" && day % 2 === 0) return true;
  if (slot === "2:00" && day % 3 === 0) return true;
  if (slot === "9:00" && day % 5 === 0) return true;
  if (slot === "1:00" && day % 7 === 0) return true;
  return false;
}

function isPastSlot(date: Date, slot: TimeSlot, now: Date): boolean {
  const start = new Date(date);
  start.setHours(slotHour(slot), 0, 0, 0);
  return start.getTime() <= now.getTime();
}

export function slotState(date: Date, slot: TimeSlot, now = new Date()): SlotState {
  if (isPastSlot(date, slot, now)) return "passed";
  if (isHeld(date, slot)) return "taken";
  return "open";
}

export function isSlotAvailable(date: Date, slot: TimeSlot, now = new Date()): boolean {
  return !isWeekend(date) && slotState(date, slot, now) === "open";
}

export function dayKind(date: Date, now = new Date()): DayKind {
  if (isWeekend(date)) return "closed";
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const day = new Date(date);
  day.setHours(0, 0, 0, 0);
  if (day < today) return "past";
  const states = TIME_SLOTS.map((slot) => slotState(date, slot, now));
  if (states.some((state) => state === "open")) return "open";
  if (states.some((state) => state === "taken")) return "full";
  return "past";
}

export type CalendarCell = { date: Date } | { date: null };

export function monthGrid(year: number, month: number): CalendarCell[] {
  const lead = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  const cells: CalendarCell[] = [];
  for (let i = 0; i < lead; i += 1) cells.push({ date: null });
  for (let day = 1; day <= count; day += 1) cells.push({ date: new Date(year, month, day) });
  while (cells.length % 7 !== 0) cells.push({ date: null });
  return cells;
}

export function formatLongDate(iso: string): string {
  return fromISODate(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatMonth(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

export function monthIndex(date: Date): number {
  return date.getFullYear() * 12 + date.getMonth();
}

const MORNING: TimeSlot[] = ["9:00", "10:00", "11:00", "12:00"];

export function slotGroup(slot: TimeSlot): "Morning" | "Afternoon" {
  return MORNING.includes(slot) ? "Morning" : "Afternoon";
}
