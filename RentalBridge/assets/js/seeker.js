// Seeker Management Functions for Rental Bridge

function checkSeekerAuth() {
    const user = getCurrentUser();
    if (!user || user.role !== 'seeker') {
        showNotification('Please login as seeker', 'error');
        setTimeout(() => window.location.href = '../../login.html', 1500);
        return false;
    }
    return true;
}

function getFavorites() {
    const user = getCurrentUser();
    if (!user) return [];
    const favorites = localStorage.getItem(`favorites_${user.id}`);
    return favorites ? JSON.parse(favorites) : [];
}

function saveFavorites(favorites) {
    const user = getCurrentUser();
    if (user) {
        localStorage.setItem(`favorites_${user.id}`, JSON.stringify(favorites));
    }
}

function addToFavorites(propertyId) {
    const favorites = getFavorites();
    if (!favorites.includes(propertyId)) {
        favorites.push(propertyId);
        saveFavorites(favorites);
        showNotification('Added to favorites', 'success');
        return true;
    }
    return false;
}

function removeFromFavorites(propertyId) {
    const favorites = getFavorites();
    const filtered = favorites.filter(id => id !== propertyId);
    saveFavorites(filtered);
    showNotification('Removed from favorites', 'info');
    return true;
}

function isFavorite(propertyId) {
    return getFavorites().includes(propertyId);
}

function getViewedProperties() {
    const user = getCurrentUser();
    if (!user) return [];
    const viewed = localStorage.getItem(`viewed_${user.id}`);
    return viewed ? JSON.parse(viewed) : [];
}

function addToViewed(propertyId) {
    const user = getCurrentUser();
    if (!user) return;
    
    const viewed = getViewedProperties();
    if (!viewed.includes(propertyId)) {
        viewed.unshift(propertyId);
        if (viewed.length > 50) viewed.pop(); // Keep last 50
        localStorage.setItem(`viewed_${user.id}`, JSON.stringify(viewed));
    }
    
    // Increment property view count
    incrementPropertyViews(propertyId);
}

function getUserInquiries() {
    const user = getCurrentUser();
    if (!user) return [];
    const inquiries = getAllInquiries();
    return inquiries.filter(i => i.email === user.email);
}

function sendPropertyInquiry(propertyId, inquiryData) {
    const user = getCurrentUser();
    const property = getAllProperties().find(p => p.id === propertyId);
    
    if (!property) {
        showNotification('Property not found', 'error');
        return false;
    }
    
    const inquiry = {
        id: Date.now().toString(),
        propertyId,
        propertyTitle: property.title,
        userId: user ? user.id : null,
        ...inquiryData,
        date: new Date().toISOString(),
        status: 'new'
    };
    
    const inquiries = getAllInquiries();
    inquiries.push(inquiry);
    localStorage.setItem('inquiries', JSON.stringify(inquiries));
    
    showNotification('Inquiry sent successfully', 'success');
    return true;
}

function searchProperties(filters) {
    let properties = getAllProperties();
    
    if (filters.location) {
        const q = filters.location.toLowerCase();
        properties = properties.filter(p => 
            p.location.toLowerCase().includes(q)
        );
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
    
    if (filters.bedrooms) {
        properties = properties.filter(p => p.bedrooms >= filters.bedrooms);
    }
    
    if (filters.bathrooms) {
        properties = properties.filter(p => p.bathrooms >= filters.bathrooms);
    }
    
    if (filters.furnishing) {
        properties = properties.filter(p => p.furnishing === filters.furnishing);
    }
    
    if (filters.amenities && filters.amenities.length > 0) {
        properties = properties.filter(p => {
            return filters.amenities.every(a => p.amenities && p.amenities.includes(a));
        });
    }
    
    return properties.filter(p => p.status === 'active');
}

function sortProperties(properties, sortBy) {
    const sorted = [...properties];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        case 'bedrooms':
            return sorted.sort((a, b) => b.bedrooms - a.bedrooms);
        case 'area':
            return sorted.sort((a, b) => b.area - a.area);
        default:
            return sorted;
    }
}

function getRecommendedProperties(limit = 6) {
    const viewed = getViewedProperties();
    const favorites = getFavorites();
    const properties = getAllProperties().filter(p => p.status === 'active');
    
    // Simple recommendation: properties similar to favorites/viewed
    const interacted = [...new Set([...viewed, ...favorites])];
    
    if (interacted.length === 0) {
        return properties.slice(0, limit);
    }
    
    const interactedProps = properties.filter(p => interacted.includes(p.id));
    const avgPrice = interactedProps.reduce((sum, p) => sum + p.price, 0) / interactedProps.length;
    const avgBedrooms = Math.round(interactedProps.reduce((sum, p) => sum + p.bedrooms, 0) / interactedProps.length);
    
    const recommended = properties
        .filter(p => !interacted.includes(p.id))
        .map(p => {
            let score = 0;
            if (Math.abs(p.price - avgPrice) < avgPrice * 0.3) score += 2;
            if (p.bedrooms === avgBedrooms) score += 3;
            return { ...p, score };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
    
    return recommended.length > 0 ? recommended : properties.slice(0, limit);
}

function compareProperties(propertyIds) {
    const properties = getAllProperties();
    return propertyIds.map(id => properties.find(p => p.id === id)).filter(Boolean);
}

function getSeekerStats() {
    const user = getCurrentUser();
    if (!user) return null;
    
    return {
        favorites: getFavorites().length,
        viewed: getViewedProperties().length,
        inquiries: getUserInquiries().length
    };
}