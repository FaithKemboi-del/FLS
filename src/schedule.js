import { firm } from "./content.js";

const WEEKDAY_LABELS = [
  { short: "Mo", long: "Monday" },
  { short: "Tu", long: "Tuesday" },
  { short: "We", long: "Wednesday" },
  { short: "Th", long: "Thursday" },
  { short: "Fr", long: "Friday" },
  { short: "Sa", long: "Saturday" },
  { short: "Su", long: "Sunday" },
];

export { WEEKDAY_LABELS };

function pad(value) {
  return String(value).padStart(2, "0");
}

export function dateKey(year, monthIndex, day) {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

export function parseDateKey(key) {
  const [year, month, day] = key.split("-").map(Number);
  return { year, monthIndex: month - 1, day };
}

/** Office clock in Nairobi, so openings follow the firm’s day. */
export function nairobiToday(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Nairobi",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const read = (type) => parts.find((part) => part.type === type)?.value ?? "";
  const year = Number(read("year"));
  const month = Number(read("month"));
  const day = Number(read("day"));
  const hour = Number(read("hour"));
  const minute = Number(read("minute"));
  return {
    year,
    monthIndex: month - 1,
    day,
    minutes: hour * 60 + minute,
    key: dateKey(year, month - 1, day),
  };
}

export function isWeekday(year, monthIndex, day) {
  const weekday = new Date(year, monthIndex, day).getDay();
  return weekday >= 1 && weekday <= 5;
}

export function isBookableDate(year, monthIndex, day, today = nairobiToday()) {
  const key = dateKey(year, monthIndex, day);
  return key >= today.key && isWeekday(year, monthIndex, day);
}

function formatSlotLabel(minutes) {
  const hour24 = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const suffix = hour24 >= 12 ? "pm" : "am";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${pad(mins)}${suffix}`;
}

/** Hourly openings from the configured open time through the close time. */
export function timeSlots() {
  const { openMinutes, closeMinutes } = firm.hours;
  const slots = [];
  for (let minutes = openMinutes; minutes <= closeMinutes; minutes += 60) {
    slots.push({ label: formatSlotLabel(minutes), minutes });
  }
  return slots;
}

export function openSlots(key, today = nairobiToday()) {
  const { year, monthIndex, day } = parseDateKey(key);
  if (!isBookableDate(year, monthIndex, day, today)) return [];
  const slots = timeSlots();
  if (key !== today.key) return slots;
  return slots.filter((slot) => slot.minutes >= today.minutes);
}

export function formatLongDate(key) {
  const { year, monthIndex, day } = parseDateKey(key);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, day));
}

export function monthLabel(year, monthIndex) {
  return new Intl.DateTimeFormat("en-GB", {
    month: "long",
    year: "numeric",
  }).format(new Date(year, monthIndex, 1));
}

export function buildMonthCells(year, monthIndex) {
  const firstWeekday = new Date(year, monthIndex, 1).getDay();
  const leading = (firstWeekday + 6) % 7;
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const cells = [];
  for (let index = 0; index < leading; index += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) cells.push(day);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function addMonths(year, monthIndex, delta) {
  const next = new Date(year, monthIndex + delta, 1);
  return { year: next.getFullYear(), monthIndex: next.getMonth() };
}

export function makeReference(key) {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  let suffix = "";
  for (const byte of bytes) suffix += alphabet[byte % alphabet.length];
  const compact = key.replaceAll("-", "");
  return `${firm.referencePrefix}-${compact}-${suffix}`;
}
