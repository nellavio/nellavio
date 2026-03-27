import type { AnalyticsViewProps } from "@/components/views/analytics/types";
import type { CalendarEvent } from "@/components/views/calendar/types";
import type { Customer } from "@/components/views/customers/types";
import type { HomepageViewProps } from "@/components/views/homepage/types";
import type { OrderType } from "@/components/views/orders/types";
import type { Product } from "@/components/views/products/types";

export const mockOrders: OrderType[] = [
  {
    orderId: 1001,
    col1: 1001,
    productName: "iPhone 80A",
    col2: "iPhone 80A",
    user: "John Doe",
    col3: "John Doe",
    price: 799,
    col4: 799,
    deliveryType: "Two-day shipping",
    col5: "Two-day shipping",
    date: "2023-08-15",
    col6: "2023-08-15",
    status: "Delivered",
    col7: "Delivered",
  },
  {
    orderId: 1002,
    col1: 1002,
    productName: "MacBook Pro",
    col2: "MacBook Pro",
    user: "Jane Smith",
    col3: "Jane Smith",
    price: 2499,
    col4: 2499,
    deliveryType: "Standard shipping",
    col5: "Standard shipping",
    date: "2023-09-01",
    col6: "2023-09-01",
    status: "Processing",
    col7: "Processing",
  },
  {
    orderId: 1003,
    col1: 1003,
    productName: "iPad Z50",
    col2: "iPad Z50",
    user: "Bob Wilson",
    col3: "Bob Wilson",
    price: 1200,
    col4: 1200,
    deliveryType: "Express shipping",
    col5: "Express shipping",
    date: "2023-07-20",
    col6: "2023-07-20",
    status: "Cancelled",
    col7: "Cancelled",
  },
];

export const mockCustomers: Customer[] = [
  {
    photo: "https://example.com/user1.png",
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    country: "USA",
    phone: "+1-555-1234",
    totalBuys: 2487,
  },
  {
    photo: "https://example.com/user2.png",
    firstName: "Jane",
    lastName: "Smith",
    city: "London",
    country: "UK",
    phone: "+44-555-5678",
    totalBuys: 1350,
  },
  {
    photo: "https://example.com/user3.png",
    firstName: "Hans",
    lastName: "Mueller",
    city: "Berlin",
    country: "Germany",
    phone: "+49-555-9012",
    totalBuys: 890,
  },
];

export const mockProducts: Product[] = [
  {
    productId: "PROD001",
    name: "iPhone 80A",
    price: 2400,
    type: "Phone",
    image: "https://example.com/phone.png",
    parameters: [
      { title: "Screen Size", value: "6.1 inches" },
      { title: "Processor", value: "A15 Bionic chip" },
    ],
    metrics: [
      { title: "Inventory Status", firstValue: 360, secondValue: 438 },
      { title: "Monthly Target", firstValue: 30, secondValue: 46 },
    ],
  },
  {
    productId: "PROD002",
    name: "MacBook Ultra",
    price: 3200,
    type: "Laptop",
    image: "https://example.com/laptop.png",
    parameters: [
      { title: "Screen Size", value: "16 inches" },
      { title: "Processor", value: "M3 Max" },
    ],
    metrics: [
      { title: "Inventory Status", firstValue: 120, secondValue: 200 },
      { title: "Monthly Target", firstValue: 15, secondValue: 30 },
    ],
  },
];

