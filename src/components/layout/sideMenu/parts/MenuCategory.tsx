import { useMediaQuery } from "../../../../hooks/useMediaQuery";
import { useAppStore } from "../../../../store/appStore";
import { MenuCategoryProps } from "../types";

export const MenuCategory = ({ title }: MenuCategoryProps) => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const isCollapsed = !isSideMenuOpen && isDesktop;

  return (
    <div
      className={`uppercase text-gray-400 pl-2 text-xs xl:text-xs 3xl:text-xs mt-6 1xl:mt-6 2xl:mt-6 mb-[0.6rem] 3xl:mb-3 whitespace-nowrap overflow-hidden transition-opacity duration-200 ${
        isCollapsed ? "opacity-0" : "opacity-100"
      }`}
    >
      {isCollapsed ? <span aria-hidden="true">{"\u00A0"}</span> : title}
    </div>
  );
};
