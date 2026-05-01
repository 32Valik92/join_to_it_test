import clsx from "clsx";

import { EVENT_COLORS } from "../../constants";
import type { EventColor } from "../../types";

interface ColorPickerProps {
  value: EventColor;
  onChange: (color: EventColor) => void;
}

const ColorPicker = ({ value, onChange }: ColorPickerProps) => {
  return (
    <div>
      <p className="mb-2 text-[12px] font-semibold text-[#8a88a1]">color</p>

      <div className="flex items-center gap-2">
        {EVENT_COLORS.map((color) => {
          const isSelected = color.value === value;

          return (
            <button
              key={color.value}
              type="button"
              aria-label={color.label}
              onClick={() => onChange(color.value)}
              className={clsx(
                "ease-pop h-5 w-5 rounded-full border transition-transform duration-200",
                color.className,
                isSelected
                  ? "scale-110 border-[#55536d] ring-2 ring-[#e3e2ef]"
                  : "border-transparent hover:scale-105",
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
