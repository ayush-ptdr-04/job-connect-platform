// Initialize app state
function initApp() {
  updateNavLinks();
}

// Update navigation links based on user login state
function updateNavLinks() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navLinks = document.getElementById('nav-links');
  if (!navLinks) return;

  if (user) {
    navLinks.innerHTML = `
      <a href="index.html" class="hover:text-teal-300 transition"><i class="fas fa-home mr-1"></i> Home</a>
      <a href="${user.role}-dashboard.html" class="hover:text-teal-300 transition"><i class="fas fa-tachometer-alt mr-1"></i> Dashboard</a>
      <button id="logout-btn" class="hover:text-teal-300 transition"><i class="fas fa-sign-out-alt mr-1"></i> Logout</button>
    `;
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
      });
    }
  } else {
    navLinks.innerHTML = `
      <a href="index.html" class="hover:text-teal-300 transition"><i class="fas fa-home mr-1"></i> Home</a>
      <a href="login.html" class="hover:text-teal-300 transition"><i class="fas fa-sign-in-alt mr-1"></i> Login</a>
      <a href="register.html" class="hover:text-teal-300 transition"><i class="fas fa-user-plus mr-1"></i> Register</a>
    `;
  }
}

// Run initialization
document.addEventListener('DOMContentLoaded', initApp);