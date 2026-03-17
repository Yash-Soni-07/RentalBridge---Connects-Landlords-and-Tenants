// ==========================================
// GUARD: Prevent duplicate loading
// ==========================================
if (window.RentalBridgePropertiesLoaded) {
    console.log('⚠️ properties.js already loaded, skipping...');
} else {
    window.RentalBridgePropertiesLoaded = true;

// ==========================================
// RENTAL BRIDGE - PROPERTY MANAGEMENT
// Complete with 25 Indian Properties
// ==========================================

// Initialize 25 Indian properties
const initSampleProperties = () => {
    // Always reset to ensure fresh image URLs on every deployment
    const indianProperties = [
        // MUMBAI - 5 Properties
        {
            id: 'mumbai_001',
            title: '2BHK Spacious Apartment in Andheri West',
            description: 'Well-ventilated 2BHK flat in prime Andheri West location. Close to Metro station, malls, and restaurants.',
            type: 'apartment',
            rent: 45000,
            deposit: 135000,
            address: 'Tower B, Lokhandwala Complex, Andheri West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400053',
            bedrooms: 2,
            bathrooms: 2,
            area: 850,
            furnished: 'semi-furnished',
            amenities: ['parking', 'lift', 'security', 'power_backup', 'gym'],
            images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-01',
            ownerId: 'owner_mumbai_1',
            ownerName: 'Rajesh Sharma',
            ownerEmail: 'rajesh.mumbai@example.com',
            ownerPhone: '9876543210',
            status: 'approved',
            featured: true,
            views: 245,
            rating: 4.6,
            reviews: [],
            createdAt: new Date('2024-12-15').toISOString(),
            updatedAt: new Date('2024-12-15').toISOString()
        },
        {
            id: 'mumbai_002',
            title: '1BHK Compact Flat near Bandra Station',
            description: 'Cozy 1BHK perfect for bachelors or young couples.',
            type: 'apartment',
            rent: 32000,
            deposit: 96000,
            address: 'Hill Road, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400050',
            bedrooms: 1,
            bathrooms: 1,
            area: 550,
            furnished: 'furnished',
            amenities: ['parking', 'lift', 'wifi'],
            images: ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-20',
            ownerId: 'owner_mumbai_2',
            ownerName: 'Priya Desai',
            ownerEmail: 'priya.mumbai@example.com',
            ownerPhone: '9876543211',
            status: 'approved',
            featured: true,
            views: 189,
            rating: 4.4,
            reviews: [],
            createdAt: new Date('2024-12-18').toISOString(),
            updatedAt: new Date('2024-12-18').toISOString()
        },
        {
            id: 'mumbai_003',
            title: '3BHK Sea-Facing Apartment in Worli',
            description: 'Luxurious 3BHK with stunning sea view.',
            type: 'apartment',
            rent: 95000,
            deposit: 285000,
            address: 'Worli Sea Face',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400018',
            bedrooms: 3,
            bathrooms: 3,
            area: 1450,
            furnished: 'semi-furnished',
            amenities: ['parking', 'pool', 'gym', 'security'],
            images: ['https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-03-01',
            ownerId: 'owner_mumbai_1',
            ownerName: 'Rajesh Sharma',
            ownerEmail: 'rajesh.mumbai@example.com',
            ownerPhone: '9876543210',
            status: 'approved',
            featured: true,
            views: 312,
            rating: 4.8,
            reviews: [],
            createdAt: new Date('2024-12-10').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString()
        },
        {
            id: 'mumbai_004',
            title: 'Studio Apartment in Powai',
            description: 'Modern studio near Hiranandani.',
            type: 'studio',
            rent: 28000,
            deposit: 84000,
            address: 'Hiranandani Gardens',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400076',
            bedrooms: 1,
            bathrooms: 1,
            area: 450,
            furnished: 'furnished',
            amenities: ['parking', 'gym', 'wifi'],
            images: ['https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-15',
            ownerId: 'owner_mumbai_3',
            ownerName: 'Amit Patel',
            ownerEmail: 'amit.mumbai@example.com',
            ownerPhone: '9876543212',
            status: 'approved',
            featured: false,
            views: 156,
            rating: 4.3,
            reviews: [],
            createdAt: new Date('2024-12-20').toISOString(),
            updatedAt: new Date('2024-12-20').toISOString()
        },
        {
            id: 'mumbai_005',
            title: '2BHK Budget Apartment in Thane',
            description: 'Affordable 2BHK in Thane West.',
            type: 'apartment',
            rent: 22000,
            deposit: 66000,
            address: 'Ghodbunder Road',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400615',
            bedrooms: 2,
            bathrooms: 2,
            area: 750,
            furnished: 'unfurnished',
            amenities: ['parking', 'lift'],
            images: ['https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-10',
            ownerId: 'owner_mumbai_2',
            ownerName: 'Priya Desai',
            ownerEmail: 'priya.mumbai@example.com',
            ownerPhone: '9876543211',
            status: 'approved',
            featured: false,
            views: 98,
            rating: 4.1,
            reviews: [],
            createdAt: new Date('2024-12-22').toISOString(),
            updatedAt: new Date('2024-12-22').toISOString()
        },

        // BANGALORE - 5 Properties
        {
            id: 'bangalore_001',
            title: '3BHK Villa in Whitefield',
            description: 'Independent villa in gated community.',
            type: 'villa',
            rent: 65000,
            deposit: 195000,
            address: 'Whitefield',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560066',
            bedrooms: 3,
            bathrooms: 3,
            area: 2000,
            furnished: 'semi-furnished',
            amenities: ['parking', 'garden', 'pool'],
            images: ['https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-15',
            ownerId: 'owner_bangalore_1',
            ownerName: 'Suresh Kumar',
            ownerEmail: 'suresh.bangalore@example.com',
            ownerPhone: '9876543220',
            status: 'approved',
            featured: true,
            views: 278,
            rating: 4.7,
            reviews: [],
            createdAt: new Date('2024-12-12').toISOString(),
            updatedAt: new Date('2024-12-12').toISOString()
        },
        {
            id: 'bangalore_002',
            title: '2BHK Flat in Koramangala',
            description: 'Well-maintained 2BHK.',
            type: 'apartment',
            rent: 38000,
            deposit: 114000,
            address: '5th Block, Koramangala',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560095',
            bedrooms: 2,
            bathrooms: 2,
            area: 950,
            furnished: 'furnished',
            amenities: ['parking', 'wifi'],
            images: ['https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-25',
            ownerId: 'owner_bangalore_2',
            ownerName: 'Lakshmi Reddy',
            ownerEmail: 'lakshmi.bangalore@example.com',
            ownerPhone: '9876543221',
            status: 'approved',
            featured: true,
            views: 234,
            rating: 4.5,
            reviews: [],
            createdAt: new Date('2024-12-16').toISOString(),
            updatedAt: new Date('2024-12-16').toISOString()
        },
        {
            id: 'bangalore_003',
            title: '1BHK in Electronic City',
            description: 'Affordable near IT parks.',
            type: 'apartment',
            rent: 15000,
            deposit: 45000,
            address: 'Electronic City Phase 1',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560100',
            bedrooms: 1,
            bathrooms: 1,
            area: 600,
            furnished: 'semi-furnished',
            amenities: ['parking'],
            images: ['https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-18',
            ownerId: 'owner_bangalore_3',
            ownerName: 'Venkat Rao',
            ownerEmail: 'venkat.bangalore@example.com',
            ownerPhone: '9876543222',
            status: 'approved',
            featured: false,
            views: 145,
            rating: 4.2,
            reviews: [],
            createdAt: new Date('2024-12-19').toISOString(),
            updatedAt: new Date('2024-12-19').toISOString()
        },
        {
            id: 'bangalore_004',
            title: '4BHK Penthouse Indiranagar',
            description: 'Luxury penthouse.',
            type: 'penthouse',
            rent: 120000,
            deposit: 360000,
            address: 'Indiranagar',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560038',
            bedrooms: 4,
            bathrooms: 4,
            area: 2800,
            furnished: 'furnished',
            amenities: ['parking', 'pool', 'gym'],
            images: ['https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-03-10',
            ownerId: 'owner_bangalore_1',
            ownerName: 'Suresh Kumar',
            ownerEmail: 'suresh.bangalore@example.com',
            ownerPhone: '9876543220',
            status: 'approved',
            featured: true,
            views: 387,
            rating: 4.9,
            reviews: [],
            createdAt: new Date('2024-12-08').toISOString(),
            updatedAt: new Date('2024-12-08').toISOString()
        },
        {
            id: 'bangalore_005',
            title: '2BHK HSR Layout',
            description: 'Garden apartment.',
            type: 'apartment',
            rent: 32000,
            deposit: 96000,
            address: 'HSR Layout Sector 2',
            city: 'Bangalore',
            state: 'Karnataka',
            pincode: '560102',
            bedrooms: 2,
            bathrooms: 2,
            area: 1050,
            furnished: 'semi-furnished',
            amenities: ['parking', 'garden'],
            images: ['https://images.unsplash.com/photo-1560185127-6a7e6c6a3f7c?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-05',
            ownerId: 'owner_bangalore_2',
            ownerName: 'Lakshmi Reddy',
            ownerEmail: 'lakshmi.bangalore@example.com',
            ownerPhone: '9876543221',
            status: 'approved',
            featured: false,
            views: 167,
            rating: 4.4,
            reviews: [],
            createdAt: new Date('2024-12-17').toISOString(),
            updatedAt: new Date('2024-12-17').toISOString()
        },

        // DELHI - 5 Properties
        {
            id: 'delhi_001',
            title: '3BHK Greater Kailash',
            description: 'Builder floor in GK.',
            type: 'house',
            rent: 75000,
            deposit: 225000,
            address: 'M Block, GK-1',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110048',
            bedrooms: 3,
            bathrooms: 3,
            area: 1800,
            furnished: 'semi-furnished',
            amenities: ['parking', 'garden'],
            images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-20',
            ownerId: 'owner_delhi_1',
            ownerName: 'Ramesh Singh',
            ownerEmail: 'ramesh.delhi@example.com',
            ownerPhone: '9876543230',
            status: 'approved',
            featured: true,
            views: 298,
            rating: 4.6,
            reviews: [],
            createdAt: new Date('2024-12-11').toISOString(),
            updatedAt: new Date('2024-12-11').toISOString()
        },
        {
            id: 'delhi_002',
            title: '2BHK Dwarka',
            description: 'Modern flat in Dwarka.',
            type: 'apartment',
            rent: 28000,
            deposit: 84000,
            address: 'Sector 12, Dwarka',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110075',
            bedrooms: 2,
            bathrooms: 2,
            area: 900,
            furnished: 'semi-furnished',
            amenities: ['parking', 'gym'],
            images: ['https://images.unsplash.com/photo-1593696140826-c58b021acf8b?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-22',
            ownerId: 'owner_delhi_2',
            ownerName: 'Neha Kapoor',
            ownerEmail: 'neha.delhi@example.com',
            ownerPhone: '9876543231',
            status: 'approved',
            featured: true,
            views: 201,
            rating: 4.4,
            reviews: [],
            createdAt: new Date('2024-12-14').toISOString(),
            updatedAt: new Date('2024-12-14').toISOString()
        },
        {
            id: 'delhi_003',
            title: 'Studio Lajpat Nagar',
            description: 'Cozy studio apartment.',
            type: 'studio',
            rent: 18000,
            deposit: 54000,
            address: 'Lajpat Nagar 4',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110024',
            bedrooms: 1,
            bathrooms: 1,
            area: 450,
            furnished: 'furnished',
            amenities: ['wifi', 'ac'],
            images: ['https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-28',
            ownerId: 'owner_delhi_3',
            ownerName: 'Vikram Malhotra',
            ownerEmail: 'vikram.delhi@example.com',
            ownerPhone: '9876543232',
            status: 'approved',
            featured: false,
            views: 132,
            rating: 4.2,
            reviews: [],
            createdAt: new Date('2024-12-21').toISOString(),
            updatedAt: new Date('2024-12-21').toISOString()
        },
        {
            id: 'delhi_004',
            title: '4BHK Vasant Kunj Duplex',
            description: 'Luxury duplex.',
            type: 'duplex',
            rent: 150000,
            deposit: 450000,
            address: 'Vasant Kunj',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110070',
            bedrooms: 4,
            bathrooms: 5,
            area: 3200,
            furnished: 'furnished',
            amenities: ['parking', 'pool', 'gym'],
            images: ['https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-03-15',
            ownerId: 'owner_delhi_1',
            ownerName: 'Ramesh Singh',
            ownerEmail: 'ramesh.delhi@example.com',
            ownerPhone: '9876543230',
            status: 'approved',
            featured: true,
            views: 421,
            rating: 4.8,
            reviews: [],
            createdAt: new Date('2024-12-05').toISOString(),
            updatedAt: new Date('2024-12-05').toISOString()
        },
        {
            id: 'delhi_005',
            title: '2BHK Rohini',
            description: 'Affordable flat.',
            type: 'apartment',
            rent: 20000,
            deposit: 60000,
            address: 'Sector 18, Rohini',
            city: 'Delhi',
            state: 'Delhi',
            pincode: '110089',
            bedrooms: 2,
            bathrooms: 2,
            area: 850,
            furnished: 'unfurnished',
            amenities: ['parking'],
            images: ['https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-12',
            ownerId: 'owner_delhi_2',
            ownerName: 'Neha Kapoor',
            ownerEmail: 'neha.delhi@example.com',
            ownerPhone: '9876543231',
            status: 'approved',
            featured: false,
            views: 87,
            rating: 4.0,
            reviews: [],
            createdAt: new Date('2024-12-23').toISOString(),
            updatedAt: new Date('2024-12-23').toISOString()
        },

        // PUNE - 5 Properties
        {
            id: 'pune_001',
            title: '2BHK Hinjewadi',
            description: 'Near IT Park.',
            type: 'apartment',
            rent: 25000,
            deposit: 75000,
            address: 'Phase 2, Hinjewadi',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411057',
            bedrooms: 2,
            bathrooms: 2,
            area: 1000,
            furnished: 'semi-furnished',
            amenities: ['parking', 'gym'],
            images: ['https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-30',
            ownerId: 'owner_pune_1',
            ownerName: 'Ashok Patil',
            ownerEmail: 'ashok.pune@example.com',
            ownerPhone: '9876543240',
            status: 'approved',
            featured: true,
            views: 213,
            rating: 4.5,
            reviews: [],
            createdAt: new Date('2024-12-13').toISOString(),
            updatedAt: new Date('2024-12-13').toISOString()
        },
        {
            id: 'pune_002',
            title: '3BHK Villa Kharadi',
            description: 'Independent villa.',
            type: 'villa',
            rent: 45000,
            deposit: 135000,
            address: 'Kharadi',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411014',
            bedrooms: 3,
            bathrooms: 3,
            area: 1900,
            furnished: 'semi-furnished',
            amenities: ['parking', 'garden'],
            images: ['https://images.unsplash.com/photo-1512917774073-ea26b0a082c3?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-18',
            ownerId: 'owner_pune_2',
            ownerName: 'Snehal Kulkarni',
            ownerEmail: 'snehal.pune@example.com',
            ownerPhone: '9876543241',
            status: 'approved',
            featured: true,
            views: 267,
            rating: 4.7,
            reviews: [],
            createdAt: new Date('2024-12-09').toISOString(),
            updatedAt: new Date('2024-12-09').toISOString()
        },
        {
            id: 'pune_003',
            title: '1BHK Koregaon Park',
            description: 'Furnished flat.',
            type: 'apartment',
            rent: 22000,
            deposit: 66000,
            address: 'Koregaon Park',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411001',
            bedrooms: 1,
            bathrooms: 1,
            area: 650,
            furnished: 'furnished',
            amenities: ['wifi', 'ac'],
            images: ['https://images.unsplash.com/photo-1510627498534-ea0746eb02ba?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-26',
            ownerId: 'owner_pune_3',
            ownerName: 'Rahul Deshmukh',
            ownerEmail: 'rahul.pune@example.com',
            ownerPhone: '9876543242',
            status: 'approved',
            featured: false,
            views: 178,
            rating: 4.3,
            reviews: [],
            createdAt: new Date('2024-12-15').toISOString(),
            updatedAt: new Date('2024-12-15').toISOString()
        },
        {
            id: 'pune_004',
            title: '2BHK Wakad',
            description: 'Budget apartment.',
            type: 'apartment',
            rent: 16000,
            deposit: 48000,
            address: 'Wakad',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411057',
            bedrooms: 2,
            bathrooms: 2,
            area: 800,
            furnished: 'unfurnished',
            amenities: ['parking'],
            images: ['https://images.unsplash.com/photo-1501183638710-841f50731671?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-08',
            ownerId: 'owner_pune_1',
            ownerName: 'Ashok Patil',
            ownerEmail: 'ashok.pune@example.com',
            ownerPhone: '9876543240',
            status: 'approved',
            featured: false,
            views: 124,
            rating: 4.1,
            reviews: [],
            createdAt: new Date('2024-12-20').toISOString(),
            updatedAt: new Date('2024-12-20').toISOString()
        },
        {
            id: 'pune_005',
            title: '3BHK Penthouse Baner',
            description: 'Luxury penthouse.',
            type: 'penthouse',
            rent: 85000,
            deposit: 255000,
            address: 'Baner',
            city: 'Pune',
            state: 'Maharashtra',
            pincode: '411045',
            bedrooms: 3,
            bathrooms: 4,
            area: 2400,
            furnished: 'furnished',
            amenities: ['parking', 'pool', 'gym'],
            images: ['https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-03-05',
            ownerId: 'owner_pune_2',
            ownerName: 'Snehal Kulkarni',
            ownerEmail: 'snehal.pune@example.com',
            ownerPhone: '9876543241',
            status: 'approved',
            featured: true,
            views: 345,
            rating: 4.8,
            reviews: [],
            createdAt: new Date('2024-12-07').toISOString(),
            updatedAt: new Date('2024-12-07').toISOString()
        },

        // HYDERABAD - 5 Properties
        {
            id: 'hyderabad_001',
            title: '2BHK HITEC City',
            description: 'Near IT companies.',
            type: 'apartment',
            rent: 30000,
            deposit: 90000,
            address: 'HITEC City',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500081',
            bedrooms: 2,
            bathrooms: 2,
            area: 1100,
            furnished: 'semi-furnished',
            amenities: ['parking', 'gym'],
            images: ['https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-24',
            ownerId: 'owner_hyderabad_1',
            ownerName: 'Srinivas Reddy',
            ownerEmail: 'srinivas.hyderabad@example.com',
            ownerPhone: '9876543250',
            status: 'approved',
            featured: true,
            views: 256,
            rating: 4.6,
            reviews: [],
            createdAt: new Date('2024-12-10').toISOString(),
            updatedAt: new Date('2024-12-10').toISOString()
        },
        {
            id: 'hyderabad_002',
            title: '3BHK Villa Gachibowli',
            description: 'Gated community.',
            type: 'villa',
            rent: 55000,
            deposit: 165000,
            address: 'Gachibowli',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500032',
            bedrooms: 3,
            bathrooms: 3,
            area: 2100,
            furnished: 'semi-furnished',
            amenities: ['parking', 'pool'],
            images: ['https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-25',
            ownerId: 'owner_hyderabad_2',
            ownerName: 'Kavitha Rao',
            ownerEmail: 'kavitha.hyderabad@example.com',
            ownerPhone: '9876543251',
            status: 'approved',
            featured: true,
            views: 289,
            rating: 4.7,
            reviews: [],
            createdAt: new Date('2024-12-08').toISOString(),
            updatedAt: new Date('2024-12-08').toISOString()
        },
        {
            id: 'hyderabad_003',
            title: 'Studio Banjara Hills',
            description: 'Upscale location.',
            type: 'studio',
            rent: 20000,
            deposit: 60000,
            address: 'Banjara Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500034',
            bedrooms: 1,
            bathrooms: 1,
            area: 550,
            furnished: 'furnished',
            amenities: ['wifi', 'ac'],
            images: ['https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-01-29',
            ownerId: 'owner_hyderabad_3',
            ownerName: 'Naresh Kumar',
            ownerEmail: 'naresh.hyderabad@example.com',
            ownerPhone: '9876543252',
            status: 'approved',
            featured: false,
            views: 167,
            rating: 4.4,
            reviews: [],
            createdAt: new Date('2024-12-16').toISOString(),
            updatedAt: new Date('2024-12-16').toISOString()
        },
        {
            id: 'hyderabad_004',
            title: '4BHK Jubilee Hills Duplex',
            description: 'Ultra-luxury duplex.',
            type: 'duplex',
            rent: 180000,
            deposit: 540000,
            address: 'Jubilee Hills',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500033',
            bedrooms: 4,
            bathrooms: 5,
            area: 3500,
            furnished: 'furnished',
            amenities: ['parking', 'pool', 'gym'],
            images: ['https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-03-20',
            ownerId: 'owner_hyderabad_1',
            ownerName: 'Srinivas Reddy',
            ownerEmail: 'srinivas.hyderabad@example.com',
            ownerPhone: '9876543250',
            status: 'approved',
            featured: true,
            views: 456,
            rating: 4.9,
            reviews: [],
            createdAt: new Date('2024-12-03').toISOString(),
            updatedAt: new Date('2024-12-03').toISOString()
        },
        {
            id: 'hyderabad_005',
            title: '2BHK Kukatpally',
            description: 'Budget-friendly.',
            type: 'apartment',
            rent: 18000,
            deposit: 54000,
            address: 'KPHB, Kukatpally',
            city: 'Hyderabad',
            state: 'Telangana',
            pincode: '500072',
            bedrooms: 2,
            bathrooms: 2,
            area: 900,
            furnished: 'unfurnished',
            amenities: ['parking'],
            images: ['https://images.unsplash.com/photo-1558036117-15d82a90b9b1?auto=format&fit=crop&w=800&q=80'],
            availableFrom: '2025-02-14',
            ownerId: 'owner_hyderabad_2',
            ownerName: 'Kavitha Rao',
            ownerEmail: 'kavitha.hyderabad@example.com',
            ownerPhone: '9876543251',
            status: 'approved',
            featured: false,
            views: 103,
            rating: 4.2,
            reviews: [],
            createdAt: new Date('2024-12-19').toISOString(),
            updatedAt: new Date('2024-12-19').toISOString()
        }
    ];

    // Always overwrite to ensure fresh URLs on every deployment
    localStorage.setItem('properties', JSON.stringify(indianProperties));
    console.log('✅ 25 Indian properties loaded!');
};

// Helper to get properties safely
const getProperties = () => {
    try {
        return JSON.parse(localStorage.getItem('properties') || '[]');
    } catch (e) {
        console.error('Error parsing properties:', e);
        return [];
    }
};

const getPropertyById = (propertyId) => {
    return getProperties().find(prop => prop.id === propertyId);
};

const getPropertiesByOwner = (ownerId) => {
    return getProperties().filter(prop => prop.ownerId === ownerId);
};

const getApprovedProperties = () => {
    return getProperties().filter(prop => prop.status === 'approved');
};

const getFeaturedProperties = () => {
    return getApprovedProperties().filter(prop => prop.featured).slice(0, 6);
};

const createProperty = (propertyData) => {
    const properties = getProperties();
    const newProperty = {
        ...propertyData,
        id: Date.now().toString(36) + Math.random().toString(36).substr(2),
        status: 'pending',
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

const deleteProperty = (propertyId) => {
    const properties = getProperties();
    const filtered = properties.filter(prop => prop.id !== propertyId);
    localStorage.setItem('properties', JSON.stringify(filtered));
    return true;
};

const updatePropertyStatus = (propertyId, newStatus) => {
    return updateProperty(propertyId, { status: newStatus });
};

const toggleFeatured = (propertyId) => {
    const property = getPropertyById(propertyId);
    if (property) {
        return updateProperty(propertyId, { featured: !property.featured });
    }
    return null;
};

const incrementViews = (propertyId) => {
    const property = getPropertyById(propertyId);
    if (property) {
        return updateProperty(propertyId, { views: property.views + 1 });
    }
    return null;
};

const addReview = (propertyId, reviewData) => {
    const property = getPropertyById(propertyId);
    if (property) {
        const newReview = {
            id: Date.now().toString(36),
            ...reviewData,
            createdAt: new Date().toISOString()
        };
        const reviews = [...property.reviews, newReview];
        const rating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
        return updateProperty(propertyId, { reviews, rating });
    }
    return null;
};

const searchProperties = (filters) => {
    let properties = getApprovedProperties();

    if (filters.keyword) {
        const keyword = filters.keyword.toLowerCase();
        properties = properties.filter(prop =>
            prop.title.toLowerCase().includes(keyword) ||
            prop.city.toLowerCase().includes(keyword)
        );
    }
    if (filters.type && filters.type !== 'all') {
        properties = properties.filter(prop => prop.type === filters.type);
    }
    if (filters.city) {
        properties = properties.filter(prop => prop.city.toLowerCase() === filters.city.toLowerCase());
    }
    if (filters.minRent) {
        properties = properties.filter(prop => prop.rent >= parseInt(filters.minRent));
    }
    if (filters.maxRent) {
        properties = properties.filter(prop => prop.rent <= parseInt(filters.maxRent));
    }
    if (filters.bedrooms && filters.bedrooms !== 'any') {
        properties = properties.filter(prop => prop.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.furnished && filters.furnished !== 'all') {
        properties = properties.filter(prop => prop.furnished === filters.furnished);
    }
    if (filters.sortBy) {
        switch (filters.sortBy) {
            case 'rent-low': properties.sort((a, b) => a.rent - b.rent); break;
            case 'rent-high': properties.sort((a, b) => b.rent - a.rent); break;
            case 'newest': properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
        }
    }
    return properties;
};

const getPropertyStats = () => {
    const properties = getProperties();
    return {
        total: properties.length,
        approved: properties.filter(p => p.status === 'approved').length,
        pending: properties.filter(p => p.status === 'pending').length,
        rented: properties.filter(p => p.status === 'rented').length,
        available: properties.filter(p => p.status === 'approved').length - properties.filter(p => p.status === 'rented').length
    };
};

const getOwnerStats = (ownerId) => {
    const properties = getPropertiesByOwner(ownerId);
    return {
        total: properties.length,
        approved: properties.filter(p => p.status === 'approved').length,
        pending: properties.filter(p => p.status === 'pending').length,
        rented: properties.filter(p => p.status === 'rented').length,
        available: properties.filter(p => p.status === 'approved').length - properties.filter(p => p.status === 'rented').length
    };
};

const getCitiesWithCount = () => {
    const cities = {};
    getApprovedProperties().forEach(prop => {
        cities[prop.city] = (cities[prop.city] || 0) + 1;
    });
    return Object.entries(cities).map(([city, count]) => ({ city, count })).sort((a, b) => b.count - a.count);
};

const getPropertyTypesWithCount = () => {
    const types = {};
    getApprovedProperties().forEach(prop => {
        types[prop.type] = (types[prop.type] || 0) + 1;
    });
    return Object.entries(types).map(([type, count]) => ({ type, count })).sort((a, b) => b.count - a.count);
};

const getRentRange = () => {
    const properties = getApprovedProperties();
    if (properties.length === 0) return { min: 0, max: 0 };
    const rents = properties.map(p => p.rent);
    return { min: Math.min(...rents), max: Math.max(...rents) };
};

const validatePropertyData = (data) => {
    const errors = [];
    if (!data.title || data.title.trim().length < 10) errors.push('Title must be at least 10 characters');
    if (!data.rent || data.rent <= 0) errors.push('Valid rent required');
    return { isValid: errors.length === 0, errors };
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSampleProperties);
} else {
    initSampleProperties();
}

// Export
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

// Alias so browse-properties.html can call getAllProperties()
window.getAllProperties = () => window.RentalBridgeProperties.getApprovedProperties();

} // End of guard check