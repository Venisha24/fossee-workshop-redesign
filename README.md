# 🚀 FOSSEE Workshop Booking Portal — React Redesign

**Screening Task for the FOSSEE Summer Internship 2025 at IIT Bombay**

---

## 📖 Overview

The original site is a Django app handling workshop bookings between Coordinators (colleges) and FOSSEE Instructors.

> ⚠️ **Mission:** Redesign the frontend in React while maintaining all original pages, flows, and business logic, but with a modern UI/UX overhaul.

---

🛠️ Setup & Demo  

Clone the Repository  
```bash
git clone https://github.com/Venisha24/fossee-workshop-redesign
cd fossee_v3

Install Dependencies

npm install

Run the App

npm run dev

🌐 Access the App

➜ Local: http://localhost:5173/

➜ Network: http://10.224.68.251:5173/

🔑 Demo Credentials

Role, Email, Password
Coordinator, riya@example.com
, 123456
Instructor, prabhu@iitb.ac.in
, 123456

🗺️ Page Structure

Route, Page, Features
/, Home, Stats + featured workshops + workflow guide
/workshops, List, URL-synced filters (Type, State, Level, Status)
/workshops/:id, Detail, Booking form in sidebar
/login, Auth, Real-time validation
/dashboard, Portal, Role-based views

💡 Design & Implementation

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

⚡ UX Enhancements

Sticky filter bar
Contextual booking UI
Modular dashboard navigation
Real-time feedback (validation + loading states)

🚧 Challenges & Solutions

(To be expanded)

🚀 Future Roadmap

[ ] Mobile bottom navigation
[ ] Real API integration
[ ] Interactive maps (Leaflet.js)
[ ] Infinite scroll / pagination

📜 Development Log

Built from scratch
Original component architecture and UX flows
Django backend used only for data modeling reference

📄 License

GPL-3.0
