// ==========================================
// RENTAL BRIDGE - PROPERTY MANAGEMENT
// ==========================================

// Property data structure example
const propertyTemplate = {
    id: '',
    title: '',
    description: '',
    type: '', // apartment, house, villa, studio, penthouse, duplex, room
    rent: 0,
    deposit: 0,
    address: '',
    city: '',
    state: '',
    pincode: '',
    bedrooms: 0,
    bathrooms: 0,
    area: 0, // in sq ft
    furnished: '', // furnished, semi-furnished, unfurnished
    amenities: [], // parking, gym, pool, wifi, ac, etc.
    images: [], // array of image URLs (base64)
    availableFrom: '',
    ownerId: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    status: 'pending', // pending, approved, rented, rejected
    featured: false,
    views: 0,
    rating: 0,
    reviews: [],
    createdAt: '',
    updatedAt: ''
};

// Initialize sample properties (for demo)
const initSampleProperties = () => {
    const properties = getProperties();
    if (properties.length === 0) {
        const sampleProperties = [
            {
                id: 'prop_1',
                title: '2BHK Luxury Apartment in City Center',
                description: 'Spacious 2BHK apartment with modern amenities in the heart of the city. Perfect for small families or working professionals.',
                type: 'apartment',
                rent: 25000,
                deposit: 50000,
                address: 'Tower A, Sunshine Residency, Ring Road',
                city: 'Surat',
                state: 'Gujarat',
                pincode: '395007',
                bedrooms: 2,
                bathrooms: 2,
                area: 1200,
                furnished: 'furnished',
                amenities: ['parking', 'gym', 'pool', 'wifi', 'ac', 'lift', 'security'],
                images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
                availableFrom: '2025-01-15',
                ownerId: 'owner_1',
                ownerName: 'Rajesh Kumar',
                ownerEmail: 'rajesh@example.com',
                ownerPhone: '9876543210',
                status: 'approved',
                featured: true,
                views: 156,
                rating: 4.5,
                reviews: [],
                createdAt: new Date('2024-12-01').toISOString(),
                updatedAt: new Date('2024-12-01').toISOString()
            },
            {
                id: 'prop_2',
                title: '3BHK Independent House with Garden',
                description: 'Beautiful independent house with a private garden. Ideal for families looking for peaceful living.',
                type: 'house',
                rent: 35000,
                deposit: 70000,
                address: 'Plot 45, Green Valley Society, Vesu',
                city: 'Surat',
                state: 'Gujarat',
                pincode: '395007',
                bedrooms: 3,
                bathrooms: 3,
                area: 2000,
                furnished: 'semi-furnished',
                amenities: ['parking', 'garden', 'wifi', 'security'],
                images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800'],
                availableFrom: '2025-02-01',
                ownerId: 'owner_2',
                ownerName: 'Priya Sharma',
                ownerEmail: 'priya@example.com',
                ownerPhone: '9876543211',
                status: 'approved',
                featured: true,
                views: 98,
                rating: 4.8,
                reviews: [],
                createdAt: new Date('2024-12-05').toISOString(),
                updatedAt: new Date('2024-12-05').toISOString()
            },
            {
                id: 'prop_3',
                title: '1BHK Studio Apartment near IT Park',
                description: 'Cozy studio apartment perfect for working professionals. Walking distance to IT Park.',
                type: 'studio',
                rent: 15000,
                deposit: 30000,
                address: 'Building B, Tech Hub Residency, Adajan',
                city: 'Surat',
                state: 'Gujarat',
                pincode: '395009',
                bedrooms: 1,
                bathrooms: 1,
                area: 600,
                furnished: 'furnished',
                amenities: ['parking', 'wifi', 'ac', 'lift'],
                images: ['https://images.unsplash.com/photo-1502672260066-6bc54fc99ebe?w=800'],
                availableFrom: '2025-01-20',
                ownerId: 'owner_1',
                ownerName: 'Rajesh Kumar',
                ownerEmail: 'rajesh@example.com',
                ownerPhone: '9876543210',
                status: 'approved',
                featured: false,
                views: 67,
                rating: 4.2,
                reviews: [],
                createdAt: new Date('2024-12-10').toISOString(),
                updatedAt: new Date('2024-12-10').toISOString()
            }
        ];

        localStorage.setItem('properties', JSON.stringify(sampleProperties));
        console.log('Sample properties initialized');
    }
};

// Get all properties
const getProperties = () => {
    return JSON.parse(localStorage.getItem('properties') || '[]');
};

