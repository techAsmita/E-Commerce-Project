const baseURL = 'http://localhost:5000/api';

// Helpers
function setUser(token, user) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  applyUserToUI();
}
function clearUser() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  applyUserToUI();
}
function getToken() {
  return localStorage.getItem('token');
}
function getUser() {
  return JSON.parse(localStorage.getItem('user') || 'null');
}

// Apply user state to nav (called on every page load)
function applyUserToUI() {
  const user = getUser();
  document.querySelectorAll('#user-display').forEach(el => {
    el.textContent = user ? `Hello, ${user.name}` : '';
  });

  const loginLink = document.getElementById('login-link');
  const registerLink = document.getElementById('register-link');
  const logoutBtn = document.getElementById('logout-btn');
  const adminLink = document.getElementById('admin-link');

  if (user) {
    if (loginLink) loginLink.style.display = 'none';
    if (registerLink) registerLink.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
    if (adminLink) adminLink.style.display = user.is_admin ? 'inline-block' : 'none';
  } else {
    if (loginLink) loginLink.style.display = 'inline-block';
    if (registerLink) registerLink.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
    if (adminLink) adminLink.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  applyUserToUI();

  // Logout button
  document.querySelectorAll('#logout-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      clearUser();
      window.location.href = 'index.html';
    });
  });

  // Login form handling
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(loginForm);
      const body = { email: fd.get('email'), password: fd.get('password') };

      const res = await fetch(`${baseURL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (data.token) {
        setUser(data.token, data.user);
        window.location.href = 'index.html';
      } else {
        alert(data.message || 'Login failed');
      }
    });
  }

  // Register form handling
  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const fd = new FormData(registerForm);
      const body = { name: fd.get('name'), email: fd.get('email'), password: fd.get('password') };

      const res = await fetch(`${baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Registered successfully. Please login.');
        window.location.href = 'login.html';
      } else {
        alert(data.message || 'Registration failed');
      }
    });
  }
});