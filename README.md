# 🍔 Foodster – Food Ordering Platform

**Foodster** is a sleek, full-stack web application for discovering restaurants in Indian cities, browsing menus, customizing orders, and securely checking out with Razorpay. It combines a smooth user experience with modern development best practices and real-time features.

---

## 🚀 Features
## 🛍️ User Experience

- 👤 **Auth0 Authentication**  
  Secure login/signup system powered by Auth0, with **Google sign-in** support.
  
- 🔍 **Browse Restaurants**  
  View detailed restaurant profiles from each selected city with restaurant images stored securely and served from **Cloudinary** for faster loading and optimized performance.

- 🧭 **Advanced Restaurant Discovery**
  Faceted search catering:
  - Filter by **cuisines**  
  - Sort by **Delivery price**, **Best match**, or **Delivery time**  
  - Toggle **vegetarian** / **non-vegetarian** options  
  - **Search** restaurants by name or cuisine

- 📋 **Dynamic Menus**  
  Explore menu items with ease for every restaurant.

- 🛒 **Smart Cart Management**  
  Add or remove items with quantity controls, with state saved in **session storage** for persistent cart experience.

- 📦 **Order Summary**  
  Get a real-time summary of all cart items, pricing, and delivery info before checkout.

- 🧾 **User Profile Integration**  
  Automatically fill delivery forms using saved user profile data.

- 💳 **Razorpay Payment Gateway**  
  Smooth and secure payments using **Razorpay**, integrated with live checkout experience.

- 🔄 **Live Order Fetching**  
  Instantly redirected to order status page with updates in real time using `react-query`’s `refetchInterval`.


## ⚙️ Tech Stack

### 🖼️ Frontend
- **React + Vite** – Lightning-fast, modular frontend.
- **Tailwind CSS** – Utility-first, responsive styling.
- **TypeScript** – Strong typing and scalable codebase.
- **React Query** – Efficient server state management.
- **Auth0** – Secure authentication system.
- **Razorpay Web SDK** – Embedded payment experience.

### 🖥️ Backend (Node.js/Express)
- **Express.js** – REST API server.
- **MongoDB** – NoSQL database with Mongoose ODM.
- **JWT Middleware** – Token-based auth with route protection.
- **Multer** – File upload middleware for future scalability (like receipts).
- **CORS** – Security best practices.

---
## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ananyagr02/foodster.git
cd foodster
```

### 2. Set Up Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Set Up Frontend

```bash
cd frontend
npm install
npm run dev
```

## 🔐 Environment Variables

Make sure to create a `.env` file in both `frontend/` and `backend/` directories with the following variables:

### 📦 Backend `.env`
```env
PORT=7000
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
AUTH0_DOMAIN=your_auth0_domain
AUTH0_AUDIENCE=your_auth0_audience
AUTH0_ISSUER_BASE_URL=your_auth0_baseURL
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
FRONTEND_URL=http://localhost:5173/
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### 💻 Frontend `.env`
```env
VITE_API_BASE_URL=http://localhost:7000
VITE_AUTH0_AUDIENCE=your_auth0_audience
VITE_AUTH0_CALLBACK_URL=http://localhost:5173/
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
VITE_RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

> ⚠️ Make sure `VITE_AUTH0_CALLBACK_URL` matches what you've set in the Auth0 dashboard. If deploying to production, update it accordingly.

