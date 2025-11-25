import { DocumentNode } from "graphql";
import fs from "fs";
import path from "path";

import { client } from "./apolloClient";
import { ORDERS_QUERY } from "../queries/OrdersQuery";
import { ANALYTICS_QUERY } from "../queries/AnalyticsQuery";
import { EVENTS_QUERY } from "../queries/EventsQuery";
import { CUSTOMERS_QUERY } from "../queries/CustomersQuery";
import { PRODUCTS_QUERY } from "../queries/ProductsQuery";
import { HOMEPAGE_QUERY } from "../queries/HomepageQuery";
import { HOMEPAGE2_QUERY } from "../queries/Homepage2Query";
import { hasValidBackendUrl } from "../utils/presentationMode";

import type { OrderType } from "../components/views/orders/types";
import type { Customer } from "../components/views/customers/types";
import type { ProductCategory } from "../components/views/products/types";
import type { CalendarEvent } from "../components/views/calendar/types";
import type { AnalyticsViewProps } from "../components/views/analytics/types";
import type { HomepageViewProps } from "../components/views/homepage/types";
import type { Homepage2ViewProps } from "../components/views/homepage2/types";

interface QueryMap {
  [key: string]: DocumentNode;
}

const QUERY_MAP: QueryMap = {
  analytics: ANALYTICS_QUERY,
  events: EVENTS_QUERY,
  customers: CUSTOMERS_QUERY,
  homepage: HOMEPAGE_QUERY,
  homepage2: HOMEPAGE2_QUERY,
  orders: ORDERS_QUERY,
  products: PRODUCTS_QUERY,
};

// Map page names to their return types
interface PageDataMap {
  orders: OrderType[];
  customers: Customer[];
  products: ProductCategory[];
  events: CalendarEvent[];
  analytics: AnalyticsViewProps["analyticsData"];
  homepage: HomepageViewProps["homepageData"];
  homepage2: Homepage2ViewProps["homepage2Data"];
}

type PageName = keyof PageDataMap;

/**
 * Helper function to load data from backup JSON file
 */
const getBackupData = <T extends PageName>(pageName: T): PageDataMap[T] => {
  const backupFilePath = path.join(
    process.cwd(),
    "public",
    "backendBackup.json"
  );
  try {
    const raw = fs.readFileSync(backupFilePath, "utf-8");
    const allData: unknown = JSON.parse(raw);

    // Type guard to ensure data structure
    if (!allData || typeof allData !== "object") {
      throw new Error("Invalid backup data structure");
    }

    const typedData = allData as Record<string, unknown>;
    if (!typedData[pageName]) {
      throw new Error(`No backup data for page ${pageName}`);
    }

    return typedData[pageName] as PageDataMap[T];
  } catch (error) {
    throw new Error(`Error reading backup: ${error}`);
  }
};

/**
 * Get data for a specific page
 * Automatically uses backup JSON if backend is not configured or fails
 */
export const getData = async <T extends PageName>(
  pageName: T
): Promise<PageDataMap[T]> => {
  // Auto-detect: If no valid backend URL, use backup data
  if (!hasValidBackendUrl()) {
    console.log(`[Presentation Mode] Using backup data for ${pageName}`);
    return getBackupData(pageName);
  }

  // Try to fetch from backend
  const query = QUERY_MAP[pageName];
  if (!query) {
    throw new Error(`Query not found for page: ${pageName}`);
  }

  try {
    const { data } = await client.query({ query });

    switch (pageName) {
      case "homepage":
        return data as PageDataMap[T];
      case "homepage2":
        return data.homepage2 as PageDataMap[T];
      case "analytics":
        return data as PageDataMap[T];
      default:
        return data[pageName] as PageDataMap[T];
    }
  } catch {
    throw new Error(`Error fetching data for page ${pageName}`);
  }
};
