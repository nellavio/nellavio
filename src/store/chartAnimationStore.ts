import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ChartPageId = "homepage" | "analytics" | "charts";

interface ChartAnimationStore {
  shouldStartChartAnimations: boolean;
  setShouldStartChartAnimations: (shouldStart: boolean) => void;
  visitedChartPages: ChartPageId[];
  markChartPageAsVisited: (pageId: ChartPageId) => void;
}

export const useChartAnimationStore = create<ChartAnimationStore>()(
  devtools(
    (set) => ({
      shouldStartChartAnimations: false,
      setShouldStartChartAnimations: (shouldStartChartAnimations) =>
        set(() => ({ shouldStartChartAnimations })),
      visitedChartPages: [] as ChartPageId[],
      markChartPageAsVisited: (pageId: ChartPageId) =>
        set((state) => ({
          visitedChartPages: state.visitedChartPages.includes(pageId)
            ? state.visitedChartPages
            : [...state.visitedChartPages, pageId],
        })),
    }),
    { name: "ChartAnimationStore" },
  ),
);
