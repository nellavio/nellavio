"use client";

import React, { ReactNode, useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";

import { Navbar } from "./navbar/Navbar";
import { SideMenu } from "./sideMenu/SideMenu";
import { useAppStore } from "../store/appStore";
import { FullScreenLoader } from "../components/common/FullScreenLoader";

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  const { isMobileMenuOpen, toggleMobileMenu } = useAppStore();
  const [showLoader, setShowLoader] = useState(true);
  const loaderTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const loaderInitializedRef = useRef(false);

  const currentPathname = usePathname();

  const pathsWithNoLayout = [
    "/login",
    "/pl/login",
    "/register",
    "/pl/register",
  ];

  const { setTheme, themes } = useTheme();

  // Set Obsidian as theme if theme is not recognized
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme && !themes.includes(storedTheme)) {
      setTheme("dark");
    }
  }, [setTheme, themes]);

  // Show loader screen for 1 second on first render
  useEffect(() => {
    if (!loaderInitializedRef.current) {
      loaderInitializedRef.current = true;

      loaderTimeoutRef.current = setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex h-full w-full bg-secondaryBg overflow-x-hidden">
        {showLoader && <FullScreenLoader key="static-loader-key" />}
        {!pathsWithNoLayout.includes(currentPathname) && (
          <>
            <SideMenu />
            <Navbar />
          </>
        )}
        <div className="flex flex-col w-full xl:max-w-[82%] 1xl:max-w-[82%] 2xl:max-w-[83vw] 3xl:max-w-[82vw] 5xl:max-w-[102rem] h-full mx-auto relative">
          <div className="w-full flex justify-center max-w-full  px-0 md:px-0  xl:pl-3 xl:pr-2 2xl:px-4">
            {children}
          </div>
        </div>
        {isMobileMenuOpen && (
          <div
            className="block xl:hidden h-screen w-screen fixed top-0 left-0 bg-[rgb(0,0,0,0.4)] z-[1]"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
      <div className="w-screen fixed top-0 left-0 h-screen z-[-1]"></div>
    </>
  );
};
