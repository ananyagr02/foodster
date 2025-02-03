// import { CircleUserRound } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import { useAuth0 } from "@auth0/auth0-react";
// import { Link } from "react-router-dom";
// import { Separator } from "./ui/separator";
// import { Button } from "./ui/button";

// const UsernameMenu = () => {
//   const { user, logout } = useAuth0();

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger className="flex items-center px-3 font-bold hover:text-orange-500 gap-2">
//         <CircleUserRound className="text-orange-500" />
//         {user?.email}
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="bg-cream border-green">
//       <DropdownMenuItem
//   className="hover:bg-green-100 hover:text-green-800 rounded-lg transition-colors">
//  <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
//    Manage Restaurant
//  </Link>

//         </DropdownMenuItem>
//         <DropdownMenuItem
//           className="hover:bg-green-100 hover:text-green-800 rounded-lg transition-colors">

//           <Link to="/user-profile" className="font-bold hover:text-orange-500">
//             User Profile
//           </Link>
//         </DropdownMenuItem>
//         <Separator />
//         <DropdownMenuItem>
//           <Button
//             onClick={() => logout()}
//             className="flex items-center px-4 py-2 text-sm w-full bg-orange text-white border border-transparent hover:bg-orange hover:scale-105 transition-transform">
          
//             Log Out
//           </Button>
//         </DropdownMenuItem>
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// };

// export default UsernameMenu;

import { CircleUserRound, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const UsernameMenu = () => {
  const { user, logout } = useAuth0();

  return (
    <DropdownMenu>
      <div className="flex items-center gap-2">
        {/* User icon on the left */}
        <CircleUserRound className="text-orange-500" />
        <span className="font-bold">{user?.email}</span>

        {/* Separate dropdown icon on the right */}
        <DropdownMenuTrigger className="flex items-center cursor-pointer hover:text-orange-500">
          <ChevronDown className="text-white" />
        </DropdownMenuTrigger>
      </div>
      
      <DropdownMenuContent className="bg-cream border-green">
        <DropdownMenuItem className="hover:bg-green-100 hover:text-green-800 rounded-lg transition-colors">
          <Link to="/manage-restaurant" className="font-bold hover:text-orange-500">
            Manage Restaurant
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="hover:bg-green-100 hover:text-green-800 rounded-lg transition-colors">
          <Link to="/user-profile" className="font-bold hover:text-orange-500">
            User Profile
          </Link>
        </DropdownMenuItem>
        <Separator />
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            className="flex items-center px-4 py-2 text-sm w-full bg-orange text-white border border-transparent hover:bg-orange hover:scale-105 transition-transform"
          >
            Log Out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UsernameMenu;
