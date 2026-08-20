export interface Asset {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: string;
  status: string;
}

export interface AssetPerformanceProps {
  assetPerformanceData: Asset[];
}

export interface RevenueTrendItem {
  month: string;
  sales: number;
  profit: number;
}

export interface RevenueTrendsProps {
  revenueTrendsData: RevenueTrendItem[];
}

export interface TodaySalesDataUnit {
  hour: string;
  today: number;
  average: number;
  yesterday: number;
}

export interface TodaySalesProps {
  todaySalesData: TodaySalesDataUnit[];
  todaySalesTotal: number;
  salesChannels?: SalesChannel[];
  id?: string;
  showBreakdown?: boolean;
}

export type SalesChannelKey = "onlineStore" | "mobileApp" | "inStore";

export interface SalesChannel {
  key: SalesChannelKey;
  share: number;
}

export interface TodaySalesBreakdownProps {
  channels: SalesChannel[];
  change: number;
  period: string;
}

export type TodaySalesComparison = "yesterday" | "average";

export interface TodaySalesLegendProps {
  comparison: TodaySalesComparison;
  className?: string;
}

export interface TodaySalesComparisonSelectProps {
  value: TodaySalesComparison;
  onChange: (value: TodaySalesComparison) => void;
  className?: string;
}

export type ProductCategory = "phone" | "laptop" | "tablet" | "watch" | "audio";

export interface RecentTransaction {
  orderId: string;
  product: string;
  category: ProductCategory;
  amount: number;
  status: "completed" | "pending";
}

export interface RecentTransactionsProps {
  recentTransactionsData: RecentTransaction[];
  titleKey?: string;
  id?: string;
}

export interface TopCustomer {
  name: string;
  handle: string;
  amount: number;
  tier: "vip" | "pro" | "new";
}

export interface TopCustomersProps {
  topCustomersData: TopCustomer[];
}

export interface OverviewMonthData {
  name: string;
  phones: number;
  tablets: number;
  laptops: number;
}

export interface YearOverviewProps {
  yearOverviewData: OverviewMonthData[];
}

export type AnalyticsKpiKey = "sales" | "earnings" | "visitors" | "orders";

export type AnalyticsKpiFormat = "number" | "currency";

export interface AnalyticsKpi {
  key: AnalyticsKpiKey;
  value: number;
  change: number;
  format: AnalyticsKpiFormat;
}

export interface KpiCardsProps {
  kpis: AnalyticsKpi[];
}

export interface AnalyticsSummary {
  todaySalesTotal: number;
}

interface AnalyticsData {
  assets: AssetPerformanceProps["assetPerformanceData"];
  revenueTrends: RevenueTrendsProps["revenueTrendsData"];
  todaySales: TodaySalesProps["todaySalesData"];
  yearOverview: YearOverviewProps["yearOverviewData"];
  marketMetrics: MarketMetricsProps["marketMetricsData"];
  kpis: KpiCardsProps["kpis"];
  recentTransactions: RecentTransactionsProps["recentTransactionsData"];
  topCustomers: TopCustomersProps["topCustomersData"];
  salesChannels: SalesChannel[];
  summary: AnalyticsSummary;
}

export interface AnalyticsViewProps {
  analyticsData: AnalyticsData;
}

export interface MetricPoint {
  metric: string;
  phones: number;
  laptops: number;
  maxValue: number;
}

export interface MarketMetricsProps {
  marketMetricsData: MetricPoint[];
}

export interface MarketMetricsTooltipProps {
  active?: boolean;
  payload?: Array<{ name?: string; value?: number; color?: string }>;
  label?: string;
}

export interface RevenueTrendsTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

export interface YearOverviewCustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
}

export interface YearOverviewCustomLegendProps {
  payload?: Array<{ value: string; color: string }>;
}

export interface RevenueTrendsCustomLegendProps {
  payload?: Array<{ value: string; color?: string }>;
}

export interface RevenueTrendsCustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}
