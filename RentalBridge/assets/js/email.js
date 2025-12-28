// ==========================================
// RENTAL BRIDGE - EMAIL FUNCTIONALITY
// Using EmailJS for free email service
// ==========================================

// EmailJS Configuration
const EMAILJS_CONFIG = {
    publicKey: 'xmt7I_-lQCfJZVGl_',
    serviceId: 'service_i9ghxpw',
    templates: {
        contact: 'template_vrzgt3q',
        inquiry: 'template_qvdxj3i'
    }
};

// Initialize EmailJS
const initializeEmailJS = () => {
    if (typeof emailjs !== 'undefined') {
        emailjs.init(EMAILJS_CONFIG.publicKey);
        console.log('✅ EmailJS initialized successfully');
        return true;
    } else {
        console.error('❌ EmailJS library not loaded');
        return false;
    }
};

// Send contact form email
const sendContactFormEmail = async (formData) => {
    const utils = window.RentalBridgeUtils;
    
    if (!utils) {
        alert('Error: Utilities not loaded');
        return { success: false, error: 'Utils not loaded' };
    }
    
    if (typeof emailjs === 'undefined') {
        utils.showToast('Email service not available', 'error');
        return { success: false, error: 'EmailJS not loaded' };
    }
    
    utils.showLoading('Sending your message...');

    const templateParams = {
        to_name: 'Rental Bridge Team',
        from_name: formData.name,
        from_email: formData.email,
        from_phone: formData.phone || 'Not provided',
        subject: formData.subject,
        message: formData.message,
        reply_to: formData.email,
        contact_date: new Date().toLocaleString('en-IN', { 
            timeZone: 'Asia/Kolkata',
            dateStyle: 'full',
            timeStyle: 'short'
        })
    };

    console.log('📧 Sending email with params:', templateParams);

    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.contact,
            templateParams
        );

        utils.hideLoading();
        console.log('✅ Email sent successfully:', response);
        utils.showToast('✅ Message sent successfully! We will get back to you within 24 hours.', 'success');
        
        saveContactSubmissionToStorage({
            id: utils.generateId ? utils.generateId() : Date.now().toString(),
            ...formData,
            status: 'sent',
            createdAt: new Date().toISOString()
        });
        
        return { success: true, response };
        
    } catch (error) {
        utils.hideLoading();
        console.error('❌ Email send failed:', error);
        
        let errorMessage = 'Failed to send message. ';
        if (error.text) {
            errorMessage += error.text;
        } else if (error.status === 412) {
            errorMessage += 'Invalid EmailJS credentials.';
        } else {
            errorMessage += 'Please try again.';
        }
        
        utils.showToast(errorMessage, 'error');
        return { success: false, error };
    }
};

// Send property inquiry email
const sendPropertyInquiryEmail = async (propertyData, userData, message) => {
    const utils = window.RentalBridgeUtils;
    
    if (!utils || typeof emailjs === 'undefined') {
        alert('Email service not available');
        return { success: false };
    }
    
    utils.showLoading('Sending inquiry...');

    const templateParams = {
        to_name: propertyData.ownerName || 'Property Owner',
        to_email: propertyData.ownerEmail,
        from_name: userData.name,
        from_email: userData.email,
        from_phone: userData.phone || 'Not provided',
        subject: `Property Inquiry: ${propertyData.title}`,
        property_title: propertyData.title,
        property_address: propertyData.address,
        property_rent: `₹${propertyData.rent}/month`,
        message: message,
        reply_to: userData.email,
        inquiry_date: new Date().toLocaleString('en-IN')
    };

    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.inquiry,
            templateParams
        );

        utils.hideLoading();
        utils.showToast('✅ Inquiry sent successfully!', 'success');
        
        saveInquiryToStorage({
            id: utils.generateId ? utils.generateId() : Date.now().toString(),
            propertyId: propertyData.id,
            propertyTitle: propertyData.title,
            seekerId: userData.id,
            seekerName: userData.name,
            seekerEmail: userData.email,
            seekerPhone: userData.phone,
            ownerId: propertyData.ownerId,
            ownerName: propertyData.ownerName,
            message: message,
            status: 'sent',
            createdAt: new Date().toISOString()
        });

        return { success: true, response };
        
    } catch (error) {
        utils.hideLoading();
        console.error('❌ Inquiry failed:', error);
        utils.showToast('Failed to send inquiry', 'error');
        return { success: false, error };
    }
};

