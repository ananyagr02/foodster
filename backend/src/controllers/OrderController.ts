

// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import Restaurant, { MenuItemType } from "../models/restaurant";
// import Order from "../models/order";

// // Initialize Razorpay instance
// const RAZORPAY = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,  // Your Razorpay key_id
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string,  // Your Razorpay key_secret
// });

// const FRONTEND_URL = process.env.FRONTEND_URL as string;
// const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// // Get user orders
// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find({ user: req.userId })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
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

// // Handle Razorpay webhook events
// const razorpayWebhookHandler = async (req: Request, res: Response) => {
//   let event;

//   try {
//     const sig = req.headers["x-razorpay-signature"];
//     const payload = req.body;

//     // Verify webhook signature
//     event = RAZORPAY.webhooks.verifySignature(payload, sig as string, RAZORPAY_WEBHOOK_SECRET);

//   } catch (error: any) {
//     console.log(error);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   if (event.event === "payment.captured") {
//     const order = await Order.findById(event.payload.payment.entity.metadata?.orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.totalAmount = event.payload.payment.entity.amount / 100; // Razorpay sends amount in paise
//     order.status = "paid";

//     await order.save();
//   }

//   res.status(200).send();
// };

// // Create Razorpay checkout session
// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const checkoutSessionRequest: CheckoutSessionRequest = req.body;

//     const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

//     if (!restaurant) {
//       throw new Error("Restaurant not found");
//     }

//     const newOrder = new Order({
//       restaurant: restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails: checkoutSessionRequest.deliveryDetails,
//       cartItems: checkoutSessionRequest.cartItems,
//       createdAt: new Date(),
//     });

//     const lineItems = createLineItems(
//       checkoutSessionRequest,
//       restaurant.menuItems
//     );

//     const session = await createSession(
//       lineItems,
//       newOrder._id.toString(),
//       restaurant.deliveryPrice,
//       restaurant._id.toString()
//     );

//     if (!session) {
//       return res.status(500).json({ message: "Error creating Razorpay session" });
//     }

//     await newOrder.save();
//     res.json({ url: session.longurl }); // Razorpay returns a longurl for the checkout page
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create line items for the Razorpay checkout session
// const createLineItems = (
//   checkoutSessionRequest: CheckoutSessionRequest,
//   menuItems: MenuItemType[]
// ) => {
//   const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
//     const menuItem = menuItems.find(
//       (item) => item._id.toString() === cartItem.menuItemId.toString()
//     );

//     if (!menuItem) {
//       throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
//     }

//     const line_item = {
//       name: menuItem.name,
//       amount: menuItem.price * 100, // Razorpay requires amount in paise
//       currency: "INR",
//       quantity: parseInt(cartItem.quantity),
//     };

//     return line_item;
//   });

//   return lineItems;
// };

// // Create Razorpay checkout session
// const createSession = async (
//   lineItems: any[],
//   orderId: string,
//   deliveryPrice: number,
//   restaurantId: string
// ) => {
//   try {
//     const orderData = {
//       amount: lineItems.reduce((total, item) => total + item.amount, 0) + deliveryPrice * 100, // total price in paise
//       currency: "INR",
//       receipt: orderId,
//       payment_capture: 1, // Automatically capture the payment
//       notes: {
//         orderId,
//         restaurantId,
//       },
//     };

//     // Create the Razorpay order
//     const razorpayOrder = await RAZORPAY.orders.create(orderData);

//     return razorpayOrder;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error("Error creating Razorpay order");
//   }
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   razorpayWebhookHandler,
// };


// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import Restaurant, { MenuItemType } from "../models/restaurant";
// import Order from "../models/order";
// import crypto from "crypto";

// // Initialize Razorpay instance
// const RAZORPAY = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,  // Your Razorpay key_id
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string,  // Your Razorpay key_secret
// });

// const FRONTEND_URL = process.env.FRONTEND_URL as string;
// const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// // Get user orders
// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find({ user: req.userId })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
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

// // Handle Razorpay webhook events
// const razorpayWebhookHandler = async (req: Request, res: Response) => {
//   const secret = RAZORPAY_WEBHOOK_SECRET;
//   const payload = req.body;
//   const sigHeader = req.headers["x-razorpay-signature"] as string;

