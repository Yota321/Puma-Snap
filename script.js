// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize animations
    initializeAnimations();
    
    // Initialize color options
    initializeColorOptions();
    
    // Initialize scroll effects
    initializeScrollEffects();
    
    // Initialize navbar effects
    initializeNavbar();
    
    // Initialize loading screen
    initializeLoading();
});

// Loading Screen
function initializeLoading() {
    const loading = document.createElement('div');
    loading.className = 'loading';
    loading.innerHTML = `
        <svg class="loading-logo" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 20 L80 20 L80 80 L20 80 Z" stroke="#ff6b35" stroke-width="3" fill="none"/>
            <circle cx="50" cy="50" r="15" fill="#ff6b35"/>
        </svg>
    `;
    document.body.appendChild(loading);
    
    // Remove loading screen after 2 seconds
    setTimeout(() => {
        loading.classList.add('fade-out');
        setTimeout(() => {
            document.body.removeChild(loading);
        }, 500);
    }, 2000);
}

// Animations
function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observe all elements with data-aos attribute
    document.querySelectorAll('[data-aos]').forEach(el => {
        observer.observe(el);
    });
    
    // Hero shoe animation on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroShoe = document.querySelector('.hero-shoe');
        if (heroShoe) {
            heroShoe.style.transform = `translateY(${scrolled * 0.1}px) rotate(${-5 + scrolled * 0.01}deg)`;
        }
    });
}

// Color Options
function initializeColorOptions() {
    const colorOptions = document.querySelectorAll('.color-option');
    
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            
            // Add active class to clicked option
            option.classList.add('active');
            
            // Add click animation
            option.style.transform = 'scale(0.95)';
            setTimeout(() => {
                option.style.transform = '';
            }, 150);
            
            // Update hero shoe color (if implemented)
            const colorName = option.dataset.color;
            updateHeroShoeColor(colorName);
        });
    });
}

function updateHeroShoeColor(colorName) {
    const heroShoe = document.querySelector('.hero-shoe');
    if (heroShoe) {
        // Add color transition effect
        heroShoe.style.transition = 'filter 0.5s ease';
        
        // Apply color filter based on selection
        switch(colorName) {
            case 'electric-blue':
                heroShoe.style.filter = 'hue-rotate(200deg) saturate(1.2) drop-shadow(0 20px 40px rgba(0, 100, 255, 0.3))';
                break;
            case 'neon-green':
                heroShoe.style.filter = 'hue-rotate(100deg) saturate(1.3) drop-shadow(0 20px 40px rgba(0, 255, 100, 0.3))';
                break;
            case 'fire-orange':
                heroShoe.style.filter = 'hue-rotate(0deg) saturate(1.2) drop-shadow(0 20px 40px rgba(255, 107, 53, 0.3))';
                break;
            case 'classic-black':
                heroShoe.style.filter = 'grayscale(1) contrast(1.2) drop-shadow(0 20px 40px rgba(0, 0, 0, 0.5))';
                break;
            default:
                heroShoe.style.filter = 'drop-shadow(0 20px 40px rgba(255, 107, 53, 0.3))';
        }
    }
}

// Scroll Effects
function initializeScrollEffects() {
    let ticking = false;
    
    function updateScrollEffects() {
        const scrolled = window.pageYOffset;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        
        // Speed lines animation based on scroll
        const speedLines = document.querySelector('.speed-lines');
        if (speedLines && scrolled < window.innerHeight) {
            const intensity = Math.min(scrolled / 100, 1);
            speedLines.style.opacity = intensity;
            speedLines.style.transform = `translateX(${-100 + (intensity * 200)}px)`;
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Smooth scrolling for anchor links
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
}

// Navbar Effects
function initializeNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        // Change navbar background on scroll
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#000';
            navbar.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Button Interactions
document.addEventListener('click', function(e) {
    // Primary button click effect
    if (e.target.classList.contains('btn-primary')) {
        createRippleEffect(e.target, e);
    }
    
    // Feature card click effect
    if (e.target.closest('.feature-card')) {
        const card = e.target.closest('.feature-card');
        card.style.transform = 'scale(0.98)';
        setTimeout(() => {
            card.style.transform = '';
        }, 150);
    }
});

// Ripple Effect
function createRippleEffect(button, event) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple styles
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple-animation 0.6s linear';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Tech Highlights Interaction
document.querySelectorAll('.highlight-point').forEach(point => {
    point.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2)';
        this.style.zIndex = '10';
    });
    
    point.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.zIndex = '1';
    });
    
    point.addEventListener('click', function() {
        // Add click animation
        this.style.transform = 'scale(1.5)';
        setTimeout(() => {
            this.style.transform = 'scale(1.2)';
        }, 200);
        
        // Show additional info (could be expanded)
        console.log('Tech point clicked:', this.querySelector('.point-label').textContent);
    });
});

// Mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    // Apply subtle parallax to hero elements
    const heroShoe = document.querySelector('.hero-shoe');
    if (heroShoe) {
        const moveX = (mouseX - 0.5) * 20;
        const moveY = (mouseY - 0.5) * 20;
        heroShoe.style.transform = `translate(${moveX}px, ${moveY}px) rotate(-5deg)`;
    }
    
    // Apply parallax to energy burst
    const energyBurst = document.querySelector('.energy-burst');
    if (energyBurst) {
        const moveX = (mouseX - 0.5) * 10;
        const moveY = (mouseY - 0.5) * 10;
        energyBurst.style.transform = `translate(calc(-50% + ${moveX}px), calc(-50% + ${moveY}px))`;
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // ESC key to reset animations
    if (e.key === 'Escape') {
        document.querySelectorAll('.color-option').forEach(option => {
            option.classList.remove('active');
        });
        document.querySelector('.color-option').classList.add('active');
        updateHeroShoeColor('electric-blue');
    }
    
    // Arrow keys for color navigation
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const colorOptions = document.querySelectorAll('.color-option');
        const activeIndex = Array.from(colorOptions).findIndex(option => option.classList.contains('active'));
        
        let newIndex;
        if (e.key === 'ArrowLeft') {
            newIndex = activeIndex > 0 ? activeIndex - 1 : colorOptions.length - 1;
        } else {
            newIndex = activeIndex < colorOptions.length - 1 ? activeIndex + 1 : 0;
        }
        
        colorOptions[activeIndex].classList.remove('active');
        colorOptions[newIndex].classList.add('active');
        colorOptions[newIndex].click();
    }
});

// Performance optimization
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate animations on resize
        initializeAnimations();
    }, 250);
});

// Preload images for better performance
function preloadImages() {
    const imageUrls = [
        'images/puma-snap-hero.jpg',
        'images/puma-snap-detail.jpg',
        'images/snap-blue.jpg',
        'images/snap-green.jpg',
        'images/snap-orange.jpg',
        'images/snap-black.jpg'
    ];
    
    imageUrls.forEach(url => {
        const img = new Image();
        img.src = url;
    });
}

// Initialize preloading
preloadImages();

