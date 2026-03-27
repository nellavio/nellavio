import { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";

import { PageWrapper } from "@/components/common/PageWrapper";
import { HomepageView } from "@/components/views/homepage/HomepageView";
import { getData } from "@/services/getData";

const Home = async ({ params }: { params: Promise<{ locale: string }> }) => {
  const { locale } = await params;
  setRequestLocale(locale);

  const homepageData = await getData("homepage");

  return (
    <PageWrapper pageName="Dashboard" dataForExport={homepageData}>
      <HomepageView homepageData={homepageData} />
    </PageWrapper>
  );
};

export const metadata: Metadata = {
  title: { absolute: "Nellavio" },
};

export default Home;
