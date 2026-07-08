import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Root tabs component that manages tab state and navigation.
 * Uses Radix UI for accessibility and keyboard navigation.
 *
 * @component
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <TabsList>
 *     <TabsTrigger value="tab1">Tab 1</TabsTrigger>
 *     <TabsTrigger value="tab2">Tab 2</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="tab1">Content 1</TabsContent>
 *   <TabsContent value="tab2">Content 2</TabsContent>
 * </Tabs>
 * ```
 */
const Tabs = TabsPrimitive.Root;

/**
 * Container for tab triggers with two style variants.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'line')} [variant='default'] - Visual style variant
 * @param {React.Ref} ref - Forwarded ref to the list element
 *
 * @example
 * ```tsx
 * <TabsList variant="line">
 *   <TabsTrigger value="overview">Overview</TabsTrigger>
 * </TabsList>
 * ```
 */
const TabsList = ({
  className,
  variant = "default",
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> & {
  variant?: "default" | "line";
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.List>>;
}) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center",
      variant === "default" &&
        "rounded-md bg-tabListBg text-secondaryText px-1",
      variant === "line" &&
        "border-b border-mainBorder w-full justify-start gap-0 px-0",
      className,
    )}
    {...props}
  />
);

/**
 * Individual tab button that activates its corresponding content panel.
 * Supports default pill-style and underline variants.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {('default'|'line')} [variant='default'] - Visual style variant matching TabsList
 * @param {React.Ref} ref - Forwarded ref to the button element
 *
 * @example
 * ```tsx
 * <TabsTrigger value="settings" variant="line">
 *   Settings
 * </TabsTrigger>
 * ```
 */
const TabsTrigger = ({
  className,
  variant = "default",
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
  variant?: "default" | "line";
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Trigger>>;
}) => (
  <TabsPrimitive.Trigger
    ref={ref}
    tabIndex={0}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50",
      variant === "default" &&
        "rounded-md hover:text-tabDefaultInactiveTextHover data-[state=active]:bg-tabActiveBg data-[state=active]:text-primaryText data-[state=active]:hover:text-primaryText data-[state=active]:hover:bg-tabActiveBgHover",
      variant === "line" &&
        "h-full cursor-pointer rounded-none border-b-2 border-transparent text-tabLineInactiveText hover:text-tabLineInactiveTextHover data-[state=active]:border-tabLineActiveBorder data-[state=active]:text-tabLineActiveText data-[state=active]:hover:text-tabLineActiveTextHover",
      className,
    )}
    {...props}
  />
);

/**
 * Content panel that displays when its corresponding tab trigger is active.
 * Only one content panel is visible at a time.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the content element
 *
 * @example
 * ```tsx
 * <TabsContent value="account">
 *   <p>Account settings content</p>
 * </TabsContent>
 * ```
 */
const TabsContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof TabsPrimitive.Content>>;
}) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn("mt-2", className)}
    {...props}
  />
);

export { Tabs, TabsContent, TabsList, TabsTrigger };
