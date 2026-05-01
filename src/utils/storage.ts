import { DEFAULT_EVENT_COLOR } from "../constants";
import type { CalendarEvent, EventColor } from "../types";

const EVENTS_STORAGE_KEY = "calendar-test-task-events";

const eventColors: EventColor[] = ["blue", "green", "purple", "orange", "red"];

const isEventColor = (color: unknown): color is EventColor => {
  return typeof color === "string" && eventColors.includes(color as EventColor);
};

const normalizeEvent = (event: Partial<CalendarEvent>): CalendarEvent | null => {
  if (!event.id || !event.title || !event.start || !event.end) {
    return null;
  }

  return {
    id: event.id,
    title: event.title,
    start: event.start,
    end: event.end,
    color: isEventColor(event.color) ? event.color : DEFAULT_EVENT_COLOR,
    notes: event.notes,
  };
};

export const loadEventsFromStorage = (): CalendarEvent[] => {
  const savedEvents = localStorage.getItem(EVENTS_STORAGE_KEY);

  if (!savedEvents) {
    return [];
  }

  try {
    const parsedEvents = JSON.parse(savedEvents) as Partial<CalendarEvent>[];

    if (!Array.isArray(parsedEvents)) {
      return [];
    }

    return parsedEvents
      .map(normalizeEvent)
      .filter((event): event is CalendarEvent => Boolean(event));
  } catch {
    return [];
  }
};

export const saveEventsToStorage = (events: CalendarEvent[]): void => {
  localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
};