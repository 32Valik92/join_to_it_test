import CalendarView from "./components/calendar/CalendarView.tsx";
import EventModal from "./components/event/EventModal.tsx";
import AppLayout from "./components/layout/AppLayout.tsx";

export default function App() {
  return (
    <AppLayout>
      <CalendarView />
      <EventModal />
    </AppLayout>
  );
}
