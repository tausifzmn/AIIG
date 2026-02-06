// Seed script to populate database from Excel file
import XLSX from 'xlsx';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { initializeDatabase, runQuery, getQuery, db } from '../src/config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Parse date - Excel stores dates as numbers, convert to YYYY-MM-DD
const parseDate = (dateValue) => {
  // If it's already a string in M/D/YYYY format
  if (typeof dateValue === 'string') {
    const [month, day, year] = dateValue.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  }
  
  // If it's an Excel serial date number
  if (typeof dateValue === 'number') {
    const date = XLSX.SSF.parse_date_code(dateValue);
    return `${date.y}-${String(date.m).padStart(2, '0')}-${String(date.d).padStart(2, '0')}`;
  }
  
  return dateValue;
};

const seedDatabase = async () => {
  try {
    console.log('!!! Starting database seed... !!!');
    
    // Initialize database schema
    initializeDatabase();
    
    // Wait a bit for schema initialization
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Read Excel file
    const excelPath = join(__dirname, 'dataset.xlsx');
    const workbook = XLSX.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);
    
    console.log(` Found ${data.length} deliverables in Excel file`);
    
    // Track unique projects
    const projectsMap = new Map();
    
    // Process each row
    for (const row of data) {
      const projectName = row['Project'];
      const deliverable = row['Deliverable'];
      const dueDate = parseDate(row['Due Date']);
      const frequency = row['Frequency'];
      const projectManager = row['Project Manager'];
      
      // Insert project if not exists
      if (!projectsMap.has(projectName)) {
        try {
          const result = await runQuery(
            'INSERT INTO projects (name) VALUES (?)',
            [projectName]
          );
          projectsMap.set(projectName, result.id);
          console.log(` Added project: ${projectName}`);
        } catch (err) {
          // Project might already exist, fetch it
          const existing = await getQuery(
            'SELECT id FROM projects WHERE name = ?',
            [projectName]
          );
          if (existing) {
            projectsMap.set(projectName, existing.id);
          }
        }
      }
      
      // Insert deliverable
      const projectId = projectsMap.get(projectName);
      await runQuery(
        `INSERT INTO deliverables (project_id, description, due_date, frequency, project_manager) 
         VALUES (?, ?, ?, ?, ?)`,
        [projectId, deliverable, dueDate, frequency, projectManager]
      );
    }
    
    console.log(`\n Database seeding complete!`);
    console.log(` Projects: ${projectsMap.size}`);
    console.log(` Deliverables: ${data.length}`);
    
    // Close database connection
    db.close((err) => {
      if (err) {
        console.error('Error closing database:', err);
      } else {
        console.log('Database connection closed');
      }
    });
    
  } catch (error) {
    console.error(' Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed
seedDatabase();
