import { useState } from 'react';

export default function AddProjectForm({ isOpen, onClose, onSuccess }) {
  const [projectName, setProjectName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectName.trim()) {
      setError('Project name is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: projectName.trim() })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create project');
      }

      setProjectName('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }} onClick={onClose}>
      <div style={{ backgroundColor: '#1f1f1f', padding: '32px', borderRadius: '8px', border: '1px solid #333', minWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: '20px', fontWeight: '300', color: '#fff', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>Add New Project</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>PROJECT NAME</label>
            <input
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="e.g., New Toronto Hospital"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          {error && (
            <p style={{ color: '#e74c3c', fontSize: '12px', marginBottom: '16px' }}>{error}</p>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={onClose}
              style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #333', borderRadius: '4px', color: '#888', cursor: 'pointer', fontSize: '14px' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#222'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{ padding: '10px 20px', backgroundColor: '#d4af37', border: 'none', borderRadius: '4px', color: '#000', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: '500' }}
              onMouseEnter={(e) => { if (!loading) e.target.style.backgroundColor = '#c9a632'; }}
              onMouseLeave={(e) => { if (!loading) e.target.style.backgroundColor = '#d4af37'; }}
            >
              {loading ? 'Creating...' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
