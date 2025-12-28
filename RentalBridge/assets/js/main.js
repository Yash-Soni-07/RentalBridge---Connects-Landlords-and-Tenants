/* ============================================
   RENTAL BRIDGE - MAIN APPLICATION SCRIPT
   ============================================ */

// ============================================
// NAVIGATION SYSTEM - FOOLPROOF VERSION
// ============================================

// Calculate base path based on current location
function getBasePath() {
  const path = window.location.pathname;
  const fullPath = path.toLowerCase();
  
  console.log('Current path:', path); // Debug
  
  // Root level - index.html or just /
  if (path === '/' || fullPath.endsWith('index.html') || !fullPath.includes('/pages/')) {
    console.log('Base path: ./'); // Debug
    return './';
  }
  
  // In pages/admin/, pages/owner/, or pages/seeker/ (2 levels deep)
  if (fullPath.includes('/pages/admin/') || 
      fullPath.includes('/pages/owner/') || 
      fullPath.includes('/pages/seeker/')) {
    console.log('Base path: ../../'); // Debug
    return '../../';
  }
  
  // In pages/ directory (1 level deep) - login, register, about, contact
  if (fullPath.includes('/pages/')) {
    console.log('Base path: ../'); // Debug
    return '../';
  }
  
  // Fallback
  console.log('Base path: ./ (fallback)'); // Debug
  return './';
}

// Navigate to a specific page
function navigateToPage(page) {
  console.log('Navigating to:', page); // Debug
  const basePath = getBasePath();
  
  // If page is 'home' or 'index.html', go to root
  if (page === 'home' || page === 'index.html') {
    const url = basePath + 'index.html';
    console.log('Going to home:', url); // Debug
    window.location.href = url;
  } else {
    const url = basePath + page;
    console.log('Going to:', url); // Debug
    window.location.href = url;
  }
}

// Setup navigation event listeners - CRITICAL FUNCTION
function setupNavigation() {
  console.log('Setting up navigation...'); // Debug
  
  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    // Get all navigation links with data-nav attribute
    const navLinks = document.querySelectorAll('[data-nav]');
    console.log('Found nav links:', navLinks.length); // Debug
    
    navLinks.forEach((link, index) => {
      // Remove any existing listeners by cloning
      const newLink = link.cloneNode(true);
      link.parentNode.replaceChild(newLink, link);
      
      // Add fresh click listener
      newLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const destination = this.getAttribute('data-nav');
        console.log('Link clicked, destination:', destination); // Debug
        navigateToPage(destination);
      });
      
      console.log(`Attached listener to link ${index + 1}:`, newLink.getAttribute('data-nav')); // Debug
    });
  }, 50);
}

// ============================================
// COMPONENT LOADING SYSTEM
// ============================================

// Main initialization
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded'); // Debug
  const basePath = getBasePath();
  
  // Load navbar with callback
  loadComponent('navbar-placeholder', basePath + 'components/navbar.html', () => {
    console.log('Navbar loaded, setting up navigation...'); // Debug
    
    // Setup all navbar functionality
    setupNavigation();
    setupUserMenu();
    setupMobileMenu();
    checkAuthState();
  });
  
  // Load footer
  loadComponent('footer-placeholder', basePath + 'components/footer.html');
});

// Load HTML components with callback
function loadComponent(placeholderId, componentPath, callback) {
  const placeholder = document.getElementById(placeholderId);
  if (!placeholder) {
    console.error('Placeholder not found:', placeholderId);
    return;
  }
  
  console.log('Loading component:', componentPath); // Debug
  
  fetch(componentPath)
    .then(response => {
      if (!response.ok) throw new Error('Component not found: ' + componentPath);
      return response.text();
    })
    .then(html => {
      placeholder.innerHTML = html;
      console.log('Component loaded:', placeholderId); // Debug
      
      // Execute callback after a small delay to ensure DOM is updated
      if (callback) {
        setTimeout(callback, 50);
      }
    })
    .catch(err => {
      console.error('Error loading component:', err);
    });
}

