// Aurora Effects for Avail Wellness Website
class AuroraEffects {
    constructor() {
        this.init();
        this.setupScrollEffects();
        this.setupHoverEffects();
        this.setupCounterAnimations();
    }

    init() {
        // Add aurora particles to hero section
        this.createAuroraParticles();
        
        // Initialize intersection observer for animations
        this.setupIntersectionObserver();
    }

    createAuroraParticles() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;

        const particleContainer = document.createElement('div');
        particleContainer.className = 'aurora-particles';
        particleContainer.innerHTML = `
            <div class="particle particle-1"></div>
            <div class="particle particle-2"></div>
            <div class="particle particle-3"></div>
            <div class="particle particle-4"></div>
            <div class="particle particle-5"></div>
        `;
        
        heroSection.appendChild(particleContainer);

        // Add particle styles
        const particleStyles = `
            .aurora-particles {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                pointer-events: none;
                overflow: hidden;
                z-index: -1;
            }

            .particle {
                position: absolute;
                border-radius: 50%;
                background: radial-gradient(circle, rgba(107, 142, 90, 0.4) 0%, transparent 70%);
                animation-timing-function: ease-in-out;
                animation-iteration-count: infinite;
                animation-direction: alternate;
            }

            .particle-1 {
                width: 120px;
                height: 120px;
                top: 10%;
                left: 20%;
                animation: float1 6s;
                animation-delay: 0s;
            }

            .particle-2 {
                width: 80px;
                height: 80px;
                top: 60%;
                right: 15%;
                animation: float2 8s;
                animation-delay: 1s;
                background: radial-gradient(circle, rgba(143, 166, 142, 0.3) 0%, transparent 70%);
            }

            .particle-3 {
                width: 100px;
                height: 100px;
                bottom: 20%;
                left: 10%;
                animation: float3 7s;
                animation-delay: 2s;
            }

            .particle-4 {
                width: 60px;
                height: 60px;
                top: 30%;
                right: 40%;
                animation: float4 5s;
                animation-delay: 0.5s;
                background: radial-gradient(circle, rgba(184, 160, 130, 0.3) 0%, transparent 70%);
            }

            .particle-5 {
                width: 90px;
                height: 90px;
                bottom: 40%;
                right: 60%;
                animation: float5 9s;
                animation-delay: 1.5s;
            }

            @keyframes float1 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(30px, -20px) scale(1.1); }
            }

            @keyframes float2 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-25px, 35px) scale(0.9); }
            }

            @keyframes float3 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(40px, -15px) scale(1.2); }
            }

            @keyframes float4 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-20px, 25px) scale(0.8); }
            }

            @keyframes float5 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(15px, -30px) scale(1.1); }
            }

            @media (prefers-reduced-motion: reduce) {
                .particle {
                    animation: none;
                    opacity: 0.2;
                }
            }
        `;

        // Inject styles
        const style = document.createElement('style');
        style.textContent = particleStyles;
        document.head.appendChild(style);
    }

    setupIntersectionObserver() {
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

        // Observe elements for animation
        document.querySelectorAll('.feature-card, .metric-card, .card').forEach(el => {
            observer.observe(el);
        });

        // Add animation styles
        const animationStyles = `
            .feature-card,
            .metric-card,
            .card {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }

            .feature-card.animate-in,
            .metric-card.animate-in,
            .card.animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .feature-card:nth-child(1) { transition-delay: 0.1s; }
            .feature-card:nth-child(2) { transition-delay: 0.2s; }
            .feature-card:nth-child(3) { transition-delay: 0.3s; }
            .feature-card:nth-child(4) { transition-delay: 0.4s; }

            .metric-card:nth-child(1) { transition-delay: 0.1s; }
            .metric-card:nth-child(2) { transition-delay: 0.2s; }
            .metric-card:nth-child(3) { transition-delay: 0.3s; }
            .metric-card:nth-child(4) { transition-delay: 0.4s; }
        `;

        const style = document.createElement('style');
        style.textContent = animationStyles;
        document.head.appendChild(style);
    }

    setupScrollEffects() {
        // Parallax effect for aurora background
        let ticking = false;
        
        const updateScrollEffects = () => {
            const scrollY = window.pageYOffset;
            const auroraLayers = document.querySelectorAll('.aurora-layer');
            
            auroraLayers.forEach((layer, index) => {
                const speed = 0.5 + (index * 0.1);
                layer.style.transform = `translateY(${scrollY * speed}px)`;
            });
            
            ticking = false;
        };

        const requestScrollUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollEffects);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    }

    setupHoverEffects() {
        // Enhanced hover effects for cards
        document.querySelectorAll('.feature-card, .metric-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.createHoverParticles(card);
            });

            card.addEventListener('mousemove', (e) => {
                this.updateHoverEffect(card, e);
            });

            card.addEventListener('mouseleave', () => {
                this.removeHoverParticles(card);
            });
        });

        // Aurora button effects
        document.querySelectorAll('.aurora-btn').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                this.createButtonGlow(btn);
            });

            btn.addEventListener('mouseleave', () => {
                this.removeButtonGlow(btn);
            });
        });
    }

    createHoverParticles(element) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: absolute;
            top: 20%;
            right: 20%;
            width: 6px;
            height: 6px;
            background: radial-gradient(circle, rgba(107, 142, 90, 0.6) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            animation: hover-float 2s ease-in-out infinite;
        `;

        const hoverStyles = `
            @keyframes hover-float {
                0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
                50% { transform: translate(10px, -10px) scale(1.5); opacity: 1; }
            }
        `;

        if (!document.querySelector('#hover-styles')) {
            const style = document.createElement('style');
            style.id = 'hover-styles';
            style.textContent = hoverStyles;
            document.head.appendChild(style);
        }

        element.style.position = 'relative';
        element.appendChild(particle);
        
        setTimeout(() => particle.remove(), 2000);
    }

    updateHoverEffect(element, e) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        element.style.transform = `
            perspective(1000px) 
            rotateY(${deltaX * 5}deg) 
            rotateX(${-deltaY * 5}deg) 
            translateY(-8px)
        `;
    }

    removeHoverParticles(element) {
        element.style.transform = '';
        const particles = element.querySelectorAll('.hover-particle');
        particles.forEach(particle => particle.remove());
    }

    createButtonGlow(button) {
        button.style.boxShadow = '0 0 20px rgba(107, 142, 90, 0.4)';
    }

    removeButtonGlow(button) {
        button.style.boxShadow = '';
    }

    setupCounterAnimations() {
        const counterElements = document.querySelectorAll('.metric-number');
        
        const animateCounter = (element) => {
            const target = parseInt(element.textContent.replace(/[^\d]/g, ''));
            let current = 0;
            const increment = target / 60; // 1 second animation at 60fps
            const suffix = element.textContent.replace(/[\d]/g, '').trim();
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    element.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + suffix;
                }
            };
            
            updateCounter();
        };

        // Intersection observer for counters
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.animated) {
                    entry.target.dataset.animated = 'true';
                    animateCounter(entry.target);
                }
            });
        }, { threshold: 0.5 });

        counterElements.forEach(el => counterObserver.observe(el));
    }
}

// Initialize aurora effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        new AuroraEffects();
    }
});

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuroraEffects;
}