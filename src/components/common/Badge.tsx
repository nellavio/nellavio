interface BadgeProps {
  value: string | number;
  type: "increase" | "decrease";
  accented?: boolean;
  className?: string;
}

export const Badge = ({ value, type, accented = false, className = "" }: BadgeProps) => {
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
