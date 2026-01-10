interface BadgeProps {
  value: string | number;
  type: "increase" | "decrease";
  accented?: boolean;
  className?: string;
}

/**
 * Badge component for displaying percentage changes or metrics.
 * Automatically formats numbers with percentage sign and +/- prefix.
 * Provides visual indication through color coding (green for increase, red for decrease).
 *
 * @component
 * @param {BadgeProps} props - Component props
 * @param {string | number} props.value - Value to display (number auto-adds %)
 * @param {('increase' | 'decrease')} props.type - Determines color and prefix
 * @param {boolean} [props.accented=false] - More vibrant color variant
 * @param {string} [props.className] - Extra styling classes
 *
 * @example
 * ```tsx
 * <Badge value={12.5} type="increase" />
 * <Badge value="5.2%" type="decrease" accented />
 * ```
 */
export const Badge = ({
  value,
  type,
  accented = false,
  className = "",
}: BadgeProps) => {
  const isIncrease = type === "increase";
  const displayValue = typeof value === "number" ? `${value}%` : value;
  const prefix = isIncrease ? "+" : "-";

  const textColorClass = accented
    ? isIncrease
      ? "text-percentageBadgeGreenTextAccented"
      : "text-percentageBadgeRedTextAccented"
    : isIncrease
      ? "text-percentageBadgeGreenText"
      : "text-percentageBadgeRedText";

  const paddingClass = accented ? "px-[0.525rem]" : "px-1.5";

  return (
    <div
      className={`text-xs ${textColorClass} ${
        isIncrease
          ? "bg-percentageBadgeGreenBg border-percentageBadgeGreenBorder"
          : "bg-percentageBadgeRedBg border-percentageBadgeRedBorder"
      } border rounded-md ${paddingClass} py-0.5 ${className}`}
    >
      {prefix}
      {displayValue}
    </div>
  );
};