export const mockHomepageData: HomepageViewProps["homepageData"] = {
  threeSmallCards: [
    {
      title: "Sales",
      metric: "$12,699",
      metricPrev: "$9,456",
      delta: "34.3%",
      deltaType: "moderateIncrease",
      color: "purple",
      increased: true,
      changeValue: 12.5,
      changeText: "Last 3 weeks",
      chartData: [{ date: "08.10.23", metric: 445 }],
    },
    {
      title: "Revenue",
      metric: "$8,200",
      metricPrev: "$7,100",
      delta: "15.5%",
      deltaType: "moderateIncrease",
      color: "blue",
      increased: true,
      changeValue: 8.3,
      changeText: "Last 3 weeks",
      chartData: [{ date: "08.10.23", metric: 320 }],
    },
    {
      title: "Profit",
      metric: "$4,500",
      metricPrev: "$3,800",
      delta: "18.4%",
      deltaType: "moderateIncrease",
      color: "green",
      increased: true,
      changeValue: 5.2,
      changeText: "Last 3 weeks",
      chartData: [{ date: "08.10.23", metric: 210 }],
    },
  ],
  fourSmallCards: [
    {
      title: "Total Orders",
      metric: "1,234",
      metricPrev: "1,100",
      delta: "12.2%",
      deltaType: "moderateIncrease",
      color: "blue",
      increased: true,
      changeValue: 12.2,
      changeText: "Last month",
      chartData: [{ date: "01.01.24", metric: 100 }],
    },
    {
      title: "Total Sales",
      metric: "$45,678",
      metricPrev: "$40,000",
      delta: "14.2%",
      deltaType: "moderateIncrease",
      color: "purple",
      increased: true,
      changeValue: 14.2,
      changeText: "Last month",
      chartData: [{ date: "01.01.24", metric: 200 }],
    },
    {
      title: "New Customers",
      metric: "256",
      metricPrev: "220",
      delta: "16.4%",
      deltaType: "moderateIncrease",
      color: "green",
      increased: true,
      changeValue: 16.4,
      changeText: "Last month",
      chartData: [{ date: "01.01.24", metric: 50 }],
    },
    {
      title: "Conversion",
      metric: "3.2%",
      metricPrev: "2.8%",
      delta: "14.3%",
      deltaType: "moderateIncrease",
      color: "orange",
      increased: true,
      changeValue: 14.3,
      changeText: "Last month",
      chartData: [{ date: "01.01.24", metric: 30 }],
    },
  ],
  revenueOverTime: [
    { date: "Mar 23", websiteSales: 2200, inStoreSales: 3700 },
    { date: "Apr 23", websiteSales: 2800, inStoreSales: 3200 },
  ],
  revenuePerCountry: [
    { name: "United States of America", price: 9155 },
    { name: "Germany", price: 4200 },
  ],
  bestSellingProducts: [
    { name: "iPad Z50", sales: 1800, profit: 3600 },
    { name: "MacBook Ultra", sales: 1200, profit: 2800 },
  ],
  customerSatisfaction: [
    {
      brandName: "iPhone 80A",
      customerSatisfaction: 92.3,
      totalSales: 50437,
      numberOfOrders: 17417,
    },
  ],
  weeklyPerformance: [
    { name: "Mon", revenue: 4000, profit: 2400 },
    { name: "Tue", revenue: 3000, profit: 1398 },
  ],
  weeklyActivities: [
    {
      id: 1,
      action: "Henry uploaded quarterly report",
      time: "1 day ago",
      icon: "document",
      color: "green",
    },
  ],
};

export const mockAnalyticsData: AnalyticsViewProps["analyticsData"] = {
  assets: [
    {
      name: "Quantum Edge Systems",
      industry: "tech",
      sales: 984888,
      delta: 61.3,
      deltaType: "increase",
      status: "emerald",
    },
  ],
  revenueTrends: [
    { month: "Jan", sales: 2756, profit: 2234 },
    { month: "Feb", sales: 1967, profit: 1445 },
  ],
  todaySales: [
    { hour: "00:00", today: 90, average: 66, yesterday: 23 },
    { hour: "02:00", today: 45, average: 40, yesterday: 32 },
  ],
  totalProfitProducts: [
    { title: "iPhone 80A", value: 38, metric: "$ 100,838" },
  ],
  totalProfitMonths: [{ month: "Jan 21", sales: 2890 }],
  yearOverview: [{ name: "Jan", phones: 3200, tablets: 850, laptops: 850 }],
  marketMetrics: [
    { metric: "salesVolume", phones: 95, laptops: 48, maxValue: 100 },
  ],
  revenueDistribution: [{ category: "laptops", inStore: 28000, online: 23200 }],
};

export const mockCalendarEvents: CalendarEvent[] = [
  { id: "1", title: "Market strategy", start: "2026-03-14" },
  { id: "2", title: "Team standup", start: "2026-03-15", end: "2026-03-15" },
];
