// HealthCare AI Chatbot - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initialize3DModel();
    initializeScrollEffects();
    initializeShowcaseFeatures();
});

// Navigation Functions
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#ffffff';
            navbar.style.backdropFilter = 'none';
        }
    });
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 70;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// Animation Functions
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements with animation attributes
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for dashboard numbers
    animateCounters();
}

function animateCounters() {
    const dashboardValues = document.querySelectorAll('.dashboard-value');
    
    dashboardValues.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 50; // Animation duration control
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent.includes('%') ? target + '%' : target;
            }
        };
        
        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// 3D Model Showcase
function initialize3DModel() {
    const systemButtons = document.querySelectorAll('.system-btn');
    const bodySystems = document.querySelectorAll('.body-system');
    
    systemButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetSystem = this.dataset.target;
            
            // Remove active class from all buttons and systems
            systemButtons.forEach(btn => btn.classList.remove('active'));
            bodySystems.forEach(system => system.classList.remove('active'));
            
            // Add active class to clicked button and corresponding system
            this.classList.add('active');
            const targetSystemElement = document.querySelector(`[data-system="${targetSystem}"]`);
            if (targetSystemElement) {
                targetSystemElement.classList.add('active');
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // Auto-cycle through body systems for demo
    let currentSystemIndex = 0;
    const systems = ['skeletal', 'muscular', 'organs'];
    
    setInterval(() => {
        currentSystemIndex = (currentSystemIndex + 1) % systems.length;
        const targetSystem = systems[currentSystemIndex];
        
        // Update buttons and systems
        systemButtons.forEach(btn => btn.classList.remove('active'));
        bodySystems.forEach(system => system.classList.remove('active'));
        
        const activeButton = document.querySelector(`[data-target="${targetSystem}"]`);
        const activeSystem = document.querySelector(`[data-system="${targetSystem}"]`);
        
        if (activeButton && activeSystem) {
            activeButton.classList.add('active');
            activeSystem.classList.add('active');
        }
    }, 8000); // Change system every 8 seconds
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroGraphic = document.querySelector('.hero-graphic');
        
        if (heroGraphic) {
            const rate = scrolled * -0.5;
            heroGraphic.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Progress bar for page scroll
    createScrollProgressBar();
}

function createScrollProgressBar() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #2563eb, #06b6d4);
        z-index: 10000;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Showcase Feature Interactions
function initializeShowcaseFeatures() {
    // Add hover effects to feature cards
    const featureCards = document.querySelectorAll('.feature-card, .doctor-card, .showcase-item, .tech-item');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Animate platform stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStatNumber(entry.target);
                observer.unobserve(entry.target);
            }
        });
    });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    // Add sparkle effect to tech items
    addSparkleEffect();
}

function animateStatNumber(element) {
    const originalText = element.textContent;
    const number = parseInt(originalText.replace(/\D/g, ''));
    const suffix = originalText.replace(/[\d,]/g, '');
    
    if (isNaN(number)) return;
    
    let current = 0;
    const increment = number / 60; // 60 frames for 1 second animation
    
    const updateNumber = () => {
        current += increment;
        if (current < number) {
            element.textContent = Math.floor(current).toLocaleString() + suffix;
            requestAnimationFrame(updateNumber);
        } else {
            element.textContent = originalText;
        }
    };
    
    updateNumber();
}

function addSparkleEffect() {
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('click', function() {
            createSparkles(this);
        });
    });
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 8;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #ffd700;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            animation: sparkle 1s ease-out forwards;
        `;
        
        const angle = (i / sparkleCount) * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        
        sparkle.style.setProperty('--end-x', Math.cos(angle) * distance + 'px');
        sparkle.style.setProperty('--end-y', Math.sin(angle) * distance + 'px');
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 1000);
    }
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

// Add some CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes sparkle {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translate(var(--end-x), var(--end-y)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Enhanced scroll behavior for better UX
window.addEventListener('load', function() {
    // Smooth scroll to top on page load
    window.scrollTo(0, 0);
    
    // Add loading animation fade out
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);
});

// Add keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.style.zIndex === '10000') {
                modal.remove();
            }
        });
    }
});

// Performance optimization: Lazy loading for images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
lazyLoadImages();

console.log('🏥 HealthCare AI Platform loaded successfully!');
