import { act, renderHook } from "@testing-library/react";

import { useTooltip } from "../../../hooks/useTooltip";

describe("useTooltip", () => {
  it("defaults to not visible", () => {
    const { result } = renderHook(() => useTooltip());
    expect(result.current.isTooltipVisible).toBe(false);
  });

  it("showTooltip makes tooltip visible", () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.showTooltip());
    expect(result.current.isTooltipVisible).toBe(true);
  });

  it("hideTooltip hides tooltip", () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.showTooltip());
    act(() => result.current.hideTooltip());
    expect(result.current.isTooltipVisible).toBe(false);
  });

  it("any mousedown on document hides tooltip", () => {
    const { result } = renderHook(() => useTooltip());
    act(() => result.current.showTooltip());
    expect(result.current.isTooltipVisible).toBe(true);
    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });
    expect(result.current.isTooltipVisible).toBe(false);
  });
});
