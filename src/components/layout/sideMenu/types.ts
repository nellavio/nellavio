import { ReactElement } from "react";

export interface MenuCategoryProps {
  title: string;
}

export interface MenuItemProps {
  title: string;
  icon: ReactElement;
  path: string;
}

export interface SideMenuMobileProps {
  isMobileMenuOpen: boolean;
  onLoginButtonClick: () => void;
}