// Get property by ID
const getPropertyById = (propertyId) => {
    const properties = getProperties();
    return properties.find(prop => prop.id === propertyId);
};

// Get properties by owner ID
const getPropertiesByOwner = (ownerId) => {
    const properties = getProperties();
    return properties.filter(prop => prop.ownerId === ownerId);
};

// Get approved properties
const getApprovedProperties = () => {
    const properties = getProperties();
    return properties.filter(prop => prop.status === 'approved');
};

// Get featured properties
const getFeaturedProperties = () => {
    const properties = getApprovedProperties();
    return properties.filter(prop => prop.featured).slice(0, 6);
};

// Create new property
const createProperty = (propertyData) => {
    const { generateId } = window.RentalBridgeUtils;
    const properties = getProperties();
    
    const newProperty = {
        ...propertyData,
        id: generateId(),
        status: 'pending', // Admin approval required
        featured: false,
        views: 0,
        rating: 0,
        reviews: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties));
    
    return newProperty;
};

// Update property
const updateProperty = (propertyId, updatedData) => {
    const properties = getProperties();
    const index = properties.findIndex(prop => prop.id === propertyId);
    
    if (index !== -1) {
        properties[index] = {
            ...properties[index],
            ...updatedData,
            updatedAt: new Date().toISOString()
        };
        localStorage.setItem('properties', JSON.stringify(properties));
        return properties[index];
    }
    return null;
};

// Delete property
const deleteProperty = (propertyId) => {
    const properties = getProperties();
    const filtered = properties.filter(prop => prop.id !== propertyId);
    localStorage.setItem('properties', JSON.stringify(filtered));
    return true;
};

// Update property status (Admin only)
const updatePropertyStatus = (propertyId, newStatus) => {
    return updateProperty(propertyId, { status: newStatus });
};

// Toggle featured status (Admin only)
const toggleFeatured = (propertyId) => {
    const property = getPropertyById(propertyId);
    if (property) {
        return updateProperty(propertyId, { featured: !property.featured });
    }
    return null;
};

// Increment property views
const incrementViews = (propertyId) => {
    const property = getPropertyById(propertyId);
    if (property) {
        return updateProperty(propertyId, { views: property.views + 1 });
    }
    return null;
};

// Add review to property
const addReview = (propertyId, reviewData) => {
    const { generateId } = window.RentalBridgeUtils;
    const property = getPropertyById(propertyId);
    
    if (property) {
        const newReview = {
            id: generateId(),
            ...reviewData,
            createdAt: new Date().toISOString()
        };
        
        const reviews = [...property.reviews, newReview];
        const rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        
        return updateProperty(propertyId, { reviews, rating });
    }
    return null;
};

// Search and filter properties
const searchProperties = (filters) => {
    let properties = getApprovedProperties();
    
    // Search by keyword
    if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        properties = properties.filter(prop => 
            prop.title.toLowerCase().includes(keyword) ||
            prop.description.toLowerCase().includes(keyword) ||
            prop.address.toLowerCase().includes(keyword) ||
            prop.city.toLowerCase().includes(keyword)
        );
    }
    
    // Filter by type
    if (filters.type && filters.type !== 'all') {
        properties = properties.filter(prop => prop.type === filters.type);
    }
    
    // Filter by city
    if (filters.city) {
        properties = properties.filter(prop => 
            prop.city.toLowerCase() === filters.city.toLowerCase()
        );
    }
    
    // Filter by rent range
    if (filters.minRent) {
        properties = properties.filter(prop => prop.rent >= parseInt(filters.minRent));
    }
    if (filters.maxRent) {
        properties = properties.filter(prop => prop.rent <= parseInt(filters.maxRent));
    }
    
    // Filter by bedrooms
    if (filters.bedrooms && filters.bedrooms !== 'any') {
        properties = properties.filter(prop => prop.bedrooms >= parseInt(filters.bedrooms));
    }
    
    // Filter by furnished type
    if (filters.furnished && filters.furnished !== 'all') {
        properties = properties.filter(prop => prop.furnished === filters.furnished);
    }
    
    // Filter by amenities
    if (filters.amenities && filters.amenities.length > 0) {
        properties = properties.filter(prop => 
            filters.amenities.every(amenity => prop.amenities.includes(amenity))
        );
    }
    
    // Sort properties
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'rent-low':
                properties.sort((a, b) => a.rent - b.rent);
                break;
            case 'rent-high':
                properties.sort((a, b) => b.rent - a.rent);
                break;
            case 'newest':
                properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'oldest':
                properties.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                break;
            case 'rating':
                properties.sort((a, b) => b.rating - a.rating);
                break;
            case 'views':
                properties.sort((a, b) => b.views - a.views);
                break;
        }
    }
    
    return properties;
};

