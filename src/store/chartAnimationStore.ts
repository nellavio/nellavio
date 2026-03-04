import { create } from "zustand";

export type ChartPageId = "homepage" | "analytics" | "charts";

interface ChartAnimationStore {
  isInitialLoad: boolean;
  setIsInitialLoad: (isInitialLoad: boolean) => void;
  shouldStartChartAnimations: boolean;
  setShouldStartChartAnimations: (shouldStart: boolean) => void;
  visitedChartPages: Set<ChartPageId>;
  markChartPageAsVisited: (pageId: ChartPageId) => void;
}

export const useChartAnimationStore = create<ChartAnimationStore>()((set) => ({
  isInitialLoad: true,
  setIsInitialLoad: (isInitialLoad) => set(() => ({ isInitialLoad })),
  shouldStartChartAnimations: false,
  setShouldStartChartAnimations: (shouldStartChartAnimations) =>
    set(() => ({ shouldStartChartAnimations })),
  visitedChartPages: new Set<ChartPageId>(),
  markChartPageAsVisited: (pageId: ChartPageId) =>
    set((state) => ({
      visitedChartPages: new Set(state.visitedChartPages).add(pageId),
    })),
}));
