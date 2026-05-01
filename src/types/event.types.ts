export type EventColor = "blue" | "green" | "purple" | "orange" | "red";

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: EventColor;
  notes?: string;
}

export interface ModalPosition {
  x: number;
  y: number;
}

export type CalendarViewType = "dayGridMonth" | "timeGridWeek" | "timeGridDay" | "listWeek";

export type EventModalState =
  | {
      mode: "create";
      start: string;
      end: string;
      position: ModalPosition;
    }
  | {
      mode: "edit";
      eventId: string;
      position: ModalPosition;
    }
  | null;

export interface CreateEventPayload {
  start: string;
  end: string;
  position: ModalPosition;
}

export interface OpenEditModalPayload {
  eventId: string;
  position: ModalPosition;
}

export interface MoveEventPayload {
  id: string;
  start: string;
  end: string;
}

export interface ModalComputedPosition {
  top: number;
  left: number;
  placement: "top" | "bottom";
  arrowLeft: number;
}
