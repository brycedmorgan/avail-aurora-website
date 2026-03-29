// Navigation functionality for Avail Wellness
class Navigation {
    constructor() {
        this.nav = document.querySelector('.main-nav');
        this.mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        this.navMenu = document.querySelector('.nav-menu');
        this.dropdowns = document.querySelectorAll('.nav-dropdown');
        
        this.init();
    }

    init() {
        this.setupScrollEffects();
        this.setupMobileMenu();
        this.setupDropdowns();
        this.setupActiveStates();
        this.setupSmoothScroll();
    }

    setupScrollEffects() {
        let lastScrollY = 0;
        let ticking = false;

        const updateNavigation = () => {
            const scrollY = window.pageYOffset;
            
            // Add/remove scrolled class for styling
            if (scrollY > 100) {
                this.nav.classList.add('scrolled');
            } else {
                this.nav.classList.remove('scrolled');
            }

            // Hide/show navigation on scroll
            if (scrollY > lastScrollY && scrollY > 200) {
                this.nav.classList.add('nav-hidden');
            } else {
                this.nav.classList.remove('nav-hidden');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavigation);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });

        // Add scroll styles
        const scrollStyles = `
            .main-nav {
                transform: translateY(0);
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .main-nav.scrolled {
                background: rgba(255, 255, 255, 0.98);
                backdrop-filter: blur(20px);
                box-shadow: 0 2px 20px rgba(45, 90, 52, 0.1);
            }

            .main-nav.nav-hidden {
                transform: translateY(-100%);
            }

            @media (max-width: 768px) {
                .main-nav.nav-hidden {
                    transform: translateY(0);
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = scrollStyles;
        document.head.appendChild(style);
    }

    setupMobileMenu() {
        if (!this.mobileMenuBtn || !this.navMenu) return;

        this.mobileMenuBtn.addEventListener('click', () => {
            this.toggleMobileMenu();
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.nav.contains(e.target) && this.navMenu.classList.contains('mobile-open')) {
                this.closeMobileMenu();
            }
        });

        // Close mobile menu on window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });

        // Add mobile menu styles
        const mobileStyles = `
            @media (max-width: 768px) {
                .nav-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: rgba(255, 255, 255, 0.98);
                    backdrop-filter: blur(20px);
                    border-top: 1px solid rgba(107, 142, 90, 0.1);
                    padding: 1rem;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-10px);
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 1000;
                    box-shadow: 0 4px 20px rgba(45, 90, 52, 0.1);
                    border-radius: 0 0 16px 16px;
                }

                .nav-menu.mobile-open {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0);
                }

                .nav-menu {
                    flex-direction: column;
                    gap: 0.5rem;
                    align-items: stretch;
                }

                .nav-link {
                    padding: 0.75rem 1rem;
                    border-radius: 8px;
                    display: block;
                    text-align: center;
                }

                .nav-dropdown {
                    position: relative;
                }

                .dropdown-menu {
                    position: static;
                    opacity: 1;
                    visibility: visible;
                    transform: none;
                    box-shadow: none;
                    background: rgba(107, 142, 90, 0.05);
                    border: 1px solid rgba(107, 142, 90, 0.1);
                    margin-top: 0.5rem;
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease;
                }

                .nav-dropdown:hover .dropdown-menu,
                .nav-dropdown.mobile-open .dropdown-menu {
                    max-height: 300px;
                }

                .dropdown-link {
                    padding: 0.5rem 1rem;
                    font-size: 0.9rem;
                }

                .mobile-menu-btn {
                    display: flex;
                }

                .mobile-menu-btn.active .hamburger-line:nth-child(1) {
                    transform: rotate(45deg) translate(6px, 6px);
                }

                .mobile-menu-btn.active .hamburger-line:nth-child(2) {
                    opacity: 0;
                }

                .mobile-menu-btn.active .hamburger-line:nth-child(3) {
                    transform: rotate(-45deg) translate(6px, -6px);
                }

                .nav-cta {
                    margin-top: 1rem;
                    padding-top: 1rem;
                    border-top: 1px solid rgba(107, 142, 90, 0.1);
                    justify-content: center;
                }
            }
        `;

        const style = document.createElement('style');
        style.textContent = mobileStyles;
        document.head.appendChild(style);
    }

    toggleMobileMenu() {
        this.navMenu.classList.toggle('mobile-open');
        this.mobileMenuBtn.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('mobile-open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMobileMenu() {
        this.navMenu.classList.remove('mobile-open');
        this.mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }

    setupDropdowns() {
        if (window.innerWidth <= 768) {
            // Mobile dropdown behavior
            this.dropdowns.forEach(dropdown => {
                const link = dropdown.querySelector('.nav-link');
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    dropdown.classList.toggle('mobile-open');
                });
            });
        } else {
            // Desktop hover behavior
            this.dropdowns.forEach(dropdown => {
                let hoverTimeout;

                dropdown.addEventListener('mouseenter', () => {
                    clearTimeout(hoverTimeout);
                    dropdown.classList.add('hover');
                });

                dropdown.addEventListener('mouseleave', () => {
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.remove('hover');
                    }, 100);
                });
            });
        }
    }

    setupActiveStates() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath || (currentPath !== '/' && linkPath !== '/' && currentPath.startsWith(linkPath))) {
                link.classList.add('active');
            }
        });
    }

    setupSmoothScroll() {
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - 80; // Account for fixed nav

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    if (window.innerWidth <= 768) {
                        setTimeout(() => {
                            document.querySelector('.main-nav').closeMobileMenu();
                        }, 100);
                    }
                }
            });
        });
    }

    // Public method to close mobile menu (for external use)
    static closeMobileMenu() {
        const nav = document.querySelector('.main-nav');
        const navMenu = nav.querySelector('.nav-menu');
        const mobileMenuBtn = nav.querySelector('.mobile-menu-btn');
        
        navMenu.classList.remove('mobile-open');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Navigation;
}