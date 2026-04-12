# 🚀 FOSSEE Workshop Booking Portal — React Redesign

**Screening Task for the FOSSEE Summer Internship 2025 at IIT Bombay**

---

## 📖 Overview
The original platform is a Django-based system that manages workshop bookings between **Coordinators (colleges)** and **FOSSEE Instructors**.

> ⚠️ **Mission:**  
> Redesign the frontend using **React**, while preserving all existing pages, workflows, and business logic — but with a modern, intuitive UI/UX.

---

## 🛠️ Setup & Demo

### Clone the Repository
```bash
git clone https://github.com/Venisha24/fossee-workshop-redesign
cd fossee_v3

Install Dependencies
npm install
Run the App
npm run dev
🌐 Access the App
Local: http://localhost:5173/
Network: http://10.224.68.251:5173/
🔑 Demo Credentials
Role	Email	Password
Coordinator	riya@example.com
	123456
Instructor	prabhu@iitb.ac.in
	123456
🗺️ Page Structure
Route	Page	Features
/	Home	Stats, featured workshops, workflow guide
/workshops	List	URL-synced filters (Type, State, Level, Status)
/workshops/:id	Detail	Contextual booking form in sidebar
/login	Auth	Real-time form validation
/dashboard	Portal	Role-based views (Coordinator / Instructor)
💡 Design & Implementation
🎯 Design Principles
Focused on hierarchy before decoration
Clear visual flow:
Workshop Title → Date → Seats → Book Button
Color palette:
Warm off-white #f5f4f0
Dark orange accent #d4622a
Optimized readability for bright environments
📱 Responsiveness Strategy
Followed a mobile-first approach
Used min-width breakpoints for scaling
Key behaviors:
Sidebar stacks below content on small screens
Forms expand to full width for mobile usability
⚖️ Design vs Performance Trade-offs
Sidebar booking form improves UX but increases component complexity
Avoided heavy libraries → used lightweight validation functions
Result: faster load time + smaller bundle size
🧠 Biggest Challenge

Syncing URL Parameters with Complex Filters

Implemented using useSearchParams (React Router)
Treated URL as the single source of truth
Enabled:
Shareable filtered links
Consistent UI state
⚡ UX Enhancements
✅ Sticky Filter Bar (always accessible)
✅ Contextual Booking UI (no page switching)
✅ Modular Dashboard (sidebar navigation)
✅ Real-time Feedback (validation + loading states)
🚧 Challenges & Solutions

(Expand this section if needed — currently placeholder for future detail)

🚀 Future Roadmap
 Mobile Bottom Navigation (replace sidebar)
 Real API Integration (React Query)
 Interactive Maps (Leaflet.js)
 Infinite Scroll / Pagination
📜 Development Log
🔗 View commit history on GitHub
✨ Built from scratch with original:
Component architecture
Design system
UX flows
📌 Django backend used only for data modeling reference
📄 License

Licensed under GPL-3.0
