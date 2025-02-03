// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Order from "../models/order";

// const getMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "restaurant not found" });
//     }
//     res.json(restaurant);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Error fetching restaurant" });
//   }
// };

// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res
//         .status(409)
//         .json({ message: "User restaurant already exists" });
//     }

//     const imageUrl = await uploadImage(req.file as Express.Multer.File);
//     const menuItems = await Promise.all(
//       req.body.menuItems.map(async (item: any) => {
//         if (item.file) {
//           const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//           return { ...item, imageUrl: itemImageUrl };
//         }
//         return item;
//       })
//     );
//     const restaurant = new Restaurant({
//       ...req.body,
//       imageUrl,
//       menuItems,
//       user: new mongoose.Types.ObjectId(req.userId),
//       lastUpdated: new Date(),
//     });

//     await restaurant.save();

//     res.status(201).send(restaurant);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const updateMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({
//       user: req.userId,
//     });

//     if (!restaurant) {
//       return res.status(404).json({ message: "restaurant not found" });
//     }

//     restaurant.restaurantName = req.body.restaurantName;
//     restaurant.city = req.body.city;
//     restaurant.country = req.body.country;
//     restaurant.deliveryPrice = req.body.deliveryPrice;
//     restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
//     restaurant.cuisines = req.body.cuisines;
//     // restaurant.menuItems = req.body.menuItems;
//     restaurant.lastUpdated = new Date();

//     if (req.file) {
//       const imageUrl = await uploadImage(req.file as Express.Multer.File);
//       restaurant.imageUrl = imageUrl;
//     }
//      // Update menu items
//     //  if (req.body.menuItems) {
//     //   const updatedMenuItems = await Promise.all(
//     //     req.body.menuItems.map(async (item: any) => {
//     //       if (item.file) {
//     //         const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//     //         return { ...item, imageUrl: itemImageUrl };
//     //       }
//     //       return item;
//     //     })
//     //   );
    
//     //   restaurant.menuItems = updatedMenuItems as mongoose.Types.DocumentArray<typeof restaurant.menuItems[0]>; // Cast to DocumentArray
//     // }
    
//     if (req.body.menuItems) {
//       const updatedMenuItems = await Promise.all(
//         req.body.menuItems.map(async (item: any) => {
//           if (item.file) {
//             const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//             return { ...item, imageUrl: itemImageUrl };
//           }
//           return item;
//         })
//       );
    
//       restaurant.menuItems.splice(0, restaurant.menuItems.length, ...updatedMenuItems); // Replace all menu items
//     }
    
//     await restaurant.save();
//     res.status(200).send(restaurant);
//   } catch (error) {
//     console.log("error", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const getMyRestaurantOrders = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "restaurant not found" });
//     }

//     const orders = await Order.find({ restaurant: restaurant._id })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
//   }
// };

// const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "order not found" });
//     }

//     const restaurant = await Restaurant.findById(order.restaurant);

//     if (restaurant?.user?._id.toString() !== req.userId) {
//       return res.status(401).send();
//     }

//     order.status = status;
//     await order.save();

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "unable to update order status" });
//   }
// };

// const uploadImage = async (file: Express.Multer.File) => {
//   const image = file;
//   const base64Image = Buffer.from(image.buffer).toString("base64");
//   const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//   return uploadResponse.url;
// };

// export default {
//   updateOrderStatus,
//   getMyRestaurantOrders,
//   getMyRestaurant,
//   createMyRestaurant,
//   updateMyRestaurant,
// };









// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Order from "../models/order";

// const getMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }
//     res.json(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Error fetching restaurant" });
//   }
// };

// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res.status(409).json({ message: "User restaurant already exists" });
//     }

//     const imageUrl = await uploadImage(req.file as Express.Multer.File);
//     const menuItems = await Promise.all(
//       req.body.menuItems.map(async (item: any) => {
//         if (item.file) {
//           const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//           return { ...item, imageUrl: itemImageUrl };
//         }
//         return item;
//       })
//     );

//     const restaurant = new Restaurant({
//       ...req.body,
//       imageUrl,
//       menuItems,
//       user: new mongoose.Types.ObjectId(req.userId),
//       lastUpdated: new Date(),
//     });

//     await restaurant.save();
//     res.status(201).send(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const updateMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });

//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     restaurant.restaurantName = req.body.restaurantName;
//     restaurant.city = req.body.city;
//     restaurant.country = req.body.country;
//     restaurant.deliveryPrice = req.body.deliveryPrice;
//     restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
//     restaurant.cuisines = req.body.cuisines;
//     restaurant.lastUpdated = new Date();

//     if (req.file) {
//       const imageUrl = await uploadImage(req.file as Express.Multer.File);
//       restaurant.imageUrl = imageUrl;
//     }

