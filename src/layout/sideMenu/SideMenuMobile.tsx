import { useTranslations } from "next-intl";

import { useSession } from "../../lib/auth-client";
import { AnalyticsIcon } from "../../assets/icons/AnalyticsIcon";
import { CalendarIcon } from "../../assets/icons/CalendarIcon";
import { DashboardIcon } from "../../assets/icons/DashboardIcon";
import { UserIcon } from "../../assets/icons/UserIcon";
import { useAppStore } from "../../store/appStore";
import { MenuCategory } from "./MenuCategory";
import { MenuItem } from "./MenuItem";
import { MenuItemWithSubmenu } from "./MenuItemWithSubmenu";
import { useIsFirstRender } from "../../hooks/useIsFirstRender";
import { SideMenuMobileProps } from "./types";
import { PasswordIcon } from "../../assets/icons/PasswordIcon";
import { DonutIcon } from "../../assets/icons/DonutIcon";
import { EcommerceIcon } from "../../assets/icons/EcommerceIcon";
import { UserProfileIcon } from "../../assets/icons/UserProfileIcon";
import { FormsIcon } from "../../assets/icons/FormsIcon";
import { UIElementsIcon } from "../../assets/icons/UIElementsIcon";
import { TablesIcon } from "../../assets/icons/TablesIcon";

export const SideMenuMobile = ({
  isMobileMenuOpen,
  onLoginButtonClick,
}: SideMenuMobileProps) => {
  const toggleMobileMenu = useAppStore((state) => state.toggleMobileMenu);
  const { data: sessionData, isPending } = useSession();
  const isSignedIn = !!sessionData;
  const isLoaded = !isPending;
  const t = useTranslations("sideMenu");

  // First render check needed to prevent hydration mismatch errors
  const isFirstRender = useIsFirstRender();
  if (isFirstRender) return null;

  return (
    <nav
      aria-label="Mobile navigation"
      aria-hidden={!isMobileMenuOpen}
      className={`z-50 overflow-auto overflow-x-hidden flex fixed xl:hidden flex-col justify-between bg-primaryBg border-r-[1px] border-mainBorder bg-primaryBg white top-[4.5rem] xl:top-[4rem] 2xl:top-[4.5rem] mb-[2.5rem] left-0 items-center transform transition-transform ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ height: "calc(100dvh - 4.5rem)" }}
    >
      <div className="px-4 xl:px-6 pt-0 pr-6 transition w-[16rem] pb-2">
        <MenuCategory title={t("pages")} />
        <MenuItem title={t("dashboard")} icon={<DashboardIcon />} path="/" />
        <MenuItemWithSubmenu
          title={t("eCommerce")}
          icon={<EcommerceIcon />}
          submenuItems={[
            { title: t("orders"), path: "/orders" },
            { title: t("customers"), path: "/customers" },
            { title: t("products"), path: "/products" },
          ]}
        />
        <MenuItem
          title={t("analytics")}
          icon={<AnalyticsIcon />}
          path="/analytics"
        />
        <MenuItem
          title={t("userProfile")}
          icon={<UserProfileIcon />}
          path="/profile"
        />
        <MenuItem
          title={t("calendar")}
          icon={<CalendarIcon />}
          path="/calendar"
        />
        <MenuItemWithSubmenu
          title={t("authentication")}
          icon={<PasswordIcon />}
          submenuItems={[
            { title: t("login"), path: "/login", newTab: true },
            { title: t("register"), path: "/register", newTab: true },
          ]}
        />
        <MenuCategory title={t("components")} />
        <MenuItem
          title={t("uiElements")}
          icon={<UIElementsIcon />}
          path="/ui-elements"
        />
        <MenuItem title={t("forms")} icon={<FormsIcon />} path="/forms" />
        <MenuItem title={t("tables")} icon={<TablesIcon />} path="/tables" />
        <MenuItem title={t("charts")} icon={<DonutIcon />} path="/charts" />
      </div>
      <div className="w-full">
        {isLoaded && isSignedIn && sessionData?.user && (
          <div className="w-full border-t-2 border-mainBorder">
            <div className="flex items-center gap-3 px-6 py-4">
              <div className="w-10 h-10 rounded-full bg-outlinedButtonBg border border-mainBorder flex items-center justify-center stroke-grayIcon fill-grayIcon">
                <UserIcon />
              </div>
              <div className="flex flex-col">
                <span className="text-primaryText font-medium text-sm">
                  {sessionData.user.email}
                </span>
              </div>
            </div>
          </div>
        )}
        {isLoaded && !isSignedIn && (
          <div className="w-full border-t-0 border-mainBorder px-4 pt-8 mb-6">
            <button
              onClick={() => {
                onLoginButtonClick();
                toggleMobileMenu();
              }}
              className="block hover:bg-navbarButtonBgHover xl:hidden mt-auto mb-8 rounded-xl w-full h-10 flex justify-center items-center font-medium border border-mainColor text-primaryText bg-[rgb(255,255,255,0.02)] hover:bg-[rgb(255,255,255,0.06)] mt-12"
            >
              {t("signIn")}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
