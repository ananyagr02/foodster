# 🍔 Foodster – Food Ordering Platform

**Foodster** is a sleek, full-stack web application for discovering restaurants, browsing menus, customizing orders, and securely checking out with Razorpay. It combines a smooth user experience with modern development best practices and real-time features.

---

## 🚀 Features

### 🛍️ User Experience
- 🔍 **Browse Restaurants** – View detailed restaurant profiles and featured dishes.
- 📋 **Dynamic Menus** – Browse categorized menu items.
- 🛒 **Smart Cart Management** – Add/remove items with quantity controls, saved in session storage.
- 👤 **Auth0 Authentication** – Secure login/signup using Auth0.
- 📦 **Order Summary** – Real-time summary of cart items, total price, and delivery details.
- 🧾 **User Profile Integration** – Auto-fill delivery form using saved profile data.
- 💳 **Razorpay Payment Gateway** – Seamless payment integration with live checkout.
- 📬 **Order Confirmation Page** – Redirects to order status  page post-payment.
- 🔄 **Live Order Fetching** – Orders auto-refresh using `react-query`'s `refetchInterval`.

---

## ⚙️ Tech Stack

### 🧠 Frontend
- **React + Vite** – Lightning-fast, modular frontend.
- **Tailwind CSS** – Utility-first, responsive styling.
- **TypeScript** – Strong typing and scalable codebase.
- **React Query** – Efficient server state management.
- **Auth0** – Secure authentication system.
- **Razorpay Web SDK** – Embedded payment experience.

### 🧰 Backend (Node.js/Express)
- **Express.js** – REST API server.
- **MongoDB** – NoSQL database with Mongoose ODM.
- **JWT Middleware** – Token-based auth with route protection.
- **Multer** – File upload middleware for future scalability (like receipts).
- **CORS** – Security best practices.

---

## 📦 API Endpoints

### 🔐 Auth APIs
| Method | Endpoint        | Description              |
|--------|------------------|--------------------------|
| GET    | `/api/my/user`   | Fetch current user info  |
| PUT    | `/api/my/user`   | Update user profile      |

### 🍽️ Restaurant APIs
| Method | Endpoint                  | Description                  |
|--------|----------------------------|------------------------------|
| GET    | `/api/restaurant/:id`     | Fetch a restaurant by ID     |
| GET    | `/api/restaurant`         | List all available restaurants |

### 🛒 Order APIs
| Method | Endpoint                                      | Description                                 |
|--------|-----------------------------------------------|---------------------------------------------|
| GET    | `/api/order`                                  | Get all orders for the logged-in user       |
| POST   | `/api/order/checkout/create-checkout-session` | Create Razorpay order and initiate checkout |

---

## 📄 Environment Variables

Create a `.env` file at the root of your project and set:

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
