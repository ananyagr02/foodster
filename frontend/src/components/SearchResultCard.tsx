import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock } from "lucide-react";
import { useEffect } from "react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  useEffect(() => {
    // Dynamically include AOS script
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js";
    script.onload = () => {
      // Initialize AOS globally for the whole page
      // @ts-ignore
      AOS.init({
        once: false, // Ensures animations repeat when elements re-enter the viewport
        offset: 20, // Trigger animation when the element is 100px into the viewport
      });
    };
    document.body.appendChild(script);

    // Dynamically include AOS styles
    const link = document.createElement("link");
    link.href = "https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="flex flex-col items-center group border p-3 rounded-md transition-transform duration-300"
      style={{ maxWidth: "300px", maxHeight: "350px", overflow: "visible" }} // Ensure no clipping
      data-aos="fade-up" // AOS animation type for the entire page
      data-aos-duration="800" // Duration of the animation
      data-aos-delay="100" // Delay before the animation starts
    >
      <div className="group-hover:scale-110 group-hover:-translate-y-3 group-hover:shadow-2xl transition-transform duration-300 transform">
        <AspectRatio ratio={16 / 9} className="w-full">
          <img
            src={restaurant.imageUrl}
            alt={restaurant.restaurantName}
            className="rounded-md w-full h-full object-cover"
          />
        </AspectRatio>

        <div className="mt-2 text-center">
          <h3 className="text-lg font-semibold tracking-tight group-hover:underline">
            {restaurant.restaurantName}
          </h3>
          <div className="mt-1 text-sm text-gray-600">
            <div className="line-clamp-2">
              {restaurant.cuisines.join(", ")}
            </div>
            <div className="flex justify-center gap-2 text-green-600 items-center mt-2">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} mins
            </div>
            <div className="flex justify-center gap-2 items-center mt-2">
              <Banknote />
              Delivery from ₹{(restaurant.deliveryPrice).toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;
