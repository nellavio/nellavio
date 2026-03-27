import { fireEvent, render, screen } from "@testing-library/react";
import React, { useRef } from "react";

import { useUserMenu } from "@/components/layout/navbar/hooks/useUserMenu";
import type {
  DropdownProps,
  NavbarDropdowns,
} from "@/components/layout/navbar/types";

const createMockDropdown = (isOpen = false): DropdownProps => ({
  isOpen,
  toggle: vi.fn(),
  close: vi.fn(),
  open: vi.fn(),
  ref: { current: null },
});

const createMockNavbarDropdowns = (isAnyOpen = false): NavbarDropdowns => ({
  closeAllExcept: vi.fn(),
  isAnyDropdownOpen: isAnyOpen,
});

const UserMenuHarness = ({
  userDropdown,
  navbarDropdowns,
  session = null,
  theme,
  menuItems = ["Profile", "Settings", "Logout"],
}: {
  userDropdown: DropdownProps;
  navbarDropdowns: NavbarDropdowns;
  session?: { username?: string | null; isLoggedIn?: boolean } | null;
  theme?: string;
  menuItems?: string[];
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);

  const {
    menuRef,
    handleTriggerKeyDown,
    handleMenuKeyDown,
    isLoggedIn,
    currentTheme,
  } = useUserMenu({
    userIconBtnRef: btnRef,
    userDropdown,
    navbarDropdowns,
    session,
    theme,
  });

  return (
    <div>
      <button
        ref={btnRef}
        data-testid="trigger"
        onKeyDown={
          handleTriggerKeyDown as unknown as React.KeyboardEventHandler
        }
      >
        User
      </button>
      <div
        ref={menuRef}
        role="menu"
        onKeyDown={handleMenuKeyDown as unknown as React.KeyboardEventHandler}
      >
        {menuItems.map((label) => (
          <button key={label} role="menuitem" data-testid={`item-${label}`}>
            {label}
          </button>
        ))}
      </div>
      <span data-testid="logged-in">{String(isLoggedIn)}</span>
      <span data-testid="theme">{currentTheme}</span>
    </div>
  );
};

/**
 * jsdom does not implement layout, so offsetParent is always null.
 * The hook uses `offsetParent !== null` to filter visible menu items.
 */
const stubOffsetParent = () => {
  screen.getAllByRole("menuitem").forEach((el) => {
    Object.defineProperty(el, "offsetParent", {
      configurable: true,
      get: () => document.body,
    });
  });
};

describe("useUserMenu", () => {
  describe("roving focus keyboard navigation", () => {
    const renderMenu = (dropdown?: DropdownProps) => {
      const dd = dropdown ?? createMockDropdown(true);
      render(
        <UserMenuHarness
          userDropdown={dd}
          navbarDropdowns={createMockNavbarDropdowns()}
          theme="dark"
        />,
      );
      stubOffsetParent();
      return dd;
    };

    it("ArrowDown moves focus to the next item", () => {
      renderMenu();
      screen.getByTestId("item-Profile").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Settings"));
    });

    it("ArrowUp moves focus to the previous item", () => {
      renderMenu();
      screen.getByTestId("item-Settings").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowUp" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Profile"));
    });

    it("ArrowDown wraps from last to first", () => {
      renderMenu();
      screen.getByTestId("item-Logout").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowDown" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Profile"));
    });

    it("ArrowUp wraps from first to last", () => {
      renderMenu();
      screen.getByTestId("item-Profile").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "ArrowUp" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Logout"));
    });

    it("Home/End jump to first/last item", () => {
      renderMenu();
      screen.getByTestId("item-Logout").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "Home" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Profile"));

      fireEvent.keyDown(screen.getByRole("menu"), { key: "End" });
      expect(document.activeElement).toBe(screen.getByTestId("item-Logout"));
    });

    it("Escape closes dropdown and restores focus to trigger", () => {
      const dropdown = renderMenu();
      screen.getByTestId("item-Settings").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "Escape" });
      expect(dropdown.close).toHaveBeenCalledTimes(1);
      expect(document.activeElement).toBe(screen.getByTestId("trigger"));
    });

    it("Tab closes dropdown", () => {
      const dropdown = renderMenu();
      screen.getByTestId("item-Profile").focus();
      fireEvent.keyDown(screen.getByRole("menu"), { key: "Tab" });
      expect(dropdown.close).toHaveBeenCalledTimes(1);
    });
  });

  describe("trigger keyboard", () => {
    it("ArrowDown on closed trigger opens dropdown and closes others", () => {
      const dropdown = createMockDropdown(false);
      const navbarDropdowns = createMockNavbarDropdowns();
      render(
        <UserMenuHarness
          userDropdown={dropdown}
          navbarDropdowns={navbarDropdowns}
          theme="dark"
        />,
      );

      fireEvent.keyDown(screen.getByTestId("trigger"), { key: "ArrowDown" });

      expect(dropdown.toggle).toHaveBeenCalledTimes(1);
      expect(navbarDropdowns.closeAllExcept).toHaveBeenCalledWith("user");
    });

    it("Enter on closed trigger opens dropdown", () => {
      const dropdown = createMockDropdown(false);
      render(
        <UserMenuHarness
          userDropdown={dropdown}
          navbarDropdowns={createMockNavbarDropdowns()}
          theme="dark"
        />,
      );
      fireEvent.keyDown(screen.getByTestId("trigger"), { key: "Enter" });
      expect(dropdown.toggle).toHaveBeenCalledTimes(1);
    });

    it("Escape on trigger closes open dropdown", () => {
      const dropdown = createMockDropdown(true);
      render(
        <UserMenuHarness
          userDropdown={dropdown}
          navbarDropdowns={createMockNavbarDropdowns()}
          theme="dark"
        />,
      );
      fireEvent.keyDown(screen.getByTestId("trigger"), { key: "Escape" });
      expect(dropdown.close).toHaveBeenCalledTimes(1);
    });
  });

  describe("derived state", () => {
    it("isLoggedIn reflects session state", () => {
      const { unmount } = render(
        <UserMenuHarness
          userDropdown={createMockDropdown()}
          navbarDropdowns={createMockNavbarDropdowns()}
          session={{ isLoggedIn: true, username: "user@test.com" }}
          theme="dark"
        />,
      );
      expect(screen.getByTestId("logged-in").textContent).toBe("true");
      unmount();

      render(
        <UserMenuHarness
          userDropdown={createMockDropdown()}
          navbarDropdowns={createMockNavbarDropdowns()}
          session={null}
          theme="dark"
        />,
      );
      expect(screen.getByTestId("logged-in").textContent).toBe("false");
    });

    it("currentTheme falls back to light when theme is undefined", () => {
      const props = {
        userDropdown: createMockDropdown(),
        navbarDropdowns: createMockNavbarDropdowns(),
        theme: undefined as string | undefined,
      };
      render(<UserMenuHarness {...props} />);
      expect(screen.getByTestId("theme").textContent).toBe("light");
    });
  });
});
