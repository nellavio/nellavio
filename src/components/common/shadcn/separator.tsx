import * as SeparatorPrimitive from "@radix-ui/react-separator";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Separator component for visually dividing content sections.
 * Built on Radix UI Separator primitive with proper semantic HTML and ARIA attributes.
 * Supports both horizontal and vertical orientations.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('horizontal'|'vertical')} [orientation='horizontal'] - Direction of the separator
 * @param {boolean} [decorative=true] - Whether the separator is purely decorative (affects ARIA)
 * @param {React.Ref} ref - Ref to the separator element
 *
 * @example
 * ```tsx
 * <div>Content above</div>
 * <Separator className="my-4" />
 * <div>Content below</div>
 *
 * <div className="flex">
 *   <div>Left content</div>
 *   <Separator orientation="vertical" className="mx-2" />
 *   <div>Right content</div>
 * </div>
 * ```
 */
interface SeparatorProps extends React.ComponentPropsWithoutRef<
  typeof SeparatorPrimitive.Root
> {
  color?: string;
}

const Separator = ({
  className,
  orientation = "horizontal",
  decorative = true,
  color,
  ref,
  ...props
}: SeparatorProps & {
  ref?: React.Ref<React.ComponentRef<typeof SeparatorPrimitive.Root>>;
}) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      "shrink-0",
      !color && "bg-inputBorder",
      orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
      className,
    )}
    style={color ? { backgroundColor: color } : undefined}
    {...props}
  />
);

export { Separator };
