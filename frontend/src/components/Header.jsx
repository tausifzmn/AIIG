export default function Header({ onAddProject, onAddDeliverable, isAdminMode, onToggleAdmin }) {
  return (
    <header style={{ backgroundColor: '#000', borderBottom: '1px solid #222', padding: '24px 0' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#d4af37' }}></span>
          <span style={{ fontSize: '16px', fontWeight: '500', color: '#fff', letterSpacing: '0.5px' }}>AIIG</span>
        </div>
        
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            onClick={onToggleAdmin}
            style={{ padding: '6px 12px', backgroundColor: isAdminMode ? '#d4af37' : '#222', border: '1px solid #444', borderRadius: '4px', color: isAdminMode ? '#000' : '#666', cursor: 'pointer', fontSize: '11px', letterSpacing: '0.5px', fontWeight: '500' }}
          >
            {isAdminMode ? '🔒 Admin ON' : '🔓 Admin OFF'}
          </button>
          <button
            onClick={onAddProject}
            style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #d4af37', borderRadius: '4px', color: '#d4af37', cursor: 'pointer', fontSize: '12px', letterSpacing: '0.5px' }}
            onMouseEnter={(e) => { e.target.style.backgroundColor = '#d4af37'; e.target.style.color = '#000'; }}
            onMouseLeave={(e) => { e.target.style.backgroundColor = 'transparent'; e.target.style.color = '#d4af37'; }}
          >
            + Project
          </button>
          <button
            onClick={onAddDeliverable}
            style={{ padding: '8px 16px', backgroundColor: '#d4af37', border: 'none', borderRadius: '4px', color: '#000', cursor: 'pointer', fontSize: '12px', fontWeight: '500', letterSpacing: '0.5px' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#c9a632'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#d4af37'}
          >
            + Deliverable
          </button>
        </div>
      </div>
    </header>
  );
}
