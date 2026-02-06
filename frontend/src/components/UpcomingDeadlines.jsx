import { useState, useEffect } from 'react';

export default function UpcomingDeadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/deliverables/upcoming?days=14')
      .then(res => res.json())
      .then(data => { setDeadlines(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const getDateColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return '#e74c3c';
    if (diff <= 7) return '#d4af37';
    return '#3498db';
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  if (loading) return null;
  if (deadlines.length === 0) return null;

  const urgent = deadlines.filter(d => {
    const diff = Math.ceil((new Date(d.due_date) - new Date()) / (1000 * 60 * 60 * 24));
    return diff <= 7;
  });

  if (urgent.length === 0) return null;

  return (
    <div style={{ marginBottom: '48px', padding: '20px', backgroundColor: '#1f1f1f', borderRadius: '8px', borderLeft: '3px solid #d4af37' }}>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <p style={{ fontSize: '12px', color: '#d4af37', letterSpacing: '1px', textTransform: 'uppercase', margin: 0 }}>
          ⚠ Urgent: {urgent.length} deliverable{urgent.length > 1 ? 's' : ''} due within 7 days
        </p>
        <span style={{ 
          color: '#d4af37', 
          fontSize: '18px',
          transition: 'transform 0.2s',
          transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
          display: 'inline-block'
        }}>
          ▼
        </span>
      </div>

      {expanded && (
        <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {urgent.map(d => (
            <div key={d.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
              <div>
                <span style={{ color: '#ccc' }}>{d.description}</span>
                <span style={{ color: '#666', marginLeft: '8px' }}>— {d.project_name}</span>
              </div>
              <span style={{ color: getDateColor(d.due_date), fontWeight: '500' }}>{formatDate(d.due_date)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
