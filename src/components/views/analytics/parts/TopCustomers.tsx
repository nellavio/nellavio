"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/shadcn/card";
import { Link } from "@/i18n/navigation";
import { formatCurrency } from "@/utils/formatNumber";

import { TopCustomer, TopCustomersProps } from "../types";

// One colour per tier (tinted bg + matching text), shared by the avatar
// initial and the tier badge so both encode the same information.
const TIER_STYLES: Record<
  TopCustomer["tier"],
  { avatar: string; badge: string }
> = {
  vip: {
    avatar: "bg-customerTierVip/20 text-customerTierVip",
    badge: "bg-customerTierVip/15 text-customerTierVip",
  },
  pro: {
    avatar: "bg-customerTierPro/20 text-customerTierPro",
    badge: "bg-customerTierPro/15 text-customerTierPro",
  },
  new: {
    avatar: "bg-customerTierNew/20 text-customerTierNew",
    badge: "bg-customerTierNew/15 text-customerTierNew",
  },
};

export const TopCustomers = ({ topCustomersData }: TopCustomersProps) => {
  const t = useTranslations("analytics.topCustomers");

  return (
    <Card className="h-full flex flex-col" id="topCustomers">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <ul className="mt-2 flex flex-1 flex-col justify-between">
          {topCustomersData.map((customer: TopCustomer) => (
            <li
              key={customer.handle}
              className="flex items-center justify-between gap-3 rounded-lg px-2 py-2"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    TIER_STYLES[customer.tier].avatar
                  }`}
                >
                  {customer.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs 1xl:text-sm text-primaryText">
                    {customer.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-secondaryText">
                    {customer.handle}
                  </p>
                </div>
              </div>
              <div className="flex shrink-0 flex-col items-end">
                <span className="text-xs 1xl:text-sm text-primaryText">
                  {formatCurrency(customer.amount)}
                </span>
                <span
                  className={`mt-1 rounded px-1.5 py-0.5 text-[0.65rem] font-medium ${
                    TIER_STYLES[customer.tier].badge
                  }`}
                >
                  {t(customer.tier)}
                </span>
              </div>
            </li>
          ))}
        </ul>
        <Link
          href="/customers"
          className="mt-4 flex items-center justify-center gap-1 text-xs 1xl:text-sm text-coloredLinkText hover:underline"
        >
          {t("viewAll")}
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardContent>
    </Card>
  );
};