//     if (req.body.menuItems) {
//       const updatedMenuItems = await Promise.all(
//         req.body.menuItems.map(async (item: any) => {
//           if (item.file) {
//             const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//             return { ...item, imageUrl: itemImageUrl };
//           }
//           return item;
//         })
//       );

//       restaurant.menuItems.splice(0, restaurant.menuItems.length, ...updatedMenuItems); // Replace all menu items
//     }

//     await restaurant.save();
//     res.status(200).send(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const getMyRestaurantOrders = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const orders = await Order.find({ restaurant: restaurant._id })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const restaurant = await Restaurant.findById(order.restaurant);

//     if (restaurant?.user?._id.toString() !== req.userId) {
//       return res.status(401).send();
//     }

//     order.status = status;
//     await order.save();

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Unable to update order status" });
//   }
// };

// const uploadImage = async (file: Express.Multer.File) => {
//   const image = file;
//   const base64Image = Buffer.from(image.buffer).toString("base64");
//   const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//   return uploadResponse.url;
// };

// export default {
//   updateOrderStatus,
//   getMyRestaurantOrders,
//   getMyRestaurant,
//   createMyRestaurant,
//   updateMyRestaurant,
// };




// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import cloudinary from "cloudinary";
// import mongoose from "mongoose";
// import Order from "../models/order";

// // Function to handle image upload to Cloudinary
// const uploadImage = async (file: Express.Multer.File): Promise<string> => {
//   const image = file;
//   const base64Image = Buffer.from(image.buffer).toString("base64");
//   const dataURI = `data:${image.mimetype};base64,${base64Image}`;

//   const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
//   return uploadResponse.url;
// };

// // Get the restaurant for the logged-in user
// const getMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }
//     res.json(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Error fetching restaurant" });
//   }
// };

// // Create a new restaurant for the logged-in user
// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res.status(409).json({ message: "User restaurant already exists" });
//     }

//     const imageUrl = await uploadImage(req.file as Express.Multer.File);

//     // Parse and handle menu items with their images
//     const menuItems = await Promise.all(
//       req.body.menuItems.map(async (item: any) => {
//         if (item.file) {
//           const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//           return { ...item, imageUrl: itemImageUrl };
//         }
//         return item;
//       })
//     );

//     const restaurant = new Restaurant({
//       ...req.body,
//       imageUrl,
//       menuItems,
//       user: new mongoose.Types.ObjectId(req.userId),
//       lastUpdated: new Date(),
//     });

//     await restaurant.save();
//     res.status(201).send(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // Update the existing restaurant for the logged-in user
// const updateMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });

//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     restaurant.restaurantName = req.body.restaurantName;
//     restaurant.city = req.body.city;
//     restaurant.country = req.body.country;
//     restaurant.deliveryPrice = req.body.deliveryPrice;
//     restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
//     restaurant.cuisines = req.body.cuisines;
//     restaurant.lastUpdated = new Date();

//     // Handle image upload if provided
//     if (req.file) {
//       const imageUrl = await uploadImage(req.file as Express.Multer.File);
//       restaurant.imageUrl = imageUrl;
//     }

//     // Handle menu items update
//     if (req.body.menuItems) {
//       const updatedMenuItems = await Promise.all(
//         req.body.menuItems.map(async (item: any) => {
//           if (item.file) {
//             const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//             return { ...item, imageUrl: itemImageUrl };
//           }
//           return item;
//         })
//       );

//       // Replace all menu items with the updated ones
//       restaurant.menuItems.splice(0, restaurant.menuItems.length, ...updatedMenuItems);
//     }

//     await restaurant.save();
//     res.status(200).send(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // Get all orders for the logged-in user's restaurant
// const getMyRestaurantOrders = async (req: Request, res: Response) => {
//   try {
//     const restaurant = await Restaurant.findOne({ user: req.userId });
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const orders = await Order.find({ restaurant: restaurant._id })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

// // Update the status of an order
// const updateOrderStatus = async (req: Request, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const { status } = req.body;

//     const order = await Order.findById(orderId);
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     const restaurant = await Restaurant.findById(order.restaurant);

//     if (restaurant?.user?._id.toString() !== req.userId) {
//       return res.status(401).send();
//     }

//     order.status = status;
//     await order.save();

//     res.status(200).json(order);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Unable to update order status" });
//   }
// };

// export default {
//   updateOrderStatus,
//   getMyRestaurantOrders,
//   getMyRestaurant,
//   createMyRestaurant,
//   updateMyRestaurant,
// };



import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from "cloudinary";
import mongoose from "mongoose";
import Order from "../models/order";

