import { renderHook } from "@testing-library/react";

import { useIsFirstRender } from "@/hooks/useIsFirstRender";

describe("useIsFirstRender", () => {
  it("returns false after mount (effect has run)", () => {
    const { result } = renderHook(() => useIsFirstRender());
    expect(result.current).toBe(false);
  });

  it("stays false after rerender", () => {
    const { result, rerender } = renderHook(() => useIsFirstRender());
    rerender();
    expect(result.current).toBe(false);
  });
});