//   // Create a hash of the payload using the secret key
//   const generatedSignature = crypto
//     .createHmac("sha256", secret)
//     .update(JSON.stringify(payload))
//     .digest("hex");

//   if (generatedSignature === sigHeader) {
//     // Signature is valid
//     if (payload.event === "payment.captured") {
//       const order = await Order.findById(payload.payload.payment.entity.metadata?.orderId);
//       if (!order) {
//         return res.status(404).json({ message: "Order not found" });
//       }

//       order.totalAmount = payload.payload.payment.entity.amount / 100; // Razorpay sends amount in paise
//       order.status = "paid";
//       await order.save();
//     }
//     return res.status(200).send();
//   } else {
//     return res.status(400).send("Invalid signature");
//   }
// };

// // Create Razorpay checkout session
// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const checkoutSessionRequest: CheckoutSessionRequest = req.body;

//     const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

//     if (!restaurant) {
//       throw new Error("Restaurant not found");
//     }

//     const newOrder = new Order({
//       restaurant: restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails: checkoutSessionRequest.deliveryDetails,
//       cartItems: checkoutSessionRequest.cartItems,
//       createdAt: new Date(),
//     });

//     const lineItems = createLineItems(
//       checkoutSessionRequest,
//       restaurant.menuItems
//     );

//     const session = await createSession(
//       lineItems,
//       newOrder._id.toString(),
//       restaurant.deliveryPrice,
//       restaurant._id.toString()
//     );

//     if (!session) {
//       return res.status(500).json({ message: "Error creating Razorpay session" });
//     }

//     await newOrder.save();
    
//     // Construct Razorpay checkout URL using the order ID
//     const razorpayCheckoutUrl = `https://checkout.razorpay.com/v1/checkout.js?order_id=${session.id}`;

//     res.json({ url: razorpayCheckoutUrl }); // Return the URL to redirect to Razorpay
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create line items for the Razorpay checkout session
// const createLineItems = (
//   checkoutSessionRequest: CheckoutSessionRequest,
//   menuItems: MenuItemType[]
// ) => {
//   const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
//     const menuItem = menuItems.find(
//       (item) => item._id.toString() === cartItem.menuItemId.toString()
//     );

//     if (!menuItem) {
//       throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
//     }

//     const line_item = {
//       name: menuItem.name,
//       amount: menuItem.price * 100, // Razorpay requires amount in paise
//       currency: "INR",
//       quantity: parseInt(cartItem.quantity),
//     };

//     return line_item;
//   });

//   return lineItems;
// };

// // Create Razorpay checkout session
// const createSession = async (
//   lineItems: any[],
//   orderId: string,
//   deliveryPrice: number,
//   restaurantId: string
// ) => {
//   try {
//     const orderData = {
//       amount: lineItems.reduce((total, item) => total + item.amount, 0) + deliveryPrice * 100, // total price in paise
//       currency: "INR",
//       receipt: orderId,
//       payment_capture: 1, // Automatically capture the payment
//       notes: {
//         orderId,
//         restaurantId,
//       },
//     };

//     // Create the Razorpay order
//     const razorpayOrder = await RAZORPAY.orders.create(orderData);

//     return razorpayOrder;
//   } catch (error: any) {
//     console.log(error);
//     throw new Error("Error creating Razorpay order");
//   }
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   razorpayWebhookHandler,


// };


// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import Restaurant from "../models/restaurant";
// import Order from "../models/order";
// import crypto from "crypto";

// // Initialize Razorpay instance (in dev mode)
// const RAZORPAY = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string,
// });

// const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// /**
//  * Fetch user orders
//  */
// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find({ user: req.userId })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.error("Error fetching orders:", error);
//     res.status(500).json({ message: "Failed to fetch orders" });
//   }
// };

// /**
//  * Handle Razorpay webhook events (for dummy transactions)
//  */
// const razorpayWebhookHandler = async (req: Request, res: Response) => {
//   try {
//     const payload = req.body;
//     const sigHeader = req.headers["x-razorpay-signature"] as string;

//     // Validate the webhook signature
//     const generatedSignature = crypto
//       .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
//       .update(JSON.stringify(payload))
//       .digest("hex");

