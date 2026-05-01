import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type {
  CalendarEvent,
  CreateEventPayload,
  EventModalState,
  MoveEventPayload,
  OpenEditModalPayload,
} from "../../types";

export interface EventsState {
  items: CalendarEvent[];
  modal: EventModalState;
}

export const eventsInitialState: EventsState = {
  items: [],
  modal: null,
};

export const eventsSlice = createSlice({
  name: "events",
  initialState: eventsInitialState,
  reducers: {
    openCreateModal(state, action: PayloadAction<CreateEventPayload>) {
      state.modal = {
        mode: "create",
        start: action.payload.start,
        end: action.payload.end,
        position: action.payload.position,
      };
    },

    openEditModal(state, action: PayloadAction<OpenEditModalPayload>) {
      state.modal = {
        mode: "edit",
        eventId: action.payload.eventId,
        position: action.payload.position,
      };
    },

    closeModal(state) {
      state.modal = null;
    },

    addEvent(state, action: PayloadAction<CalendarEvent>) {
      state.items.push(action.payload);
      state.modal = null;
    },

    updateEvent(state, action: PayloadAction<CalendarEvent>) {
      const eventIndex = state.items.findIndex((event) => event.id === action.payload.id);

      if (eventIndex !== -1) {
        state.items[eventIndex] = action.payload;
      }

      state.modal = null;
    },

    deleteEvent(state, action: PayloadAction<string>) {
      state.items = state.items.filter((event) => event.id !== action.payload);
      state.modal = null;
    },

    moveEvent(state, action: PayloadAction<MoveEventPayload>) {
      const event = state.items.find((item) => item.id === action.payload.id);

      if (!event) {
        return;
      }

      event.start = action.payload.start;
      event.end = action.payload.end;
    },
  },
});

export const {
  addEvent,
  closeModal,
  deleteEvent,
  moveEvent,
  openCreateModal,
  openEditModal,
  updateEvent,
} = eventsSlice.actions;

export const eventsReducer = eventsSlice.reducer;
