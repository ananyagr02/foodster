"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Razorpay = __importDefault(require("razorpay"));
const restaurant_1 = __importDefault(require("../models/restaurant"));
const order_1 = __importDefault(require("../models/order"));

// Initialize Razorpay instance
const RAZORPAY = new Razorpay.default({
    key_id: process.env.RAZORPAY_KEY_ID,  // Your Razorpay key_id
    key_secret: process.env.RAZORPAY_KEY_SECRET,  // Your Razorpay key_secret
});

const FRONTEND_URL = process.env.FRONTEND_URL;
const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET;

const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield order_1.default.find({ user: req.userId })
            .populate("restaurant")
            .populate("user");
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "something went wrong" });
    }
});

// Handle Razorpay webhook events
const razorpayWebhookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let event;
    try {
        const sig = req.headers["x-razorpay-signature"];
        event = RAZORPAY.webhooks.verifySignature(req.body, sig, RAZORPAY_WEBHOOK_SECRET);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }

    if (event.event === "payment.captured") {
        const order = yield order_1.default.findById(event.payload.payment.entity.metadata?.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.totalAmount = event.payload.payment.entity.amount / 100; // Razorpay sends amount in paise
        order.status = "paid";
        yield order.save();
    }

    res.status(200).send();
});

// Create Razorpay checkout session
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkoutSessionRequest = req.body;
        const restaurant = yield restaurant_1.default.findById(checkoutSessionRequest.restaurantId);
        if (!restaurant) {
            throw new Error("Restaurant not found");
        }

        const newOrder = new order_1.default({
            restaurant: restaurant,
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            createdAt: new Date(),
        });

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems);

        const session = yield createSession(lineItems, newOrder._id.toString(), restaurant.deliveryPrice, restaurant._id.toString());

        if (!session) {
            return res.status(500).json({ message: "Error creating Razorpay session" });
        }

        yield newOrder.save();
        res.json({ url: session.longurl });  // Razorpay returns a longurl for the checkout page
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
});

// Create line items for the Razorpay checkout session
const createLineItems = (checkoutSessionRequest, menuItems) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString());
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
const createSession = (lineItems, orderId, deliveryPrice, restaurantId) => __awaiter(void 0, void 0, void 0, function* () {
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
        const razorpayOrder = yield RAZORPAY.orders.create(orderData);

        return razorpayOrder;
    }
    catch (error) {
        console.log(error);
        throw new Error("Error creating Razorpay order");
    }
});

exports.default = {
    getMyOrders,
    createCheckoutSession,
    razorpayWebhookHandler,
};
