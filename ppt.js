// HealthCare AI Chatbot - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeAnimations();
    initialize3DModel();
    initializeScrollEffects();
    initializeShowcaseFeatures();
    initializeArchitectureSection();
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

// Architecture Section Interactions
function initializeArchitectureSection() {
    // Sequential flow animation for architecture cards
    animateArchitectureFlows();
    
    // Interactive hover effects for flow steps
    initializeFlowStepInteractions();
    
    // Data flow visualization
    initializeDataFlowAnimation();
    
    // Progressive reveal animation
    initializeProgressiveReveal();
}

function animateArchitectureFlows() {
    const architectureCards = document.querySelectorAll('.architecture-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateFlowSteps(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    architectureCards.forEach(card => observer.observe(card));
}

function animateFlowSteps(card) {
    const flowSteps = card.querySelectorAll('.flow-step');
    const flowArrows = card.querySelectorAll('.flow-arrow');
    
    // Reset all elements
    flowSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(30px)';
    });
    
    flowArrows.forEach(arrow => {
        arrow.style.opacity = '0';
        arrow.style.transform = 'scale(0.5)';
    });
    
    // Animate steps sequentially
    flowSteps.forEach((step, index) => {
        setTimeout(() => {
            step.style.transition = 'all 0.6s ease';
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
            
            // Add pulse effect to step icon
            const stepIcon = step.querySelector('.step-icon');
            if (stepIcon) {
                stepIcon.style.animation = 'pulse 0.6s ease';
            }
            
            // Animate arrow after step
            if (index < flowArrows.length) {
                setTimeout(() => {
                    flowArrows[index].style.transition = 'all 0.4s ease';
                    flowArrows[index].style.opacity = '1';
                    flowArrows[index].style.transform = 'scale(1)';
                }, 300);
            }
        }, index * 400);
    });
}

function initializeFlowStepInteractions() {
    const flowSteps = document.querySelectorAll('.flow-step');
    
    flowSteps.forEach((step, index) => {
        step.addEventListener('mouseenter', function() {
            // Highlight connected steps
            const parentCard = this.closest('.architecture-card');
            const allSteps = parentCard.querySelectorAll('.flow-step');
            
            allSteps.forEach((s, i) => {
                if (i <= index) {
                    s.style.filter = 'brightness(1.1)';
                    s.style.transform = 'translateY(-5px) scale(1.02)';
                } else {
                    s.style.filter = 'brightness(0.8)';
                }
            });
        });
        
        step.addEventListener('mouseleave', function() {
            const parentCard = this.closest('.architecture-card');
            const allSteps = parentCard.querySelectorAll('.flow-step');
            
            allSteps.forEach(s => {
                s.style.filter = '';
                s.style.transform = '';
            });
        });
        
        // Click to show detailed info
        step.addEventListener('click', function() {
            showStepDetails(this, index);
        });
    });
}

function showStepDetails(step, index) {
    const stepTitle = step.querySelector('h4').textContent;
    const stepDescription = step.querySelector('p').textContent;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;
    
    const modalContent = document.createElement('div');
    modalContent.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        transform: scale(0.8);
        animation: slideIn 0.3s ease forwards;
    `;
    
    modalContent.innerHTML = `
        <div style="font-size: 3rem; color: #2563eb; margin-bottom: 20px;">
            ${step.querySelector('.step-icon').innerHTML}
        </div>
        <h3 style="font-size: 1.8rem; margin-bottom: 20px; color: #1f2937;">${stepTitle}</h3>
        <p style="font-size: 1.1rem; color: #6b7280; margin-bottom: 30px; line-height: 1.6;">${stepDescription}</p>
        <button onclick="this.closest('[style*=\"position: fixed\"]').remove()" 
                style="background: #2563eb; color: white; border: none; padding: 12px 30px; border-radius: 25px; cursor: pointer; font-size: 1rem; transition: all 0.3s ease;">
            Close
        </button>
    `;
    
    modal.appendChild(modalContent);
    document.body.appendChild(modal);
    
    // Close on background click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

function initializeDataFlowAnimation() {
    const techSpecs = document.querySelector('.tech-specs-container');
    
    if (techSpecs) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSpecItems();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(techSpecs);
    }
}

function animateSpecItems() {
    const specItems = document.querySelectorAll('.spec-item');
    
    specItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px) rotateY(-10deg)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.8s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0) rotateY(0deg)';
            
            // Add sparkle effect
            setTimeout(() => {
                createDataSparkles(item);
            }, 400);
        }, index * 200);
    });
}

function createDataSparkles(element) {
    const rect = element.getBoundingClientRect();
    const sparkleCount = 5;
    
    for (let i = 0; i < sparkleCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #06b6d4;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: dataSparkle 2s ease-out forwards;
        `;
        
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 2000);
    }
}

function initializeProgressiveReveal() {
    // Add progressive reveal effect to architecture icons
    const archIcons = document.querySelectorAll('.arch-icon');
    
    archIcons.forEach(icon => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'iconReveal 1s ease forwards';
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(icon);
    });
}

// Add additional CSS animations dynamically for architecture section
const architectureStyle = document.createElement('style');
architectureStyle.textContent = `
    @keyframes iconReveal {
        0% { transform: scale(0) rotate(-180deg); opacity: 0; }
        50% { transform: scale(1.2) rotate(-90deg); opacity: 0.8; }
        100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes dataSparkle {
        0% { 
            transform: scale(1) translateY(0);
            opacity: 1;
        }
        50% {
            transform: scale(1.5) translateY(-20px);
            opacity: 0.8;
        }
        100% { 
            transform: scale(0) translateY(-40px);
            opacity: 0;
        }
    }
    
    .flow-step {
        cursor: pointer;
        user-select: none;
    }
    
    .flow-step:hover .step-icon {
        animation: bounce 0.6s ease !important;
    }
    
    @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
    }
`;
document.head.appendChild(architectureStyle);

console.log('🏥 HealthCare AI Platform loaded successfully!');

