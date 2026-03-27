import { act, renderHook } from "@testing-library/react";

import { useWindowDimensions } from "@/hooks/useWindowDimensions";

describe("useWindowDimensions", () => {
  it("returns current window dimensions", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 768,
      writable: true,
    });
    const { result } = renderHook(() => useWindowDimensions());
    expect(result.current.width).toBe(1024);
    expect(result.current.height).toBe(768);
  });

  it("updates on window resize", () => {
    Object.defineProperty(window, "innerWidth", {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, "innerHeight", {
      value: 768,
      writable: true,
    });
    const { result } = renderHook(() => useWindowDimensions());
    act(() => {
      Object.defineProperty(window, "innerWidth", {
        value: 800,
        writable: true,
      });
      Object.defineProperty(window, "innerHeight", {
        value: 600,
        writable: true,
      });
      window.dispatchEvent(new Event("resize"));
    });
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBe(600);
  });
});
