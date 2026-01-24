import { useEffect, useRef } from "react";

import { useAppStore, type ChartPageId } from "../store/appStore";
import { CHART_ANIMATION_DELAY_MS } from "../layout/FullScreenLoader";

interface ChartAnimationResult {
  shouldAnimate: boolean;
  animationBegin: number;
}

/**
 * Hook managing chart animation state per page.
 * Animations play only on first visit to each page per session.
 * On F5/initial load, adds delay to sync with loader.
 * On routing navigation, animations start immediately.
 *
 * @param pageId - Unique identifier for the chart page ('homepage' | 'analytics' | 'charts')
 * @returns Object with shouldAnimate boolean and animationBegin delay in ms
 */
export const useChartAnimation = (pageId: ChartPageId): ChartAnimationResult => {
  const chartAnimationsEnabled = useAppStore(
    (state) => state.chartAnimationsEnabled
  );
  const visitedChartPages = useAppStore((state) => state.visitedChartPages);
  const markChartPageAsVisited = useAppStore(
    (state) => state.markChartPageAsVisited
  );
  const isInitialLoad = useAppStore((state) => state.isInitialLoad);

  const hasMarkedRef = useRef(false);
  const wasFirstVisit = useRef(!visitedChartPages.has(pageId));

  useEffect(() => {
    if (!hasMarkedRef.current) {
      hasMarkedRef.current = true;
      markChartPageAsVisited(pageId);
    }
  }, [pageId, markChartPageAsVisited]);

  const shouldAnimate = chartAnimationsEnabled && wasFirstVisit.current;
  const animationBegin = isInitialLoad ? CHART_ANIMATION_DELAY_MS : 0;

  return { shouldAnimate, animationBegin };
};
