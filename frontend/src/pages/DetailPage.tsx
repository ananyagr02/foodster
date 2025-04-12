// import { useGetRestaurant } from "@/api/RestaurantApi";
// import MenuItem from "@/components/MenuItem";
// import OrderSummary from "@/components/OrderSummary";
// import RestaurantInfo from "@/components/RestaurantInfo";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Card, CardFooter } from "@/components/ui/card";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { MenuItems as MenuItemType } from "../types";
// import CheckoutButton from "@/components/CheckoutButton";
// import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
// import { useCreateCheckoutSession } from "@/api/OrderApi";

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const DetailPage = () => {
//   const { restaurantId } = useParams();
//   const { restaurant, isLoading } = useGetRestaurant(restaurantId);
//   const { createCheckoutSession, isLoading: isCheckoutLoading } =
//     useCreateCheckoutSession();

//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const addToCart = (menuItem: MenuItemType) => {
//     setCartItems((prevCartItems) => {
//       const existingCartItem = prevCartItems.find(
//         (cartItem) => cartItem._id === menuItem._id
//       );

//       let updatedCartItems;

//       if (existingCartItem) {
//         updatedCartItems = prevCartItems.map((cartItem) =>
//           cartItem._id === menuItem._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         updatedCartItems = [
//           ...prevCartItems,
//           {
//             _id: menuItem._id,
//             name: menuItem.name,
//             price: menuItem.price,
//             quantity: 1,
//           },
//         ];
//       }

//       sessionStorage.setItem(
//         `cartItems-${restaurantId}`,
//         JSON.stringify(updatedCartItems)
//       );

//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (cartItem: CartItem) => {
//     setCartItems((prevCartItems) => {
//       const updatedCartItems = prevCartItems.filter(
//         (item) => cartItem._id !== item._id
//       );

//       sessionStorage.setItem(
//         `cartItems-${restaurantId}`,
//         JSON.stringify(updatedCartItems)
//       );

//       return updatedCartItems;
//     });
//   };

//   const onCheckout = async (userFormData: UserFormData) => {
//     if (!restaurant) {
//       return;
//     }

//     const checkoutData = {
//       cartItems: cartItems.map((cartItem) => ({
//         menuItemId: cartItem._id,
//         name: cartItem.name,
//         quantity: cartItem.quantity.toString(),
//       })),
//       restaurantId: restaurant._id,
//       deliveryDetails: {
//         name: userFormData.name,
//         addressLine1: userFormData.addressLine1,
//         city: userFormData.city,
//         country: userFormData.country,
//         email: userFormData.email as string,
//       },
//     };

//     const data = await createCheckoutSession(checkoutData);
//     window.location.href = data.url;
//   };

//   if (isLoading || !restaurant) {
//     return "Loading...";
//   }

//   return (
//     <div className="flex flex-col gap-10">
//       <div className="w-full aspect-[16/5] overflow-hidden rounded-md bg-gray-100">
//   <img
//     src={restaurant.imageUrl}
//     alt="Restaurant"
//     className="h-full w-full object-cover rounded-md"
//   />
// </div>

//       <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
//         <div className="flex flex-col gap-4">
//           <RestaurantInfo restaurant={restaurant} />
//           <span className="text-2xl font-bold tracking-tight">Menu</span>
//           {restaurant.menuItems.map((menuItem) => (
//             <MenuItem
//               menuItem={menuItem}
//               addToCart={() => addToCart(menuItem)}
//             />
//           ))}
//         </div>

//         <div>
//           <Card>
//             <OrderSummary
//               restaurant={restaurant}
//               cartItems={cartItems}
//               removeFromCart={removeFromCart}
//             />
//             <CardFooter>
//               <CheckoutButton
//                 disabled={cartItems.length === 0}
//                 onCheckout={onCheckout}
//                 isLoading={isCheckoutLoading}
//               />
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;



// import { useGetRestaurant } from "@/api/RestaurantApi";
// import MenuItem from "@/components/MenuItem";
// import OrderSummary from "@/components/OrderSummary";
// import RestaurantInfo from "@/components/RestaurantInfo";
// import { Card, CardFooter } from "@/components/ui/card";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { MenuItems as MenuItemType } from "../types";
// import CheckoutButton from "@/components/CheckoutButton";
// import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
// import { useCreateCheckoutSession } from "@/api/OrderApi";

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const DetailPage = () => {
//   const { restaurantId } = useParams();
//   const { restaurant, isLoading } = useGetRestaurant(restaurantId);
//   const { createCheckoutSession, isLoading: isCheckoutLoading } =
//     useCreateCheckoutSession();

//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const addToCart = (menuItem: MenuItemType) => {
//     setCartItems((prevCartItems) => {
//       const existingCartItem = prevCartItems.find(
//         (cartItem) => cartItem._id === menuItem._id
//       );

//       let updatedCartItems;

//       if (existingCartItem) {
//         updatedCartItems = prevCartItems.map((cartItem) =>
//           cartItem._id === menuItem._id
//             ? { ...cartItem, quantity: cartItem.quantity + 1 }
//             : cartItem
//         );
//       } else {
//         updatedCartItems = [
//           ...prevCartItems,
//           {
//             _id: menuItem._id,
//             name: menuItem.name,
//             price: menuItem.price,
//             quantity: 1,
//           },
//         ];
//       }

//       sessionStorage.setItem(
//         `cartItems-${restaurantId}`,
//         JSON.stringify(updatedCartItems)
//       );

//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (cartItem: CartItem) => {
//     setCartItems((prevCartItems) => {
//       const updatedCartItems = prevCartItems.filter(
//         (item) => cartItem._id !== item._id
//       );

//       sessionStorage.setItem(
//         `cartItems-${restaurantId}`,
//         JSON.stringify(updatedCartItems)
//       );

//       return updatedCartItems;
//     });
//   };

//   const onCheckout = async (userFormData: UserFormData) => {
//     if (!restaurant) {
//       return;
//     }

//     const checkoutData = {
//       cartItems: cartItems.map((cartItem) => ({
//         menuItemId: cartItem._id,
//         name: cartItem.name,
//         quantity: cartItem.quantity.toString(),
//       })),
//       restaurantId: restaurant._id,
//       deliveryDetails: {
//         name: userFormData.name,
//         addressLine1: userFormData.addressLine1,
//         city: userFormData.city,
//         country: userFormData.country,
//         email: userFormData.email as string,
//       },
//     };

//     const data = await createCheckoutSession(checkoutData);
//     window.location.href = data.url;
//   };

//   if (isLoading || !restaurant) {
//     return "Loading...";
//   }

//   return (
//     <div className="flex flex-col gap-10">
//       {/* ✅ Full-width image aligned with content */}
//       <div className="w-full bg-cream">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//         <div className="w-full h-[300px] overflow-hidden rounded-md">
//   <img
//     src={restaurant.imageUrl}
//     alt="Restaurant"
//     className="w-full h-full object-cover"
//   />
// </div>



//         </div>
//       </div>

//       {/* ✅ Main content under the same container */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-[3fr_1.5fr] gap-8 ">
//         <div className="flex flex-col gap-4 ">
//           <RestaurantInfo  restaurant={restaurant} />
//           <span className="text-2xl font-bold tracking-tight">Menu</span>
//           {restaurant.menuItems.map((menuItem) => (
//             <MenuItem
//               key={menuItem._id}
//               menuItem={menuItem}
//               addToCart={() => addToCart(menuItem)}
//             />
//           ))}
//         </div>

//         <div className="sticky top-28 self-start">
//           <Card className="shadow-md">
//             <OrderSummary
//               restaurant={restaurant}
//               cartItems={cartItems}
//               removeFromCart={removeFromCart}
//             />
//             <CardFooter>
//               <CheckoutButton
//                 disabled={cartItems.length === 0}
//                 onCheckout={onCheckout}
//                 isLoading={isCheckoutLoading}
//               />
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;

















// import { useGetRestaurant } from "@/api/RestaurantApi";
// import MenuItem from "@/components/MenuItem";
// import OrderSummary from "@/components/OrderSummary";
// import RestaurantInfo from "@/components/RestaurantInfo";
// import { Card, CardFooter } from "@/components/ui/card";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { MenuItems as MenuItemType } from "../types";
// import CheckoutButton from "@/components/CheckoutButton";
// import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
// import { useCreateCheckoutSession } from "@/api/OrderApi";

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const DetailPage = () => {
//   const { restaurantId } = useParams();
//   const { restaurant, isLoading } = useGetRestaurant(restaurantId);
//   const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const addToCart = (menuItem: MenuItemType) => {
//     setCartItems((prevCartItems) => {
//       const existingItem = prevCartItems.find(item => item._id === menuItem._id);

//       const updatedCartItems = existingItem
//         ? prevCartItems.map(item =>
//             item._id === menuItem._id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [
//             ...prevCartItems,
//             {
//               _id: menuItem._id,
//               name: menuItem.name,
//               price: menuItem.price,
//               quantity: 1,
//             },
//           ];

//       sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (cartItem: CartItem) => {
//     const updatedCartItems = cartItems.filter(item => item._id !== cartItem._id);
//     setCartItems(updatedCartItems);
//     sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
//   };

//   const onCheckout = async (userFormData: UserFormData) => {
//     if (!restaurant) return;

//     await createCheckoutSession({
//       cartItems: cartItems.map(item => ({
//         menuItemId: item._id,
//         name: item.name,
//         quantity: item.quantity.toString(),
//       })),
//       restaurantId: restaurant._id,
//       deliveryDetails: {
//         name: userFormData.name,
//         addressLine1: userFormData.addressLine1,
//         city: userFormData.city,
//         email: userFormData.email as string,
//       },
//     });
//   };

//   if (isLoading || !restaurant) return "Loading...";

//   return (
//     <div className="flex flex-col gap-10">
//       {/* Banner Image */}
//       <div className="w-full bg-cream">
//         <div className="max-w-7xl mx-auto px-4 md:px-8">
//           <div className="w-full h-[300px] overflow-hidden rounded-md">
//             <img
//               src={restaurant.imageUrl}
//               alt="Restaurant"
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-[3fr_1.5fr] gap-8">
//         {/* Left Side */}
//         <div className="flex flex-col gap-4">
//           <RestaurantInfo restaurant={restaurant} />
//           <span className="text-2xl font-bold tracking-tight">Menu</span>
//           {restaurant.menuItems.map(menuItem => (
//             <MenuItem
//               key={menuItem._id}
//               menuItem={menuItem}
//               addToCart={() => addToCart(menuItem)}
//             />
//           ))}
//         </div>

//         {/* Right Side (Cart + Checkout) */}
//         <div className="sticky top-28 self-start">
//           <Card className="shadow-md">
//             <OrderSummary
//               restaurant={restaurant}
//               cartItems={cartItems}
//               removeFromCart={removeFromCart}
//             />
//             <CardFooter>
//               <CheckoutButton
//                  disabled={cartItems.length === 0}
//                  onCheckout={onCheckout}
//                  isLoading={isCheckoutLoading}
//                  restaurantId={restaurant._id} // ✅ Fix here
//               />
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;















// import { useGetRestaurant } from "@/api/RestaurantApi";
// import MenuItem from "@/components/MenuItem";
// import OrderSummary from "@/components/OrderSummary";
// import RestaurantInfo from "@/components/RestaurantInfo";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Card, CardFooter } from "@/components/ui/card";
// import { useState } from "react";
// import { useParams } from "react-router-dom";
// import { MenuItems as MenuItemType } from "../types";
// import CheckoutButton from "@/components/CheckoutButton";
// import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
// import { useCreateCheckoutSession } from "@/api/OrderApi";

// export type CartItem = {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// };

// const DetailPage = () => {
//   const { restaurantId } = useParams();
//   const { restaurant, isLoading } = useGetRestaurant(restaurantId);
//   const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();

//   const [cartItems, setCartItems] = useState<CartItem[]>(() => {
//     const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
//     return storedCartItems ? JSON.parse(storedCartItems) : [];
//   });

//   const addToCart = (menuItem: MenuItemType) => {
//     setCartItems((prevCartItems) => {
//       const existingItem = prevCartItems.find(item => item._id === menuItem._id);
//       const updatedCartItems = existingItem
//         ? prevCartItems.map(item =>
//             item._id === menuItem._id
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [
//             ...prevCartItems,
//             {
//               _id: menuItem._id,
//               name: menuItem.name,
//               price: menuItem.price,
//               quantity: 1,
//             },
//           ];

//       sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
//       return updatedCartItems;
//     });
//   };

//   const removeFromCart = (cartItem: CartItem) => {
//     const updatedCartItems = cartItems.filter(item => item._id !== cartItem._id);
//     setCartItems(updatedCartItems);
//     sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
//   };

//   const onCheckout = async (userFormData: UserFormData) => {
//     if (!restaurant) return;

//     await createCheckoutSession({
//       cartItems: cartItems.map(item => ({
//         menuItemId: item._id,
//         name: item.name,
//         quantity: Number(item.quantity),
//         price: item.price
//       })),
//       restaurantId: restaurant._id,
//       deliveryDetails: {
//         name: userFormData.name,
//         addressLine1: userFormData.addressLine1,
//         city: userFormData.city,
//         email: userFormData.email as string,
//       },
//     });
//   };

//   if (isLoading || !restaurant) return "Loading...";

//   return (
//     <div className="flex flex-col gap-10">
//       <AspectRatio ratio={16 / 5}>
//         <img
//           src={restaurant.imageUrl}
//           className="rounded-md object-cover h-full w-full"
//           alt="Restaurant"
//         />
//       </AspectRatio>
//       <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
//         <div className="flex flex-col gap-4">
//           <RestaurantInfo restaurant={restaurant} />
//           <span className="text-2xl font-bold tracking-tight">Menu</span>
//           {restaurant.menuItems.map((menuItem) => (
//             <MenuItem key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
//           ))}
//         </div>
//         <div className="sticky top-28 self-start">
//           <Card className="shadow-md">
//             <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
//             <CardFooter>
//               <CheckoutButton
//                 disabled={cartItems.length === 0}
//                 onCheckout={onCheckout}
//                 isLoading={isCheckoutLoading}
//                 restaurantId={restaurant._id}
//               />
//             </CardFooter>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailPage;


import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItems as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);
  const { createCheckoutSession, isLoading: isCheckoutLoading } = useCreateCheckoutSession();
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find(item => item._id === menuItem._id);
      const updatedCartItems = existingItem
        ? prevCartItems.map(item =>
            item._id === menuItem._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prevCartItems,
            {
              _id: menuItem._id,
              name: menuItem.name,
              price: menuItem.price,
              quantity: 1,
            },
          ];

      sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeFromCart = (cartItem: CartItem) => {
    const updatedCartItems = cartItems.filter(item => item._id !== cartItem._id);
    setCartItems(updatedCartItems);
    sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems));
  };

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) return;

    await createCheckoutSession({
      cartItems: cartItems.map(item => ({
        menuItemId: item._id,
        name: item.name,
        quantity: Number(item.quantity),
        price: item.price
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        email: userFormData.email as string,
      },
      onSuccessNavigate: () => navigate("/order-status?success=true"),
    });
  };

  if (isLoading || !restaurant) return "Loading...";

  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md object-cover h-full w-full"
          alt="Restaurant"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={restaurant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {restaurant.menuItems.map((menuItem) => (
            <MenuItem key={menuItem._id} menuItem={menuItem} addToCart={() => addToCart(menuItem)} />
          ))}
        </div>
        <div className="sticky top-28 self-start">
          <Card className="shadow-md">
            <OrderSummary restaurant={restaurant} cartItems={cartItems} removeFromCart={removeFromCart} />
            <CardFooter>
              <CheckoutButton
                disabled={cartItems.length === 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
                restaurantId={restaurant._id}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
