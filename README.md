# 🛒 E-Commerce Platform (Full-Stack)

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

แพลตฟอร์ม E-Commerce แบบ Full-Stack ที่พัฒนาด้วย **PERN Stack** (PostgreSQL, Express, React, Node.js) รองรับการจัดการสินค้า ตะกร้าสินค้า และระบบชำระเงินจริงผ่าน Stripe พร้อมระบบ Back-office สำหรับผู้ดูแลระบบ

## 🚀 Live Demo

- **Frontend (Vercel):** [Click to Visit](https://e-commerce-market-place-nine.vercel.app/)
- **Backend API (Render):** [API Documentation](https://my-ecommerce-api-p5zj.onrender.com)
  > _Note: Backend Base URL. Try accessing endpoints like `/api/products/10` to see data._

---

## 🛠 Tech Stack

### Frontend (Client)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-State_Management-orange?style=for-the-badge)
![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge&logo=radix-ui&logoColor=white)

- **Core:** React (Vite), React Router DOM
- **State Management:** Zustand
- **UI/UX:** Lucide React, Framer Motion, Radix UI Themes, RC Slider, SweetAlert2, Sonner
- **Forms & Validation:** React Hook Form, Zod
- **Data Handling:** Lodash, Numeral, Moment

### Backend (Server)

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=3ECF8E)

- **Runtime:** Node.js
- **Database:** PostgreSQL (Hosted on Supabase)
- **ORM:** Prisma
- **Cloud Storage:** Cloudinary (สำหรับจัดเก็บและจัดการรูปภาพสินค้า)

### Deployment

- **Client:** Vercel
- **Server:** Render
- **Database:** Supabase

---

## ✨ Features (ฟีเจอร์หลัก)

### 👤 User Functionality

- **Authentication:**
  - Login / Register / Logout
  - Google OAuth Login (Coming soon/Implemented)
  - Remember Me & Forgot Password
- **Shopping Experience:**
  - ค้นหาและกรองสินค้า (Search, Filter by Category/Price Range)
  - เรียงลำดับสินค้า (Sort by)
  - ดูสินค้ามาใหม่ (New Arrival Highlight 14 days)
  - จัดการตะกร้าสินค้า (Add/Remove items)
- **Checkout & Payment:**
  - ระบบชำระเงินผ่าน **Stripe Payment Gateway** (Credit Card Test Mode)
- **Profile:**
  - ดูประวัติการสั่งซื้อ (Order History)

### 🛡️ Admin Dashboard

- **Overview:** ดูภาพรวมยอดขายและสถานะต่างๆ
- **Product Management (CRUD):** เพิ่ม ลบ แก้ไข รายละเอียดสินค้า และอัปโหลดรูปภาพ
- **Category Management:** จัดการหมวดหมู่สินค้า
- **Order Management:**
  - ดูรายการสั่งซื้อล่าสุด
  - อัปเดตสถานะการจัดส่ง (Processing, Completed)
- **User Management:**
  - จัดการสิทธิ์ผู้ใช้งาน (Change Role: User/Admin)
  - เปิด/ปิด การใช้งาน User (Enable/Disable)

---

## 🗂 Database Schema

ออกแบบฐานข้อมูลโดยเน้นความสัมพันธ์แบบ Relational Database (RDBMS) ผ่าน **Prisma ORM**

```mermaid
erDiagram
    USER ||--o{ ORDER : places
    USER ||--o{ CART : has
    USER {
        int id PK
        string email
        string role "default: user"
        string address
    }

    PRODUCT ||--o{ PRODUCT_ON_ORDER : "is in"
    PRODUCT ||--o{ PRODUCT_ON_CART : "is in"
    PRODUCT ||--o{ IMAGE : has
    PRODUCT }|..|{ CATEGORY : belongs_to
    PRODUCT {
        int id PK
        string title
        float price
        int quantity
        int sold
    }

    ORDER ||--o{ PRODUCT_ON_ORDER : contains
    ORDER {
        int id PK
        string orderStatus
        float orderTotal
        string stripePaymentId
    }

    CART ||--o{ PRODUCT_ON_CART : contains
    CART {
        int id PK
        float cartTotal
    }
```

## 📸 Screenshots

### 🏠 Landing Page & Shopping

หน้าแรกที่ออกแบบมาอย่างทันสมัย พร้อม Banner "Discover Future Tech" และระบบตะกร้าสินค้าแบบ Drawer ที่ใช้งานง่าย

|                               Landing Page                                |                                  Shopping Cart                                  |
| :-----------------------------------------------------------------------: | :-----------------------------------------------------------------------------: |
| <img src="client/src/assets/Home-page.png" width="200" alt="Home Banner"> | <img src="client/src/assets/shopping-cart.png" width="200" alt="Shopping Cart"> |

### 🔐 Authentication System

ระบบสมาชิกที่ครบครัน ทั้งการเข้าสู่ระบบ สมัครสมาชิก และกู้คืนรหัสผ่าน

|                                Login                                 |                                  Register                                  |                                   Forgot Password                                   |
| :------------------------------------------------------------------: | :------------------------------------------------------------------------: | :---------------------------------------------------------------------------------: |
| <img src="client/src/assets/login.png" width="200" alt="Login Page"> | <img src="client/src/assets/register.png" width="200" alt="Register Page"> | <img src="client/src/assets/forgot-password.png" width="200" alt="Forgot Password"> |

### 🛡️ Admin & User Panel

เมนูจัดการสำหรับ Admin ที่เข้าถึง Dashboard และจัดการข้อมูลต่างๆ ได้สะดวกรวดเร็ว

<img src="client/src/assets/Dashboardadmin.png" width="250" alt="Admin Menu">

---

### 📂 Folder Structure

โครงสร้างไฟล์ของโปรเจกต์ แบ่งเป็นส่วน Client และ Server อย่างชัดเจน

```bash
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/ # Reusable UI Components
│ │ ├── pages/ # Application Pages
│ │ ├── store/ # Zustand State Management
│ │ └── utils/ # Helper Functions
│ └── ...
├── server/ # Backend (Node.js + Express)
│ ├── controllers/ # Business Logic
│ ├── routes/ # API Endpoints
│ ├── prisma/ # Database Schema
│ └── ...
└── README.md
```

---

## ⚙️ Installation & Getting Started

วิธีรันโปรเจกต์นี้ในเครื่องของคุณ (Local Development)

### Prerequisites

- Node.js (v18+)
- PostgreSQL Database

### 1. Clone & Setup Backend

```bash
git clone [https://github.com/chopchobs/e-commerce-market-place.git]
cd server
npm install
```

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
CLOUDINARY_URL="cloudinary://..."
STRIPE_SECRET_KEY="sk_test_..."
```

### 2. รัน Server:

```bash
npx prisma generate
npx prisma db push
npm run dev

cd client
npm install
npm run dev
```

---

### 🚀 Future Improvements

```bash
สิ่งที่วางแผนจะพัฒนาต่อในอนาคต:

[ ] เพิ่มระบบ Dark Mode / Light Mode

[ ] ระบบแจ้งเตือนผ่าน Email (Nodemailer) เมื่อสั่งซื้อสำเร็จ

[ ] ระบบ Review และ Rating สินค้า

[ ] Unit Testing สำหรับ API
```

## 👨‍💻 Author

**[ชื่อของคุณ ภาษาอังกฤษ]**

- 💼 **LinkedIn:**[ \[ LinkedIn \]](https://www.linkedin.com/in/nattapon-sopontanapat-8b98832a5/)
- 🐙 **GitHub:** https://github.com/chopchobs
- 📧 **Email:** nattapon_Sopontanapat@hotmail.com

---
