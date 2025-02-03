// import mongoose, { InferSchemaType } from "mongoose";

// const menuItemSchema = new mongoose.Schema({
//   _id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     default: () => new mongoose.Types.ObjectId(),
//   },
//   name: { type: String, required: true },
//   price: { type: Number, required: true },
//   imageUrl: { type: String, required: false }, // New field for the menu item image URL

// });

// export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

// const restaurantSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   restaurantName: { type: String, required: true },
//   city: { type: String, required: true },
//   country: { type: String, required: true },
//   deliveryPrice: { type: Number, required: true },
//   estimatedDeliveryTime: { type: Number, required: true },
//   cuisines: [{ type: String, required: true }],
//   menuItems: [menuItemSchema],
//   imageUrl: { type: String, required: true },
//   lastUpdated: { type: Date, required: true },
// });

// const Restaurant = mongoose.model("Restaurant", restaurantSchema);
// export default Restaurant;


import mongoose, { InferSchemaType } from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      default: () => new mongoose.Types.ObjectId(),
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    menuItemImageUrl: { type: String, required: false }, // Optional menu item image URL
  },
  { _id: false } // Prevent Mongoose from auto-generating another `_id`
);

export type MenuItemType = InferSchemaType<typeof menuItemSchema>;

const restaurantSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  restaurantName: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  deliveryPrice: { type: Number, required: true },
  estimatedDeliveryTime: { type: Number, required: true },
  cuisines: [{ type: String, required: true }],
  menuItems: { type: [menuItemSchema], default: [] }, // Ensure it defaults to an empty array
  restaurantImageUrl: { type: String, required: true },
  lastUpdated: { type: Date, required: true, default: Date.now }, // Auto-update on creation
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);
export default Restaurant;
