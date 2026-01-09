import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useTranslations } from "next-intl";

import { Card } from "../../common/Card";
import { BaseTooltip } from "../../common/BaseTooltip";
import {
  RevenueDistributionProps,
  RevenueDistributionTooltipProps,
} from "./types";
import { useWindowDimensions } from "../../../hooks/useWindowDimensions";
import { useChartColors } from "../../../hooks/useChartColors";
import { useTheme } from "next-themes";

const RevenueDistributionTooltip = ({
  active,
  payload,
  label,
}: RevenueDistributionTooltipProps) => {
  if (!active || !payload || payload.length === 0 || !label) return null;

  const inStoreEntry = payload.find((p) => p.dataKey === "inStore");
  const onlineEntry = payload.find((p) => p.dataKey === "online");

  return (
    <BaseTooltip title={label}>
      {inStoreEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: inStoreEntry.color }}
            />
            {`${inStoreEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(inStoreEntry.value ?? 0)}
          </span>
        </p>
      )}
      {onlineEntry && (
        <p className="px-3 pb-1 text-primaryText flex items-center justify-between">
          <span>
            <span
              className="w-2 h-2 mr-2 rounded inline-block"
              style={{ backgroundColor: onlineEntry.color }}
            />
            {`${onlineEntry.name}:   `}
          </span>
          <span className="pl-[0.7rem]">
            ${Intl.NumberFormat("us").format(onlineEntry.value ?? 0)}
          </span>
        </p>
      )}
    </BaseTooltip>
  );
};

export const RevenueDistribution = ({
  revenueDistributionData,
}: RevenueDistributionProps) => {
  const t = useTranslations("analytics.revenueDistribution");

  const translatedData = revenueDistributionData.map((item) => ({
    ...item,
    category: t(item.category.toLowerCase()),
  }));

  const { width: windowWidth } = useWindowDimensions();

  const { theme } = useTheme();

  const chartColors = useChartColors(theme as "dark" | "light");

  // RevenueDistribution has unique color scheme:
  // Dark mode: inStore=blue, online=gray
  // Light mode: inStore=blue, online=teal
  const inStoreColor = theme === "dark" ? chartColors.secondary.stroke : chartColors.secondary.inverted; // blue on both modes
  const onlineColor = theme === "dark" ? "rgb(86,92,101)" : chartColors.primary.inverted; // gray on dark, teal on light

  return (
    <Card className="h-full" id="revenueDistribution" title={t("title")}>
      <div className="w-full h-[19.5rem] 3xl:h-[22rem] mt-4 1xl:mt-4 -ml-4">
        <ResponsiveContainer
          width="100%"
          height="100%"
          initialDimension={{ width: 320, height: 200 }}
        >
          <BarChart
            data={translatedData}
            layout="vertical"
            margin={{
              top: 20,
              right: windowWidth > 400 ? 30 : 5,
              left: windowWidth > 400 ? 40 : 30,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="0"
              stroke={chartColors.primary.grid}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
              tickFormatter={(value) =>
                `$${Intl.NumberFormat("us").format(value)}`
              }
            />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fill: "rgba(255,255,255,0.65)", fontSize: 12 }}
            />
            <Tooltip
              content={<RevenueDistributionTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar
              dataKey="inStore"
              name={t("inStore")}
              stackId="a"
              fill={inStoreColor}
              radius={[0, 4, 4, 0]}
              barSize={30}
              isAnimationActive={false}
            />
            <Bar
              dataKey="online"
              name={t("online")}
              stackId="a"
              fill={onlineColor}
              radius={[0, 4, 4, 0]}
              barSize={30}
              isAnimationActive={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
