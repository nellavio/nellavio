import { LogoIcon } from "../../assets/icons/LogoIcon";
import { useAppStore } from "../../store/appStore";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Link } from "../../i18n/navigation";

export const Logo = () => {
  const { isSideMenuOpen } = useAppStore();
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  const isCollapsed = !isSideMenuOpen && isDesktop;

  return (
    <Link
      href="/"
      className="h-[4.2rem] 1xl:h-20 3xl:h-20 flex items-center text-[1.3rem] xl:text-[1.1rem] 3xl:text-[1.4rem] font-medium"
    >
      <div className="menuItemLogo text-logoBg flex-shrink-0 transition-all duration-200">
        <LogoIcon />
      </div>

      <div
        className={`flex whitespace-nowrap overflow-hidden transition-all duration-200 ease-in-out ${
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        }`}
      >
        <div className="ml-[0.7rem] text-logoBasicText mr-[1px] tracking-wider">
          Spire
        </div>
        <div className="text-mainColor tracking-wider">flow</div>
      </div>
    </Link>
  );
};
