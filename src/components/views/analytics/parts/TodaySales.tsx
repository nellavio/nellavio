"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { BaseTooltip } from "@/components/common/BaseTooltip";
import { Card, CardContent, CardHeader } from "@/components/common/shadcn/card";
import { useChartAnimation } from "@/hooks/useChartAnimation";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/styles/breakpoints";
import { formatCurrency } from "@/utils/formatNumber";

import { TodaySalesComparison, TodaySalesProps } from "../types";
import { TodaySalesBreakdown } from "./TodaySalesBreakdown";
import {
  COMPARE_COLOR,
  TODAY_COLOR,
  TodaySalesComparisonSelect,
  TodaySalesLegend,
} from "./TodaySalesControls";

interface TodaySalesTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

const CHART_ANIMATION_DURATION = 800;
const DOT_FADE_DURATION = 250;

const TodaySalesTooltip = ({
  active,
  payload,
  label,
}: TodaySalesTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  return (
    <BaseTooltip title={label}>
      {payload.map((entry, index) => (
        <p
          key={`todaysales-tooltip-${index}`}
          className="px-3 pb-1 text-primaryText flex items-center justify-between"
        >
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: entry.color }}
            />
            {`${entry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">{formatCurrency(entry.value)}</span>
        </p>
      ))}
    </BaseTooltip>
  );
};

export const TodaySales = ({
  todaySalesData,
  todaySalesTotal,
  salesChannels,
  id = "todaysSales",
  showBreakdown = false,
}: TodaySalesProps) => {
  const t = useTranslations("analytics.todaySales");

  const { width: windowWidth } = useWindowDimensions();
  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("analytics");

  const [comparison, setComparison] =
    useState<TodaySalesComparison>("yesterday");

  /* Recharts renders dots into a separate zIndex portal, outside the layer that
     the line/area reveal animation clips - so without this gate they would pop
     in at their final position while the chart is still sliding in. */
  const [dotsVisible, setDotsVisible] = useState(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setDotsVisible(true);
      return;
    }

    if (!isReady) return;

    const timeoutId = setTimeout(
      () => setDotsVisible(true),
      animationBegin + CHART_ANIMATION_DURATION,
    );

    return () => clearTimeout(timeoutId);
  }, [shouldAnimate, isReady, animationBegin]);

  const dotStyle = {
    opacity: dotsVisible ? 1 : 0,
    transition: `opacity ${DOT_FADE_DURATION}ms ease-out`,
  };

  const todayTotal = todaySalesData.reduce(
    (sum, point) => sum + point.today,
    0,
  );
  const comparisonTotal = todaySalesData.reduce(
    (sum, point) => sum + point[comparison],
    0,
  );
  const change = comparisonTotal
    ? Math.round(((todayTotal - comparisonTotal) / comparisonTotal) * 1000) / 10
    : 0;
  const isUp = change >= 0;
  const periodLabel = t(
    comparison === "yesterday" ? "vsYesterday" : "vsAverage",
  );

  return (
    <Card
      className="w-full h-full recharts-tooltip-stable todaySalesContainer"
      id={id}
    >
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs 1xl:text-sm text-subtitleText">
              {t("title")}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="text-2xl 1xl:text-3xl 3xl:text-4xl font-bold text-primaryText">
                {formatCurrency(todaySalesTotal)}
              </span>
              <span
                className={`rounded-md border px-2 py-0.5 text-xs ${
                  isUp
                    ? "border-percentageBadgeGreenBorder bg-percentageBadgeGreenBg text-greenBadgeText"
                    : "border-percentageBadgeRedBorder bg-percentageBadgeRedBg text-redBadgeText"
                }`}
              >
                {isUp ? "+" : ""}
                {change}%
              </span>
              <span className="text-xs text-subtitleText">{periodLabel}</span>
            </div>
          </div>
          {/* Below md the header keeps the title only - the select is dropped
              and the legend moves down next to the chart. */}
          <div className="hidden md:flex flex-wrap items-center gap-4">
            <TodaySalesLegend comparison={comparison} />
            <TodaySalesComparisonSelect
              value={comparison}
              onChange={setComparison}
              className="ml-2"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mt-5 lg:mt-8 flex flex-col gap-4 lg:flex-row lg:gap-10">
          {showBreakdown && salesChannels && (
            <TodaySalesBreakdown
              channels={salesChannels}
              change={change}
              period={periodLabel}
            />
          )}
          {/* Below md only the legend survives, right-aligned above the chart. */}
          <TodaySalesLegend
            comparison={comparison}
            className="mt-4 justify-end md:hidden"
          />
          {/* Between md and lg the legend above is gone and the breakdown bars
              sit right on top of the chart - md:mt-8 buys that seam some air,
              reset at lg where the two land side by side instead. */}
          <div
            role="img"
            aria-label="Today's sales line chart"
            className={`-ml-3 1xl:ml-0 h-62 md:mt-8 lg:mt-0 lg:h-66 1xl:h-74 2xl:h-84 ${
              showBreakdown ? "w-full lg:w-3/4" : "w-full"
            }`}
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <AreaChart
                accessibilityLayer={false}
                data={isReady ? todaySalesData : []}
                margin={{
                  top: 5,
                  right: windowWidth > BREAKPOINTS.md ? 30 : 10,
                  left: windowWidth > BREAKPOINTS.md ? 20 : 5,
                  bottom: 5,
                }}
                tabIndex={-1}
              >
                <defs>
                  <linearGradient id="tsToday" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={TODAY_COLOR}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={TODAY_COLOR}
                      stopOpacity={0}
                    />
                  </linearGradient>
                  <linearGradient id="tsCompare" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={COMPARE_COLOR}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={COMPARE_COLOR}
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={"var(--color-chartPrimaryGrid)"}
                />
                <XAxis
                  dataKey="hour"
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                />
                <YAxis
                  axisLine={{ stroke: "var(--color-chartAxisLine)" }}
                  tickLine={false}
                  tick={{ fill: "var(--color-chartAxisText)", fontSize: 12 }}
                  tickFormatter={(value: number) => formatCurrency(value)}
                />
                <Tooltip
                  content={<TodaySalesTooltip />}
                  cursor={{
                    fill: "var(--color-chartCursorBg)",
                    stroke: "var(--color-chartVerticalLine)",
                  }}
                  isAnimationActive={false}
                />
                <Area
                  type="linear"
                  dataKey="today"
                  name={t("today")}
                  stroke={TODAY_COLOR}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tsToday)"
                  dot={{ r: 4, fill: TODAY_COLOR, style: dotStyle }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={CHART_ANIMATION_DURATION}
                  animationEasing="ease-out"
                />
                <Area
                  type="linear"
                  dataKey={comparison}
                  name={t(comparison)}
                  stroke={COMPARE_COLOR}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#tsCompare)"
                  dot={{ r: 4, fill: COMPARE_COLOR, style: dotStyle }}
                  activeDot={{ r: 6 }}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={CHART_ANIMATION_DURATION}
                  animationEasing="ease-out"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
