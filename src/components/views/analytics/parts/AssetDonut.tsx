"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import { BaseTooltip } from "@/components/common/BaseTooltip";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { useChartAnimation } from "@/hooks/useChartAnimation";
import { useWindowDimensions } from "@/hooks/useWindowDimensions";
import { BREAKPOINTS } from "@/styles/breakpoints";
import { formatCurrency } from "@/utils/formatNumber";

import { Asset, AssetPerformanceProps } from "../types";

interface AssetDonutDatum extends Asset {
  color: string;
}

interface AssetDonutTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: AssetDonutDatum }>;
}

const COLORS = [
  "var(--color-chartPrimaryFill)",
  "var(--color-chartSecondaryFill)",
  "var(--color-chartTertiaryFill)",
  "var(--color-chartQuaternaryFill)",
  "var(--color-chartQuinaryFill)",
];

const DONUT_RADIUS = {
  wide: { inner: "65%", outer: "92%" },
  compact: { inner: "58.1%", outer: "80.1%" },
} as const;

const getDonutRadius = (windowWidth: number) =>
  windowWidth > BREAKPOINTS["3xl"] ? DONUT_RADIUS.wide : DONUT_RADIUS.compact;

const getDeltaColor = (delta: number) =>
  delta >= 0 ? "var(--color-greenBadgeText)" : "var(--color-redBadgeText)";

const AssetDonutTooltip = ({ active, payload }: AssetDonutTooltipProps) => {
  const t = useTranslations("analytics.assetPerformance");

  if (!active || !payload || payload.length === 0) return null;

  const data = payload[0].payload;

  return (
    <BaseTooltip title={data.name}>
      <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
        <span>
          <span
            className="w-2 h-2 mr-2 rounded inline-block"
            style={{ backgroundColor: data.color }}
          />
          {`${t("sales")}:`}
        </span>
        <span className="pl-[0.7rem]">{formatCurrency(data.sales)}</span>
      </p>
    </BaseTooltip>
  );
};

export const AssetDonut = ({ assetPerformanceData }: AssetPerformanceProps) => {
  const t = useTranslations("analytics.assetPerformance");
  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("analytics");
  const { width: windowWidth } = useWindowDimensions();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const donutRadius = getDonutRadius(windowWidth);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (chartContainerRef.current) {
      const rect = chartContainerRef.current.getBoundingClientRect();
      setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
  };

  const topAssets = assetPerformanceData.slice(0, 3);
  const dataWithColors: AssetDonutDatum[] = topAssets.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));
  const totalSales = topAssets.reduce((sum, asset) => sum + asset.sales, 0);

  return (
    <Card className="h-full flex flex-col" id="assetDonut">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <div className="flex flex-1 min-h-0 justify-center">
          <div
            ref={chartContainerRef}
            onMouseMove={handleMouseMove}
            className="h-full min-h-44 1xl:min-h-52 w-full relative mt-4 1xl:mt-5"
            tabIndex={-1}
            role="img"
            aria-label="Asset performance donut chart"
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
              initialDimension={{ width: 320, height: 200 }}
            >
              <PieChart accessibilityLayer={false}>
                <Pie
                  data={isReady ? dataWithColors : []}
                  cx="50%"
                  cy="50%"
                  innerRadius={donutRadius.inner}
                  outerRadius={donutRadius.outer}
                  dataKey="sales"
                  stroke="none"
                  strokeWidth={0}
                  isAnimationActive={shouldAnimate}
                  animationBegin={animationBegin}
                  animationDuration={800}
                  animationEasing="ease-out"
                >
                  {dataWithColors.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color}
                      stroke="none"
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={<AssetDonutTooltip />}
                  isAnimationActive={false}
                  position={{
                    x: mousePosition.x + 15,
                    y: mousePosition.y - 10,
                  }}
                  wrapperStyle={{ zIndex: 10 }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-sm 1xl:text-base 3xl:text-lg font-bold text-primaryText">
                {formatCurrency(totalSales)}
              </div>
              <span className="mt-0.5 text-xs text-subtitleText">
                {t("totalValue")}
              </span>
            </div>
          </div>
        </div>
        <ul className="mt-6 1xl:mt-8">
          {dataWithColors.map((asset) => (
            <li
              key={asset.name}
              className="flex items-center justify-between py-1.5 1xl:py-2"
            >
              <div className="flex items-center min-w-0">
                <span
                  className="w-2.5 h-2.5 mr-2 rounded-sm inline-block shrink-0"
                  style={{ backgroundColor: asset.color }}
                />
                <span className="text-xs 1xl:text-sm text-secondaryText truncate">
                  {asset.name}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0 pl-2">
                <span className="text-xs 1xl:text-sm text-primaryText">
                  {formatCurrency(asset.sales)}
                </span>
                <span
                  className="text-xs 1xl:text-sm w-14 text-right"
                  style={{ color: getDeltaColor(asset.delta) }}
                >
                  {asset.delta > 0 ? "+" : ""}
                  {asset.delta}%
                </span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
