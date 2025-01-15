// import landingImage from "../assets/landing.png";
// import appDownloadImage from "../assets/appDownload.png";

// const HomePage = () => {

//   return (
//     <div className="flex flex-col gap-12">
      
//       <div className="grid md:grid-cols-2 gap-5">
//         <img src={landingImage} />
//         <div className="flex flex-col items-center justify-center gap-4 text-center">
//           <span className="font-bold text-3xl tracking-tighter">
//             Order takeaway even faster!
//           </span>
//           <span>
//             Download the Foodster App for faster ordering and personalised
//             recommendations
//           </span>
//           <img src={appDownloadImage} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HomePage;
import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-5" id="hero">
        <img src={landingImage} alt="Landing" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the Foodster App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="App Download" />
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="flex flex-col items-center text-center gap-4">
        <h2 className="font-bold text-2xl">About Foodster</h2>
        <p className="max-w-2xl">
          Foodster is your go-to platform for discovering the best restaurants
          and ordering takeaway with ease. With our app, you get personalised
          recommendations and a seamless ordering experience.
        </p>
      </div>
    </div>
  );
};

export default HomePage;
