import { z } from "zod";

import { isEndAfterStart } from "../utils";

const timeRegex = /^([01]\d|2[0-3]):[0-5]\d$/;

export const eventFormSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Event name is required")
      .max(30, "Event name must be 30 characters or less"),
    date: z.string().min(1, "Date is required"),
    startTime: z.string().regex(timeRegex, "Start time is required"),
    endTime: z.string().regex(timeRegex, "End time is required"),
    notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
    color: z.enum(["blue", "green", "purple", "orange", "red"], {
      message: "Color is required",
    }),
  })
  .superRefine((values, ctx) => {
    if (!isEndAfterStart(values.date, values.startTime, values.endTime)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End time must be later than start time",
        path: ["endTime"],
      });
    }
  });

export type EventFormValues = z.infer<typeof eventFormSchema>;
