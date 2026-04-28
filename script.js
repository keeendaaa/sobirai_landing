// FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});

// Smooth scroll for navigation links
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

// Contact form handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const data = {
            name: this.querySelector('input[type="text"]').value,
            contact: this.querySelector('input[type="tel"]').value,
            comment: this.querySelector('textarea').value
        };
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
        
        // Reset form
        this.reset();
    });
}

// Footer email form handling
const footerInput = document.querySelector('.footer-input');
const footerButton = document.querySelector('.footer-cta .btn-primary');

if (footerInput && footerButton) {
    footerButton.addEventListener('click', function(e) {
        e.preventDefault();
        const email = footerInput.value;
        
        if (email && email.includes('@')) {
            console.log('Email submitted:', email);
            alert('Спасибо! Мы отправим вам информацию о тестировании.');
            footerInput.value = '';
        } else {
            alert('Пожалуйста, введите корректный email адрес.');
        }
    });
}

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Partners carousel auto-scroll (optional)
const partnersCarousel = document.querySelector('.partners-carousel');
if (partnersCarousel) {
    let scrollPosition = 0;
    const scrollSpeed = 1;
    
    function autoScroll() {
        scrollPosition += scrollSpeed;
        partnersCarousel.scrollLeft = scrollPosition;
        
        // Reset scroll position when reaching the end
        if (scrollPosition >= partnersCarousel.scrollWidth - partnersCarousel.clientWidth) {
            scrollPosition = 0;
        }
    }
    
    // Pause auto-scroll on hover
    partnersCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoScrollInterval);
    });
    
    partnersCarousel.addEventListener('mouseleave', () => {
        autoScrollInterval = setInterval(autoScroll, 20);
    });
    
    // Start auto-scroll (uncomment if needed)
    // const autoScrollInterval = setInterval(autoScroll, 20);
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections for animation
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Mobile menu toggle
const navMenu = document.querySelector('.nav-menu');
const nav = document.querySelector('.nav');

// Add mobile menu button if screen is small
function addMobileMenu() {
    if (window.innerWidth <= 768 && !document.querySelector('.mobile-menu-toggle')) {
        const menuToggle = document.createElement('button');
        menuToggle.className = 'mobile-menu-toggle';
        menuToggle.innerHTML = '☰';
        menuToggle.setAttribute('aria-label', 'Toggle menu');
        menuToggle.style.cssText = 'display: block; background: none; border: none; font-size: 24px; cursor: pointer; padding: 5px;';
        
        nav.appendChild(menuToggle);
        
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
        });
    } else if (window.innerWidth > 768) {
        const menuToggle = document.querySelector('.mobile-menu-toggle');
        if (menuToggle) {
            menuToggle.remove();
        }
        if (navMenu) {
            navMenu.classList.remove('active');
            navMenu.style.display = 'flex';
        }
    }
}

window.addEventListener('resize', addMobileMenu);
addMobileMenu();

// Button click handlers
document.querySelectorAll('.btn-primary, .btn-contact').forEach(button => {
    if (button.textContent.includes('Протестировать') || button.textContent.includes('Связаться')) {
        button.addEventListener('click', function(e) {
            // Scroll to contact form
            const contactSection = document.querySelector('.contact-form-section');
            if (contactSection) {
                e.preventDefault();
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
