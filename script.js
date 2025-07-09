// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuBtn.addEventListener('click', function () {
        mobileMenu.classList.toggle('active');

        // Animate hamburger icon
        const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
        hamburgers.forEach(bar => bar.classList.toggle('active'));
    });

    // Close mobile menu when clicking on links
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenu.classList.remove('active');
            const hamburgers = mobileMenuBtn.querySelectorAll('.hamburger');
            hamburgers.forEach(bar => bar.classList.remove('active'));
        });
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const navHeight = document.querySelector('.nav').offsetHeight;

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentSection}` || (currentSection === '' && href === '#home')) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('load', updateActiveNavLink);

// FAQ Toggle Functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function () {
        const faqItem = this.closest('.faq-item');
        const answer = faqItem.querySelector('.faq-answer');
        const icon = this.querySelector('.faq-icon');

        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.querySelector('.faq-answer').classList.remove('active');
                item.querySelector('.faq-icon').classList.remove('rotated');
            }
        });

        // Toggle current FAQ item
        answer.classList.toggle('active');
        icon.classList.toggle('rotated');
    });
});

// Contact Form Handling
document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        message: formData.get('message')
    };

    // Validate form
    if (validateForm(data)) {
        submitForm(data);
    }
});

function validateForm(data) {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(error => {
        error.classList.remove('show');
    });

    // Validate name
    if (!data.name || data.name.trim().length < 2) {
        showError('name-error', 'Name must be at least 2 characters long');
        isValid = false;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        showError('email-error', 'Please enter a valid email address');
        isValid = false;
    }

    // Validate phone
    if (!data.phone || data.phone.trim().length < 10) {
        showError('phone-error', 'Please enter a valid phone number');
        isValid = false;
    }

    // Validate message
    if (!data.message || data.message.trim().length < 10) {
        showError('message-error', 'Message must be at least 10 characters long');
        isValid = false;
    }

    return isValid;
}

function showError(errorId, message) {
    const errorElement = document.getElementById(errorId);
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function submitForm(data) {
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate form submission (replace with actual API call)
    // Since this is a static HTML version, we'll show a success message
    setTimeout(() => {
        showToast('Message sent successfully! We will get back to you soon.', 'success');
        document.getElementById('contact-form').reset();

        // Reset button
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 1500);

    // In a real implementation, you would make an API call like this:
    /*
    fetch('/api/contact', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            showToast('Message sent successfully! We will get back to you soon.', 'success');
            document.getElementById('contact-form').reset();
        } else {
            showToast('Error sending message. Please try again later.', 'error');
        }
    })
    .catch(error => {
        showToast('Error sending message. Please try again later.', 'error');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
    */
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast ${type}`;
    toast.classList.add('show');

    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
}

// Intersection Observer for Animations (Optional Enhancement)
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

// Observe elements for fade-in animation
document.addEventListener('DOMContentLoaded', function () {
    const animateElements = document.querySelectorAll('.card, .feature, .service-card, .client-type');

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Phone number formatting (optional enhancement)
document.getElementById('phone').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 10) {
        value = value.slice(0, 10);
    }
    e.target.value = value;
});

// Email validation on blur
document.getElementById('email').addEventListener('blur', function (e) {
    const email = e.target.value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const errorElement = document.getElementById('email-error');

    if (email && !emailRegex.test(email)) {
        showError('email-error', 'Please enter a valid email address');
    } else {
        errorElement.classList.remove('show');
    }
});

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        if (this.type !== 'submit') {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        }
    });
});

// Lazy loading for background images (performance optimization)
const heroSection = document.querySelector('.hero');
if (heroSection) {
    const img = new Image();
    img.onload = function () {
        heroSection.style.backgroundImage = `url(${this.src})`;
    };
}

// Keyboard navigation for FAQ
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Set current year in footer if needed
const currentYear = new Date().getFullYear();
const footerText = document.querySelector('.footer-bottom p');
if (footerText && currentYear > 2025) {
    footerText.textContent = footerText.textContent.replace('2025', currentYear);
}

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        message: document.getElementById("message").value.trim()
    };

    fetch("https://script.google.com/macros/s/AKfycbwPDxumzsRXqU6bIldoudG_WCPz6j1ioSsirIx3Uy1l6xri63Ye-V4M7v_oYx9jp4F0/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    }).then(() => {
        alert("Your message has been sent!");
        document.getElementById("contact-form").reset();
    }).catch((error) => {
        alert("There was an error submitting the form.");
        console.error(error);
    });
});