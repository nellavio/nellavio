import React, { forwardRef } from "react";

interface DropdownProps {
  children: React.ReactNode;
  className?: string;
  ariaLabelledby?: string;
}

/**
 * Dropdown menu container with ref forwarding support.
 * Provides accessible menu structure with ARIA roles and labels.
 * Positioned absolutely with border, shadow, and themed styling.
 *
 * @component
 * @param {DropdownProps} props - Component props
 * @param {React.ReactNode} props.children - Menu content
 * @param {string} [props.className] - Extra styling classes
 * @param {string} [props.ariaLabelledby] - Accessibility label reference
 * @param {React.Ref<HTMLDivElement>} ref - Forwarded ref to container div
 *
 * @example
 * ```tsx
 * const dropdownRef = useRef(null);
 * <Dropdown ref={dropdownRef} ariaLabelledby="menu-button">
 *   <MenuItem>Option 1</MenuItem>
 *   <MenuItem>Option 2</MenuItem>
 * </Dropdown>
 * ```
 */
export const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, className, ariaLabelledby }, ref) => {
    return (
      <div
        ref={ref}
        role="menu"
        aria-labelledby={ariaLabelledby}
        className={`absolute  z-10 border rounded-md shadow !outline-0 border border-inputBorder bg-dropdownBg text-primaryText placeholder-secondaryText
      ${className}
      `}
      >
        {children}
      </div>
    );
  }
);

Dropdown.displayName = "Dropdown";
