import { gql } from "@apollo/client";

export const HOMEPAGE2_QUERY = gql`
  query GetHomepage2Data {
    homepage2 {
      bestSellingProducts {
        name
        profit
        revenue
      }
      customerSatisfaction {
        brandName
        customerSatisfaction
        totalSales
        numberOfOrders
      }
      homeSmallCards {
        title
        metric
        metricPrev
        delta
        deltaType
        color
        increased
        changeValue
        changeText
        chartData
      }
      regions {
        name
        region
        sales
        delta
        deltaType
      }
      revenueOverTime {
        date
        websiteSales
        inStoreSales
      }
      revenuePerCountry {
        name
        price
      }
    }
  }
`;
