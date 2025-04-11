import { MenuItems } from "../types";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

type Props = {
  menuItem: MenuItems;
  addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
  return (
    <Card className="flex items-center justify-between p-4">
      {/* Left Side: Name */}
      <div className="flex flex-col">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{menuItem.name}</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-600">
          ₹{(menuItem.price).toFixed(2)}
        </CardContent>
      </div>

      {/* Right Side: Image and Button */}
      <div className="flex flex-col items-center space-y-2">
        {menuItem.imageUrl && (
          <img
            src={menuItem.imageUrl}
            alt={menuItem.name}
            className="w-20 h-20 object-cover rounded-lg"
          />
        )}
        <Button onClick={addToCart} className="mt-2 flex-1 bg-orange hover:bg-dullorange text-white font-bold ">
          Add to Cart
        </Button>
      </div>
    </Card>
  );
};

export default MenuItem;
