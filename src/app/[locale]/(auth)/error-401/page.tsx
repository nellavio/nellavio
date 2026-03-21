import { Metadata } from "next";

import { ErrorPageLayout } from "../../../../components/views/errorPages/ErrorPageLayout";
import { LockIcon } from "../../../../components/views/errorPages/icons/LockIcon";

const Error401 = () => {
  return (
    <ErrorPageLayout
      code="401"
      titleKey="error401.title"
      descriptionKey="error401.description"
      icon={<LockIcon />}
    />
  );
};

export const metadata: Metadata = { title: "Error 401" };

export default Error401;
