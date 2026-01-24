import { PageWrapper } from "../../../../components/common/PageWrapper";
import { ProfileView } from "../../../../components/views/profile/ProfileView";

const Profile = async () => {
  return (
    <PageWrapper pageName="Profile">
      <ProfileView />
    </PageWrapper>
  );
};

export default Profile;
