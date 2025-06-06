// import { Link } from "react-router-dom";
// import MobileNav from "./MobileNav";
// import MainNav from "./MainNav";

// const Header = () => {
//   return (
//     <div className="border-b-2 border-black py-6 bg-cream">
//       <div className="container mx-auto flex justify-between items-center">
//       <h1 >
//         <Link
//           to="/"
//           className="text-6xl font-heading font-extrabold italic tracking-tight text-black text-center"
//         >
//           foodster
//         </Link>
//         </h1>
//         <div className="md:hidden">
//           <MobileNav />
//         </div>
//         <div className="hidden md:block">
//           <MainNav />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;




// import { Link } from "react-router-dom";
// import MobileNav from "./MobileNav";
// import MainNav from "./MainNav";

// const Header = () => {
//   return (
//     <div className="border-b-2 border-black py-6 bg-cream">
//       <div className="container mx-auto flex justify-between items-center">
//         <div className="flex-1 flex justify-center">
//           <h1>
//             <Link
//               to="/"
//               className="text-6xl font-heading font-extrabold italic tracking-tight text-black text-center"
//             >
//               foodster
//             </Link>
//           </h1>
//         </div>
//         <div className="md:hidden">
//           <MobileNav />
//         </div>
//         <div className="hidden md:block">
//           <MainNav />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;

// import { Link } from "react-router-dom";
// import MobileNav from "./MobileNav";
// import MainNav from "./MainNav";

// const Header = () => {
//   return (
    
//       <div className="w-full bg-green text-white shadow-md">

// <div className="max-w-screen-xl mx-auto flex items-center justify-between py-6 px-4">

//         {/* Left Section: Home and About Links */}
//         <div className="flex-1 flex items-center space-x-4">
//           <Link
//             to="/"
//             className="font-bold text-lg px-3 py-1  text-white
//             hover-underline-animation"            >
//             Home
//           </Link>
//           <Link
//             to="/#about"
//             className="font-bold text-lg px-3 py-1  text-white
//              hover-underline-animation"
//             >
//             About
//           </Link>
//         </div>

//         {/* Center Section: Logo */}
//         <div className="flex-1 flex justify-center">
//           <h1>
//             <Link
//               to="/"
//               className="text-6xl font-heading font-extrabold italic tracking-tight text-white text-center"
//             >
//               foodster
//             </Link>
//           </h1>
//         </div>

//         {/* Right Section: User Navigation */}
//         <div className="flex-1 flex justify-end">
//           <div className="md:hidden">
//             <MobileNav />
//           </div>
//           <div className="hidden md:block">
//             <MainNav />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;


import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    
      <div className="w-full bg-green text-white shadow-md">

<div className="w-full flex flex-col md:flex-row items-center justify-between py-4 px-4 max-w-screen-xl mx-auto">

        {/* Left Section: Home and About Links */}
        <div className="flex-1 flex items-center space-x-4">
          <Link
            to="/"
            className="font-bold text-lg px-3 py-1  text-white
            hover-underline-animation"            >
            Home
          </Link>
          <Link
            to="/#about"
            className="font-bold text-lg px-3 py-1  text-white
             hover-underline-animation"
            >
            About
          </Link>
        </div>

        {/* Center Section: Logo */}
        <div className="flex-1 flex justify-center">
          <h1>
            <Link
              to="/"
              className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold italic tracking-tight text-white text-center"
              >
              foodster
            </Link>
          </h1>
        </div>

        {/* Right Section: User Navigation */}
        <div className="flex-1 flex justify-end">
          <div className="md:hidden">
            <MobileNav />
          </div>
          <div className="hidden md:block">
            <MainNav />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
