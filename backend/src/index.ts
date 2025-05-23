// import express, { Request, Response } from "express";
// import cors from "cors";
// import "dotenv/config";
// import mongoose from "mongoose";
// import myUserRoute from "./routes/MyUserRoute";
// import { v2 as cloudinary } from "cloudinary";
// import myRestaurantRoute from "./routes/MyRestaurantRoute";
// import restaurantRoute from "./routes/RestaurantRoute";
// import orderRoute from "./routes/OrderRoute";

// mongoose
//   .connect(process.env.MONGODB_CONNECTION_STRING as string)
//   .then(() => console.log("Connected to database!"));

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();

// app.use(cors(
  
//   {
//     origin: ["https://food-ordering-platform.vercel.app/"],
//     methods:["POST", "GET"],
//     credentials: true
//   }
// ));

// app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// app.use(express.json());

// app.get("/health", async (req: Request, res: Response) => {
//   res.send({ message: "health OK!" });
// });

// app.use("/api/my/user", myUserRoute);
// app.use("/api/my/restaurant", myRestaurantRoute);
// app.use("/api/restaurant", restaurantRoute);
// app.use("/api/order", orderRoute);

// app.listen(7000, () => {
//   console.log("server started on localhost:7000");
// });



import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/MyUserRoute";
import { v2 as cloudinary } from "cloudinary";
import myRestaurantRoute from "./routes/MyRestaurantRoute";
import restaurantRoute from "./routes/RestaurantRoute";
import orderRoute from "./routes/OrderRoute";

// Database Connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => console.log("Connected to database!"))
  .catch((err) => console.error("Database connection error:", err));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// CORS Configuration

app.use(cors({
  origin: ["http://localhost:5173", "https://food-mern-23oh.onrender.com"], // allow both dev and deployed
}));//({
//   origin: [
//     "https://food-ordering-platform.vercel.app", 
//   ],
//   methods: ["POST", "GET", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   credentials: true
// })


// Handle Webhook Requests
app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

// Middleware
app.use(express.json());

// Health Check Route
app.get("/health", (req: Request, res: Response) => {
  res.send({ message: "Health OK!" });
});

// API Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

// Start Server
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
