// ============================================
// Preloader
// ============================================
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
            document.body.style.overflow = 'visible';
        }, 300);
    }, 1000);
});

// ============================================
// Smooth Scrolling Navigation
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Header Background on Scroll
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
        header.style.background = 'rgba(102, 126, 234, 0.95)';
        header.style.backdropFilter = 'blur(15px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        header.style.backdropFilter = 'blur(10px)';
    }
});

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, delay);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============================================
// Typing Effect for Hero Title
// ============================================
function typeWriter(element, text, speed = 150) {
    let i = 0;
    element.innerHTML = '';
    element.style.borderRight = '2px solid white';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Remove cursor after typing is complete
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }
    type();
}

// Initialize typing effect
window.addEventListener('load', function() {
    setTimeout(() => {
        const heroTitle = document.querySelector('.typing-text');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 100);
        }
    }, 1500);
});

// ============================================
// Mobile Menu Toggle
// ============================================
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        this.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const particles = document.querySelector('.particles');
    
    if (hero && particles) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate * 0.2}px)`;
        particles.style.transform = `translateY(${rate * 0.8}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// ============================================
// Skill Tags Hover Effects
// ============================================
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotateY(10deg)';
        this.style.boxShadow = '0 10px 25px rgba(102, 126, 234, 0.4)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotateY(0deg)';
        this.style.boxShadow = 'none';
    });
});

// ============================================
// Project Cards Animation
// ============================================
const projectObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0deg)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px) rotateX(10deg)';
    card.style.transition = 'all 0.6s ease';
    card.style.transitionDelay = `${index * 100}ms`;
    projectObserver.observe(card);
});

// ============================================
// Back to Top Button
// ============================================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// Achievement Cards Counter Animation
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    updateCounter();
}

// Initialize counter animations when achievements section is visible
const achievementsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('[data-count]');
            counters.forEach(counter => {
                const target = parseInt(counter.dataset.count);
                animateCounter(counter, target);
            });
        }
    });
}, { threshold: 0.5 });

const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    achievementsObserver.observe(achievementsSection);
}

// ============================================
// Contact Form Validation (Future Enhancement)
// ============================================
function validateContactForm(formData) {
    const errors = [];
    
    if (!formData.name || formData.name.trim().length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    if (!formData.email || !isValidEmail(formData.email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!formData.message || formData.message.trim().length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// Smooth Page Transitions
// ============================================
function addPageTransition() {
    const links = document.querySelectorAll('a[href]:not([href^="#"]):not([href^="mailto"]):not([href^="tel"])');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            if (link.hostname !== window.location.hostname) return;
            
            e.preventDefault();
            const href = this.href;
            
            document.body.style.opacity = '0';
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// ============================================
// Dynamic Theme Support (Future Enhancement)
// ============================================
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
}

// ============================================
// Performance Optimizations
// ============================================
// Debounce function for scroll events
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

// Throttle function for resize events
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

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Handle scroll-dependent animations here
    updateActiveNavLink();
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// ============================================
// Active Navigation Link Highlighting
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// Enhanced Loading Animations
// ============================================
function initLoadingAnimations() {
    // Stagger animations for grid items
    const gridItems = document.querySelectorAll('.skills-grid .skill-category');
    gridItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 100}ms`;
    });
    
    // Timeline items animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 200}ms`;
    });
}

// ============================================
// Contact Methods Click Tracking
// ============================================
function initContactTracking() {
    const contactLinks = document.querySelectorAll('.contact-link, .method-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function() {
            const action = this.textContent.trim();
            // Add analytics tracking here if needed
            console.log(`Contact action: ${action}`);
        });
    });
}

// ============================================
// Error Handling and Fallbacks
// ============================================
function addErrorHandling() {
    // Handle missing images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50" y="50" text-anchor="middle" dy=".3em" fill="%23999">Image</text></svg>';
        });
    });
    
    // Handle browser compatibility
    if (!window.IntersectionObserver) {
        // Fallback for older browsers
        document.querySelectorAll('.fade-in').forEach(el => {
            el.classList.add('visible');
        });
    }
}

// ============================================
// Keyboard Navigation Support
// ============================================
function initKeyboardNavigation() {
    // Skip to main content
    const skipLink = document.querySelector('.skip-to-main');
    if (skipLink) {
        skipLink.addEventListener('click', function(e) {
            e.preventDefault();
            const main = document.querySelector('main') || document.querySelector('.hero');
            if (main) {
                main.focus();
            }
        });
    }
    
    // Escape key handling
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            const mobileToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileToggle.classList.remove('active');
            }
        }
    });
}

// ============================================
// Print Styles Support
// ============================================
function optimizeForPrint() {
    window.addEventListener('beforeprint', function() {
        // Show all hidden content for printing
        document.querySelectorAll('.fade-in').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    });
}

// ============================================
// Initialize All Functions
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initLoadingAnimations();
    initContactTracking();
    addErrorHandling();
    initKeyboardNavigation();
    optimizeForPrint();
    addPageTransition();
    initThemeToggle();
    
    // Add custom cursor (optional)
    if (window.innerWidth > 768) {
        document.body.style.cursor = 'none';
        
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            opacity: 0.7;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on hover
        document.querySelectorAll('a, button, .skill-tag, .project-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
});

// ============================================
// Service Worker Registration (PWA Support)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// ============================================
// Analytics and Performance Monitoring
// ============================================
function trackPerformance() {
    // Track page load time
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`Page load time: ${pageLoadTime}ms`);
        }, 0);
    });
}

// Initialize performance tracking
trackPerformance();

// ============================================
// Accessibility Enhancements
// ============================================
function enhanceAccessibility() {
    // Add skip navigation link
    const skipNav = document.createElement('a');
    skipNav.href = '#main';
    skipNav.textContent = 'Skip to main content';
    skipNav.className = 'skip-nav';
    skipNav.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: var(--primary-color);
        color: white;
        padding: 8px;
        text-decoration: none;
        z-index: 1000;
        border-radius: 4px;
        transition: top 0.3s;
    `;
    
    skipNav.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipNav.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipNav, document.body.firstChild);
    
    // Add ARIA labels where needed
    const backToTop = document.getElementById('backToTop');
    if (backToTop && !backToTop.getAttribute('aria-label')) {
        backToTop.setAttribute('aria-label', 'Back to top');
    }
}

// Initialize accessibility enhancements
enhanceAccessibility();