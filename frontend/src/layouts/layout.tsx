// import Footer from "@/components/Footer";
// import Header from "@/components/Header";
// import Hero from "@/components/Hero";
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";

// type Props = {
//   children?: React.ReactNode;
//   showHero?: boolean;
// };

// const Layout = ({ children, showHero = false }: Props) => {

//   const location = useLocation();

//   useEffect(() => {
//     if (location.hash) {
//       const element = document.querySelector(location.hash);
//       if (element) {
//         element.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   }, [location]);
//   return (
//     <div className="flex flex-col min-h-screen">
//       <Header />
//       {showHero && <Hero />}
//       <div className="container mx-auto flex-1 py-10">{children}</div>
//       <Footer />
//     </div>
//   );
// };

// export default Layout;
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

type Props = {
  children?: React.ReactNode;
  showHero?: boolean;
};

const Layout = ({ children, showHero = false }: Props) => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {showHero && <Hero />}
      {/* Always render children */}
      <div className="container mx-auto flex-1 py-10">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
