// Mock data file used to simulate backend responses
// Data structure mirrors Django models (Workshop, User, State, etc.)
// This helps frontend work without a real API
// List of available workshop types (used for filtering & badges)

export const WORKSHOP_TYPES = [
  { id: 1, name: "Python" },
  { id: 2, name: "Scilab" },
  { id: 3, name: "OpenModelica" },
  { id: 4, name: "DWSIM" },
  { id: 5, name: "FreeCAD" },
  { id: 6, name: "Django" },
];

// List of Indian states (used in forms and filtering)
export const STATES = [
  "Maharashtra", "Karnataka", "Tamil Nadu", "Delhi",
  "Telangana", "West Bengal", "Gujarat", "Rajasthan",
  "Uttar Pradesh", "Kerala",
];

// Main workshop dataset
// Each object represents a workshop with full details
export const WORKSHOPS = [
  {
    id: 1,
    title: "Python for Scientific Computing",
    workshop_type: "Python",

    // Instructor details
    instructor: { id: 2, name: "Dr. Prabhu Ramachandran", email: "prabhu@iitb.ac.in" },

    // Coordinator (organizer) details
    coordinator: { id: 10, name: "Riya Mehta", email: "riya@example.com", institute: "VJTI Mumbai" },
    date: "2025-05-15",
    duration: 2,  // in days
    location: "IIT Bombay, Mumbai",
    state: "Maharashtra",

    // Seat management
    seats: 40,
    booked: 28,

    // Workshop status: upcoming | ongoing | completed | cancelled
    status: "upcoming",   

    // Additional details
    description: "A 2-day hands-on workshop covering NumPy, SciPy, Matplotlib and the broader scientific Python ecosystem. Participants are expected to have basic Python knowledge.",
    prerequisites: "Basic Python programming",
    level: "Intermediate",
  },

  {
    id: 2,
    title: "FOSSEE Scilab Workshop",
    workshop_type: "Scilab",
    instructor: { id: 3, name: "Prof. Kannan Moudgalya", email: "kannan@iitb.ac.in" },
    coordinator: { id: 11, name: "Aman Singh", email: "aman@example.com", institute: "IIT Kanpur" },
    date: "2025-05-22",
    duration: 1,
    location: "Online",
    state: null,
    seats: 100,
    booked: 67,
    status: "upcoming",
    description: "Introductory workshop on Scilab — an open-source alternative to MATLAB. Covers signal processing basics and simulation.",
    prerequisites: "None",
    level: "Beginner",
  },
  {
    id: 3,
    title: "OpenModelica Simulation",
    workshop_type: "OpenModelica",
    instructor: { id: 4, name: "Dr. Rahul B", email: "rahul@iitm.ac.in" },
    coordinator: { id: 12, name: "Priya Nair", email: "priya@example.com", institute: "IIT Madras" },
    date: "2025-06-05",
    duration: 3,
    location: "IIT Madras, Chennai",
    state: "Tamil Nadu",
    seats: 30,
    booked: 30,
    status: "upcoming",
    description: "Advanced workshop on equation-based modelling of cyber-physical systems using OpenModelica.",
    prerequisites: "Basic differential equations",
    level: "Advanced",
  },
  {
    id: 4,
    title: "Django Web Development",
    workshop_type: "Django",
    instructor: { id: 5, name: "Ms. Ankita Sharma", email: "ankita@fossee.in" },
    coordinator: { id: 13, name: "Karan Joshi", email: "karan@example.com", institute: "Delhi Technological University" },
    date: "2025-06-18",
    duration: 1,
    location: "DTU, New Delhi",
    state: "Delhi",
    seats: 80,
    booked: 12,
    status: "upcoming",
    description: "Build production-ready web applications with Django. Covers models, views, templates, authentication, and REST APIs.",
    prerequisites: "Python basics",
    level: "Beginner",
  },
  {
    id: 5,
    title: "FreeCAD for Engineering Design",
    workshop_type: "FreeCAD",
    instructor: { id: 6, name: "Prof. V. Krishnakumar", email: "krishna@nitt.edu" },
    coordinator: { id: 14, name: "Sneha Rao", email: "sneha@example.com", institute: "NIT Trichy" },
    date: "2025-07-10",
    duration: 2,
    location: "NIT Trichy",
    state: "Tamil Nadu",
    seats: 35,
    booked: 8,
    status: "upcoming",
    description: "Parametric 3-D solid modelling with open-source FreeCAD. Ideal for mechanical engineering students.",
    prerequisites: "Engineering drawing basics",
    level: "Beginner",
  },
  {
    id: 6,
    title: "Python for Data Science",
    workshop_type: "Python",
    instructor: { id: 2, name: "Dr. Prabhu Ramachandran", email: "prabhu@iitb.ac.in" },
    coordinator: { id: 15, name: "Harsh Patel", email: "harsh@example.com", institute: "IITGN" },
    date: "2025-04-02",
    duration: 2,
    location: "IIT Gandhinagar",
    state: "Gujarat",
    seats: 50,
    booked: 50,
    status: "completed",
    description: "Pandas, Matplotlib, Seaborn and scikit-learn for data analysis and ML pipelines.",
    prerequisites: "Python basics",
    level: "Intermediate",
  },
  {
    id: 7,
    title: "DWSIM Process Simulation",
    workshop_type: "DWSIM",
    instructor: { id: 7, name: "Dr. Saurabh Garg", email: "saurabh@iitd.ac.in" },
    coordinator: { id: 16, name: "Meera Iyer", email: "meera@example.com", institute: "IIT Delhi" },
    date: "2025-07-25",
    duration: 1,
    location: "IIT Delhi",
    state: "Delhi",
    seats: 60,
    booked: 5,
    status: "upcoming",
    description: "Hands-on workshop on DWSIM — open-source chemical process simulator used in chemical engineering education.",
    prerequisites: "Chemical engineering fundamentals",
    level: "Intermediate",
  },
];

// User roles in the original Django app: coordinator / instructor / admin
export const MOCK_USERS = [
  { id: 10, username: "riya_mehta", email: "riya@example.com", role: "coordinator", name: "Riya Mehta", institute: "VJTI Mumbai", state: "Maharashtra", phone: "9876543210" },
  { id: 2,  username: "prabhu_r",   email: "prabhu@iitb.ac.in", role: "instructor", name: "Dr. Prabhu Ramachandran", institute: "IIT Bombay", state: "Maharashtra", phone: "9000000001" },
];

// Platform statistics (used in dashboard/landing page)
export const STATS = {
  total_workshops: 342,
  total_coordinators: 1240,
  states_covered: 28,
  tools_covered: 6,
};
