"use client";

import { useTranslations } from "next-intl";

import { DollarIcon } from "@/assets/icons/DollarIcon";
import { ShoppingCartIcon } from "@/assets/icons/ShoppingCartIcon";
import { TruckIcon } from "@/assets/icons/TruckIcon";
import { UsersLineIcon } from "@/assets/icons/UsersLineIcon";
import { Card, CardContent } from "@/components/common/shadcn/card";
import { formatCurrency, formatNumber } from "@/utils/formatNumber";

import { AnalyticsKpiKey, IconComponent, KpiCardsProps } from "../types";

const KPI_ORDER: AnalyticsKpiKey[] = [
  "sales",
  "earnings",
  "visitors",
  "orders",
];

const KPI_ICON: Record<AnalyticsKpiKey, IconComponent> = {
  sales: TruckIcon,
  earnings: DollarIcon,
  visitors: UsersLineIcon,
  orders: ShoppingCartIcon,
};

const ICON_STYLES = [
  "bg-kpiIconBlue/20 text-kpiIconBlue",
  "bg-kpiIconGreen/20 text-kpiIconGreen",
  "bg-kpiIconPurple/20 text-kpiIconPurple",
  "bg-kpiIconAmber/20 text-kpiIconAmber",
];

export const KpiCards = ({ kpis }: KpiCardsProps) => {
  const t = useTranslations("analytics.kpis");

  const orderedKpis = KPI_ORDER.flatMap((key) =>
    kpis.filter((kpi) => kpi.key === key),
  );

  return (
    <div className="hidden gap-4 1xl:gap-6 sm:grid sm:grid-cols-2 lg:grid-cols-4">
      {orderedKpis.map((kpi, index) => {
        const Icon = KPI_ICON[kpi.key];
        const isPositive = kpi.change >= 0;
        const iconStyle = ICON_STYLES[index % ICON_STYLES.length];
        const value =
          kpi.format === "currency"
            ? formatCurrency(kpi.value)
            : formatNumber(kpi.value);

        return (
          <Card key={kpi.key} id={`kpi-${kpi.key}`}>
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-sm text-secondaryText">{t(kpi.key)}</p>
                  <p className="mt-1 text-2xl 1xl:text-3xl font-bold text-primaryText">
                    {value}
                  </p>
                </div>
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${iconStyle}`}
                >
                  <Icon className="h-6 w-6" />
                </span>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-md border px-2 py-0.5 text-xs ${
                    isPositive
                      ? "border-percentageBadgeGreenBorder bg-percentageBadgeGreenBg text-greenBadgeText"
                      : "border-percentageBadgeRedBorder bg-percentageBadgeRedBg text-redBadgeText"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {kpi.change}%
                </span>
                <span className="text-xs text-subtitleText">
                  {t("sinceLastWeek")}
                </span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
