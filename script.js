/* =========================
   MOBILE MENU
========================= */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* =========================
   ACTIVE NAV ON SCROLL
========================= */

const sections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;

        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =========================
   HEADER SCROLL EFFECT
========================= */

const header = document.querySelector("header");

window.addEventListener("scroll", () => {
    if (!header) return;
    if (window.scrollY > 50) {
        header.style.background = "rgba(15,23,42,0.95)";
        header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.3)";
    } else {
        header.style.background = "rgba(15,23,42,0.8)";
        header.style.boxShadow = "none";
    }
});

/* =========================
   TYPING EFFECT
========================= */

const heroText = document.querySelector(".hero-content h2");

const textArray = [
    "Frontend Developer",
    "UI/UX Designer",
    "Web Developer"
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    if (!heroText) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        heroText.textContent = currentText.substring(0, charIndex--);
    } else {
        heroText.textContent = currentText.substring(0, charIndex++);
    }

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        setTimeout(typeEffect, 1200);
        return;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
    }

    setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

/* =========================
   CONTACT FORM
========================= */

const form = document.querySelector(".contact-form");

if (form) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Xabaringiz yuborildi!");
        form.reset();
    });
}

/* =========================
   SCROLL_ANIMATION
========================= */

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0)";
        }
    });
}, {
    threshold: 0.2
});

document.querySelectorAll(
    ".skill-card, .service-card, .project-card, .certificate-card, .achievement-card"
).forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(50px)";
    el.style.transition = "0.8s ease";
    observer.observe(el);
});

/* =========================
   PROJECTS RENDER
========================= */

function renderProjects() {
    let container = document.getElementById("projectContainer");
    if (!container) return;

    if (typeof getProjects !== "function") return;
    
    let projects = getProjects();
    container.innerHTML = "";

    projects.forEach(p => {
        container.innerHTML += `
        <div class="project-card">
            <img src="${p.image}">
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
            <div class="buttons">
                <a href="${p.link}" target="_blank" class="btn">
                    Live Demo
                </a>
            </div>
        </div>
        `;
    });
}

renderProjects();

/* =========================
   ALISA AI PREMIUM (UZ -> RU -> EN KETMA-KETLIKDA)
========================= */

const alisaTexts = [
// 1. O'ZBEKCHA MATN (speechIndex = 0)
`Ассалому алайкум. 
Мен Фаррухбекнинг виртуал йордамчисиман. 
Сиз ҳозир Одилбеков Фаррухбекнинг портфолио сайтидасиз. 
Фаррухбек Ўзбекистонда яшовчи ёш фронтенд дастурчи. 
У ХТМЛ, ЦСС, ЯваСкрипт, Бутстрап, ГитХаб ва Реактехнологияларини ўрганмоқда. 
У замонавий ва респонсив веб сайтлар яратишни яхши кўради. 
Портфолио бўлимида унинг лойиҳалари, сертификатлари, тажрибаси ва ютуқлари билан танишганигиз мумкин. 
Фаррухбекнинг мақсади келажакда кучли Фул Стэк Девелопер бўлиш. 
Бўш вақтида янги технологиялар ўрганади, дизайнлар яратади ва дастурлаш билан шуғулланади. 
Портфолио сайтига ташриф буюрганингиз учун раҳмат.`,

// 2. RUSCHA MATN (speechIndex = 1)
`Здравствуйте. 
Я виртуальный помощник Фаррухбека. 
Вы находитесь на его персональном портфолио сайте. 
Фаррухбек молодой Фронтенд разработчик из Узбекистана. 
Он изучает ХТМЛ, ЦСС, ЯваСкрипт, Бутстрап и Реак. 
Его цель стать профессиональным Фул Стэк разработчиком. 
Спасибо за посещение сайта.`,

// 3. INGLIZCHA MATN (speechIndex = 2)
`Hello. 
I am Farruxbek's virtual assistant. 
You are visiting the personal portfolio website of Odilbekov Farruxbek. 
He is a young Frontend Developer from Uzbekistan. 
He works with HTML, CSS, JavaScript, Bootstrap, GitHub and React. 
His goal is to become a professional Full Stack Developer. 
Thank you for visiting his portfolio website.`
];

