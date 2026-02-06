import { useState } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import DeliverablesTable from './components/DeliverablesTable';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import AddProjectForm from './components/AddProjectForm';
import AddDeliverableForm from './components/AddDeliverableForm';

function App() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddDeliverable, setShowAddDeliverable] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleProjectAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleDeliverableAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#1a1a1a', color: '#fff', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <Header onAddProject={() => setShowAddProject(true)} onAddDeliverable={() => setShowAddDeliverable(true)} isAdminMode={isAdminMode} onToggleAdmin={() => setIsAdminMode(!isAdminMode)} />
      <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 32px' }}>
        <UpcomingDeadlines key={`upcoming-${refreshKey}`} />
        <SearchBar onProjectSelect={setSelectedProject} key={`search-${refreshKey}`} isAdminMode={isAdminMode}/>
        <DeliverablesTable project={selectedProject} isAdminMode={isAdminMode} key={`table-${selectedProject?.id}-${refreshKey}`} />
      </main>
      <footer style={{ marginTop: '80px', padding: '24px', textAlign: 'center' }}>
        <p style={{ color: '#555', fontSize: '12px', letterSpacing: '1px' }}>© 2026 AIIG</p>
      </footer>

      <AddProjectForm 
        isOpen={showAddProject} 
        onClose={() => setShowAddProject(false)} 
        onSuccess={handleProjectAdded}
      />
      <AddDeliverableForm 
        isOpen={showAddDeliverable} 
        onClose={() => setShowAddDeliverable(false)} 
        onSuccess={handleDeliverableAdded}
      />
    </div>
  );
}

export default App;
