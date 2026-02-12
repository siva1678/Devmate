// DevMate - Interactive JavaScript Application
// Professional, clean, and aesthetic interactions

// Global variables
let currentUser = {
    name: 'Marthanda',
    email: 'marthanda@srm.edu.in',
    college: 'SRM Institute',
    avatar: 'M'
};

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Initialize landing page animations if on index page
    if (document.querySelector('.hero-section')) {
        initializeLandingPage();
    }
    
    // Initialize dashboard features if on dashboard
    if (document.querySelector('.dashboard')) {
        initializeDashboard();
    }
    
    // Initialize global features
    initializeGlobalFeatures();
}

// Landing Page Animations and Interactions
function initializeLandingPage() {
    // Rotating geometric shape animation
    const rotatingShape = document.querySelector('.rotating-shape');
    if (rotatingShape) {
        // Continuous rotation animation
        let rotation = 0;
        setInterval(() => {
            rotation += 0.5;
            rotatingShape.style.transform = `rotate(${rotation}deg) scale(${1 + Math.sin(rotation * 0.02) * 0.1})`;
        }, 50);
    }
    
    // Parallax scrolling effect
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all animatable elements
    document.querySelectorAll('.feature-card, .glass-panel, .hero-content').forEach(el => {
        observer.observe(el);
    });
}

// Dashboard Initialization
function initializeDashboard() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Initialize search functionality
    initializeSearch();
    
    // Initialize project cards interactions
    initializeProjectCards();
    
    // Initialize notifications
    initializeNotifications();
}

// Sidebar Navigation
function initializeSidebar() {
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }
    
    // Active navigation highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-item-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.includes(currentPage)) {
            link.closest('.nav-item').classList.add('active');
        }
    });
}

// Search Functionality
function initializeSearch() {
    const searchBars = document.querySelectorAll('.search-bar, .form-input[placeholder*="Search"]');
    
    searchBars.forEach(searchBar => {
        let searchTimeout;
        
        searchBar.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                performSearch(this.value);
            }, 300);
        });
    });
}

function performSearch(query) {
    if (query.length < 2) return;
    
    // Simulate search functionality
    console.log(`Searching for: ${query}`);
    
    // In a real application, this would make an API call
    // For now, we'll just highlight matching elements
    const searchableElements = document.querySelectorAll('[data-searchable]');
    
    searchableElements.forEach(element => {
        const text = element.textContent.toLowerCase();
        const matches = text.includes(query.toLowerCase());
        
        element.style.opacity = matches ? '1' : '0.5';
    });
}

// Project Cards Interactions
function initializeProjectCards() {
    const projectCards = document.querySelectorAll('.project-card, .glass-panel[data-project]');
    
    projectCards.forEach(card => {
        // Hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px)';
            this.style.boxShadow = '0 20px 40px rgba(0, 192, 255, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Click interactions
        card.addEventListener('click', function() {
            const projectId = this.dataset.project;
            if (projectId) {
                openProject(projectId);
            }
        });
    });
}

function openProject(projectId) {
    // Simulate opening project details
    console.log(`Opening project: ${projectId}`);
    
    // In a real application, this would navigate to project details
    if (window.location.pathname.includes('dashboard')) {
        window.location.href = `project.html?id=${projectId}`;
    }
}

// Notifications System
function initializeNotifications() {
    // Check for new notifications periodically
    setInterval(checkNotifications, 30000); // Every 30 seconds
    
    // Initialize notification bell
    const notificationBell = document.querySelector('.notification-bell');
    if (notificationBell) {
        notificationBell.addEventListener('click', showNotifications);
    }
}

function checkNotifications() {
    // Simulate checking for new notifications
    const hasNewNotifications = Math.random() > 0.8;
    
    if (hasNewNotifications) {
        showNotificationBadge();
    }
}

function showNotificationBadge() {
    const bell = document.querySelector('.notification-bell');
    if (bell && !bell.querySelector('.notification-badge')) {
        const badge = document.createElement('div');
        badge.className = 'notification-badge';
        badge.textContent = '1';
        bell.appendChild(badge);
    }
}

function showNotifications() {
    // Create and show notifications dropdown
    const notifications = [
        {
            title: 'New Team Member',
            message: 'Kavya Nair joined your AI Study Assistant project',
            time: '5 minutes ago',
            type: 'team'
        },
        {
            title: 'Project Update',
            message: 'Arjun Patel updated the backend documentation',
            time: '1 hour ago',
            type: 'update'
        },
        {
            title: 'Hackathon Reminder',
            message: 'TechFest 2024 registration closes in 2 days',
            time: '3 hours ago',
            type: 'event'
        }
    ];
    
    showNotificationDropdown(notifications);
}

