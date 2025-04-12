// import { Order } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(`${API_BASE_URL}/api/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       throw new Error("Failed to get orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyOrders",
//     getMyOrdersRequest,
//     {
//       refetchInterval: 5000,
//     }
//   );

//   return { orders, isLoading };
// };

// type CheckoutSessionRequest = {
//   cartItems: {
//     menuItemId: string;
//     name: string;
//     quantity: string;
//   }[];
//   deliveryDetails: {
//     email: string;
//     name: string;
//     addressLine1: string;
//     city: string;
//   };
//   restaurantId: string;
// };

// export const useCreateCheckoutSession = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createCheckoutSessionRequest = async (
//     checkoutSessionRequest: CheckoutSessionRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkoutSessionRequest),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Unable to create checkout session");
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: createCheckoutSession,
//     isLoading,
//     error,
//     reset,
//   } = useMutation(createCheckoutSessionRequest);

//   if (error) {
//     toast.error(error.toString());
//     reset();
//   }

//   return {
//     createCheckoutSession,
//     isLoading,
//   };
// };



















// import { Order } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// // Fetch User Orders
// export const useGetMyOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Fetching orders with token:", accessToken);

//     const response = await fetch(`${API_BASE_URL}/api/order`, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     if (!response.ok) {
//       console.error("Failed to fetch orders:", response.statusText);
//       throw new Error("Failed to fetch orders");
//     }

//     const data = await response.json();
//     console.log("Fetched orders:", data);
//     return data;
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyOrders",
//     getMyOrdersRequest,
//     {
//       refetchInterval: 5000, // Refresh orders every 5 seconds
//     }
//   );

//   return { orders, isLoading };
// };

// // Create Checkout Session
// type CheckoutSessionRequest = {
//   cartItems: {
//     menuItemId: string;
//     name: string;
//     quantity: string;
//   }[];
//   deliveryDetails: {
//     email: string;
//     name: string;
//     addressLine1: string;
//     city: string;
//   };
//   restaurantId: string;
// };

// export const useCreateCheckoutSession = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createCheckoutSessionRequest = async (
//     checkoutSessionRequest: CheckoutSessionRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Creating checkout session with payload:", checkoutSessionRequest);
//     console.log("Using token:", accessToken);

//     const response = await fetch(
//       `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkoutSessionRequest),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Checkout session creation failed:", errorText);
//       throw new Error("Failed to create checkout session");
//     }

//     const data = await response.json();
//     console.log("Checkout session response:", data);
//     return data;
//   };

//   const {
//     mutateAsync: createCheckoutSession,
//     isLoading,
//   } = useMutation(createCheckoutSessionRequest, {
//     onSuccess: (data) => {
//       if (data?.url) {
//         console.log("Redirecting to checkout URL:", data.url);
//         window.location.href = data.url;
//       } else {
//         console.warn("No checkout URL received:", data);
//         toast.error("Failed to create Razorpay checkout session");
//       }
//     },
//     onError: (error: any) => {
//       console.error("Error creating checkout session:", error);
//       toast.error(error.message || "Something went wrong");
//     },
//   });

//   return {
//     createCheckoutSession,
//     isLoading,
//   };
// };













// import { Order } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Fetching orders with token:", accessToken);

//     const response = await fetch(`${API_BASE_URL}/api/order`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if (!response.ok) {
//       console.error("Failed to fetch orders:", response.statusText);
//       throw new Error("Failed to fetch orders");
//     }

//     const data = await response.json();
//     console.log("Fetched orders:", data);
//     return data;
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyOrders",
//     getMyOrdersRequest,
//     { refetchInterval: 5000 }
//   );

//   return { orders, isLoading };
// };

// type CheckoutSessionRequest = {
//   cartItems: {
//     menuItemId: string;
//     name: string;
//     quantity: number;
//     price: number;
//   }[];
//   deliveryDetails: {
//     email: string;
//     name: string;
//     addressLine1: string;
//     city: string;
//   };
//   restaurantId: string;
// };

// export const useCreateCheckoutSession = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createCheckoutSessionRequest = async (
//     checkoutSessionRequest: CheckoutSessionRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Creating checkout session with payload:", checkoutSessionRequest);
//     console.log("📦 Sending cartItems to backend:", checkoutSessionRequest.cartItems);

//     console.log("Using token:", accessToken);

//     const response = await fetch(
//       `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkoutSessionRequest),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Checkout session creation failed:", errorText);
//       throw new Error("Failed to create checkout session");
//     }

//     const data = await response.json();
//     console.log("Checkout session response:", data);
//     return data;
//   };

//   const { mutateAsync: createCheckoutSession, isLoading } = useMutation(
//     createCheckoutSessionRequest,
//     {
//       onSuccess: (data) => {
//         // Instead of redirecting the browser using window.location.href,
//         // configure the Razorpay checkout modal options and open the popup.
//         const options = {
//           key: razorpayKey , // Public Razorpay key from backend
//           amount: data.amount,    // in paise
//           currency: data.currency,
//           name: "Foodster",
//           description: "Order Payment",
//           order_id: data.order_id,
//           handler: function (response: any) {
//             // Optionally: handle success; you can verify payment on the server
//             toast.success("Payment Successful!");
//             console.log("Payment response:", response);
//             // You may redirect to an order confirmation page:
//             window.location.href = `/order-status?success=true`;
//           },
//           prefill: {
//             // These values can be filled dynamically from the user profile data
//             name: "",
//             email: "",
//           },
//           theme: {
//             color: "#f97316",
//           },
//         };

//         // Create a Razorpay instance and open the checkout modal
//         const razorpay = new (window as any).Razorpay(options);
//         razorpay.open();
//       },
//       onError: (error: any) => {
//         console.error("Error creating checkout session:", error);
//         toast.error(error.message || "Something went wrong");
//       },
//     }
//   );

