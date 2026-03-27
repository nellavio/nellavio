import { renderHook } from "@testing-library/react";

import { useGlobalHotkeys } from "@/hooks/useGlobalHotkeys";
import { useLayoutStore } from "@/store/layoutStore";
import { BREAKPOINTS } from "@/styles/breakpoints";

describe("useGlobalHotkeys", () => {
  const originalInnerWidth = window.innerWidth;

  beforeEach(() => {
    Object.defineProperty(window, "innerWidth", {
      value: BREAKPOINTS.xl + 100,
      writable: true,
    });
    useLayoutStore.setState({ isSideMenuOpen: true });
  });

  afterEach(() => {
    Object.defineProperty(window, "innerWidth", {
      value: originalInnerWidth,
      writable: true,
    });
  });

  const fireCtrlKey = (key: string) => {
    const event = new KeyboardEvent("keydown", {
      key,
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    document.dispatchEvent(event);
    return event;
  };

  it("Ctrl+\\ toggles sidebar", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    expect(useLayoutStore.getState().isSideMenuOpen).toBe(true);
    fireCtrlKey("\\");
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(false);
    fireCtrlKey("\\");
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(true);
  });

  it("Ctrl+K dispatches global-focus-search event", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    const handler = vi.fn();
    document.addEventListener("global-focus-search", handler);
    fireCtrlKey("k");
    expect(handler).toHaveBeenCalledTimes(1);
    document.removeEventListener("global-focus-search", handler);
  });

  it("does not fire shortcuts on auth page (except theme)", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: true }));

    const searchHandler = vi.fn();
    document.addEventListener("global-focus-search", searchHandler);

    const initialSideMenuState = useLayoutStore.getState().isSideMenuOpen;

    fireCtrlKey("k");
    expect(searchHandler).not.toHaveBeenCalled();

    fireCtrlKey("\\");
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(initialSideMenuState);

    document.removeEventListener("global-focus-search", searchHandler);
  });

  it("does not fire shortcuts when viewport is below xl breakpoint", () => {
    Object.defineProperty(window, "innerWidth", {
      value: BREAKPOINTS.xl - 1,
      writable: true,
    });

    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    const searchHandler = vi.fn();
    document.addEventListener("global-focus-search", searchHandler);
    fireCtrlKey("k");
    expect(searchHandler).not.toHaveBeenCalled();
    document.removeEventListener("global-focus-search", searchHandler);
  });

  it("does not fire Ctrl+\\ when target is an input", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    const input = document.createElement("input");
    document.body.appendChild(input);
    input.focus();

    const event = new KeyboardEvent("keydown", {
      key: "\\",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    input.dispatchEvent(event);

    // Sidebar should not toggle because target is editable
    expect(useLayoutStore.getState().isSideMenuOpen).toBe(true);
    document.body.removeChild(input);
  });

  it("does not fire Ctrl+\\ when target is a textarea", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    textarea.focus();

    const event = new KeyboardEvent("keydown", {
      key: "\\",
      ctrlKey: true,
      bubbles: true,
      cancelable: true,
    });
    textarea.dispatchEvent(event);

    expect(useLayoutStore.getState().isSideMenuOpen).toBe(true);
    document.body.removeChild(textarea);
  });

  it("ignores non-ctrl key presses", () => {
    renderHook(() => useGlobalHotkeys({ isAuthPage: false }));

    const searchHandler = vi.fn();
    document.addEventListener("global-focus-search", searchHandler);

    // Press 'k' without ctrl
    const event = new KeyboardEvent("keydown", {
      key: "k",
      ctrlKey: false,
      bubbles: true,
    });
    document.dispatchEvent(event);

    expect(searchHandler).not.toHaveBeenCalled();
    document.removeEventListener("global-focus-search", searchHandler);
  });
});
