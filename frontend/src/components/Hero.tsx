import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.jpg";
import img14 from "../assets/img14.jpg";

import SearchBar, { SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Hero = () => {
  
    const navigate = useNavigate();
  
    const handleSearchSubmit = (searchFormValues: SearchForm) => {
      navigate({
        pathname: `/search/${searchFormValues.searchQuery}`,
      });
    };
  const images = [
    img1, img2, img3, img4, img5, img6, img7, img8, img9, img10,
    img11, img12, img13, img14,
  ];

  const [startIndex, setStartIndex] = useState(0);

  // Automatically update the start index to create the carousel effect
  useEffect(() => {
    const interval = setInterval(() => {
      setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 1500); // Change images faster every 1.5 seconds
    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [images.length]);

  // Get the visible images (6 at a time)
  const visibleImages = [
    ...images.slice(startIndex, startIndex + 6),
    ...images.slice(0, Math.max(0, startIndex + 6 - images.length)),
  ];

  return (
    <div className="relative overflow-hidden w-full">
      <div className="flex justify-center items-center text-center px-4 mt-7 xl:mt-10">
      <h1 className="text-3xl  md:text-2xl lg:text-3xl font-heading font-bold italic">
      Crave it, click it, enjoy it!<br></br>Delicious food delivered to your doorstep anytime, anywhere
      </h1>
      </div>
      
            <div className="md:px-32 rounded-lg py-8 flex justify-center items-center gap-5 text-center -mt-16 pt-[110px] ">

      <SearchBar
          placeHolder="Search by City or Town"
          onSubmit={handleSearchSubmit}
        />
        </div>
      <div className="grid grid-cols-6 gap-2 p-4 transition-transform duration-100 ease-in-out">
        {visibleImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Image ${index + 1}`}
              className="w-full h-auto object-cover rounded-lg"
              loading="lazy" // Enable lazy loading
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hero;



// import SearchBar, { SearchForm } from "@/components/SearchBar";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";

// const Hero = () => {
//   const navigate = useNavigate();

//   const handleSearchSubmit = (searchFormValues: SearchForm) => {
//     navigate({
//       pathname: `/search/${searchFormValues.searchQuery}`,
//     });
//   };

//   // Replace these URLs with your actual Cloudinary links
//   const images = [
//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546265/aW1nMV9sM2FueDU=/preview",


//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546266/aW1nM19pb3h5aWk=/preview"
//     ,
//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546267/aW1nMl9tdG91bXk=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546268/aW1nNl9zcDFucHM=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546272/aW1nNV9mZ3pzZnk=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546272/aW1nNF9tMWF1cXI=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546272/aW1nMTBfcGt2eXI3/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546272/aW1nOV9ycnp4dHk=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546273/aW1nN196b2hyZnM=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546273/aW1nOF9ieWUyaXQ=/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546274/aW1nMTNfcHJxaWFl/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546276/aW1nMTFfaTQwbWpl/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546275/aW1nMTRfeHVvYXAx/preview",

//     "https://res-console.cloudinary.com/dcleai6at/thumbnails/v1/image/upload/v1744546277/aW1nMTJfYXEyZ2xh/preview",
//   ];

//   const [startIndex, setStartIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
//     }, 1500);
//     return () => clearInterval(interval);
//   }, [images.length]);

//   const visibleImages = [
//     ...images.slice(startIndex, startIndex + 6),
//     ...images.slice(0, Math.max(0, startIndex + 6 - images.length)),
//   ];

//   return (
//     <div className="relative overflow-hidden w-full">
//       <div className="flex justify-center items-center text-center px-4 mt-7 xl:mt-10">
//         <h1 className="text-3xl md:text-2xl lg:text-3xl font-heading font-bold italic">
//           Crave it, click it, enjoy it!
//           <br />
//           Delicious food delivered to your doorstep anytime, anywhere
//         </h1>
//       </div>

//       <div className="md:px-32 rounded-lg py-8 flex justify-center items-center gap-5 text-center -mt-16 pt-[110px] ">
//         <SearchBar
//           placeHolder="Search by City or Town"
//           onSubmit={handleSearchSubmit}
//         />
//       </div>

//       <div className="grid grid-cols-6 gap-2 p-4 transition-transform duration-100 ease-in-out">
//         {visibleImages.map((image, index) => (
//           <div key={index} className="relative">
//             <img
//               src={image}
//               alt={`Image ${index + 1}`}
//               className="w-full h-auto object-cover rounded-lg"
//               loading="lazy"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Hero;
