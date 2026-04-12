# 🚀 FOSSEE Workshop Booking Portal — React Redesign

**Screening Task for the FOSSEE Summer Internship 2025 at IIT Bombay**

---

## 📖 Overview

The original site is a Django app handling workshop bookings between Coordinators (colleges) and FOSSEE Instructors.

> ⚠️ **Mission:** Redesign the frontend in React while maintaining all original pages, flows, and business logic, but with a modern UI/UX overhaul.

---

# 🛠️ Setup & Demo  
## Clone the repository
git clone https://github.com/Venisha24/fossee-workshop-redesign
cd fossee-workshop-booking
cd fossee_v3
## Install dependencies
npm install

## Start development server
npm run dev

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.224.68.251:5173/
  
Demo Credentials: instructor :- 📧 prabhu@iitb.ac.in /🔑 123456
                  coordinator :-📧 riya@example.com | 🔑 123456
                  
## 🗺️ Page Structure
Route              Page    Interactive Features
/                  Home    Stats, featured workshops, workflow guide
/workshops         List    URL-synced filters (Type, State, Level, Status)
/workshops/:id     Detail  Contextual booking form in sidebar
/login             Auth    Real-time form validation
/dashboard         Portal  Role-based views (Coordinator vs. Instructor)

# 💡 Design Decisions
## 🎨 Visual Identity
Warm Light Theme: Used #f5f4f0 (off-white) and #d4622a (FOSSEE orange).

Why? Better readability for Indian students on varying screen qualities compared to high-contrast dark modes.

## ⚡ UX Enhancements
[x] Sticky Filter Bar: Filters stay accessible while scrolling.

[x] URL Syncing: Search parameters are saved in the URL for easy sharing.

[x] Inline Booking: Form placed in the sidebar to keep workshop details visible.

[x] Modular Dashboard: Replaced long-scrolling pages with a tabbed sidebar navigation.

# 🚧 Challenges & Solutions
<details>

The require() call in Dashboard.jsx: Used to avoid circular dependencies with form sub-components. Note: Needs refactoring to standard imports for production.

Navigation Logic: Chose <Navigate> component over useNavigate hook for auth-guarding to trigger redirects during the render cycle.

Manual Validation: Opted for custom validation functions over libraries like Formik to keep the bundle light and dependencies clean for this task.

</details>

# 🚀 Future Roadmap
[ ] Mobile Bottom Nav: Replace the dashboard sidebar with a tab bar for better thumb-reach.

[ ] Real API Integration: Swap mock arrays for React Query hooks.

[ ] Interactive Maps: Re-introduce the India workshop map using Leaflet.js.

[ ] Infinite Scroll: Implement pagination for the workshop list.

📜 Development Log
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

docs: README with decisions, challenges, what I'd improve

</details>

## Originality Note: 
This project was built from scratch. Component architecture, design systems, and UX flows are original works, referencing the original Django logic only for data modeling.

# License: GPL-3.0
