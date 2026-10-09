# 🍽️ Cafe Boss — Full-Stack Restaurant Management Application

A modern, responsive, and feature-rich full-stack web application designed for restaurant management and food ordering. Built with the MERN stack, this project features secure user authentication, interactive client ordering, real-time booking management, payment processing, and a robust admin dashboard.

---

## 🚀 Live Demo & Repository Links

- **Live Website:** [[Insert Live Link Here](https://cafe-boss-client-ten.vercel.app/)]
- **Frontend Repository:** [[Insert Client Github Link Here](https://github.com/joynul24/cafe-boss-client)]
- **Backend Repository:** [[Insert Server Github Link Here](https://github.com/joynul24/cafe-boss-server)]

---

## ✨ Key Features

### 👨‍🍳 Client Features
* **Interactive Food Slider & Menu:** Browse food categories with animated carousels and organized category filtering.
* **Reservation & Table Booking:** Book tables with preferred dates and times, view booking status (Pending / Confirmed).
* **Shopping Cart & Checkout:** Add items to cart, review selected items, and proceed to secure checkout.
* **Review & Rating System:** Submit interactive star ratings and detailed feedback for recipes.
* **Order & Booking History:** Track personal reservations and past payment records in real-time.

### 🛡️ Admin Features
* **Manage All Bookings:** Review customer table reservations, confirm pending bookings, or delete records.
* **Menu Management:** Add, update, and delete menu items with dynamic image uploads via ImageBB API.
* **All Payments History:** Track overall platform revenue, individual transaction IDs, and user payments.
* **User Management:** Manage registered users and assign/revoke admin access permissions.

---

## 🛠️ Tech Stack & Tools

### **Frontend**
* **Framework:** React.js (Vite)
* **Styling:** Tailwind CSS, DaisyUI
* **State & Data Fetching:** TanStack Query (React Query)
* **Form Handling:** React Hook Form
* **UI/UX Components:** React Responsive Carousel, Swiper.js, SweetAlert2, Lucide React / React Icons

### **Backend & Database**
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB (Native Driver)
* **Authentication & Security:** Firebase Auth, JWT (JSON Web Tokens), CORS, Dotenv

---

## ⚡ Core Concepts Applied

* **Secure Authentication:** Implemented JWT-based route protection for both client and admin routes.
* **Optimized UX:** Reduced payload times using dynamic image hosting via ImageBB API and responsive design patterns (Table-to-Card transitions for mobile viewports).
* **Efficient Data Management:** Leveraged TanStack Query for cache management, optimistic updates, and instant data re-fetching.

---

## 📦 Local Installation & Setup

### Prerequisites
Make sure you have **Node.js** and **npm** installed on your machine.

### 1. Clone the Repository
```bash
git clone [https://github.com/joynul24/cafe-boss-client](https://github.com/joynul24/cafe-boss-client)
cd cafe-boss-client