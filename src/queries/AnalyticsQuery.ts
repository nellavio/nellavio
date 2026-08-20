import { gql } from "@apollo/client";

export const ANALYTICS_QUERY = gql`
  query GetAnalyticsData {
    analytics {
      assets {
        name
        industry
        sales
        delta
        deltaType
        status
      }
      revenueTrends {
        month
        sales
        profit
      }
      todaySales {
        hour
        today
        average
        yesterday
      }
      yearOverview {
        name
        phones
        tablets
        laptops
      }
      marketMetrics {
        metric
        phones
        laptops
        maxValue
      }
      kpis {
        key
        value
        change
        format
      }
      recentTransactions {
        orderId
        product
        category
        amount
        status
      }
      topCustomers {
        name
        handle
        amount
        tier
      }
      salesChannels {
        key
        share
      }
      summary {
        todaySalesTotal
      }
    }
  }
`;
