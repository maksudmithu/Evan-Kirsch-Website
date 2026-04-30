// Utility to load HTML components dynamically
async function loadComponents() {
    const components = [
        { id: 'navbar-container', url: '/components/navbar.html' },
        { id: 'hero-container', url: '/components/hero.html' },
        { id: 'about-container', url: '/components/about.html' },
        { id: 'services-container', url: '/components/services.html' },
        { id: 'authority-container', url: '/components/authority.html' },
        { id: 'lead-magnet-container', url: '/components/lead-magnet.html' },
        { id: 'testimonials-container', url: '/components/testimonials.html' },
        { id: 'cta-container', url: '/components/cta.html' },
        { id: 'contact-container', url: '/components/contact.html' },
        { id: 'footer-container', url: '/components/footer.html' }
    ];

    for (const comp of components) {
        try {
            const response = await fetch(comp.url);
            if (response.ok) {
                const html = await response.text();
                const container = document.getElementById(comp.id);
                if (container) {
                    container.innerHTML = html;
                }
            } else {
                console.error(`Error loading component from ${comp.url}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to load ${comp.url}`, error);
        }
    }
    
    // Initialize animations after components are loaded
    initAnimations();
    initSmoothScrolling();
    initScrollToTop();
}

function initScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('show');
            } else {
                scrollToTopBtn.classList.remove('show');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Close the mobile navbar if it's open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                // Smooth scroll to the target
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Apply observation to elements marked for animation
    const animatedElements = document.querySelectorAll('.animate-fade-up');
    animatedElements.forEach(el => scrollObserver.observe(el));
}

// Load components on DOM ready
document.addEventListener('DOMContentLoaded', loadComponents);
