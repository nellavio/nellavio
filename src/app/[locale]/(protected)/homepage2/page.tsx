import { PageWrapper } from "../../../../components/common/PageWrapper";
import { getData } from "../../../../services/getData";
import { Homepage2View } from "../../../../components/views/homepage2/Homepage2View";

const Homepage2 = async () => {
  const homepage2Data = await getData("homepage2");

  return (
    <PageWrapper
      hidePaper
      hideTopBar
      className="pt-32"
      pageName="Dashboard - Homepage 2"
      dataForExport={homepage2Data}
    >
      <Homepage2View homepage2Data={homepage2Data} />
    </PageWrapper>
  );
};

// All API requests are resolved during build time on default for demo purposes
// Uncomment those exports to enable dynamic rendering on this page
// export const dynamic = 'force-dynamic'
// export const revalidate = 0

export default Homepage2;
