"use client";

import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ChartsView } from "../../../../components/views/charts/ChartsView";

const ChartsPage = () => {
  return (
    <PageWrapper pageName="Charts" hidePaper>
      <ChartsView />
    </PageWrapper>
  );
};

export default ChartsPage;
