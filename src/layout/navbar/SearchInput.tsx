import { forwardRef } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { useSearchInput } from "./hooks/useSearchInput";

interface SearchInputProps {
  closeOthers?: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const SearchInput = forwardRef<HTMLDivElement, SearchInputProps>(
  ({ isOpen, open, close, closeOthers }, ref) => {
    const {
      searchText,
      filteredSections,
      searchPlaceholder,
      noResultsText,
      handleSearchChange,
      handleInputFocus,
      handleSectionClick,
    } = useSearchInput({
      closeOthers,
      open,
      close,
    });

    return (
      <>
        <div
          className="2xl:-ml-1 w-[15rem] h-[2.2rem] 1xl:h-[2.5rem] alternativeScrollbar hidden lg:block"
          ref={ref}
        >
          <div className="relative w-full h-full">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchText}
              onChange={handleSearchChange}
              onFocus={handleInputFocus}
              className="z-30 pl-8 text-primaryText text-xs 1xl:text-sm pt-[0.1rem] bg-[rgb(255,255,255,0.01)] w-full h-full border border-mainBorder hover:border-mainBorderHover rounded-md placeholder:text-xs placeholder:1xl:text-sm"
            />
            <div className="absolute stroke-grayIcon fill-grayIcon top-[0.65rem] xl:top-[0.65rem] 2xl:top-[0.65rem] left-2">
              <SearchIcon />
            </div>
            {isOpen && (
              <div className="absolute top-full left-0 w-[200%] mt-1 bg-dropdownBg border border-inputBorder rounded-md shadow-md z-40 max-h-64 overflow-y-auto">
                {filteredSections.length > 0 ? (
                  filteredSections.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => handleSectionClick(item)}
                      className="flex justify-between items-center px-5 py-4 hover:bg-dropdownBgHover cursor-pointer border-b border-mainBorder last:border-b-0"
                    >
                      <span className="text-primaryText font-medium text-sm 1xl:text-md">
                        {item.translatedSection}
                      </span>
                      <div className="bg-outlinedButtonBg text-secondaryText text-xs px-2 py-1 rounded border border-mainBorder">
                        {item.translatedPage}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-5 py-5 text-center text-secondaryText">
                    {noResultsText}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
);

SearchInput.displayName = "SearchInput";
