# 🚀 FOSSEE Workshop Booking Portal — React Redesign

**Screening Task for the FOSSEE Summer Internship 2025 at IIT Bombay**

---

## 📖 Overview

The original site is a Django app handling workshop bookings between Coordinators (colleges) and FOSSEE Instructors.

> ⚠️ **Mission:** Redesign the frontend in React while maintaining all original pages, flows, and business logic, but with a modern UI/UX overhaul.

---

## 🛠️ Setup & Demo  

Clone the Repository  
```bash
git clone https://github.com/Venisha24/fossee-workshop-redesign
cd fossee_v3

## Install Dependencies

npm install

Run the App

npm run dev

## 🌐 Access the App

➜ Local: http://localhost:5173/

➜ Network: http://10.224.68.251:5173/

## 🔑 Demo Credentials

Role,        Email,            Password
Coordinator, riya@example.com, 123456
Instructor, prabhu@iitb.ac.in, 123456

## 🗺️ Page Structure

Route,          Page,            Features
/,              Home,            Stats + featured workshops + workflow guide
/workshops,     List,            URL-synced filters (Type, State, Level, Status)
/workshops/:id, Detail,          Booking form in sidebar
/login,         Auth,            Real-time validation
/dashboard,     Portal,          Role-based views

## 💡 Design & Implementation

● What design principles guided your improvements?
I prioritized hierarchy before decoration. The layout guides the eye naturally:
Workshop Title → Date → Seats → Book Button.
Used a warm off-white (#f5f4f0) with a dark orange accent (#d4622a) for readability.

● How did you ensure responsiveness?
Followed a mobile-first approach. Sidebar stacks below content and forms expand to full width on smaller screens.

● What trade-offs did you make between design and performance?
Sidebar booking improves UX but increases complexity.
Used lightweight validation instead of heavy libraries to keep performance fast.

● What was the most challenging part of the task?
Syncing URL parameters with filters using useSearchParams.
The URL acts as the source of truth, enabling shareable filtered links.

## ⚡ UX Enhancements

Sticky filter bar
Contextual booking UI
Modular dashboard navigation
Real-time feedback (validation + loading states)

## 🚧 Challenges & Solutions

<details>

Navigation Logic: Chose <Navigate> component over useNavigate hook for auth-guarding to trigger redirects during the render cycle.

Component Architecture: Managed a shared AuthContext to handle login/signup/logout states across the application.

Mock Data Mapping: Structured the mock arrays to mirror the original Django database models exactly.

</details>

## 🚀 Future Roadmap

[ ] Mobile bottom navigation
[ ] Real API integration
[ ] Interactive maps (Leaflet.js)
[ ] Infinite scroll / pagination

## 📜 Development Log
<details>

init: scaffold Vite + React + React Router
feat: add mock data matching FOSSEE Django models
feat: add AuthContext for login/signup/logout state
feat: global CSS — tokens, layout, form, button, card styles
feat: Navbar with mobile hamburger and auth-aware links
feat: WorkshopCard component with capacity bar
feat: Home page — hero, featured workshops, how-it-works, CTA
feat: WorkshopList page — search + multi-filter + URL sync
feat: WorkshopDetail page — meta grid, inline booking form
feat: Dashboard — overview, bookings, propose form, profile tab
fix: mobile layout for detail page and dashboard
docs: README with decisions, challenges, and mandatory Q&A

</details>

Originality Note: This project was built from scratch. Component architecture, design systems, and UX flows are original works, referencing the original Django logic only for data modeling.

License: GPL-3.0
