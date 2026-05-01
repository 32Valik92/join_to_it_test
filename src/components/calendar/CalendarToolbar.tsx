import clsx from "clsx";

import type { CalendarViewType } from "../../types";

interface CalendarToolbarProps {
  title: string;
  activeView: CalendarViewType;
  onToday: () => void;
  onPrev: () => void;
  onNext: () => void;
  onChangeView: (view: CalendarViewType) => void;
}

const views: Array<{
  label: string;
  value: CalendarViewType;
}> = [
  { label: "Month", value: "dayGridMonth" },
  { label: "Week", value: "timeGridWeek" },
  { label: "Day", value: "timeGridDay" },
  { label: "Agenda", value: "listWeek" },
];

const CalendarToolbar = ({
  activeView,
  onChangeView,
  onNext,
  onPrev,
  onToday,
  title,
}: CalendarToolbarProps) => {
  return (
    <div className="mb-6">
      <div className="mb-5 flex items-start justify-between gap-6">
        <h2 className="text-[18px] font-semibold text-foreground">Calendar View</h2>

        <div className="flex items-center overflow-hidden rounded-md border border-border bg-white shadow-sm">
          {views.map((view) => {
            const isActive = activeView === view.value;

            return (
              <button
                key={view.value}
                type="button"
                onClick={() => onChangeView(view.value)}
                className={clsx(
                  "cursor-pointer h-10 min-w-[64px] border-r border-border px-4 text-[13px] font-semibold transition-colors last:border-r-0",
                  isActive
                    ? "bg-white text-primary"
                    : "bg-white text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {view.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative flex min-h-[40px] items-center">
        <div className="flex items-center overflow-hidden rounded-md border border-border bg-white shadow-sm">
          <button
            type="button"
            onClick={onToday}
            className="cursor-pointer h-10 border-r border-border px-5 text-[13px] font-semibold text-primary transition-colors hover:bg-muted"
          >
            Today
          </button>

          <button
            type="button"
            onClick={onPrev}
            className="cursor-pointer h-10 border-r border-border px-5 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Back
          </button>

          <button
            type="button"
            onClick={onNext}
            className="cursor-pointer h-10 px-5 text-[13px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            Next
          </button>
        </div>

        <div className="pointer-events-none absolute left-1/2 -translate-x-1/2">
          <p className="text-[18px] font-semibold text-foreground">{title}</p>
        </div>
      </div>
    </div>
  );
};

export default CalendarToolbar;
