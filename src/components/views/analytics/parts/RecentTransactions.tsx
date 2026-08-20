"use client";

import { ArrowRight, CheckCircle2, Clock } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/utils/formatNumber";

import { RecentTransaction, RecentTransactionsProps } from "../types";
import { PRODUCT_ICON } from "../utils/productIcon";

const STATUS_CONFIG: Record<
  RecentTransaction["status"],
  { color: string; icon: typeof CheckCircle2 }
> = {
  completed: { color: "text-greenBadgeText", icon: CheckCircle2 },
  pending: { color: "text-orangeBadgeText", icon: Clock },
};

export const RecentTransactions = ({
  recentTransactionsData,
  titleKey = "titleAlt",
  id = "recentTransactions",
}: RecentTransactionsProps) => {
  const t = useTranslations("analytics.recentTransactions");

  return (
    <Card className="h-full flex flex-col" id={id}>
      <CardHeader>
        <CardTitle>{t(titleKey)}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="mt-2 flex flex-1 flex-col justify-between">
          {recentTransactionsData.map((transaction: RecentTransaction) => {
            const status = STATUS_CONFIG[transaction.status];
            const StatusIcon = status.icon;
            const Icon = PRODUCT_ICON[transaction.category];

            return (
              <li
                key={transaction.orderId}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-2"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-9 w-9 1xl:h-10 1xl:w-10 shrink-0 items-center justify-center rounded-lg bg-mutedBg text-secondaryText">
                    <Icon className="h-4 w-4 1xl:h-5 1xl:w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-xs 1xl:text-sm text-primaryText">
                      {transaction.product}
                    </p>
                    <p className="mt-0.5 text-xs text-secondaryText">
                      {transaction.orderId}
                    </p>
                  </div>
                </div>
                <div className="flex shrink-0 flex-col items-end">
                  <span className="text-xs 1xl:text-sm text-primaryText">
                    {formatCurrency(transaction.amount)}
                  </span>
                  <span
                    className={`mt-1 flex items-center gap-1 text-xs ${status.color}`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {t(transaction.status)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <Link
          href="/orders"
          className="mt-4 flex items-center justify-center gap-1 text-xs 1xl:text-sm text-coloredLinkText hover:underline"
        >
          {t("viewAll")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
};
