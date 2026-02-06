import { useState, useEffect } from 'react';

export default function SearchBar({ onProjectSelect }) {
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then(res => res.json())
      .then(data => { setProjects(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = projects.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSelect = (project) => {
    onProjectSelect(project);
    setSearchTerm(project.name);
    setShowDropdown(false);
  };

  return (
    <div style={{ marginBottom: '48px' }}>
      <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px', letterSpacing: '0.5px' }}>Search Projects</p>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setShowDropdown(true); }}
          onFocus={() => setShowDropdown(true)}
          placeholder={loading ? 'Loading...' : 'Type to search...'}
          style={{
            width: '100%',
            padding: '16px 20px',
            backgroundColor: 'transparent',
            border: '1px solid #333',
            borderRadius: '4px',
            color: '#fff',
            fontSize: '16px',
            outline: 'none',
            boxSizing: 'border-box',
            transition: 'border-color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.borderColor = '#d4af37'}
          onMouseLeave={(e) => e.target.style.borderColor = '#333'}
        />
        {showDropdown && searchTerm && filtered.length > 0 && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#222',
            border: '1px solid #333',
            borderTop: 'none',
            borderRadius: '0 0 4px 4px',
            zIndex: 10,
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {filtered.map(p => (
              <div
                key={p.id}
                onClick={() => handleSelect(p)}
                style={{ padding: '14px 20px', cursor: 'pointer', color: '#ccc', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.target.style.backgroundColor = '#2a2a2a'; e.target.style.color = '#d4af37'; }}
                onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#ccc'; }}
              >
                {p.name}
              </div>
            ))}
          </div>
        )}
      </div>
      <p style={{ color: '#555', fontSize: '12px', marginTop: '12px' }}>{projects.length} projects available</p>
    </div>
  );
}
