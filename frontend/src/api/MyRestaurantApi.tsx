// import { Order, Restaurant } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }
//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyRestaurantRequest
//   );

//   return { restaurant, isLoading };
// };

// export const useCreateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createMyRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       throw new Error("Failed to create restaurant");
//     }

//     return response.json();
//   };

//   const {
//     mutate: createRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(createMyRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant created!");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { createRestaurant, isLoading };
// };

// export const useUpdateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const menuItems = restaurantFormData.get("menuItems") as string; // Assuming JSON string of menuItems
//   const parsedMenuItems = JSON.parse(menuItems);

//     parsedMenuItems.forEach((item: any, index: number) => {
//       if (item.imageUrl) {
//         restaurantFormData.append(`menuItems[${index}][imageUrl]`, item.imageUrl);
//       }
//     });
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response) {
//       throw new Error("Failed to update restaurant");
//     }

//     return response.json();
//   };

//   const {
//     mutate: updateRestaurant,
//     isLoading,
//     error,
//     isSuccess,
//   } = useMutation(updateRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant Updated");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { updateRestaurant, isLoading };
// };

// export const useGetMyRestaurantOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyRestaurantOrders",
//     getMyRestaurantOrdersRequest
//   );

//   return { orders, isLoading };
// };

// type UpdateOrderStatusRequest = {
//   orderId: string;
//   status: string;
// };

// export const useUpdateMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateMyRestaurantOrder = async (
//     updateStatusOrderRequest: UpdateOrderStatusRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: updateStatusOrderRequest.status }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update status");
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: updateRestaurantStatus,
//     isLoading,
//     isError,
//     isSuccess,
//     reset,
//   } = useMutation(updateMyRestaurantOrder);

//   if (isSuccess) {
//     toast.success("Order updated");
//   }

//   if (isError) {
//     toast.error("Unable to update order");
//     reset();
//   }

//   return { updateRestaurantStatus, isLoading };
// };




// import { Order, Restaurant } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }
//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyRestaurantRequest
//   );

//   return { restaurant, isLoading };
// };

// export const useCreateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createMyRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to create restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: createRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(createMyRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant created!");
//   }

//   if (error) {
//     toast.error("Unable to create restaurant");
//   }

//   return { createRestaurant, isLoading };
// };

// export const useUpdateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const menuItemsRaw = restaurantFormData.get("menuItems") as string;

//     let parsedMenuItems: any[] = [];
//     if (menuItemsRaw) {
//       try {
//         parsedMenuItems = JSON.parse(menuItemsRaw);
//         if (!Array.isArray(parsedMenuItems)) {
//           throw new Error("menuItems must be a valid array");
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           throw new Error("Invalid menuItems format: " + error.message);
//         } else {
//           throw new Error("Invalid menuItems format: An unknown error occurred");
//         }
//       }
//     }

//     parsedMenuItems.forEach((item, index) => {
//       if (item.imageUrl) {
//         restaurantFormData.append(
//           `menuItems[${index}][imageUrl]`,
//           item.imageUrl
//         );
//       }
//     });

//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: updateRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(updateRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant updated successfully!");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { updateRestaurant, isLoading };
// };

// export const useGetMyRestaurantOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyRestaurantOrders",
//     getMyRestaurantOrdersRequest
//   );

//   return { orders, isLoading };
// };

// type UpdateOrderStatusRequest = {
//   orderId: string;
//   status: string;
// };

// export const useUpdateMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateMyRestaurantOrder = async (
//     updateStatusOrderRequest: UpdateOrderStatusRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: updateStatusOrderRequest.status }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update order status: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: updateRestaurantStatus,
//     isLoading,
//     isError,
//     isSuccess,
//     reset,
//   } = useMutation(updateMyRestaurantOrder);

//   if (isSuccess) {
//     toast.success("Order status updated successfully!");
//   }

//   if (isError) {
//     toast.error("Unable to update order status");
//     reset();
//   }

//   return { updateRestaurantStatus, isLoading };
// };






// import { Order, Restaurant } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }
//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyRestaurantRequest
//   );

//   return { restaurant, isLoading };
// };

// export const useCreateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createMyRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to create restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: createRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(createMyRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant created!");
//   }

//   if (error) {
//     toast.error("Unable to create restaurant");
//   }

//   return { createRestaurant, isLoading };
// };

// export const useUpdateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const menuItemsRaw = restaurantFormData.get("menuItems") as string;

//     let parsedMenuItems: any[] = [];
//     if (menuItemsRaw) {
//       try {
//         parsedMenuItems = JSON.parse(menuItemsRaw);
//         if (!Array.isArray(parsedMenuItems)) {
//           throw new Error("menuItems must be a valid array");
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           throw new Error("Invalid menuItems format: " + error.message);
//         } else {
//           throw new Error("Invalid menuItems format: An unknown error occurred");
//         }
//       }
//     }

//     // Ensure each menu item includes its imageUrl if available
//     parsedMenuItems.forEach((item, index) => {
//       if (item.imageUrl) {
//         restaurantFormData.append(
//           `menuItems[${index}][imageUrl]`,
//           item.imageUrl
//         );
//       }
//     });

//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: updateRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(updateRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant updated successfully!");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { updateRestaurant, isLoading };
// };

// export const useGetMyRestaurantOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyRestaurantOrders",
//     getMyRestaurantOrdersRequest
//   );

//   return { orders, isLoading };
// };

// type UpdateOrderStatusRequest = {
//   orderId: string;
//   status: string;
// };

// export const useUpdateMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateMyRestaurantOrder = async (
//     updateStatusOrderRequest: UpdateOrderStatusRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: updateStatusOrderRequest.status }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update order status: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: updateRestaurantStatus,
//     isLoading,
//     isError,
//     isSuccess,
//     reset,
//   } = useMutation(updateMyRestaurantOrder);

//   if (isSuccess) {
//     toast.success("Order status updated successfully!");
//   }

//   if (isError) {
//     toast.error("Unable to update order status");
//     reset();
//   }

//   return { updateRestaurantStatus, isLoading };
// };







// import { Order, Restaurant } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantRequest = async (): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "GET",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get restaurant");
//     }
//     return response.json();
//   };

//   const { data: restaurant, isLoading } = useQuery(
//     "fetchMyRestaurant",
//     getMyRestaurantRequest
//   );

//   return { restaurant, isLoading };
// };

// export const useCreateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createMyRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to create restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: createRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(createMyRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant created!");
//   }

//   if (error) {
//     toast.error("Unable to create restaurant");
//   }

//   return { createRestaurant, isLoading };
// };

// export const useUpdateMyRestaurant = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateRestaurantRequest = async (
//     restaurantFormData: FormData
//   ): Promise<Restaurant> => {
//     const menuItemsRaw = restaurantFormData.get("menuItems") as string;

//     let parsedMenuItems: any[] = [];
//     if (menuItemsRaw) {
//       try {
//         parsedMenuItems = JSON.parse(menuItemsRaw);
//         if (!Array.isArray(parsedMenuItems)) {
//           throw new Error("menuItems must be a valid array");
//         }
//       } catch (error) {
//         if (error instanceof Error) {
//           throw new Error("Invalid menuItems format: " + error.message);
//         } else {
//           throw new Error("Invalid menuItems format: An unknown error occurred");
//         }
//       }
//     }

//     // Ensure each menu item includes its imageUrl if available
//     parsedMenuItems.forEach((item, index) => {
//       if (item.imageUrl) {
//         restaurantFormData.append(
//           `menuItems[${index}][imageUrl]`,
//           item.imageUrl
//         );
//       }
//       // Append other menu item fields to FormData
//       restaurantFormData.append(
//         `menuItems[${index}][name]`,
//         item.name || ""
//       );
//       restaurantFormData.append(
//         `menuItems[${index}][price]`,
//         item.price || ""
//       );
//     });

//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
//       method: "PUT",
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//       body: restaurantFormData,
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update restaurant: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutate: updateRestaurant,
//     isLoading,
//     isSuccess,
//     error,
//   } = useMutation(updateRestaurantRequest);

//   if (isSuccess) {
//     toast.success("Restaurant updated successfully!");
//   }

//   if (error) {
//     toast.error("Unable to update restaurant");
//   }

//   return { updateRestaurant, isLoading };
// };

// export const useGetMyRestaurantOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyRestaurantOrders",
//     getMyRestaurantOrdersRequest
//   );

//   return { orders, isLoading };
// };

// type UpdateOrderStatusRequest = {
//   orderId: string;
//   status: string;
// };

// export const useUpdateMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const updateMyRestaurantOrder = async (
//     updateStatusOrderRequest: UpdateOrderStatusRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ status: updateStatusOrderRequest.status }),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       throw new Error(`Failed to update order status: ${errorText}`);
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: updateRestaurantStatus,
//     isLoading,
//     isError,
//     isSuccess,
//     reset,
//   } = useMutation(updateMyRestaurantOrder);

//   if (isSuccess) {
//     toast.success("Order status updated successfully!");
//   }

//   if (isError) {
//     toast.error("Unable to update order status");
//     reset();
//   }

//   return { updateRestaurantStatus, isLoading };
// };



import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// **Hook to fetch the restaurant details**
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }
    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getMyRestaurantRequest
  );

  return { restaurant, isLoading };
};

