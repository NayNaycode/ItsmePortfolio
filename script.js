// ===== BAGIAN: ANIMASI PARTIKEL LATAR BELAKANG =====
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

// ===== BAGIAN: MENU TOGGLE (UNTUK HP) =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-times');
    icon.classList.toggle('fa-bars');
});

// ===== BAGIAN: ANIMASI SCROLL MUNCUL =====
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

// ===== BAGIAN: EFEK SCROLL PADA NAVBAR =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if(window.scrollY > 50){
        navbar.style.background = 'rgba(3, 7, 18, 0.95)';
    } else {
        navbar.style.background = 'rgba(3, 7, 18, 0.9)';
    }
});

// ===== BAGIAN: TEKS BERJALAN (TYPING EFFECT) =====
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

// ==================================================
// ✨ PERBAIKAN AKHIR: FITUR GANTI BAHASA ✨
// ==================================================

// 1. DATA TERJEMAHAN (LENGKAP & BENER)
const translations = {
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang Saya",
        nav_portfolio: "Portofolio",
        nav_certificates: "Sertifikat",
        nav_contact: "Kontak",
        hero_greeting: "Halo, Saya <span class='highlight'>Sri Mulyani</span>",
        hero_intro: "Saya Seorang",
        skills_title: "Keahlian & Alat",
        about_title: "Tentang <span>Saya</span>",
        about_p1: "Saya merupakan lulusan Teknik Informatika dari Institut Teknologi Indonesia dengan IPK 3,54. Selama perkuliahan, saya aktif mengembangkan kemampuan melalui berbagai proyek, termasuk pengembangan web untuk Dinas Kepariwisataan sebagai tugas akhir. Saya memiliki keterampilan dalam desain UI/UX, pengolahan data, serta pengelolaan administrasi dan dokumen. Selain itu, saya juga terbiasa bekerja secara terstruktur dan detail, serta memiliki kemampuan problem solving, manajemen waktu, dan komunikasi yang baik. Saya adalah pribadi yang disiplin, teliti, adaptif, serta mampu bekerja secara mandiri maupun dalam tim untuk memberikan kontribusi secara profesional di dunia kerja.",
        about_p2: "Saya selalu ingin belajar hal baru dan siap bekerja sama untuk menyelesaikan project-project yang menantang. Fokus saya adalah menciptakan solusi digital yang efektif dan estetik.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",
        portfolio_title: "Hasil <span>Karya</span>",
        proj1_desc: "Desain Aplikasi Platform",
        proj2_desc: "Desain Aplikasi Tudo List",
        proj3_desc: "Desain Aplikasi Platform Kursus",
        proj4_desc: "Desain Aplikasi Top Up Game",
        proj5_desc: "Desain Aplikasi E-commerce Kopi",
        proj6_desc: "Desain Tampilan Web",
        proj7_desc: "Poster promosi aplikasi",
        proj8_desc: "Konsep perancangan aplikasi",
        proj9_title: "Flyer Makanan",
        proj9_desc: "Promosi produk kuliner",
        proj10_title: "Design Web SPARRING",
        proj10_desc: "Design yang dibuat untuk tes UI/UX di Suitmedia Digital Agensi",
        proj11_title: "UI/UX Design Dental",
        proj11_desc: "Design untuk aplikasi desain gigi Digi Dental Klinik",
        proj12_title: "Poster Promosi Parfume",
        proj12_desc: "Design yang saya buat pada saat melakukan tes untuk promosi parfume dari brand lokal good perfume studio dari PT Berseri Lewat Aroma",
        cert_title: "Sertifikat",
        cert_graphic: "Desain Grafis",
        cert_datascience: "Ilmu Data",
        contact_title: "Hubungi <span>Saya</span>",
        footer_text: "Terbuka Untuk Bekerja"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_portfolio: "Portfolio",
        nav_certificates: "Certificates",
        nav_contact: "Contact",
        hero_greeting: "Hello, I'm <span class='highlight'>Sri Mulyani</span>",
        hero_intro: "I am a",
        skills_title: "Skills & Tools",
        about_title: "About <span>Me</span>",
        about_p1: "I am a graduate of Informatics Engineering from the Institut Teknologi Indonesia with a GPA of 3.54. During my studies, I actively developed my skills through various projects, including web development for the Department of Tourism as my final project. I have skills in UI/UX design, data processing, as well as administrative and document management. In addition, I am used to working in a structured and detailed manner, and have good problem-solving, time management, and communication skills. I am a disciplined, thorough, adaptive person, and able to work independently or in a team to contribute professionally in the workplace.",
        about_p2: "I am always eager to learn new things and ready to collaborate on challenging projects. My focus is on creating effective and aesthetic digital solutions.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",
        portfolio_title: "My <span>Works</span>",
        proj1_desc: "Platform App Design",
        proj2_desc: "To Do List App Design",
        proj3_desc: "Course Platform App Design",
        proj4_desc: "Game Top Up App Design",
        proj5_desc: "Coffee E-commerce App Design",
        proj6_desc: "Website Design",
        proj7_desc: "App promotion poster",
        proj8_desc: "Application design concept",
        proj9_title: "Food Flyer",
        proj9_desc: "Culinary product promotion",
        proj10_title: "SPARRING Web Design",
        proj10_desc: "Design created for UI/UX test at Suitmedia Digital Agency",
        proj11_title: "Dental UI/UX Design",
        proj11_desc: "Design for Digi Dental Klinik dental design application",
        proj12_title: "Perfume Promotion Poster",
        proj12_desc: "Design I created during a test for promoting perfume from the local brand Good Perfume Studio by PT Berseri Lewat Aroma",
        cert_title: "Certificates",
        cert_graphic: "Graphic Design",
        cert_datascience: "Data Science",
        contact_title: "Contact <span>Me</span>",
        footer_text: "Open To Work"
    }
};

// 2. FUNGSI GANTI BAHASA (DIPERBAIKI TOTAL)
function changeLanguage(lang) {
    // Simpan pilihan
    localStorage.setItem('selectedLang', lang);

    // Ubah SEMUA teks yang punya atribut data-i18n
    document.querySelectorAll('[data-i18n]').forEach(elemen => {
        const key = elemen.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            elemen.innerHTML = translations[lang][key];
        }
    });

    // Ubah status tombol aktif
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    // Ubah kode bahasa di halaman
    document.documentElement.lang = lang;
}

// 3. PASANG EVENT KLIK KE TOMBOL
document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Ambil kode bahasa dari tombol yang diklik
        const bahasa = this.getAttribute('data-lang');
        // Panggil fungsi ganti bahasa
        changeLanguage(bahasa);
    });
});

// 4. JALANKAN SAAT HALAMAN DIBUKA
window.addEventListener('load', function() {
    // Ambil bahasa yang disimpan, kalau tidak ada pakai 'id'
    const bahasaAwal = localStorage.getItem('selectedLang') || 'id';
    // Terapkan bahasanya
    changeLanguage(bahasaAwal);
});

// =========================
// PROJECT IMAGE MODAL
// =========================

function openProject(imageSrc) {
    const modal = document.getElementById("projectModal");
    const image = document.getElementById("projectImage");

    image.src = imageSrc;
    modal.style.display = "flex";

    document.body.style.overflow = "hidden";
}

function closeProject() {
    const modal = document.getElementById("projectModal");

    modal.style.display = "none";

    document.body.style.overflow = "";
}

// Klik area hitam untuk menutup
document.getElementById("projectModal").addEventListener("click", function(event) {
    if (event.target === this) {
        closeProject();
    }
});

// Tekan tombol ESC untuk menutup
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeProject();
    }
});
