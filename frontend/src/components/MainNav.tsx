import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import UsernameMenu from "./UsernameMenu";
import { Link } from "react-router-dom";

const MainNav = () => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    <span className="flex space-x-2 items-center">
      {isAuthenticated ? (
        <>
          <Link to="/order-status" 
className="font-bold text-lg px-3 py-1  text-white
hover-underline-animation"            >            Order Status
          </Link>
          <UsernameMenu />
        </>
      ) : (
        <Button
          className="font-bold border-none bg-transparent text-lg px-3 py-1  text-white
          hover-underline-animation hover:bg-transparent"  
                    onClick={async () => await loginWithRedirect()}
        >
          Log In
        </Button>
      )}
    </span>
  );
};

export default MainNav;
