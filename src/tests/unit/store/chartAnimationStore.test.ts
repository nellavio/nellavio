import {
  type ChartPageId,
  useChartAnimationStore,
} from "../../../store/chartAnimationStore";

const initialState = {
  isInitialLoad: true,
  shouldStartChartAnimations: false,
  visitedChartPages: [] as ChartPageId[],
};

describe("chartAnimationStore", () => {
  beforeEach(() => {
    useChartAnimationStore.setState(initialState);
  });

  it("has correct default values", () => {
    const state = useChartAnimationStore.getState();
    expect(state.isInitialLoad).toBe(true);
    expect(state.shouldStartChartAnimations).toBe(false);
    expect(state.visitedChartPages).toEqual([]);
  });

  it("markChartPageAsVisited adds page to array", () => {
    useChartAnimationStore.getState().markChartPageAsVisited("homepage");
    expect(useChartAnimationStore.getState().visitedChartPages).toContain(
      "homepage",
    );
  });

  it("markChartPageAsVisited does not duplicate", () => {
    const { markChartPageAsVisited } = useChartAnimationStore.getState();
    markChartPageAsVisited("homepage");
    useChartAnimationStore.getState().markChartPageAsVisited("homepage");
    expect(useChartAnimationStore.getState().visitedChartPages).toEqual([
      "homepage",
    ]);
  });

  it("markChartPageAsVisited accumulates different pages", () => {
    useChartAnimationStore.getState().markChartPageAsVisited("homepage");
    useChartAnimationStore.getState().markChartPageAsVisited("analytics");
    expect(useChartAnimationStore.getState().visitedChartPages).toEqual([
      "homepage",
      "analytics",
    ]);
  });

  it("setIsInitialLoad updates value", () => {
    useChartAnimationStore.getState().setIsInitialLoad(false);
    expect(useChartAnimationStore.getState().isInitialLoad).toBe(false);
  });

  it("setShouldStartChartAnimations updates value", () => {
    useChartAnimationStore.getState().setShouldStartChartAnimations(true);
    expect(useChartAnimationStore.getState().shouldStartChartAnimations).toBe(
      true,
    );
  });
});
