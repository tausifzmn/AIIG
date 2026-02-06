import { useState, useEffect } from 'react';

export default function DeliverablesTable({ project }) {
  const [deliverables, setDeliverables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!project) return;

    let cancelled = false;
    setDeliverables([]);
    setLoading(true);
    
    fetch(`http://localhost:5000/api/projects/${project.id}/deliverables`)
      .then(res => res.json())
      .then(data => {
        if (!cancelled) {
          setDeliverables(data);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) setLoading(false);
      });

    return () => { cancelled = true; };
  }, [project]);

  const getDateColor = (dueDate) => {
    const diff = Math.ceil((new Date(dueDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (diff < 0) return '#e74c3c';
    if (diff <= 7) return '#d4af37';
    if (diff <= 30) return '#3498db';
    return '#666';
  };

  const formatDate = (d) => new Date(d).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  if (!project) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 0' }}>
        <p style={{ color: '#555', fontSize: '16px' }}>Select a project to view deliverables</p>
      </div>
    );
  }

  if (loading) return <p style={{ color: '#555' }}>Loading...</p>;

  return (
    <div>
      <div style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ width: '40px', height: '2px', backgroundColor: '#d4af37' }}></span>
        <h2 style={{ fontSize: '32px', fontWeight: '300', color: '#fff', margin: 0 }}>{project.name}</h2>
      </div>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '32px' }}>{deliverables.length} deliverables</p>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
            {['DELIVERABLE', 'DUE DATE', 'FREQUENCY', 'PROJECT MANAGER'].map(h => (
              <th key={h} style={{ padding: '16px 0', textAlign: 'left', fontSize: '11px', color: '#555', letterSpacing: '1px', fontWeight: '400' }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {deliverables.map(d => (
            <tr key={d.id} style={{ borderBottom: '1px solid #222' }}>
              <td style={{ padding: '18px 0', color: '#ccc', fontSize: '14px' }}>{d.description}</td>
              <td style={{ padding: '18px 0', color: getDateColor(d.due_date), fontSize: '14px' }}>{formatDate(d.due_date)}</td>
              <td style={{ padding: '18px 0', color: '#666', fontSize: '14px' }}>{d.frequency || '—'}</td>
              <td style={{ padding: '18px 0', color: '#888', fontSize: '14px' }}>{d.project_manager}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: '40px', display: 'flex', gap: '24px', fontSize: '11px', color: '#555' }}>
        <span><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#e74c3c', marginRight: '6px' }}></span>Overdue</span>
        <span><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#d4af37', marginRight: '6px' }}></span>7 days</span>
        <span><span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#3498db', marginRight: '6px' }}></span>30 days</span>
      </div>
    </div>
  );
}
