

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
import Razorpay from "razorpay";
import { Request, Response } from "express";
import Restaurant from "../models/restaurant";
import Order from "../models/order";
import crypto from "crypto";

// Initialize Razorpay instance (in dev mode)
const RAZORPAY = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,
});

const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

/**
 * Fetch user orders
 */
const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

/**
 * Handle Razorpay webhook events (for dummy transactions)
 */
const razorpayWebhookHandler = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const sigHeader = req.headers["x-razorpay-signature"] as string;

    // Validate the webhook signature
    const generatedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(JSON.stringify(payload))
      .digest("hex");

    if (generatedSignature !== sigHeader) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    // Simulate payment success for "payment.captured" event
    if (payload.event === "payment.captured") {
      const paymentEntity = payload.payload.payment.entity;
      const order = await Order.findById(paymentEntity.metadata?.orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.totalAmount = paymentEntity.amount / 100; // Convert paise to INR
      order.status = "paid"; // Mark order as paid
      await order.save();
    }

    res.status(200).send();
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ message: "Webhook processing failed" });
  }
};

/**
 * Create Razorpay checkout session (dummy mode)
 */
const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { cartItems, deliveryDetails, restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const lineItems = createLineItems(cartItems, restaurant.menuItems);
    const orderTotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
    const deliveryPrice = restaurant.deliveryPrice * 100; // Convert to paise

    const newOrder = new Order({
      restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails,
      cartItems,
      createdAt: new Date(),
    });

    const razorpayOrder = await createRazorpayOrder(
      orderTotal + deliveryPrice,
      newOrder._id.toString(),
      restaurant._id.toString()
    );

    if (!razorpayOrder) {
      return res.status(500).json({ message: "Error creating Razorpay order" });
    }

    await newOrder.save();

    // Return the Razorpay test mode checkout URL
    res.json({
      url: `https://checkout.razorpay.com/v1/checkout.js?order_id=${razorpayOrder.id}`,
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ message: "Failed to create checkout session" });
  }
};

/**
 * Create line items for Razorpay order
 */
const createLineItems = (cartItems: any[], menuItems: any[]) => {
  return cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    return {
      name: menuItem.name,
      amount: menuItem.price * 100, // Convert to paise
      currency: "INR",
      quantity: parseInt(cartItem.quantity),
    };
  });
};

/**
 * Create Razorpay order (dummy mode)
 */
const createRazorpayOrder = async (
  amount: number,
  orderId: string,
  restaurantId: string
) => {
  try {
    const orderData = {
      amount,
      currency: "INR",
      receipt: orderId,
      payment_capture: 1, // Auto-capture payment
      notes: {
        orderId,
        restaurantId,
      },
    };

    return await RAZORPAY.orders.create(orderData); // Razorpay's test mode will simulate this
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    throw new Error("Failed to create Razorpay order");
  }
};

export default {
  getMyOrders,
  createCheckoutSession,
  razorpayWebhookHandler,
};