//     if (generatedSignature !== sigHeader) {
//       return res.status(400).json({ message: "Invalid signature" });
//     }

//     // Simulate payment success for "payment.captured" event
//     if (payload.event === "payment.captured") {
//       const paymentEntity = payload.payload.payment.entity;
//       const order = await Order.findById(paymentEntity.metadata?.orderId);

//       if (!order) {
//         return res.status(404).json({ message: "Order not found" });
//       }

//       order.totalAmount = paymentEntity.amount / 100; // Convert paise to INR
//       order.status = "paid"; // Mark order as paid
//       await order.save();
//     }

//     res.status(200).send();
//   } catch (error) {
//     console.error("Error handling webhook:", error);
//     res.status(500).json({ message: "Webhook processing failed" });
//   }
// };

// /**
//  * Create Razorpay checkout session (dummy mode)
//  */
// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const { cartItems, deliveryDetails, restaurantId } = req.body;

//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const lineItems = createLineItems(cartItems, restaurant.menuItems);
//     const orderTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
//     const deliveryPrice = restaurant.deliveryPrice * 100; // Convert to paise

//     const newOrder = new Order({
//       restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails,
//       cartItems,
//       createdAt: new Date(),
//     });

//     const razorpayOrder = await createRazorpayOrder(
//       orderTotal + deliveryPrice,
//       newOrder._id.toString(),
//       restaurant._id.toString()
//     );

//     if (!razorpayOrder) {
//       return res.status(500).json({ message: "Error creating Razorpay order" });
//     }

//     await newOrder.save();

//     // Return the Razorpay test mode checkout URL
//     res.json({
//       url: `https://checkout.razorpay.com/v1/checkout.js?order_id=${razorpayOrder.id}`,
//     });
//   } catch (error) {
//     console.error("Error creating checkout session:", error);
//     res.status(500).json({ message: "Failed to create checkout session" });
//   }
// };

// /**
//  * Create line items for Razorpay order
//  */
// const createLineItems = (cartItems: any[], menuItems: any[]) => {
//   return cartItems.map((cartItem) => {
//     const menuItem = menuItems.find(
//       (item) => item._id.toString() === cartItem.menuItemId.toString()
//     );

//     if (!menuItem) {
//       throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
//     }

//     return {
//       name: menuItem.name,
//       amount: menuItem.price * 100, // Convert to paise
//       currency: "INR",
//       quantity: parseInt(cartItem.quantity),
//     };
//   });
// };

// /**
//  * Create Razorpay order (dummy mode)
//  */
// const createRazorpayOrder = async (
//   amount: number,
//   orderId: string,
//   restaurantId: string
// ) => {
//   try {
//     const orderData = {
//       amount,
//       currency: "INR",
//       receipt: orderId,
//       payment_capture: 1, // Auto-capture payment
//       notes: {
//         orderId,
//         restaurantId,
//       },
//     };

//     return await RAZORPAY.orders.create(orderData); // Razorpay's test mode will simulate this
//   } catch (error) {
//     console.error("Error creating Razorpay order:", error);
//     throw new Error("Failed to create Razorpay order");
//   }
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   razorpayWebhookHandler,
// };





























// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import crypto from "crypto";

// import Restaurant from "../models/restaurant";
// import Order from "../models/order";

// // Initialize Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string,
// });

// const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// /**
//  * Fetch all orders for the logged-in user
//  */
// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;
//     const orders = await Order.find({ user: userId })
//       .populate("restaurant")
//       .populate("user");

//     return res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching user orders:", err);
//     return res.status(500).json({ message: "Unable to fetch user orders." });
//   }
// };

// /**
//  * Create a new Razorpay checkout session and local order
//  */
// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const { cartItems, deliveryDetails, restaurantId } = req.body;

//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     const lineItems = buildLineItems(cartItems, restaurant.menuItems);
//     const itemsTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
//     const deliveryFee = restaurant.deliveryPrice * 100; // in paise
//     const totalAmount = itemsTotal + deliveryFee;

//     const order = new Order({
//       restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails,
//       cartItems,
//       totalAmount: totalAmount / 100, // Save INR format
//       createdAt: new Date(),
//     });

