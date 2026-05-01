import type { EventColor } from "../types";

export interface EventColorOption {
  label: string;
  value: EventColor;
  className: string;
  cssVariable: string;
  hex: string;
}

export const DEFAULT_EVENT_COLOR: EventColor = "blue";

export const EVENT_COLORS: readonly EventColorOption[] = [
  {
    label: "Blue",
    value: "blue",
    className: "bg-event-blue",
    cssVariable: "var(--event-blue)",
    hex: "#4285f4",
  },
  {
    label: "Green",
    value: "green",
    className: "bg-event-green",
    cssVariable: "var(--event-green)",
    hex: "#35b779",
  },
  {
    label: "Purple",
    value: "purple",
    className: "bg-event-purple",
    cssVariable: "var(--event-purple)",
    hex: "#8b5cf6",
  },
  {
    label: "Orange",
    value: "orange",
    className: "bg-event-orange",
    cssVariable: "var(--event-orange)",
    hex: "#f59e0b",
  },
  {
    label: "Red",
    value: "red",
    className: "bg-event-red",
    cssVariable: "var(--event-red)",
    hex: "#ef4444",
  },
] as const;

export const getEventColorHex = (color: EventColor): string => {
  return EVENT_COLORS.find((eventColor) => eventColor.value === color)?.hex ?? "#4285f4";
};