// ============================================
// MOBILE MENU
// ============================================

function setupMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const navbarMenu = document.getElementById('navbarMenu');
  const navbar = document.getElementById('navbar');

  if (!mobileToggle || !navbarMenu) {
    console.log('Mobile menu elements not found yet');
    return;
  }
  
  console.log('Setting up mobile menu'); // Debug

  // Remove existing listener if any
  const newToggle = mobileToggle.cloneNode(true);
  mobileToggle.parentNode.replaceChild(newToggle, mobileToggle);
  
  newToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Mobile toggle clicked'); // Debug
    
    newToggle.classList.toggle('active');
    navbarMenu.classList.toggle('active');
    if (navbar) navbar.classList.toggle('menu-open');
  });

  // Close menu when clicking nav links
  const navLinks = navbarMenu.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      newToggle.classList.remove('active');
      navbarMenu.classList.remove('active');
      if (navbar) navbar.classList.remove('menu-open');
    });
  });
}

// ============================================
// USER AUTHENTICATION & MENU
// ============================================

function setupUserMenu() {
  const userBtn = document.getElementById('userBtn');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutBtn = document.getElementById('logoutBtn');
  const dashboardLink = document.getElementById('dashboardLink');
  const profileLink = document.getElementById('profileLink');
  
  if (!userBtn || !dropdownMenu) {
    console.log('User menu elements not found yet');
    return;
  }
  
  console.log('Setting up user menu'); // Debug
  
  // Remove existing listener
  const newUserBtn = userBtn.cloneNode(true);
  userBtn.parentNode.replaceChild(newUserBtn, userBtn);
  
  // Toggle dropdown
  newUserBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('hidden');
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.user-menu')) {
      dropdownMenu.classList.add('hidden');
    }
  });
  
  // Logout functionality
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      localStorage.removeItem('userLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userRole');
      checkAuthState();
      navigateToPage('home');
    });
  }
  
  // Dashboard link
  if (dashboardLink) {
    dashboardLink.addEventListener('click', (e) => {
      e.preventDefault();
      const userRole = localStorage.getItem('userRole') || 'seeker';
      navigateToPage(`pages/${userRole}/dashboard.html`);
    });
  }
  
  // Profile link
  if (profileLink) {
    profileLink.addEventListener('click', (e) => {
      e.preventDefault();
      const userRole = localStorage.getItem('userRole') || 'seeker';
      
      if (userRole === 'owner') {
        navigateToPage('pages/owner/my-properties.html');
      } else if (userRole === 'seeker') {
        navigateToPage('pages/seeker/favorites.html');
      } else {
        navigateToPage('pages/admin/dashboard.html');
      }
    });
  }
}

function checkAuthState() {
  const isLoggedIn = localStorage.getItem('userLoggedIn') === 'true';
  const userName = localStorage.getItem('userName') || 'User';
  
  const authButtons = document.getElementById('authButtons');
  const userMenu = document.getElementById('userMenu');
  const userNameElement = document.getElementById('userName');
  
  if (authButtons && userMenu) {
    if (isLoggedIn) {
      authButtons.classList.add('hidden');
      userMenu.classList.remove('hidden');
      if (userNameElement) userNameElement.textContent = userName;
    } else {
      authButtons.classList.remove('hidden');
      userMenu.classList.add('hidden');
    }
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Show notification toast
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
    z-index: 9999;
    animation: slideIn 0.3s ease;
  `;
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Format currency
function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Validate email
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth scroll to element
function scrollToElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// Handle image upload preview
function handleImageUpload(input, previewContainer) {
  const files = Array.from(input.files);
  previewContainer.innerHTML = '';

  files.forEach((file, index) => {
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const div = document.createElement('div');
        div.className = 'preview-item';
        div.innerHTML = `
          <img src="${e.target.result}" class="preview-image" alt="Preview">
          <button type="button" class="preview-remove" onclick="removeImage(${index})">×</button>
        `;
        previewContainer.appendChild(div);
      };
      reader.readAsDataURL(file);
    }
  });
}

// Convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);