// Utility to load HTML components dynamically
async function loadComponents() {
    // Find all elements with a 'data-include' attribute
    const elements = document.querySelectorAll('[data-include]');
    
    // Create an array of Promises so we can load them sequentially or parallel 
    // Here we use a for loop to load them in order so the DOM structure remains correct
    for (const el of elements) {
        const url = el.getAttribute('data-include');
        try {
            const response = await fetch(url);
            if (response.ok) {
                const html = await response.text();
                el.innerHTML = html;
            } else {
                console.error(`Error loading component from ${url}: ${response.status}`);
            }
        } catch (error) {
            console.error(`Failed to load ${url}`, error);
        }
    }
    
    // Initialize animations after all components are loaded
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
