import { useEffect, useRef } from "react";

import {
  type ChartPageId,
  useChartAnimationStore,
} from "../store/chartAnimationStore";
import { useLayoutStore } from "../store/layoutStore";

interface ChartAnimationResult {
  shouldAnimate: boolean;
  animationBegin: number;
  isReady: boolean;
}

/**
 * Hook managing chart animation state per page.
 * Animations play only on first visit to each page per session.
 * On F5/initial load, data-gating via `isReady` syncs animations with the loader.
 * On routing navigation, `isReady` is already true so charts animate immediately.
 *
 * @param pageId - Unique identifier for the chart page ('homepage' | 'analytics' | 'charts')
 * @returns Object with shouldAnimate boolean, animationBegin delay in ms, and isReady data gate
 */
export const useChartAnimation = (
  pageId: ChartPageId,
): ChartAnimationResult => {
  const chartAnimationsEnabled = useLayoutStore(
    (state) => state.chartAnimationsEnabled,
  );
  const visitedChartPages = useChartAnimationStore(
    (state) => state.visitedChartPages,
  );
  const markChartPageAsVisited = useChartAnimationStore(
    (state) => state.markChartPageAsVisited,
  );
  const shouldStartChartAnimations = useChartAnimationStore(
    (state) => state.shouldStartChartAnimations,
  );

  const hasMarkedRef = useRef(false);
  const wasFirstVisit = useRef(!visitedChartPages.includes(pageId));

  useEffect(() => {
    if (!hasMarkedRef.current && shouldStartChartAnimations) {
      hasMarkedRef.current = true;
      markChartPageAsVisited(pageId);
    }
  }, [pageId, markChartPageAsVisited, shouldStartChartAnimations]);

  const shouldAnimate = chartAnimationsEnabled && wasFirstVisit.current;
  const isReady = shouldStartChartAnimations;
  const animationBegin = 100;

  return { shouldAnimate, animationBegin, isReady };
};