// Get property statistics
const getPropertyStats = () => {
    const properties = getProperties();
    const approved = properties.filter(p => p.status === 'approved');
    const pending = properties.filter(p => p.status === 'pending');
    const rented = properties.filter(p => p.status === 'rented');
    const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
    
    return {
        total: properties.length,
        approved: approved.length,
        pending: pending.length,
        rented: rented.length,
        available: approved.length - rented.length,
        totalViews: totalViews
    };
};

// Get owner statistics
const getOwnerStats = (ownerId) => {
    const properties = getPropertiesByOwner(ownerId);
    const approved = properties.filter(p => p.status === 'approved');
    const pending = properties.filter(p => p.status === 'pending');
    const rented = properties.filter(p => p.status === 'rented');
    const totalViews = properties.reduce((sum, p) => sum + p.views, 0);
    const totalRevenue = rented.reduce((sum, p) => sum + p.rent, 0);
    
    return {
        total: properties.length,
        approved: approved.length,
        pending: pending.length,
        rented: rented.length,
        available: approved.length - rented.length,
        totalViews: totalViews,
        totalRevenue: totalRevenue
    };
};

// Get all cities with property count
const getCitiesWithCount = () => {
    const properties = getApprovedProperties();
    const cities = {};
    
    properties.forEach(prop => {
        if (cities[prop.city]) {
            cities[prop.city]++;
        } else {
            cities[prop.city] = 1;
        }
    });
    
    return Object.entries(cities)
        .map(([city, count]) => ({ city, count }))
        .sort((a, b) => b.count - a.count);
};

// Get all property types with count
const getPropertyTypesWithCount = () => {
    const properties = getApprovedProperties();
    const types = {};
    
    properties.forEach(prop => {
        if (types[prop.type]) {
            types[prop.type]++;
        } else {
            types[prop.type] = 1;
        }
    });
    
    return Object.entries(types)
        .map(([type, count]) => ({ type, count }))
        .sort((a, b) => b.count - a.count);
};

// Get rent range
const getRentRange = () => {
    const properties = getApprovedProperties();
    if (properties.length === 0) return { min: 0, max: 0 };
    
    const rents = properties.map(p => p.rent);
    return {
        min: Math.min(...rents),
        max: Math.max(...rents)
    };
};

// Validate property data
const validatePropertyData = (data) => {
    const errors = [];
    
    if (!data.title || data.title.trim().length < 10) {
        errors.push('Title must be at least 10 characters long');
    }
    
    if (!data.description || data.description.trim().length < 50) {
        errors.push('Description must be at least 50 characters long');
    }
    
    if (!data.type) {
        errors.push('Property type is required');
    }
    
    if (!data.rent || data.rent <= 0) {
        errors.push('Valid rent amount is required');
    }
    
    if (!data.address || data.address.trim().length < 10) {
        errors.push('Complete address is required');
    }
    
    if (!data.city) {
        errors.push('City is required');
    }
    
    if (!data.state) {
        errors.push('State is required');
    }
    
    if (!data.pincode || !/^\d{6}$/.test(data.pincode)) {
        errors.push('Valid 6-digit pincode is required');
    }
    
    if (!data.bedrooms || data.bedrooms < 0) {
        errors.push('Number of bedrooms is required');
    }
    
    if (!data.bathrooms || data.bathrooms < 0) {
        errors.push('Number of bathrooms is required');
    }
    
    if (!data.area || data.area <= 0) {
        errors.push('Property area is required');
    }
    
    if (!data.furnished) {
        errors.push('Furnished status is required');
    }
    
    if (!data.images || data.images.length === 0) {
        errors.push('At least one property image is required');
    }
    
    if (!data.availableFrom) {
        errors.push('Available from date is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors: errors
    };
};

// Initialize properties on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSampleProperties);
} else {
    initSampleProperties();
}

// Export property functions
window.RentalBridgeProperties = {
    getProperties,
    getPropertyById,
    getPropertiesByOwner,
    getApprovedProperties,
    getFeaturedProperties,
    createProperty,
    updateProperty,
    deleteProperty,
    updatePropertyStatus,
    toggleFeatured,
    incrementViews,
    addReview,
    searchProperties,
    getPropertyStats,
    getOwnerStats,
    getCitiesWithCount,
    getPropertyTypesWithCount,
    getRentRange,
    validatePropertyData
};