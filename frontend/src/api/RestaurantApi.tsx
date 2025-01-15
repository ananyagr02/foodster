// import { SearchState } from "@/pages/SearchPage";
// import { Restaurant, RestaurantSearchResponse } from "@/types";
// import { useQuery } from "react-query";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


// export const useGetRestaurant = (restaurantId?: string) => {
//   const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/${restaurantId}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchRestaurant",
//     getRestaurantByIdRequest,
//     {
//       enabled: !!restaurantId,
//     }
//   );

//   return { restaurant, isLoading };
// };








// export const useSearchRestaurants = (
//   searchState: SearchState,
//   city?: string
// ) => {
//   const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
//     // Start by creating the base params object
//     const params = new URLSearchParams();
//     params.set("searchQuery", searchState.searchQuery);
//     params.set("page", searchState.page.toString());
//     params.set("sortOption", searchState.sortOption);

//     // Add selected cuisines to the params
//     let allCuisines = [...searchState.selectedCuisines];

//     // Check if vegetarian or non-vegetarian is selected and add to the cuisines list
//     if (searchState.selectedCuisines.includes("Vegetarian")) {
//       allCuisines.push("Vegetarian");
//     }
//     if (searchState.selectedCuisines.includes("Non-Vegetarian")) {
//       allCuisines.push("Non-Vegetarian");
//     }

//     // Add the final cuisine list to the params
//     params.set("selectedCuisines", allCuisines.join(","));

//     const response = await fetch(
//       `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
//     );

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }

//     return response.json();
//   };

//   const { data: results, isLoading } = useQuery(
//     ["searchRestaurants", searchState],
//     createSearchRequest,
//     { enabled: !!city }
//   );

//   return {
//     results,
//     isLoading,
//   };
// };
// RestaurantApi.tsx
import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    ["fetchRestaurant", restaurantId],
    getRestaurantByIdRequest,
    {
      enabled: !!restaurantId,
    }
  );

  return { restaurant, isLoading };
};

export const useSearchRestaurants = (
  searchState: SearchState,
  city?: string
) => {
  const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("sortOption", searchState.sortOption);
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));

    const response = await fetch(
      `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: results, isLoading } = useQuery(
    [
      "searchRestaurants",
      city,
      searchState.searchQuery,
      searchState.page,
      searchState.sortOption,
      searchState.selectedCuisines,
    ],
    createSearchRequest,
    { enabled: !!city }
  );

  return {
    results,
    isLoading,
  };
};