let speechIndex = 0;
let currentUtterance = null; 

function getClearVoice(langCode) {
    const voices = speechSynthesis.getVoices();
    
    if (langCode === "uz") {
        // Kirill alifbosidagi o'zbekcha matnni o'qish uchun eng mos ovozlar
        return voices.find(v => v.lang.toLowerCase().includes("uz-uz")) || 
               voices.find(v => v.lang.toLowerCase().includes("ru-ru")) || 
               voices[0];
    }
    
    if (langCode === "ru") {
        return voices.find(v => v.lang.toLowerCase().includes("ru-ru") && (v.name.includes("Google") || v.name.includes("Microsoft") || v.name.includes("Irina"))) || 
               voices.find(v => v.lang.toLowerCase().includes("ru")) ||
               voices[0];
    }
    
    if (langCode === "en") {
        return voices.find(v => v.lang.toLowerCase().includes("en-us") && (v.name.includes("Google") || v.name.includes("Zira") || v.name.includes("Natural"))) || 
               voices.find(v => v.lang.toLowerCase().startsWith("en")) ||
               voices[0];
    }
    
    return voices[0];
}

function speakAlisa() {
    if (!("speechSynthesis" in window)) return;

    // Har gal toza va yangidan gapirishni boshlashi uchun kensel qilamiz
    speechSynthesis.cancel();

    currentUtterance = new SpeechSynthesisUtterance(alisaTexts[speechIndex]);

    // QAT'IY KETMA-KETLIK TIZIMI:
    if (speechIndex === 0) {
        // Birinchi matn: O'zbekcha (Kirill bo'lgani uchun uz yoki ru tili modeli o'qiydi)
        currentUtterance.lang = "ru-RU"; 
        currentUtterance.voice = getClearVoice("uz"); 
        currentUtterance.rate = 0.83; 
    } else if (speechIndex === 1) {
        // Ikkinchi matn: Sof Rus tili va ruscha ovoz
        currentUtterance.lang = "ru-RU";
        currentUtterance.voice = getClearVoice("ru");
        currentUtterance.rate = 0.88;
    } else if (speechIndex === 2) {
        // Uchinchi matn: Sof Ingliz tili va inglizcha ovoz
        currentUtterance.lang = "en-US";
        currentUtterance.voice = getClearVoice("en"); 
        currentUtterance.rate = 0.90; 
    }

    currentUtterance.pitch = 1.05; 
    currentUtterance.volume = 1;

    // Matn tugagach ishlaydigan hodisa
    currentUtterance.onend = () => {
        speechIndex++; // Keyingi matnga o'tish (0 edi -> 1 bo'ladi -> 2 bo'ladi)
        if (speechIndex < alisaTexts.length) {
            setTimeout(() => {
                // Agar foydalanuvchi pauza tugmasini bosmagan bo'lsa, avtomatik keyingisiga o'tadi
                if (!speechSynthesis.paused) {
                    speakAlisa();
                }
            }, 1200); // Tillar orasidagi ideal tanaffus (1.2 soniya)
        } else {
            resetAlisa(); // Hamma tillar tugasa, tizimni nollaydi
        }
    };

    currentUtterance.onerror = () => {
        resetAlisa();
    };

    speechSynthesis.speak(currentUtterance);
}

function resetAlisa() {
    speechIndex = 0;
    currentUtterance = null;
    if (alisaBtn) {
        alisaBtn.classList.remove("speaking");
    }
}

const alisaBtn = document.querySelector(".alisa");

if (alisaBtn) {
    alisaBtn.addEventListener("click", () => {
        if (speechSynthesis.speaking) {
            if (speechSynthesis.paused) {
                speechSynthesis.resume();
                alisaBtn.classList.add("speaking");
            } else {
                speechSynthesis.pause();
                alisaBtn.classList.remove("speaking");
            }
        } else {
            resetAlisa();
            alisaBtn.classList.add("speaking");
            speakAlisa();
        }
    });
}

// Brauzer xotirasiga mos ovozlar to'liq yuklanganda ishga tushishi uchun korreksiya
if (typeof speechSynthesis !== "undefined" && speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = () => {
        getClearVoice("uz");
        getClearVoice("ru");
        getClearVoice("en");
    };
}