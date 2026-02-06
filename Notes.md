## Project Structure

```
Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js             # SQLite connection
│   │   ├── routes/
│   │   │   ├── projects.js             # Project endpoints
│   │   │   └── deliverables.js         # Deliverable endpoints
│   │   └── server.js                   # initializes Express and sets the PORT
│   ├── database/
│   │   ├── schema.sql                  # Database schema
│   │   ├── seed.js                     # Data seeding script
│   │   ├── dataset.xlsx                # Sample data (72 deliverables)
│   │   └── aiig.db                     # SQLite database file
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
│   │   ├── App.jsx                     # Main component
│   │   ├── main.jsx                    # React entry point
│   │   └── index.css                   # Global styles
│   └── package.json
│
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
- extract common patterns into reusable utilities (form validation, modal logic, styling hooks) to reduce duplication."

### Why Node.js + Express for Backend?
"Node.js with Express because it's lightweight and uses JavaScript on both frontend and backend, which keeps the codebase consistent."

### SQLite
SQLite to ensure the project is portable. Since SQLite is a file-based database, it’s included directly in the repository. This allows to clone the repo and run the app immediately without needing to set up a local database server or manage connection strings.

### INLINE instead of Tailwind
For the scope of this assignment, I chose Inline Styles to keep the components modular and to ensure the project had zero external CSS dependencies

### Promises in SQLite setup
Standard SQLite functions use callbacks, which can lead to "Callback Hell" (nested, messy code). By turning them into Promises, you can use the much cleaner async/await syntax in your other files.

### VITE
I used Vite as the build tool for this project. It offers a significantly faster development experience than traditional bundlers through its use of native ES modules and optimized Hot Module Replacement. This allowed for a very rapid feedback loop while I was styling the dashboard




## (b) User Experience and Usability (15 points)
### Feature Walkthrough

#### Search & Project Selection
- Clean search bar that provides instant feedback
- Selected project name displays prominently
- Users immediately know what they're viewing

#### Color-Coded Deadlines
- Red = Overdue (demands attention)
- Gold = Due within 7 days (urgent)
- Blue = Due within 30 days (plan ahead)
- Gray = Due later (monitor)

#### Urgent Deadlines Banner
- Shows items due in next 7 days right at the top
- Expandable (doesn't clutter the page)
- Addresses the original pain point: "risk of missing obligations"

#### Admin Mode Toggle
- Delete buttons hidden by default
- Users must explicitly enable "Admin Mode" to see them
- Confirmation dialog prevents accidental deletions
- team gating // role based access control using Auth with JWT 
- Database Level (The "Ownership") who can see what project

---

## (c) Security Assumptions (10 points)

### Authentication & Authorization
**Assumption**: "In production, this would have user authentication with role-based access control."

**What I've done**:
- Admin Mode toggle mimics basic access control
- Delete operations are hidden from regular users
- Form validation prevents malformed data from being submitted

**What I'm not doing** (and why):
- No database passwords - SQLite is file-based, fine for local use
- No HTTPS - development environment
- No database credentials in code - using SQLite which requires no credentials

**In Production, I Would**:
- Implement OAuth or JWT authentication
- Role-based access: "admin" vs "viewer"
- API key validation for backend endpoints
- HTTPS everywhere

### Data Protection
**Assumption**: "User data is only as sensitive as internal HR documents."

**Current approach**:
- SQL injection protection (parameterized queries in all database calls)
- Input validation on forms (required fields checked before submission)
- CORS enabled only for localhost (prevents external requests during development)

**In Production, I Would**:
- Encrypt sensitive data at rest
- Audit logs for deletions
- Backup strategy (daily automated backups)
- Data retention policy (archive after X months)

### API Security
**Current approach**:
- Basic CORS headers
- No sensitive data exposed through APIs
- Error messages don't leak system details

**In Production, I Would**:
- Rate limiting (prevent brute force or DOS)
- Request validation
- OAuth2 for third-party integrations
- API versioning (v1, v2 for backward compatibility)

### Deployment Security
**Current**: Running on localhost - not exposed to internet

**In Production, I Would**:
- Never commit secrets to git
- Use environment variables for all configuration
- Deploy behind a firewall/VPN for internal tools
- Use a reverse proxy (Nginx) with SSL
- Regular security patching

---

## (d) Maintenance Assumptions (5 points)

### Code Structure
"The app is organized in three clear layers: frontend, backend, and database. This separation makes it easy to maintain each part independently."

**Frontend Maintenance**:
- Components are self-contained (each component handles its own state)
- Reusable functions like `getDateColor()` and `formatDate()`
- Easy to add new components

**Backend Maintenance**:
- Each route file (projects.js, deliverables.js) handles one resource
- Database helper functions (runQuery, getQuery, allQuery) prevent code repetition
- Error handling on every endpoint

**Database Maintenance**:
- Clear schema with foreign keys
- Seed script for testing data
- Easy to add new fields without breaking existing code

### Developer Onboarding
"A new developer can:"
1. Read the README (5 minutes)
2. Run `npm install` in both folders (2 minutes)
3. Run `npm run seed` to populate data (1 minute)
4. Start both servers and explore the code
5. Total: 15 minutes to understand the whole system

### Monitoring & Logging
**What I Have**:
- Console errors for debugging
- Form validation feedback to users
- Network request visibility in browser DevTools

**What I Would Add in Production**:
- Structured logging (Winston/Pino)
- Error tracking (Sentry)
- Performance monitoring (New Relic)
- Database query logs
- API response time tracking

---

## (e) Budget for Product Lifecycle (5 points)

### Development Cost (Already Spent)
- **Time**: 2 days (40 hours at entry-level salary)
- **Tools**: Free (VS Code, Node.js, SQLite)
- **Total**: ~$800-1000 (depends on salary band)

### Hosting Cost (Per Year)
**Option 1: Small VPS** (for internal HR tool)
- Server: $10/month = $120/year
- Database: Included with VPS
- Domain: $10/year
- **Total**: ~$130/year

**Option 2: Cloud** (if scaling)
- AWS/GCP backend: $50/month = $600/year
- Database as service: $20/month = $240/year
- CDN/Storage: $20/month = $240/year
- **Total**: ~$1080/year

### Maintenance Cost (Per Year)
- Developer time: 20 hours/month for updates and fixes = $10k/year
- Security patches: Included in above
- Monitoring tools: $50-200/month = $600-2400/year
- **Total**: $10.6k - $12.4k/year

### Scaling Cost (If Needed)
- **Performance**: Caching layer (Redis) = $15/month
- **Users**: If >1000 concurrent, need load balancing
- **Storage**: If data >1GB, consider external database

### Example 3-Year Budget
```
Development:        $1,000 (already done)
Year 1 Hosting:     $130
Year 1 Maintenance: $11,000
Year 2 Hosting:     $130  
Year 2 Maintenance: $11,000
Year 3 Hosting:     $130
Year 3 Maintenance: $11,000
───────────────
Total 3 Years:      $34,390
```

**Key Point to Make**: "This is much cheaper than buying enterprise software (~$10k/year per seat), especially for a 50-person company."

---

## (f) Technical Risks (10 points)

### Risk #1: Data Loss
**Scenario**: SQLite database file gets corrupted or deleted

**Probability**: Low (local file)
**Impact**: High (all data lost)

**Mitigation**:
- Automated daily backups to external storage
- Version control for schema changes
- Backup verification (test restores monthly)

**Production**: Use managed database (AWS RDS) that handles backups

### Risk #2: Performance Degradation
**Scenario**: As data grows (more projects/deliverables), page loads get slow

**Probability**: Medium (depends on usage)
**Impact**: Medium (users get frustrated)

**Current State**: 72 deliverables load instantly
**Threshold**: ~10,000 deliverables might need optimization

**Mitigation**:
- Add database indexes on frequently queried columns (due_date, project_id)
- Implement pagination (show 20 results per page instead of all)
- Add caching (Redis) for repeated queries
- Monitor query performance

### Risk #3: Security Breach
**Scenario**: Sensitive HR data exposed (salary, performance reviews)

**Probability**: Low (internal tool behind firewall)
**Impact**: Critical (legal liability)

**Mitigation**:
- Encryption at rest and in transit
- Authentication (who accessed what, when)
- Access logs and audit trails
- Regular security audits
- Employee training on data handling

### Risk #4: Scalability Limits
**Scenario**: System built for 50 people needs to support 5,000 people

**Probability**: Low (but possible with company growth)
**Impact**: High (would need complete redesign)

**Mitigation**:
- Chose technologies (Node, React, PostgreSQL) that scale to millions
- Clean separation of layers means we can optimize each independently
- Easy to migrate from SQLite to PostgreSQL without code changes

### Risk #5: Browser Compatibility
**Scenario**: User on older browser can't run the app

**Probability**: Low (modern tech, modern browsers)
**Impact**: Low (just that user, we can support alternatives)

**What I Did**: Used standard ES6 JavaScript and CSS that works in all modern browsers (Chrome, Firefox, Safari, Edge)

**What I Didn't Do**: Support IE11 (already end-of-life)

### Risk #6: Dependency Vulnerabilities
**Scenario**: A package we depend on has a security hole

**Probability**: Medium (open source risk)
**Impact**: Medium (fixable with updates)

**Mitigation**:
- Regular dependency updates (`npm audit fix`)
- CI/CD pipeline to test updates before deploying
- Security scanning tools (GitHub Dependabot)
- Keep fewer dependencies (I have only essential packages)

### Risk #7: Key Person Risk
**Scenario**: The developer who built this leaves and no one else understands it

**Probability**: Low (code is simple and well-documented)
**Impact**: Medium (onboarding takes time)

**Mitigation**:
- Clear README with setup instructions
- Well-commented code
- This documentation
- Video walkthrough (could record)
- Architecture is standard (React + Express + SQLite) - any developer knows this stack

### Risk #8: Changing Requirements
**Scenario**: Business wants to add "approval workflows" or "budget tracking"

**Probability**: High (always happens)
**Impact**: Medium (manageable if architected well)

**Mitigation**:
- Clean separation between components
- Database schema designed to extend easily
- API endpoints are RESTful (easy to add new ones)
- No hard-coded assumptions about data

**Example**: Adding a "status" field to deliverables would take 30 minutes (schema change + 1 form field)

---

## Interview Strategy

### Opening Statement (60 seconds)
"I built a deliverables management system for AIIG that solves three problems: limited visibility across projects, manual deadline tracking, and risk of missing obligations. It's a full-stack app with React on the frontend, Node.js/Express on the backend, and SQLite for data. The whole thing runs locally and can be set up in 10 minutes."

### Closing Statement (30 seconds)
"The code is clean, well-documented, and uses industry-standard technologies. It's ready for production with the security and scaling enhancements I outlined. Most importantly, it directly addresses the user pain points from day one."

### What to Emphasize
✅ Industry standards (React, Express, REST APIs)
✅ User-focused (color coding, alerts, admin protection)
✅ Professional thinking (security, maintenance, scalability)
✅ Complete delivery (frontend + backend + database + documentation)


---

## Quick Reference - 30 Second Answers

**Q: Why React?**
"A: Industry standard, component-based architecture, great for reusable UI pieces, large community."

**Q: Why Node.js?**
"A: JavaScript on both frontend and backend keeps code consistent, Express is lightweight and battle-tested, perfect for REST APIs."

**Q: Why SQLite?**
"A: Zero configuration, file-based, perfect for this scale. Production would use PostgreSQL, but migration is straightforward."

**Q: How is it secure?**
"A: Parameterized queries prevent SQL injection, form validation, admin mode controls access. Production would add authentication, encryption, and audit logs."

**Q: What happens if you have 1 million deliverables?**
"A: Current setup handles ~10k easily. Beyond that, add pagination, database indexes, and caching (Redis). The architecture supports this scaling."

**Q: What if requirements change?**
"A: The clean separation of frontend, backend, and database means we can modify one layer without touching others. Adding new features is straightforward."

**Q: How long to onboard a new developer?**
"A: About 15 minutes. Read the README, run the setup commands, start the servers. The code uses standard patterns everyone knows."

---

## Questions They Might Ask

1. **"Why didn't you use [tech X]?"**
   - Answer: "I evaluated [alternatives] but [chosen tech] was the best fit because [reason]. For production, I'd consider [more robust option]."

2. **"What would you do differently with more time?"**
   - Answer: "Add proper authentication, database encryption, performance monitoring, automated tests, and CI/CD pipeline."

3. **"How would you handle 10,000 users?"**
   - Answer: "Scale the database to PostgreSQL, add Redis caching, implement pagination, use a CDN for static assets, and add load balancing."

4. **"What about mobile?"**
   - Answer: "The current app is responsive for tablets. True mobile would need responsive CSS media queries, which I'd add next."

5. **"How do you prevent data loss?"**
   - Answer: "Implement automated backups, version control, and managed database services that handle redundancy."

6. **"What's your biggest technical risk?"**
   - Answer: "Key person dependency . Mitigation: clear documentation and standard tech stack."

---



## Things I Would Add
------
Editing Projects