// import { useAuth0 } from "@auth0/auth0-react";
// import { useLocation } from "react-router-dom";
// import { Button } from "./ui/button";
// import LoadingButton from "./LoadingButton";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import UserProfileForm, {
//   UserFormData,
// } from "@/forms/user-profile-form/UserProfileForm";
// import { useGetMyUser } from "@/api/MyUserApi";

// type Props = {
//   onCheckout: (userFormData: UserFormData) => void;
//   disabled: boolean;
//   isLoading: boolean;
// };

// const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
//   const {
//     isAuthenticated,
//     isLoading: isAuthLoading,
//     loginWithRedirect,
//   } = useAuth0();

//   const { pathname } = useLocation();

//   const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

//   const onLogin = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: pathname,
//       },
//     });
//   };

//   if (!isAuthenticated) {
//     return (
//       <Button onClick={onLogin} variant="ghost"
//   className="flex-1 bg-orange hover:bg-dullorange text-white font-bold">
//         Log in to check out
//       </Button>
//     );
//   }

//   if (isAuthLoading || !currentUser || isLoading) {
//     return <LoadingButton />;
//   }

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//         disabled={disabled}
//   variant="ghost"
//   className="flex-1 bg-orange hover:bg-dullorange text-white font-bold"
// >
//   Go to checkout
// </Button>

//       </DialogTrigger>
//       <DialogContent className="max-w-[425px] md:min-w-[700px] ">
//         <UserProfileForm
//           currentUser={currentUser}
//           onSave={onCheckout}
//           isLoading={isGetUserLoading}
//           title="Confirm Delivery Details"
//           buttonText="Continue to payment"
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CheckoutButton;



// import { useAuth0 } from "@auth0/auth0-react";
// import { useLocation } from "react-router-dom";
// import { Button } from "./ui/button";
// import LoadingButton from "./LoadingButton";
// import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
// import UserProfileForm, {
//   UserFormData,
// } from "@/forms/user-profile-form/UserProfileForm";
// import { useGetMyUser } from "@/api/MyUserApi";

// type Props = {
//   onCheckout: (userFormData: UserFormData & { restaurantId: string }) => void;
//   disabled: boolean;
//   isLoading: boolean;
//   restaurantId: string;
// };

// const CheckoutButton = ({
//   onCheckout,
//   disabled,
//   isLoading,
//   restaurantId,
// }: Props) => {
//   const {
//     isAuthenticated,
//     isLoading: isAuthLoading,
//     loginWithRedirect,
//   } = useAuth0();

//   const { pathname } = useLocation();

//   const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

//   const onLogin = async () => {
//     await loginWithRedirect({
//       appState: {
//         returnTo: pathname,
//       },
//     });
//   };

//   if (!isAuthenticated) {
//     return (
//       <Button
//         onClick={onLogin}
//         variant="ghost"
//         className="flex-1 bg-orange hover:bg-dullorange text-white font-bold"
//       >
//         Log in to check out
//       </Button>
//     );
//   }

//   if (isAuthLoading || !currentUser || isLoading) {
//     return <LoadingButton />;
//   }

//   const handleSave = (formData: UserFormData) => {
//     onCheckout({
//       ...formData,
//       restaurantId,
//     });
//   };

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button
//           disabled={disabled}
//           variant="ghost"
//           className="flex-1 bg-orange hover:bg-dullorange text-white font-bold"
//         >
//           Go to checkout
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-[425px] md:min-w-[700px]">
//         <UserProfileForm
//           currentUser={currentUser}
//           onSave={handleSave}
//           isLoading={isGetUserLoading}
//           title="Confirm Delivery Details"
//           buttonText="Continue to payment"
//         />
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CheckoutButton;








import { useAuth0 } from "@auth0/auth0-react";
import { useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import LoadingButton from "./LoadingButton";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import UserProfileForm, {
  UserFormData,
} from "@/forms/user-profile-form/UserProfileForm";
import { useGetMyUser } from "@/api/MyUserApi";

type Props = {
  onCheckout: (userFormData: UserFormData & { restaurantId: string }) => void;
  disabled: boolean;
  isLoading: boolean;
  restaurantId: string;
};

const CheckoutButton = ({
  onCheckout,
  disabled,
  isLoading,
  restaurantId,
}: Props) => {
  const {
    isAuthenticated,
    isLoading: isAuthLoading,
    loginWithRedirect,
  } = useAuth0();

  const { pathname } = useLocation();
  const { currentUser, isLoading: isGetUserLoading } = useGetMyUser();

  console.log("[CheckoutButton] Props:", {
    isAuthenticated,
    isAuthLoading,
    isGetUserLoading,
    isLoading,
    disabled,
    restaurantId,
    currentUser,
  });

  const onLogin = async () => {
    console.log("[CheckoutButton] Redirecting to login...");
    await loginWithRedirect({
      appState: {
        returnTo: pathname,
      },
    });
  };

  if (!isAuthenticated) {
    console.log("[CheckoutButton] User not authenticated");
    return (
      <Button
        onClick={onLogin}
        variant="ghost"
        className="flex-1 bg-orange hover:bg-dullorange text-white font-bold"
      >
        Log in to check out
      </Button>
    );
  }

  if (isAuthLoading || !currentUser || isLoading) {
    console.log("[CheckoutButton] Loading... (Auth/User/API)");
    return <LoadingButton />;
  }

  const handleSave = (formData: UserFormData) => {
    const checkoutData = {
      ...formData,
      restaurantId,
    };

    console.log("[CheckoutButton] Submitting checkout form with data:", checkoutData);
    onCheckout(checkoutData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={disabled}
          variant="ghost"
          className="flex-1 bg-orange hover:bg-dullorange text-white font-bold"
        >
          Go to checkout
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[425px] md:min-w-[700px]">
        <UserProfileForm
          currentUser={currentUser}
          onSave={handleSave}
          isLoading={isGetUserLoading}
          title="Confirm Delivery Details"
          buttonText="Continue to payment"
        />
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutButton;
