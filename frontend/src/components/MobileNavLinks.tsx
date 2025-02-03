import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";

const MobileNavLinks = () => {
  const { logout } = useAuth0();
  return (
    <>
      <Link
        to="/order-status"
        className="flex bg-cream text-black items-center font-bold hover:text-orange"
      >
        Order Status
      </Link>
      <Link
        to="/manage-restaurant"
        className="flex bg-cream text-black items-center font-bold hover:text-orange"
      >
        My Restaurant
      </Link>
      <Link
        to="/user-profile"
        className="flex bg-cream text-black items-center font-bold hover:text-orange"
      >
        User Profile
      </Link>
      <Button
        onClick={() => logout()}
        className="flex items-center px-3 font-bold bg-orange text-white border border-transparent hover:bg-orange hover:scale-105 transition-transform"
      >
        Log Out
      </Button>
    </>
  );
};

export default MobileNavLinks;
