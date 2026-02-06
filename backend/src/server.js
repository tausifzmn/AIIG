// Main Express server for AIIG Deliverables Management System
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './config/database.js';
import projectsRouter from './routes/projects.js';
import deliverablesRouter from './routes/deliverables.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for frontend connection
app.use(express.json()); // Parse JSON request bodies

// Initialize database on server start
initializeDatabase();

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/deliverables', deliverablesRouter);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'AIIG Deliverables API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to AIIG Deliverables Management API',
    endpoints: {
      projects: '/api/projects',
      deliverables: '/api/deliverables',
      health: '/api/health'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