//   return {
//     createCheckoutSession,
//     isLoading,
//   };
// };



// import { Order } from "@/types";
// import { useAuth0 } from "@auth0/auth0-react";
// import { useMutation, useQuery } from "react-query";
// import { toast } from "sonner";
// const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// export const useGetMyOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Fetching orders with token:", accessToken);

//     const response = await fetch(`${API_BASE_URL}/api/order`, {
//       headers: { Authorization: `Bearer ${accessToken}` },
//     });

//     if (!response.ok) {
//       console.error("Failed to fetch orders:", response.statusText);
//       throw new Error("Failed to fetch orders");
//     }

//     const data = await response.json();
//     console.log("Fetched orders:", data);
//     return data;
//   };

//   const { data: orders, isLoading } = useQuery(
//     "fetchMyOrders",
//     getMyOrdersRequest,
//     { refetchInterval: 5000 }
//   );

//   return { orders, isLoading };
// };

// type CheckoutSessionRequest = {
//   cartItems: {
//     menuItemId: string;
//     name: string;
//     quantity: number;
//     price: number;
//   }[];
//   deliveryDetails: {
//     email: string;
//     name: string;
//     addressLine1: string;
//     city: string;
//   };
//   restaurantId: string;
//   totalAmount: number; // ✅ Added this field
// };

// export const useCreateCheckoutSession = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const createCheckoutSessionRequest = async (
//     checkoutSessionRequest: CheckoutSessionRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();
//     console.log("Creating checkout session with payload:", checkoutSessionRequest);
//     console.log("📦 Sending cartItems to backend:", checkoutSessionRequest.cartItems);

//     const response = await fetch(
//       `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(checkoutSessionRequest),
//       }
//     );

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error("Checkout session creation failed:", errorText);
//       throw new Error("Failed to create checkout session");
//     }

//     const data = await response.json();
//     console.log("Checkout session response:", data);
//     return data;
//   };

//   const { mutateAsync: createCheckoutSession, isLoading } = useMutation(
//     async ({
//       cartItems,
//       deliveryDetails,
//       restaurantId,
//     }: Omit<CheckoutSessionRequest, "totalAmount">) => {
//       // ✅ Calculate totalAmount dynamically
//       const totalAmount = cartItems.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//       );

//       return await createCheckoutSessionRequest({
//         cartItems,
//         deliveryDetails,
//         restaurantId,
//         totalAmount,
//       });
//     },
//     {
//       onSuccess: (data) => {
//         const options = {
//           key: razorpayKey,
//           amount: data.amount, // in paise
//           currency: data.currency,
//           name: "Foodster",
//           description: "Order Payment",
//           order_id: data.order_id,
//           handler: function (response: any) {
//             toast.success("Payment Successful!");
//             console.log("Payment response:", response);
//             window.location.href = `/order-status?success=true`;
//           },
//           prefill: {
//             name: "",
//             email: "",
//           },
//           theme: {
//             color: "#f97316",
//           },
//         };

//         const razorpay = new (window as any).Razorpay(options);
//         razorpay.open();
//       },
//       onError: (error: any) => {
//         console.error("Error creating checkout session:", error);
//         toast.error(error.message || "Something went wrong");
//       },
//     }
//   );

//   return {
//     createCheckoutSession,
//     isLoading,
//   };
// };


import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyOrders = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    console.log("Fetching orders with token:", accessToken);

    const response = await fetch(`${API_BASE_URL}/api/order`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      console.error("Failed to fetch orders:", response.statusText);
      throw new Error("Failed to fetch orders");
    }

    const data = await response.json();
    console.log("Fetched orders:", data);
    return data;
  };

  const { data: orders, isLoading } = useQuery(
    "fetchMyOrders",
    getMyOrdersRequest,
    { refetchInterval: 5000 }
  );

  return { orders, isLoading };
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
  totalAmount: number;
};

export const useCreateCheckoutSession = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createCheckoutSessionRequest = async (
    checkoutSessionRequest: CheckoutSessionRequest
  ) => {
    const accessToken = await getAccessTokenSilently();
    console.log("Creating checkout session with payload:", checkoutSessionRequest);
    console.log("📦 Sending cartItems to backend:", checkoutSessionRequest.cartItems);

    const response = await fetch(
      `${API_BASE_URL}/api/order/checkout/create-checkout-session`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkoutSessionRequest),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Checkout session creation failed:", errorText);
      throw new Error("Failed to create checkout session");
    }

    const data = await response.json();
    console.log("Checkout session response:", data);
    return data;
  };

  const { mutateAsync: createCheckoutSession, isLoading } = useMutation(
    async ({
      cartItems,
      deliveryDetails,
      restaurantId,
      onSuccessNavigate,
    }: Omit<CheckoutSessionRequest, "totalAmount"> & {
      onSuccessNavigate?: () => void;
    }) => {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      const data = await createCheckoutSessionRequest({
        cartItems,
        deliveryDetails,
        restaurantId,
        totalAmount,
      });

      const options = {
        key: razorpayKey,
        amount: data.amount,
        currency: data.currency,
        name: "Foodster",
        description: "Order Payment",
        order_id: data.order_id,
        handler: function (response: any) {
          toast.success("Payment Successful!");
          console.log("Payment response:", response);
          if (onSuccessNavigate) {
            onSuccessNavigate();
          }
        },
        prefill: {
          name: "",
          email: "",
        },
        theme: {
          color: "#f97316",
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();

      return data;
    },
    {
      onError: (error: any) => {
        console.error("Error creating checkout session:", error);
        toast.error(error.message || "Something went wrong");
      },
    }
  );

  return {
    createCheckoutSession,
    isLoading,
  };
};
