// Admin Management Functions for Rental Bridge

function checkAdminAuth() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        showNotification('Access denied. Admin only.', 'error');
        setTimeout(() => window.location.href = '../../login.html', 1500);
        return false;
    }
    return true;
}

function getAllUsers() {
    const users = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('user_')) {
            users.push(JSON.parse(localStorage.getItem(key)));
        }
    }
    return users;
}

function getAllPropertiesAdmin() {
    const properties = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('properties_')) {
            const ownerProperties = JSON.parse(localStorage.getItem(key));
            properties.push(...ownerProperties);
        }
    }
    return properties;
}

function getAdminStats() {
    const users = getAllUsers();
    const properties = getAllPropertiesAdmin();
    const inquiries = getAllInquiries();
    
    return {
        totalUsers: users.length,
        totalOwners: users.filter(u => u.role === 'owner').length,
        totalSeekers: users.filter(u => u.role === 'seeker').length,
        totalProperties: properties.length,
        activeProperties: properties.filter(p => p.status === 'active').length,
        pendingProperties: properties.filter(p => p.status === 'pending').length,
        totalInquiries: inquiries.length,
        newInquiries: inquiries.filter(i => i.status === 'new').length
    };
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
        localStorage.removeItem(`user_${userId}`);
        localStorage.removeItem(`properties_${userId}`);
        showNotification('User deleted successfully', 'success');
        return true;
    }
    return false;
}

function updateUserStatus(userId, status) {
    const user = JSON.parse(localStorage.getItem(`user_${userId}`));
    if (user) {
        user.status = status;
        localStorage.setItem(`user_${userId}`, JSON.stringify(user));
        showNotification(`User ${status === 'active' ? 'activated' : 'suspended'}`, 'success');
        return true;
    }
    return false;
}

function approveProperty(propertyId) {
    const properties = getAllPropertiesAdmin();
    const property = properties.find(p => p.id === propertyId);
    
    if (property) {
        property.status = 'active';
        const ownerProperties = JSON.parse(localStorage.getItem(`properties_${property.ownerId}`));
        const index = ownerProperties.findIndex(p => p.id === propertyId);
        ownerProperties[index] = property;
        localStorage.setItem(`properties_${property.ownerId}`, JSON.stringify(ownerProperties));
        showNotification('Property approved', 'success');
        return true;
    }
    return false;
}

function rejectProperty(propertyId) {
    const properties = getAllPropertiesAdmin();
    const property = properties.find(p => p.id === propertyId);
    
    if (property) {
        property.status = 'inactive';
        const ownerProperties = JSON.parse(localStorage.getItem(`properties_${property.ownerId}`));
        const index = ownerProperties.findIndex(p => p.id === propertyId);
        ownerProperties[index] = property;
        localStorage.setItem(`properties_${property.ownerId}`, JSON.stringify(ownerProperties));
        showNotification('Property rejected', 'info');
        return true;
    }
    return false;
}

function deletePropertyAdmin(propertyId) {
    if (confirm('Delete this property permanently?')) {
        const properties = getAllPropertiesAdmin();
        const property = properties.find(p => p.id === propertyId);
        
        if (property) {
            const ownerProperties = JSON.parse(localStorage.getItem(`properties_${property.ownerId}`));
            const filtered = ownerProperties.filter(p => p.id !== propertyId);
            localStorage.setItem(`properties_${property.ownerId}`, JSON.stringify(filtered));
            showNotification('Property deleted', 'success');
            return true;
        }
    }
    return false;
}

function getRecentActivity() {
    const users = getAllUsers();
    const properties = getAllPropertiesAdmin();
    const inquiries = getAllInquiries();
    
    const activities = [];
    
    users.slice(-5).forEach(u => {
        activities.push({
            type: 'user',
            action: 'New user registered',
            data: u.name,
            date: u.createdAt
        });
    });
    
    properties.slice(-5).forEach(p => {
        activities.push({
            type: 'property',
            action: 'New property listed',
            data: p.title,
            date: p.createdAt
        });
    });
    
    inquiries.slice(-5).forEach(i => {
        activities.push({
            type: 'inquiry',
            action: 'New inquiry received',
            data: i.name,
            date: i.date
        });
    });
    
    return activities.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);
}

function exportData(type) {
    let data, filename;
    
    switch(type) {
        case 'users':
            data = getAllUsers();
            filename = 'users_export.json';
            break;
        case 'properties':
            data = getAllPropertiesAdmin();
            filename = 'properties_export.json';
            break;
        case 'inquiries':
            data = getAllInquiries();
            filename = 'inquiries_export.json';
            break;
        default:
            return;
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    showNotification('Data exported successfully', 'success');
}

function searchUsers(query) {
    const users = getAllUsers();
    const q = query.toLowerCase();
    return users.filter(u => 
        u.name.toLowerCase().includes(q) || 
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q)
    );
}

function searchProperties(query) {
    const properties = getAllPropertiesAdmin();
    const q = query.toLowerCase();
    return properties.filter(p => 
        p.title.toLowerCase().includes(q) || 
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
}