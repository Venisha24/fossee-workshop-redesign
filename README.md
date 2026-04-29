# 🚀 FOSSEE Workshop Booking Portal — React Redesign

**Screening Task for the FOSSEE Summer Internship 2025 at IIT Bombay**

---

## 📖 Overview

The original site is a Django app handling workshop bookings between Coordinators (colleges) and FOSSEE Instructors.

> ⚠️ **Mission:** Redesign the frontend in React while maintaining all original pages, flows, and business logic, but with a modern UI/UX overhaul.

---
## Before starting

I cloned the original repo and ran it locally first. A few things immediately stood out:

- The pages were functional but visually dated — Bootstrap 3 with very little hierarchy
- No responsiveness on mobile (the target audience is college students, so this really mattered)
- The workshop list had filters but they were dropdowns stacked awkwardly
- No loading states or error messages on forms
- Navigation didn't indicate which page you were on

# 🛠️ Setup & Demo  
## Clone the repository
```bash
git clone https://github.com/Venisha24/fossee-workshop-redesign
cd fossee-workshop-redesign-main
cd fossee_v3
```
## Install dependencies
npm install

## Start development server
npm run dev

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://10.224.68.251:5173/
  
Demo Credentials: instructor :- 📧 prabhu@iitb.ac.in /🔑 123456
                  coordinator :-📧 riya@example.com | 🔑 123456

                  
## 🗺️ Page Structure
| Route | Page | Notes |
|---|---|---|
| `/` | Home | Stats, featured workshops, how it works |
| `/workshops` | Workshop List | Filter by type, state, level, status + text search |
| `/workshops/:id` | Workshop Detail | Full info, booking form in sidebar |
| `/login` | Login | Auth with form validation |
| `/signup` | Signup | Coordinator/instructor registration |
| `/dashboard` | Dashboard | Overview, bookings, propose form, profile, instructor review |
| `*` | 404 | — |


# 💡 Design Decisions
### Warm light theme instead of dark

I went back and forth on this. Dark themes look impressive but the FOSSEE audience is largely students in India using the site during the day on varying screen qualities. A warm off-white (`#f5f4f0`) with a dark orange accent (`#d4622a`) is more readable in bright conditions and feels closer to the government/academic sites they're used to, without looking outdated.

## The orange was a deliberate nod to FOSSEE's actual brand color — I didn't just pick something generic.
## ⚡ UX Enhancements
### Workshop filters that actually work

The original site had filters but they were scattered. I put them in a sticky filter bar at the top of the list page, with:
- Text search (searches title, instructor, location)
- Dropdown for workshop type
- Dropdown for state
- Dropdown for level
- Status tabs (upcoming / completed)
- URL-synced — so `/workshops?type=Python` actually loads filtered

The URL sync was a bit fiddly with `useSearchParams` but it means you can share a filtered link, which the original couldn't do.

### Booking form in the sidebar, not a separate page

In the original Django app, clicking "Book" takes you to a new form page. I put the form directly in the sidebar of the detail page instead. This keeps context — the student can still see the workshop info while filling the form.

The tradeoff is that the sidebar gets tall on mobile, so I made the sidebar stack below the main content on small screens and the form becomes full-width. Not perfect but it works.

### Dashboard sidebar navigation