function showNotificationDropdown(notifications) {
    // Remove existing dropdown
    const existingDropdown = document.querySelector('.notification-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
        return;
    }
    
    // Create dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown glass-panel';
    dropdown.style.cssText = `
        position: absolute;
        top: 100%;
        right: 0;
        width: 320px;
        max-height: 400px;
        overflow-y: auto;
        z-index: 1000;
        margin-top: 0.5rem;
    `;
    
    // Add notifications
    const notificationsList = notifications.map(notification => `
        <div class="notification-item" style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <h4 style="color: var(--text-primary); font-size: 0.875rem; font-weight: 600; margin: 0;">${notification.title}</h4>
                <span style="color: var(--text-muted); font-size: 0.75rem;">${notification.time}</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.875rem; margin: 0;">${notification.message}</p>
        </div>
    `).join('');
    
    dropdown.innerHTML = `
        <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
            <h3 style="color: var(--text-primary); margin: 0;">Notifications</h3>
        </div>
        ${notificationsList}
        <div style="padding: 1rem; text-align: center;">
            <button class="btn btn-secondary" style="width: 100%;" onclick="markAllAsRead()">Mark All as Read</button>
        </div>
    `;
    
    // Position and show dropdown
    const bell = document.querySelector('.notification-bell');
    if (bell) {
        bell.style.position = 'relative';
        bell.appendChild(dropdown);
        
        // Remove badge
        const badge = bell.querySelector('.notification-badge');
        if (badge) badge.remove();
    }
}

function markAllAsRead() {
    const dropdown = document.querySelector('.notification-dropdown');
    if (dropdown) dropdown.remove();
}

// Chat Functionality
function initializeChat() {
    const chatInput = document.querySelector('.chat-input');
    const sendButton = document.querySelector('.send-button');
    
    if (chatInput && sendButton) {
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
        
        sendButton.addEventListener('click', sendMessage);
    }
}

function sendMessage() {
    const chatInput = document.querySelector('.chat-input');
    const message = chatInput.value.trim();
    
    if (message) {
        addMessageToChat(message, 'own');
        chatInput.value = '';
        
        // Simulate response after a delay
        setTimeout(() => {
            simulateResponse();
        }, 1000 + Math.random() * 2000);
    }
}

function addMessageToChat(message, type = 'received') {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;
    
    const messageElement = document.createElement('div');
    messageElement.className = `message ${type}`;
    
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
        <div class="message-header">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: ${type === 'own' ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))' : 'linear-gradient(135deg, #FF6B6B, #4ECDC4)'}; display: flex; align-items: center; justify-content: center;">
                    <span style="color: white; font-weight: 600; font-size: 0.75rem;">${type === 'own' ? currentUser.avatar : 'PS'}</span>
                </div>
                <span class="message-author">${type === 'own' ? 'You' : 'Priya Sharma'}</span>
            </div>
            <span class="message-time">${timestamp}</span>
        </div>
        <div class="message-content">${message}</div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateResponse() {
    const responses = [
        "That's a great idea! Let me think about the implementation details.",
        "I agree with your approach. Should we schedule a call to discuss this further?",
        "Thanks for sharing that resource. It's very helpful for our project.",
        "I've been working on something similar. Let me share my progress with you.",
        "Perfect! That aligns well with what we discussed earlier."
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    addMessageToChat(randomResponse, 'received');
}

// Global Features
function initializeGlobalFeatures() {
    // Initialize tooltips
    initializeTooltips();
    
    // Initialize modals
    initializeModals();
    
    // Initialize form validations
    initializeFormValidations();
    
    // Initialize theme switching (if implemented)
    initializeThemeSwitch();
}

// Tooltips
function initializeTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(event) {
    const text = event.target.dataset.tooltip;
    if (!text) return;
    
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = text;
    tooltip.style.cssText = `
        position: absolute;
        background: var(--bg-tertiary);
        color: var(--text-primary);
        padding: 0.5rem 0.75rem;
        border-radius: var(--radius-sm);
        font-size: 0.875rem;
        z-index: 2000;
        pointer-events: none;
        white-space: nowrap;
        border: 1px solid var(--glass-border);
    `;
    
    document.body.appendChild(tooltip);
    
    // Position tooltip
    const rect = event.target.getBoundingClientRect();
    tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
    tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    
    event.target._tooltip = tooltip;
}

function hideTooltip(event) {
    if (event.target._tooltip) {
        event.target._tooltip.remove();
        delete event.target._tooltip;
    }
}

// Modals
function initializeModals() {
    // Close modals when clicking outside
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal-overlay')) {
            closeModal(event.target.querySelector('.modal'));
        }
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            const openModal = document.querySelector('.modal:not(.hidden)');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });
}

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
    }
}

// Form Validations
function initializeFormValidations() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            if (!validateForm(this)) {
                event.preventDefault();
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // URL validation
    if (field.type === 'url' && value) {
        try {
            new URL(value);
        } catch {
            isValid = false;
            errorMessage = 'Please enter a valid URL';
        }
    }
    
    // Show/hide error message
    showFieldError(field, isValid ? '' : errorMessage);
    
    return isValid;
}

function showFieldError(field, message) {
    // Remove existing error
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Add new error if needed
    if (message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.25rem;
        `;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#ef4444';
    } else {
        field.style.borderColor = '';
    }
}

// Theme Switching (Optional)
function initializeThemeSwitch() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    document.body.classList.toggle('light-theme');
    
    // Save preference
    const isLight = document.body.classList.contains('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// Utility Functions
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Animation utilities
function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        element.style.opacity = Math.min(progress / duration, 1);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        
        element.style.opacity = Math.max(1 - (progress / duration), 0);
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    
    requestAnimationFrame(animate);
}

// Export functions for global use
window.DevMate = {
    openModal,
    closeModal,
    showNotifications,
    sendMessage,
    openProject,
    fadeIn,
    fadeOut
};

// Initialize chat if on chat pages
if (window.location.pathname.includes('chat')) {
    document.addEventListener('DOMContentLoaded', initializeChat);
}

