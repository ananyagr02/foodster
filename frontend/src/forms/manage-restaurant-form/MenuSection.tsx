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
        className="mt-2 bg-red-400 text-white hover:bg-red-400 transition-transform transform hover:scale-105"
        onClick={handleAddMenuItem}
      >
        Add Menu Item
      </Button>
    </div>
  );
};

export default MenuSection;