The original dashboard was basically one long page with sections. I split it into a sidebar + content area, similar to how modern dashboards work. On mobile the sidebar hides (there's a note about adding a bottom nav — see "What I'd improve").

# 🚧 Challenges & Solutions
**The `require()` call in Dashboard.jsx** — I used CommonJS `require()` inside a component to avoid import issues with the form sub-components that needed the same data. In production this should be a proper import at the top. I left a comment there.

**React Router's `Navigate` vs `useNavigate`** — for the auth guard on the dashboard I used `<Navigate>` as a component rather than the hook because the redirect needed to happen during render, not after an event. Took me a minute to remember which one to use where.

**Form validation across multiple components** — rather than pulling in a form library (Formik, React Hook Form), I wrote plain validation functions. It's slightly repetitive but for a task this size it's fine and keeps the dependency list clean. The tradeoff is that I'm not doing real-time validation on blur, only on submit.

## 🚀What I'd improve with more time

1. **Mobile bottom navigation** — the dashboard sidebar just disappears on mobile right now. I'd replace it with a bottom tab bar for `Overview`, `Bookings`, `Propose`, `Profile`.

2. **Real API integration** — all data is mock. The actual FOSSEE API would replace the `WORKSHOPS` array. I'd use React Query for caching and loading states rather than raw `useEffect`.

3. **Loading skeletons** — the workshop cards currently appear instantly (mock data). With a real API I'd add skeleton placeholders.

4. **Workshop map** — the original has a map of India showing where workshops have been conducted. I'd add this back using Leaflet.js. Skipped it because it needs a tile provider and I didn't want to add a CDN dependency without knowing what's available.

5. **Infinite scroll or pagination** — the list page shows all workshops at once. With real data this needs pagination.

# 📜 Development Log


| Type  | Description |
|-------|-------------|
| init  | Scaffolded Vite + React + React Router setup |
| feat  | Added mock data aligned with FOSSEE Django models |
| feat  | Implemented AuthContext for login/signup/logout state management |
| feat  | Created global CSS (design tokens, layout, forms, buttons, cards) |
| feat  | Built responsive Navbar with mobile hamburger and auth-aware links |
| feat  | Developed WorkshopCard component with capacity visualization |
| feat  | Designed Home page (hero section, featured workshops, process flow, CTA) |
| feat  | Built WorkshopList page with search, multi-filter, and URL sync |
| feat  | Created WorkshopDetail page with metadata grid and booking form |
| feat  | Developed Dashboard (overview, bookings, proposal form, profile section) |
| fix   | Resolved mobile layout issues in detail page and dashboard |



# 🧠 Reasoning
## 1. What design principles guided your improvements?
The redesign was guided by key UI/UX principles:

Simplicity: Reduced clutter and focused on essential content.
Consistency: Uniform typography, spacing, and color scheme across components.
Visual Hierarchy: Clear distinction between headings, sections, and actions to guide user attention.
Accessibility: Use of readable fonts, sufficient contrast, and semantic HTML.
User-Centered Design: Layout decisions were made to improve usability and navigation flow.

## 2. How did you ensure responsiveness across devices?
Responsiveness was achieved through:

CSS Media Queries to adapt layouts for different screen sizes.
Flexible Layouts using Flexbox and Grid for dynamic content alignment.
Relative Units (%, rem, vw/vh) instead of fixed dimensions.
Mobile-First Approach to ensure optimal performance on smaller devices before scaling up.

## 3. What trade-offs did you make between design and performance?
Avoided heavy animations and large external libraries to maintain fast load times.
Limited use of high-resolution images to reduce bandwidth usage.
Chose simple CSS-based interactions over JavaScript-heavy effects.
Prioritized performance and usability over overly complex visual elements.

## 4. What was the most challenging part of the task and how did you approach it?
The most challenging part was:
Balancing aesthetics with performance while ensuring responsiveness.
Approach:
Broke the design into modular components.
Iteratively tested layouts across screen sizes.
Refactored code to remove redundancy and improve maintainability.
Focused on progressive enhancement instead of adding unnecessary complexity.

# Before and After Screenshots



### Login

| Before | After |
|--------|-------|
| <img src="https://github.com/user-attachments/assets/9dddad6f-db20-4bf9-9eb9-06d8969ad9b4" width="100%"> | <img src="https://github.com/user-attachments/assets/03ec669c-3c6f-4fca-9e4b-d8411810f84c" width="100%"> |

---

### Register

| Before | After |
|--------|-------|
| <img src="https://github.com/user-attachments/assets/eae14d0c-cd53-46cf-9cce-47d3b2e5c94a" width="100%"> | <img src="https://github.com/user-attachments/assets/99b35e1f-7f20-4dfe-a4e9-3478d40e9dc1" width="100%"> |

---

### Statistics

| Before | After |
|--------|-------|
| <img src="https://github.com/user-attachments/assets/49eb0570-0b09-4a3a-8e20-59bafb489137" width="100%"> | <img src="https://github.com/user-attachments/assets/e2fa33e4-4cb0-4b22-b7f9-560d8d32ae65" width="100%"> |

---

### Workshop Types

| Before | After |
|--------|-------|
| <img src="https://github.com/user-attachments/assets/8ffb7c50-285e-4d3d-aacb-4ecf445dbf78" width="100%"> | <img src="https://github.com/user-attachments/assets/b5319e71-e8da-4e30-b997-4e4577a65651" width="100%"> |
# Screenshots of Redesigned Site
<img width="1428" height="755" alt="Screenshot 2026-04-13 123851" src="https://github.com/user-attachments/assets/84b9f968-c843-4f50-bfc6-fe9b1a5e91e1" />
<img width="817" height="816" alt="Screenshot 2026-04-13 000037" src="https://github.com/user-attachments/assets/b5319e71-e8da-4e30-b997-4e4577a65651" />
<img width="1436" height="906" alt="Screenshot 2026-04-13 000115" src="https://github.com/user-attachments/assets/e2fa33e4-4cb0-4b22-b7f9-560d8d32ae65" />
<img width="1881" height="907" alt="Screenshot 2026-04-13 000236" src="https://github.com/user-attachments/assets/0b7c99ae-e88b-4fd4-81b6-e00e6f7e994a" />
<img width="1231" height="905" alt="Screenshot 2026-04-13 000206" src="https://github.com/user-attachments/assets/6cfd0162-8689-4adf-af3b-b57a61976305" />
<img width="1843" height="834" alt="image" src="https://github.com/user-attachments/assets/99b35e1f-7f20-4dfe-a4e9-3478d40e9dc1" />

# Mobile View

<p align="center">
  <img src="https://github.com/user-attachments/assets/ce763bc4-6872-4e96-9917-87af1219101d" width="30%" height="350">
  <img src="https://github.com/user-attachments/assets/8f7c2a81-aa91-4a71-ba88-7230b5540f22" width="30%" height="350">
  <img src="https://github.com/user-attachments/assets/42d901bc-0f9f-4cf8-85b4-43d18cf1c99d" width="30%" height="350">
</p>






## Originality Note: 
This project was built from scratch. Component architecture, design systems, and UX flows are original works, referencing the original Django logic only for data modeling.

# License: GPL-3.0
