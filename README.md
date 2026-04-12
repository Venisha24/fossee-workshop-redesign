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

### Install Dependencies

```bash
npm install
npm run dev

---

## 🌐 Access the App

- **Local:** http://localhost:5173/  
- **Network:** http://10.224.68.251:5173/

---

## 🔑 Demo Credentials

| Role        | Email              | Password |
|-------------|-------------------|----------|
| Coordinator | riya@example.com  | 123456   |
| Instructor  | prabhu@iitb.ac.in | 123456   |

---

## 🗺️ Page Structure

| Route            | Page    | Features |
|------------------|---------|----------|
| `/`              | Home    | Stats, featured workshops, workflow guide |
| `/workshops`     | List    | URL-synced filters (Type, State, Level, Status) |
| `/workshops/:id` | Detail  | Contextual booking form in sidebar |
| `/login`         | Auth    | Real-time form validation |
| `/dashboard`     | Portal  | Role-based views (Coordinator / Instructor) |

---

## 💡 Design & Implementation

### 🎯 Design Principles

- Focused on **hierarchy before decoration**
- Clear visual flow:  
  **Workshop Title → Date → Seats → Book Button**
- Color palette:
  - `#f5f4f0` (background)
  - `#d4622a` (accent)

---

### 📱 Responsiveness

- Followed a **mobile-first approach**
- Sidebar stacks below content on smaller screens
- Forms expand to full width for better usability

---

### ⚖️ Trade-offs

- Sidebar booking form improves UX but increases complexity  
- Used lightweight validation instead of heavy libraries for better performance  

---

### 🧠 Challenge

**Syncing URL parameters with filters**

- Implemented using `useSearchParams`
- URL acts as the **single source of truth**
- Enables shareable filtered links

---

## ⚡ UX Enhancements

- Sticky filter bar  
- Contextual booking UI  
- Modular dashboard navigation  
- Real-time feedback (validation + loading states)  

---

## 🚧 Challenges & Solutions

*(You can expand this section later if needed)*

---

## 🚀 Future Roadmap

- [ ] Mobile bottom navigation  
- [ ] Real API integration  
- [ ] Interactive maps (Leaflet.js)  
- [ ] Infinite scroll / pagination  

---

## 📜 Development Log

- Built from scratch  
- Original component architecture and UX flows  
- Django backend used only for data modeling reference  

---

## 📄 License

GPL-3.0
