import { addHours, format, isAfter, parseISO, setHours, setMinutes, setSeconds } from "date-fns";

export const toInputDate = (value: string | Date): string => {
  const date = typeof value === "string" ? parseISO(value) : value;

  return format(date, "yyyy-MM-dd");
};

export const toInputTime = (value: string | Date): string => {
  const date = typeof value === "string" ? parseISO(value) : value;

  return format(date, "HH:mm");
};

export const buildDateTimeIso = (date: string, time: string): string => {
  return new Date(`${date}T${time}:00`).toISOString();
};

export const isEndAfterStart = (date: string, startTime: string, endTime: string): boolean => {
  const start = new Date(buildDateTimeIso(date, startTime));
  const end = new Date(buildDateTimeIso(date, endTime));

  return isAfter(end, start);
};

export const getDefaultStartDate = (date: Date, isAllDay: boolean): Date => {
  if (!isAllDay) {
    return date;
  }

  return setSeconds(setMinutes(setHours(date, 9), 0), 0);
};

export const getDefaultEndDate = (start: Date): Date => {
  return addHours(start, 1);
};
