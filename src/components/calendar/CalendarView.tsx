import { type ComponentProps, useMemo, useRef, useState } from "react";
import type { EventContentArg, EventInput, EventMountArg } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

import { DEFAULT_EVENT_COLOR, getEventColorHex } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { moveEvent, openCreateModal, openEditModal } from "../../store";
import type { CalendarViewType } from "../../types";
import { getDefaultEndDate, getDefaultStartDate, getElementCenterPosition } from "../../utils";

import CalendarToolbar from "./CalendarToolbar.tsx";

type FullCalendarProps = ComponentProps<typeof FullCalendar>;

const CalendarView = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.items);
  const modal = useAppSelector((state) => state.events.modal);

  const calendarRef = useRef<FullCalendar | null>(null);

  const [calendarTitle, setCalendarTitle] = useState("Calendar");
  const [activeView, setActiveView] = useState<CalendarViewType>("dayGridMonth");

  const selectedEventId = modal?.mode === "edit" ? modal.eventId : null;

  const calendarEvents = useMemo<EventInput[]>(() => {
    return events.map((event) => {
      const eventColor = event.color ?? DEFAULT_EVENT_COLOR;
      const colorValue = getEventColorHex(eventColor);
      const isSelected = selectedEventId === event.id;

      return {
        id: event.id,
        title: event.title,
        start: event.start,
        end: event.end,
        backgroundColor: isSelected ? "#ffffff" : colorValue,
        borderColor: colorValue,
        textColor: isSelected ? colorValue : "#ffffff",
        classNames: isSelected ? ["calendar-event", "calendar-event-selected"] : ["calendar-event"],
        extendedProps: {
          color: eventColor,
          colorValue,
          notes: event.notes,
        },
      };
    });
  }, [events, selectedEventId]);

  const calendarRenderKey = useMemo(
    () =>
      events
        .map((event) => `${event.id}-${event.title}-${event.start}-${event.end}-${event.color}`)
        .join("|"),
    [events],
  );

  const handleDatesSet: NonNullable<FullCalendarProps["datesSet"]> = (arg) => {
    setCalendarTitle(arg.view.title);
    setActiveView(arg.view.type as CalendarViewType);
  };

  const handleDateClick: NonNullable<FullCalendarProps["dateClick"]> = (arg) => {
    const start = getDefaultStartDate(arg.date, arg.allDay);
    const end = getDefaultEndDate(start);
    const position = getElementCenterPosition(arg.dayEl);

    dispatch(
      openCreateModal({
        start: start.toISOString(),
        end: end.toISOString(),
        position,
      }),
    );
  };

  const handleEventClick: NonNullable<FullCalendarProps["eventClick"]> = (arg) => {
    const position = getElementCenterPosition(arg.el);

    dispatch(
      openEditModal({
        eventId: arg.event.id,
        position,
      }),
    );
  };

  const handleEventDrop: NonNullable<FullCalendarProps["eventDrop"]> = (arg) => {
    const start = arg.event.start;

    if (!start) {
      return;
    }

    const end = arg.event.end ?? getDefaultEndDate(start);

    dispatch(
      moveEvent({
        id: arg.event.id,
        start: start.toISOString(),
        end: end.toISOString(),
      }),
    );
  };

  const handleEventDidMount = (arg: EventMountArg) => {
    const colorValue = arg.event.extendedProps.colorValue;

    if (typeof colorValue === "string") {
      arg.el.style.setProperty("--calendar-event-color", colorValue);

      if (!arg.el.classList.contains("calendar-event-selected")) {
        arg.el.style.backgroundColor = colorValue;
        arg.el.style.borderColor = colorValue;
        arg.el.style.color = "#ffffff";
      }
    }
  };

  const handleToday = () => {
    calendarRef.current?.getApi().today();
  };

  const handlePrev = () => {
    calendarRef.current?.getApi().prev();
  };

  const handleNext = () => {
    calendarRef.current?.getApi().next();
  };

  const handleChangeView = (view: CalendarViewType) => {
    calendarRef.current?.getApi().changeView(view);
    setActiveView(view);
  };

  const renderEventContent = (eventInfo: EventContentArg) => {
    const isMonthView = eventInfo.view.type === "dayGridMonth";

    return (
      <div className="calendar-event-content">
        {!isMonthView && eventInfo.timeText ? (
          <span className="calendar-event-time">{eventInfo.timeText}</span>
        ) : null}

        <span className="calendar-event-title">{eventInfo.event.title}</span>
      </div>
    );
  };

  return (
    <section className="rounded-[28px] bg-card p-5 shadow-sm md:p-7">
      <div className="mb-6">
        <h1 className="mb-5 text-[22px] font-semibold text-foreground">Calendar</h1>

        <CalendarToolbar
          title={calendarTitle}
          activeView={activeView}
          onToday={handleToday}
          onPrev={handlePrev}
          onNext={handleNext}
          onChangeView={handleChangeView}
        />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[920px]">
          <FullCalendar
            key={calendarRenderKey}
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
            initialView={activeView}
            headerToolbar={false}
            events={calendarEvents}
            editable
            eventDurationEditable={false}
            slotEventOverlap={false}
            dayMaxEvents
            nowIndicator
            weekends
            height="auto"
            firstDay={0}
            slotMinTime="00:00:00"
            slotMaxTime="24:00:00"
            slotLabelFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            }}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            eventDrop={handleEventDrop}
            eventDidMount={handleEventDidMount}
            datesSet={handleDatesSet}
            eventContent={renderEventContent}
          />
        </div>
      </div>
    </section>
  );
};

export default CalendarView;