// Send inquiry response
const sendInquiryResponseEmail = async (inquiryData, responseMessage) => {
    const utils = window.RentalBridgeUtils;
    
    if (!utils || typeof emailjs === 'undefined') {
        alert('Email service not available');
        return { success: false };
    }
    
    utils.showLoading('Sending response...');

    const templateParams = {
        to_name: inquiryData.seekerName,
        to_email: inquiryData.seekerEmail,
        from_name: inquiryData.ownerName,
        subject: `Response: ${inquiryData.propertyTitle}`,
        property_title: inquiryData.propertyTitle,
        message: responseMessage,
        response_date: new Date().toLocaleString('en-IN')
    };

    try {
        const response = await emailjs.send(
            EMAILJS_CONFIG.serviceId,
            EMAILJS_CONFIG.templates.inquiry,
            templateParams
        );

        utils.hideLoading();
        utils.showToast('✅ Response sent!', 'success');
        updateInquiryStatusInStorage(inquiryData.id, 'responded');
        return { success: true, response };
        
    } catch (error) {
        utils.hideLoading();
        console.error('❌ Response failed:', error);
        utils.showToast('Failed to send response', 'error');
        return { success: false, error };
    }
};

// Storage helpers
const saveContactSubmissionToStorage = (contactData) => {
    try {
        const contacts = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        contacts.push(contactData);
        localStorage.setItem('contactSubmissions', JSON.stringify(contacts));
    } catch (error) {
        console.error('Failed to save contact:', error);
    }
};

const saveInquiryToStorage = (inquiryData) => {
    try {
        const inquiries = JSON.parse(localStorage.getItem('inquiries') || '[]');
        inquiries.push(inquiryData);
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
    } catch (error) {
        console.error('Failed to save inquiry:', error);
    }
};

const getInquiriesFromStorage = () => {
    return JSON.parse(localStorage.getItem('inquiries') || '[]');
};

const getOwnerInquiriesFromStorage = (ownerId) => {
    return getInquiriesFromStorage().filter(inq => inq.ownerId === ownerId);
};

const getSeekerInquiriesFromStorage = (seekerId) => {
    return getInquiriesFromStorage().filter(inq => inq.seekerId === seekerId);
};

const updateInquiryStatusInStorage = (inquiryId, newStatus) => {
    const inquiries = getInquiriesFromStorage();
    const index = inquiries.findIndex(inq => inq.id === inquiryId);
    
    if (index !== -1) {
        inquiries[index].status = newStatus;
        inquiries[index].updatedAt = new Date().toISOString();
        localStorage.setItem('inquiries', JSON.stringify(inquiries));
        return true;
    }
    return false;
};

const deleteInquiryFromStorage = (inquiryId) => {
    const inquiries = getInquiriesFromStorage();
    const filtered = inquiries.filter(inq => inq.id !== inquiryId);
    localStorage.setItem('inquiries', JSON.stringify(filtered));
};

// Initialize on load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEmailJS);
} else {
    initializeEmailJS();
}

// Export to global scope
window.RentalBridgeEmail = {
    sendContactEmail: sendContactFormEmail,
    sendPropertyInquiry: sendPropertyInquiryEmail,
    sendInquiryResponse: sendInquiryResponseEmail,
    getAllInquiries: getInquiriesFromStorage,
    getOwnerInquiries: getOwnerInquiriesFromStorage,
    getSeekerInquiries: getSeekerInquiriesFromStorage,
    updateInquiryStatus: updateInquiryStatusInStorage,
    deleteInquiry: deleteInquiryFromStorage,
    initEmailJS: initializeEmailJS
};

console.log('📧 Rental Bridge Email Module Loaded');