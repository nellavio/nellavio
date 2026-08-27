"use client";

import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";
import { Check, ChevronRight } from "lucide-react";
import * as React from "react";

import { cn } from "@/utils/classNames";

/**
 * Root dropdown menu component that manages menu state.
 * Built on Radix UI DropdownMenu primitive with non-modal behavior.
 *
 * @component
 * @example
 * ```tsx
 * <DropdownMenu>
 *   <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
 *   <DropdownMenuContent>
 *     <DropdownMenuItem>Item 1</DropdownMenuItem>
 *     <DropdownMenuItem>Item 2</DropdownMenuItem>
 *   </DropdownMenuContent>
 * </DropdownMenu>
 * ```
 */
const DropdownMenu = (
  props: React.ComponentProps<typeof DropdownMenuPrimitive.Root>,
) => <DropdownMenuPrimitive.Root modal={false} {...props} />;

/**
 * Button that opens the dropdown menu when clicked.
 *
 * @component
 */
const DropdownMenuTrigger = DropdownMenuPrimitive.Trigger;

/**
 * Group container for related menu items.
 *
 * @component
 */
const DropdownMenuGroup = DropdownMenuPrimitive.Group;

/**
 * Portal container for rendering menu content outside the DOM hierarchy.
 *
 * @component
 */
const DropdownMenuPortal = DropdownMenuPrimitive.Portal;

/**
 * Root component for nested submenus within the dropdown.
 *
 * @component
 */
const DropdownMenuSub = DropdownMenuPrimitive.Sub;

/**
 * Group container for radio menu items with single selection.
 *
 * @component
 */
const DropdownMenuRadioGroup = DropdownMenuPrimitive.RadioGroup;

/**
 * Trigger item that opens a nested submenu when hovered or focused.
 * Displays a chevron icon to indicate expandable content.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Apply left padding to align with other inset items
 * @param {React.Ref} ref - Forwarded ref to the trigger element
 *
 * @example
 * ```tsx
 * <DropdownMenuSub>
 *   <DropdownMenuSubTrigger>More Options</DropdownMenuSubTrigger>
 *   <DropdownMenuSubContent>
 *     <DropdownMenuItem>Nested Item</DropdownMenuItem>
 *   </DropdownMenuSubContent>
 * </DropdownMenuSub>
 * ```
 */
const DropdownMenuSubTrigger = ({
  className,
  inset,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubTrigger> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubTrigger>>;
}) => (
  <DropdownMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default gap-2 select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-dropdownBgHover data-[state=open]:bg-dropdownBgHover [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto" />
  </DropdownMenuPrimitive.SubTrigger>
);

/**
 * Content container for nested submenus with animations.
 * Rendered adjacent to its trigger with smooth fade/zoom transitions.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the content element
 */
const DropdownMenuSubContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.SubContent> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.SubContent>>;
}) => (
  <DropdownMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-32 overflow-hidden rounded-md border border-inputBorder bg-dropdownBg p-1 text-primaryText shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className,
    )}
    {...props}
  />
);

/**
 * Main content container for the dropdown menu.
 * Rendered in a portal with smooth fade/zoom transitions.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {number} [sideOffset=4] - Distance in pixels from the trigger element
 * @param {React.Ref} ref - Forwarded ref to the content element
 *
 * @example
 * ```tsx
 * <DropdownMenuContent sideOffset={8}>
 *   <DropdownMenuItem>Edit</DropdownMenuItem>
 *   <DropdownMenuItem>Delete</DropdownMenuItem>
 * </DropdownMenuContent>
 * ```
 */
