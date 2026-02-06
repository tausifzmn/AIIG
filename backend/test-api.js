// Quick test script to verify API endpoints
const testAPI = async () => {
  const baseURL = 'http://localhost:5000/api';
  
  try {
    console.log('🧪 Testing API Endpoints...\n');
    
    // Test 1: Get all projects
    console.log('1️⃣ Testing GET /api/projects');
    const projectsRes = await fetch(`${baseURL}/projects`);
    const projects = await projectsRes.json();
    console.log(`   ✅ Found ${projects.length} projects`);
    projects.forEach(p => console.log(`      - ${p.name} (ID: ${p.id})`));
    
    // Test 2: Get deliverables for first project
    if (projects.length > 0) {
      const firstProject = projects[0];
      console.log(`\n2️⃣ Testing GET /api/projects/${firstProject.id}/deliverables`);
      const deliverablesRes = await fetch(`${baseURL}/projects/${firstProject.id}/deliverables`);
      const deliverables = await deliverablesRes.json();
      console.log(`   ✅ Found ${deliverables.length} deliverables for "${firstProject.name}"`);
      if (deliverables.length > 0) {
        console.log(`      First: ${deliverables[0].description} (Due: ${deliverables[0].due_date})`);
      }
    }
    
    console.log('\n✨ All tests passed!');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
};

testAPI();
