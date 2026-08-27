import * as AvatarPrimitive from "@radix-ui/react-avatar";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Root avatar container component for displaying user profile images.
 * Built on Radix UI Avatar primitive with automatic fallback handling when images fail to load.
 * Renders as a circular container with consistent sizing and overflow handling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply for custom styling
 * @param {React.ReactNode} children - Avatar content (typically AvatarImage and AvatarFallback)
 * @param {React.Ref} ref - Ref to the avatar container
 *
 * @example
 * ```tsx
 * // Basic avatar with image and fallback
 * <Avatar>
 *   <AvatarImage src="https://avatars.githubusercontent.com/u/124599?v=4" alt="@shadcn" />
 *   <AvatarFallback>CN</AvatarFallback>
 * </Avatar>
 * ```
 */
const Avatar = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Root>>;
}) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
);

/**
 * Avatar image component that displays the user's profile picture.
 * Automatically falls back to AvatarFallback component when image fails to load or src is invalid.
 * Maintains aspect ratio and fills the avatar container.
 *
 * @component
 * @param {string} src - Image source URL for the avatar
 * @param {string} alt - Alternative text for accessibility (required for screen readers)
 * @param {string} [className] - Additional CSS classes to apply
 * @param {Function} [onLoadingStatusChange] - Callback when image loading status changes
 * @param {React.Ref} ref - Ref to the image element
 *
 * @example
 * ```tsx
 * // Standard avatar image
 * <AvatarImage
 *   src="https://api.example.com/avatar/123"
 *   alt="John Doe's avatar"
 * />
 * ```
 */
const AvatarImage = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Image>>;
}) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
);

/**
 * Fallback content displayed when avatar image fails to load or is unavailable.
 * Typically shows user initials, an icon, or placeholder text.
 * Renders with a background color to ensure visibility and consistency.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Fallback content (typically initials or icon)
 * @param {number} [delayMs] - Delay in milliseconds before showing fallback (prevents flash)
 * @param {React.Ref} ref - Ref to the fallback element
 *
 * @example
 * ```tsx
 * <AvatarFallback className="bg-blue-500 text-white">
 *   AB
 * </AvatarFallback>
 * ```
 */
const AvatarFallback = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> & {
  ref?: React.Ref<React.ComponentRef<typeof AvatarPrimitive.Fallback>>;
}) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-secondaryBg text-primaryText",
      className,
    )}
    {...props}
  />
);

export { Avatar, AvatarFallback, AvatarImage };