const DropdownMenuContent = ({
  className,
  sideOffset = 4,
  loop = true,
  onCloseAutoFocus,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Content>>;
}) => {
  const closedWithPointerRef = React.useRef(false);

  return (
    <DropdownMenuPrimitive.Portal>
      <DropdownMenuPrimitive.Content
        ref={ref}
        sideOffset={sideOffset}
        loop={loop}
        className={cn(
          "z-50 min-w-32 overflow-hidden rounded-md border border-inputBorder bg-dropdownBg p-1 text-primaryText shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className,
        )}
        onPointerDown={() => {
          closedWithPointerRef.current = true;
        }}
        onPointerDownOutside={() => {
          closedWithPointerRef.current = true;
        }}
        onCloseAutoFocus={(e) => {
          if (closedWithPointerRef.current) {
            e.preventDefault();
            closedWithPointerRef.current = false;
          }
          onCloseAutoFocus?.(e);
        }}
        {...props}
      />
    </DropdownMenuPrimitive.Portal>
  );
};

/**
 * Interactive menu item that triggers an action when selected.
 * Supports keyboard navigation and focus states.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Apply left padding to align with items that have icons
 * @param {React.Ref} ref - Forwarded ref to the item element
 *
 * @example
 * ```tsx
 * <DropdownMenuItem onClick={handleEdit}>
 *   <EditIcon />
 *   Edit Item
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuItem = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Item> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Item>>;
}) => (
  <DropdownMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-dropdownBgHover focus:text-primaryText data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

/**
 * Menu item with checkbox functionality for toggling options.
 * Displays a check indicator when selected.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [checked] - Whether the item is currently checked
 * @param {React.Ref} ref - Forwarded ref to the item element
 *
 * @example
 * ```tsx
 * <DropdownMenuCheckboxItem checked={showLabels} onCheckedChange={setShowLabels}>
 *   Show Labels
 * </DropdownMenuCheckboxItem>
 * ```
 */
const DropdownMenuCheckboxItem = ({
  className,
  children,
  checked,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.CheckboxItem> & {
  ref?: React.Ref<
    React.ComponentRef<typeof DropdownMenuPrimitive.CheckboxItem>
  >;
}) => (
  <DropdownMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors focus:bg-dropdownBgHover focus:text-primaryText data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.CheckboxItem>
);

/**
 * Menu item for radio group selection with single choice behavior.
 * Displays a check indicator when selected within its radio group.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the item element
 *
 * @example
 * ```tsx
 * <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
 *   <DropdownMenuRadioItem value="date">Sort by Date</DropdownMenuRadioItem>
 *   <DropdownMenuRadioItem value="name">Sort by Name</DropdownMenuRadioItem>
 * </DropdownMenuRadioGroup>
 * ```
 */
const DropdownMenuRadioItem = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.RadioItem> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.RadioItem>>;
}) => (
  <DropdownMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none transition-colors focus:bg-dropdownBgHover focus:text-primaryText data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </DropdownMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </DropdownMenuPrimitive.RadioItem>
);

/**
 * Non-interactive label for grouping or describing menu items.
 * Displayed with semibold styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {boolean} [inset] - Apply left padding to align with other inset items
 * @param {React.Ref} ref - Forwarded ref to the label element
 *
 * @example
 * ```tsx
 * <DropdownMenuLabel>Account</DropdownMenuLabel>
 * <DropdownMenuItem>Profile</DropdownMenuItem>
 * <DropdownMenuItem>Settings</DropdownMenuItem>
 * ```
 */
const DropdownMenuLabel = ({
  className,
  inset,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Label> & {
  inset?: boolean;
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Label>>;
}) => (
  <DropdownMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold",
      inset && "pl-8",
      className,
    )}
    {...props}
  />
);

/**
 * Visual divider line between menu items or groups.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Forwarded ref to the separator element
 */
const DropdownMenuSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof DropdownMenuPrimitive.Separator>>;
}) => (
  <DropdownMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-mainBorder", className)}
    {...props}
  />
);

/**
 * Keyboard shortcut hint displayed alongside menu items.
 * Positioned to the right with muted styling.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 *
 * @example
 * ```tsx
 * <DropdownMenuItem>
 *   Save
 *   <DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
 * </DropdownMenuItem>
 * ```
 */
const DropdownMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn("ml-auto text-xs tracking-widest opacity-60", className)}
      {...props}
    />
  );
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";

export {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
};
