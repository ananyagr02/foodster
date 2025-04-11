import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controllers/OrderController";

const router = express.Router();

//  Fetch logged-in user's orders
router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);

// //  Create a Razorpay checkout session
// router.post(
//   "/checkout/create-checkout-session",
//   jwtCheck,
//   jwtParse,
//   OrderController.createCheckoutSession
// );

//  Razorpay webhook endpoint (no auth, must remain raw)
router.post("/checkout/webhook", OrderController.razorpayWebhookHandler);

export default router;
