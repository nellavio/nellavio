import React from "react";

interface ExpandableDropdownSectionProps {
  children: React.ReactNode;
}

/**
 * Indented section container for nested dropdown menu items.
 * Displays a vertical line indicator and indents child items
 * to show hierarchical menu structure.
 *
 * @component
 * @param {ExpandableDropdownSectionProps} props - Component props
 * @param {React.ReactNode} props.children - Nested menu content
 *
 * @example
 * ```tsx
 * <ExpandableDropdownSection>
 *   <MenuItem>Sub-item 1</MenuItem>
 *   <MenuItem>Sub-item 2</MenuItem>
 * </ExpandableDropdownSection>
 * ```
 */
export const ExpandableDropdownSection: React.FC<
  ExpandableDropdownSectionProps
> = ({ children }) => {
  return (
    <div className="bg-dropdownBg relative">
      <div
        className="absolute left-[1.6rem] top-0 bottom-0 w-[2px] bg-mainBorder"
        style={{ height: "calc(100% - 1rem)" }}
      ></div>
      <div className="ml-[2.4rem] pl-[0.8rem]">{children}</div>
    </div>
  );
};
