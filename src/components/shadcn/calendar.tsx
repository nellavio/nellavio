import * as React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type CalendarProps = {
  mode?: "single";
  selected?: Date;
  onSelect?: (date: Date | undefined) => void;
  initialFocus?: boolean;
  className?: string;
};

/**
 * Date picker calendar component for selecting dates.
 * Built on react-datepicker with inline display.
 *
 * @component
 * @param {Date} [selected] - Currently selected date
 * @param {Function} [onSelect] - Handler called when user selects a date
 * @param {string} [className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <Calendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 * />
 * ```
 */
function Calendar({ selected, onSelect, className, ...props }: CalendarProps) {
  const handleDateChange = (date: Date | null) => {
    onSelect?.(date || undefined);
  };

  return (
    <DatePicker
      selected={selected}
      onChange={handleDateChange}
      inline
      className={className}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar";

export { Calendar };
