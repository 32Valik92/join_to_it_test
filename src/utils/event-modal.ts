import type { ModalComputedPosition } from "../types";

export const createEventId = (): string => {
  return crypto.randomUUID();
};

export const getModalPosition = (x: number, y: number): ModalComputedPosition => {
  if (typeof window === "undefined") {
    return {
      top: 220,
      left: 520,
      placement: "bottom",
      arrowLeft: 160,
    };
  }

  const modalWidth = 440;
  const modalHeight = 420;
  const gap = 14;
  const padding = 16;
  const minTop = 72;

  const left = Math.min(
    Math.max(x - modalWidth / 2, padding),
    window.innerWidth - modalWidth - padding,
  );

  const isLowerScreenPart = y > window.innerHeight * 0.55;

  const doesNotFitBelow = y + gap + modalHeight > window.innerHeight - padding;

  const shouldOpenAbove = isLowerScreenPart || doesNotFitBelow;

  const top = shouldOpenAbove ? Math.max(y - modalHeight - gap, minTop) : Math.max(y + gap, minTop);

  const arrowLeft = Math.min(Math.max(x - left, 24), modalWidth - 24);

  return {
    top,
    left,
    placement: shouldOpenAbove ? "top" : "bottom",
    arrowLeft,
  };
};
