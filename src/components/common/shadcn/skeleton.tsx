import { cn } from "../../../lib/utils";

/**
 * Skeleton loader component for displaying placeholder content while data is loading.
 * Uses pulse animation to indicate loading state.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply for custom sizing and positioning
 * @param {React.HTMLAttributes<HTMLDivElement>} props - Standard div element props
 *
 * @example
 * ```tsx
 * <Skeleton className="h-12 w-full" />
 * <Skeleton className="h-4 w-[250px]" />
 * <Skeleton className="h-4 w-[200px]" />
 * ```
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-skeletonBg", className)}
      {...props}
    />
  );
}

export { Skeleton };
