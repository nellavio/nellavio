import React, {
  ChangeEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

import { useClickOutside } from "../../hooks/useClickOutside";
import { ArrowDownSimpleIcon } from "../../assets/icons/ArrowDownSimpleIcon";
import { ArrowUpSimpleIcon } from "../../assets/icons/ArrowUpSimpleIcon";
import { CheckIcon } from "../../assets/icons/CheckIcon";

interface SelectProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
  children?: ReactNode;
  customOnDesktop?: boolean;
  customOptions?: string[];
  direction?: "top" | "bottom";
  isBottomPlaceholderVisible?: boolean;
  enableOptionsDropdownScroll?: boolean;
  ariaLabel?: string;
}

export const Select = ({
  value,
  onChange,
  placeholder,
  customOptions,
  direction = "bottom",
  isBottomPlaceholderVisible = false,
  enableOptionsDropdownScroll = false,
  ariaLabel,
}: SelectProps) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | number>(
    value ?? ""
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const handleCustomChange = (newValue: string) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange({
        target: { value: newValue },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false);
  };

  useClickOutside(dropdownRef, () => setIsSelectOpen(false));

  const clearSelection = () => {
    setSelectedValue("");
    if (onChange) {
      onChange({
        target: { value: "" },
      } as ChangeEvent<HTMLSelectElement>);
    }
    setIsSelectOpen(false);
  };

  return (
    <>
      <div className={`relative `} ref={dropdownRef}>
        <div
          className="text-sm 3xl:text-base rounded-md p-2 pl-3 pr-3 w-full cursor-pointer border border-mainBorder bg-selectBg text-primaryText placeholder-secondaryText hover:!border-inputBorderHover hover:bg-inputBgHover hover:bg-selectBgHover"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          aria-expanded={isSelectOpen}
          aria-label={ariaLabel || placeholder || "Select"}
        >
          {value || placeholder}
        </div>
        <div
          className="text-secondaryText absolute top-2 right-1 w-6 h-6 cursor-pointer pointer-events-none"
          onClick={() => setIsSelectOpen(!isSelectOpen)}
          aria-label={isSelectOpen ? "Collapse dropdown" : "Expand dropdown"}
        >
          {isSelectOpen ? <ArrowUpSimpleIcon /> : <ArrowDownSimpleIcon />}
        </div>
        {/* Dropdown for custom select */}
        {isSelectOpen && (
          <div
            className={`rounded-md backdrop-blur-lg absolute w-full ${
              direction === "top" ? "bottom-[2.8rem]" : "top-[2.9rem]"
            } 
            ${
              enableOptionsDropdownScroll ? "max-h-[13rem] overflow-y-auto" : ""
            }
            border border-inputBorder
           border-inputBorder z-10 bg-dropdownBg bg-dropdownBg text-primaryText text-primaryText`}
          >
            <>
              {customOptions?.map((option, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between text-sm 3xl:text-base p-2 cursor-pointer hover:bg-dropdownBgHover hover:bg-dropdownBgHover
                ${
                  value === option &&
                  "bg-dropdownBgHover bg-dropdownBgHover pointer-events-none"
                }
                `}
                  onClick={() => handleCustomChange(option)}
                  role="option"
                  aria-selected={value === option}
                >
                  {option}
                  {value === option && (
                    <div className="text-secondaryText">
                      <CheckIcon />
                    </div>
                  )}
                </div>
              ))}
              {isBottomPlaceholderVisible && (
                <div
                  className={`text-sm 3xl:text-base p-2 cursor-pointer hover:bg-dropdownBgHover hover:bg-dropdownBgHover
                ${
                  !selectedValue &&
                  "bg-dropdownBgHover bg-dropdownBgHover pointer-events-none"
                }
                `}
                  onClick={clearSelection}
                >
                  {placeholder}
                </div>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};
