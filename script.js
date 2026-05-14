// Ganti semua isi script.js dengan yang ini biar otomatis biru
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.id = 'canvas';
document.body.appendChild(canvas);

let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}
window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
        this.color = Math.random() > 0.5 ? '255, 255, 255' : '200, 200, 200';
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.fill();
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if(this.x < 0 || this.x > width) this.vx *= -1;
        if(this.y < 0 || this.y > height) this.vy *= -1;
    }
}

for(let i = 0; i < 120; i++){
    particles.push(new Particle());
}

function animateParticles(){
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateParticles);
}
animateParticles();

// --- SISANYA KODE YANG LAIN TETEP SAMA ---
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add('show');
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.work-card, .tentang-wrapper, .cert-item');
hiddenElements.forEach(el => {
    el.classList.add('hide');
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50){
        navbar.style.background = 'rgba(3, 7, 18, 0.95)';
    } else {
        navbar.style.background = 'rgba(3, 7, 18, 0.9)';
    }
});

const texts = ['UI/UX Designer', 'Graphic Designer', 'Admin', 'Customer Service', 'Pretty Girl🫰🏻'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

(function type(){
    if(count === texts.length){
        count = 0;
    }
    currentText = texts[count];
    letter = currentText.slice(0, ++index);

    document.querySelector('.typing-text').textContent = letter;
    if(letter.length === currentText.length){
        count++;
        index = 0;
        setTimeout(type, 2000);
    } else {
        setTimeout(type, 100);
    }
})();