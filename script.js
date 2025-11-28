// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ============================================
// WAITLIST FORM
// ============================================
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz3Uehjn3xMa37_kbZnxwHv51iGrT557BrIeRQFg5k5v2AHp6YHNtB8QaF1OXa19a1y/exec';

document.getElementById('waitlist-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const message = document.getElementById('form-message');
    const button = e.target.querySelector('button');

    button.disabled = true;
    button.textContent = 'Joining...';

    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('timestamp', new Date().toISOString());

        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        });

        message.textContent = "You're on the list! We'll be in touch soon.";
        message.className = 'mt-4 text-sm text-green-400';
        document.getElementById('email').value = '';
    } catch (error) {
        message.textContent = 'Something went wrong. Please try again.';
        message.className = 'mt-4 text-sm text-red-400';
    }

    button.disabled = false;
    button.textContent = 'Join Waitlist';
});
