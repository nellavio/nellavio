import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useDropdown } from "../../../../hooks/useDropdown";
import { useSession } from "../../../../services/auth/auth-client";
import { useLayoutStore } from "../../../../store/layoutStore";
import { BREAKPOINTS } from "../../../../styles/breakpoints";
import { NavbarDropdowns } from "../types";

/**
 * Core navbar hook - aggregates theme, language, session, mobile menu state,
 * and all dropdown instances used by navbar sub-components.
 */
export const useNavbar = () => {
  const { theme, setTheme } = useTheme();
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const isMobileMenuOpen = useLayoutStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useLayoutStore((s) => s.toggleMobileMenu);
  const isSideMenuOpen = useLayoutStore((s) => s.isSideMenuOpen);
  const t = useTranslations("navbar");
  const { data: sessionData, isPending } = useSession();

  /**
   * Returns `null` while the session is loading to avoid flashing
   * logged-in UI before auth state is resolved.
   */
  const session = !isPending
    ? {
        username: sessionData?.user?.email || null,
        isLoggedIn: !!sessionData,
      }
    : null;

  const closeMobileMenu = () => {
    if (isMobileMenuOpen) {
      toggleMobileMenu();
    }
  };

  const themes = ["light", "dark"];
  const themesDisplayNames = ["light", "dark"];

  /** Intentionally runs only on mount - closes mobile menu if viewport is desktop-sized on initial load */
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < BREAKPOINTS.xl && isMobileMenuOpen) {
        toggleMobileMenu();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const userIconBtnRef = useRef<HTMLButtonElement | null>(null);
  const themeDropdown = useDropdown();
  const userDropdown = useDropdown();
  const languageDropdown = useDropdown();
  const searchDropdown = useDropdown();
  const notificationsDropdown = useDropdown();

  /** Detects the active locale from the URL path prefix on mount. */
  useEffect(() => {
    const getCurrentLanguage = () => {
      if (typeof window !== "undefined") {
        const pathname = window.location.pathname;
        return pathname.startsWith("/pl") ? "pl" : "en";
      }
      return "en";
    };
    setCurrentLanguage(getCurrentLanguage());
  }, []);

  const selectTheme = (themeName: string) => {
    setTheme(themeName);
  };

  /**
   * Cycles to the previous theme in the list.
   * Uses modular arithmetic so it wraps from the first to the last theme.
   */
  const cycleThemeUp = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const previousThemeIndex =
        (currentThemeIndex - 1 + themes.length) % themes.length;
      setTheme(themes[previousThemeIndex]);
    }
  };

  /**
   * Cycles to the next theme in the list.
   * Uses modular arithmetic so it wraps from the last to the first theme.
   */
  const cycleThemeDown = () => {
    if (typeof theme === "string") {
      const currentThemeIndex = themes.indexOf(theme);
      const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
      setTheme(themes[nextThemeIndex]);
    }
  };

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    themeDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

  const closeAllExcept = useCallback(
    (keep?: string) => {
      const dropdowns: Record<string, ReturnType<typeof useDropdown>> = {
        user: userDropdown,
        theme: themeDropdown,
        language: languageDropdown,
        notifications: notificationsDropdown,
        search: searchDropdown,
      };
      Object.entries(dropdowns).forEach(([key, dropdown]) => {
        if (key !== keep) dropdown.close();
      });
    },
    [
      userDropdown,
      themeDropdown,
      languageDropdown,
      notificationsDropdown,
      searchDropdown,
    ],
  );

  const navbarDropdowns: NavbarDropdowns = useMemo(
    () => ({
      closeAllExcept,
      isAnyDropdownOpen,
    }),
    [closeAllExcept, isAnyDropdownOpen],
  );

  return {
    theme,
    setTheme,
    currentLanguage,
    setCurrentLanguage,
    isMobileMenuOpen,
    toggleMobileMenu,
    isSideMenuOpen,
    t,
    closeMobileMenu,
    session,
    themes,
    themesDisplayNames,
    userIconBtnRef,
    themeDropdown,
    userDropdown,
    languageDropdown,
    selectTheme,
    cycleThemeUp,
    cycleThemeDown,
    searchDropdown,
    notificationsDropdown,
    navbarDropdowns,
  };
};
