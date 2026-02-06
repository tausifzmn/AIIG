// API routes for deliverables
import express from 'express';
import { allQuery, runQuery, getQuery } from '../config/database.js';

const router = express.Router();

// GET /api/deliverables - Get all deliverables
router.get('/', async (req, res) => {
  try {
    const deliverables = await allQuery(
      'SELECT * FROM deliverables ORDER BY due_date'
    );
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching deliverables:', error);
    res.status(500).json({ error: 'Failed to fetch deliverables' });
  }
});

// GET /api/deliverables/upcoming - Get urgent deliverables (next 7 days) across all projects
router.get('/upcoming', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 7;
    const deliverables = await allQuery(
      `SELECT d.*, p.name as project_name 
       FROM deliverables d 
       JOIN projects p ON d.project_id = p.id 
       WHERE date(d.due_date) <= date('now', '+' || ? || ' days')
       ORDER BY d.due_date`,
      [days]
    );
    res.json(deliverables);
  } catch (error) {
    console.error('Error fetching upcoming deliverables:', error);
    res.status(500).json({ error: 'Failed to fetch upcoming deliverables' });
  }
});

// POST /api/deliverables - Create new deliverable (BONUS)
router.post('/', async (req, res) => {
  try {
    const { project_id, description, due_date, frequency, project_manager } = req.body;
    
    // Validate required fields
    if (!project_id || !description || !due_date || !project_manager) {
      return res.status(400).json({ 
        error: 'Missing required fields: project_id, description, due_date, project_manager' 
      });
    }
    
    // Validate project exists
    const project = await getQuery('SELECT id FROM projects WHERE id = ?', [project_id]);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Insert new deliverable
    const result = await runQuery(
      `INSERT INTO deliverables (project_id, description, due_date, frequency, project_manager) 
       VALUES (?, ?, ?, ?, ?)`,
      [project_id, description, due_date, frequency || null, project_manager]
    );
    
    // Return created deliverable
    const newDeliverable = await getQuery(
      'SELECT * FROM deliverables WHERE id = ?',
      [result.id]
    );
    res.status(201).json(newDeliverable);
  } catch (error) {
    console.error('Error creating deliverable:', error);
    res.status(500).json({ error: 'Failed to create deliverable' });
  }
});

export default router;
