


// =======================
// VANTA BACKGROUND
// =======================

let vantaEffect = null;

function initVanta() {
    if (vantaEffect) vantaEffect.destroy();

    vantaEffect = VANTA.NET({
        el: "#vanta-background",
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 0.7,

        color: 0x8b5cf6, // professional purple
        backgroundColor: document.body.classList.contains('light-theme') ? 0xffffff : 0x000000,

        points: 8,
        maxDistance: 20,
        spacing: 18,
        showDots: true
    });
}

// Wait until page fully loads
window.addEventListener("load", () => {
    initVanta();
});


// =======================
// THEME TOGGLE
// =======================

const themeToggle = document.querySelector('.theme-toggle');
const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');

        if (themeIcon) {
            themeIcon.classList.toggle('fa-moon');
            themeIcon.classList.toggle('fa-sun');
        }

        initVanta(); // reload background with new color
    });
}


// =======================
// SIDE MENU TOGGLE
// =======================

const menuToggle = document.getElementById('menuToggle');
const sideMenu = document.getElementById('sideMenu');

if (menuToggle && sideMenu) {
    menuToggle.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
        menuToggle.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
        if (!sideMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            sideMenu.classList.remove('open');
        }
    });
}


// =======================
// SMOOTH SCROLL
// =======================

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


// =======================
// SCROLL ANIMATIONS
// =======================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// observe sections
document.querySelectorAll('section').forEach(section => observer.observe(section));

// observe project cards
document.querySelectorAll('.project-card').forEach(card => observer.observe(card));

// observe animated blocks
document.querySelectorAll('.skills-category, .timeline-card, .education-card, .volunteering-card')
.forEach(el => observer.observe(el));


// =======================
// SKILL PROGRESS BARS
// =======================

const skillBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.transform =
                `scaleX(${entry.target.parentElement.dataset.progress || 1})`;
        }
    });
}, observerOptions);

skillBars.forEach(bar => skillObserver.observe(bar));


// =======================
// TAG HOVER EFFECTS
// =======================

// project tech tags
document.querySelectorAll('.project-tech span').forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'translateY(-2px)';
    });
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'translateY(0)';
    });
});

// all tags
document.querySelectorAll('.education-details span, .volunteering-tags span')
.forEach(tag => {
    tag.addEventListener('mouseover', () => {
        tag.style.transform = 'translateY(-2px)';
    });
    tag.addEventListener('mouseout', () => {
        tag.style.transform = 'translateY(0)';
    });
});


// =======================
// BUTTON RIPPLE EFFECT
// =======================

document.querySelectorAll('button, .download-resume').forEach(button => {
    button.addEventListener('mouseenter', (e) => {
        const x = e.clientX - e.target.offsetLeft;
        const y = e.clientY - e.target.offsetTop;

        const ripple = document.createElement('span');
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        e.target.appendChild(ripple);

        setTimeout(() => ripple.remove(), 1000);
    });
});


// =======================
// FLOATING HOME BUTTON
// =======================

const floatingHome = document.querySelector('.floating-home');

if (floatingHome) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            floatingHome.classList.add('visible');
        } else {
            floatingHome.classList.remove('visible');
        }
    });

    floatingHome.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
