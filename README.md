# 🎭 Mano India – Premium Event Management Platform

![Mano India Banner](https://via.placeholder.com/1200x400?text=Mano+India+Event+Platform)

> **The ultimate platform to book top-tier artists, venues, and culinary experts for your grand events.**  
> *Seamlessly connecting users with verified service providers for weddings, corporate events, and parties.*

---

## 📖 Table of Contents
- [✨ Features](#-features)
- [🛠 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [🚀 Getting Started](#-getting-started)

- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)

---

## ✨ Features

### 👤 User Features
- **Seamless Booking**: Browse and book Artists, Venues, and Caterers with ease.
- **Secure Payments**: Integrated **Razorpay** gateway for safe and secure transactions.
- **User Dashboard**: Manage bookings, view payment history, and track event status.
- **Profile Management**: Easy-to-use profile settings and preference management.

### 🎭 Vendor (Artist/Venue) Features
- **Dedicated Dashboards**: Artists and Venue owners have their own panels to manage profile details.
- **Availability Management**: Set available dates and manage booking requests.
- **Portfolio Showcase**: Upload high-quality images and videos (powered by **Cloudinary**) to attract clients.
- **Earnings Tracking**: Monitor income and payout status.

### 🛡 Admin Features
- **Centralized Control**: comprehensive admin dashboard to oversee all platform activities.
- **User & Vendor Management**: Verify, approve, or ban users and vendors.
- **Booking Oversight**: Monitor all bookings and payment flows.
- **Analytics**: view platform performance and user growth.

---

## 🛠 Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

- **Framework**: React.js (Vite) for blazing fast performance.
- **Styling**: Tailwind CSS for a modern, responsive, and "Royal Black & Gold" aesthetic.
- **State Management**: Context API & React Hooks.
- **Routing**: React Router DOM v6.
- **SEO**: React Helmet Async for dynamic meta tags.

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

- **Runtime**: Node.js.
- **Framework**: Express.js for RESTful API architecture.
- **Database**: MongoDB (Mongoose ODM) for scalable data storage.
- **Authentication**: JWT (JSON Web Tokens) & BcryptJS for secure login.
- **Media Storage**: Cloudinary for optimized image and video hosting.
- **Emails**: Nodemailer for transactional emails (OTP, welcome, bookings).
- **Payments**: Razorpay integration.

---

## 📂 Project Structure

```bash
Mano-india-website/
├── frontend/              # React Frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Application pages
│   │   ├── dashboards/    # Dashboard views (User, Artist, Venue)
│   │   ├── assets/        # Images and styles
│   │   ├── App.jsx        # Main App component
│   │   └── main.jsx       # Entry point
│   └── vite.config.js     # Vite configuration
│
├── backend/               # Node.js Backend
│   ├── src/
│   │   ├── config/        # DB and Service configs
│   │   ├── controllers/   # Route logic
│   │   ├── models/        # Mongoose/DB Models
│   │   ├── routes/        # API Routes
│   │   ├── middleware/    # Auth and Upload middleware
│   │   └── utils/         # Helper functions
│   ├── server.js          # App entry point
│   └── package.json       # Backend dependencies
│
└── README.md              # Project Documentation
```

---

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Local or Atlas URI)
- **Git**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/nilesh7651/Mano-india-website.git
cd Mano-india-website
```

### 2️⃣ Backend Setup
Navigate to the backend folder and install dependencies:
```bash
cd backend
npm install
```
Start the server:
```bash
npm run dev
# Server runs on http://localhost:5000
```

### 3️⃣ Frontend Setup
Open a new terminal, navigate to the frontend folder:
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
# App runs on http://localhost:5173
```

---



---

## 🤝 Contributing

Contributions are always welcome! If you'd like to improve the project:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

## 📞 Contact

**Nilesh Kumar**  
📧 nileshsingh7651@gmail.com  
🔗 [LinkedIn](https://www.linkedin.com/in/nilesh-kumar-singh) | [GitHub](https://github.com/nilesh7651)

---

*Made with ❤️ for Indian Events.*
