"use client";

import {
  Monitor,
  Smartphone,
  Store,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Progress } from "@/components/common/shadcn/progress";

import { SalesChannelKey, TodaySalesBreakdownProps } from "../types";

const CHANNEL_ORDER: SalesChannelKey[] = [
  "onlineStore",
  "mobileApp",
  "inStore",
];

const CHANNEL_CONFIG: Record<
  SalesChannelKey,
  { icon: typeof Monitor; badge: string; bar: string }
> = {
  onlineStore: {
    icon: Monitor,
    badge: "bg-salesBreakdownIconBg text-salesBreakdownIcon",
    bar: "var(--color-chartSecondaryFill)",
  },
  mobileApp: {
    icon: Smartphone,
    badge: "bg-chartPrimaryFill/20 text-chartPrimaryFill",
    bar: "var(--color-chartPrimaryFill)",
  },
  inStore: {
    icon: Store,
    badge: "bg-chartTertiaryFill/20 text-chartTertiaryFill",
    bar: "var(--color-chartTertiaryFill)",
  },
};

/** Left column of the wide today's sales card: channel split and a summary note. */
export const TodaySalesBreakdown = ({
  channels,
  change,
  period,
}: TodaySalesBreakdownProps) => {
  const t = useTranslations("analytics.todaySales");

  const isUp = change >= 0;
  const NoteIcon = isUp ? TrendingUp : TrendingDown;

  const orderedChannels = CHANNEL_ORDER.flatMap((key) =>
    channels.filter((channel) => channel.key === key),
  );

  return (
    <div className="flex w-full flex-col lg:w-1/4">
      <p className="text-xs text-subtitleText">{t("breakdown")}</p>
      <ul className="mt-5 flex flex-col gap-5 1xl:gap-6 2xl:mb-10">
        {orderedChannels.map((channel) => {
          const config = CHANNEL_CONFIG[channel.key];
          const Icon = config.icon;

          return (
            <li key={channel.key} className="flex items-center gap-3">
              <span
                className={`flex h-9 w-9 1xl:h-10 1xl:w-10 shrink-0 items-center justify-center rounded-lg ${config.badge}`}
              >
                <Icon className="h-4 w-4 1xl:h-5 1xl:w-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-xs 1xl:text-sm text-primaryText">
                  {t(channel.key)}
                </p>
                <Progress
                  className="mt-2 h-1.5"
                  value={channel.share}
                  indicatorColor={config.bar}
                  label={t(channel.key)}
                />
              </div>
              <span className="w-10 shrink-0 text-right text-xs 1xl:text-sm text-secondaryText">
                {channel.share}%
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-auto hidden lg:flex items-start gap-2.5 2xl:gap-4 rounded-lg bg-salesNoteBg p-3 2xl:p-5">
        <span
          className={`flex h-8 w-8 2xl:h-11 2xl:w-11 shrink-0 items-center justify-center rounded-full ${
            isUp
              ? "bg-percentageBadgeGreenBg text-greenBadgeText"
              : "bg-percentageBadgeRedBg text-redBadgeText"
          }`}
        >
          <NoteIcon className="h-4 w-4 2xl:h-5 2xl:w-5" />
        </span>
        <p className="text-xs 2xl:text-sm text-secondaryText">
          {t(isUp ? "noteUp" : "noteDown", {
            change: Math.abs(change),
            period,
          })}{" "}
          <span className="hidden 2xl:inline">{t("momentum")}</span>
        </p>
      </div>
    </div>
  );
};