// **Hook to create a new restaurant**
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create restaurant: ${errorText}`);
    }

    return response.json();
  };

  const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createMyRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isLoading };
};

// **Hook to update an existing restaurant**
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
    const menuItemsRaw = restaurantFormData.get("menuItems") as string;

    let parsedMenuItems: any[] = [];
    if (menuItemsRaw) {
      try {
        parsedMenuItems = JSON.parse(menuItemsRaw);
        if (!Array.isArray(parsedMenuItems)) {
          throw new Error("menuItems must be a valid array");
        }
      } catch (error) {
        throw new Error("Invalid menuItems format: " + (error instanceof Error ? error.message : "Unknown error"));
      }
    }

    // Ensure each menu item includes its imageUrl if available
    parsedMenuItems.forEach((item, index) => {
      restaurantFormData.append(`menuItems[${index}][name]`, item.name || "");
      restaurantFormData.append(`menuItems[${index}][price]`, item.price || "");
      if (item.menuItemImageUrl) {
        restaurantFormData.append(`menuItems[${index}][menuItemImageUrl]`, item.menuItemImageUrl); // Append imageUrl for menu item
      }      
    });

    // Log the entire FormData contents
console.log("FormData being sent to the backend:");
for (let [key, value] of restaurantFormData.entries()) {
  if (value instanceof File) {
    console.log(key, "File: ", value.name, "Size: ", value.size, "Type: ", value.type);
  } else {
    console.log(key, value);
  }
}



    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update restaurant: ${errorText}`);
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest);

  if (isSuccess) {
    toast.success("Restaurant updated successfully!");
  }

  if (error) {
    toast.error("Unable to update restaurant");
  }

  return { updateRestaurant, isLoading };
};

// **Hook to fetch restaurant orders**
export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/order`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }

    return response.json();
  };

  const { data: orders, isLoading } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);

  return { orders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

// **Hook to update the status of an order**
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyRestaurantOrder = async (updateStatusOrderRequest: UpdateOrderStatusRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update order status: ${errorText}`);
    }

    return response.json();
  };

  const {
    mutateAsync: updateRestaurantStatus,
    isLoading,
    isError,
    isSuccess,
    reset,
  } = useMutation(updateMyRestaurantOrder);

  if (isSuccess) {
    toast.success("Order status updated successfully!");
  }

  if (isError) {
    toast.error("Unable to update order status");
    reset();
  }

  return { updateRestaurantStatus, isLoading };
};