// Function to handle image upload to Cloudinary
const uploadImage = async (file: Express.Multer.File): Promise<string> => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`;

  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
  return uploadResponse.url;
};

// Get the restaurant for the logged-in user
const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Error fetching restaurant" });
  }
};

// Create a new restaurant for the logged-in user
// const createMyRestaurant = async (req: Request, res: Response) => {
//   try {
//     const existingRestaurant = await Restaurant.findOne({ user: req.userId });

//     if (existingRestaurant) {
//       return res.status(409).json({ message: "User restaurant already exists" });
//     }

//     const imageUrl = await uploadImage(req.file as Express.Multer.File);

//     // Parse and handle menu items with their images
//     const menuItems = await Promise.all(
//       req.body.menuItems.map(async (item: any) => {
//         if (item.file) {
//           const itemImageUrl = await uploadImage(item.file as Express.Multer.File);
//           return { ...item, imageUrl: itemImageUrl };
//         }
//         return item;
//       })
//     );

//     const restaurant = new Restaurant({
//       ...req.body,
//       imageUrl,
//       menuItems,
//       user: new mongoose.Types.ObjectId(req.userId),
//       lastUpdated: new Date(),
//     });

//     await restaurant.save();
//     res.status(201).send(restaurant);
//   } catch (error) {
//     console.log("Error:", error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };
const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res.status(409).json({ message: "User restaurant already exists" });
    }
    const files = req.files as Express.Multer.File[];

     // Upload restaurant image
      let restaurantImageUrl = "";
      const restaurantImage = files.find((file) => file.fieldname === "imageFile");
      if (restaurantImage) {
        restaurantImageUrl = await uploadImage(restaurantImage);
      }


    // // Process menu item images
    // const menuItems = JSON.parse(req.body.menuItems).map((item: any, index: number) => {
    //   if (files?.menuItemsImages?.[index]) {
    //     item.menuItemImageUrl = uploadImage(files.menuItemsImages[index]);
    //   }
    //   return item;
    // });

     // Parse menu items from request body
      let menuItems = JSON.parse(req.body.menuItems);

     // Process menu item images dynamically
      menuItems = await Promise.all(
      menuItems.map(async (item: any, index: number) => {
        const menuItemImage = files.find((file) => file.fieldname === `menuItemImage_${index}`);
          if (menuItemImage) {
            item.menuItemImageUrl = await uploadImage(menuItemImage);
          }
          return item;
        })
      );


    const restaurant = new Restaurant({
      ...req.body,
      restaurantImageUrl,
      menuItems,
      user: new mongoose.Types.ObjectId(req.userId),
      lastUpdated: new Date(),
    });

    await restaurant.save();
    res.status(201).send(restaurant);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Update the existing restaurant for the logged-in user
const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
     // Ensure req.files is an array
      const files = req.files as Express.Multer.File[];
    restaurant.restaurantName = req.body.restaurantName;
    restaurant.city = req.body.city;
    restaurant.country = req.body.country;
    restaurant.deliveryPrice = req.body.deliveryPrice;
    restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
    restaurant.cuisines = req.body.cuisines;
    restaurant.lastUpdated = new Date();

    // Handle restaurant image update
    const restaurantImage = files.find((file) => file.fieldname === "imageFile");
    if (restaurantImage) {
      restaurant.restaurantImageUrl = await uploadImage(restaurantImage);
    }
    // Handle menu items update properly
    if (req.body.menuItems) {
      let updatedMenuItems = JSON.parse(req.body.menuItems);

      updatedMenuItems = await Promise.all(
        updatedMenuItems.map(async (item: any, index: number) => {
          // Find the corresponding image file for this menu item
          const menuItemImage = files.find((file) => file.fieldname === `menuItemImage_${index}`);
          if (menuItemImage) {
            item.menuItemImageUrl = await uploadImage(menuItemImage);
          }
          return item;
        })
      );

      // Use Mongoose's DocumentArray methods instead of plain array assignment
      restaurant.menuItems.splice(0, restaurant.menuItems.length, ...updatedMenuItems);
    }

    await restaurant.save();
    res.status(200).send(restaurant);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


// Get all orders for the logged-in user's restaurant
const getMyRestaurantOrders = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const orders = await Order.find({ restaurant: restaurant._id })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// Update the status of an order
const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const restaurant = await Restaurant.findById(order.restaurant);

    if (restaurant?.user?._id.toString() !== req.userId) {
      return res.status(401).send();
    }

    order.status = status;
    await order.save();

    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Unable to update order status" });
  }
};

export default {
  updateOrderStatus,
  getMyRestaurantOrders,
  getMyRestaurant,
  createMyRestaurant,
  updateMyRestaurant,
};
