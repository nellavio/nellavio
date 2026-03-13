import { useTheme } from "next-themes";
import { useEffect } from "react";

import { useLayoutStore } from "../store/layoutStore";
import { BREAKPOINTS } from "../styles/breakpoints";

interface UseGlobalHotkeysOptions {
  isAuthPage: boolean;
}

const isEditableTarget = (target: EventTarget | null): boolean => {
  if (!(target instanceof HTMLElement)) return false;
  if (
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement
  )
    return true;
  if (target.isContentEditable) return true;
  return false;
};

/**
 * Global keyboard shortcuts for the dashboard.
 * Registers Ctrl+K (focus search), Ctrl+\ (toggle sidebar), and Ctrl+/ (toggle theme).
 * All shortcuts are desktop-only (above xl breakpoint) and disabled inside text inputs
 * (except Ctrl+K which works regardless of focus). Search and sidebar shortcuts
 * are skipped on auth pages; theme toggle works everywhere.
 *
 * @param isAuthPage - Whether the current page is an auth page (login, register, etc.)
 */
export const useGlobalHotkeys = ({ isAuthPage }: UseGlobalHotkeysOptions) => {
  const { theme, setTheme } = useTheme();
  const toggleSideMenu = useLayoutStore((s) => s.toggleSideMenu);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < BREAKPOINTS.xl) return;

      const isCtrl = e.ctrlKey || e.metaKey;
      if (!isCtrl) return;

      switch (e.key) {
        case "k": {
          if (isAuthPage) return;
          e.preventDefault();
          document.dispatchEvent(new CustomEvent("global-focus-search"));
          break;
        }

        case "\\": {
          if (isAuthPage) return;
          if (isEditableTarget(e.target)) return;
          e.preventDefault();
          toggleSideMenu();
          break;
        }

        case "/": {
          if (isEditableTarget(e.target)) return;
          e.preventDefault();
          setTheme(theme === "dark" ? "light" : "dark");
          break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown, { capture: true });
    return () =>
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
  }, [isAuthPage, theme, setTheme, toggleSideMenu]);
};
