export interface Asset {
  name: string;
  industry: string;
  sales: number;
  delta: number;
  deltaType: string;
  status: string;
  [key: string]: any;
}

export interface AssetPerformanceProps {
  assetPerformanceData: Asset[];
}

export interface MonthPerformance {
  month: string;
  sales: number;
  profit: number;
}

export interface PerformanceProps {
  performanceData: MonthPerformance[];
}

export interface TodaySalesDataUnit {
  hour: string;
  today: number;
  average: number;
  yesterday: number;
}

export interface TodaySalesProps {
  todaySalesData: TodaySalesDataUnit[];
}

export interface ProductProfit {
  title: string;
  value: number;
  metric: string;
}

export interface TotalMonthProfit {
  month: string;
  sales: number;
}

export interface TotalProfitProps {
  totalProfitProducts: ProductProfit[];
  totalProfitSales: TotalMonthProfit[];
}

export interface TotalProfitTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
}

export interface SingleProductData {
  name: string;
  value: number;
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

interface AnalyticsData {
  assets: AssetPerformanceProps["assetPerformanceData"];
  monthPerformance: PerformanceProps["performanceData"];
  todaySales: TodaySalesProps["todaySalesData"];
  totalProfitProducts: TotalProfitProps["totalProfitProducts"];
  totalProfitMonths: TotalProfitProps["totalProfitSales"];
  yearOverview: YearOverviewProps["yearOverviewData"];
  marketMetrics: MarketMetricsProps["marketMetricsData"];
  revenueDistribution: RevenueDistributionProps["revenueDistributionData"];
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

export interface RevenueData {
  category: string;
  inStore: number;
  online: number;
}

export interface RevenueDistributionProps {
  revenueDistributionData: RevenueData[];
}

export interface RevenueTooltipPayloadItem {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
}

export interface RevenueDistributionTooltipProps {
  active?: boolean;
  payload?: RevenueTooltipPayloadItem[];
  label?: string;
}

export interface PerformanceTooltipProps {
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

export interface PerformanceCustomLegendProps {
  payload?: Array<{ value: string; color?: string }>;
}

export interface PerformanceCustomXAxisTickProps {
  x?: number;
  y?: number;
  payload?: { value: string };
}
