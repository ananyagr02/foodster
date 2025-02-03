// import { Button } from "@/components/ui/button";
// import { FormDescription, FormField, FormItem } from "@/components/ui/form";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import MenuItemInput from "./MenuItemInput";

// const MenuSection = () => {
//   const { control } = useFormContext();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "menuItems",
//   });

//   return (
//     <div className="space-y-2">
//       <div>
//         <h2 className="text-2xl font-bold">Menu</h2>
//         <FormDescription>
//           Create your menu and give each item a name and a price
//         </FormDescription>
//       </div>
//       <FormField
//         control={control}
//         name="menuItems"
//         render={() => (
//           <FormItem className="flex flex-col gap-2">
//             {fields.map((_, index) => (
//               <MenuItemInput
//                 index={index}
//                 removeMenuItem={() => remove(index)}
//               />
//             ))}
//           </FormItem>
//         )}
//       />
//       <Button type="button" className="bg-orange text-white hover:bg-orange hover:scale-105 transition-transform" onClick={() => append({ name: "", price: "" })}>
//         Add Menu Item
//       </Button>
//     </div>
//   );
// };

// export default MenuSection;





// import { Input } from "@/components/ui/input";
// import { FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form";
// import { Trash } from "lucide-react";
// import { useFormContext } from "react-hook-form";

// type Props = {
//   index: number;
//   removeMenuItem: () => void;
// };

// const MenuItemInput = ({ index, removeMenuItem }: Props) => {
//   const { control } = useFormContext();

//   return (
//     <div className="flex flex-col gap-2 border p-4 rounded-lg">
//       <FormField
//         control={control}
//         name={`menuItems.${index}.name`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Name</FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="Item name" />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`menuItems.${index}.price`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Price</FormLabel>
//             <FormControl>
//               <Input {...field} type="number" placeholder="Item price" />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`menuItems.${index}.imageUrl`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Image URL</FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="https://example.com/image.jpg" />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`menuItems.${index}.imageFile`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel>Upload Image</FormLabel>
//             <FormControl>
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={(e) => {
//                   field.onChange(e.target.files?.[0]);
//                 }}
//               />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <button
//         type="button"
//         className="mt-2 text-red-500 flex items-center gap-1"
//         onClick={removeMenuItem}
//       >
//         <Trash className="w-4 h-4" />
//         Remove Item
//       </button>
//     </div>
//   );
// };

// export default MenuItemInput;


// import { Button } from "@/components/ui/button";
// import { FormField, FormItem } from "@/components/ui/form";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import MenuItemInput from "./MenuItemInput";

// const MenuSection = () => {
//   const { control } = useFormContext();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "menuItems",
//   });

//   return (
//     <div className="space-y-2">
//       <div>
//         <h2 className="text-2xl font-bold">Menu</h2>
//         <p>Create your menu and give each item a name and a price</p>
//       </div>
//       <FormField
//         control={control}
//         name="menuItems"
//         render={() => (
//           <FormItem className="flex flex-col gap-2">
//             {fields.map((field, index) => (
//               <MenuItemInput
//                 key={field.id} // React requires a unique key for each element in a list
//                 index={index} // Pass the current index to the MenuItemInput
//                 removeMenuItem={() => remove(index)} // Pass the remove function for the current item
//               />
//             ))}
//           </FormItem>
//         )}
//       />
//       <Button
//         type="button"
//         className="bg-orange text-white hover:bg-orange hover:scale-105 transition-transform"
//         onClick={() => append({ name: "", price: 0 })}
//       >
//         Add Menu Item
//       </Button>
//     </div>
//   );
// };

// export default MenuSection;


























// import { Button } from "@/components/ui/button";
// import { FormField, FormItem } from "@/components/ui/form";
// import { useFieldArray, useFormContext } from "react-hook-form";
// import MenuItemInput from "./MenuItemInput";

// const MenuSection = () => {
//   const { control } = useFormContext();

//   // Manage menu item fields using react-hook-form's useFieldArray
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "menuItems",
//   });

//   // Handle adding new menu item
//   const handleAddMenuItem = () => {
//     append({ name: "", price: 0, menuItemImageUrl:  "", menuItemImageFile: null });
//   };

//   return (
//     <div className="space-y-4">
//       {/* Section Header */}
//       <div>
//         <h2 className="text-2xl font-bold">Menu</h2>
//         <p>Create your menu and give each item a name, a price and an image</p>
//       </div>

//       Form for menu items
//       <FormField
//         control={control}
//         name="menuItems"
//         render={() => (
//           <FormItem className="flex flex-col gap-4">
//             {/* Render each menu item input field dynamically */}
//             {fields.map((field, index) => (
//               // <MenuItemInput
//               //   key={field.id}
//               //   index={index}
//               //   removeMenuItem={() => remove(index)}
//               // />

//               <div key={field.id} className="space-y-4">
//               {/* Render menu item input fields (name, price) */}
//               <MenuItemInput
//                 key={field.id}
//                 index={index}
//                 removeMenuItem={() => remove(index)}
//               />

//               {/* Add an image upload input for each menu item */}
//               <FormItem>
//                 <label htmlFor={`menuItems[${index}].menuItemImageUrl`} className="block">
//                   Upload Image (optional)
//                 </label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   {...control.register(`menuItems[${index}].menuItemImageUrl`)}
//                   className="mt-1"
//                 />
//               </FormItem>
//             </div> 

//             ))}
//           </FormItem>
//         )}
//       />

//       {/* Button to add new menu item */}
//       <Button
//         type="button"
//         className="bg-orange-500 text-white hover:bg-orange-600 transition-transform transform hover:scale-105"
//         onClick={handleAddMenuItem}
//       >
//         Add Menu Item
//       </Button>
//     </div>
//   );
// };

// export default MenuSection;




import { Button } from "@/components/ui/button";
import { useFieldArray, useFormContext } from "react-hook-form";
import MenuItemInput from "./MenuItemInput";

const MenuSection = () => {
  const { control } = useFormContext();

  // Manage menu item fields using react-hook-form's useFieldArray
  const { fields, append, remove } = useFieldArray({
    control,
    name: "menuItems",
  });

  // Handle adding new menu item
  const handleAddMenuItem = () => {
    append({ name: "", price: 0, menuItemImageUrl: "", menuItemImageFile: null });
  };

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-2xl font-bold">Menu</h2>
        <p>Create your menu and give each item a name, a price, and an image.</p>
      </div>

      {/* Render each menu item input field dynamically */}
      <div className="flex flex-col gap-4">
        {fields.map((field, index) => (
          <MenuItemInput key={field.id} index={index} removeMenuItem={() => remove(index)} />
        ))}
      </div>

      {/* Button to add new menu item */}
      <Button
        type="button"
        className="bg-orange-500 text-white hover:bg-orange-600 transition-transform transform hover:scale-105"
        onClick={handleAddMenuItem}
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
