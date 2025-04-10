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
      
      {/* About Section */}
      <div
  id="about"
  className="flex flex-col items-center justify-center text-center py-20  px-8"
>
  <h2 className="font-bold text-6xl mb-6">About Foodster</h2>
  <p className="max-w-4xl text-2xl leading-relaxed">
  Foodster is your golden ticket to a nationwide flavor fest — where cravings meet convenience and every bite tells a different story. Whether you're in the mood for fiery spice, creamy indulgence, or something sweet and soulful, Foodster lets you summon the best of India’s kitchens without moving an inch. One minute you're savoring the crunch of a perfectly crisp snack, the next you're lost in a gravy that's been slow-cooked to perfection. It's like having a secret teleportation portal to every hidden gem and legendary recipe across the country. No long lines, no small talk with the waiter — just you, your cravings, and a deliciously curated experience that knows exactly how to hit the spot. Foodster doesn’t just deliver food — it delivers moments, moods, and mealtime magic.  </p>
</div>

      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-5" id="hero">
        <img src={landingImage} alt="Landing"  
        className="border-2 border-green rounded-lg"
 />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order takeaway even faster!
          </span>
          <span>
            Download the Foodster App for faster ordering and personalised
            recommendations
          </span>
          <img src={appDownloadImage} alt="App Download" 
/>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
