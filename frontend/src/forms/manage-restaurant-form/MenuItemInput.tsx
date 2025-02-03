// import { Button } from "@/components/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useFormContext } from "react-hook-form";

// type Props = {
//   index: number;
//   removeMenuItem: () => void;
// };

// const MenuItemInput = ({ index, removeMenuItem }: Props) => {
//   const { control } = useFormContext();

//   return (
//     <div className="flex flex-row items-end gap-2">
//       <FormField
//         control={control}
//         name={`menuItems.${index}.name`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className="flex items-center gap-1">
//               Name <FormMessage />
//             </FormLabel>
//             <FormControl>
//               <Input
//                 {...field}
//                 placeholder="Cheese Pizza"
//                 className="bg-cream border-green"
//               />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`menuItems.${index}.price`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className="flex items-center gap-1">
//               Price (₹) <FormMessage />
//             </FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="8.00"   
//               className="bg-cream border-green"
//  />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <Button
//         type="button"
//         onClick={removeMenuItem}
//         className="bg-orange text-white hover:bg-orange hover:scale-105 transition-transform max-h-fit"
//       >
//         Remove
//       </Button>
//     </div>
//   );
// };

// export default MenuItemInput;









// import { Button } from "@/components/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useFormContext } from "react-hook-form";
// import { useState } from "react";

// type Props = {
//   index: number;
//   removeMenuItem: () => void;
// };

// const MenuItemInput = ({ index, removeMenuItem }: Props) => {
//   const { control, setValue, watch } = useFormContext();
//   const [preview, setPreview] = useState<string | null>(null);

//   // Watch for changes in the image file field
//   const imageFile = watch(`menuItems.${index}.imageFile`);

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         alert("Please upload a valid image file.");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert("Image size must be less than 5MB.");
//         return;
//       }
//       setPreview(URL.createObjectURL(file)); // Generate a preview URL
//       setValue(`menuItems.${index}.imageFile`, file); // Update react-hook-form's value
//     }
//   };

//   const handleRemoveImage = () => {
//     setPreview(null);
//     setValue(`menuItems.${index}.imageFile`, null);
//   };

//   return (
//     <div className="flex flex-col gap-4 border p-4 rounded-md">
//       {/* Name Field */}
//       <FormField
//         control={control}
//         name={`menuItems.${index}.name`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor={`menuItem-name-${index}`}>Name</FormLabel>
//             <FormControl>
//               <Input
//                 {...field}
//                 id={`menuItem-name-${index}`}
//                 placeholder="Cheese Pizza"
//                 aria-label={`Menu item name for item ${index + 1}`}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Price Field */}
//       <FormField
//         control={control}
//         name={`menuItems.${index}.price`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel htmlFor={`menuItem-price-${index}`}>Price (₹)</FormLabel>
//             <FormControl>
//               <Input
//                 {...field}
//                 id={`menuItem-price-${index}`}
//                 type="number"
//                 placeholder="8.00"
//                 aria-label={`Menu item price for item ${index + 1}`}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />

//       {/* Image Upload Field */}
//       <FormField
//         control={control}
//         name={`menuItems.${index}.imageFile`}
//         render={() => (
//           <FormItem>
//             <FormLabel htmlFor={`menuItem-image-${index}`}>Upload Image</FormLabel>
//             <FormControl>
//               <Input
//                 id={`menuItem-image-${index}`}
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 aria-label={`Upload image for menu item ${index + 1}`}
//               />
//             </FormControl>
//             <FormMessage />
//           </FormItem>
//         )}
//       />
//       {preview && (
//         <div className="mt-2">
//           <img
//             src={preview}
//             alt={`Preview of menu item ${index + 1}`}
//             className="max-w-full h-auto rounded-md border"
//           />
//           <Button
//             type="button"
//             onClick={handleRemoveImage}
//             className="mt-2 bg-red-500 text-white"
//           >
//             Remove Image
//           </Button>
//         </div>
//       )}

//       {/* Remove Menu Item Button */}
//       <Button
//         type="button"
//         onClick={removeMenuItem}
//         className="bg-red-500 text-white"
//         aria-label={`Remove menu item ${index + 1}`}
//       >
//         Remove Menu Item
//       </Button>
//     </div>
//   );
// };

// export default MenuItemInput;


import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";
import { useState,useEffect } from "react";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control, setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(null);

  // Watch image field for changes
  const menuItemImageFile = watch(`menuItems.${index}.menuItemImageFile`);
  const menuItemImageUrl = watch(`menuItems.${index}.menuItemImageUrl`);

  // Load existing image preview (if any)
  useEffect(() => {
    if (menuItemImageUrl) {
      setPreview(menuItemImageUrl);
    }
  }, [menuItemImageUrl]);
  // Handle image change and validations
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        alert("Please upload a valid image file.");
        event.target.value = ""; // Clear input if invalid file
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size must be less than 5MB.");
        event.target.value = ""; // Clear input if file too large
        return;
      }

      // Set preview and form value
      setPreview(URL.createObjectURL(file));
      setValue(`menuItems.${index}.menuItemImageFile`, file);
    }
  };

  // Remove image preview and reset form value
  const handleRemoveImage = () => {
    setPreview(null);
    setValue(`menuItems.${index}.menuItemImageFile`, null);
  };

  return (
    <div className="flex flex-col gap-4 border p-4 rounded-md">
      {/* Menu Item Name Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={`menuItem-name-${index}`}>Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`menuItem-name-${index}`}
                placeholder="Cheese Pizza"
                aria-label={`Menu item name for item ${index + 1}`}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Menu Item Price Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        render={({ field }) => (
          <FormItem>
            <FormLabel htmlFor={`menuItem-price-${index}`}>Price (₹)</FormLabel>
            <FormControl>
              <Input
                {...field}
                id={`menuItem-price-${index}`}
                type="number"
                placeholder="8.00"
                aria-label={`Menu item price for item ${index + 1}`}
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Menu Item Image Upload Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.menuItemImageFile`}
        render={() => (
          <FormItem>
            <FormLabel htmlFor={`menuItem-image-${index}`}>Upload Image</FormLabel>
            <FormControl>
              <Input
                id={`menuItem-image-${index}`}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                aria-label={`Upload image for menu item ${index + 1}`}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Image Preview */}
      {preview && (
        <div className="mt-2">
          <img
            src={preview}
            alt={`Preview of menu item ${index + 1}`}
            className="max-w-full h-auto rounded-md border"
          />
          <Button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 bg-red-500 text-white hover:bg-red-600"
          >
            Remove Image
          </Button>
        </div>
      )}

      {/* Remove Menu Item Button */}
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 text-white hover:bg-red-600"
        aria-label={`Remove menu item ${index + 1}`}
      >
        Remove Menu Item
      </Button>
    </div>
  );
};

export default MenuItemInput;
