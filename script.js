const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const reveals = document.querySelectorAll('.reveal');
        
const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const revealPoint = 100;
        
        if (elementTop < windowHeight - revealPoint) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

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