import { useTranslations } from "next-intl";
import {
  Legend,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

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

import { MarketMetricsProps, MarketMetricsTooltipProps } from "../types";

const METRIC_KEYS = [
  "salesVolume",
  "revenue",
  "growthRate",
  "marketShare",
  "customerRating",
  "profitMargin",
] as const;

type MetricKey = (typeof METRIC_KEYS)[number];

const isMetricKey = (key: string): key is MetricKey =>
  METRIC_KEYS.includes(key as MetricKey);

/**
 * Returns a translator that maps a raw metric key coming from the API
 * onto its localized label, falling back to the key itself.
 */
const useMetricLabel = () => {
  const t = useTranslations("analytics.marketMetrics.metrics");

  return (key: string): string => {
    const cleanKey = key.replace("analytics.marketMetrics.metrics.", "");
    return isMetricKey(cleanKey) ? t(cleanKey) : cleanKey;
  };
};

const MarketMetricsTooltip = ({
  active,
  payload,
  label,
}: MarketMetricsTooltipProps) => {
  const metricLabel = useMetricLabel();

  if (!active || !payload || !payload.length || !label) return null;

  return (
    <BaseTooltip title={metricLabel(label)}>
      {payload.map((entry, index) => {
        const entryName = entry.name ? metricLabel(entry.name) : "";
        const formattedValue = `${entry.value}%`;
        return (
          <p
            key={`marketmetrics-tooltip-${index}`}
            className="px-3 pb-1 text-primaryText flex items-center justify-between"
          >
            <span>
              <span
                className="w-2 h-2 mr-2 rounded inline-block"
                style={{ backgroundColor: entry.color }}
              />
              {`${entryName}:   `}
            </span>
            <span className="pl-[0.7rem]">{formattedValue}</span>
          </p>
        );
      })}
    </BaseTooltip>
  );
};

interface LegendProps {
  payload?: Array<{
    color: string;
    value: string;
  }>;
}

const CustomLegend = (props: LegendProps) => {
  const { payload } = props;

  const metricLabel = useMetricLabel();

  return (
    <div className="flex flex-row justify-end gap-8 w-full mt-0 lg:mt-0 mb-12 3xl:mb-6">
      {payload?.map((entry, index: number) => (
        <div key={index} className="flex items-center">
          <div
            className="w-3 h-3 rounded-sm mr-2"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-primaryText">
            {metricLabel(entry.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export const MarketMetrics = ({ marketMetricsData }: MarketMetricsProps) => {
  const t = useTranslations("analytics.marketMetrics");

  const metricLabel = useMetricLabel();

  const { width: windowWidth } = useWindowDimensions();

  const { shouldAnimate, animationBegin, isReady } =
    useChartAnimation("analytics");

  /**
   * The card sits in a 1/3 grid column, so below 1400px the polar labels
   * ("Customer Rating") run out of horizontal room and get clipped.
   * Pulling the radar in and shrinking the tick font frees that space.
   */
  const isWideViewport = windowWidth > BREAKPOINTS["1xl"];

  return (
    <Card className="hidden lg:block h-full" id="marketMetrics">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          role="img"
          aria-label="Market metrics radar chart"
          className="w-full h-76 lg:h-76 3xl:h-96 mt-6"
        >
          <ResponsiveContainer
            width="100%"
            height="100%"
            initialDimension={{ width: 320, height: 200 }}
          >
            <RadarChart
              accessibilityLayer={false}
              cx="50%"
              cy="50%"
              outerRadius={isWideViewport ? "80%" : "70%"}
              data={isReady ? marketMetricsData : []}
              className="pt-4 mt-4 lg:mt-0"
              tabIndex={-1}
            >
              <PolarGrid stroke={"var(--color-chartPrimaryGrid)"} />
              <PolarAngleAxis
                dataKey="metric"
                tick={{
                  fill: "var(--color-chartAxisText)",
                  fontSize: isWideViewport ? 12 : 10,
                }}
                tickFormatter={metricLabel}
              />
              <Tooltip
                content={<MarketMetricsTooltip />}
                isAnimationActive={false}
              />
              <Radar
                name="profitMargin"
                dataKey="phones"
                stroke={"var(--color-chartSecondaryInverted)"}
                fill={"var(--color-chartSecondaryInverted)"}
                fillOpacity={0.3}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Radar
                name="salesVolume"
                dataKey="laptops"
                stroke={"var(--color-chartPrimaryInverted)"}
                fill={"var(--color-chartPrimaryInverted)"}
                fillOpacity={0.3}
                isAnimationActive={shouldAnimate}
                animationBegin={animationBegin}
                animationDuration={800}
                animationEasing="ease-out"
              />
              <Legend
                verticalAlign="top"
                align="center"
                content={<CustomLegend />}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