//     const razorpayOrder = await createRazorpayOrder(
//       totalAmount,
//       order._id.toString(),
//       restaurant._id.toString()
//     );

//     if (!razorpayOrder) {
//       return res.status(500).json({ message: "Error creating Razorpay order" });
//     }

//     await order.save();

//     return res.status(201).json({
//       orderId: razorpayOrder.id,
//       amount: totalAmount,
//       currency: "INR",
//       razorpayKey: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (err) {
//     console.error("❌ Error creating Razorpay checkout session:", err);
//     return res.status(500).json({ message: "Failed to create checkout session" });
//   }
// };

// /**
//  * Handle Razorpay webhooks securely
//  */
// const razorpayWebhookHandler = async (req: Request, res: Response) => {
//   try {
//     const signature = req.headers["x-razorpay-signature"] as string;

//     const expectedSignature = crypto
//       .createHmac("sha256", webhookSecret)
//       .update(req.body) // raw body!
//       .digest("hex");

//     if (expectedSignature !== signature) {
//       return res.status(400).json({ message: "Invalid webhook signature" });
//     }

//     const payload = JSON.parse(req.body.toString());

//     if (payload.event === "payment.captured") {
//       const payment = payload.payload.payment.entity;
//       const razorpayOrder = await razorpay.orders.fetch(payment.order_id);
//       const orderId = razorpayOrder?.receipt;

//       if (!orderId) {
//         return res.status(400).json({ message: "Invalid receipt from Razorpay" });
//       }

//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ message: "Order not found" });
//       }

//       order.status = "paid";
//       order.totalAmount = payment.amount / 100; // INR
//       await order.save();
//     }

//     return res.status(200).json({ received: true });
//   } catch (err) {
//     console.error("❌ Error processing Razorpay webhook:", err);
//     return res.status(500).json({ message: "Webhook processing failed" });
//   }
// };

// /**
//  * Build line items from cart and menu
//  */
// const buildLineItems = (cartItems: any[], menuItems: any[]) => {
//   return cartItems.map((cartItem) => {
//     const menuItem = menuItems.find(
//       (item) => item._id.toString() === cartItem.menuItemId.toString()
//     );

//     if (!menuItem) {
//       throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
//     }

//     return {
//       name: menuItem.name,
//       amount: menuItem.price * 100, // paise
//       currency: "INR",
//       quantity: parseInt(cartItem.quantity),
//     };
//   });
// };

// /**
//  * Create a Razorpay order
//  */
// const createRazorpayOrder = async (
//   amount: number,
//   orderId: string,
//   restaurantId: string
// ) => {
//   try {
//     const orderData = {
//       amount,
//       currency: "INR",
//       receipt: orderId,
//       payment_capture: 1,
//       notes: {
//         orderId,
//         restaurantId,
//       },
//     };

//     return await razorpay.orders.create(orderData);
//   } catch (err) {
//     console.error("❌ Failed to create Razorpay order:", err);
//     throw new Error("Razorpay order creation failed");
//   }
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   razorpayWebhookHandler,
// };








// import Razorpay from "razorpay";
// import { Request, Response } from "express";
// import crypto from "crypto";
// import Restaurant from "../models/restaurant";
// import Order from "../models/order";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID as string,
//   key_secret: process.env.RAZORPAY_KEY_SECRET as string,
// });

// const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// /**
//  * Fetch all orders for the logged-in user
//  */
// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const userId = req.userId;
//     const orders = await Order.find({ user: userId })
//       .populate("restaurant")
//       .populate("user");
//     return res.status(200).json(orders);
//   } catch (err) {
//     console.error("❌ Error fetching user orders:", err);
//     return res.status(500).json({ message: "Unable to fetch user orders." });
//   }
// };

// /**
//  * Build line items from cart and menu items
//  * (Note: Razorpay Checkout UI doesn’t support a detailed line-item list,
//  * but you can pass a summary in the notes.)
//  */
// const buildLineItems = (cartItems: any[], menuItems: any[]) => {
//   return cartItems.map((cartItem) => {
//     const menuItem = menuItems.find(
//       (item) => item._id.toString() === cartItem.menuItemId.toString()
//     );
//     if (!menuItem) {
//       throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
//     }
    
