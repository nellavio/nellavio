import { useEffect, useRef } from "react";

import { CHART_ANIMATION_DELAY_MS } from "../components/layout/FullScreenLoader";
import {
  type ChartPageId,
  useChartAnimationStore,
} from "../store/chartAnimationStore";
import { useLayoutStore } from "../store/layoutStore";

interface ChartAnimationOptions {
  earlyStartMs?: number;
}

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
 * @param options - Optional configuration for animation timing
 * @param options.earlyStartMs - How many ms earlier this chart should start animating (subtracted from default delay)
 * @returns Object with shouldAnimate boolean and animationBegin delay in ms
 */
export const useChartAnimation = (
  pageId: ChartPageId,
  options?: ChartAnimationOptions,
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
  const isInitialLoad = useChartAnimationStore((state) => state.isInitialLoad);

  const hasMarkedRef = useRef(false);
  const wasFirstVisit = useRef(!visitedChartPages.includes(pageId));

  useEffect(() => {
    if (!hasMarkedRef.current) {
      hasMarkedRef.current = true;
      markChartPageAsVisited(pageId);
    }
  }, [pageId, markChartPageAsVisited]);

  const shouldAnimate = chartAnimationsEnabled && wasFirstVisit.current;

  const MIN_ANIMATION_BEGIN_MS = 100;
  const earlyStartMs = options?.earlyStartMs ?? 0;
  const baseDelay = isInitialLoad ? CHART_ANIMATION_DELAY_MS : 0;
  const maxEarlyStart = baseDelay * 0.8;
  const clampedEarlyStart = Math.min(earlyStartMs, maxEarlyStart);
  const animationBegin = Math.max(
    MIN_ANIMATION_BEGIN_MS,
    baseDelay - clampedEarlyStart,
  );

  return { shouldAnimate, animationBegin };
};
