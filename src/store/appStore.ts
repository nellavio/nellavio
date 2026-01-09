import { create } from "zustand";

interface AppStore {
  isMobileMenuOpen: boolean;
  isSideMenuOpen: boolean;
  toggleMobileMenu: () => void;
  toggleSideMenu: () => void;
  isLoggingOut: boolean;
  setIsLoggingOut: (isLoggingOut: boolean) => void;
  isLoggingIn: boolean;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
  homepageLayout: "three-cards" | "four-cards";
  setHomepageLayout: (layout: "three-cards" | "four-cards") => void;
}

const determineInitialState = () => {
  if (typeof window !== "undefined") {
    return {
      isMobileMenuOpen: window.innerWidth < 1280,
      isSideMenuOpen: window.innerWidth >= 1280,
    };
  }
  return {
    isMobileMenuOpen: false,
    isSideMenuOpen: true,
  };
};

export const useAppStore = create<AppStore>((set) => ({
  isMobileMenuOpen: false,
  isSideMenuOpen: true,
  toggleMobileMenu: () => {
    set((state: AppStore) => ({
      ...state,
      isMobileMenuOpen: state.isMobileMenuOpen
        ? false
        : determineInitialState().isMobileMenuOpen,
    }));
  },
  toggleSideMenu: () => {
    set((state: AppStore) => ({
      ...state,
      isSideMenuOpen: state.isSideMenuOpen
        ? false
        : determineInitialState().isSideMenuOpen,
    }));
  },
  isLoggingOut: false,
  setIsLoggingOut: (isLoggingOut) => set(() => ({ isLoggingOut })),
  isLoggingIn: false,
  setIsLoggingIn: (isLoggingIn) => set(() => ({ isLoggingIn })),
  homepageLayout: "three-cards",
  setHomepageLayout: (layout) => set(() => ({ homepageLayout: layout })),
}));
