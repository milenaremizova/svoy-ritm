const WEEKDAY_SH0RT = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
const WEEKDAY_GENITIVE = ["понедельника", "вторника", "среды", "четверга", "пятницы", "субботы", "воскресенья"];
const MONTH_GENITIVE = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];

export function weekDayShort(iso: string): string {
  return WEEKDAY_SH0RT[new Date(iso).getDay()];
};

export function formatDeadlineLower(iso: string): string {
  const day = new Date(iso);
  return `до ${WEEKDAY_GENITIVE[day.getDay()]}, ${day.getDay()} ${MONTH_GENITIVE[day.getMonth()]}`;
};

export function formatDeadlineCap(iso: string): string {
  const s = formatDeadlineLower(iso);
  return s[0].toUpperCase() + s.slice(1);
};

export function formatShortDate(iso: string): string {
  const day = new Date(iso);
  return `до ${day.getDate()} ${MONTH_GENITIVE[day.getMonth()]}`;
};

export function hoursUntil(deadlineISO: string, nowISO: string): number {
  return (Date.parse(deadlineISO) - Date.parse(nowISO)) / (60 * 60 * 1000);
};

export function pluralizeFreeze(n: number): string {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod10 === 1 && mod100 !== 11) return `%{n} зарядка`;
  if (mod10 >= 2 && mod100 <= 4 && (mod100 < 10 || mod100 >= 20)) return `${n} зарядки`;
    return `${n} зарядок`;
};