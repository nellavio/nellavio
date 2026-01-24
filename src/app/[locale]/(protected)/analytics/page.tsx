import { PageWrapper } from "../../../../components/common/PageWrapper";
import { getData } from "../../../../services/getData";
import { AnalyticsView } from "../../../../components/views/analytics/AnalyticsView";

const Analytics = async () => {
  const analyticsData = await getData("analytics");

  return (
    <PageWrapper pageName="Analytics" dataForExport={analyticsData}>
      <AnalyticsView analyticsData={analyticsData} />
    </PageWrapper>
  );
};

export default Analytics;
