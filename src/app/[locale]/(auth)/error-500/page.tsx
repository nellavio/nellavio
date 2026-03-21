import { Metadata } from "next";

import { ErrorPageLayout } from "../../../../components/views/errorPages/ErrorPageLayout";
import { ServerCrashIcon } from "../../../../components/views/errorPages/icons/ServerCrashIcon";

const Error500 = () => {
  return (
    <ErrorPageLayout
      code="500"
      titleKey="error500.title"
      descriptionKey="error500.description"
      icon={<ServerCrashIcon />}
    />
  );
};

export const metadata: Metadata = { title: "Error 500" };

export default Error500;
