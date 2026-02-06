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

## ins n outs
- `aiig.db` - sqlite DB file created using seed script (database/seed.js)


Adding Deliverable - Specific Team gating
Adding Project - Specific Role 

npum run seed - what does it do
how did we parse the data?

### Why React for Frontend?
**Key Points**:
- Component-based architecture = reusable code (AddProjectForm.jsx and AddDeliverableForm.jsx - Both follow the same modal pattern with form handling, error states, and loading states.)
- I'd extract common patterns into reusable utilities (form validation, modal logic, styling hooks) to reduce duplication."

## Things I Would Add
------
Removing Completed Projects