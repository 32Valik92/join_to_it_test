import type { ModalPosition } from "../types";

export const getElementCenterPosition = (element: HTMLElement): ModalPosition => {
  const rect = element.getBoundingClientRect();

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};
