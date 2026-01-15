import React, { useState, useEffect } from "react";

import { ThemeButtonProps } from "./types";
import { MoonIcon } from "../../assets/icons/MoonIcon";
import { SunIcon } from "../../assets/icons/SunIcon";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/common/shadcn/tooltip";

export const ThemeButton = ({
  theme,
  selectTheme,
  userDropdown,
  languageDropdown,
  notificationsDropdown,
  t,
}: Omit<ThemeButtonProps, "themeTooltip">) => {
  const [isMounted, setIsMounted] = useState(false);
  const currentTheme = theme || "light";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const toggleTheme = () => {
    selectTheme(currentTheme === "dark" ? "light" : "dark");
    userDropdown.close();
    languageDropdown.close();
    notificationsDropdown.close();
  };

  const isAnyDropdownOpen =
    userDropdown.isOpen ||
    languageDropdown.isOpen ||
    notificationsDropdown.isOpen;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <div
          className="group relative flex items-center bg-themeToggleBg border border-mainBorder hover:bg-themeToggleBgHover rounded-full p-0.5 cursor-pointer"
          onClick={toggleTheme}
          role="button"
          aria-label={t("changeTheme")}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleTheme();
            }
          }}
        >
          {isMounted && (
            <div
              className={`absolute left-0.5 top-0.5 w-[42px] h-[2.1825rem] bg-themeToggleActiveBg border border-themeToggleActiveBorder rounded-full shadow-sm transition-all duration-300 ease-out ${
                currentTheme === "dark"
                  ? "group-hover:bg-themeToggleActiveBgHover"
                  : "group-hover:bg-themeToggleActiveBgHoverLight dark:group-hover:bg-themeToggleActiveBgHover"
              }`}
              style={{
                transform:
                  currentTheme === "dark"
                    ? "translateX(42px)"
                    : "translateX(0px)",
              }}
            />
          )}
          <div
            className={`relative z-10 w-[42px] h-[2.1825rem] rounded-full flex items-center justify-center transition-colors duration-200 ${
              isMounted && currentTheme === "light"
                ? "text-primaryText"
                : "text-grayIcon"
            }`}
          >
            <SunIcon />
          </div>
          <div
            className={`relative z-10 w-[42px] h-[2.1825rem] rounded-full flex items-center justify-center transition-colors duration-200 ${
              isMounted && currentTheme === "dark"
                ? "text-primaryText"
                : "text-grayIcon"
            }`}
          >
            <MoonIcon />
          </div>
        </div>
      </TooltipTrigger>
      {!isAnyDropdownOpen && (
        <TooltipContent
          side="bottom"
          align="start"
          alignOffset={-30}
          className="hidden xl:block"
        >
          {t("changeTheme")}
        </TooltipContent>
      )}
    </Tooltip>
  );
};
