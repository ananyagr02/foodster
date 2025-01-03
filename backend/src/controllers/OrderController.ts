// import Stripe from "stripe";
// import { Request, Response } from "express";
// import Restaurant, { MenuItemType } from "../models/restaurant";
// import Order from "../models/order";

// const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
// const FRONTEND_URL = process.env.FRONTEND_URL as string;
// const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

// const getMyOrders = async (req: Request, res: Response) => {
//   try {
//     const orders = await Order.find({ user: req.userId })
//       .populate("restaurant")
//       .populate("user");

//     res.json(orders);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "something went wrong" });
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

// const stripeWebhookHandler = async (req: Request, res: Response) => {
//   let event;

//   try {
//     const sig = req.headers["stripe-signature"];
//     event = STRIPE.webhooks.constructEvent(
//       req.body,
//       sig as string,
//       STRIPE_ENDPOINT_SECRET
//     );
//   } catch (error: any) {
//     console.log(error);
//     return res.status(400).send(`Webhook error: ${error.message}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const order = await Order.findById(event.data.object.metadata?.orderId);

//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     order.totalAmount = event.data.object.amount_total;
//     order.status = "paid";

//     await order.save();
//   }

//   res.status(200).send();
// };

// const createCheckoutSession = async (req: Request, res: Response) => {
//   try {
//     const checkoutSessionRequest: CheckoutSessionRequest = req.body;

//     const restaurant = await Restaurant.findById(
//       checkoutSessionRequest.restaurantId
//     );

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

//     if (!session.url) {
//       return res.status(500).json({ message: "Error creating stripe session" });
//     }

//     await newOrder.save();
//     res.json({ url: session.url });
//   } catch (error: any) {
//     console.log(error);
//     res.status(500).json({ message: error.raw.message });
//   }
// };

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

//     const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
//       price_data: {
//         currency: "gbp",
//         unit_amount: menuItem.price,
//         product_data: {
//           name: menuItem.name,
//         },
//       },
//       quantity: parseInt(cartItem.quantity),
//     };

//     return line_item;
//   });

//   return lineItems;
// };

// const createSession = async (
//   lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
//   orderId: string,
//   deliveryPrice: number,
//   restaurantId: string
// ) => {
//   const sessionData = await STRIPE.checkout.sessions.create({
//     line_items: lineItems,
//     shipping_options: [
//       {
//         shipping_rate_data: {
//           display_name: "Delivery",
//           type: "fixed_amount",
//           fixed_amount: {
//             amount: deliveryPrice,
//             currency: "gbp",
//           },
//         },
//       },
//     ],
//     mode: "payment",
//     metadata: {
//       orderId,
//       restaurantId,
//     },
//     success_url: `${FRONTEND_URL}/order-status?success=true`,
//     cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
//   });

//   return sessionData;
// };

// export default {
//   getMyOrders,
//   createCheckoutSession,
//   stripeWebhookHandler,
// };




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


import Razorpay from "razorpay";
import { Request, Response } from "express";
import Restaurant, { MenuItemType } from "../models/restaurant";
import Order from "../models/order";
import crypto from "crypto";

// Initialize Razorpay instance
const RAZORPAY = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID as string,  // Your Razorpay key_id
  key_secret: process.env.RAZORPAY_KEY_SECRET as string,  // Your Razorpay key_secret
});

const FRONTEND_URL = process.env.FRONTEND_URL as string;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET as string;

// Get user orders
const getMyOrders = async (req: Request, res: Response) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

type CheckoutSessionRequest = {
  cartItems: {
    menuItemId: string;
    name: string;
    quantity: string;
  }[];
  deliveryDetails: {
    email: string;
    name: string;
    addressLine1: string;
    city: string;
  };
  restaurantId: string;
};

// Handle Razorpay webhook events
const razorpayWebhookHandler = async (req: Request, res: Response) => {
  const secret = RAZORPAY_WEBHOOK_SECRET;
  const payload = req.body;
  const sigHeader = req.headers["x-razorpay-signature"] as string;

  // Create a hash of the payload using the secret key
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex");

  if (generatedSignature === sigHeader) {
    // Signature is valid
    if (payload.event === "payment.captured") {
      const order = await Order.findById(payload.payload.payment.entity.metadata?.orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      order.totalAmount = payload.payload.payment.entity.amount / 100; // Razorpay sends amount in paise
      order.status = "paid";
      await order.save();
    }
    return res.status(200).send();
  } else {
    return res.status(400).send("Invalid signature");
  }
};

// Create Razorpay checkout session
const createCheckoutSession = async (req: Request, res: Response) => {
  try {
    const checkoutSessionRequest: CheckoutSessionRequest = req.body;

    const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId);

    if (!restaurant) {
      throw new Error("Restaurant not found");
    }

    const newOrder = new Order({
      restaurant: restaurant,
      user: req.userId,
      status: "placed",
      deliveryDetails: checkoutSessionRequest.deliveryDetails,
      cartItems: checkoutSessionRequest.cartItems,
      createdAt: new Date(),
    });

    const lineItems = createLineItems(
      checkoutSessionRequest,
      restaurant.menuItems
    );

    const session = await createSession(
      lineItems,
      newOrder._id.toString(),
      restaurant.deliveryPrice,
      restaurant._id.toString()
    );

    if (!session) {
      return res.status(500).json({ message: "Error creating Razorpay session" });
    }

    await newOrder.save();
    
    // Construct Razorpay checkout URL using the order ID
    const razorpayCheckoutUrl = `https://checkout.razorpay.com/v1/checkout.js?order_id=${session.id}`;

    res.json({ url: razorpayCheckoutUrl }); // Return the URL to redirect to Razorpay
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Create line items for the Razorpay checkout session
const createLineItems = (
  checkoutSessionRequest: CheckoutSessionRequest,
  menuItems: MenuItemType[]
) => {
  const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
    const menuItem = menuItems.find(
      (item) => item._id.toString() === cartItem.menuItemId.toString()
    );

    if (!menuItem) {
      throw new Error(`Menu item not found: ${cartItem.menuItemId}`);
    }

    const line_item = {
      name: menuItem.name,
      amount: menuItem.price * 100, // Razorpay requires amount in paise
      currency: "INR",
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });

  return lineItems;
};

// Create Razorpay checkout session
const createSession = async (
  lineItems: any[],
  orderId: string,
  deliveryPrice: number,
  restaurantId: string
) => {
  try {
    const orderData = {
      amount: lineItems.reduce((total, item) => total + item.amount, 0) + deliveryPrice * 100, // total price in paise
      currency: "INR",
      receipt: orderId,
      payment_capture: 1, // Automatically capture the payment
      notes: {
        orderId,
        restaurantId,
      },
    };

    // Create the Razorpay order
    const razorpayOrder = await RAZORPAY.orders.create(orderData);

    return razorpayOrder;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error creating Razorpay order");
  }
};

export default {
  getMyOrders,
  createCheckoutSession,
  razorpayWebhookHandler,
};
