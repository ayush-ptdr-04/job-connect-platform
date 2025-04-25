// Mock authentication using localStorage
function setupAuth() {
  // Login
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      const errorDiv = document.getElementById('login-error');

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = `${user.role}-dashboard.html`;
      } else {
        errorDiv.textContent = 'Invalid credentials';
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('animate-fade-in');
      }
    });
  }

  // Register
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', () => {
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const role = document.getElementById('register-role').value;
      const errorDiv = document.getElementById('register-error');

      const users = JSON.parse(localStorage.getItem('users')) || [];
      if (users.some(u => u.email === email)) {
        errorDiv.textContent = 'Email already registered';
        errorDiv.classList.remove('hidden');
        errorDiv.classList.add('animate-fade-in');
        return;
      }

      const newUser = { email, password, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('user', JSON.stringify(newUser));
      window.location.href = `${role}-dashboard.html`;
    });
  }
}

document.addEventListener('DOMContentLoaded', setupAuth);