import { configureStore } from "@reduxjs/toolkit";

import { loadEventsFromStorage, saveEventsToStorage } from "../utils";

import { eventsInitialState, eventsReducer, type EventsState } from "./slice";

const preloadedEventsState: EventsState = {
  ...eventsInitialState,
  items: loadEventsFromStorage(),
};

export const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
  preloadedState: {
    events: preloadedEventsState,
  },
});

store.subscribe(() => {
  saveEventsToStorage(store.getState().events.items);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
