// Mock job data
const initialJobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Corp",
    location: "Remote",
    type: "full-time",
    skills: ["React", "JavaScript"],
    description: "Build user interfaces with React.",
    status: "open",
  },
  {
    id: "2",
    title: "Marketing Intern",
    company: "GrowEasy",
    location: "New York",
    type: "internship",
    skills: ["Marketing", "SEO"],
    description: "Assist with digital marketing campaigns.",
    status: "open",
  },
];

// Initialize jobs
function initJobs() {
  if (!localStorage.getItem("jobs")) {
    localStorage.setItem("jobs", JSON.stringify(initialJobs));
  }

  const jobListings = document.getElementById("job-listings");
  if (jobListings) {
    renderJobs();
    setupFilters();
  }
}

// Render jobs with animation
function renderJobs() {
  const jobListings = document.getElementById("job-listings");
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const typeFilter = document.getElementById("job-type-filter")?.value || "";
  const skillFilter =
    document.getElementById("skill-filter")?.value.toLowerCase() || "";

  jobListings.innerHTML = "";
  const filteredJobs = jobs.filter(
    (job) =>
      (typeFilter ? job.type === typeFilter : true) &&
      (skillFilter
        ? job.skills.some((skill) => skill.toLowerCase().includes(skillFilter))
        : true)
  );

  filteredJobs.forEach((job, index) => {
    const jobCard = document.createElement("div");
    jobCard.className =
      "job-card bg-white p-6 rounded-lg shadow-md transition transform animate-fade-in";
    jobCard.style.animationDelay = `${index * 0.1}s`;
    jobCard.innerHTML = `
      <h3 class="text-xl font-semibold">${job.title}</h3>
      <p class="text-gray-600"><i class="fas fa-building mr-1"></i> ${job.company}</p>
      <p class="text-gray-600"><i class="fas fa-map-marker-alt mr-1"></i> ${job.location}</p>
      <p class="text-gray-600"><i class="fas fa-briefcase mr-1"></i> ${job.type}</p>
      <p class="mt-2">${job.description}</p>
      <button class="apply-btn mt-4 bg-teal-400 text-white px-4 py-2 rounded hover:bg-teal-500 transition" data-job-id="${job.id}"><i class="fas fa-paper-plane mr-1"></i> Apply Now</button>
    `;
    jobListings.appendChild(jobCard);
  });

  // Setup apply buttons
  document.querySelectorAll(".apply-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const jobId = btn.dataset.jobId;
      showApplyModal(jobId);
    });
  });
}

// Setup job filters
function setupFilters() {
  const typeFilter = document.getElementById("job-type-filter");
  const skillFilter = document.getElementById("skill-filter");

  if (typeFilter) {
    typeFilter.addEventListener("change", renderJobs);
  }
  if (skillFilter) {
    skillFilter.addEventListener("input", renderJobs);
  }
}

// Show apply modal
function showApplyModal(jobId) {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    Swal.fire({
      title: "Login Required",
      text: "Please login to apply for jobs.",
      icon: "warning",
      confirmButtonColor: "#2dd4bf",
      confirmButtonText: "Go to Login",
    }).then(() => {
      window.location.href = "login.html";
    });
    return;
  }

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;

  const modal = document.getElementById("apply-modal");
  const modalTitle = document.getElementById("modal-job-title");
  modalTitle.textContent = `Apply for ${job.title} at ${job.company}`;
  modal.classList.remove("hidden");

  const confirmBtn = document.getElementById("confirm-apply");
  const cancelBtn = document.getElementById("cancel-apply");

  confirmBtn.onclick = () => {
    applyForJob(jobId);
    modal.classList.add("hidden");
  };
  cancelBtn.onclick = () => {
    modal.classList.add("hidden");
  };
}

// Apply for a job
function applyForJob(jobId) {
  const user = JSON.parse(localStorage.getItem("user"));
  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  const job = jobs.find((j) => j.id === jobId);
  if (!job) return;

  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  applications.push({
    id: Date.now().toString(),
    jobId,
    jobTitle: job.title,
    studentEmail: user.email,
    skills: ["React", "JavaScript"], // Mock skills
    location: "Remote", // Mock location
    status: "Pending",
  });
  localStorage.setItem("applications", JSON.stringify(applications));
  Swal.fire({
    title: "Success!",
    text: "Application submitted successfully!",
    icon: "success",
    confirmButtonColor: "#2dd4bf",
  });
}

document.addEventListener("DOMContentLoaded", initJobs);
