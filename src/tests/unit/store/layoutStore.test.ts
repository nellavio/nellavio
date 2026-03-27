import { useLayoutStore } from "@/store/layoutStore";

const initialState = {
  isMobileMenuOpen: false,
  isSideMenuOpen: true,
  isLoggingOut: false,
  isLoggingIn: false,
  homepageLayout: "three-cards" as const,
  fontType: "default" as const,
  sidebarDefaultState: "expanded" as const,
  chartAnimationsEnabled: false,
  fixedNavbar: true,
};

describe("layoutStore", () => {
  beforeEach(() => {
    localStorage.clear();
    useLayoutStore.setState(initialState);
  });

  it("has correct default values", () => {
    const state = useLayoutStore.getState();
    expect(state.isSideMenuOpen).toBe(true);
    expect(state.isMobileMenuOpen).toBe(false);
    expect(state.homepageLayout).toBe("three-cards");
    expect(state.fontType).toBe("default");
    expect(state.sidebarDefaultState).toBe("expanded");
    expect(state.chartAnimationsEnabled).toBe(false);
    expect(state.fixedNavbar).toBe(true);
  });

  it("toggleSideMenu changes isSideMenuOpen", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1280,
      writable: true,
    });
    const { toggleSideMenu } = useLayoutStore.getState();
    toggleSideMenu();
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(false);
    toggleSideMenu();
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(true);
  });

  it("toggleMobileMenu changes isMobileMenuOpen", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1280,
      writable: true,
    });
    const { toggleMobileMenu } = useLayoutStore.getState();
    toggleMobileMenu();
    expect(useLayoutStore.getState().isMobileMenuOpen).toBe(false);
  });

  it("setHomepageLayout updates layout", () => {
    useLayoutStore.getState().setHomepageLayout("four-cards");
    expect(useLayoutStore.getState().homepageLayout).toBe("four-cards");
  });

  it("setSidebarDefaultState to collapsed sets isSideMenuOpen to false", () => {
    useLayoutStore.getState().setSidebarDefaultState("collapsed");
    const state = useLayoutStore.getState();
    expect(state.sidebarDefaultState).toBe("collapsed");
    expect(state.isSideMenuOpen).toBe(false);
  });

  it("setSidebarDefaultState to expanded sets isSideMenuOpen to true", () => {
    useLayoutStore.getState().setSidebarDefaultState("collapsed");
    useLayoutStore.getState().setSidebarDefaultState("expanded");
    const state = useLayoutStore.getState();
    expect(state.sidebarDefaultState).toBe("expanded");
    expect(state.isSideMenuOpen).toBe(true);
  });

  it("setChartAnimationsEnabled updates value", () => {
    useLayoutStore.getState().setChartAnimationsEnabled(true);
    expect(useLayoutStore.getState().chartAnimationsEnabled).toBe(true);
  });

  it("setFixedNavbar updates value", () => {
    useLayoutStore.getState().setFixedNavbar(false);
    expect(useLayoutStore.getState().fixedNavbar).toBe(false);
  });

  it("setIsLoggingOut updates value", () => {
    useLayoutStore.getState().setIsLoggingOut(true);
    expect(useLayoutStore.getState().isLoggingOut).toBe(true);
  });

  it("setIsLoggingIn updates value", () => {
    useLayoutStore.getState().setIsLoggingIn(true);
    expect(useLayoutStore.getState().isLoggingIn).toBe(true);
  });

  it("setIsSideMenuOpen sets directly", () => {
    useLayoutStore.getState().setIsSideMenuOpen(false);
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(false);
  });

  it("setFontType updates value", () => {
    useLayoutStore.getState().setFontType("alternative");
    expect(useLayoutStore.getState().fontType).toBe("alternative");
  });
});
