interface TooltipProps {
  text: string;
  className?: string;
}

/**
 * Simple tooltip component for displaying contextual information.
 * Non-interactive overlay with ARIA live region for accessibility.
 * Styled with border, rounded corners, and themed background.
 *
 * @component
 * @param {TooltipProps} props - Component props
 * @param {string} props.text - Content to display
 * @param {string} [props.className] - Extra styling
 *
 * @example
 * ```tsx
 * <Tooltip text="Click to edit" className="absolute top-0" />
 * ```
 */
export const Tooltip = ({ text, className }: TooltipProps) => {
  return (
    <div
      className={`text-primaryText text-nowrap text-xs p-2 px-2 flex items-center justify-center border-mainBorder border rounded-md border-mainBorder bg-tooltipBg !opacity-100 z-50 pointer-events-none ${className}`}
      aria-live="polite"
    >
      {text}
    </div>
  );
};
