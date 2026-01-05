# 🎉 Mano India – Event Management & Organization Platform

![Mano India Banner](https://via.placeholder.com/1200x400?text=Mano+India+Event+Platform)  
*Streamlining event planning with seamless bookings for venues, artists, and culinary experts.*

---

## 📖 Table of Contents
- [Project Overview](#🚀-project-overview)
- [Key Features](#✨-key-features)
- [Tech Stack](#🛠-tech-stack)
- [Installation & Setup](#️️-installation--setup)
- [Project Structure](#📂-project-structure)
- [Future Roadmap](#🗺-future-roadmap)
- [Contributing](#🤝-contributing)
- [License](#📄-license)

---

## 🚀 Project Overview

**Mano India** is a comprehensive full-stack web application designed to simplify the complex process of event management. Whether organizing a wedding, corporate gala, or an intimate private gathering, Mano India serves as a centralized marketplace connecting hosts with verified service providers.

**The Problem:** Event planning typically involves fragmented communication with multiple uncoordinated vendors.  
**The Solution:** A unified platform where users can discover, compare, and book venues, artists, and catering professionals in a single workflow.

**Core Value Proposition:**
* **Centralized Booking:** Manage all event needs in one dashboard.
* **Verified Vendors:** Curated lists of cooks, performers, and venues.
* **Transparent Pricing:** Clear cost structures without hidden fees.

---

## ✨ Key Features

### 🟢 Current Implementation
* **Responsive UI/UX:** A mobile-first design ensuring accessibility across all devices, built with **Bootstrap 5** and **React**.
* **Service Discovery:** Dedicated landing pages for browsing Cooks, Artists, and Venues.
* **Fast Performance:** Optimized build and hot-reloading using **Vite**.
* **Component-Based Architecture:** Modular and reusable React components for scalability.

---

### 🟡 In Development / Planned
* **User Authentication:** Secure Login/Signup for Users and Vendors (JWT-based).
* **Booking Engine:** Real-time availability checks and slot reservation.
* **Vendor Dashboard:** Dedicated portal for service providers to manage their profiles and bookings.
* **Payment Gateway:** Secure online transactions via Razorpay/Stripe.
* **Review System:** User ratings and feedback for quality assurance.

---

## 🛠 Tech Stack

### Frontend
| Technology | Description |
| :--- | :--- |
| **React.js** | Component-based UI library |
| **Vite** | Next-generation frontend tooling for speed |
| **Bootstrap 5** | Responsive CSS framework |
| **JavaScript (ES6+)** | Core logic and interactivity |
| **CSS3** | Custom styling and animations |

### Backend (Architecture Planned)
| Technology | Description |
| :--- | :--- |
| **Node.js** | Runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL Database for flexible data schemas |
| **Mongoose** | ODM for MongoDB |
| **JWT** | JSON Web Tokens for secure authentication |

---

## ⚙️ Installation & Setup

Follow these steps to run the project locally on your machine.

### Prerequisites
* **Node.js** (v16.0.0 or higher)
* **npm** (v8.0.0 or higher) or **yarn**

### 1. Clone the Repository
```bash
git clone https://github.com/nilesh7651/Mano-india-website.git
cd Mano-india-website
```

### 2. Install Dependencies
Navigate to the frontend directory and install the required packages.

```bash
cd frontend
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root of the frontend directory:

```bash
VITE_API_URL=http://localhost:5000/api  # Example backend URL
```

### 4. Run the Application
Start the development server.

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173` (or the port shown in your terminal).

---

## 📂 Project Structure
A modular folder structure ensures scalability and maintainability.

```plaintext
Mano-india-website/
├── frontend/
│   ├── public/             # Static assets (favicons, robots.txt)
│   ├── src/
│   │   ├── assets/         # Images, logos, and fonts
│   │   ├── components/     # Reusable UI components (Navbar, Footer, Cards)
│   │   ├── pages/          # Route-specific pages (Home, Venues, Artists)
│   │   ├── context/        # Global state management (AuthContext, BookingContext)
│   │   ├── services/       # API service calls (Axios setup)
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Entry point DOM rendering
│   │   └── index.css       # Global styles
│   ├── index.html          # HTML template
│   ├── package.json        # Dependencies and scripts
│   └── vite.config.js      # Vite configuration
├── backend/ (Coming Soon)
└── README.md
```

---

## 🗺 Future Roadmap
- [x] Phase 1: Frontend UI Development & Architecture Setup
- [ ] Phase 2: Backend API Development & Database Schema Design
- [ ] Phase 3: Authentication & User Profile Management
- [ ] Phase 4: Booking System Logic & Vendor Integration
- [ ] Phase 5: Payment Gateway Integration & Deployment

---

## 🤝 Contributing
Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Contact & Support
Project Lead: Nilesh Kumar

GitHub: @nilesh7651

---

## 📄 License
This project is proprietary and intended for business purposes. Unauthorized copying or commercial use is strictly prohibited without permission.

Copyright © 2026 Mano India. All Rights Reserved.
