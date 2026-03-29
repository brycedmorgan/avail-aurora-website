// Main JavaScript for Avail Wellness Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize form handling
    initializeForms();
    
    // Initialize scroll to top button
    initializeScrollToTop();
    
    // Initialize lazy loading
    initializeLazyLoading();
    
    // Initialize analytics (if needed)
    // initializeAnalytics();
});

// Form handling with validation
function initializeForms() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
                return false;
            }
            
            // Add loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending...';
            }
        });
        
        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
}

// Form validation
function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    let isValid = true;
    let errorMessage = '';
    
    // Required field validation
    if (required && !value) {
        isValid = false;
        errorMessage = 'This field is required';
    }
    
    // Email validation
    else if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address';
        }
    }
    
    // Phone validation
    else if (type === 'tel' && value) {
        const phoneRegex = /^[\d\s\-\+\(\)\.]+$/;
        if (!phoneRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number';
        }
    }
    
    // Update field appearance
    if (isValid) {
        field.classList.remove('error');
        hideFieldError(field);
    } else {
        field.classList.add('error');
        showFieldError(field, errorMessage);
    }
    
    return isValid;
}

function showFieldError(field, message) {
    let errorElement = field.nextElementSibling;
    
    if (!errorElement || !errorElement.classList.contains('field-error')) {
        errorElement = document.createElement('div');
        errorElement.classList.add('field-error');
        field.parentNode.insertBefore(errorElement, field.nextSibling);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

function hideFieldError(field) {
    const errorElement = field.nextElementSibling;
    if (errorElement && errorElement.classList.contains('field-error')) {
        errorElement.style.display = 'none';
    }
}

// Scroll to top button
function initializeScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = `
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
        </svg>
    `;
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    
    document.body.appendChild(scrollBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add styles
    const scrollStyles = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--sage-green);
            color: white;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 16px rgba(45, 90, 52, 0.2);
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            z-index: 1000;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        
        .scroll-to-top:hover {
            background: var(--forest-primary);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(45, 90, 52, 0.3);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = scrollStyles;
    document.head.appendChild(style);
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px 0px'
        });
        
        images.forEach(img => {
            img.classList.add('lazy');
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        images.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
    
    // Add lazy loading styles
    const lazyStyles = `
        img.lazy {
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        img.loaded {
            opacity: 1;
        }
    `;
    
    const style = document.createElement('style');
    style.textContent = lazyStyles;
    document.head.appendChild(style);
}

// Utility functions
function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Performance monitoring
function measurePerformance() {
    if ('performance' in window && 'navigation' in performance) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.navigation;
                const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
                
                console.log('Page load time:', loadTime + 'ms');
                
                // Send to analytics if needed
                // analytics.track('page_load_time', { duration: loadTime });
            }, 0);
        });
    }
}

// Initialize performance monitoring
measurePerformance();

// Export utilities for external use
window.AvailUtils = {
    debounce,
    throttle,
    validateForm,
    validateField
};