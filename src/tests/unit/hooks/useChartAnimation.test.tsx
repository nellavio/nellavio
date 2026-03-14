import { renderHook } from "@testing-library/react";

import { useChartAnimation } from "../../../hooks/useChartAnimation";
import { useChartAnimationStore } from "../../../store/chartAnimationStore";
import { useLayoutStore } from "../../../store/layoutStore";

describe("useChartAnimation", () => {
  beforeEach(() => {
    useChartAnimationStore.setState({
      isInitialLoad: false,
      shouldStartChartAnimations: false,
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

  it("marks page as visited after mount", () => {
    renderHook(() => useChartAnimation("analytics"));
    expect(useChartAnimationStore.getState().visitedChartPages).toContain(
      "analytics",
    );
  });

  it("returns animationBegin >= 100ms (minimum)", () => {
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.animationBegin).toBeGreaterThanOrEqual(100);
  });

  it("uses CHART_ANIMATION_DELAY_MS as base delay on initial load", () => {
    useChartAnimationStore.setState({ isInitialLoad: true });
    const { result } = renderHook(() => useChartAnimation("homepage"));
    // On initial load, delay should be based on CHART_ANIMATION_DELAY_MS (600)
    expect(result.current.animationBegin).toBe(600);
  });

  it("uses 100ms (minimum) delay on navigation (non-initial load)", () => {
    useChartAnimationStore.setState({ isInitialLoad: false });
    const { result } = renderHook(() => useChartAnimation("homepage"));
    expect(result.current.animationBegin).toBe(100);
  });

  it("reduces delay with earlyStartMs option", () => {
    useChartAnimationStore.setState({ isInitialLoad: true });
    const { result } = renderHook(() =>
      useChartAnimation("homepage", { earlyStartMs: 200 }),
    );
    // baseDelay=600, earlyStart=200, maxEarlyStart=480, clamped=200
    // animationBegin = max(100, 600 - 200) = 400
    expect(result.current.animationBegin).toBe(400);
  });

  it("clamps earlyStartMs to 80% of base delay", () => {
    useChartAnimationStore.setState({ isInitialLoad: true });
    const { result } = renderHook(() =>
      useChartAnimation("homepage", { earlyStartMs: 10000 }),
    );
    // baseDelay=600, maxEarlyStart=480, clamped=480
    // animationBegin = max(100, 600 - 480) = 120
    expect(result.current.animationBegin).toBe(120);
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
