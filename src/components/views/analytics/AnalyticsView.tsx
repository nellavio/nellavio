"use client";

import { AssetDonut } from "./parts/AssetDonut";
import { KpiCards } from "./parts/KpiCards";
import { MarketMetrics } from "./parts/MarketMetrics";
import { RecentTransactions } from "./parts/RecentTransactions";
import { RevenueTrends } from "./parts/RevenueTrends";
import { TodaySales } from "./parts/TodaySales";
import { TopCustomers } from "./parts/TopCustomers";
import { YearOverview } from "./parts/YearOverview";
import { AnalyticsViewProps } from "./types";

export const AnalyticsView = ({ analyticsData }: AnalyticsViewProps) => {
  return (
    <>
      <h1 className="sr-only">Analytics</h1>
      {/* First row — 4 KPI cards across full width */}
      {analyticsData?.kpis && <KpiCards kpis={analyticsData.kpis} />}
      {/* Second row — full-width today's sales */}
      {analyticsData?.todaySales && analyticsData?.summary && (
        <TodaySales
          todaySalesData={analyticsData.todaySales}
          todaySalesTotal={analyticsData.summary.todaySalesTotal}
          salesChannels={analyticsData.salesChannels}
          id="todaysSalesWide"
          showBreakdown
        />
      )}
      {/* Third + fourth rows — one grid so cards can share rows across them */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 1xl:gap-x-6 gap-y-4 1xl:gap-y-6">
        <div className="md:col-span-2">
          {analyticsData?.revenueTrends && (
            <RevenueTrends revenueTrendsData={analyticsData.revenueTrends} />
          )}
        </div>
        <div>
          {analyticsData?.assets && (
            <AssetDonut assetPerformanceData={analyticsData.assets} />
          )}
        </div>
        {/* Market metrics — hidden below lg */}
        <div className="hidden lg:block">
          {analyticsData?.marketMetrics && (
            <MarketMetrics marketMetricsData={analyticsData.marketMetrics} />
          )}
        </div>
        <div>
          {analyticsData?.topCustomers && (
            <TopCustomers topCustomersData={analyticsData.topCustomers} />
          )}
        </div>
        {/* Latest orders — hidden between md and lg */}
        <div className="md:hidden lg:block">
          {analyticsData?.recentTransactions && (
            <RecentTransactions
              recentTransactionsData={analyticsData.recentTransactions}
              titleKey="titleAlt"
              id="latestOrders"
            />
          )}
        </div>
      </div>
      {/* Fifth row — full-width year overview */}
      {analyticsData?.yearOverview && (
        <YearOverview yearOverviewData={analyticsData.yearOverview} />
      )}
    </>
  );
};
