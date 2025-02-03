// import express from "express";
// import multer from "multer";
// import MyRestaurantController from "../controllers/MyRestaurantController";
// import { jwtCheck, jwtParse } from "../middleware/auth";
// import { validateMyRestaurantRequest } from "../middleware/validation";

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, //5mb
//   },
// });

// router.get(
//   "/order",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.getMyRestaurantOrders
// );

// router.patch(
//   "/order/:orderId/status",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.updateOrderStatus
// );

// router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// router.post(
//   "/",
//   upload.single("imageFile"),
//   validateMyRestaurantRequest,
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.createMyRestaurant
// );

// router.put(
//   "/",
//   upload.single("imageFile"),
//   validateMyRestaurantRequest,
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.updateMyRestaurant
// );

// export default router;

// import express from "express";
// import multer from "multer";
// import MyRestaurantController from "../controllers/MyRestaurantController";
// import { jwtCheck, jwtParse } from "../middleware/auth";
// import { validateMyRestaurantRequest } from "../middleware/validation";

// const router = express.Router();

// const storage = multer.memoryStorage();
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 5 * 1024 * 1024, // 5MB
//   },
// });

// router.get(
//   "/order",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.getMyRestaurantOrders
// );

// router.patch(
//   "/order/:orderId/status",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.updateOrderStatus
// );

// router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// // Updated POST route to handle both the restaurant image and menu item images
// router.post(
//   "/",
//   upload.fields([
//     { name: "imageFile", maxCount: 1 }, // For the restaurant's image
//     { name: "menuItemsImages", maxCount: 20 }, // For menu items images
//   ]),
//   validateMyRestaurantRequest, // Validate the input
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.createMyRestaurant
// );

// // Updated PUT route to handle both the restaurant image and menu item images
// router.put(
//   "/",
//   upload.fields([
//     { name: "imageFile", maxCount: 1 }, // For the restaurant's image
//     { name: "menuItemsImages", maxCount: 20 }, // For menu items images
//   ]),
//   validateMyRestaurantRequest, // Validate the input
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.updateMyRestaurant
// );

// export default router;





import express from "express";
import multer from "multer";
import MyRestaurantController from "../controllers/MyRestaurantController";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyRestaurantRequest } from "../middleware/validation";

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size 5MB
});

router.get(
    "/order",
    jwtCheck,
    jwtParse,
    MyRestaurantController.getMyRestaurantOrders
  );
  
  router.patch(
    "/order/:orderId/status",
    jwtCheck,
    jwtParse,
    MyRestaurantController.updateOrderStatus
  );

  router.get("/", jwtCheck, jwtParse, MyRestaurantController.getMyRestaurant);

// Accept multiple files dynamically
router.post(
  "/",
  upload.any(), // Accepts all files, including restaurant image and menu item images
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.createMyRestaurant
);

router.put(
  "/",
  upload.any(),
  validateMyRestaurantRequest,
  jwtCheck,
  jwtParse,
  MyRestaurantController.updateMyRestaurant
);


// // // Middleware for handling file uploads
// // const uploadMiddleware = upload.fields([
// //   { name: "imageFile", maxCount: 1 }, // Restaurant's main image
// //   { name: "menuItemsImages", maxCount: 20 }, // Menu item images
// // ]);

// /* ======================
//     🔹 RESTAURANT ROUTES
//    ====================== */
// // Get the restaurant of the logged-in user
// 
// // Create a restaurant (with image & menu images support)
// router.post(
//   "/",
//   jwtCheck,
//   jwtParse,
//    // Ensure files are handled correctly
//   validateMyRestaurantRequest, // Validate request data
//   MyRestaurantController.createMyRestaurant
// );

// // Update a restaurant (with image & menu images support)
// router.put(
//   "/",
//   jwtCheck,
//   jwtParse,
//    // Ensure files are handled correctly
//   validateMyRestaurantRequest, // Validate request data
//   MyRestaurantController.updateMyRestaurant
// );

export default router;
