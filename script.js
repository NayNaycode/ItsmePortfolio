// ==================================================
// 1. ANIMASI PARTIKEL LATAR BELAKANG (THEME AWARE)
// ==================================================
(function initParticleBackground() {
    let canvas = document.getElementById('particle-canvas') || document.getElementById('canvas');
    
    if (!canvas) {
        canvas = document.createElement('canvas');
        canvas.id = 'particle-canvas';
        document.body.prepend(canvas);
    }

    const ctx = canvas.getContext('2d');
    let width, height;
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };

    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '-1';

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.radius = Math.random() * 2 + 1;
            this.baseAlpha = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            if (this.x < 0 || this.x > width) this.vx *= -1;
            if (this.y < 0 || this.y > height) this.vy *= -1;

            if (mouse.x !== null && mouse.y !== null) {
                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < mouse.radius) {
                    let force = (mouse.radius - dist) / mouse.radius;
                    let angle = Math.atan2(dy, dx);
                    this.x -= Math.cos(angle) * force * 2;
                    this.y -= Math.sin(angle) * force * 2;
                }
            }
        }

        draw(colorRgb) {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${colorRgb}, ${this.baseAlpha})`;
            ctx.shadowBlur = 8;
            ctx.shadowColor = `rgba(${colorRgb}, 0.8)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    const particleCount = Math.min(85, Math.floor((window.innerWidth * window.innerHeight) / 11000));
    particles = Array.from({ length: particleCount }, () => new Particle());

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        let particleColor = '255, 255, 255'; 
        let lineColor = '200, 200, 200';

        if (currentTheme === 'light') {
            particleColor = '15, 23, 42';
            lineColor = '99, 102, 241';
        } else if (currentTheme === 'pink') {
            particleColor = '244, 114, 182';
            lineColor = '251, 113, 133';
        } else if (currentTheme === 'purple') {
            particleColor = '192, 132, 252';
            lineColor = '232, 121, 249';
        } else if (currentTheme === 'emerald') {
            particleColor = '253, 164, 175';
            lineColor = '251, 146, 60';
        } else if (currentTheme === 'sunset') {
            particleColor = '251, 113, 133';
            lineColor = '225, 29, 72';
        } else if (currentTheme === 'ocean') {
            particleColor = '56, 189, 248';
            lineColor = '244, 114, 182';
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw(particleColor);

            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 120) {
                    let alpha = (1 - dist / 120) * 0.35;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(${lineColor}, ${alpha})`;
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                let dx = particles[i].x - mouse.x;
                let dy = particles[i].y - mouse.y;
                let dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    let alpha = (1 - dist / mouse.radius) * 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(${particleColor}, ${alpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
})();


// ==================================================
// 2. KURSOR KUSTOM
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const follower = document.getElementById('cursor-follower');
    const dot = document.getElementById('cursor-dot');

    if (follower && dot) {
        window.addEventListener('mousemove', (e) => {
            follower.style.opacity = '1';
            dot.style.opacity = '1';
            
            follower.style.left = `${e.clientX}px`;
            follower.style.top = `${e.clientY}px`;
            dot.style.left = `${e.clientX}px`;
            dot.style.top = `${e.clientY}px`;
        });

        window.addEventListener('mouseleave', () => {
            follower.style.opacity = '0';
            dot.style.opacity = '0';
        });
    }
});


// ==================================================
// 3. SCROLL PROGRESS BAR & BACK TO TOP BUTTON
// ==================================================
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.getElementById('scroll-progress');
    if (progressBar) progressBar.style.width = scrolled + '%';

    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        if (winScroll > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});


// ==================================================
// 4. ANIMASI ANGKA STATISTIK (COUNTER STATS)
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    function startCounter() {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            let count = 0;
            const speed = target / 30;

            const updateCount = () => {
                count += speed;
                if (count < target) {
                    stat.innerText = Math.ceil(count) + '+';
                    setTimeout(updateCount, 40);
                } else {
                    stat.innerText = target + '+';
                }
            };
            updateCount();
        });
    }

    const statsContainer = document.querySelector('.stats-container');
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !animated) {
                animated = true;
                startCounter();
            }
        }, { threshold: 0.5 });
        observer.observe(statsContainer);
    }
});


// ==================================================
// 5. FITUR UTAMA & KONTROL UI
// ==================================================
document.addEventListener('DOMContentLoaded', () => {

    const themeToggleBtn = document.getElementById('theme-toggle-btn') || document.getElementById('theme-toggle');
    const themeMenu = document.getElementById('theme-menu');
    const themeDots = document.querySelectorAll('.theme-dot');

    const savedTheme = localStorage.getItem('selectedTheme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    themeDots.forEach(dot => {
        if (dot.getAttribute('data-theme-val') === savedTheme) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    if (themeToggleBtn && themeMenu) {
        themeToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themeMenu.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!themeMenu.contains(e.target) && e.target !== themeToggleBtn) {
                themeMenu.classList.remove('show');
            }
        });

        themeDots.forEach(dot => {
            dot.addEventListener('click', () => {
                const chosenTheme = dot.getAttribute('data-theme-val');
                document.documentElement.setAttribute('data-theme', chosenTheme);
                localStorage.setItem('selectedTheme', chosenTheme);

                themeDots.forEach(d => d.classList.remove('active'));
                dot.classList.add('active');

                themeMenu.classList.remove('show');
            });
        });
    }

    // NAVBAR MOBILE TOGGLE
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-times');
                icon.classList.toggle('fa-bars');
            }
        });

        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // ANIMASI SCROLL REVEAL
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.work-card, .tentang-wrapper, .cert-item, .timeline-item, .quick-connect-card, .hide');
    hiddenElements.forEach((el) => {
        el.classList.add('hide');
        observer.observe(el);
    });

    // TEKS BERJALAN (TYPING EFFECT)
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const texts = ['UI/UX Designer', 'Graphic Designer', 'Admin', 'Customer Service', 'Pretty Girl🫰🏻'];
        let count = 0;
        let index = 0;
        let currentText = '';
        let letter = '';

        (function type() {
            if (count === texts.length) count = 0;
            currentText = texts[count];
            letter = currentText.slice(0, ++index);

            typingElement.textContent = letter;
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 2000);
            } else {
                setTimeout(type, 100);
            }
        })();
    }
});


// ==================================================
// 6. FILTER KATEGORI PORTOFOLIO
// ==================================================
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');

    if (filterBtns.length > 0 && workCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const selectedCategory = btn.getAttribute('data-filter');

                workCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                        card.classList.remove('hide-card');
                    } else {
                        card.classList.add('hide-card');
                    }
                });
            });
        });
    }
});


// ==================================================
// 7. FITUR GANTI BAHASA (MULTILANGUAGE ID / EN)
// ==================================================
const translations = {
    id: {
        nav_home: "Beranda",
        nav_about: "Tentang Saya",
        nav_experience: "Pengalaman",
        nav_portfolio: "Portofolio",
        nav_certificates: "Sertifikat",
        nav_contact: "Kontak",
        hero_greeting: "Halo, Saya <span class='highlight'>Sri Mulyani</span>",
        hero_intro: "Saya Seorang",
        skills_title: "Keahlian & Alat",
        
        stats_projects: "Proyek Desain",
        stats_certs: "Sertifikat",
        stats_gpa: "IPK Informatika",

        about_title: "Tentang <span>Saya</span>",
        about_p1: "Halo, Saya Sri Mulyani!👋",
        about_p2: "Saya seorang lulusan Teknik Informatika (S.Kom) yang fleksibel, berorientasi pada detail, dan siap berkontribusi di berbagai bidang kerja. Memiliki perpaduan keahlian yang lengkap: dari pemahaman teknologi & pengembangan web, perancangan antarmuka (UI/UX design), pengelolaan administrasi & data, hingga pengalaman langsung dalam pelayanan publik (customer support).",
        about_p3: "Terbiasa berpikir logis, bekerja terstruktur, serta memiliki kemampuan komunikasi dan empati yang baik. Saya selalu antusias untuk belajar hal baru dan siap memberikan solusi terbaik di lingkungan kerja yang dinamis.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",

        exp_title: "Pengalaman & <span>Pendidikan</span>",
        exp_edu_title: "S1 Teknik Informatika (S.Kom)",
        exp_sub_iti: "Institut Teknologi Indonesia (IPK 3.54)",
        exp_edu_desc: "Rancang Bangun Sistem Informasi Pariwisata Berbasis Web Sebagai Media Promosi: Studi Kasus Di Kabupaten Oku Selatan sebagai Tugas Akhir, aktif mempelajari UI/UX Design, basis data, pengembangan web/mobile, dan lainnya.",
        exp_work1_title: "UI/UX Designer Intern",
        exp_sub_gvn: "PT Garuda Visi Nusantara",
        exp_work1_desc: "Merancang antarmuka website yang fungsional, responsif, dan modern dengan pendekatan User Experience (UX). Bertanggung jawab atas pembuatan user flow, struktur sistem, hingga prototype interaktif, serta berkolaborasi dengan tim untuk penyempurnaan desain. ",
        exp_sub_galang: "Kantor Desa Galang Tinggi",
        timeline_work2_title: "Kantor Desa Galang Tinggi",
        exp_work2_desc: "Bertanggung jawab atas pengelolaan dokumen dan pelayanan administrasi masyarakat secara efektif, akurat, dan tepat waktu. Berperan aktif dalam verifikasi data, koordinasi lintas pihak (perangkat desa & warga), serta penataan sistem kearsipan dokumen untuk kemudahan aksesibilitas data.",
        
        filter_all: "Semua",
        filter_app: "Desain App",
        filter_web: "Desain Web",
        filter_poster: "Poster & Flyer",

        portfolio_title: "Hasil <span>Karya</span>",
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
        proj6_desc: "Desain Web bizpermit sebagai web firma hukum, design ini dikerjakan pada saat melaksanakan magang di PT Garuda Visi Nusantara",
        proj7_title: "Poster Promosi",
        proj7_desc: "Poster promosi aplikasi top up game sebagai ajakan kepada orang-orang untuk mengunduh aplikasi tersebut, sebagai tugas desain grafis di BISA AI",
        proj8_title: "Moodboard",
        proj8_desc: "Moodboard yang dibentuk untuk merancang suatu aplikasi hiburan tontonan agar mempermudah konten apa saja yang akan dimasukan ke dalam aplikasi tersebut",
        proj9_title: "Flyer Makanan",
        proj9_desc: "Poster promosi produk kuliner rumahan yang saya buat untuk usaha dirumah",
        proj10_title: "Design Web SPARRING",
        proj10_desc: "Design yang dibuat untuk tes UI/UX di Suitmedia Digital Agensi",
        proj11_title: "UI/UX Design Dental",
        proj11_desc: "Design untuk aplikasi desain gigi Digi Dental Klinik",
        proj12_title: "Poster Promosi Parfume",
        proj12_desc: "Design yang saya buat pada saat melakukan tes untuk promosi parfume dari brand lokal good perfume studio dari PT Berseri Lewat Aroma",
        proj13_title: "Aplikasi Warehouse",
        proj13_desc: "Design aplikasi warehouse sebagai test dari jakmall.com dengan melamar posisi Produk Desain",
        
        cert_title: "Sertifikat",
        cert_graphic: "Desain Grafis",
        cert_datascience: "Ilmu Data",
        
        contact_title: "Hubungi <span>Saya</span>",
        contact_status: "Terbuka Untuk Kesempatan Kerja",
        contact_cta_title: "Mari Terhubung & Bekerja Sama!",
        contact_cta_desc: "Apakah Anda memiliki tawaran pekerjaan, proyek UI/UX, atau ingin berdiskusi? Jangan ragu untuk menghubungi saya melalui akses cepat di bawah ini.",
        contact_wa_btn: "Chat via WhatsApp",
        contact_email_btn: "Kirim Email Direct",
        contact_linkedin_btn: "Pesan via LinkedIn",
        footer_text: "Terbuka Untuk Bekerja"
    },
    en: {
        nav_home: "Home",
        nav_about: "About Me",
        nav_experience: "Experience",
        nav_portfolio: "Portfolio",
        nav_certificates: "Certificates",
        nav_contact: "Contact",
        hero_greeting: "Hello, I'm <span class='highlight'>Sri Mulyani</span>",
        hero_intro: "I am a",
        skills_title: "Skills & Tools",

        stats_projects: "Design Projects",
        stats_certs: "Certificates",
        stats_gpa: "Informatics GPA",

        about_title: "About <span>Me</span>",
        about_p1: "Hello, I'm Sri Mulyani!👋",
        about_p2: "I am a Computer Science graduate (B.S.) who is adaptable, detail-oriented, and ready to contribute across various professional fields. I bring a well-rounded skillset: spanning from technology & web development to UI/UX design, data & administrative management, and direct hands-on experience in public service & customer support.",
        about_p3: "I am accustomed to logical thinking, structured workflows, and strong empathetic communication. Always eager to learn new things, I am ready to deliver optimal solutions in dynamic work environments.",
        btn_cv_id: "Download CV (ID)",
        btn_cv_en: "Download CV (EN)",

        exp_title: "Experience & <span>Education</span>",
        exp_edu_title: "B.S. in Computer Science",
        exp_sub_iti: "Institute of Technology Indonesia (GPA 3.54)",
        exp_edu_desc: "Designed and developed a web-based tourism information system as a promotional tool—a case study in South OKU Regency undertaken as a final project—while actively studying UI/UX design, databases, web and mobile development, and related areas.",
        exp_work1_title: "UI/UX Designer Intern",
        exp_sub_gvn: "PT Garuda Visi Nusantara",
        exp_work1_desc: "Designed functional, responsive, and modern website interfaces using a User Experience (UX) approach. Responsible for creating user flows, system architectures, and interactive prototypes, as well as collaborating with cross-functional teams to refine design solutions.",
        exp_work2_title: "Village Administration Assistant",
        exp_sub_galang: "Galang Tinggi Village Office",
        exp_work2_desc: "Responsible for managing public administrative documents efficiently, accurately, and on schedule. Played an active role in data verification, cross-stakeholder coordination (village officials and local residents), and structuring the document archiving system to ensure seamless data accessibility.",

        filter_all: "All",
        filter_app: "App Design",
        filter_web: "Web Design",
        filter_poster: "Posters & Flyers",

        portfolio_title: "My <span>Works</span>",
        proj1_title: "Entertainment App Design",
        proj1_desc: "Entertainment platform app design created as a UI/UX design assignment during the MSIB program at BISA AI",
        proj2_title: "To-Do List App",
        proj2_desc: "The to-do list app was designed and developed as a mobile application programming course assignment",
        proj3_title: "Online Course Mobile App Design",
        proj3_desc: "Online course platform app design, created as a UI/UX design project during the MSIB program at BISA AI",
        proj4_title: "Game Top-Up App",
        proj4_desc: "Game top-up application design created as a group project for a UI/UX Design course, in order to obtain the final certificate from the program organized by BISA AI",
        proj5_title: "Coffee E-Commerce App",
        proj5_desc: "Design of a coffee e-commerce application as a final project to obtain international certification organized by the STEMSEL Foundation and BISA AI",
        proj6_title: "Web Design",
        proj6_desc: "Web design for Bizpermit, a law firm website; this design was created during an internship at PT Garuda Visi Nusantara",
        proj7_title: "Promotional Poster",
        proj7_desc: "A promotional poster for a game top-up app designed to encourage people to download it; a graphic design assignment for BISA AI",
        proj8_title: "Mood board",
        proj8_desc: "A mood board created for the design of an entertainment streaming application to help determine the content to be included in the app",
        proj9_title: "Food Flyer",
        proj9_desc: "A promotional poster I created for a home-based culinary business",
        proj10_title: "SPARRING Web Design",
        proj10_desc: "Design created for a UI/UX test at Suitmedia Digital Agency",
        proj11_title: "Dental UI/UX Design",
        proj11_desc: "Design for the Digi Dental Clinic dental design application",
        proj12_title: "Perfume Promotional Poster",
        proj12_desc: "A design I created during a test for a perfume promotion for the local brand Good Perfume Studio, from PT Berseri Lewat Aroma",
        proj13_title: "Warehouse Application",
        proj13_desc: "Warehouse application design created as a test for Jakmall.com during the application process for the Product Design position",
        
        cert_title: "Certificates",
        cert_graphic: "Graphic Design",
        cert_datascience: "Data Science",
        
        contact_title: "Contact <span>Me</span>",
        contact_status: "Open for Work Opportunities",
        contact_cta_title: "Let's Connect & Collaborate!",
        contact_cta_desc: "Do you have job offers, UI/UX project inquiries, or want to discuss opportunities? Feel free to reach out directly using the options below.",
        contact_wa_btn: "Chat via WhatsApp",
        contact_email_btn: "Send Direct Email",
        contact_linkedin_btn: "Message via LinkedIn",
        footer_text: "Open To Work"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('selectedLang', lang);

    document.querySelectorAll('[data-i18n]').forEach(elemen => {
        const key = elemen.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            elemen.innerHTML = translations[lang][key];
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });

    document.documentElement.lang = lang;
}

document.querySelectorAll('.lang-btn').forEach(button => {
    button.addEventListener('click', function() {
        const bahasa = this.getAttribute('data-lang');
        changeLanguage(bahasa);
    });
});

window.addEventListener('load', function() {
    const bahasaAwal = localStorage.getItem('selectedLang') || 'id';
    changeLanguage(bahasaAwal);
});


// ==================================================
// 8. MODAL PRATINJAU GAMBAR PROJECT
// ==================================================
function openProject(imageSrc) {
    const modal = document.getElementById("projectModal");
    const image = document.getElementById("projectImage");

    if (modal && image) {
        image.src = imageSrc;
        modal.style.display = "flex";
        document.body.style.overflow = "hidden";
    }
}

function closeProject() {
    const modal = document.getElementById("projectModal");
    if (modal) {
        modal.style.display = "none";
        document.body.style.overflow = "";
    }
}

const projectModalEl = document.getElementById("projectModal");
if (projectModalEl) {
    projectModalEl.addEventListener("click", function(event) {
        if (event.target === this) {
            closeProject();
        }
    });
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeProject();
    }
});
