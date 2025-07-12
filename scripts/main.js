/**
 * Academic Research Portal - Main JavaScript
 * Professional learning record management system
 */

'use strict';

class AcademicPortal {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupThemeToggle();
        this.setupMobileMenu();
        this.setupStatisticsAnimation();
        this.setupNotesDropdown();
        this.setupScrollEffects();
        this.setupAccessibility();
        this.loadThemePreference();
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeComponents();
        });

        window.addEventListener('scroll', this.throttle(() => {
            this.handleScroll();
        }, 16));

        window.addEventListener('resize', this.debounce(() => {
            this.handleResize();
        }, 250));
    }

    /**
     * Initialize all components after DOM is loaded
     */
    initializeComponents() {
        this.animateOnScroll();
        this.setupSmoothScrolling();
        this.preloadCriticalResources();
    }

    /**
     * Theme Toggle Functionality
     */
    setupThemeToggle() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) return;

        themeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Keyboard support
        themeToggle.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    toggleTheme() {
        const html = document.documentElement;
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Update theme icon
        this.updateThemeIcon(newTheme);
        
        // Announce theme change to screen readers
        this.announceToScreenReader(`切换到${newTheme === 'dark' ? '深色' : '浅色'}模式`);
    }

    updateThemeIcon(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        if (!themeIcon) return;

        const sunIcon = `
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        `;

        const moonIcon = `
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        `;

        themeIcon.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
    }

    loadThemePreference() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (prefersDark ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', theme);
        this.updateThemeIcon(theme);
    }

    /**
     * Mobile Menu Functionality
     */
    setupMobileMenu() {
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!mobileToggle || !navLinks) return;

        mobileToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav') && navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        navLinks.classList.toggle('active');
        const isOpen = navLinks.classList.contains('active');
        
        // Update ARIA attributes
        mobileToggle.setAttribute('aria-expanded', isOpen);
        
        // Update hamburger animation
        this.animateHamburger(isOpen);
        
        // Prevent body scroll when menu is open
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    closeMobileMenu() {
        const navLinks = document.querySelector('.nav-links');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        navLinks.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        this.animateHamburger(false);
        document.body.style.overflow = '';
    }

    animateHamburger(isOpen) {
        const hamburgers = document.querySelectorAll('.hamburger');
        
        hamburgers.forEach((line, index) => {
            if (isOpen) {
                if (index === 0) line.style.transform = 'rotate(45deg) translate(5px, 5px)';
                if (index === 1) line.style.opacity = '0';
                if (index === 2) line.style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                line.style.transform = '';
                line.style.opacity = '';
            }
        });
    }

    /**
     * Statistics Counter Animation
     */
    setupStatisticsAnimation() {
        const statCards = document.querySelectorAll('.stat-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateStatNumber(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statCards.forEach(card => observer.observe(card));
    }

    animateStatNumber(card) {
        const numberElement = card.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-target')) || parseInt(numberElement.textContent);
        
        if (isNaN(target)) return;

        const duration = 2000;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * target);
            
            numberElement.textContent = current.toLocaleString();
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                numberElement.textContent = target.toLocaleString();
            }
        };
        
        requestAnimationFrame(animate);
    }

    /**
     * Notes Dropdown Functionality
     */
    setupNotesDropdown() {
        const toggleBtn = document.querySelector('.notes-toggle-btn');
        const dropdown = document.querySelector('.notes-dropdown');
        
        if (!toggleBtn || !dropdown) return;

        toggleBtn.addEventListener('click', () => {
            this.toggleNotesDropdown();
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.notes-dropdown-container') && dropdown.classList.contains('show')) {
                this.closeNotesDropdown();
            }
        });
    }

    toggleNotesDropdown() {
        const dropdown = document.querySelector('.notes-dropdown');
        const toggleBtn = document.querySelector('.notes-toggle-btn');
        
        dropdown.classList.toggle('show');
        const isOpen = dropdown.classList.contains('show');
        
        // Update button text
        toggleBtn.innerHTML = isOpen ? '收起笔记列表 ▲' : '浏览所有笔记 ▼';
        
        // Update ARIA attributes
        toggleBtn.setAttribute('aria-expanded', isOpen);
    }

    closeNotesDropdown() {
        const dropdown = document.querySelector('.notes-dropdown');
        const toggleBtn = document.querySelector('.notes-toggle-btn');
        
        dropdown.classList.remove('show');
        toggleBtn.innerHTML = '浏览所有笔记 ▼';
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    /**
     * Scroll Effects
     */
    setupScrollEffects() {
        this.setupBackToTop();
        this.setupHeaderScrollEffect();
    }

    setupBackToTop() {
        const backToTop = document.querySelector('.back-to-top');
        if (!backToTop) return;

        backToTop.addEventListener('click', () => {
            this.scrollToTop();
        });
    }

    setupHeaderScrollEffect() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            if (currentScrollY > 100) {
                header.style.backdropFilter = 'blur(20px)';
                header.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))';
            } else {
                header.style.backdropFilter = 'blur(10px)';
            }
            
            lastScrollY = currentScrollY;
        });
    }

    handleScroll() {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.scrollY > 300) {
                backToTop.style.opacity = '1';
                backToTop.style.transform = 'translateY(0)';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.transform = 'translateY(10px)';
            }
        }
    }

    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
    }

    /**
     * Smooth Scrolling
     */
    setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
        const ctaButtons = document.querySelectorAll('.cta-button[href^="#"]');
        
        [...navLinks, ...ctaButtons].forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    this.smoothScrollTo(targetElement);
                    this.closeMobileMenu(); // Close mobile menu if open
                }
            });
        });
    }

    smoothScrollTo(element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Animate elements on scroll
     */
    animateOnScroll() {
        const animatedElements = document.querySelectorAll('.stat-card, .paper-card, .category-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(element);
        });
    }

    /**
     * Accessibility Enhancements
     */
    setupAccessibility() {
        this.setupKeyboardNavigation();
        this.setupSkipLinks();
        this.setupFocusManagement();
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard navigation for interactive elements
        const interactiveElements = document.querySelectorAll('button, a, [tabindex]');
        
        interactiveElements.forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    if (element.tagName === 'BUTTON') {
                        e.preventDefault();
                        element.click();
                    }
                }
            });
        });
    }

    setupSkipLinks() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = '跳转到主要内容';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: var(--color-primary);
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 9999;
            transition: top 0.3s;
        `;
        
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    setupFocusManagement() {
        // Trap focus in mobile menu when open
        const navLinks = document.querySelector('.nav-links');
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab' && navLinks.classList.contains('active')) {
                const focusableElements = navLinks.querySelectorAll('a, button');
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];
                
                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        });
    }

    /**
     * Performance optimization helpers
     */
    preloadCriticalResources() {
        // Preload critical fonts
        const fontLink = document.createElement('link');
        fontLink.rel = 'preload';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap';
        fontLink.as = 'style';
        fontLink.onload = function() { this.rel = 'stylesheet'; };
        document.head.appendChild(fontLink);
    }

    /**
     * Utility functions
     */
    throttle(func, limit) {
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

    debounce(func, wait) {
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

    announceToScreenReader(message) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.style.cssText = `
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        `;
        announcement.textContent = message;
        
        document.body.appendChild(announcement);
        setTimeout(() => document.body.removeChild(announcement), 1000);
    }
}

// Global function for back to top (called from HTML)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Global function for notes dropdown toggle (called from HTML)
function toggleNotesDropdown() {
    const dropdown = document.querySelector('.notes-dropdown');
    const toggleBtn = document.querySelector('.notes-toggle-btn');
    
    if (dropdown && toggleBtn) {
        dropdown.classList.toggle('show');
        const isOpen = dropdown.classList.contains('show');
        toggleBtn.innerHTML = isOpen ? '收起笔记列表 ▲' : '浏览所有笔记 ▼';
        toggleBtn.setAttribute('aria-expanded', isOpen);
    }
}

// Initialize the portal when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new AcademicPortal());
} else {
    new AcademicPortal();
}

// Error handling
window.addEventListener('error', (e) => {
    console.error('Academic Portal Error:', e.error);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AcademicPortal;
}