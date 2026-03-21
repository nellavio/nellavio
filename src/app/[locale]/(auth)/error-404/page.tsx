import { Metadata } from "next";

import { ErrorPageLayout } from "../../../../components/views/errorPages/ErrorPageLayout";
import { SearchXIcon } from "../../../../components/views/errorPages/icons/SearchXIcon";

const Error404 = () => {
  return (
    <ErrorPageLayout
      code="404"
      titleKey="error404.title"
      descriptionKey="error404.description"
      icon={<SearchXIcon />}
    />
  );
};

export const metadata: Metadata = { title: "Error 404" };

export default Error404;
