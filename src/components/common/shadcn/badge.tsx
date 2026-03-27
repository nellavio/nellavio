import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Style variants configuration for the Badge component.
 */
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-badgeDefaultBg text-white hover:bg-badgeDefaultBgHover",
        secondary:
          "border-transparent bg-secondaryBg text-primaryText hover:bg-secondaryBg/80",
        destructive:
          "border-transparent bg-errorBg text-white hover:bg-errorBgHover",
        outline:
          "text-primaryText border-inputBorder bg-chipBg hover:bg-chipBgHover",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Small badge component for labels, status indicators, and counts.
 * Displays inline with rounded pill shape in multiple color variants.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'secondary'|'destructive'|'outline')} [variant='default'] - Style variant
 *
 * @example
 * ```tsx
 * <Badge>New</Badge>
 * <Badge variant="destructive">Error</Badge>
 * <Badge variant="outline">Draft</Badge>
 * ```
 */
const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
};

export { Badge, badgeVariants };
