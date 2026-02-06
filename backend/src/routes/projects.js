// API routes for projects
import express from 'express';
import { allQuery, runQuery, getQuery } from '../config/database.js';

const router = express.Router();

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await allQuery('SELECT * FROM projects ORDER BY name');
    res.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const project = await getQuery('SELECT * FROM projects WHERE id = ?', [id]);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    res.json(project);
  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({ error: 'Failed to fetch project' });
  }
});

// GET /api/projects/:id/deliverables - Get deliverables for a project
router.get('/:id/deliverables', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if project exists
    const project = await getQuery('SELECT * FROM projects WHERE id = ?', [id]);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Get deliverables ordered by due date
    const deliverables = await allQuery(
      'SELECT * FROM deliverables WHERE project_id = ? ORDER BY due_date',
      [id]
    );
    
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching deliverables:', error);
    res.status(500).json({ error: 'Failed to fetch deliverables' });
  }
});

// POST /api/projects - Create new project (BONUS)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    
    // Validate input
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Project name is required' });
    }
    
    // Check if project already exists
    const existing = await getQuery('SELECT id FROM projects WHERE name = ?', [name]);
    if (existing) {
      return res.status(409).json({ error: 'Project already exists' });
    }
    
    // Insert new project
    const result = await runQuery('INSERT INTO projects (name) VALUES (?)', [name]);
    
    // Return created project
    const newProject = await getQuery('SELECT * FROM projects WHERE id = ?', [result.id]);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ error: 'Failed to create project' });
  }
});

export default router;
