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

//Otomatis buka tutup menu
const navItems = document.querySelectorAll('.nav-links a');

navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
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
        about_p1:"Halo, Saya Sri Mulyani!👋",
        about_p2: "Saya seorang lulusan Teknik Informatika (S.Kom) yang fleksibel, berorientasi pada detail, dan siap berkontribusi di berbagai bidang kerja. Memiliki perpaduan keahlian yang lengkap: dari pemahaman teknologi & pengembangan web, perancangan antarmuka (UI/UX design), pengelolaan administrasi & data, hingga pengalaman langsung dalam pelayanan publik (customer support).",
        about_p3: "Terbiasa berpikir logis, bekerja terstruktur, serta memiliki kemampuan komunikasi dan empati yang baik. Saya selalu antusias untuk belajar hal baru dan siap memberikan solusi terbaik di lingkungan kerja yang dinamis.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",
        portfolio_title: "Pekerjaan <span>Saya</span>",
        proj1_title: "Design Aplikasi Entertainment",
        proj1_desc: "Desain aplikasi platform entertainment sebagai Tugas UI/UI Design pada saat MSIB di BISA AI",
        proj2_title: "Aplikasi Tudo List",
        proj2_desc: "Desain aplikasi tudo list serta juga langsung dibuat aplikasi, sebagai tugas kuliah pemrograman aplikasi mobile",
        proj3_title: "Design Aplikasi Mobile Kursus Online",
        proj3_desc: "Desain Aplikasi platform kursus online sebagai tugas UI/UX Design pada saat mengikuti MSIB di BISA AI",
        proj4_title: "Aplikasi Top Up Game",
        proj4_desc: "Desain Aplikasi Top Up Game sebagai tugas kelompok dalam pembelajaran UI/UX Design, untuk mendapatkan sertifikat akhir dalam yang diselenggarakan oleh BISA AI",
        proj5_title: "Aplikasi E-Commerce Kopi",
        proj5_desc: "Desain Aplikasi e-commerce kopi sebagai project akhir untuk mendapatkan sertifikasi internasional yang diselenggarakan oleh STEMSEL FOUNDATION X BISA AI",
        proj6_title: "Web Desain",
        proj6_desc: "Desain Web bizpermit sebagai web firma hukum, design ini dikerjakan pada saat melaksanakan magang di PT Garuda Visi Nusantar",
        proj7_title: "Poster Promosi",
        proj7_desc: "Poster promosi aplikasi top up game sebagai ajakan kepada orang-orang untuk mengunduh aplikasi tersebut, sebagai tugas desain grafis di BISA AI",
        proj8_title: "Moodboard",
        proj8_desc: "Moodboard yang dibentuk untuk merancang suatu aplikasi hiburan tontonan agar mempermudah konten apa saja yang akan dimasukan ke dalam aplikasi tersebut",
        proj9_title: "Flyer Makanan",
        proj9_desc: "Poster promosi produk kuliner rumahan yang saya buat untuk usaha dirumah",
        proj10_title: "Design Web SPARRING",
        proj10_desc: "Design yang dibuat untuk tes UI/UX di Suitmedia Digital Agensi (PT Suitmedia Kreasi indonesia)",
        proj11_title: "UI/UX Design Dental",
        proj11_desc: "Design untuk aplikasi desain gigi Digi Dental Klinik",
        proj12_title: "Poster Promosi Parfume",
        proj12_desc: "Design yang saya buat pada saat melakukan tes untuk promosi parfume dari brand lokal good perfume studio dari PT Berseri Lewat Aroma",
        proj13_title:"Aplikasi Warehouse",
        proj13_desc:"Design aplikasi warehouse sebagai test dari jakmall.com posisi produk desain",
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
        about_p1: "Hello, I'm Sri Mulyani!👋",
        about_p2: "I am a Computer Science graduate (B.S.) who is adaptable, detail-oriented, and ready to contribute across various professional fields. I bring a well-rounded skillset: spanning from technology & web development to UI/UX design, data & administrative management, and direct hands-on experience in public service & customer support.",
        about_p3: "I am accustomed to logical thinking, structured workflows, and strong empathetic communication. Always eager to learn new things, I am ready to deliver optimal solutions in dynamic work environments.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",
        portfolio_title: "My <span>Works</span>",
        proj1_title: "Entertainment App Design",
        proj1_desc: "Entertainment platform app design created as a UI/UX design assignment during the MSIB program at BISA AI.",
        proj2_title: "To-Do List App",
        proj2_desc: "The to-do list app was designed and developed as a mobile application programming course assignment.",
        proj3_title: "Online Course Mobile App Design",
        proj3_desc: "Online course platform app design, created as a UI/UX design project during the MSIB program at BISA AI.",
        proj4_title: "Game Top-Up App",
        proj4_desc: "Game top-up application design created as a group project for a UI/UX Design course, in order to obtain the final certificate from the program organized by BISA AI.",
        proj5_title: "Coffee E-Commerce App",
        proj5_desc: "Design of a coffee e-commerce application as a final project to obtain international certification organized by the STEMSEL Foundation and BISA AI.",
        proj6_title: "Web Design",
        proj6_desc: "Web design for Bizpermit, a law firm website; this design was created during an internship at PT Garuda Visi Nusantara.",
        proj7_title: "Promotional Poster",
        proj7_desc: "A promotional poster for a game top-up app designed to encourage people to download it; a graphic design assignment for BISA AI.",
        proj8_title: "Mood board",
        proj8_desc: "A mood board created for the design of an entertainment streaming application to help determine the content to be included in the app.",
        proj9_title: "Food Flyer",
        proj9_desc: "A promotional poster I created for a home-based culinary business.",
        proj10_title: "SPARRING Web Design",
        proj10_desc: "Design created for a UI/UX test at Suitmedia Digital Agency (PT Kreasi Indonesia).",
        proj11_title: "Dental UI/UX Design",
        proj11_desc: "Design for the Digi Dental Clinic dental design application.",
        proj12_title: "Perfume Promotional Poster",
        proj12_desc: "A design I created during a test for a perfume promotion for the local brand Good Perfume Studio, from PT Berseri Lewat Aroma.",
        proj13_titel:"Warehouse Application",
        proj13_desc:"Warehouse application design created as a test for Jakmall.com during the application process for the Product Design position.",
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
