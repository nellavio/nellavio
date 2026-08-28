import * as SelectPrimitive from "@radix-ui/react-select";
import * as React from "react";

import { CheckIcon } from "@/assets/icons/CheckIcon";
import { ChevronDownIcon } from "@/assets/icons/ChevronDownIcon";
import { ChevronUpIcon } from "@/assets/icons/ChevronUpIcon";
import { cn } from "@/utils/classNames";

/**
 * Root select component that manages dropdown state.
 *
 * @component
 * @example
 * ```tsx
 * <Select value={value} onValueChange={setValue}>
 *   <SelectTrigger>
 *     <SelectValue placeholder="Select option" />
 *   </SelectTrigger>
 *   <SelectContent>
 *     <SelectItem value="1">Option 1</SelectItem>
 *   </SelectContent>
 * </Select>
 * ```
 */
const Select = SelectPrimitive.Root;

/**
 * Groups related select items together with an optional label.
 *
 * @component
 */
const SelectGroup = SelectPrimitive.Group;

/**
 * Displays the selected value in the trigger button.
 *
 * @component
 */
const SelectValue = SelectPrimitive.Value;

/**
 * Button that opens the select dropdown when clicked.
 * Displays the current selection and a chevron icon.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Trigger content (typically SelectValue)
 * @param {React.Ref} ref - Ref to the trigger element
 */
const SelectTrigger = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Trigger>>;
}) => (
  <SelectPrimitive.Trigger
    ref={ref}
    tabIndex={0}
    className={cn(
      "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-inputBorder bg-inputBg px-3 py-2 text-sm transition placeholder:text-secondaryText hover:bg-inputBgHover hover:border-inputBorderHover focus:outline-none focus:border-inputBorderFocus disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDownIcon className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
);

/**
 * Button to scroll up through select options when content overflows.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Ref to the button element
 */
const SelectScrollUpButton = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>>;
}) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronUpIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
);

/**
 * Button to scroll down through select options when content overflows.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Ref to the button element
 */
const SelectScrollDownButton = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>>;
}) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      "flex cursor-default items-center justify-center py-1",
      className,
    )}
    {...props}
  >
    <ChevronDownIcon className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
);

/**
 * Dropdown content container for select options.
 * Includes smooth animations and positioning relative to trigger.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Select items and groups
 * @param {('popper'|'item-aligned')} [position='popper'] - Positioning strategy
 * @param {React.Ref} ref - Ref to the content element
 *
 * @example
 * ```tsx
 * <SelectContent>
 *   <SelectItem value="option1">Option 1</SelectItem>
 *   <SelectItem value="option2">Option 2</SelectItem>
 * </SelectContent>
 * ```
 */
const SelectContent = ({
  className,
  children,
  position = "popper",
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Content>>;
}) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 min-w-32 overflow-hidden rounded-md border border-inputBorder bg-dropdownBg text-primaryText shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
);

/**
 * Label for grouping related select options.
 * Typically used within SelectGroup.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Ref to the label element
 *
 * @example
 * ```tsx
 * <SelectGroup>
 *   <SelectLabel>Fruits</SelectLabel>
 *   <SelectItem value="apple">Apple</SelectItem>
 * </SelectGroup>
 * ```
 */
const SelectLabel = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Label>>;
}) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn(
      "py-1.5 pl-2 pr-2 text-sm font-semibold flex items-center",
      className,
    )}
    {...props}
  >
    <span className="w-3.5 mr-2 shrink-0" />
    {props.children}
  </SelectPrimitive.Label>
);

/**
 * Individual selectable option item.
 * Shows a checkmark when selected.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.ReactNode} children - Item label text
 * @param {string} value - Unique value for this option
 * @param {React.Ref} ref - Ref to the item element
 *
 * @example
 * ```tsx
 * <SelectItem value="dark">Dark Mode</SelectItem>
 * ```
 */
const SelectItem = ({
  className,
  children,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Item>>;
}) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-2 pr-2 text-sm outline-none focus:bg-dropdownBgHover focus:text-primaryText data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute right-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <CheckIcon className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
);

/**
 * Visual separator between groups of select options.
 *
 * @component
 * @param {string} [className] - Additional CSS classes to apply
 * @param {React.Ref} ref - Ref to the separator element
 */
const SelectSeparator = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & {
  ref?: React.Ref<React.ComponentRef<typeof SelectPrimitive.Separator>>;
}) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-inputBorder", className)}
    {...props}
  />
);

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
