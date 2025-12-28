// Owner Management Functions for Rental Bridge

function checkOwnerAuth() {
    const user = getCurrentUser();
    if (!user || user.role !== 'owner') {
        showNotification('Please login as property owner', 'error');
        setTimeout(() => window.location.href = '../../login.html', 1500);
        return false;
    }
    return true;
}

function getOwnerProperties() {
    const user = getCurrentUser();
    if (!user) return [];
    const properties = localStorage.getItem(`properties_${user.id}`);
    return properties ? JSON.parse(properties) : [];
}

function addProperty(propertyData) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const properties = getOwnerProperties();
    const newProperty = {
        id: Date.now().toString(),
        ...propertyData,
        ownerId: user.id,
        ownerName: user.name,
        ownerEmail: user.email,
        status: 'active',
        views: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    
    properties.push(newProperty);
    localStorage.setItem(`properties_${user.id}`, JSON.stringify(properties));
    showNotification('Property added successfully', 'success');
    return true;
}

function updateProperty(propertyId, propertyData) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const properties = getOwnerProperties();
    const index = properties.findIndex(p => p.id === propertyId);
    
    if (index !== -1) {
        properties[index] = {
            ...properties[index],
            ...propertyData,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem(`properties_${user.id}`, JSON.stringify(properties));
        showNotification('Property updated successfully', 'success');
        return true;
    }
    return false;
}

function deleteProperty(propertyId) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const properties = getOwnerProperties();
    const filtered = properties.filter(p => p.id !== propertyId);
    localStorage.setItem(`properties_${user.id}`, JSON.stringify(filtered));
    showNotification('Property deleted successfully', 'success');
    return true;
}

function getPropertyInquiries(propertyId) {
    const inquiries = getAllInquiries();
    return inquiries.filter(i => i.propertyId === propertyId);
}

function getOwnerStats() {
    const properties = getOwnerProperties();
    const inquiries = getAllInquiries();
    
    const ownerInquiries = inquiries.filter(inq => {
        return properties.some(p => p.id === inq.propertyId);
    });
    
    return {
        totalProperties: properties.length,
        activeProperties: properties.filter(p => p.status === 'active').length,
        pendingProperties: properties.filter(p => p.status === 'pending').length,
        totalInquiries: ownerInquiries.length,
        newInquiries: ownerInquiries.filter(i => i.status === 'new').length,
        totalViews: properties.reduce((sum, p) => sum + (p.views || 0), 0)
    };
}

function togglePropertyStatus(propertyId) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const properties = getOwnerProperties();
    const property = properties.find(p => p.id === propertyId);
    
    if (property) {
        property.status = property.status === 'active' ? 'inactive' : 'active';
        property.updatedAt = new Date().toISOString();
        localStorage.setItem(`properties_${user.id}`, JSON.stringify(properties));
        showNotification(`Property ${property.status}`, 'success');
        return true;
    }
    return false;
}

function incrementPropertyViews(propertyId) {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('properties_')) {
            const properties = JSON.parse(localStorage.getItem(key));
            const property = properties.find(p => p.id === propertyId);
            
            if (property) {
                property.views = (property.views || 0) + 1;
                localStorage.setItem(key, JSON.stringify(properties));
                return true;
            }
        }
    }
    return false;
}

function getTopPerformingProperties(limit = 5) {
    const properties = getOwnerProperties();
    return properties
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, limit);
}

function searchOwnerProperties(query) {
    const properties = getOwnerProperties();
    const q = query.toLowerCase();
    return properties.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.type.toLowerCase().includes(q)
    );
}

function filterOwnerProperties(filters) {
    let properties = getOwnerProperties();
    
    if (filters.status) {
        properties = properties.filter(p => p.status === filters.status);
    }
    if (filters.type) {
        properties = properties.filter(p => p.type === filters.type);
    }
    if (filters.minPrice) {
        properties = properties.filter(p => p.price >= filters.minPrice);
    }
    if (filters.maxPrice) {
        properties = properties.filter(p => p.price <= filters.maxPrice);
    }
    
    return properties;
}