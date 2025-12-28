/* ============================================
   RENTAL BRIDGE - AUTHENTICATION SYSTEM
   ============================================ */

// Register new user
function register(name, email, phone, password, role) {
  // Check if user already exists
  const existingUser = getUserByEmail(email);
  if (existingUser) {
    return { success: false, message: 'Email already registered' };
  }

  // Create new user
  const newUser = addUser({
    name,
    email,
    phone,
    password, // In production, hash this!
    role
  });

  return { success: true, message: 'Registration successful! Please login.' };
}

// Login user
function login(email, password, remember = false) {
  const user = getUserByEmail(email);

  if (!user) {
    return { success: false, message: 'User not found' };
  }

  if (user.password !== password) {
    return { success: false, message: 'Invalid password' };
  }

  // Store current user (without password)
  const userSession = {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role
  };

  if (remember) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userSession));
  } else {
    sessionStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(userSession));
  }

  return { success: true, message: 'Login successful!' };
}

// Logout user
function logout() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  sessionStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  window.location.href = '/index.html';
}

// Get current logged-in user
function getCurrentUser() {
  const userStr = localStorage.getItem(STORAGE_KEYS.CURRENT_USER) || 
                  sessionStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return userStr ? JSON.parse(userStr) : null;
}

// Check if user is logged in
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// Check if user has specific role
function hasRole(role) {
  const user = getCurrentUser();
  return user && user.role === role;
}

// Protect page (redirect if not authenticated)
function protectPage(requiredRole = null) {
  const user = getCurrentUser();

  if (!user) {
    window.location.href = '/login.html';
    return false;
  }

  if (requiredRole && user.role !== requiredRole) {
    alert('Access denied. You do not have permission to view this page.');
    window.location.href = '/index.html';
    return false;
  }

  return true;
}

// Update navbar based on auth state
function updateNavbar() {
  const user = getCurrentUser();
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const userName = document.getElementById('userName');
  const dashboardLink = document.getElementById('dashboardLink');

  if (!authButtons || !userMenu) return;

  if (user) {
    authButtons.classList.add('hidden');
    userMenu.classList.remove('hidden');
    if (userName) userName.textContent = user.name;

    // Set dashboard link based on role
    if (dashboardLink) {
      if (user.role === 'admin') {
        dashboardLink.href = '/pages/admin/dashboard.html';
      } else if (user.role === 'owner') {
        dashboardLink.href = '/pages/owner/dashboard.html';
      } else {
        dashboardLink.href = '/pages/seeker/dashboard.html';
      }
    }

    // Setup logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.onclick = logout;
    }

    // Setup user menu dropdown
    const userBtn = document.getElementById('userBtn');
    const dropdownMenu = document.getElementById('dropdownMenu');
    if (userBtn && dropdownMenu) {
      userBtn.onclick = () => {
        dropdownMenu.classList.toggle('hidden');
      };

      // Close dropdown when clicking outside
      document.addEventListener('click', (e) => {
        if (!userMenu.contains(e.target)) {
          dropdownMenu.classList.add('hidden');
        }
      });
    }
  } else {
    authButtons.classList.remove('hidden');
    userMenu.classList.add('hidden');
  }
}