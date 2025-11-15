import { useTranslations } from "next-intl";

import { FilterIcon } from "../../../assets/icons/FilterIcon";
import { OutlinedButton } from "../../common/OutlinedButton";
import { Dropdown } from "../../common/Dropdown";
import { useDropdown } from "../../../hooks/useDropdown";
import { CheckIcon } from "../../../assets/icons/CheckIcon";
import { CustomersDropdownProps } from "./types";

export const CustomersCountryDropdown = ({
  options,
  filterKey,
  setFilter,
  filters,
}: CustomersDropdownProps) => {
  const t = useTranslations("customers");
  const { isOpen, toggle, close, ref } = useDropdown();

  const activeFilter = filters[filterKey];

  return (
    <div
      className="relative inline-block w-44 2xl:w-48 max-[450px]:w-full"
      ref={ref}
    >
      <OutlinedButton
        handleClick={toggle}
        icon={<FilterIcon />}
        text={t("button.filterByCountry")}
        className="text-sm max-[450px]:w-full"
      />
      {isOpen && (
        <Dropdown className="-right-0 md:-right-0 w-[12rem] top-[3.3rem]">
          {options.map((option) => (
            <div
              key={option}
              className={`flex text-sm 3xl:text-base justify-between cursor-pointer px-4 hover:bg-dropdownBgHover py-2 ${
                activeFilter === option && "bg-dropdownBgHover"
              }  `}
              onClick={() => {
                setFilter(filterKey, option);
                close();
              }}
            >
              {option}
              {activeFilter === option && (
                <div className="text-secondaryText">
                  <CheckIcon />
                </div>
              )}
            </div>
          ))}
          <div
            className="px-4 py-2 text-sm 3xl:text-base cursor-pointer hover:bg-dropdownBgHover border-t border-mainBorder"
            onClick={() => {
              setFilter(filterKey, undefined);
              close();
            }}
          >
            {t("button.clearFilter")}
          </div>
        </Dropdown>
      )}
    </div>
  );
};
