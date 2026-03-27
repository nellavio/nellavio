import { renderHook } from "@testing-library/react";

import { useChartAnimation } from "@/hooks/useChartAnimation";
import { useChartAnimationStore } from "@/store/chartAnimationStore";
import { useLayoutStore } from "@/store/layoutStore";

describe("useChartAnimation", () => {
  beforeEach(() => {
    useChartAnimationStore.setState({
      shouldStartChartAnimations: true,
      visitedChartPages: [],
    });
    useLayoutStore.setState({ chartAnimationsEnabled: true });
  });

  it("returns shouldAnimate=true on first visit when animations enabled", () => {
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.shouldAnimate).toBe(true);
  });

  it("returns shouldAnimate=false on second visit (page already marked)", () => {
    useChartAnimationStore.setState({ visitedChartPages: ["homepage"] });
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.shouldAnimate).toBe(false);
  });

  it("returns shouldAnimate=false when animations are disabled", () => {
    useLayoutStore.setState({ chartAnimationsEnabled: false });
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.shouldAnimate).toBe(false);
  });

  it("marks page as visited after mount when shouldStartChartAnimations is true", () => {
    renderHook(() => useChartAnimation("analytics"));
    expect(useChartAnimationStore.getState().visitedChartPages).toContain(
      "analytics",
    );
  });

  it("does not mark page as visited when shouldStartChartAnimations is false", () => {
    useChartAnimationStore.setState({ shouldStartChartAnimations: false });
    renderHook(() => useChartAnimation("analytics"));
    expect(useChartAnimationStore.getState().visitedChartPages).not.toContain(
      "analytics",
    );
  });

  it("returns animationBegin of 100ms", () => {
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.animationBegin).toBe(100);
  });

  it("returns isReady=true when shouldStartChartAnimations is true", () => {
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.isReady).toBe(true);
  });

  it("returns isReady=false when shouldStartChartAnimations is false", () => {
    useChartAnimationStore.setState({ shouldStartChartAnimations: false });
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.isReady).toBe(false);
  });

  it("different pages are tracked independently", () => {
    renderHook(() => useChartAnimation("homepage"));
    const { result } = renderHook(() => useChartAnimation("analytics"));
    // analytics is a first visit
    expect(result.current.shouldAnimate).toBe(true);
    expect(useChartAnimationStore.getState().visitedChartPages).toEqual([
      "homepage",
      "analytics",
    ]);
  });
});
