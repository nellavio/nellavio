"use client";

import { useTranslations } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/shadcn/select";
import { cn } from "@/utils/classNames";

import {
  TodaySalesComparison,
  TodaySalesComparisonSelectProps,
  TodaySalesLegendProps,
} from "../types";

export const TODAY_COLOR = "var(--color-chartSecondaryFill)";
export const COMPARE_COLOR = "var(--color-chartPrimaryFill)";

/** Colour key for the two series drawn in the today's sales chart. Rendered in
    the card header from lg up and inside the chart column below it. */
export const TodaySalesLegend = ({
  comparison,
  className,
}: TodaySalesLegendProps) => {
  const t = useTranslations("analytics.todaySales");

  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      <span className="flex items-center gap-2 text-xs 1xl:text-sm text-primaryText">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: TODAY_COLOR }}
        />
        {t("today")}
      </span>
      <span className="flex items-center gap-2 text-xs 1xl:text-sm text-primaryText">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: COMPARE_COLOR }}
        />
        {t(comparison)}
      </span>
    </div>
  );
};

/** Picks the series the today's line is compared against. */
export const TodaySalesComparisonSelect = ({
  value,
  onChange,
  className,
}: TodaySalesComparisonSelectProps) => {
  const t = useTranslations("analytics.todaySales");

  return (
    <Select
      value={value}
      onValueChange={(next) => onChange(next as TodaySalesComparison)}
    >
      <SelectTrigger
        className={cn("w-32", className)}
        aria-label={t("comparisonLabel")}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="yesterday">{t("yesterday")}</SelectItem>
        <SelectItem value="average">{t("average")}</SelectItem>
      </SelectContent>
    </Select>
  );
};
