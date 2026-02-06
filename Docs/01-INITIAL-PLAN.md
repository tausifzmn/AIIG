# AIIG Deliverables Management System - Initial Plan

**Assignment Type**: Full Stack Developer Assessment  
**Timeline**: 3-day assignment  
**Level**: Entry/Mid-level position  
**Date**: February 4, 2026

---

## 1. Problem Summary

AIIG needs a centralized web application to:
- Search and view project deliverables
- Track upcoming deadlines
- Identify responsible employees (project managers)
- Reduce risk of missed obligations

**Current Pain Points:**
- Manual tracking via spreadsheets
- Limited visibility across projects
- Risk of missed deadlines leading to financial penalties

---

## 2. Core Requirements

### Must-Have (MVP)
1. **Search Functionality**: Search for projects by name
2. **Deliverables View**: Display all deliverables for a selected project
3. **Data Display**: Show project name, deliverable description, due date, project manager
4. **Data Persistence**: Store data in a database backend

### Nice-to-Have (Bonus)
1. **Data Entry**: Form to add new projects and deliverables
2. **Upcoming Deadlines Filter**: Highlight deliverables due soon

---

## 3. Technology Stack Decision

### Frontend
- **React** (with Vite for fast development)
- **Tailwind CSS** for styling
- **React Router** for navigation

**Reasoning**: React is industry standard, component-based architecture makes it maintainable, and Vite provides fast development experience.

### Backend
- **Node.js with Express**
- **RESTful API** architecture

**Reasoning**: JavaScript full-stack keeps it simple, Express is lightweight and widely used, easy to demonstrate and explain.

### Database
- **PostgreSQL** (or SQLite for simpler demo)

**Reasoning**: PostgreSQL is production-ready and shows we understand relational data. SQLite is easier for quick setup if no server available.

### Development Tools
- **Git** for version control
- **Postman/Thunder Client** for API testing
- **ESLint** for code quality

---

## 4. System Architecture (Simple but Professional)

```
┌─────────────────┐
│   React App     │
│  (Frontend)     │
└────────┬────────┘
         │
         │ HTTP/REST API
         │
┌────────▼────────┐
│  Express Server │
│   (Backend)     │
└────────┬────────┘
         │
         │ SQL Queries
         │
┌────────▼────────┐
│     SQLite      │
│   (Database)    │
└─────────────────┘
```

---

## 5. Database Schema Design

### Projects Table
```
projects
├── id (PRIMARY KEY)
├── name (TEXT, UNIQUE)
├── created_at (TIMESTAMP)
```

### Deliverables Table
```
deliverables
├── id (PRIMARY KEY)
├── project_id (FOREIGN KEY → projects.id)
├── description (TEXT)
├── due_date (DATE)
├── frequency (TEXT) - e.g., "M" for monthly
├── project_manager (TEXT)
├── created_at (TIMESTAMP)
```

**Reasoning**: Simple normalized structure, follows database best practices, easy to query and expand.

---

## 6. API Endpoints Design

### Core Endpoints
1. `GET /api/projects` - Get all projects (for search/dropdown)
2. `GET /api/projects/:id/deliverables` - Get deliverables for a project
3. `POST /api/projects` - Create new project (bonus)
4. `POST /api/deliverables` - Create new deliverable (bonus)

**Reasoning**: RESTful design, simple and predictable, follows industry conventions.

---

## 7. User Interface Design (Simple & Clean)

### Main Page Components:
1. **Header**: AIIG branding, app title
2. **Search/Filter Section**: Search bar for projects
3. **Deliverables Table**: Clean table showing all relevant information
4. **Add New Button**: (Bonus) Modal form for data entry

### Key UX Considerations:
- Clear visual hierarchy
- Highlight upcoming/overdue deliverables (color coding)
- Responsive design (works on tablets/laptops)
- Loading states and error messages
- Intuitive search with instant results

---

## 8. Features Breakdown

### Phase 1: Core MVP
- [ ] Database setup with schema
- [ ] Seed data from provided dataset
- [ ] Backend API endpoints
- [ ] Frontend project search
- [ ] Display deliverables table

### Phase 2: Bonus Features
- [ ] Add new project form
- [ ] Add new deliverable form
- [ ] Date validation
- [ ] Visual indicators for upcoming deadlines

---

## 9. Security Assumptions (For Discussion)

**Authentication/Authorization:**
- Assume single-tenant application for now
- Future: JWT-based authentication for project managers
- Role-based access (Admin, Project Manager, Viewer)

**Data Security:**
- Input validation on all forms
- SQL injection protection (using parameterized queries)
- CORS configuration for API
- Environment variables for sensitive config

**Deployment:**
- HTTPS in production
- Secure database credentials
- Regular backups

---

## 10. Maintenance Assumptions

- **Code Quality**: Clean, commented code following JavaScript best practices
- **Documentation**: README with setup instructions
- **Error Handling**: Proper error messages and logging
- **Testing**: Manual testing for this demo (automated tests in production)
- **Updates**: Node.js LTS version for long-term support

---

## 11. Budget Considerations

### Development Costs (3 days)
- Developer time: ~24 hours @ entry/mid-level rate

### Hosting Costs (Annual)
- **Option 1 (Low-cost)**: 
  - Vercel (Frontend): $0 - $20/month
  - Railway/Render (Backend + DB): $5 - $15/month
  - **Total**: ~$60 - $420/year

- **Option 2 (Professional)**:
  - AWS/DigitalOcean: $20 - $50/month
  - **Total**: ~$240 - $600/year

### Maintenance
- Minor updates: ~2-4 hours/month
- Security patches: Included in maintenance

**Total Year 1**: $1,000 - $3,000 (dev + hosting + maintenance)

---

## 12. Technical Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Database connection failures | High | Connection pooling, retry logic, error handling |
| Large dataset performance | Medium | Pagination, indexing on search fields |
| Browser compatibility | Low | Use modern but widely-supported features |
| Data loss | High | Regular backups, transaction handling |
| API endpoint failures | Medium | Proper error handling, user-friendly messages |

---

## 13. Development Timeline (3 Days)

### Day 1: Backend & Database
- Set up project structure
- Database schema and migrations
- API endpoints
- Data seeding
- API testing

### Day 2: Frontend
- React app setup
- Component structure
- API integration
- Styling

### Day 3: Polish & Bonus
- Testing and bug fixes
- Bonus features (data entry)
- Documentation
- Presentation prep

---

## 14. Success Criteria

✅ User can search for a project  
✅ User can view all deliverables for a project  
✅ Data is persisted in database  
✅ Clean, professional UI  
✅ Code is well-documented and understandable  
✅ Can explain all technical decisions  

---

**Status**: PLAN COMPLETE - Ready for implementation