//     const quantity = parseInt(cartItem.quantity);
//     const price = menuItem.price;
//     console.log(`📦 Item: ${menuItem.name}, Quantity: ${quantity}, Price (each): ₹${price}, Total: ₹${price * quantity}`);

//     return {
//       name: menuItem.name,
//       amount: menuItem.price , 
//       currency: "INR",
//       quantity: parseInt(cartItem.quantity),
//     };
//   });
// };

// /**
//  * Create a Razorpay order using the total amount
//  */
// const createRazorpayOrder = async (
//   amount: number,
//   orderId: string,
//   restaurantId: string
// ) => {
//   try {
//     const orderData = {
//       amount, // in paise
//       currency: "INR",
//       receipt: orderId, // Use local order _id as receipt
//       payment_capture: 1,
//       notes: {
//         orderId, 
//         restaurantId,
//       },
//     };
//     return await razorpay.orders.create(orderData);
//   } catch (err) {
//     console.error("❌ Failed to create Razorpay order:", err);
//     throw new Error("Razorpay order creation failed");
//   }
// };

// /**
//  * Create a new checkout session with Razorpay
//  */
// const createCheckoutSession = async (req: Request, res: Response) => {

//   console.log("🔥 Backend reached createCheckoutSession");

//   try {
//     const { cartItems, deliveryDetails, restaurantId } = req.body;

//     console.log("📥 Received cartItems from frontend:", cartItems);
//     const restaurant = await Restaurant.findById(restaurantId);
//     if (!restaurant) {
//       return res.status(404).json({ message: "Restaurant not found" });
//     }

//     // Build a simple summary of items (for our notes in Razorpay order)
//     const lineItems = buildLineItems(cartItems, restaurant.menuItems);
//     const itemsTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
//     const deliveryFee = restaurant.deliveryPrice ;
//     const totalAmount = itemsTotal + deliveryFee;
//     console.log("🧮 itemsTotal (menu items): ₹", itemsTotal);
//     console.log("🚚 deliveryFee: ₹", deliveryFee);
//     console.log("💰 totalAmount sent to Razorpay (in ₹):", totalAmount);
    
//     const order = new Order({
//       restaurant,
//       user: req.userId,
//       status: "placed",
//       deliveryDetails,
//       cartItems,
//       totalAmount: totalAmount , // store in INR
//       createdAt: new Date(),
//     });

//     // Create Razorpay order. Use the Order's _id as receipt.
//     const razorpayOrder = await createRazorpayOrder(
//       totalAmount*100,
//       order._id.toString(),
//       restaurant._id.toString()
//     );
//     if (!razorpayOrder) {
//       return res.status(500).json({ message: "Error creating Razorpay order" });
//     }

//     // Save the order locally (no schema change required; _id is used as receipt)
//     await order.save();

//     return res.status(201).json({
//       order_id: razorpayOrder.id,            // Razorpay order ID
//       amount: totalAmount*100,                    // amount in paise
//       currency: "INR",
//       razorpayKey: process.env.RAZORPAY_KEY_ID,
//       receipt: order._id.toString()
//       // Optional: include summary notes if you want to display items in notes:
//       // notes: lineItems.map((item) => `${item.name} x ${item.quantity}`).join(", "),
//     });
//   } catch (err) {
//     console.error("❌ Error creating Razorpay checkout session:", err);
//     return res.status(500).json({ message: "Failed to create checkout session" });
//   }
// };

// /**
//  * Handle Razorpay webhook for payment events
//  */
// const razorpayWebhookHandler = async (req: Request, res: Response) => {
//   try {
//     // Use raw body for webhook signature validation.
//     const signature = req.headers["x-razorpay-signature"] as string;
//     const expectedSignature = crypto
//       .createHmac("sha256", webhookSecret)
//       .update(req.body) // Note: req.body must be raw buffer (see express.raw() in index.ts)
//       .digest("hex");

//     if (expectedSignature !== signature) {
//       return res.status(400).json({ message: "Invalid webhook signature" });
//     }

//     // Parse raw body to JSON
//     const payload = JSON.parse(req.body.toString());

