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

# Before and After Screenshots
## Before
## After
<img width="415" height="394" alt="Screenshot 2026-04-13 000000" src="https://github.com/user-attachments/assets/31a76737-45fd-4e78-980c-22d3cc32a3bb" />
<img width="817" height="816" alt="Screenshot 2026-04-13 000037" src="https://github.com/user-attachments/assets/b5319e71-e8da-4e30-b997-4e4577a65651" />
<img width="1436" height="906" alt="Screenshot 2026-04-13 000115" src="https://github.com/user-attachments/assets/e2fa33e4-4cb0-4b22-b7f9-560d8d32ae65" />
<img width="1881" height="907" alt="Screenshot 2026-04-13 000236" src="https://github.com/user-attachments/assets/0b7c99ae-e88b-4fd4-81b6-e00e6f7e994a" />
<img width="1231" height="905" alt="Screenshot 2026-04-13 000206" src="https://github.com/user-attachments/assets/6cfd0162-8689-4adf-af3b-b57a61976305" />
<img width="1843" height="834" alt="image" src="https://github.com/user-attachments/assets/99b35e1f-7f20-4dfe-a4e9-3478d40e9dc1" />







## Originality Note: 
This project was built from scratch. Component architecture, design systems, and UX flows are original works, referencing the original Django logic only for data modeling.

# License: GPL-3.0
