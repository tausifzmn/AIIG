# AIIG
Plenary Assignment

A full-stack web application for tracking project deliverables and managing deadlines. Built with React, Node.js, Express, and SQLite.

## Features

- ✅ Search projects by name
- ✅ View all deliverables for each project
- ✅ Color-coded deadline indicators (overdue, 7 days, 30 days)
- ✅ Urgent deadlines dashboard (across all projects)
- ✅ Add new projects
- ✅ Add new deliverables
- ✅ Delete exisitng deliverables

## Technology Stack

**Frontend:**
- React 18
- Vite (development server)
- Vanilla JavaScript (ES6+)

**Backend:**
- Node.js
- Express.js
- SQLite3 (database)
- CORS (cross-origin support)

## Prerequisites

Before you begin, make sure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)

To check if you have them installed:
```bash
node --version
npm --version
```

## Quick Start Guide

### Prerequisites First

Make sure to have **Node.js installed**:

To verify:
```bash
node --version
npm --version
```

---

### 🚀 Setup Steps (You're already in VS Code with the project open!)

#### **Step 1: Open Terminal for Backend**

1. npm install

#### **Step 2: Seed the Database**

Still in the backend terminal, type:
```bash
npm run seed
```

You should see: ✅ **"Database seeded successfully"**

#### **Step 3: Start the Backend Server**

Still in the backend terminal, type:
```bash
npm run dev
```

You should see: ✅ **"Server running on http://localhost:5000"**

**IMPORTANT: Keep this terminal open and running!**

---

#### **Step 5: Open a NEW Terminal for Frontend**

1. 
npm install

then 

npm run dev


You should see: ✅ **"Local: http://localhost:5173"**

---

#### **Step 8: Open the Application**

1. Open your web browser (Chrome, Firefox, Edge, Safari - any browser)
2. Go to: **http://localhost:5173**
3. You should see the AIIG Deliverables Management System with:

---

## API Endpoints

The backend provides the following REST API endpoints:

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id/deliverables` - Get deliverables for a specific project
- `POST /api/projects` - Create a new project

### Deliverables
- `GET /api/deliverables` - Get all deliverables
- `GET /api/deliverables/upcoming?days=7` - Get urgent deliverables (within X days)
- `POST /api/deliverables` - Create a new deliverable

## Project Structure

```
Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js       # SQLite connection
│   │   ├── routes/
│   │   │   ├── projects.js       # Project endpoints
│   │   │   └── deliverables.js   # Deliverable endpoints
│   │   └── server.js             # Express server
│   ├── database/
│   │   ├── schema.sql            # Database schema
│   │   ├── seed.js               # Data seeding script
│   │   ├── dataset.xlsx          # Sample data (72 deliverables)
│   │   └── aiig.db               # SQLite database file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── DeliverablesTable.jsx
│   │   │   ├── UpcomingDeadlines.jsx
│   │   │   ├── AddProjectForm.jsx
│   │   │   └── AddDeliverableForm.jsx
│   │   ├── App.jsx               # Main component
│   │   ├── main.jsx              # React entry point
│   │   └── index.css             # Global styles
│   └── package.json
│
├── Docs/
│   ├── 01-INITIAL-PLAN.md
│   ├── 02-IMPLEMENTATION-LOG.md
│   └── 03-EXPLANATION-GUIDE.md
│
└── README.md (this file)
```

## 🔧 Database Schema

**projects**
- `id` (INTEGER, PRIMARY KEY)
- `name` (TEXT)
- `created_at` (DATETIME)

**deliverables**
- `id` (INTEGER, PRIMARY KEY)
- `project_id` (INTEGER, FOREIGN KEY)
- `description` (TEXT)
- `due_date` (DATE)
- `frequency` (TEXT)
- `project_manager` (TEXT)
- `created_at` (DATETIME)
