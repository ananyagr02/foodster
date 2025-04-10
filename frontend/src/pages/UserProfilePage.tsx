import { useGetMyUser, useUpdateMyUser } from "@/api/MyUserApi";
import UserProfileForm from "@/forms/user-profile-form/UserProfileForm";
import { useAuth0 } from "@auth0/auth0-react";

const UserProfilePage = () => {
  const { isAuthenticated, isLoading: authLoading } = useAuth0();

  // 🛑 Wait until Auth0 finishes loading and user is authenticated
  const { currentUser, isLoading: isGetLoading } = useGetMyUser();
  const { updateUser, isLoading: isUpdateLoading } = useUpdateMyUser();

  if (authLoading) return <span>Checking login...</span>;
  if (!isAuthenticated) return <span>Please log in to access your profile.</span>;
  if (isGetLoading) return <span>Loading...</span>;
  if (!currentUser) return <span>Unable to load user profile</span>;

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  );
};

export default UserProfilePage;
