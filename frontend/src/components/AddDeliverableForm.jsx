import { useState, useEffect } from 'react';

export default function AddDeliverableForm({ isOpen, onClose, onSuccess }) {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    project_id: '',
    description: '',
    due_date: '',
    frequency: '',
    project_manager: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetch('http://localhost:5000/api/projects')
        .then(res => res.json())
        .then(data => setProjects(data))
        .catch(() => setError('Failed to load projects'));
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.project_id || !formData.description || !formData.due_date || !formData.project_manager) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/api/deliverables', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create deliverable');
      }

      setFormData({ project_id: '', description: '', due_date: '', frequency: '', project_manager: '' });
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
      <div style={{ backgroundColor: '#1f1f1f', padding: '32px', borderRadius: '8px', border: '1px solid #333', minWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ fontSize: '20px', fontWeight: '300', color: '#fff', marginBottom: '24px', borderBottom: '1px solid #333', paddingBottom: '12px' }}>Add New Deliverable</h2>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>PROJECT *</label>
            <select
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            >
              <option value="">Select a project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>DELIVERABLE DESCRIPTION *</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Submit monthly progress report"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>DUE DATE *</label>
            <input
              type="date"
              value={formData.due_date}
              onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>FREQUENCY</label>
            <input
              type="text"
              value={formData.frequency}
              onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
              placeholder="e.g., M (Monthly), Q (Quarterly), A (Annual)"
              style={{ width: '100%', padding: '12px 16px', backgroundColor: '#000', border: '1px solid #333', borderRadius: '4px', color: '#fff', fontSize: '14px', outline: 'none', boxSizing: 'border-box' }}
              onFocus={(e) => e.target.style.borderColor = '#d4af37'}
              onBlur={(e) => e.target.style.borderColor = '#333'}
            />
          </div>

          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '12px', color: '#888', marginBottom: '8px', letterSpacing: '0.5px' }}>PROJECT MANAGER *</label>
            <input
              type="text"
              value={formData.project_manager}
              onChange={(e) => setFormData({ ...formData, project_manager: e.target.value })}
              placeholder="e.g., Jane Doe"
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
              {loading ? 'Creating...' : 'Create Deliverable'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
