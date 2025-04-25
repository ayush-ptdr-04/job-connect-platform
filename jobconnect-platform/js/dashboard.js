function setupDashboards() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Student Dashboard
  const studentJobs = document.getElementById('student-jobs');
  const studentApplications = document.getElementById('student-applications');
  if (studentJobs && studentApplications && user.role === 'student') {
    renderStudentDashboard();
  }

  // HR Dashboard
  const jobForm = document.getElementById('job-form');
  const hrJobs = document.getElementById('hr-jobs');
  const hrApplications = document.getElementById('hr-applications');
  if (jobForm && hrJobs && hrApplications && user.role === 'hr') {
    renderHRDashboard();
    setupJobForm();
    setupApplicationFilters();
  }
}

// Render Student Dashboard
function renderStudentDashboard() {
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const applications = JSON.parse(localStorage.getItem('applications')) || [];
  const user = JSON.parse(localStorage.getItem('user'));

  const studentJobs = document.getElementById('student-jobs');
  studentJobs.innerHTML = '';
  jobs.forEach((job, index) => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'mb-4 job-card bg-white p-6 rounded-lg shadow-md transition transform animate-fade-in';
    jobDiv.style.animationDelay = `${index * 0.1}s`;
    jobDiv.innerHTML = `
      <h4 class="font-semibold">${job.title}</h4>
      <p class="text-gray-600"><i class="fas fa-building mr-1"></i> ${job.company} - ${job.location}</p>
      <button class="apply-btn mt-2 bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500 transition" data-job-id="${job.id}"><i class="fas fa-paper-plane mr-1"></i> Apply</button>
    `;
    studentJobs.appendChild(jobDiv);
  });

  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      showApplyModal(btn.dataset.jobId);
    });
  });

  const studentApplications = document.getElementById('student-applications');
  studentApplications.innerHTML = '';
  const userApps = applications.filter(app => app.studentEmail === user.email);
  userApps.forEach((app, index) => {
    const appDiv = document.createElement('div');
    appDiv.className = 'mb-4 job-card bg-white p-6 rounded-lg shadow-md transition transform animate-fade-in';
    appDiv.style.animationDelay = `${index * 0.1}s`;
    appDiv.innerHTML = `
      <h4 class="font-semibold">${app.jobTitle}</h4>
      <p class="text-gray-600"><i class="fas fa-info-circle mr-1"></i> Status: ${app.status}</p>
    `;
    studentApplications.appendChild(appDiv);
  });
}

// Render HR Dashboard
function renderHRDashboard() {
  const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
  const applications = JSON.parse(localStorage.getItem('applications')) || [];

  const hrJobs = document.getElementById('hr-jobs');
  hrJobs.innerHTML = '';
  jobs.forEach((job, index) => {
    const jobDiv = document.createElement('div');
    jobDiv.className = 'mb-4 border-b pb-4 job-card bg-white p-6 rounded-lg shadow-md transition transform animate-fade-in';
    jobDiv.style.animationDelay = `${index * 0.1}s`;
    jobDiv.innerHTML = `
      <h4 class="font-semibold">${job.title}</h4>
      <p class="text-gray-600"><i class="fas fa-building mr-1"></i> ${job.company} - ${job.location}</p>
      <p class="text-gray-600"><i class="fas fa-info-circle mr-1"></i> Status: ${job.status}</p>
      ${job.status === 'open' ? `<button class="close-btn mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition" data-job-id="${job.id}"><i class="fas fa-times mr-1"></i> Close Job</button>` : ''}
    `;
    hrJobs.appendChild(jobDiv);
  });

  document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const jobId = btn.dataset.jobId;
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      const updatedJobs = jobs.map(job => job.id === jobId ? { ...job, status: 'closed' } : job);
      localStorage.setItem('jobs', JSON.stringify(updatedJobs));
      renderHRDashboard();
    });
  });

  const hrApplications = document.getElementById('hr-applications');
  hrApplications.innerHTML = '';
  const skillFilter = document.getElementById('app-skill-filter')?.value.toLowerCase() || '';
  const locationFilter = document.getElementById('app-location-filter')?.value.toLowerCase() || '';

  const filteredApps = applications.filter(app => 
    (skillFilter ? app.skills.some(skill => skill.toLowerCase().includes(skillFilter)) : true) &&
    (locationFilter ? app.location.toLowerCase().includes(locationFilter) : true)
  );

  filteredApps.forEach((app, index) => {
    const appDiv = document.createElement('div');
    appDiv.className = 'mb-4 border-b pb-4 job-card bg-white p-6 rounded-lg shadow-md transition transform animate-fade-in';
    appDiv.style.animationDelay = `${index * 0.1}s`;
    appDiv.innerHTML = `
      <h4 class="font-semibold">${app.jobTitle}</h4>
      <p class="text-gray-600"><i class="fas fa-user mr-1"></i> Applicant: ${app.studentEmail}</p>
      <p class="text-gray-600"><i class="fas fa-code mr-1"></i> Skills: ${app.skills.join(', ')}</p>
      <p class="text-gray-600"><i class="fas fa-map-marker-alt mr-1"></i> Location: ${app.location}</p>
      <p class="text-gray-600"><i class="fas fa-info-circle mr-1"></i> Status: ${app.status}</p>
    `;
    hrApplications.appendChild(appDiv);
  });
}

// Setup job posting form
function setupJobForm() {
  const jobForm = document.getElementById('job-form');
  if (jobForm) {
    jobForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const job = {
        id: Date.now().toString(),
        title: document.getElementById('job-title').value,
        company: document.getElementById('job-company').value,
        location: document.getElementById('job-location').value,
        type: document.getElementById('job-type').value,
        skills: document.getElementById('job-skills').value.split(',').map(s => s.trim()),
        description: document.getElementById('job-description').value,
        status: 'open',
      };
      const jobs = JSON.parse(localStorage.getItem('jobs')) || [];
      jobs.push(job);
      localStorage.setItem('jobs', JSON.stringify(jobs));
      jobForm.reset();
      Swal.fire({
        title: 'Success!',
        text: 'Job posted successfully!',
        icon: 'success',
        confirmButtonColor: '#2dd4bf',
      });
      renderHRDashboard();
    });
  }
}

// Setup application filters
function setupApplicationFilters() {
  const skillFilter = document.getElementById('app-skill-filter');
  const locationFilter = document.getElementById('app-location-filter');

  if (skillFilter) {
    skillFilter.addEventListener('input', renderHRDashboard);
  }
  if (locationFilter) {
    locationFilter.addEventListener('input', renderHRDashboard);
  }
}

document.addEventListener('DOMContentLoaded', setupDashboards);