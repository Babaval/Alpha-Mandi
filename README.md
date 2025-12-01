

🚀 Overview

Alpha Mandi is a fully interactive restaurant platform featuring:

Online ordering with a premium menu interface

Table reservation system

Secure authentication (email/password)

User profile management (avatar, name, tier, points, past orders)

Catering module

Cart & checkout flow

Full Dockerized production build served via Nginx

Deployable on Render, AWS, or any container platform

Built with modern web technologies to deliver a fast, responsive, premium experience.

⚡ Key Features
✔ Modern Landing Page (Hero Section)

Elegant gold-accented brand theme

Animated intro elements

Reserve Table / Order Online CTA buttons

✔ Menu System

Large menu display with category filtering

Add-to-cart with animations

Item quantity adjustments

✔ Shopping Cart Sidebar

Smooth sliding sidebar

Live total calculation

Remove / decrement / increment items

✔ Checkout + Order Confirmation

Real checkout flow

Stores order in Firebase Firestore

Displays confirmation

✔ Reservation System

Date, time & guest selection

Optional special requests

Reservation stored in database

Success screen animation

✔ User Authentication

Login / Register modal

Protected views (Reservations, Checkout, Profile)

Global user state with profile details

✔ Catering Request Section

Opens a modal to request event catering

Submits to Firestore

✔ AI Concierge

Floating support/assistant widget (UI ready)

✔ Fully Dockerized Production Build

Multi-stage Node build → Nginx hosting

Minimal image size

Suitable for any server

🧰 Technology Stack
Frontend

React (Vite)

TypeScript

TailwindCSS

Lucide Icons

Backend Services

Firebase Authentication

Firebase Firestore

Custom service wrappers (backendService.ts, emailService.ts, etc.)

Testing

Playwright (E2E automation)

Deployment

Docker

Render Cloud

Nginx

AWS CLI Ready

🏛 Project Architecture

Here is the architecture of the entire project:

 ┌──────────────────────────────────────────────────────────┐
 │                       Alpha Mandi                         │
 └──────────────────────────────────────────────────────────┘
             │
             ├── Frontend (React + Vite)
             │      ├── Components (UI, reservations, cart)
             │      ├── State (local component + props)
             │      ├── Firebase Auth integration
             │      └── Firestore CRUD via services/
             │
             ├── Backend (Firebase)
             │      ├── users → auth + profile
             │      ├── orders → checkout submissions
             │      ├── reservations → table booking
             │      └── catering-requests
             │
             ├── Testing Layer
             │      └── Playwright automated tests
             │
             └── Deployment Layer
                    ├── Docker multi-stage build
                    ├── Nginx production server
                    └── Cloud hosting (Render or AWS)

📂 Folder Structure
alpha-mandi/
│
├── components/
│   ├── AIConcierge.tsx
│   ├── AuthModal.tsx
│   ├── CartSidebar.tsx
│   ├── Catering.tsx
│   ├── Checkout.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HomeSections.tsx
│   ├── Menu.tsx
│   ├── Navigation.tsx
│   ├── Profile.tsx
│   ├── Reservations.tsx
│   ├── SplashScreen.tsx
│   └── TestingSuite.tsx
│
├── services/
│   ├── backendService.ts
│   ├── firebase.ts
│   ├── emailService.ts
│   └── geminiService.ts
│
├── dist/                 # Production build
├── tests/                # Playwright tests
├── Dockerfile
├── docker-compose.yml (optional)
├── index.html
├── App.tsx
├── types.ts
└── package.json

🔑 Environment Variables

Create a file:

.env.local


Add:

VITE_FIREBASE_API_KEY=xxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxx
VITE_FIREBASE_PROJECT_ID=xxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxx
VITE_FIREBASE_APP_ID=xxxx

🖥 Running Locally
npm install
npm run dev


Your app runs on:

http://localhost:3000

🐳 Docker Setup & Deployment
1. Build the production app
npm run build

2. Build the Docker image
docker build -t alpha-mandi .

3. Run the container
docker run -p 8080:80 alpha-mandi


Website available at:

http://localhost:8080

☁️ Render Deployment
Steps:

Go to Render.com

Choose New Web Service

Pick “Deploy Docker Image”

Enter your Docker Hub image URL:

docker.io/<your-username>/alpha-mandi:latest


Deploy → Render builds & hosts automatically.

🔥 Firebase Setup
1. Create Firebase Project
2. Enable:

Authentication → Email/Password

Firestore Database

Storage (optional)

3. Create Firestore Collections:

users

orders

reservations

catering

🧱 Data Models
User
{
  name: string,
  email: string,
  phone?: string,
  avatar?: string,
  tier: "Gold" | "Silver" | "Bronze",
  points: number,
  orders: Order[]
}

Reservation
{
  name: string,
  date: string,
  time: string,
  guests: number,
  specialRequest?: string
}

Order
{
  items: CartItem[],
  total: number,
  status: "PENDING" | "CONFIRMED"
}

🧩 Component Documentation (Summary)
Navigation

Controls routing between views

Shows Login/Profile button

Shows Cart count

Home/Menu/Reservations buttons

Hero

Landing page banner

Reserve & Order buttons

Reservations

Complete booking UI

Calls createReservation()

Success screen after submission

CartSidebar

Slide-in cart

Quantity management

Checkout button

Checkout

Order summary

Firestore order submission

Profile

Shows past orders

Avatar, name editing

Logout

AI Concierge

Floating support widget

Catering

Modal for catering request

Submits to database

🚀 Future Improvements

Real payment gateway (Stripe)

Admin dashboard for orders/reservations

AI-powered menu recommendations

Multi-language support

Push notifications

Role-based access (Manager, Staff, Customer)

Kitchen Display System (KDS)

🏅 Credits
Project Author

Baba Vali Shaik

Role

Full-Stack Developer

UI/UX Designer

System Architect

DevOps (Docker, Render Deployment)

Technologies used

React + TypeScript

TailwindCSS

Firebase

Vite

Playwright

Docker

Nginx

Render Hosting

Special Notes

This project was built as a fully functional, production-style restaurant application demonstrating real-world architecture, deployment, and professional UI/UX.