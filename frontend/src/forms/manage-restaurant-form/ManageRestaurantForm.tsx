// import { Form } from "@/components/ui/form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import DetailsSection from "./DetailsSection";
// import { Separator } from "@/components/ui/separator";
// import CuisinesSection from "./CuisinesSection";
// import MenuSection from "./MenuSection";
// import ImageSection from "./ImageSection";
// import LoadingButton from "@/components/LoadingButton";
// import { Button } from "@/components/ui/button";
// import { Restaurant } from "@/types";
// import { useEffect } from "react";

// const formSchema = z
//   .object({
//     restaurantName: z.string({
//       required_error: "restuarant name is required",
//     }),
//     city: z.string({
//       required_error: "city is required",
//     }),
//     country: z.string({
//       required_error: "country is required",
//     }),
//     deliveryPrice: z.coerce.number({
//       required_error: "delivery price is required",
//       invalid_type_error: "must be a valid number",
//     }),
//     estimatedDeliveryTime: z.coerce.number({
//       required_error: "estimated delivery time is required",
//       invalid_type_error: "must be a valid number",
//     }),
//     cuisines: z.array(z.string()).nonempty({
//       message: "please select at least one item",
//     }),
//     // menuItems: z.array(
//     //   z.object({
//     //     name: z.string().min(1, "name is required"),
//     //     price: z.coerce.number().min(1, "price is required"),
//     //   })
//     // ),
//     menuItems: z.array(
//       z
//         .object({
//           name: z.string().min(1, "name is required"),
//           price: z.coerce.number().min(1, "price is required"),
//           imageUrl: z.string().optional(),
//           imageFile: z
//             .instanceof(File, { message: "Image must be a file" })
//             .optional(),
//         })
//         .refine((data) => data.imageUrl || data.imageFile, {
//           message: "Either image URL or image File must be provided",
//           path: ["imageFile"],
//         })
//     ),
//     imageUrl: z.string().optional(),
//     imageFile: z.instanceof(File, { message: "image is required" }).optional(),
//   })
//   .refine((data) => data.imageUrl || data.imageFile, {
//     message: "Either image URL or image File must be provided",
//     path: ["imageFile"],
//   });

// type RestaurantFormData = z.infer<typeof formSchema>;

// type Props = {
//   restaurant?: Restaurant;
//   onSave: (restaurantFormData: FormData) => void;
//   isLoading: boolean;
// };

// const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
//   const form = useForm<RestaurantFormData>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       cuisines: [],
//       menuItems: [{ name: "", price: 0, imageUrl: "", imageFile: undefined }],
//     },
//   });

//   useEffect(() => {
//     if (!restaurant) {
//       return;
//     }

//     // price lowest domination of 100 = 100pence == 1GBP
//     const deliveryPriceFormatted = parseInt(
//       (restaurant.deliveryPrice / 100).toFixed(2)
//     );

//     const menuItemsFormatted = restaurant.menuItems.map((item) => ({
//       ...item,
//       price: parseInt((item.price / 100).toFixed(2)),
//       imageUrl: item.imageUrl || "",
//       imageFile: undefined, // Files can't be preloaded, so keep it undefined
//     }));

//     const updatedRestaurant = {
//       ...restaurant,
//       deliveryPrice: deliveryPriceFormatted,
//       menuItems: menuItemsFormatted,
//     };

//     form.reset(updatedRestaurant);
//   }, [form, restaurant]);

//   const onSubmit = (formDataJson: RestaurantFormData) => {
//     const formData = new FormData();

//     formData.append("restaurantName", formDataJson.restaurantName);
//     formData.append("city", formDataJson.city);
//     formData.append("country", formDataJson.country);

//     formData.append(
//       "deliveryPrice",
//       (formDataJson.deliveryPrice * 100).toString()
//     );
//     formData.append(
//       "estimatedDeliveryTime",
//       formDataJson.estimatedDeliveryTime.toString()
//     );
//     formDataJson.cuisines.forEach((cuisine, index) => {
//       formData.append(`cuisines[${index}]`, cuisine);
//     });
//     formDataJson.menuItems.forEach((menuItem, index) => {
//       formData.append(`menuItems[${index}][name]`, menuItem.name);
//       formData.append(
//         `menuItems[${index}][price]`,
//         (menuItem.price * 100).toString()
//       );
//       if (menuItem.imageUrl) {
//         formData.append(`menuItems[${index}][imageUrl]`, menuItem.imageUrl);
//       }
  
//       if (menuItem.imageFile) {
//         formData.append(`menuItems[${index}][imageFile]`, menuItem.imageFile);
//       }
//     });

//     if (formDataJson.imageFile) {
//       formData.append(`imageFile`, formDataJson.imageFile);
//     }

//     onSave(formData);
//   };

//   return (
//     <Form {...form}>
//       <form
//         onSubmit={form.handleSubmit(onSubmit)}
//         className="space-y-8 bg-cream border-green p-10 rounded-lg"
//       >
//         <DetailsSection />
//         <Separator />
//         <CuisinesSection />
//         <Separator />
//         <MenuSection />
//         <Separator />
//         <ImageSection />
//         {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
//       </form>
//     </Form>
//   );
// };

// export default ManageRestaurantForm;


import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Restaurant } from "@/types";
import { useEffect } from "react";

const formSchema = z
  .object({
    restaurantName: z.string({
      required_error: "restaurant name is required",
    }),
    city: z.string({
      required_error: "city is required",
    }),
    country: z.string({
      required_error: "country is required",
    }),
    deliveryPrice: z.coerce.number({
      required_error: "delivery price is required",
      invalid_type_error: "must be a valid number",
    }),
    estimatedDeliveryTime: z.coerce.number({
      required_error: "estimated delivery time is required",
      invalid_type_error: "must be a valid number",
    }),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
          name: z.string().min(1, "name is required"),
          price: z.coerce.number().min(1, "price is required"),
          menuItemImageUrl: z.string().optional(), // Optional menu item image URL
          menuItemImageFile: z.instanceof(File).optional(), // Menu item image file        })
        
  }),
),
    restaurantImageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.restaurantImageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormData = z.infer<typeof formSchema>;

type Props = {
  restaurant?: Restaurant;
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
  const form = useForm<RestaurantFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0, menuItemImageUrl: "" }],
    },
  });

  useEffect(() => {
    if (!restaurant) {
      return;
    }

    // price lowest domination of 100 = 100pence == 1GBP
    const deliveryPriceFormatted = parseInt(
      (restaurant.deliveryPrice / 100).toFixed(2)
    );

    const menuItemsFormatted = restaurant.menuItems.map((item) => ({
      ...item,
      price: parseInt((item.price / 100).toFixed(2)),
      menuItemImageUrl: item.imageUrl || "",
      menuItemImageFile: undefined, // Files can't be preloaded, so keep it undefined
    }));

    const updatedRestaurant = {
      ...restaurant,
      deliveryPrice: deliveryPriceFormatted,
      menuItems: menuItemsFormatted,
    };

    form.reset(updatedRestaurant);
  }, [form, restaurant]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();
  
    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);
  
    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });

    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
      if (menuItem.menuItemImageUrl) {
        formData.append(`menuItems[${index}][menuItemImageUrl]`, menuItem.menuItemImageUrl);
      }
  
   // Instead of menuItemsImages[], append as menuItemImage_{index}
    if (menuItem.menuItemImageFile) {
    formData.append(`menuItemImage_${index}`, menuItem.menuItemImageFile);
  }
});
  
    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }
  
    onSave(formData);
  };
  
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 bg-cream border-green p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
};

export default ManageRestaurantForm;
