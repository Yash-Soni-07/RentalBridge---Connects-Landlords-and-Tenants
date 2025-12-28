// ==========================================
// RENTAL BRIDGE - UTILITY FUNCTIONS
// ==========================================

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

// Format date
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
};

// Format relative time (e.g., "2 hours ago")
const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    return formatDate(dateString);
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

// Validate phone number (Indian format)
const isValidPhone = (phone) => {
    const regex = /^[6-9]\d{9}$/;
    return regex.test(phone);
};

// Validate password strength
const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
    };
};

// Show toast notification
const showToast = (message, type = 'info', duration = 3000) => {
    // Remove existing toasts
    const existingToast = document.querySelector('.toast');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span class="toast-icon">${getToastIcon(type)}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">×</button>
    `;

    document.body.appendChild(toast);

    // Trigger animation
    setTimeout(() => toast.classList.add('show'), 10);

    // Auto remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, duration);
};

// Get toast icon based on type
const getToastIcon = (type) => {
    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };
    return icons[type] || icons.info;
};

// Show loading spinner
const showLoading = (text = 'Loading...') => {
    const loader = document.createElement('div');
    loader.className = 'loading-overlay';
    loader.id = 'loadingOverlay';
    loader.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>${text}</p>
        </div>
    `;
    document.body.appendChild(loader);
};

// Hide loading spinner
const hideLoading = () => {
    const loader = document.getElementById('loadingOverlay');
    if (loader) loader.remove();
};

// Debounce function
const debounce = (func, delay = 300) => {
    let timeoutId;
    return function (...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
};

// Throttle function
const throttle = (func, limit = 300) => {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Truncate text
const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
};

// Capitalize first letter
const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

// Format property type
const formatPropertyType = (type) => {
    const types = {
        apartment: 'Apartment',
        house: 'House',
        villa: 'Villa',
        studio: 'Studio',
        penthouse: 'Penthouse',
        duplex: 'Duplex',
        room: 'Room'
    };
    return types[type] || capitalize(type);
};

// Calculate property rating
const calculateRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
};

// Sanitize HTML to prevent XSS
const sanitizeHTML = (str) => {
    const temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
};

// Format number with commas
const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// Get property status badge
const getStatusBadge = (status) => {
    const badges = {
        available: '<span class="badge badge-success">Available</span>',
        rented: '<span class="badge badge-danger">Rented</span>',
        pending: '<span class="badge badge-warning">Pending</span>',
        maintenance: '<span class="badge badge-info">Maintenance</span>'
    };
    return badges[status] || '<span class="badge badge-secondary">Unknown</span>';
};

// Check if user is logged in
const isLoggedIn = () => {
    return localStorage.getItem('currentUser') !== null;
};

// Get current user
const getCurrentUser = () => {
    const userStr = localStorage.getItem('currentUser');
    return userStr ? JSON.parse(userStr) : null;
};

// Check user role
const hasRole = (role) => {
    const user = getCurrentUser();
    return user && user.role === role;
};

// Redirect based on role
const redirectToDashboard = () => {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = '/login.html';
        return;
    }

    const dashboards = {
        admin: '/pages/admin/dashboard.html',
        owner: '/pages/owner/dashboard.html',
        seeker: '/pages/seeker/dashboard.html'
    };

    window.location.href = dashboards[user.role] || '/index.html';
};

// Protect page (require authentication)
const protectPage = (requiredRole = null) => {
    const user = getCurrentUser();
    
    if (!user) {
        showToast('Please login to access this page', 'error');
        setTimeout(() => window.location.href = '/login.html', 1500);
        return false;
    }

    if (requiredRole && user.role !== requiredRole) {
        showToast('You do not have permission to access this page', 'error');
        setTimeout(() => redirectToDashboard(), 1500);
        return false;
    }

    return true;
};

// Image validation
const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!validTypes.includes(file.type)) {
        return { valid: false, error: 'Please upload a valid image (JPEG, PNG, WebP)' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'Image size should not exceed 5MB' };
    }

    return { valid: true };
};

// Convert file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
};

// Copy to clipboard
const copyToClipboard = (text) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showToast('Copied to clipboard!', 'success');
        }).catch(() => {
            showToast('Failed to copy', 'error');
        });
    } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showToast('Copied to clipboard!', 'success');
    }
};

// Smooth scroll to element
const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
};

// Get query parameter from URL
const getQueryParam = (param) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
};

// Update query parameter
const updateQueryParam = (param, value) => {
    const url = new URL(window.location);
    url.searchParams.set(param, value);
    window.history.pushState({}, '', url);
};

// ==========================================
// BROWSE PROPERTIES HELPER FUNCTIONS
// ==========================================

// Get favorites for current user
const getFavorites = () => {
    const user = getCurrentUser();
    if (!user) return [];
    
    const allFavorites = getData(STORAGE_KEYS.FAVORITES);
    return allFavorites
        .filter(f => f.userId === user.id)
        .map(f => f.propertyId);
};

// Save favorites
const saveFavorites = (favoriteIds) => {
    const user = getCurrentUser();
    if (!user) {
        showToast('Please login to save favorites', 'error');
        return;
    }
    
    let allFavorites = getData(STORAGE_KEYS.FAVORITES);
    allFavorites = allFavorites.filter(f => f.userId !== user.id);
    
    favoriteIds.forEach(propertyId => {
        allFavorites.push({
            userId: user.id,
            propertyId: propertyId,
            createdAt: new Date().toISOString()
        });
    });
    
    setData(STORAGE_KEYS.FAVORITES, allFavorites);
};

// Add to viewed
const addToViewed = (propertyId) => {
    const viewedKey = 'rentalBridge_viewed';
    let viewed = JSON.parse(localStorage.getItem(viewedKey) || '[]');
    viewed = viewed.filter(id => id !== propertyId);
    viewed.unshift(propertyId);
    if (viewed.length > 20) viewed = viewed.slice(0, 20);
    localStorage.setItem(viewedKey, JSON.stringify(viewed));
};

// Alias for compatibility
const showNotification = showToast;

// Make globally available
window.getFavorites = getFavorites;
window.saveFavorites = saveFavorites;
window.addToViewed = addToViewed;
window.showNotification = showNotification;

// Export all utility functions
window.RentalBridgeUtils = {
    formatCurrency,
    formatDate,
    formatRelativeTime,
    generateId,
    isValidEmail,
    isValidPhone,
    validatePassword,
    showToast,
    showLoading,
    hideLoading,
    debounce,
    throttle,
    truncateText,
    capitalize,
    formatPropertyType,
    calculateRating,
    sanitizeHTML,
    formatNumber,
    getStatusBadge,
    isLoggedIn,
    getCurrentUser,
    hasRole,
    redirectToDashboard,
    protectPage,
    validateImage,
    fileToBase64,
    copyToClipboard,
    scrollToElement,
    getQueryParam,
    updateQueryParam
};