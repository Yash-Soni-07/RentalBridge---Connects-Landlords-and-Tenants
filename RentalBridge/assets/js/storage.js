/* ============================================
   RENTAL BRIDGE - LOCAL STORAGE MANAGEMENT
   ============================================ */

// Storage Keys
const STORAGE_KEYS = {
  USERS: 'rentalBridge_users',
  PROPERTIES: 'rentalBridge_properties',
  INQUIRIES: 'rentalBridge_inquiries',
  FAVORITES: 'rentalBridge_favorites',
  CURRENT_USER: 'rentalBridge_currentUser'
};

// Initialize Storage with Sample Data
function initializeStorage() {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    const defaultUsers = [
      {
        id: 1,
        name: 'Admin User',
        email: 'admin@rentalbridge.com',
        phone: '+1234567890',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        name: 'John Owner',
        email: 'owner@test.com',
        phone: '+1234567891',
        password: 'owner123',
        role: 'owner',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        name: 'Jane Seeker',
        email: 'seeker@test.com',
        phone: '+1234567892',
        password: 'seeker123',
        role: 'seeker',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(defaultUsers));
  }

  if (!localStorage.getItem(STORAGE_KEYS.PROPERTIES)) {
    const sampleProperties = [
      {
        id: 1,
        ownerId: 2,
        title: 'Modern 2BHK Apartment',
        description: 'Beautiful apartment in the heart of downtown with amazing city views.',
        type: 'apartment',
        price: 1500,
        location: 'New York, NY',
        address: '123 Main St, New York, NY 10001',
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        furnished: true,
        parking: true,
        pets: false,
        amenities: ['WiFi', 'Gym', 'Pool', 'Security'],
        images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'],
        status: 'approved',
        createdAt: new Date().toISOString()
      },
      {
        id: 2,
        ownerId: 2,
        title: 'Spacious 3BHK Villa',
        description: 'Luxurious villa with private garden and modern amenities.',
        type: 'villa',
        price: 3000,
        location: 'Los Angeles, CA',
        address: '456 Beach Blvd, Los Angeles, CA 90001',
        bedrooms: 3,
        bathrooms: 3,
        area: 2500,
        furnished: true,
        parking: true,
        pets: true,
        amenities: ['WiFi', 'Garden', 'Pool', 'Security', 'AC'],
        images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'],
        status: 'approved',
        createdAt: new Date().toISOString()
      },
      {
        id: 3,
        ownerId: 2,
        title: 'Cozy Studio Apartment',
        description: 'Perfect for singles or couples, close to public transport.',
        type: 'studio',
        price: 900,
        location: 'Chicago, IL',
        address: '789 Lake Ave, Chicago, IL 60601',
        bedrooms: 1,
        bathrooms: 1,
        area: 600,
        furnished: true,
        parking: false,
        pets: false,
        amenities: ['WiFi', 'AC'],
        images: ['https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800'],
        status: 'approved',
        createdAt: new Date().toISOString()
      }
    ];
    localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(sampleProperties));
  }

  if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify([]));
  }

  if (!localStorage.getItem(STORAGE_KEYS.FAVORITES)) {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify([]));
  }
}

// Generic Storage Functions
function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
}

function setData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// User Functions
function getAllUsers() {
  return getData(STORAGE_KEYS.USERS);
}

function getUserById(id) {
  const users = getAllUsers();
  return users.find(u => u.id === parseInt(id));
}

function getUserByEmail(email) {
  const users = getAllUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

function addUser(user) {
  const users = getAllUsers();
  const newUser = {
    ...user,
    id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  setData(STORAGE_KEYS.USERS, users);
  return newUser;
}

function updateUser(id, updates) {
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === parseInt(id));
  if (index !== -1) {
    users[index] = { ...users[index], ...updates };
    setData(STORAGE_KEYS.USERS, users);
    return users[index];
  }
  return null;
}

function deleteUser(id) {
  let users = getAllUsers();
  users = users.filter(u => u.id !== parseInt(id));
  setData(STORAGE_KEYS.USERS, users);
}

// Property Functions
function getAllProperties() {
  return getData(STORAGE_KEYS.PROPERTIES);
}

function getPropertyById(id) {
  const properties = getAllProperties();
  return properties.find(p => p.id === parseInt(id));
}

function getPropertiesByOwner(ownerId) {
  const properties = getAllProperties();
  return properties.filter(p => p.ownerId === parseInt(ownerId));
}

function addProperty(property) {
  const properties = getAllProperties();
  const newProperty = {
    ...property,
    id: properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  properties.push(newProperty);
  setData(STORAGE_KEYS.PROPERTIES, properties);
  return newProperty;
}

function updateProperty(id, updates) {
  const properties = getAllProperties();
  const index = properties.findIndex(p => p.id === parseInt(id));
  if (index !== -1) {
    properties[index] = { ...properties[index], ...updates };
    setData(STORAGE_KEYS.PROPERTIES, properties);
    return properties[index];
  }
  return null;
}

function deleteProperty(id) {
  let properties = getAllProperties();
  properties = properties.filter(p => p.id !== parseInt(id));
  setData(STORAGE_KEYS.PROPERTIES, properties);
}

// Inquiry Functions
function getAllInquiries() {
  return getData(STORAGE_KEYS.INQUIRIES);
}

function getInquiriesByProperty(propertyId) {
  const inquiries = getAllInquiries();
  return inquiries.filter(i => i.propertyId === parseInt(propertyId));
}

function getInquiriesByUser(userId) {
  const inquiries = getAllInquiries();
  return inquiries.filter(i => i.userId === parseInt(userId));
}

function addInquiry(inquiry) {
  const inquiries = getAllInquiries();
  const newInquiry = {
    ...inquiry,
    id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
    status: 'pending',
    createdAt: new Date().toISOString()
  };
  inquiries.push(newInquiry);
  setData(STORAGE_KEYS.INQUIRIES, inquiries);
  return newInquiry;
}

function updateInquiry(id, updates) {
  const inquiries = getAllInquiries();
  const index = inquiries.findIndex(i => i.id === parseInt(id));
  if (index !== -1) {
    inquiries[index] = { ...inquiries[index], ...updates };
    setData(STORAGE_KEYS.INQUIRIES, inquiries);
    return inquiries[index];
  }
  return null;
}

// Favorites Functions
function getFavorites(userId) {
  const favorites = getData(STORAGE_KEYS.FAVORITES);
  return favorites.filter(f => f.userId === parseInt(userId));
}

function addToFavorites(userId, propertyId) {
  const favorites = getData(STORAGE_KEYS.FAVORITES);
  const exists = favorites.find(f => f.userId === parseInt(userId) && f.propertyId === parseInt(propertyId));
  
  if (!exists) {
    favorites.push({
      userId: parseInt(userId),
      propertyId: parseInt(propertyId),
      createdAt: new Date().toISOString()
    });
    setData(STORAGE_KEYS.FAVORITES, favorites);
    return true;
  }
  return false;
}

function removeFromFavorites(userId, propertyId) {
  let favorites = getData(STORAGE_KEYS.FAVORITES);
  favorites = favorites.filter(f => !(f.userId === parseInt(userId) && f.propertyId === parseInt(propertyId)));
  setData(STORAGE_KEYS.FAVORITES, favorites);
}

function isFavorite(userId, propertyId) {
  const favorites = getFavorites(userId);
  return favorites.some(f => f.propertyId === parseInt(propertyId));
}

// Initialize on load
initializeStorage();