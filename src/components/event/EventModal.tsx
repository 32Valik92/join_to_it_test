import { useEffect, useMemo } from "react";
import { useForm, useWatch } from "react-hook-form";
import { IoCloseOutline } from "react-icons/io5";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";

import { DEFAULT_EVENT_COLOR } from "../../constants";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { eventFormSchema, type EventFormValues } from "../../schemas";
import { addEvent, closeModal, deleteEvent, updateEvent } from "../../store";
import type { CalendarEvent } from "../../types";
import {
  buildDateTimeIso,
  createEventId,
  getModalPosition,
  toInputDate,
  toInputTime,
} from "../../utils";
import FieldError from "../ui/FieldError.tsx";

import ColorPicker from "./ColorPicker.tsx";

const EventModal = () => {
  const dispatch = useAppDispatch();
  const modal = useAppSelector((state) => state.events.modal);
  const events = useAppSelector((state) => state.events.items);

  const selectedEvent = useMemo(() => {
    if (modal?.mode !== "edit") {
      return null;
    }

    return events.find((event) => event.id === modal.eventId) ?? null;
  }, [events, modal]);

  const defaultValues = useMemo<EventFormValues>(() => {
    if (modal?.mode === "edit" && selectedEvent) {
      return {
        title: selectedEvent.title,
        date: toInputDate(selectedEvent.start),
        startTime: toInputTime(selectedEvent.start),
        endTime: toInputTime(selectedEvent.end),
        notes: selectedEvent.notes ?? "",
        color: selectedEvent.color ?? DEFAULT_EVENT_COLOR,
      };
    }

    if (modal?.mode === "create") {
      return {
        title: "",
        date: toInputDate(modal.start),
        startTime: toInputTime(modal.start),
        endTime: toInputTime(modal.end),
        notes: "",
        color: DEFAULT_EVENT_COLOR,
      };
    }

    return {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      notes: "",
      color: DEFAULT_EVENT_COLOR,
    };
  }, [modal, selectedEvent]);

  const {
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
    mode: "onSubmit",
  });

  const selectedColor = useWatch({
    control,
    name: "color",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  if (!modal) {
    return null;
  }

  const isEditMode = modal.mode === "edit";
  const position = getModalPosition(modal.position.x, modal.position.y);

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    if (!selectedEvent) {
      return;
    }

    dispatch(deleteEvent(selectedEvent.id));
  };

  const onSubmit = (values: EventFormValues) => {
    const normalizedNotes = values.notes?.trim();

    const eventPayload: CalendarEvent = {
      id: selectedEvent?.id ?? createEventId(),
      title: values.title.trim(),
      start: buildDateTimeIso(values.date, values.startTime),
      end: buildDateTimeIso(values.date, values.endTime),
      color: values.color,
      notes: normalizedNotes ? normalizedNotes : undefined,
    };

    if (isEditMode) {
      dispatch(updateEvent(eventPayload));
      return;
    }

    dispatch(addEvent(eventPayload));
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close modal"
        onClick={handleClose}
        className="fixed inset-0 z-40 cursor-default bg-transparent"
      />

      <div
        className="fixed z-50 w-[440px]"
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
        }}
      >
        <div className="relative rounded-[18px] border border-[#8d8ca3] bg-white px-7 pt-6 pb-6 shadow-[0_18px_48px_rgba(57,56,86,0.2)]">
          <div
            className={clsx(
              "absolute h-5 w-5 rotate-45 bg-white",
              position.placement === "bottom"
                ? "-top-2.5 border-t border-l border-[#8d8ca3]"
                : "-bottom-2.5 border-r border-b border-[#8d8ca3]",
            )}
            style={{
              left: `${position.arrowLeft - 10}px`,
            }}
          />

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 z-[100] flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-[#d7d7e3] text-[#c3c3cf] transition-colors hover:border-[#b8b7c8] hover:text-[#8d8ca3]"
          >
            <IoCloseOutline className="h-6 w-6" />
          </button>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="relative z-10"
          >
            <div className="space-y-4 pr-4">
              <div>
                <input
                  type="text"
                  placeholder="event name"
                  maxLength={30}
                  className="w-full border-b border-[#e1e1ec] bg-transparent pb-3 text-[15px] text-[#55536d] outline-none placeholder:text-[#bdbbcf]"
                  {...register("title")}
                />
                <FieldError message={errors.title?.message} />
              </div>

              <div>
                <input
                  type="date"
                  className="w-full border-b border-[#e1e1ec] bg-transparent pb-3 text-[15px] text-[#55536d] outline-none"
                  {...register("date")}
                />
                <FieldError message={errors.date?.message} />
              </div>

              <div className="grid grid-cols-2 gap-5">
                <div>
                  <input
                    type="time"
                    className="w-full border-b border-[#e1e1ec] bg-transparent pb-3 text-[15px] text-[#55536d] outline-none"
                    {...register("startTime")}
                  />
                  <FieldError message={errors.startTime?.message} />
                </div>

                <div>
                  <input
                    type="time"
                    className="w-full border-b border-[#e1e1ec] bg-transparent pb-3 text-[15px] text-[#55536d] outline-none"
                    {...register("endTime")}
                  />
                  <FieldError message={errors.endTime?.message} />
                </div>
              </div>

              <div>
                <textarea
                  placeholder="notes"
                  className="min-h-[68px] w-full resize-none border-b border-[#e1e1ec] bg-transparent pb-3 text-[15px] text-[#55536d] outline-none placeholder:text-[#bdbbcf]"
                  {...register("notes")}
                />
                <FieldError message={errors.notes?.message} />
              </div>

              <div>
                <ColorPicker
                  value={selectedColor ?? DEFAULT_EVENT_COLOR}
                  onChange={(color) => {
                    setValue("color", color, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                />
                <FieldError message={errors.color?.message} />
              </div>
            </div>

            <div className="mt-7 flex items-center justify-between">
              <button
                type="button"
                onClick={isEditMode ? handleDelete : handleClose}
                className="cursor-pointer text-[15px] font-semibold text-[#ff7f7f] transition-opacity hover:opacity-80"
              >
                {isEditMode ? "Discard" : "Cancel"}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer text-[15px] font-semibold text-[#8a88a1] transition-opacity hover:opacity-80 disabled:opacity-60"
              >
                {isEditMode ? "Edit" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EventModal;