//     if (payload.event === "payment.captured") {
//       const payment = payload.payload.payment.entity;
//       // Instead of relying on metadata, fetch the order using Razorpay order's receipt.
//       const razorpayOrder = await razorpay.orders.fetch(payment.order_id);
//       const orderId = razorpayOrder.receipt; // this is our local Order _id

//       if (!orderId) {
//         return res.status(400).json({ message: "Invalid receipt from Razorpay" });
//       }

//       const order = await Order.findById(orderId);
//       if (!order) {
//         return res.status(404).json({ message: "Order not found" });
//       }

//       order.status = "paid";
//       order.totalAmount = payment.amount/100 ; // convert paise to INR
//       await order.save();
//     }

//     return res.status(200).json({ received: true });
//   } catch (err) {
//     console.error("❌ Error processing Razorpay webhook:", err);
//     return res.status(500).json({ message: "Webhook processing failed" });
//   }
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   razorpayWebhookHandler,
// };





import Razorpay from "razorpay";
import { Request, Response } from "express";
import crypto from "crypto";
import Restaurant from "../models/restaurant";
import Order from "../models/order";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET as string;

/**
 * Fetch all orders for the logged-in user
 */
const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const orders = await Order.find({ user: userId })
      .populate("restaurant")
      .populate("user");
    return res.status(200).json(orders);
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    return res.status(500).json({ message: "Unable to fetch user orders." });
  }
};

/**
 * Create a Razorpay order
 */
const createRazorpayOrder = async (
  amountInPaise: number,
  orderId: string,
  restaurantId: string
) => {
  try {
    const orderData = {
      amount: amountInPaise,
      currency: "INR",
      receipt: orderId,
      payment_capture: 1,
      notes: {
        orderId,
        restaurantId,
      },
    };
    return await razorpay.orders.create(orderData);
  } catch (err) {
    console.error("❌ Failed to create Razorpay order:", err);
    throw new Error("Razorpay order creation failed");
  }
};

/**
 * Create a new checkout session using price from frontend (in INR)
 */
const createCheckoutSession = async (req: Request, res: Response) => {
  console.log("🔥 Backend reached createCheckoutSession");

  try {
    const { cartItems, deliveryDetails, restaurantId, totalAmount } = req.body;

    console.log("📥 Received cartItems from frontend:", cartItems);
    console.log("💰 Total amount from frontend (₹):", totalAmount);

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const order = new Order({
      restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails,
      cartItems,
      totalAmount, // already in INR
      createdAt: new Date(),
    });

    // Create Razorpay order using totalAmount in INR -> convert to paise
    const razorpayOrder = await createRazorpayOrder(
      totalAmount * 100,
      order._id.toString(),
      restaurant._id.toString()
    );

    if (!razorpayOrder) {
      return res.status(500).json({ message: "Error creating Razorpay order" });
    }

    await order.save();

    return res.status(201).json({
      order_id: razorpayOrder.id,
      amount: totalAmount * 100, // in paise
      currency: "INR",
      razorpayKey: process.env.RAZORPAY_KEY_ID,
      receipt: order._id.toString(),
    });
  } catch (err) {
    console.error("❌ Error creating Razorpay checkout session:", err);
    return res.status(500).json({ message: "Failed to create checkout session" });
  }
};

/**
 * Razorpay webhook handler
 */
const razorpayWebhookHandler = async (req: Request, res: Response) => {
  try {
    const signature = req.headers["x-razorpay-signature"] as string;
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(req.body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ message: "Invalid webhook signature" });
    }

    const payload = JSON.parse(req.body.toString());

    if (payload.event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const razorpayOrder = await razorpay.orders.fetch(payment.order_id);
      const orderId = razorpayOrder.receipt;

      if (!orderId) {
        return res.status(400).json({ message: "Invalid receipt from Razorpay" });
      }

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.status = "paid";
      order.totalAmount = payment.amount / 100; // convert from paise to INR
      await order.save();
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("❌ Error processing Razorpay webhook:", err);
    return res.status(500).json({ message: "Webhook processing failed" });
  }
};

export default {
  getMyOrders,
  createCheckoutSession,
  razorpayWebhookHandler,
};
