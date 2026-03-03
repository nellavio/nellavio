import React from "react";

import { HamburgerButtonProps } from "./types";

export const HamburgerButton = ({
  isMobileMenuOpen,
  toggleMobileMenu,
}: HamburgerButtonProps) => (
  <button
    className="relative hidden sm:block xl:hidden"
    onClick={toggleMobileMenu}
    aria-label="Toggle menu"
    aria-expanded={isMobileMenuOpen}
  >
    <div className="relative flex overflow-hidden items-center justify-center rounded-full w-12.5 h-12.5 transform transition-all duration-200">
      <div className="flex flex-col justify-between w-5 h-5 transform transition-all duration-300 origin-center overflow-hidden">
        <div
          className={`bg-secondaryText h-0.5 w-7 transform transition-all duration-300 origin-left ${
            isMobileMenuOpen ? "translate-x-10" : ""
          }`}
        ></div>
        <div
          className={`bg-secondaryText e h-0.5 w-7 rounded transform transition-all duration-300 ${
            isMobileMenuOpen ? "translate-x-10 delay-75" : ""
          }`}
        ></div>
        <div
          className={`bg-secondaryText h-0.5 w-7 transform transition-all duration-300 origin-left ${
            isMobileMenuOpen ? "translate-x-10 delay-150" : ""
          }`}
        ></div>
        <div
          className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-10"
          } flex w-0 ${isMobileMenuOpen ? "w-12" : ""}`}
        >
          <div
            className={`absolute bg-secondaryText h-0.5 w-5 transform transition-all duration-500 ${
              isMobileMenuOpen ? "rotate-45 delay-300" : "rotate-0"
            }`}
          ></div>
          <div
            className={`absolute bg-secondaryText h-0.5 w-5 transform transition-all duration-500 ${
              isMobileMenuOpen ? "-rotate-45 delay-300" : "-rotate-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  </button>
);
