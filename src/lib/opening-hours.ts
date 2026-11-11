export function formatEnglishOpeningHours(value: string): string {
  const match = value.trim().match(/^(\d{1,2})[hH:](\d{2})?\s*(?:à|a|-|–|to)\s*(\d{1,2})[hH:](\d{2})?$/i);
  if (!match) return value;
  const start = Number(match[1]);
  const startMinutes = Number(match[2] ?? 0);
  const end = Number(match[3]);
  const endMinutes = Number(match[4] ?? 0);
  if (start > 23 || end > 23 || startMinutes > 59 || endMinutes > 59) return value;
  const format = (hour: number, minutes: number) => `${hour % 12 || 12}${minutes ? `.${String(minutes).padStart(2, "0")}` : ""}${hour < 12 ? "am" : "pm"}`;
  return `${format(start, startMinutes)} to ${format(end, endMinutes)}`;
}
